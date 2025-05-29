const DEFAULT_SETTINGS = {
    siteName: "Name",
    logoUrl: "https://superplaycounts.github.io/img/123.png",
    logoDataUrl: null,
    initialCount: 0,
    incrementType: "uniform",
    uniform: { minRate: 0, maxRate: 0, interval: 2 },
    gaussian: { meanRate: 0, stdDev: 0, interval: 2 },
    custom: { distribution: "1,2,1", interval: 2 },
    api: {
        enabled: false,
        pollInterval: 60,
        preset: "superplaycounts",
        lastCounterValue: null,
        spc: { channelId: "" },
        google: { apiKey: "", channelId: "" },
        custom: { url: "", logoPath: "", namePath: "", counterPath: "" }
    }
};
const LOCAL_STORAGE_KEY = 'superPlayCountsSettings';

let currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
let tempSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

let odometerInstance;
let manualCounterIntervalId;
let apiPollIntervalId;
let currentCount = 0;

const mainLogoImg = document.getElementById('main-logo');
const mainSiteNameH1 = document.getElementById('main-site-name');
const settingsButton = document.getElementById('settings-btn');
const settingsPanelOverlay = document.getElementById('settings-panel-overlay');
const settingsCloseButton = document.getElementById('settings-close-btn');
const settingsSaveButton = document.getElementById('settings-save-btn');
const settingsExitButton = document.getElementById('settings-exit-btn');
const settingsResetButton = document.getElementById('settings-reset-btn');

const appearanceFieldset = document.getElementById('appearance-fieldset');
const manualCounterFieldset = document.getElementById('manual-counter-fieldset');
const apiDisabledMessages = document.querySelectorAll('.api-disabled-message');

const settingSiteNameInput = document.getElementById('setting-site-name');
const settingLogoUrlInput = document.getElementById('setting-logo-url');
const settingLogoFileInput = document.getElementById('setting-logo-file');
const settingLogoPreview = document.getElementById('setting-logo-preview');
const settingInitialCountInput = document.getElementById('setting-initial-count');
const settingIncrementTypeSelect = document.getElementById('setting-increment-type');
const uniformFields = document.getElementById('settings-uniform-fields');
const settingUniformMinInput = document.getElementById('setting-uniform-min');
const settingUniformMaxInput = document.getElementById('setting-uniform-max');
const settingUniformIntervalInput = document.getElementById('setting-uniform-interval');
const gaussianFields = document.getElementById('settings-gaussian-fields');
const settingGaussianMeanInput = document.getElementById('setting-gaussian-mean');
const settingGaussianStdDevInput = document.getElementById('setting-gaussian-stddev');
const settingGaussianIntervalInput = document.getElementById('setting-gaussian-interval');
const customFields = document.getElementById('settings-custom-fields');
const settingCustomDistributionTextarea = document.getElementById('setting-custom-distribution');
const settingCustomIntervalInput = document.getElementById('setting-custom-interval');

const manualFieldsToDisable = [
    settingSiteNameInput, settingLogoUrlInput, settingLogoFileInput,
    settingInitialCountInput, settingIncrementTypeSelect,
    settingUniformMinInput, settingUniformMaxInput, settingUniformIntervalInput,
    settingGaussianMeanInput, settingGaussianStdDevInput, settingGaussianIntervalInput,
    settingCustomDistributionTextarea, settingCustomIntervalInput
];

const settingApiEnabledCheckbox = document.getElementById('setting-api-enabled');
const apiOptionsContainer = document.getElementById('api-options-container');
const settingApiPollIntervalInput = document.getElementById('setting-api-poll-interval');
const settingApiPresetSelect = document.getElementById('setting-api-preset');
const apiSpcFields = document.getElementById('api-superplaycounts-fields');
const settingApiSpcChannelIdInput = document.getElementById('setting-api-spc-channel-id');
const apiGoogleFields = document.getElementById('api-google-fields');
const settingApiGoogleKeyInput = document.getElementById('setting-api-google-key');
const settingApiGoogleChannelIdInput = document.getElementById('setting-api-google-channel-id');
const apiCustomFields = document.getElementById('api-custom-fields');
const settingApiCustomUrlInput = document.getElementById('setting-api-custom-url');
const settingApiCustomPathLogoInput = document.getElementById('setting-api-custom-path-logo');
const settingApiCustomPathNameInput = document.getElementById('setting-api-custom-path-name');
const settingApiCustomPathCounterInput = document.getElementById('setting-api-custom-path-counter');

function resolvePath(object, path, defaultValue = null) {
    if (!object || typeof path !== 'string' || !path.trim()) return defaultValue;
    try {
        const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
        let result = object;
        for (const key of keys) {
            if (result && typeof result === 'object' && key in result) result = result[key];
            else return defaultValue;
        }
        return result === undefined ? defaultValue : result;
    } catch (e) { console.error("resolvePath Error:", path, e); return defaultValue; }
}

function loadSettings() {
    const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        currentSettings = {
            ...JSON.parse(JSON.stringify(DEFAULT_SETTINGS)), ...parsed,
            uniform: { ...DEFAULT_SETTINGS.uniform, ...(parsed.uniform || {}) },
            gaussian: { ...DEFAULT_SETTINGS.gaussian, ...(parsed.gaussian || {}) },
            custom: { ...DEFAULT_SETTINGS.custom, ...(parsed.custom || {}) },
            api: {
                ...DEFAULT_SETTINGS.api, ...(parsed.api || {}),
                spc: { ...DEFAULT_SETTINGS.api.spc, ...(parsed.api?.spc || {}) },
                google: { ...DEFAULT_SETTINGS.api.google, ...(parsed.api?.google || {}) },
                custom: { ...DEFAULT_SETTINGS.api.custom, ...(parsed.api?.custom || {}) }
            }
        };
    } else {
        currentSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    }
    currentCount = (currentSettings.api.enabled && currentSettings.api.lastCounterValue !== null)
        ? parseInt(currentSettings.api.lastCounterValue, 10)
        : parseInt(currentSettings.initialCount, 10) || 0;
    applySettingsToPage(currentSettings);
}

function applySettingsToPage(settings) {
    stopManualCounter();
    stopApiPolling();

    if (settings.api.enabled) {
        mainSiteNameH1.textContent = settings.siteName;
        mainLogoImg.src = settings.logoUrl || settings.logoDataUrl || DEFAULT_SETTINGS.logoUrl;
        mainLogoImg.onerror = () => { mainLogoImg.src = DEFAULT_SETTINGS.logoUrl; };
        if (odometerInstance) odometerInstance.update(currentCount);
        startApiPolling(settings.api);
    } else {
        mainSiteNameH1.textContent = settings.siteName;
        if (settings.logoUrl) mainLogoImg.src = settings.logoUrl;
        else if (settings.logoDataUrl) mainLogoImg.src = settings.logoDataUrl;
        else mainLogoImg.src = DEFAULT_SETTINGS.logoUrl;
        mainLogoImg.onerror = () => { mainLogoImg.src = DEFAULT_SETTINGS.logoUrl; };
        currentCount = parseInt(settings.initialCount, 10) || 0;
        if (odometerInstance) odometerInstance.update(currentCount);
        startManualCounter(settings);
    }
}

function updatePageFromApiData(name, logoUrlFromApi, counterValue) {
    if (name !== null && name !== undefined && typeof name === 'string') mainSiteNameH1.textContent = name;
    if (logoUrlFromApi && typeof logoUrlFromApi === 'string') {
        mainLogoImg.src = logoUrlFromApi;
        mainLogoImg.onerror = () => { mainLogoImg.src = DEFAULT_SETTINGS.logoUrl; };
    }
    if (counterValue !== null && counterValue !== undefined) {
        const newApiCount = parseInt(counterValue, 10);
        if (!isNaN(newApiCount)) {
            currentCount = newApiCount;
            if (odometerInstance) odometerInstance.update(currentCount);
            currentSettings.api.lastCounterValue = currentCount;
        }
    }
}

function populateSettingsPanel() {
    tempSettings = JSON.parse(JSON.stringify(currentSettings));
    settingSiteNameInput.value = tempSettings.siteName;
    settingLogoUrlInput.value = tempSettings.logoUrl || '';
    settingLogoFileInput.value = '';
    populateLogoPreview();
    settingInitialCountInput.value = tempSettings.initialCount;
    settingIncrementTypeSelect.value = tempSettings.incrementType;
    settingUniformMinInput.value = tempSettings.uniform.minRate;
    settingUniformMaxInput.value = tempSettings.uniform.maxRate;
    settingUniformIntervalInput.value = tempSettings.uniform.interval;
    settingGaussianMeanInput.value = tempSettings.gaussian.meanRate;
    settingGaussianStdDevInput.value = tempSettings.gaussian.stdDev;
    settingGaussianIntervalInput.value = tempSettings.gaussian.interval;
    settingCustomDistributionTextarea.value = tempSettings.custom.distribution;
    settingCustomIntervalInput.value = tempSettings.custom.interval;
    updateIncrementTypeFields();

    settingApiEnabledCheckbox.checked = tempSettings.api.enabled;
    settingApiPollIntervalInput.value = tempSettings.api.pollInterval;
    settingApiPresetSelect.value = tempSettings.api.preset;
    settingApiSpcChannelIdInput.value = tempSettings.api.spc.channelId;
    settingApiGoogleKeyInput.value = tempSettings.api.google.apiKey;
    settingApiGoogleChannelIdInput.value = tempSettings.api.google.channelId;
    settingApiCustomUrlInput.value = tempSettings.api.custom.url;
    settingApiCustomPathLogoInput.value = tempSettings.api.custom.logoPath;
    settingApiCustomPathNameInput.value = tempSettings.api.custom.namePath;
    settingApiCustomPathCounterInput.value = tempSettings.api.custom.counterPath;

    updateSettingsPanelInteractivity();
    updateApiPresetFields();
}

function populateLogoPreview() {
    if (tempSettings.logoDataUrl) {
        settingLogoPreview.src = tempSettings.logoDataUrl; settingLogoPreview.style.display = 'inline-block';
    } else if (tempSettings.logoUrl) {
        settingLogoPreview.src = tempSettings.logoUrl; settingLogoPreview.style.display = 'inline-block';
        settingLogoPreview.onerror = () => { settingLogoPreview.style.display = 'none'; };
    } else { settingLogoPreview.style.display = 'none'; }
}

function updateSettingsPanelInteractivity() {
    const apiEnabled = settingApiEnabledCheckbox.checked;
    apiOptionsContainer.style.display = apiEnabled ? 'block' : 'none';
    manualFieldsToDisable.forEach(field => field.disabled = apiEnabled);
    appearanceFieldset.classList.toggle('disabled-by-api', apiEnabled);
    manualCounterFieldset.classList.toggle('disabled-by-api', apiEnabled);
    apiDisabledMessages.forEach(msg => { msg.style.display = apiEnabled ? 'block' : 'none'; });
}

function updateApiPresetFields() {
    const preset = settingApiPresetSelect.value;
    apiSpcFields.style.display = preset === 'superplaycounts' ? 'block' : 'none';
    apiGoogleFields.style.display = preset === 'google' ? 'block' : 'none';
    apiCustomFields.style.display = preset === 'custom' ? 'block' : 'none';
}
function updateIncrementTypeFields() {
    const type = settingIncrementTypeSelect.value;
    uniformFields.style.display = type === 'uniform' ? 'block' : 'none';
    gaussianFields.style.display = type === 'gaussian' ? 'block' : 'none';
    customFields.style.display = type === 'custom' ? 'block' : 'none';
}

function openSettingsPanel() { populateSettingsPanel(); settingsPanelOverlay.style.display = 'flex'; }
function closeSettingsPanel() { settingsPanelOverlay.style.display = 'none'; }

function saveSettings() {
    tempSettings.siteName = settingSiteNameInput.value.trim() || DEFAULT_SETTINGS.siteName;
    tempSettings.initialCount = parseInt(settingInitialCountInput.value, 10) || 0;
    tempSettings.incrementType = settingIncrementTypeSelect.value;
    tempSettings.uniform = { minRate: parseInt(settingUniformMinInput.value, 10) || 0, maxRate: parseInt(settingUniformMaxInput.value, 10) || 0, interval: Math.max(1, parseInt(settingUniformIntervalInput.value, 10) || 1) };
    if (tempSettings.uniform.maxRate < tempSettings.uniform.minRate) tempSettings.uniform.maxRate = tempSettings.uniform.minRate;
    tempSettings.gaussian = { meanRate: parseInt(settingGaussianMeanInput.value, 10) || 0, stdDev: Math.max(0, parseInt(settingGaussianStdDevInput.value, 10) || 0), interval: Math.max(1, parseInt(settingGaussianIntervalInput.value, 10) || 1) };
    tempSettings.custom = { distribution: settingCustomDistributionTextarea.value.trim(), interval: Math.max(1, parseInt(settingCustomIntervalInput.value, 10) || 1) };

    tempSettings.api.enabled = settingApiEnabledCheckbox.checked;
    tempSettings.api.pollInterval = Math.max(10, parseInt(settingApiPollIntervalInput.value, 10) || 60);
    tempSettings.api.preset = settingApiPresetSelect.value;
    tempSettings.api.spc.channelId = settingApiSpcChannelIdInput.value.trim();
    tempSettings.api.google.apiKey = settingApiGoogleKeyInput.value.trim();
    tempSettings.api.google.channelId = settingApiGoogleChannelIdInput.value.trim();
    tempSettings.api.custom.url = settingApiCustomUrlInput.value.trim();
    tempSettings.api.custom.logoPath = settingApiCustomPathLogoInput.value.trim();
    tempSettings.api.custom.namePath = settingApiCustomPathNameInput.value.trim();
    tempSettings.api.custom.counterPath = settingApiCustomPathCounterInput.value.trim();

    currentSettings = JSON.parse(JSON.stringify(tempSettings));
    if (!currentSettings.api.enabled) currentSettings.api.lastCounterValue = null;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentSettings));
    applySettingsToPage(currentSettings);
    closeSettingsPanel();
}

function resetAllSettings() {
    if (window.confirm("Are you sure you want to reset all settings to their defaults? This action cannot be undone.")) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        window.location.reload();
    }
}

function stopManualCounter() { if (manualCounterIntervalId) { clearInterval(manualCounterIntervalId); manualCounterIntervalId = null; } }
function startManualCounter(settings) {
    stopManualCounter(); let intervalSeconds, incrementLogic;
    switch (settings.incrementType) {
        case 'gaussian': intervalSeconds = settings.gaussian.interval; incrementLogic = () => { const { meanRate, stdDev } = settings.gaussian; let u1 = 0, u2 = 0; while (u1 === 0) u1 = Math.random(); while (u2 === 0) u2 = Math.random(); const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2); return Math.max(0, Math.round(z0 * stdDev + meanRate)); }; break;
        case 'custom': intervalSeconds = settings.custom.interval; const parsedDistribution = parseCustomDistribution(settings.custom.distribution); incrementLogic = () => getCustomIncrementFromParsed(parsedDistribution); break;
        case 'uniform': default: intervalSeconds = settings.uniform.interval; incrementLogic = () => { const { minRate, maxRate } = settings.uniform; const min = Math.min(minRate, maxRate); const max = Math.max(minRate, maxRate); return Math.floor(Math.random() * (max - min + 1)) + min; }; break;
    }
    if (intervalSeconds < 0.1) intervalSeconds = 0.1;
    manualCounterIntervalId = setInterval(() => { currentCount += incrementLogic(); if (odometerInstance) odometerInstance.update(currentCount); }, intervalSeconds * 1000);
}
function parseCustomDistribution(distString) { const items = []; if (!distString || typeof distString !== 'string') return items; distString.trim().split(/\s+/).forEach(group => { const parts = group.split(',').map(Number); if (parts.length === 3 && !parts.some(isNaN) && parts[2] > 0) items.push({ min: parts[0], max: parts[1], weight: parts[2] }); }); return items; }
function getCustomIncrementFromParsed(parsedDistribution) { if (!parsedDistribution || parsedDistribution.length === 0) return 0; let totalWeight = parsedDistribution.reduce((sum, item) => sum + item.weight, 0); if (totalWeight === 0) return 0; let randomWeight = Math.random() * totalWeight; for (const item of parsedDistribution) { if (randomWeight < item.weight) { const min = Math.min(item.min, item.max); const max = Math.max(item.min, item.max); return Math.floor(Math.random() * (max - min + 1)) + min; } randomWeight -= item.weight; } return 0; }

function stopApiPolling() { if (apiPollIntervalId) { clearInterval(apiPollIntervalId); apiPollIntervalId = null; } }
async function fetchApiData() {
    const apiSettings = currentSettings.api;
    if (!apiSettings.enabled) return;
    let apiUrl = "", namePath = "", logoPath = "", counterPath = "";

    try {
        switch (apiSettings.preset) {
            case 'superplaycounts':
                const spcChannelId = apiSettings.spc.channelId;
                if (!spcChannelId) { console.warn("SPC API: Channel ID missing."); return; }
                apiUrl = `https://api.superplaycounts.pp.ua/api/youtube-channel-counter/user/${spcChannelId}`;
                namePath = "user.0.count"; logoPath = "user.1.count"; counterPath = "counts.0.count";
                break;
            case 'google':
                const googleApiKey = apiSettings.google.apiKey;
                const googleChannelId = apiSettings.google.channelId;
                if (!googleApiKey || !googleChannelId) { console.warn("Google API: API Key or Channel ID missing."); return; }
                apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${googleChannelId}&key=${googleApiKey}`;
                namePath = "items.0.snippet.title"; logoPath = "items.0.snippet.thumbnails.high.url"; counterPath = "items.0.statistics.subscriberCount";
                break;
            case 'custom':
                apiUrl = apiSettings.custom.url;
                if (!apiUrl) { console.warn("Custom API: URL is missing."); return; }
                namePath = apiSettings.custom.namePath; logoPath = apiSettings.custom.logoPath; counterPath = apiSettings.custom.counterPath;
                break;
            default: console.warn("Unknown API preset."); return;
        }
        if (!apiUrl) { console.warn("API URL not defined."); return; }

        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error (${apiSettings.preset} - ${apiUrl}): ${response.status} ${response.statusText}. Details: ${errorText}`);
            return;
        }
        const data = await response.json();
        let resolvedSiteName = mainSiteNameH1.textContent, resolvedLogoUrl = mainLogoImg.src, resolvedCounterValue = currentCount;
        if (namePath) resolvedSiteName = resolvePath(data, namePath, mainSiteNameH1.textContent);
        if (logoPath) resolvedLogoUrl = resolvePath(data, logoPath, mainLogoImg.src);
        if (counterPath) resolvedCounterValue = resolvePath(data, counterPath, currentCount);
        updatePageFromApiData(resolvedSiteName, resolvedLogoUrl, resolvedCounterValue);
    } catch (error) { console.error(`Error fetching/processing API data (${apiSettings.preset} - ${apiUrl}):`, error); }
}
function startApiPolling(apiSettings) {
    stopApiPolling(); if (!apiSettings.enabled) return;
    fetchApiData();
    const pollIntervalMs = Math.max(10000, (apiSettings.pollInterval || 60) * 1000);
    apiPollIntervalId = setInterval(fetchApiData, pollIntervalMs);
}

function setupEventListeners() {
    settingsButton.addEventListener('click', openSettingsPanel);
    settingsCloseButton.addEventListener('click', closeSettingsPanel);
    settingsExitButton.addEventListener('click', closeSettingsPanel);
    settingsSaveButton.addEventListener('click', saveSettings);
    settingsResetButton.addEventListener('click', resetAllSettings);
    settingIncrementTypeSelect.addEventListener('change', updateIncrementTypeFields);
    settingLogoUrlInput.addEventListener('input', () => {
        tempSettings.logoUrl = settingLogoUrlInput.value.trim();
        if (tempSettings.logoUrl) { tempSettings.logoDataUrl = null; settingLogoFileInput.value = ''; }
        populateLogoPreview();
    });
    settingLogoFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            tempSettings.logoDataUrl = e.target.result;
            settingLogoUrlInput.value = ''; tempSettings.logoUrl = '';
            populateLogoPreview();
        }; reader.readAsDataURL(file);
    });
    settingApiEnabledCheckbox.addEventListener('change', updateSettingsPanelInteractivity);
    settingApiPresetSelect.addEventListener('change', updateApiPresetFields);
}

document.addEventListener('DOMContentLoaded', () => {
    odometerInstance = new Odometer({ el: document.getElementById('odometer'), value: 0, format: '(,ddd)', theme: 'default' });
    loadSettings();
    setupEventListeners();
});
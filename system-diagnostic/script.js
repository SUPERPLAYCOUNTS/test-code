const TEXT_CONTENT_DB = {
    en: {
        docTitle: "System Diagnostic",
        initTitle: "System Boot Sequence",
        initStatus: "Initializing core modules...\nSystem integrity check: PASS\nLoading user interface...",
        proceedToAudioCheck: "Continue...",
        audioCheckTitle: "Audio Subsystem Verification",
        audioCheckInstruction: "A test tone will be played. Please confirm if you hear it.",
        playTestTone: "Play Test Tone",
        audioCheckQuestion: "Did you hear the test tone clearly?",
        playTestBgMusic: "Play Test Background Loop",
        audioCheckBgMusicQuestion: "Did you hear the background loop pattern?",
        heardTone: "Yes, tone audible",
        notHeardTone: "No, tone inaudible / Unsure",
        heardBgMusic: "Yes, loop audible",
        notHeardBgMusic: "No, loop inaudible / Prefer silence",
        audioCheckResultPass: "Audio systems nominal. Proceeding to log viewer...",
        audioCheckResultFail: "Audio device error or not confirmed. Please check your system audio settings and retry. For optimal system performance, audio is required.",
        investigationTitle: "Incident Log Viewer",
        logEntry1Title: "LOG: 08:15:22 - ROUTINE SCAN",
        logEntry1Text: "All systems nominal. Quadrant Gamma sensors report minor subspace distortions. Flagged for passive monitoring.",
        logEntry2Title: "LOG: 08:17:54 - AUDITORY ANOMALY",
        logEntry2Text: "Sensor array 3B picked up an unidentifiable rhythmic pattern. Cross-referencing database... no match. Source location indeterminate, appears to be localized to user terminal.",
        logEntry3Title: "LOG: 08:19:03 - CRITICAL ALERT: VISUAL FEED CORRUPTION",
        logEntry3Text:
            "Catastrophic interference on primary visual channel. Data stream is heavily fragmented. Attempting to reconstruct last valid frame... Frame reconstruction indicates a non-standard entity signature. Recommend immediate diagnostic.",
        optionNextLog: "Access Next Entry",
        optionReviewPattern: "Analyze Rhythmic Pattern",
        optionInitiateDiagnostic: "INITIATE FULL DIAGNOSTIC",
        optionSystemCheck: "Run System Integrity Check",
        finalMessage: "Sorry, you fell for the Jumpscare! ;)",
        finalLinksHeader: "Further Directives // External Network Access:",
        finalSupportHeader: "Support Field Operations:",
        linkMainHub: "Main Hub",
        linkYT: "YouTube Channel [YT]",
        linkIG: "Instagram Profile [IG]",
        linkX: "Formerly Twitter [X]",
        linkTG: "Telegram Channel [TG]",
        linkLab: "Experiments",
        linkKofi: "[donate on Ko-fi]",
        criticalDisplayError: "Critical system display error.",
        audioInterfaceError: "Audio interface error.",
        backgroundAudioError: "Your browser does not support background audio.",
    },
    ua: {
        docTitle: "Діагностика Системи",
        initTitle: "Завантаження Системи",
        initStatus: "Ініціалізація основних модулів...\nПеревірка цілісності системи: ПРОЙДЕНО\nЗавантаження інтерфейсу користувача...",
        proceedToAudioCheck: "Продовжити...",
        audioCheckTitle: "Перевірка Аудіо Підсистеми",
        audioCheckInstruction: "Буде відтворено тестовий сигнал. Будь ласка, підтвердьте, чи ви його чуєте.",
        playTestTone: "Відтворити Тестовий Сигнал",
        audioCheckQuestion: "Чи чітко ви чули тестовий сигнал?",
        playTestBgMusic: "Відтворити Тестовий Фоновий Цикл",
        audioCheckBgMusicQuestion: "Чи чули ви фоновий циклічний патерн?",
        heardTone: "Так, сигнал чутно",
        notHeardTone: "Ні, сигнал не чутно / Не впевнений",
        heardBgMusic: "Так, цикл чутно",
        notHeardBgMusic: "Ні, цикл не чутно / Бажаю тиші",
        audioCheckResultPass: "Аудіосистеми в нормі. Перехід до переглядача журналів...",
        audioCheckResultFail: "Помилка аудіопристрою або не підтверджено. Будь ласка, перевірте налаштування аудіо вашої системи та спробуйте ще раз. Для оптимальної роботи системи потрібен звук.",
        investigationTitle: "Переглядач Журналу Подій",
        logEntry1Title: "ЗАПИС: 08:15:22 - ПЛАНОВЕ СКАНУВАННЯ",
        logEntry1Text: "Усі системи в нормі. Сенсори Квадранту Гамма повідомляють про незначні спотворення підпростору. Позначено для пасивного моніторингу.",
        logEntry2Title: "ЗАПИС: 08:17:54 - АКУСТИЧНА АНОМАЛІЯ",
        logEntry2Text: "Сенсорний масив 3B зафіксував неідентифікований ритмічний патерн. Перехресне зіставлення з базою даних... збігів немає. Джерело невизначене, схоже, локалізовано на терміналі користувача.",
        logEntry3Title: "ЗАПИС: 08:19:03 - КРИТИЧНЕ СПОВІЩЕННЯ: ПОШКОДЖЕННЯ ВІЗУАЛЬНОГО КАНАЛУ",
        logEntry3Text:
            "Катастрофічне втручання в основний візуальний канал. Потік даних сильно фрагментований. Спроба реконструкції останнього валідного кадру... Реконструкція кадру вказує на нестандартну сигнатуру сутності. Рекомендовано негайну діагностику.",
        optionNextLog: "Доступ до Наступного Запису",
        optionReviewPattern: "Аналізувати Ритмічний Патерн",
        optionInitiateDiagnostic: "ЗАПУСТИТИ ПОВНУ ДІАГНОСТИКУ",
        optionSystemCheck: "Запустити Перевірку Цілісності Системи",
        finalMessage: "Вибач, ти попався на скример! ;)",
        finalLinksHeader: "Подальші Директиви // Доступ до Зовнішньої Мережі:",
        finalSupportHeader: "Підтримка Польових Операцій:",
        linkMainHub: "Головний Хаб",
        linkYT: "Ютуб канал [YT]",
        linkIG: "Профіль Інстаграм [IG]",
        linkX: "Раніше Твіттер [X]",
        linkTG: "Телеграм канал [TG]",
        linkLab: "Експерименти",
        linkKofi: "[пожертвуйте на Ko-fi]",
        criticalDisplayError: "Помилка критичного відображення системи.",
        audioInterfaceError: "Помилка аудіоінтерфейсу.",
        backgroundAudioError: "Ваш браузер не підтримує фонове аудіо.",
    },
    ru: {
        docTitle: "Системная Диагностика",
        initTitle: "Загрузка Системы",
        initStatus: "Инициализация основных модулей...\nПроверка целостности системы: ПРОЙДЕНА\nЗагрузка пользовательского интерфейса...",
        proceedToAudioCheck: "Продолжить...",
        audioCheckTitle: "Проверка Аудио Подсистемы",
        audioCheckInstruction: "Будет воспроизведен тестовый сигнал. Пожалуйста, подтвердите, слышите ли вы его.",
        playTestTone: "Воспроизвести Тестовый Сигнал",
        audioCheckQuestion: "Вы отчетливо слышали тестовый сигнал?",
        playTestBgMusic: "Воспроизвести Тестовый Фоновый Цикл",
        audioCheckBgMusicQuestion: "Вы слышали фоновый циклический паттерн?",
        heardTone: "Да, сигнал слышен",
        notHeardTone: "Нет, сигнал не слышен / Не уверен",
        heardBgMusic: "Да, цикл слышен",
        notHeardBgMusic: "Нет, цикл не слышен / Предпочитаю тишину",
        audioCheckResultPass: "Аудиосистемы в норме. Переход к просмотрщику журналов...",
        audioCheckResultFail: "Ошибка аудиоустройства или не подтверждено. Пожалуйста, проверьте настройки аудио вашей системы и повторите попытку. Для оптимальной работы системы требуется звук.",
        investigationTitle: "Просмотрщик Журнала Событий",
        logEntry1Title: "ЗАПИСЬ: 08:15:22 - ПЛАНОВОЕ СКАНИРОВАНИЕ",
        logEntry1Text: "Все системы в норме. Сенсоры Квадранта Гамма сообщают о незначительных искажениях подпространства. Помечено для пассивного мониторинга.",
        logEntry2Title: "ЗАПИСЬ: 08:17:54 - АКУСТИЧЕСКАЯ АНОМАЛИЯ",
        logEntry2Text: "Сенсорный массив 3B зафиксировал неопознанный ритмический паттерн. Перекрестное сопоставление с базой данных... совпадений нет. Источник не определен, похоже, локализован на терминале пользователя.",
        logEntry3Title: "ЗАПИСЬ: 08:19:03 - КРИТИЧЕСКОЕ ОПОВЕЩЕНИЕ: ПОВРЕЖДЕНИЕ ВИЗУАЛЬНОГО КАНАЛА",
        logEntry3Text:
            "Катастрофическое вмешательство в основной визуальный канал. Поток данных сильно фрагментирован. Попытка реконструкции последнего валидного кадра... Реконструкция кадра указывает на нестандартную сигнатуру сущности. Рекомендована немедленная диагностика.",
        optionNextLog: "Доступ к Следующей Записи",
        optionReviewPattern: "Анализировать Ритмический Паттерн",
        optionInitiateDiagnostic: "ЗАПУСТИТЬ ПОЛНУЮ ДИАГНОСТИКУ",
        optionSystemCheck: "Запустить Проверку Целостности Системы",
        finalMessage: "Извини, ты попался на скример! ;)",
        finalLinksHeader: "Дальнейшие Директивы // Доступ к Внешней Сети:",
        finalSupportHeader: "Поддержка Полевых Операций:",
        linkMainHub: "Главный Хаб",
        linkYT: "Ютуб канал [YT]",
        linkIG: "Профиль Инстаграм [IG]",
        linkX: "Раньше Твиттер [X]",
        linkTG: "Телеграм канал [TG]",
        linkLab: "Эксперименты",
        linkKofi: "[пожертвуйте на Ko-fi]",
        criticalDisplayError: "Ошибка критического отображения системы.",
        audioInterfaceError: "Ошибка аудиоинтерфейса.",
        backgroundAudioError: "Ваш браузер не поддерживает фоновое аудио.",
    },
    pl: {
        docTitle: "Diagnostyka Systemu",
        initTitle: "Rozruch Systemu",
        initStatus: "Inicjalizacja modułów głównych...\nSprawdzenie integralności systemu: ZALICZONE\nŁadowanie interfejsu użytkownika...",
        proceedToAudioCheck: "Kontynuuj...",
        audioCheckTitle: "Weryfikacja Podsystemu Audio",
        audioCheckInstruction: "Zostanie odtworzony sygnał testowy. Proszę potwierdzić, czy go słyszysz.",
        playTestTone: "Odtwórz Sygnał Testowy",
        audioCheckQuestion: "Czy wyraźnie słyszałeś sygnał testowy?",
        playTestBgMusic: "Odtwórz Testową Pętlę Tła",
        audioCheckBgMusicQuestion: "Czy słyszałeś wzór pętli tła?",
        heardTone: "Tak, sygnał słyszalny",
        notHeardTone: "Nie, sygnał niesłyszalny / Nie jestem pewien",
        heardBgMusic: "Tak, pętla słyszalna",
        notHeardBgMusic: "Nie, pętla niesłyszalna / Wolę ciszę",
        audioCheckResultPass: "Systemy audio w normie. Przechodzenie do przeglądarki logów...",
        audioCheckResultFail: "Błąd urządzenia audio lub niepotwierdzone. Sprawdź ustawienia audio swojego systemu i spróbuj ponownie. Do optymalnego działania systemu wymagane jest audio.",
        investigationTitle: "Przeglądarka Dziennika Zdarzeń",
        logEntry1Title: "WPIS: 08:15:22 - SKANOWANIE RUTYNOWE",
        logEntry1Text: "Wszystkie systemy w normie. Czujniki Kwadrantu Gamma zgłaszają niewielkie zniekształcenia podprzestrzeni. Oznaczone do pasywnego monitorowania.",
        logEntry2Title: "WPIS: 08:17:54 - ANOMALIA AKUSTYCZNA",
        logEntry2Text: "Macierz czujników 3B zarejestrowała niezidentyfikowany wzorzec rytmiczny. Porównanie z bazą danych... brak dopasowania. Źródło nieokreślone, wydaje się być zlokalizowane na terminalu użytkownika.",
        logEntry3Title: "WPIS: 08:19:03 - ALARM KRYTYCZNY: USZKODZENIE KANAŁU WIZUALNEGO",
        logEntry3Text:
            "Katastrofalne zakłócenia na głównym kanale wizualnym. Strumień danych jest mocno pofragmentowany. Próba rekonstrukcji ostatniej prawidłowej klatki... Rekonstrukcja klatki wskazuje na niestandardową sygnaturę bytu. Zalecana natychmiastowa diagnostyka.",
        optionNextLog: "Dostęp do Następnego Wpisu",
        optionReviewPattern: "Analizuj Wzorzec Rytmiczny",
        optionInitiateDiagnostic: "URUCHOM PEŁNĄ DIAGNOSTYKĘ",
        optionSystemCheck: "Uruchom Sprawdzenie Integralności Systemu",
        finalMessage: "Przepraszam, dałeś się nabrać na screamer! ;)",
        finalLinksHeader: "Dalsze Dyrektywy // Dostęp do Sieci Zewnętrznej:",
        finalSupportHeader: "Wsparcie Operacji Terenowych:",
        linkMainHub: "Główny Hub",
        linkYT: "Kanał YouTube [YT]",
        linkIG: "Profil Instagram [IG]",
        linkX: "Dawniej Twitter [X]",
        linkTG: "Kanał Telegram [TG]",
        linkLab: "Eksperymenty",
        linkKofi: "[wesprzyj na Ko-fi]",
        criticalDisplayError: "Błąd krytycznego wyświetlania systemu.",
        audioInterfaceError: "Błąd interfejsu audio.",
        backgroundAudioError: "Twoja przeglądarka nie obsługuje dźwięku w tle.",
    },
};

let currentLanguageSetting = "en";
let currentOperationalStage = 0;
let criticalEventPlaybackCount = 0;
const TYPING_SPEED = 30;

let initialScreenDisplay, audioCheckScreenDisplay, investigationScreenDisplay, finalMessageScreenDisplay;
let initTitleElement, initStatusElement, proceedToAudioCheckButtonElement;
let audioCheckTitleElement, audioCheckInstructionElement, playTestToneButtonElement, audioCheckQuestionElement, heardToneButtonElement, notHeardToneButtonElement, audioCheckResultElement;
let playTestBgMusicButtonElement, audioCheckBgMusicQuestionElement, heardBgMusicButtonElement, notHeardBgMusicButtonElement;
let investigationTitleElement, logContainerElement, optionsContainerElement;
let criticalEventViewerElement, systemAlertMediaElement, interfaceToneElement, postEventAudioElement, testBackgroundMusicElement;
let finalMessageTextElement, finalLinksContainerElement;

const activeTypewriters = new Map();

function buildPageStructure() {
    const body = document.body;
    body.innerHTML = `
        <div class="language-selector">
            <button data-lang="en">EN</button>
            <button data-lang="ua">UA</button>
            <button data-lang="ru">RU</button>
            <button data-lang="pl">PL</button>
        </div>

        <div id="initialScreenDisplay" class="container active">
            <h1 id="initTitleElement"></h1>
            <div class="scan-line-container"><div class="scan-line"></div></div>
            <p id="initStatusElement"></p>
            <button id="proceedToAudioCheckButtonElement" disabled></button>
        </div>

        <div id="audioCheckScreenDisplay" class="container">
            <h1 id="audioCheckTitleElement"></h1>
            <p id="audioCheckInstructionElement"></p>
            <p><button id="playTestToneButtonElement"></button></p>
            <p id="audioCheckQuestionElement"></p>
            <button id="heardToneButtonElement" disabled></button>
            <button id="notHeardToneButtonElement" disabled></button>
            <hr style="border-color: var(--border-color); margin: 20px 0; display: none;" id="bgMusicSeparator">
            <div id="bgMusicTestContainer" style="display:none;">
                <p><button id="playTestBgMusicButtonElement"></button></p>
                <p id="audioCheckBgMusicQuestionElement"></p>
                <button id="heardBgMusicButtonElement" disabled></button>
                <button id="notHeardBgMusicButtonElement" disabled></button>
            </div>
            <p id="audioCheckResultElement"></p>
        </div>

        <div id="investigationScreenDisplay" class="container">
            <h1 id="investigationTitleElement"></h1>
            <div id="logContainerElement"></div>
            <div id="optionsContainerElement" style="margin-top:20px;"></div>
        </div>

        <div id="finalMessageScreenDisplay" class="container">
            <h1 id="finalMessageTextElement"></h1>
            <div id="finalLinksContainerElement" style="margin-top: 30px; text-align: center; display: none;">
                <p id="finalLinksHeaderText" style="font-size: 1.1rem; color: var(--main-text-color); margin-bottom: 15px;"></p>
                <a href="https://superplaycounts.github.io/" target="_blank" class="final-link" id="linkMainHubElement"></a>
                <a href="https://www.youtube.com/@SUPERPLAYMUSIC" target="_blank" class="final-link" id="linkYTElement"></a>
                <a href="https://www.instagram.com/super_play2020" target="_blank" class="final-link" id="linkIGElement"></a>
                <a href="https://x.com/superplaycounts" target="_blank" class="final-link" id="linkXElement"></a>
                <a href="https://t.me/SPM_YT" target="_blank" class="final-link" id="linkTGElement"></a>
                <a href="https://superplaycounts.github.io/test-code/" target="_blank" class="final-link" id="linkLabElement"></a>
                <p id="finalSupportHeaderText" style="margin-top: 25px; font-size: 1.1rem;"></p>
                <a href="https://ko-fi.com/superplaycounts" target="_blank" class="final-link support-link" id="linkKofiElement"></a>
            </div>
        </div>

        <div class="critical-event-display" id="criticalEventViewerElement">
            <video id="systemAlertMediaElement" preload="auto" playsinline>
                <source src="mov.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>

        <audio id="interfaceToneElement">
            <source src="data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAP//AAAAAA==" type="audio/wav">
        </audio>
        <audio id="postEventAudioElement" loop>
            <source src="AudioElement.mp3" type="audio/mpeg">
        </audio>
        <audio id="testBackgroundMusicElement" loop>
             <source src="breeze-129153.mp3" type="audio/mpeg">
        </audio>
    `;

    initialScreenDisplay = document.getElementById("initialScreenDisplay");
    audioCheckScreenDisplay = document.getElementById("audioCheckScreenDisplay");
    investigationScreenDisplay = document.getElementById("investigationScreenDisplay");
    finalMessageScreenDisplay = document.getElementById("finalMessageScreenDisplay");

    initTitleElement = document.getElementById("initTitleElement");
    initStatusElement = document.getElementById("initStatusElement");
    proceedToAudioCheckButtonElement = document.getElementById("proceedToAudioCheckButtonElement");

    audioCheckTitleElement = document.getElementById("audioCheckTitleElement");
    audioCheckInstructionElement = document.getElementById("audioCheckInstructionElement");
    playTestToneButtonElement = document.getElementById("playTestToneButtonElement");
    audioCheckQuestionElement = document.getElementById("audioCheckQuestionElement");
    heardToneButtonElement = document.getElementById("heardToneButtonElement");
    notHeardToneButtonElement = document.getElementById("notHeardToneButtonElement");
    audioCheckResultElement = document.getElementById("audioCheckResultElement");

    playTestBgMusicButtonElement = document.getElementById("playTestBgMusicButtonElement");
    audioCheckBgMusicQuestionElement = document.getElementById("audioCheckBgMusicQuestionElement");
    heardBgMusicButtonElement = document.getElementById("heardBgMusicButtonElement");
    notHeardBgMusicButtonElement = document.getElementById("notHeardBgMusicButtonElement");

    investigationTitleElement = document.getElementById("investigationTitleElement");
    logContainerElement = document.getElementById("logContainerElement");
    optionsContainerElement = document.getElementById("optionsContainerElement");

    criticalEventViewerElement = document.getElementById("criticalEventViewerElement");
    systemAlertMediaElement = document.getElementById("systemAlertMediaElement");
    interfaceToneElement = document.getElementById("interfaceToneElement");
    postEventAudioElement = document.getElementById("postEventAudioElement");
    testBackgroundMusicElement = document.getElementById("testBackgroundMusicElement");

    finalMessageTextElement = document.getElementById("finalMessageTextElement");
    finalLinksContainerElement = document.getElementById("finalLinksContainerElement");
}

function typeWriter(element, text, onComplete) {
    if (!element) {
        if (onComplete) onComplete();
        return;
    }

    if (activeTypewriters.has(element)) {
        clearTimeout(activeTypewriters.get(element));
        activeTypewriters.delete(element);
    }

    element.innerHTML = "";
    let i = 0;
    const cursorId = "dynamicCursor-" + (element.id || Math.random().toString(36).substring(2, 9));
    let cursorSpan = document.getElementById(cursorId);

    if (!cursorSpan) {
        cursorSpan = document.createElement("span");
        cursorSpan.classList.add("typing-cursor");
        cursorSpan.id = cursorId;
    }

    if (text && text.length > 0) {
        element.appendChild(cursorSpan);
    }

    function type() {
        if (text && i < text.length) {
            if (cursorSpan.parentNode === element) {
                element.removeChild(cursorSpan);
            }

            if (text.charAt(i) === "\n") {
                element.innerHTML += "<br>";
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            element.appendChild(cursorSpan);

            const timeoutId = setTimeout(type, TYPING_SPEED);
            activeTypewriters.set(element, timeoutId);
        } else {
            if (cursorSpan.parentNode === element) {
                element.removeChild(cursorSpan);
            }
            activeTypewriters.delete(element);
            if (onComplete) onComplete();
        }
    }

    if (text && text.length > 0) {
        type();
    } else {
        if (cursorSpan.parentNode === element) {
            element.removeChild(cursorSpan);
        }
        activeTypewriters.delete(element);
        if (onComplete) onComplete();
    }
}

function applyLocalizedText(isInitialLoad = false) {
    const content = TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en;
    document.title = content.docTitle;

    initTitleElement.textContent = content.initTitle;
    if (isInitialLoad || initialScreenDisplay.classList.contains("active")) {
        proceedToAudioCheckButtonElement.disabled = true;
        initStatusElement.innerHTML = "";
        typeWriter(initStatusElement, content.initStatus, () => {
            proceedToAudioCheckButtonElement.textContent = content.proceedToAudioCheck;
            proceedToAudioCheckButtonElement.disabled = false;
        });
    } else {
        initStatusElement.innerHTML = (content.initStatus || "").replace(/\n/g, "<br>");
        proceedToAudioCheckButtonElement.textContent = content.proceedToAudioCheck;
        proceedToAudioCheckButtonElement.disabled = true;
    }

    audioCheckTitleElement.textContent = content.audioCheckTitle;
    playTestToneButtonElement.textContent = content.playTestTone;
    heardToneButtonElement.textContent = content.heardTone;
    notHeardToneButtonElement.textContent = content.notHeardTone;
    playTestBgMusicButtonElement.textContent = content.playTestBgMusic;
    heardBgMusicButtonElement.textContent = content.heardBgMusic;
    notHeardBgMusicButtonElement.textContent = content.notHeardBgMusic;

    investigationTitleElement.textContent = content.investigationTitle;

    const testBgMusicSource = testBackgroundMusicElement.querySelector("source");
    if (testBackgroundMusicElement.childNodes.length === 1 && testBackgroundMusicElement.childNodes[0].nodeType === Node.TEXT_NODE && !testBgMusicSource) {
        testBackgroundMusicElement.childNodes[0].nodeValue = content.backgroundAudioError;
    }

    document.getElementById("finalLinksHeaderText").textContent = content.finalLinksHeader;
    document.getElementById("linkMainHubElement").textContent = content.linkMainHub;
    document.getElementById("linkYTElement").textContent = content.linkYT;
    document.getElementById("linkIGElement").textContent = content.linkIG;
    document.getElementById("linkXElement").textContent = content.linkX;
    document.getElementById("linkTGElement").textContent = content.linkTG;
    document.getElementById("linkLabElement").textContent = content.linkLab;
    document.getElementById("finalSupportHeaderText").textContent = content.finalSupportHeader;
    document.getElementById("linkKofiElement").textContent = content.linkKofi;
}

function setBgMusicTestUIVisibility(visible) {
    const separator = document.getElementById("bgMusicSeparator");
    const container = document.getElementById("bgMusicTestContainer");
    if (separator) separator.style.display = visible ? "block" : "none";
    if (container) container.style.display = visible ? "block" : "none";
}

function setupEventListeners() {
    document.querySelectorAll(".language-selector button").forEach((button) => {
        button.addEventListener("click", (e) => {
            switchLanguage(e.target.dataset.lang);
        });
    });

    proceedToAudioCheckButtonElement.addEventListener("click", () => {
        initialScreenDisplay.classList.remove("active");
        audioCheckScreenDisplay.classList.add("active");

        const content = TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en;
        playTestToneButtonElement.disabled = true;
        heardToneButtonElement.disabled = true;
        notHeardToneButtonElement.disabled = true;
        audioCheckResultElement.innerHTML = "";
        setBgMusicTestUIVisibility(false);

        audioCheckInstructionElement.innerHTML = "";
        audioCheckQuestionElement.innerHTML = "";

        typeWriter(audioCheckInstructionElement, content.audioCheckInstruction, () => {
            typeWriter(audioCheckQuestionElement, content.audioCheckQuestion, () => {
                playTestToneButtonElement.disabled = false;
            });
        });
    });

    playTestToneButtonElement.addEventListener("click", () => {
        interfaceToneElement.currentTime = 0;
        interfaceToneElement.volume = 0.2;
        interfaceToneElement
            .play()
            .then(() => {
                heardToneButtonElement.disabled = false;
                notHeardToneButtonElement.disabled = false;
            })
            .catch((e) => {
                console.warn("Interface tone playback issue:", e);
                audioCheckResultElement.textContent = (TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en).audioInterfaceError;
                heardToneButtonElement.disabled = false;
                notHeardToneButtonElement.disabled = false;
            });
    });

    heardToneButtonElement.addEventListener("click", () => {
        playTestToneButtonElement.disabled = true;
        notHeardToneButtonElement.disabled = true;
        heardToneButtonElement.disabled = true;
        audioCheckInstructionElement.innerHTML = "";
        audioCheckQuestionElement.innerHTML = "";

        setBgMusicTestUIVisibility(true);
        playTestBgMusicButtonElement.disabled = false;
        heardBgMusicButtonElement.disabled = true;
        notHeardBgMusicButtonElement.disabled = true;
        const content = TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en;
        audioCheckBgMusicQuestionElement.innerHTML = "";
        typeWriter(audioCheckBgMusicQuestionElement, content.audioCheckBgMusicQuestion);
    });

    notHeardToneButtonElement.addEventListener("click", () => {
        playTestToneButtonElement.disabled = false;
        heardToneButtonElement.disabled = true;
        setBgMusicTestUIVisibility(false);

        const content = TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en;
        audioCheckResultElement.innerHTML = "";
        typeWriter(audioCheckResultElement, content.audioCheckResultFail);
    });

    playTestBgMusicButtonElement.addEventListener("click", () => {
        if (testBackgroundMusicElement) {
            testBackgroundMusicElement.currentTime = 0;
            testBackgroundMusicElement.volume = 0.15;
            testBackgroundMusicElement
                .play()
                .then(() => {
                    heardBgMusicButtonElement.disabled = false;
                    notHeardBgMusicButtonElement.disabled = false;
                })
                .catch((e) => {
                    console.warn("Test background music playback issue:", e);
                    audioCheckResultElement.textContent = (TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en).audioInterfaceError;
                    heardBgMusicButtonElement.disabled = false;
                    notHeardBgMusicButtonElement.disabled = false;
                });
        }
    });

    heardBgMusicButtonElement.addEventListener("click", () => {
        playTestBgMusicButtonElement.disabled = true;
        notHeardBgMusicButtonElement.disabled = true;
        heardBgMusicButtonElement.disabled = true;
        if (testBackgroundMusicElement && !testBackgroundMusicElement.paused) {
            testBackgroundMusicElement.pause();
            testBackgroundMusicElement.currentTime = 0;
        }
        proceedToInvestigation();
    });

    notHeardBgMusicButtonElement.addEventListener("click", () => {
        playTestBgMusicButtonElement.disabled = true;
        heardBgMusicButtonElement.disabled = true;
        notHeardBgMusicButtonElement.disabled = true;
        if (testBackgroundMusicElement && !testBackgroundMusicElement.paused) {
            testBackgroundMusicElement.pause();
            testBackgroundMusicElement.currentTime = 0;
        }
        proceedToInvestigation();
    });

    function proceedToInvestigation() {
        const content = TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en;
        audioCheckBgMusicQuestionElement.innerHTML = "";
        playTestToneButtonElement.style.display = "none";
        heardToneButtonElement.style.display = "none";
        notHeardToneButtonElement.style.display = "none";
        audioCheckQuestionElement.style.display = "none";
        audioCheckInstructionElement.style.display = "none";
        setBgMusicTestUIVisibility(false);
        audioCheckResultElement.innerHTML = "";

        typeWriter(audioCheckResultElement, content.audioCheckResultPass, () => {
            setTimeout(() => {
                audioCheckScreenDisplay.classList.remove("active");
                investigationScreenDisplay.classList.add("active");
                currentOperationalStage = 1;
                logContainerElement.innerHTML = "";
                optionsContainerElement.innerHTML = "";
                renderOperationalStageContent();
            }, 1000);
        });
    }

    systemAlertMediaElement.addEventListener("ended", () => {
        criticalEventPlaybackCount++;
        if (criticalEventPlaybackCount < 2) {
            systemAlertMediaElement.currentTime = 0;
            systemAlertMediaElement.play().catch((err) => {
                console.error("System alert media REPLAY error:", err);
                concludeCriticalEventAndDisplayMessage();
            });
        } else {
            concludeCriticalEventAndDisplayMessage();
        }
    });

    systemAlertMediaElement.addEventListener("error", (e) => {
        console.error("Screamer Video Element Error Event:", e);
        console.error("Screamer Video error object:", systemAlertMediaElement.error);
        if (criticalEventViewerElement.style.display === "block") {

        }
    });
    systemAlertMediaElement.addEventListener("loadedmetadata", () => {
        console.log("Screamer Video metadata loaded.");
    });
    systemAlertMediaElement.addEventListener("canplay", () => {
        console.log("Screamer Video can play.");
    });
    systemAlertMediaElement.addEventListener("canplaythrough", () => {
        console.log("Screamer Video can play through.");
    });
    systemAlertMediaElement.addEventListener("playing", () => {
        console.log("Screamer Video is playing.");
    });
    systemAlertMediaElement.addEventListener("stalled", () => {
        console.warn("Screamer Video stalled.");
    });
    systemAlertMediaElement.addEventListener("waiting", () => {
        console.warn("Screamer Video waiting for data.");
    });
    systemAlertMediaElement.addEventListener("suspend", () => {
        console.warn("Screamer Video suspended.");
    });

    let audioContextInitiatedByGesture = false;
    document.body.addEventListener(
        "click",
        () => {
            if (!audioContextInitiatedByGesture) {
                const audioElements = [interfaceToneElement, postEventAudioElement, testBackgroundMusicElement, systemAlertMediaElement];
                audioElements.forEach((audioEl) => {
                    if (audioEl && audioEl.paused) {
                        const currentVolume = audioEl.volume;
                        audioEl.volume = 0;
                        const playPromise = audioEl.play();
                        if (playPromise !== undefined) {
                            playPromise
                                .then(() => {
                                    audioEl.pause();
                                    audioEl.volume = currentVolume;
                                })
                                .catch((error) => { });
                        }
                    }
                });
                audioContextInitiatedByGesture = true;
                console.log("Audio context likely initiated by user gesture.");
            }
        },
        { once: true }
    );
}

function switchLanguage(langCode) {
    const fallbackLang = TEXT_CONTENT_DB.en;
    if (TEXT_CONTENT_DB[langCode]) {
        currentLanguageSetting = langCode;
        localStorage.setItem("userPreferredLanguage", langCode);
        const content = TEXT_CONTENT_DB[currentLanguageSetting] || fallbackLang;

        applyLocalizedText();

        if (audioCheckScreenDisplay.classList.contains("active")) {
            audioCheckResultElement.innerHTML = "";
            playTestToneButtonElement.style.display = "inline-block";
            heardToneButtonElement.style.display = "inline-block";
            notHeardToneButtonElement.style.display = "inline-block";
            audioCheckQuestionElement.style.display = "block";
            audioCheckInstructionElement.style.display = "block";

            playTestToneButtonElement.disabled = true;
            heardToneButtonElement.disabled = true;
            notHeardToneButtonElement.disabled = true;
            setBgMusicTestUIVisibility(false);

            audioCheckInstructionElement.innerHTML = "";
            audioCheckQuestionElement.innerHTML = "";

            typeWriter(audioCheckInstructionElement, content.audioCheckInstruction, () => {
                typeWriter(audioCheckQuestionElement, content.audioCheckQuestion, () => {
                    playTestToneButtonElement.disabled = false;
                });
            });
        } else if (investigationScreenDisplay.classList.contains("active")) {
            logContainerElement.innerHTML = "";
            optionsContainerElement.innerHTML = "";
            renderOperationalStageContent();
        } else if (finalMessageScreenDisplay.classList.contains("active")) {
            finalLinksContainerElement.style.display = "none";
            finalMessageTextElement.innerHTML = "";
            typeWriter(finalMessageTextElement, content.finalMessage, () => {
                finalLinksContainerElement.style.display = "block";
                finalLinksContainerElement.style.opacity = "0";
                let opacity = 0;
                const fadeInInterval = setInterval(() => {
                    opacity += 0.1;
                    finalLinksContainerElement.style.opacity = opacity;
                    if (opacity >= 1) clearInterval(fadeInInterval);
                }, 50);
            });
        }
    }
}

function createLogEntryElement(titleKey, textKey, onTextTyped) {
    const content = TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en;
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("log-entry");
    const titleH2 = document.createElement("h2");
    titleH2.textContent = content[titleKey];
    const textP = document.createElement("p");
    textP.classList.add("log-text");
    textP.id = `log-text-p-${currentOperationalStage}-${logContainerElement.children.length}`;

    entryDiv.appendChild(titleH2);
    entryDiv.appendChild(textP);
    logContainerElement.appendChild(entryDiv);
    logContainerElement.scrollTop = logContainerElement.scrollHeight;

    typeWriter(textP, content[textKey], () => {
        logContainerElement.scrollTop = logContainerElement.scrollHeight;
        if (onTextTyped) onTextTyped();
    });
}

function createOptionButton(textKey, callback, isCritical = false) {
    const content = TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en;
    const button = document.createElement("button");
    button.textContent = content[textKey];
    button.addEventListener("click", callback);
    if (isCritical) {
        button.style.color = "var(--accent-color)";
        button.style.borderColor = "var(--accent-color)";
        button.style.textShadow = "0 0 5px var(--accent-color)";
    }
    button.disabled = true;
    optionsContainerElement.appendChild(button);
}

function renderOperationalStageContent() {
    optionsContainerElement.innerHTML = "";

    const enableOptions = () => {
        optionsContainerElement.querySelectorAll("button").forEach((b) => (b.disabled = false));
    };
    const content = TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en;

    if (currentOperationalStage === 1) {
        logContainerElement.innerHTML = "";
        createLogEntryElement("logEntry1Title", "logEntry1Text", () => {
            createOptionButton("optionNextLog", () => {
                currentOperationalStage = 2;
                renderOperationalStageContent();
            });
            enableOptions();
        });
    } else if (currentOperationalStage === 2) {
        logContainerElement.innerHTML = "";
        const prevLogDiv1 = document.createElement("div");
        prevLogDiv1.classList.add("log-entry");
        prevLogDiv1.innerHTML = `<h2>${content.logEntry1Title}</h2><p class="log-text">${(content.logEntry1Text || "").replace(/\n/g, "<br>")}</p>`;
        logContainerElement.appendChild(prevLogDiv1);

        createLogEntryElement("logEntry2Title", "logEntry2Text", () => {
            createOptionButton("optionReviewPattern", () => {
                currentOperationalStage = 3;
                renderOperationalStageContent();
            });
            createOptionButton("optionSystemCheck", () => {
                currentOperationalStage = 3;
                renderOperationalStageContent();
            });
            enableOptions();
        });
    } else if (currentOperationalStage === 3) {
        logContainerElement.innerHTML = "";
        const prevLogDiv1 = document.createElement("div");
        prevLogDiv1.classList.add("log-entry");
        prevLogDiv1.innerHTML = `<h2>${content.logEntry1Title}</h2><p class="log-text">${(content.logEntry1Text || "").replace(/\n/g, "<br>")}</p>`;
        logContainerElement.appendChild(prevLogDiv1);

        const prevLogDiv2 = document.createElement("div");
        prevLogDiv2.classList.add("log-entry");
        prevLogDiv2.innerHTML = `<h2>${content.logEntry2Title}</h2><p class="log-text">${(content.logEntry2Text || "").replace(/\n/g, "<br>")}</p>`;
        logContainerElement.appendChild(prevLogDiv2);
        logContainerElement.scrollTop = logContainerElement.scrollHeight;

        createLogEntryElement("logEntry3Title", "logEntry3Text", () => {
            createOptionButton("optionInitiateDiagnostic", initiateCriticalEvent, true);
            enableOptions();
        });
    }
}

function initiateCriticalEvent() {
    investigationScreenDisplay.classList.remove("active");
    criticalEventViewerElement.style.display = "block";
    document.body.style.cursor = "none";

    if (testBackgroundMusicElement && !testBackgroundMusicElement.paused) {
        testBackgroundMusicElement.pause();
        testBackgroundMusicElement.currentTime = 0;
    }

    systemAlertMediaElement.muted = false;
    systemAlertMediaElement.volume = 1.0;
    systemAlertMediaElement.currentTime = 0;
    criticalEventPlaybackCount = 0;

    try {
        if (criticalEventViewerElement.requestFullscreen) {
            criticalEventViewerElement.requestFullscreen().catch((e) => console.warn("Fullscreen non-blocking error:", e.name, e.message));
        } else if (criticalEventViewerElement.mozRequestFullScreen) {
            criticalEventViewerElement.mozRequestFullScreen();
        } else if (criticalEventViewerElement.webkitRequestFullscreen) {
            criticalEventViewerElement.webkitRequestFullscreen();
        } else if (criticalEventViewerElement.msRequestFullscreen) {
            criticalEventViewerElement.msRequestFullscreen();
        }
    } catch (e) {
        console.warn("Error during fullscreen request attempt:", e);
    }

    console.log("Calling systemAlertMediaElement.load()");
    systemAlertMediaElement.load();

    const videoPath = systemAlertMediaElement.currentSrc || (systemAlertMediaElement.querySelector("source") ? systemAlertMediaElement.querySelector("source").src : "N/A");
    console.log(`Attempting to play critical event video. Path: ${videoPath}, Muted: ${systemAlertMediaElement.muted}, Volume: ${systemAlertMediaElement.volume}`);
    const playPromise = systemAlertMediaElement.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log("Critical event video playback successfully INITIATED.");
            })
            .catch((error) => {
                console.error("CRITICAL: Video playback FAILED!", error.name, error.message);
                if (systemAlertMediaElement.error) {
                    console.error("Video error object details - Code:", systemAlertMediaElement.error.code, "Message:", systemAlertMediaElement.error.message);
                }
                console.error("Video readyState:", systemAlertMediaElement.readyState);
                console.error("Video networkState:", systemAlertMediaElement.networkState);
                console.error("Video currentSrc:", systemAlertMediaElement.currentSrc);
                concludeCriticalEventAndDisplayMessage();
            });
    } else {
        console.warn("systemAlertMediaElement.play() did not return a promise.");
        try {
            systemAlertMediaElement.play();
            console.log("Legacy play() called.");
        } catch (legacyError) {
            console.error("Legacy play() also failed:", legacyError);
            concludeCriticalEventAndDisplayMessage();
        }
    }
}

function concludeCriticalEventAndDisplayMessage() {
    if (criticalEventViewerElement.style.display === "none" && finalMessageScreenDisplay.classList.contains("active")) {
        console.log("concludeCriticalEventAndDisplayMessage: Already in final state, skipping.");
        return;
    }
    console.log("Concluding critical event and displaying final message.");

    criticalEventViewerElement.style.display = "none";
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen().catch((e) => console.warn("Exiting fullscreen failed:", e));
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen().catch((e) => console.warn("Exiting fullscreen failed (moz):", e));
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen().catch((e) => console.warn("Exiting fullscreen failed (webkit):", e));
        else if (document.msExitFullscreen) document.msExitFullscreen().catch((e) => console.warn("Exiting fullscreen failed (ms):", e));
    }

    document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="10" height="2" x="3" y="7" fill="%2300ff41"/><rect width="2" height="10" x="7" y="3" fill="%2300ff41"/></svg>') 8 8, auto`;

    initialScreenDisplay.classList.remove("active");
    audioCheckScreenDisplay.classList.remove("active");
    investigationScreenDisplay.classList.remove("active");
    finalMessageScreenDisplay.classList.add("active");

    finalLinksContainerElement.style.display = "none";
    finalMessageTextElement.innerHTML = "";

    const content = TEXT_CONTENT_DB[currentLanguageSetting] || TEXT_CONTENT_DB.en;
    typeWriter(finalMessageTextElement, content.finalMessage, () => {
        finalLinksContainerElement.style.display = "block";
        finalLinksContainerElement.style.opacity = "0";
        let opacity = 0;
        const fadeInInterval = setInterval(() => {
            opacity += 0.05;
            finalLinksContainerElement.style.opacity = opacity;
            if (opacity >= 1) clearInterval(fadeInInterval);
        }, 50);
    });

    if (postEventAudioElement) {
        postEventAudioElement.volume = 0.5;
        postEventAudioElement.play().catch((e) => {
            console.warn("Post-event audio playback issue.", e);
        });
    }
}

buildPageStructure();

const userStoredLanguage = localStorage.getItem("userPreferredLanguage");
if (userStoredLanguage && TEXT_CONTENT_DB[userStoredLanguage]) {
    currentLanguageSetting = userStoredLanguage;
}
applyLocalizedText(true);
setupEventListeners();
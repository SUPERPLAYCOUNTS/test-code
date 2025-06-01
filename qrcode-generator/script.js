document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const dotsStyleSelect = document.getElementById('dotsStyle');
    const foregroundColorInput = document.getElementById('foregroundColor');
    const backgroundColorInput = document.getElementById('backgroundColor');
    const useGradientCheckbox = document.getElementById('useGradient');
    const gradientOptionsDiv = document.getElementById('gradientOptions');
    const gradientStartColorInput = document.getElementById('gradientStartColor');
    const gradientEndColorInput = document.getElementById('gradientEndColor');
    const gradientDirectionSelect = document.getElementById('gradientDirection');
    const generateButton = document.getElementById('generateButton');
    const qrCodeOutputDiv = document.getElementById('qrcodeOutput');
    const downloadButton = document.getElementById('downloadButton');

    const logoInput = document.getElementById('logoInput');
    const logoPreviewContainer = document.getElementById('logoPreviewContainer');
    const logoPreview = document.getElementById('logoPreview');
    const deleteLogoButton = document.getElementById('deleteLogoButton');

    let qrCodeInstance = null;
    let selectedLogoSrc = null;
    let isLogoLoading = false;

    useGradientCheckbox.addEventListener('change', () => {
        gradientOptionsDiv.classList.toggle('hidden', !useGradientCheckbox.checked);
    });

    logoInput.addEventListener('change', handleLogoSelect);
    deleteLogoButton.addEventListener('click', resetLogoSelection);
    generateButton.addEventListener('click', generateQRCode);
    downloadButton.addEventListener('click', downloadQRCodeImage);

    function handleLogoSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            isLogoLoading = true;
            setGenerateButtonState(true, "Loading Logo...");
            logoPreviewContainer.classList.add('hidden');

            const reader = new FileReader();
            reader.onload = (e) => {
                selectedLogoSrc = e.target.result;
                logoPreview.src = selectedLogoSrc;
                logoPreviewContainer.classList.remove('hidden');
                isLogoLoading = false;
                setGenerateButtonState(false, "Generate QR Code");
            };
            reader.onerror = () => {
                alert("Error reading logo file.");
                resetLogoSelection();
            };
            reader.readAsDataURL(file);
        } else if (file) {
            alert("Please select a valid image file (PNG, JPG, GIF, SVG).");
            resetLogoSelection();
        } else {
            resetLogoSelection();
        }
    }

    function setGenerateButtonState(disabled, text) {
        if (generateButton) {
            generateButton.disabled = disabled;
            generateButton.textContent = text;
        }
    }

    function resetLogoSelection() {
        selectedLogoSrc = null;
        logoPreviewContainer.classList.add('hidden');
        logoPreview.src = "#";
        logoInput.value = "";
        isLogoLoading = false;
        setGenerateButtonState(false, "Generate QR Code");
        if (qrCodeInstance) {
            generateQRCode();
        }
    }

    function generateQRCode() {
        if (isLogoLoading) {
            alert("Please wait for the logo to finish loading.");
            return;
        }

        const textOrUrl = urlInput.value.trim();
        if (!textOrUrl) {
            alert('Please enter a URL or text to generate the QR code.');
            return;
        }

        qrCodeOutputDiv.innerHTML = '';
        downloadButton.classList.add('hidden');

        const options = {
            width: 280,
            height: 280,
            data: textOrUrl,
            margin: 10,
            qrOptions: {
                typeNumber: 0,
                mode: 'Byte',
                errorCorrectionLevel: 'H'
            },
            dotsOptions: {
                type: dotsStyleSelect.value,
                color: foregroundColorInput.value
            },
            backgroundOptions: {
                color: backgroundColorInput.value,
            },
            cornersSquareOptions: {},
            cornersDotOptions: {},
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.35,
                margin: 8
            }
        };

        if (useGradientCheckbox.checked) {
            let rotation = 0;
            switch (gradientDirectionSelect.value) {
                case 'horizontal': rotation = 0; break;
                case 'vertical': rotation = Math.PI / 2; break;
                case 'diagonal-tl-br': rotation = Math.PI / 4; break;
                case 'diagonal-tr-bl': rotation = (3 * Math.PI) / 4; break;
            }
            options.dotsOptions.gradient = {
                type: 'linear',
                rotation: rotation,
                colorStops: [
                    { offset: 0, color: gradientStartColorInput.value },
                    { offset: 1, color: gradientEndColorInput.value }
                ]
            };
            delete options.dotsOptions.color;
        }

        if (selectedLogoSrc) {
            options.image = selectedLogoSrc;
        } else {
            delete options.image;
        }

        try {
            qrCodeInstance = new QRCodeStyling(options);
            qrCodeInstance.append(qrCodeOutputDiv);
            downloadButton.classList.remove('hidden');
        } catch (error) {
            console.error("Error generating QR Code with qr-code-styling:", error);
            alert(`Could not generate QR code. ${error.message}. Check console for details.`);
            downloadButton.classList.add('hidden');
        }
    }

    function downloadQRCodeImage() {
        if (qrCodeInstance) {
            qrCodeInstance.download({ name: "custom-qrcode", extension: "png" });
        } else {
            alert("Please generate a QR code first.");
        }
    }
});
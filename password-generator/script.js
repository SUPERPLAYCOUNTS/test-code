document.addEventListener('DOMContentLoaded', () => {
    const passwordOutput = document.getElementById('password-output');
    const lengthSlider = document.getElementById('length');
    const lengthDisplay = document.getElementById('length-display');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate-btn');

    const options = {
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        numbers: document.getElementById('numbers'),
        symbols: document.getElementById('symbols'),
        excludeSimilar: document.getElementById('exclude-similar')
    };

    const passwordTypeSelect = document.getElementById('password-type');
    const quantityInput = document.getElementById('quantity');
    
    const multiPasswordContainer = document.getElementById('multi-password-output-container');
    const multiPasswordOutput = document.getElementById('multi-password-output');
    
    const strengthIndicator = document.getElementById('password-strength-indicator');
    const strengthText = document.getElementById('password-strength-text');

    const qrcodeCanvas = document.getElementById('qrcode');
    let qr;

    const charsets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    const similarChars = /[ilI1|oO0]/g;

    lengthSlider.addEventListener('input', (e) => {
        lengthDisplay.textContent = e.target.value;
    });

    generateBtn.addEventListener('click', generatePasswords);

    copyBtn.addEventListener('click', () => {
        if (passwordOutput.value) {
            navigator.clipboard.writeText(passwordOutput.value);
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="far fa-copy"></i>';
            }, 2000);
        }
    });

    document.querySelector('.export-buttons').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const format = e.target.dataset.format;
            exportPasswords(format);
        }
    });

    function generatePasswords() {
        const quantity = parseInt(quantityInput.value, 10);
        const passwords = [];
        
        for (let i = 0; i < quantity; i++) {
            passwords.push(createSinglePassword());
        }

        passwordOutput.value = passwords[0] || '';
        updateStrengthMeter(passwords[0] || '');
        updateQRCode(passwords[0] || '');

        if (quantity > 1) {
            multiPasswordOutput.value = passwords.join('\n');
            multiPasswordContainer.style.display = 'block';
        } else {
            multiPasswordContainer.style.display = 'none';
        }
    }

    function createSinglePassword() {
        const length = parseInt(lengthSlider.value, 10);
        const type = passwordTypeSelect.value;

        switch (type) {
            case 'word-like':
                return generateWordLikePassword(length);
            case 'passphrase':
                return generatePassphrase(4);
            default:
                return generateRandomPassword(length);
        }
    }

    function generateRandomPassword(length) {
        let charset = '';
        if (options.uppercase.checked) charset += charsets.uppercase;
        if (options.lowercase.checked) charset += charsets.lowercase;
        if (options.numbers.checked) charset += charsets.numbers;
        if (options.symbols.checked) charset += charsets.symbols;

        if (charset === '') {
            alert('Please select at least one character type.');
            return '';
        }

        if (options.excludeSimilar.checked) {
            charset = charset.replace(similarChars, '');
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    function generateWordLikePassword(length) {
        const vowels = 'aeiou';
        const consonants = 'bcdfghjklmnpqrstvwxyz';
        let password = '';
        let useUppercase = options.uppercase.checked;

        for (let i = 0; i < length; i++) {
            let char;
            if (i % 2 === 0) {
                char = consonants[Math.floor(Math.random() * consonants.length)];
            } else {
                char = vowels[Math.floor(Math.random() * vowels.length)];
            }
            if (useUppercase && Math.random() > 0.7) {
                 char = char.toUpperCase();
            }
            password += char;
        }
        if (options.numbers.checked) {
            password = password.slice(0, -2) + charsets.numbers[Math.floor(Math.random() * charsets.numbers.length)];
        }
        if (options.symbols.checked) {
             password = password.slice(0, -1) + charsets.symbols[Math.floor(Math.random() * charsets.symbols.length)];
        }

        return password.slice(0, length);
    }
    const wordList = ["sunrise", "wolf", "laptop", "forest", "river", "mountain", "ocean", "eagle", "galaxy", "shadow", "winter", "summer"];
    
    function generatePassphrase(wordCount) {
        let passphrase = [];
        for (let i = 0; i < wordCount; i++) {
            passphrase.push(wordList[Math.floor(Math.random() * wordList.length)]);
        }
        return passphrase.join('-');
    }
    function updateStrengthMeter(password) {
        let score = 0;
        if (!password) {
            strengthIndicator.style.width = '0%';
            strengthText.textContent = '';
            return;
        }

        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        let width = (score / 5) * 100;
        let color = 'var(--strength-weak)';
        let text = 'Weak';

        if (score >= 4) {
            color = 'var(--strength-very-strong)';
            text = 'Very Strong';
        } else if (score === 3) {
            color = 'var(--strength-strong)';
            text = 'Strong';
        } else if (score === 2) {
            color = 'var(--strength-medium)';
            text = 'Medium';
        }
        
        strengthIndicator.style.width = `${width}%`;
        strengthIndicator.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }

    function updateQRCode(text) {
        if (!text) {
            qrcodeCanvas.getContext('2d').clearRect(0, 0, qrcodeCanvas.width, qrcodeCanvas.height);
            return;
        }
        if (!qr) {
            qr = new QRious({
                element: qrcodeCanvas,
                value: text,
                size: 180,
                padding: 10,
                background: 'white',
                foreground: 'black'
            });
        } else {
            qr.value = text;
        }
    }
    
    function exportPasswords(format) {
        const passwords = multiPasswordOutput.value;
        if (!passwords) return;

        let data, mimeType, filename;
        const blobbedPasswords = passwords.split('\n');

        switch(format) {
            case 'txt':
                data = passwords;
                mimeType = 'text/plain';
                filename = 'passwords.txt';
                break;
            case 'csv':
                data = 'index,password\n' + blobbedPasswords.map((p, i) => `${i+1},"${p}"`).join('\n');
                mimeType = 'text/csv';
                filename = 'passwords.csv';
                break;
            case 'json':
                data = JSON.stringify({ passwords: blobbedPasswords }, null, 2);
                mimeType = 'application/json';
                filename = 'passwords.json';
                break;
        }

        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    generatePasswords();
});

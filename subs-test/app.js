const select = document.querySelector('select.change-lang');
const allLang = ['en', 'ru', 'ua'];

if (select) {
    select.addEventListener('change', changeURLLanguage);
}

function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substring(1);

    if (!allLang.includes(hash)) {
        if (window.location.hash !== '#en' && hash !== 'en') {
            location.href = window.location.pathname + '#en';
            location.reload();
            return;
        }
        hash = 'en';
    }

    if (select) {
        select.value = hash;
    }


    for (let key in langArr) {
        let elems = document.querySelectorAll('.lng-' + key);
        if (elems.length > 0) {
            elems.forEach(elem => {
                if (langArr[key] && langArr[key][hash]) {
                    elem.innerHTML = langArr[key][hash];
                } else {
                    console.warn(`No translation for key '${key}' in language '${hash}'`);
                }
            });
        }
    }
}

changeLanguage();
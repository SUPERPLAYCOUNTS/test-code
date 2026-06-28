const RULES = {
    100: {
        easy: 10,
        medium: 7,
        hard: 4
    },
    50: {
        easy: 9,
        medium: 6,
        hard: 3
    },
    10: {
        easy: 5,
        medium: 3,
        hard: 2
    },
    5: {
        easy: 3,
        medium: 2,
        hard: 1
    }
};

let target,attLeft,maxNum,maxAtt,turn;

const $ = id => document.getElementById(id);

function showScreen(name) {
    ['start','game','end'].forEach(s=>$('screen-'+s).classList.remove('active'));
    $('screen-'+name).classList.add('active');
}

function startGame() {
    maxNum = parseInt($('sel-range').value);
    const diff = $('sel-diff').value;
    maxAtt = RULES[maxNum][diff];
    attLeft = maxAtt;
    turn = 0;
    target = Math.floor(Math.random()*(maxNum+1));

    $('g-range').textContent = '0 - '+maxNum;
    $('g-att').textContent = attLeft;
    $('guess-input').max = maxNum;
    $('guess-input').value = '';
    $('history-list').innerHTML = '';
    $('history-section').style.display = 'none';
    $('hint-line').textContent = 'Type a number and press Enter';
    $('hint-line').className = 'hint-line';
    updateBar();

    showScreen('game');
    $('guess-input').focus();
}

function updateBar() {
    const pct = (attLeft/maxAtt)*100;
    const bar = $('bar-fill');
    bar.style.width = pct+'%';
    bar.style.background = pct>60 ? 'var(--green)' : pct>30 ? 'var(--yellow)' : 'var(--red)';
}

function makeGuess() {
    const inp = $('guess-input');
    const raw = inp.value.trim();
    if(raw===''||isNaN(raw)||+raw<0||+raw>maxNum) {
        inp.classList.add('shake');
        setTimeout(()=>inp.classList.remove('shake'),350);
        return;
    }

    const g = parseInt(raw,10);
    attLeft--;
    turn++;
    $('g-att').textContent = attLeft;
    updateBar();

    if(g===target) {
        showEnd(true);
        return;
    }

    const higher = target>g;
    const hint = $('hint-line');
    hint.textContent = higher ? '↑  Go higher' : '↓  Go lower';
    hint.className = 'hint-line '+(higher?'up':'down');

    const sect = $('history-section');
    sect.style.display = 'block';
    const li = document.createElement('div');
    li.className = 'h-item';
    li.innerHTML =
        '<span class="h-idx">#'+turn+'</span>'+
        '<span class="h-val">'+g+'</span>'+
        '<span class="h-dir '+(higher?'up':'down')+'">'+(higher?'↑ higher':'↓ lower')+'</span>';
    $('history-list').insertBefore(li,$('history-list').firstChild);

    if(attLeft===0) {
        showEnd(false);
        return;
    }
    inp.value='';
    inp.focus();
}

function showEnd(win) {
    $('end-icon').textContent = win ? '🎉' : '💀';
    const t=$('end-title');
    t.textContent = win ? 'You guessed the number!' : 'You did not guess the number';
    t.className = 'end-title '+(win?'win':'lose');

    const cap=$('end-caption');
    cap.textContent = win ? 'Solved in '+turn+(turn===1?' guess':' guesses')+' 🔑' : 'The number was:';

    const n=$('end-number');
    n.textContent = target;
    n.className = 'end-number '+(win?'win':'lose');

    showScreen('end');
}

function goToMenu() {
    showScreen('start');
}

$('guess-input').addEventListener('keypress',e=>{
    if(e.key==='Enter') makeGuess();
});
const sampleQuotes = [
    "Cambodia is the best country in the world. Cambodia has a lot of beautiful places to visit such as temples, beaches, mountains and forests.",
    "Good morning everyone. My name's Visal here is my assignment for teacher Sovann.",
    "Software Engineering is the best major to study, because you can find a good job with a high salary and you need to do research and practice at home to improve your self."
];

const mainKeyboardLayout = [
    [
        { code: "Escape", label: "Esc" }, { code: "spacer" },
        { code: "F1", label: "F1" }, { code: "F2", label: "F2" }, { code: "F3", label: "F3" }, { code: "F4", label: "F4", class: "spacer-f" },
        { code: "F5", label: "F5" }, { code: "F6", label: "F6" }, { code: "F7", label: "F7" }, { code: "F8", label: "F8", class: "spacer-f" },
        { code: "F9", label: "F9" }, { code: "F10", label: "F10" }, { code: "F11", label: "F11" }, { code: "F12", label: "F12" }
    ],
    [
        { code: "Backquote", label: "`" }, { code: "Digit1", label: "1" }, { code: "Digit2", label: "2" }, { code: "Digit3", label: "3" },
        { code: "Digit4", label: "4" }, { code: "Digit5", label: "5" }, { code: "Digit6", label: "6" }, { code: "Digit7", label: "7" },
        { code: "Digit8", label: "8" }, { code: "Digit9", label: "9" }, { code: "Digit0", label: "0" }, { code: "Minus", label: "-" },
        { code: "Equal", label: "=" }, { code: "Backspace", label: "Backspace", class: "w-backspace" }
    ],
    [
        { code: "Tab", label: "Tab", class: "w-tab" }, { code: "KeyQ", label: "Q" }, { code: "KeyW", label: "W" }, { code: "KeyE", label: "E" },
        { code: "KeyR", label: "R" }, { code: "KeyT", label: "T" }, { code: "KeyY", label: "Y" }, { code: "KeyU", label: "U" },
        { code: "KeyI", label: "I" }, { code: "KeyO", label: "O" }, { code: "KeyP", label: "P" }, { code: "BracketLeft", label: "[" },
        { code: "BracketRight", label: "]" }, { code: "Backslash", label: "\\", class: "w-backslash" }
    ],
    [
        { code: "CapsLock", label: "Caps", class: "w-caps" }, { code: "KeyA", label: "A" }, { code: "KeyS", label: "S" }, { code: "KeyD", label: "D" },
        { code: "KeyF", label: "F" }, { code: "KeyG", label: "G" }, { code: "KeyH", label: "H" }, { code: "KeyJ", label: "J" },
        { code: "KeyK", label: "K" }, { code: "KeyL", label: "L" }, { code: "Semicolon", label: ";" }, { code: "Quote", label: "'" },
        { code: "Enter", label: "Enter", class: "w-enter" }
    ],
    [
        { code: "ShiftLeft", label: "Shift", class: "w-lshift" }, { code: "KeyZ", label: "Z" }, { code: "KeyX", label: "X" }, { code: "KeyC", label: "C" },
        { code: "KeyV", label: "V" }, { code: "KeyB", label: "B" }, { code: "KeyN", label: "N" }, { code: "KeyM", label: "M" },
        { code: "Comma", label: "," }, { code: "Period", label: "." }, { code: "Slash", label: "/" }, { code: "ShiftRight", label: "Shift", class: "w-rshift" }
    ],
    [
        { code: "ControlLeft", label: "Ctrl", class: "w-ctrl" }, { code: "MetaLeft", label: "Win" }, { code: "AltLeft", label: "Alt" },
        { code: "Space", label: "Spacebar", class: "w-space" },
        { code: "AltRight", label: "Alt" }, { code: "MetaRight", label: "Win" }, { code: "ControlRight", label: "Ctrl", class: "w-ctrl" }
    ]
];

const numpadLayout = [
    [ { code: "NumLock", label: "Num" }, { code: "NumpadDivide", label: "/" }, { code: "NumpadMultiply", label: "*" }, { code: "NumpadSubtract", label: "-" } ],
    [ { code: "Numpad7", label: "7" }, { code: "Numpad8", label: "8" }, { code: "Numpad9", label: "9" }, { code: "NumpadAdd", label: "+", style: "grid-row: span 2; height: 96px;" } ],
    [ { code: "Numpad4", label: "4" }, { code: "Numpad5", label: "5" }, { code: "Numpad6", label: "6" } ],
    [ { code: "Numpad1", label: "1" }, { code: "Numpad2", label: "2" }, { code: "Numpad3", label: "3" }, { code: "NumpadEnter", label: "Ent", class: "w-numenter", style: "grid-row: span 2; height: 96px;" } ],
    [ { code: "Numpad0", label: "0", class: "w-numzero" }, { code: "NumpadDecimal", label: "." } ]
];

const textDisplay = document.getElementById('textDisplay');
const textInput = document.getElementById('textInput');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const timerElement = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');

let timer, maxTime = 120, timeLeft = maxTime, isTiming = false, errors = 0;

// Render logic grids
function buildLayout(targetContainer, structuralLayout) {
    targetContainer.innerHTML = '';
    structuralLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('keyboard-row');
        
        row.forEach(key => {
            if(key.code === "spacer") {
                const space = document.createElement('div');
                space.style.width = "40px";
                rowDiv.appendChild(space);
                return;
            }
            const keyDiv = document.createElement('div');
            keyDiv.classList.add('key');
            if (key.class) keyDiv.classList.add(key.class);
            if (key.style) keyDiv.style.cssText = key.style;
            
            keyDiv.innerText = key.label;
            keyDiv.setAttribute('data-code', key.code);
            rowDiv.appendChild(keyDiv);
        });
        targetContainer.appendChild(rowDiv);
    });
}

function loadQuote() {
    textDisplay.innerHTML = '';
    const randomQuote = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
    randomQuote.split('').forEach(char => {
        const span = document.createElement('span');
        span.classList.add('char');
        span.innerText = char;
        textDisplay.appendChild(span);
    });
    textDisplay.querySelectorAll('.char')[0].classList.add('active');
    textInput.value = '';
    textInput.focus();
}

document.addEventListener('click', () => textInput.focus());

textInput.addEventListener('input', () => {
    const quoteChars = textDisplay.querySelectorAll('.char');
    const inputVal = textInput.value.split('');
    
    if (!isTiming && inputVal.length > 0) {
        isTiming = true;
        timer = setInterval(startTimer, 1000);
    }
    errors = 0;

    quoteChars.forEach((charSpan, index) => {
        const typedChar = inputVal[index];
        charSpan.classList.remove('correct', 'incorrect', 'active');

        if (typedChar == null) {
            if (index === inputVal.length) charSpan.classList.add('active');
        } else if (typedChar === charSpan.innerText) {
            charSpan.classList.add('correct');
        } else {
            charSpan.classList.add('incorrect');
            errors++;
        }
    });

    let correctChars = inputVal.length - errors;
    let accuracy = inputVal.length > 0 ? Math.round((correctChars / inputVal.length) * 100) : 100;
    accuracyElement.innerText = accuracy < 0 ? 0 : accuracy;

    let timeSpentMin = (maxTime - timeLeft) / 60;
    if (timeSpentMin > 0 && inputVal.length > 0) {
        wpmElement.innerText = Math.round((inputVal.length / 5) / timeSpentMin);
    }
    if (inputVal.length >= quoteChars.length) {
        clearInterval(timer);
        textInput.disabled = true;
    }
});

// Capture physical keys precisely using browser event.code architecture
window.addEventListener('keydown', (e) => {
    const targetKey = document.querySelector(`[data-code="${e.code}"]`);
    if (targetKey) targetKey.classList.add('pressed');
});

window.addEventListener('keyup', (e) => {
    const targetKey = document.querySelector(`[data-code="${e.code}"]`);
    if (targetKey) targetKey.classList.remove('pressed');
});

function startTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.innerText = timeLeft;
    } else {
        clearInterval(timer);
        textInput.disabled = true;
    }
}

restartBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = maxTime;
    isTiming = false;
    errors = 0;
    textInput.disabled = false;
    timerElement.innerText = timeLeft;
    wpmElement.innerText = 0;
    accuracyElement.innerText = 100;
    loadQuote();
});

// App Startup Sequence
buildLayout(document.getElementById('keyboardMain'), mainKeyboardLayout);
buildLayout(document.getElementById('keyboardNumpad'), numpadLayout);
loadQuote();
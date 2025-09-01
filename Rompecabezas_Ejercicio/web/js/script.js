const SIZE = 4;
const TOTAL = SIZE * SIZE;
const GOAL = Array.from({length: TOTAL}, (_, i) =>
    i < TOTAL - 1 ? i + 1 : ""
);

// 🔴 Imagen fija en el código
let imageUrl = "Image/Imagen_SouthParkGuia.png";

const board = document.getElementById("board");
const msg = document.getElementById("mensaje");
const tiempoEl = document.getElementById("tiempo");
const movsEl = document.getElementById("movs");
const mejorEl = document.getElementById("mejor");
const refImg = document.getElementById("refImg");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnAyuda = document.getElementById("btnAyuda");
const btnBarajar = document.getElementById("btnBarajar");
const btnResolver = document.getElementById("btnResolver");
const btnTiempo = document.getElementById("btnTiempo");

let state = [];
let moves = 0;
let started = false;
let timer = null;
let seconds = 0;
let showNumbers = false;
let limiteTiempo = false;
const LIMITE_SEGUNDOS = 180; // 3 minutos

const pad = (n) => String(n).padStart(2, "0");
const fmt = (s) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;

function updateRefImage() {
    refImg.style.backgroundImage = `url('${imageUrl}')`;
}

function draw() {
    board.innerHTML = "";
    state.forEach((val, i) => {
        const tile = document.createElement("div");
        if (val === "") {
            tile.className = "tile empty";
        } else {
            tile.className = "tile";
            tile.addEventListener("click", () => move(i));
            const pos = val - 1;
            const r = Math.floor(pos / SIZE);
            const c = pos % SIZE;
            const x = (c / (SIZE - 1)) * 100;
            const y = (r / (SIZE - 1)) * 100;
            tile.style.backgroundImage = `url('${imageUrl}')`;
            tile.style.backgroundPosition = `${x}% ${y}%`;
            if (showNumbers) {
                const num = document.createElement("span");
                num.className = "num";
                num.textContent = val;
                tile.appendChild(num);
            }
        }
        board.appendChild(tile);
    });
}

function isAdjacent(a, b) {
    const ar = Math.floor(a / SIZE),
            ac = a % SIZE;
    const br = Math.floor(b / SIZE),
            bc = b % SIZE;
    return (
            (ar === br && Math.abs(ac - bc) === 1) ||
            (ac === bc && Math.abs(ar - br) === 1)
            );
}

function move(index) {
    const empty = state.indexOf("");
    if (!isAdjacent(index, empty))
        return;
    if (!started) {
        started = true;
        startTimer();
    }
    [state[index], state[empty]] = [state[empty], state[index]];
    moves++;
    movsEl.textContent = moves;
    draw();
    checkWin();
}

let countdown = 180; // 3 minutos en segundos
let remaining = countdown;

function startTimer() {
    clearInterval(timer);
    remaining = countdown;
    tiempoEl.textContent = fmt(remaining);
    timer = setInterval(() => {
        remaining--;
        tiempoEl.textContent = fmt(remaining);
        if (remaining <= 0) {
            clearInterval(timer);
            alert("⏰ Se acabó el tiempo, perdiste.");
            reset(true);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function shuffleSolvable(arr) {
    const a = arr.slice();
    do {
        a.sort(() => Math.random() - 0.5);
    } while (!isSolvable(a));
    return a;
}

function inversions(a) {
    const flat = a.filter((x) => x !== "");
    let inv = 0;
    for (let i = 0; i < flat.length; i++) {
        for (let j = i + 1; j < flat.length; j++) {
            if (flat[i] > flat[j])
                inv++;
        }
    }
    return inv;
}

function blankRowFromBottom(a) {
    const idx = a.indexOf("");
    const row = Math.floor(idx / SIZE);
    return SIZE - row;
}

function isSolvable(a) {
    const inv = inversions(a);
    const blankFromBottom = blankRowFromBottom(a);
    if (SIZE % 2 === 0) {
        return (
                (blankFromBottom % 2 === 0 && inv % 2 === 1) ||
                (blankFromBottom % 2 === 1 && inv % 2 === 0)
                );
    } else {
        return inv % 2 === 0;
    }
}

function checkWin() {
    if (JSON.stringify(state) === JSON.stringify(GOAL)) {
        stopTimer();
        msg.className = "msg win";
        msg.textContent = `¡Felicidades! Completaste el rompecabezas en ${fmt(
                seconds
                )} y ${moves} movimientos.`;
        alert("🎉 ¡Felicidades, resolviste el rompecabezas!");
    }
}

function reset(runShuffle = true) {
    stopTimer();
    seconds = 0;
    tiempoEl.textContent = fmt(seconds);
    moves = 0;
    movsEl.textContent = moves;
    started = false;
    msg.textContent = "";
    msg.className = "msg";
    state = runShuffle ? shuffleSolvable(GOAL) : GOAL.slice();
    draw();
}

btnReiniciar.addEventListener("click", () => reset(true));
btnBarajar.addEventListener("click", () => reset(true));
btnResolver.addEventListener("click", () => reset(false));

btnAyuda.addEventListener("click", () => {
    showNumbers = !showNumbers;
    btnAyuda.textContent = showNumbers
            ? "Ocultar números"
            : "Mostrar números";
    btnAyuda.setAttribute("aria-pressed", String(showNumbers));
    draw();
});

btnTiempo.addEventListener("click", () => {
    limiteTiempo = !limiteTiempo;
    btnTiempo.textContent = limiteTiempo
            ? "Tiempo: 3 min"
            : "Tiempo: Infinito";
    btnTiempo.setAttribute("aria-pressed", String(limiteTiempo));
    reset(true);
});

(function init() {
    updateRefImage();
    reset(true);
})();
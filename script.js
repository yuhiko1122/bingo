// 1から75までの数字を全て格納
const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
// シャッフルしておく
let shuffledNumbers = shuffle(numbers);
let history = [];
let drumRollInterval;
let numberAnimationInterval;
let isRolling = false; // ロール状態を管理するフラグ

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ドラムロールを再生し、ランダム数字のアニメーションを開始する関数
function startRoll() {
    if (isRolling) return; // 既にロール中なら何もしない
    isRolling = true; // ロール開始

    const drumRoll = document.getElementById('drum-roll');
    drumRoll.currentTime = 0;
    drumRoll.play();

    // ドラムロールをループ再生
    drumRollInterval = setInterval(() => {
        drumRoll.currentTime = 0;
        drumRoll.play();
    }, drumRoll.duration * 1000); // 音声の再生時間に基づいてループ

    // 0.05秒ごとにランダムな数字を表示するアニメーション
    numberAnimationInterval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 75) + 1; // 1から75までのランダムな数字
        document.getElementById('number').textContent = randomNumber;
    }, 50); // 50ミリ秒ごとにランダムな数字を表示
}

// ドラムロールを停止し、アニメーションを止めて、シンバルを鳴らし、最終的な数字を表示する関数
function stopRoll() {
    if (!isRolling) return; // ロール中でなければ何もしない
    isRolling = false; // ロール終了

    const drumRoll = document.getElementById('drum-roll');
    drumRoll.pause();
    clearInterval(drumRollInterval); // ループ停止
    clearInterval(numberAnimationInterval); // アニメーションを停止

    // #number 要素を即座に非表示にする
    const numberElement = document.getElementById('number');
    numberElement.style.opacity = '0';

    // 0.5秒後にシンバルの音を再生
    setTimeout(() => {
        const cymbalSound = document.getElementById('cymbal-sound');
        cymbalSound.currentTime = 0;
        cymbalSound.play();
    }, 500); // 500ミリ秒（0.5秒）

    // 0.5秒後に数字を再表示するための処理
    setTimeout(() => {
        numberElement.style.opacity = '1';
        generateRandomNumber(); // 最終的な数字を表示
    }, 500); // 500ミリ秒（0.5秒）
}

function generateRandomNumber() {
    // 数字が全て表示された場合はリセット
    if (shuffledNumbers.length === 0) {
        document.getElementById('number').textContent = "Fin.";
        return;
    }

    // 次の数字を取り出して表示
    const nextNumber = shuffledNumbers.pop();
    document.getElementById('number').textContent = nextNumber;

    // 履歴に追加し、履歴を更新
    history.push(nextNumber);
    updateHistory();
}

function updateHistory() {
    const historyContainer = document.getElementById('history-content');
    historyContainer.innerHTML = '';

    let line = '';
    history.forEach((num, index) => {
        const item = `<span class="history-item">${num.toString().padStart(5, ' ')}</span>`;
        line += item + ' ';
        if ((index + 1) % 4 === 0) { // 3列ごとに改行
            historyContainer.innerHTML += `<div class="history-line">${line}</div>`;
            line = '';
        }
    });

    if (line) {
        historyContainer.innerHTML += `<div class="history-line">${line}</div>`; // 残りの数字を追加
    }
}

// キーボードのEnterキーでスタートとストップを制御
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (isRolling) {
            stopRoll(); // ロール中ならストップ
        } else {
            startRoll(); // ロールしていなければスタート
        }
    }
});

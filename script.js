// 1から75までの数字を全て格納
const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
// シャッフルしておく
let shuffledNumbers = shuffle(numbers);
let history = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateRandomNumber() {
    // ドラムロールの音声を再生
    const drumRoll = document.getElementById('drum-roll');
    drumRoll.currentTime = 0; // 音声が再生中でも最初から再生
    drumRoll.play();

    // #number 要素を非表示にして影のようなアニメーションを追加
    const numberElement = document.getElementById('number');
    numberElement.classList.add('fade-out');

    // 8秒後に数字を表示
    setTimeout(() => {
        // 数字が全て表示された場合はリセット
        if (shuffledNumbers.length === 0) {
            document.getElementById('number').textContent = "Fin.";
            numberElement.classList.remove('fade-out');
            return;
        }

        // 次の数字を取り出して表示
        const nextNumber = shuffledNumbers.pop();
        document.getElementById('number').textContent = nextNumber;

        // 履歴に追加し、履歴を更新
        history.push(nextNumber);
        updateHistory();
        numberElement.classList.remove('fade-out');
    }, 2000); // 3000ミリ秒（3秒）
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

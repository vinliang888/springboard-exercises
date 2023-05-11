async function findWord(word) {
    let wordFormData = new FormData();
    wordFormData.append('wordToFind', word)
    const res = await axios({
        url: '/check-word',
        method: "POST",
        data: wordFormData
    });
    console.log(res);
    return res.data['result'];
}

let score = 0;
$('#score').text(score);
startTime = 60;
$('#timer-sec').text(startTime);
let countdownTimer = setInterval(() => {
    startTime -= 1;
    $('#timer-sec').text(startTime);
}, 1000)
setTimeout(stopGame, 60000);

const wordFindForm = document.querySelector("#word-find-form");
wordFindForm.addEventListener("submit", async function(evt){
    evt.preventDefault();
    const word = document.querySelector("#word-input").value;
    result = await findWord(word);
    if (result == 'ok') {
        $('#result').text('Nice word!');
        score += word.length;
        $('#score').text(score);
    } else if (result == 'already-found') {
        $('#result').text("That word has already been found!");
    } else if (result == 'not-word') {
        $('#result').text("That's not a word!");
    } else if (result == 'not-on-board') {
        $('#result').text("That word is not on the board!");
    }
    document.querySelector("#word-input").value = "";
    
})

async function stopGame() {
    document.querySelector("#word-input").disabled = true;
    document.querySelector("#submit-btn").disabled = true;
    $('#result').text("Game Over!")
    clearInterval(countdownTimer);
    let scoreFormData = new FormData();
    scoreFormData.append('finalScore', score)
    const res = await axios({
        url: '/end-game',
        method: "POST",
        data: scoreFormData
    })
    $('#num-times-played').text(res.data['num_times_played']);
}

// async function startNewGame() {
   
    
//     $('#result').text("New Game!")
//     $('#start-btn').text("Reset Game")
   
//     document.querySelector("#word-input").disabled = false;
//     document.querySelector("#submit-btn").disabled = false;
// }

// const startButton = document.querySelector("#start-new-game");
// startButton.addEventListener("submit", async function(evt) {
//     evt.preventDefault();
//     console.log('here')
//     await startNewGame();    
//     startTime = 60;
//     $('#timer-sec').text(startTime);
//     countdownTimer = setInterval(() => {
//         startTime -= 1;
//         $('#timer-sec').text(startTime);
//     }, 1000)
//     setTimeout(stopGame, 60000);
// })
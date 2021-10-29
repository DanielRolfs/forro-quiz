let questions = [
    {
        "question": "Was ist Forró nicht?",
        "answer_1": "Ein Paartanz",
        "answer_2": "Etwas Essbares",
        "answer_3": "Ein Musikstil",
        "right_answer": 2
    },
    {
        "question": "Aus welchem land kommt Forró?",
        "answer_1": "Brasilien",
        "answer_2": "Argentinien",
        "answer_3": "Peru",
        "right_answer": 1
    },
    {
        "question": "Aus welchem Teil von Brasilien kommt Forró",
        "answer_1": "Südwesten",
        "answer_2": "Nordwesten",
        "answer_3": "Nordosten",
        "right_answer": 3
    },

];

let currentQuestion = 0;
let rightQuestions = 0;
let audioSuccess = new Audio('audio/correct.mp3');
let audioFail = new Audio('audio/wrong.mp3');
let audioFinished = new Audio('audio/finished.mp3');

function init(){
    document.getElementById('amountOfQuestions').innerHTML = questions.length;
    
            showQuestion();
}

function updateProgressBar(){

    let percent = (currentQuestion) / questions.length * 100
    document.getElementById('progressPercent').innerHTML = `${Math.trunc(percent)}%`;
    document.getElementById('progressPercent').style = `width: ${Math.trunc(percent)}%;`
}

function showQuestion(){

    if(gameIsOver()){
        showEndScreen();
    } else {
    updateProgressBar;
    updateToNextQuestion();
    }
}

function gameIsOver(){
    return currentQuestion >= questions.length;
}

function updateToNextQuestion(){
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1 ;

    let question = questions[currentQuestion];

    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('1').innerHTML = question['answer_1'];
    document.getElementById('2').innerHTML = question['answer_2'];
    document.getElementById('3').innerHTML = question['answer_3'];
}

function answer(selection){
    let question = questions[currentQuestion];

    let idOfRightAnswer = question['right_answer'];


    if (selection == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audioSuccess.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioFail.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('1').parentNode.classList.remove('bg-danger');
    document.getElementById('1').parentNode.classList.remove('bg-success');
    document.getElementById('2').parentNode.classList.remove('bg-danger');
    document.getElementById('2').parentNode.classList.remove('bg-success');
    document.getElementById('3').parentNode.classList.remove('bg-danger');
    document.getElementById('3').parentNode.classList.remove('bg-success');
}

/* Nicht optimal gelöst. Nächstes mal besser mit display: none im style arbeiten */
function restartGame(){
    document.getElementById('header-image').src = 'img/header.jpg';
    currentQuestion = 0;
    rightQuestions = 0; 

    document.getElementById('mainArea').innerHTML = '';
        document.getElementById('mainArea').innerHTML += `

    <h5 class="card-title" id="question">Frage</h5>

    <div class="card mb-2 quiz_answer_card">
    <div class="card-body" id="1" onclick="answer('1')">
            Antwort
        </div>
    </div>

    <div class="card mb-2 quiz_answer_card">
        <div class="card-body" id="2" onclick="answer('2')">
            Antwort
        </div>
    </div>

    <div class="card mb-2 quiz_answer_card">
        <div class="card-body" id="3" onclick="answer('3')">
            Antwort
        </div>
    </div>

    <div class="question_footer">
        <span>
            <b id="currentQuestion"></b> von <b id="amountOfQuestions"></b> Fragen
        </span>


        <button onclick="nextQuestion()" class="btn btn-primary" id="next-button" disabled>Nächste Frage</button>
    </div>
    `;

    init();
}

showEndScreen(){
    audioFinished.play();
    document.getElementById('mainArea').innerHTML = '';
    document.getElementById('mainArea').innerHTML += `You did it! :) <br>`;
    document.getElementById('mainArea').innerHTML += `
    Du hast ${rightQuestions} Fragen von ${questions.length} richtig beantwortet`;
    document.getElementById('header-image').src = 'img/done.jpg';

    document.getElementById('mainArea').innerHTML += `
    <br>
    <button onclick="restartGame()" class="btn btn-primary mt-2">Erneut spielen</button>
    `;

    let percent = (currentQuestion) / questions.length * 100
    document.getElementById('progressPercent').innerHTML = `${Math.trunc(percent)}%`;
    document.getElementById('progressPercent').style = `width: ${Math.trunc(percent)}%`;

}

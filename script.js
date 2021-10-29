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

function init(){
    document.getElementById('amountOfQuestions').innerHTML = questions.length;
    
            showQuestion();
}

function showQuestion(){

    if(currentQuestion >= questions.length){
        document.getElementById('mainArea').innerHTML = '';
        document.getElementById('mainArea').innerHTML += `You did it! :) <br>`;
        document.getElementById('mainArea').innerHTML += `
        Du hast ${rightQuestions} Fragen von ${questions.length} richtig beantwortet
        `;
    } else {

    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1 ;

    let question = questions[currentQuestion];

    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('1').innerHTML = question['answer_1'];
    document.getElementById('2').innerHTML = question['answer_2'];
    document.getElementById('3').innerHTML = question['answer_3'];
    }
}

function answer(selection){
    let question = questions[currentQuestion];

    let idOfRightAnswer = question['right_answer'];


    if (selection == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
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
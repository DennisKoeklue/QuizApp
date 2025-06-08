let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3        
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe%gt;, &alt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2          
    },
    {
        "question": "Wie stellt man Text am Besten fett dar?",
        "answer_1": "&lt;strong&gt;",
        "answer_2": "CSS nutzen",
        "answer_3": "&lt;bold&gt;",
        "answer_4": "&lt;b&gt;",
        "right_answer": 1          
    },
    {
        "question": "Welches Attribut kann man Nicht für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1         
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in Javascript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100",
        "right_answer": 4        
    }

];

let rightQuestions = 0;
let currentQuestion = 0;
// für Sound einbauen 
// let Audio_Success = new Audio (hier pfad vom MP3 data);
// let Audio_Fail = new Audio (hier pfad vom MP3 data);

function init() {
    document.getElementById('all-questions').innerHTML = questions.length
    showQuestion()

}


function showQuestion() {

    if (gameIsOver()) {
        showEndScreen(); 
    }else{
        updateProgressBar();
        updateToNextQuestion();
    }

}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('endscreen').style = '';
    document.getElementById('question-body').style = 'display: none;';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = `./img/icons/tropy.png`;    
}

function updateProgressBar() {
    // Progress-Bar // ---->
    let precent = (currentQuestion + 1) / questions.length;
    precent = Math.round(precent * 100);
    document.getElementById('progress-bar').innerHTML = `${precent} %`;
    document.getElementById('progress-bar').style.width = `${precent}%`;
    //<----
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`

    if (rightAnswerSelected(selectedQuestionNumber,question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success')
        //Audio_Success.play()
        rightQuestions++;
    }else{
        document.getElementById(selection).parentNode.classList.add('bg-danger')
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success')
        //Audio_Fail.play()
    }
    
  document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber,question ) {
    return selectedQuestionNumber == question['right_answer']
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButton();
    showQuestion();
}

function resetAnswerButton() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = `./img/icons/brainbg.jpg`;
    rightQuestions = 0;
    document.getElementById('question-body').style = ''; //question-body wieder anzeigen 
    document.getElementById('endscreen').style = 'display: none;'; // end-screen ausblenden
    currentQuestion = 0;
    init();
}
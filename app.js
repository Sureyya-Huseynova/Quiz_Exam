var text = document.querySelector('.text');
var begin = document.querySelector('.begin');
var quiz_div = document.querySelector('.quiz_div');
var question_number = document.querySelector('.question_number');
var question = document.querySelector('.question');
var a = document.querySelector('.a');
var b = document.querySelector('.b');
var c = document.querySelector('.c');
var d = document.querySelector('.d');
var point_div = document.getElementById('point');
var loading = document.querySelector('.load');
var question_div = document.querySelector('.question_div');
var All_Options_dives = document.querySelector('.All_Options_dives');
var index = 1;
var point = 0;

// when you click begin button, you will see a question div
begin.addEventListener('click', beginImtahan);
function beginImtahan() {
    begin.style.display = "none";
    text.style.display = "none";
    App();
    quiz_div.style.display = "block";

    // total time alloted to all question
    setTimeout(function () {
        quiz_div.style.display = 'none';
        ResultModule();
    }, 120000);
};

// Take questions from the api and copy the correct answer in different variants each time
function App() {
    setTimeout(() => {
        question_div.style.display = "none";
        All_Options_dives.style.display = "none";
        loading.style.display = "block";
    }, 200);
    fetch('https://opentdb.com/api.php?amount=11&category=18&difficulty=easy&type=multiple')
        .then(res => res.json())
        .then(datas => {
           one = datas.results[index];       
                question_number.innerHTML = index + " .";
                question.innerHTML = one.question;
                var random10 = Math.random() * 10 + 1;
                var random4 = Math.floor(random10 <= 4 ? random10 : random10 / 4);
                if (a.id == random4) {
                    a.innerHTML = one.correct_answer;
                    b.innerHTML = one.incorrect_answers[0];
                    c.innerHTML = one.incorrect_answers[1];
                    d.innerHTML = one.incorrect_answers[2];
                }
                if (b.id == random4) {
                    b.innerHTML = one.correct_answer;
                    a.innerHTML = one.incorrect_answers[0];
                    c.innerHTML = one.incorrect_answers[1];
                    d.innerHTML = one.incorrect_answers[2];
                }
                if (c.id == random4) {
                    c.innerHTML = one.correct_answer;
                    a.innerHTML = one.incorrect_answers[0];
                    b.innerHTML = one.incorrect_answers[1];
                    d.innerHTML = one.incorrect_answers[2];
                }
                if (d.id == random4) {
                    d.innerHTML = one.correct_answer;
                    a.innerHTML = one.incorrect_answers[0];
                    b.innerHTML = one.incorrect_answers[1];
                    c.innerHTML = one.incorrect_answers[2];
                }
                var options = document.querySelectorAll('.option');
                options.forEach(option => {
                    option.style.backgroundColor = " rgb(255, 255, 236)";
                });
                question_div.style.display = "block";
                All_Options_dives.style.display = "block";
                loading.style.display = "none"; 
        });
};

  


// choose the answer
var options = document.querySelectorAll('.option');
options.forEach(option => {
    option.addEventListener('click', CehkcAnswer);
    function CehkcAnswer() {
        if (option.innerHTML == one.correct_answer) {
            option.style.backgroundColor = "rgb(55, 238, 55)";
            point += 10;
        } else {
            option.style.backgroundColor = "red";
            point -= 2;
        }
        if (index <= 9) {
            index++;
            App();
        }
        else {
            ResultModule();
        }
    }
});


// when the question or question time, you will see your result
function ResultModule() {
    if (index = 4) {
        var result = document.querySelector('.result');
        var result_module = document.getElementById('result_module');
        result_module.style.display = 'block';
        quiz_div.style.display = "none"
        console.log(point);
        point_div.innerHTML = point;
        if (point > 40) {
            result.innerHTML = '<p>Kecdiniz</p>'
        } else {
            result.innerHTML = '<p>Kesildiniz</p>'
        }
    }
};

// click x on the result div . resultdiv is none.
document.querySelector('.close').addEventListener('click', function () {
    result_module.style.display = "none";
});






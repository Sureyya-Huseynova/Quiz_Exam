
var ques = document.querySelector('.ques');
var ques_num = document.querySelector('.ques_num');
var a = document.querySelector('.a');
var b = document.querySelector('.b');
var c = document.querySelector('.c');
var d = document.querySelector('.d');
var quiz_div = document.querySelector('.quiz_div');
var begin = document.querySelector('.begin');
var Bal = document.getElementById('bal');
var text = document.querySelector('.text');

var index = 1;
var bal = 0;


function App() {
    fetch('https://opentdb.com/api.php?amount=11&category=18&difficulty=easy&type=multiple')
        .then(res => res.json())
        .then(datas => {
            one = datas.results[index];
            ques_num.innerHTML = index + " .";
            ques.innerHTML = one.question;
            var random = Math.random() * 10 + 1;
            var texmin = Math.floor(random <= 4 ? random : random / 4);

            if (a.id == texmin) {
                a.innerHTML = one.correct_answer;
                b.innerHTML = one.incorrect_answers[0];
                c.innerHTML = one.incorrect_answers[1];
                d.innerHTML = one.incorrect_answers[2];
            }
            if (b.id == texmin) {
                b.innerHTML = one.correct_answer;
                a.innerHTML = one.incorrect_answers[0];
                c.innerHTML = one.incorrect_answers[1];
                d.innerHTML = one.incorrect_answers[2];
            }
            if (c.id == texmin) {
                c.innerHTML = one.correct_answer;
                a.innerHTML = one.incorrect_answers[0];
                b.innerHTML = one.incorrect_answers[1];
                d.innerHTML = one.incorrect_answers[2];
            }
            if (d.id == texmin) {
                d.innerHTML = one.correct_answer;
                a.innerHTML = one.incorrect_answers[0];
                b.innerHTML = one.incorrect_answers[1];
                c.innerHTML = one.incorrect_answers[2];
            }

            var secimes = document.querySelectorAll('.secim');
            secimes.forEach(secim => {
                secim.style.backgroundColor = " rgb(255, 255, 236)";
            });
        })
}

begin.addEventListener('click', beginImtahan);
function beginImtahan() {
    begin.style.display = "none";
    text.style.display = "none";
    App();
    quiz_div.style.display = "block";
};

var secimes = document.querySelectorAll('.secim');
secimes.forEach(secim => {
    secim.addEventListener('click', Cehk);
    function Cehk() {
        if (secim.innerHTML == one.correct_answer) {
            secim.style.backgroundColor = "rgb(55, 238, 55)";
            bal += 10;
        } else {
            secim.style.backgroundColor = "red";
            bal -= 2;
        }
        if (index < 10) {
            index++;
            App();
        } else {
            D();
        }

    }

});


function D() {
    if (index = 4) {
        var netice = document.querySelector('.netice');
        var module = document.getElementById('module');
        module.style.display = 'block';
        quiz_div.style.display = "none"
        Bal.innerHTML = bal;
        if (bal > 40) {
            netice.innerHTML = '<p>Kecdiniz</p>'
        } else {
            netice.innerHTML = '<p>Kesildiniz</p>'
        }
    }
};

setTimeout(function () {
    quiz_div.style.display = 'none';

    D();
}, 120000)

document.querySelector('.close').addEventListener('click',function(){
    module.style.display="none";
})



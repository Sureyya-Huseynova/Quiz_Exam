var text = document.querySelector('.text');
var text2 = document.querySelector('.text2');
var begin = document.querySelector('.begin');
var quiz_div = document.querySelector('.quiz_div');
var question_number = document.querySelector('.question_number');
var question = document.querySelector('.question');
var point_div = document.getElementById('point');
var loading = document.querySelector('.load');
var question_div = document.querySelector('.question_div');
var All_Options_dives = document.querySelector('.All_Options_dives');
var checkbox = document.querySelector('.checkbox');
var ownanswer_div = document.querySelector('#ownanswer_div');
var ownanswer = document.querySelector('#ownanswer');
var sendbtn = document.querySelector('.sendbtn');
var myAnswer_div = document.querySelector('.myAnswer_div');
var myanswerList = document.querySelector('.myanswerList');
var index = 1;
var point = 0;
var array_myanswer = [];
// extra variant see
checkbox.addEventListener("click", function () {
    ownanswer_div.style.display = "block";
});
// extra answer send array
sendbtn.addEventListener("click", Show_ownanwser_div);
function Show_ownanwser_div(){
    index++;
    App();
    array_myanswer.push(ownanswer.value);
    ownanswer.value = "";
};

// when you click begin button, you will see a question div
begin.addEventListener('click', beginImtahan);
function beginImtahan() {
    begin.style.display = "none";
    text.style.display = "none";
    text2.style.display = "none";
    checkbox.style.display = "none";
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
            var random = Math.floor(Math.random() * 100 % 4);
            var options = document.querySelectorAll('.option');
            options.forEach(option => {
                if (Number(option.id) === random) {
                    option.textContent = one.correct_answer;
                }
                else {
                    for (i = 0; i <= 2; i++) {
                        option.textContent = one.incorrect_answers[i];
                    }
                }
            })
            var options = document.querySelectorAll('.option');
            options.forEach(option => {
                option.style.backgroundColor = " rgb(255, 255, 236)";
                getComputedStyle(option, ':hove r');
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
        if (ownanswer.value == "") {
            array_myanswer.push("-----")
        }
        if (index <= 9) {
            index++;
            App();
        }
        else {
            ResultModule();
            for (i = 0; i < 10; i++) {
                var li = document.createElement('li');
                li.innerHTML += `${array_myanswer[i]}`;
                myanswerList.appendChild(li);
                myAnswer_div.style.display = "block";
            }
        }
    }
});


// when the question or question time, you will see your result
function ResultModule() {
    if (index = 4) {
        var result = document.querySelector('.result');
        var result_module = document.getElementById('result_module');
        result_module.style.display = 'block';
        result_module.style.marginBottom = "3rem";
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
    myAnswer_div.style.display = "none";
});






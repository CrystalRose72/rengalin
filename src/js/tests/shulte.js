$(document).ready(function() {

    let schulteTableQuiz = $('.schulte-table__quiz');
    let schulteTableQuizPoint = $('.schulte-table__quiz-point');
    let schulteTableQuizTimeReset = $('.schulte-table__quiz-time__reset');
    let schulteTableQuizTimeNum = $('.schulte-table__quiz-time__num');
    let schulteTableQuizPointCounter = 1;
    let schulteTable = false;

    let timer = 0

    let tableQuiz = $('.scale-result__desc.table-quiz');

    let QuizPoint = 1;
    let QuizPointList = {
        'QuizPoint_0': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        'QuizPoint_1': [21, 12, 7, 1, 20, 6, 15, 17, 3, 18, 19, 4, 8, 25, 13, 24, 2, 22, 10, 5, 9, 14, 11, 23, 16],
        'QuizPoint_2': [9, 5, 11, 23, 20, 14, 25, 17, 19, 13, 3, 21, 7, 16, 1, 18, 12, 6, 24, 4, 8, 15, 10, 2, 22],
        'QuizPoint_3': [14, 18, 7, 24, 21, 22, 1, 10, 9, 6, 16, 5, 8, 20, 11, 23, 2, 25, 3, 15, 19, 13, 17, 12, 4],
        'QuizPoint_4': [22, 25, 7, 21, 11, 6, 2, 10, 3, 23, 17, 12, 16, 5, 18, 1, 15, 20, 9, 24, 19, 13, 4, 14, 8],
        'QuizPoint_5': [5, 14, 12, 23, 2, 16, 25, 7, 24, 13, 11, 3, 20, 4, 18, 8, 10, 19, 22, 1, 21, 15, 9, 17, 6],
    };

    let timerInterval = '';

    function schulteTableQuizTimer() {
        timer = 0;
        schulteTableQuizTimeNum.html('0 сек.');
        timerInterval = setInterval(function () {
            schulteTableQuizTimeNum.html(timer + ' сек.');
            if (timer <= 60) {
                timer++;
            } else {
                clearInterval(timerInterval);
                schulteTableQuiz.html('');
                $.each(QuizPointList['QuizPoint_0'], function (index, value) {
                    schulteTableQuiz.append($('<div class="schulte-table__quiz-point" data-id="' + value + '">' + value + '</div>'));
                });
                schulteTableQuizTimeNum.html('Время походжения превысило 60&nbsp;секунд, попробуйте снова');
                schulteTable = false;

                tableQuiz.addClass('dn');
                $('.table-quiz[data-id="1"]').removeClass('dn');
            }
        }, 1000);
    }

    schulteTableQuizTimeReset.on('click', function () {
        schulteTableQuizTimeReset.html('Обновить');
        schulteTableQuizPointCounter = 1;

        tableQuiz.addClass('dn');
        $('.table-quiz[data-id="1"]').removeClass('dn');

        if (!schulteTable) {
            schulteTable = true;
        }
        schulteTableQuiz.html('');

        $.each(QuizPointList['QuizPoint_' + QuizPoint], function (index, value) {
            schulteTableQuiz.append($('<div class="schulte-table__quiz-point" data-id="' + value + '">' + value + '</div>'));
        });

        clearInterval(timerInterval);
        schulteTableQuizTimer();

        if (QuizPoint < 5) {
            QuizPoint++;
        } else {
            QuizPoint = 1;
        }
    });


    schulteTableQuiz.on('click', '.schulte-table__quiz-point', function () {
        if (schulteTableQuizPointCounter == 25) {
            clearInterval(timerInterval);

            tableQuiz.addClass('dn');
            if (timer >= 30) {
                $('.table-quiz[data-id="3"]').removeClass('dn');
            }
            if (timer < 30) {
                $('.table-quiz[data-id="2"]').removeClass('dn');
            }

        }
        if (!$(this).hasClass('active') && ($(this).attr('data-id') == schulteTableQuizPointCounter) && schulteTable) {
            $(this).addClass('active');
            schulteTableQuizPointCounter++;
        }

    });







    let scaleLineMarkPointCircle = $('.scale-line__mark-point__circle');
    let scalePointsDesc = $('.scale-points__desc');
    let scaleResultDesc = $('.scale-result__desc.fatigue');

    scaleLineMarkPointCircle.on('click', function () {
        scaleLineMarkPointCircle.removeClass('active');
        scalePointsDesc.addClass('dn');

        let dataID = $(this).attr('data-id');

        $(this).addClass('active');
        scaleResultDesc.addClass('dn');

        if(dataID <= 4 ) {
            $('.scale-result__desc[data-id="14"]').removeClass('dn');
        } else if(dataID > 4 && dataID <= 7) {
            $('.scale-result__desc[data-id="57"]').removeClass('dn');
        } else if(dataID > 7 && dataID <= 10) {
            $('.scale-result__desc[data-id="810"]').removeClass('dn');
        }

        // $('.scale-points__desc[data-id="' + dataID + '"]').removeClass('dn');
    });





//	********************

    let resultGrade = 0;
    let gradeTestItemPointCircle = $('.grade-test__item-point__circle');
    let gradeResultScore = $('.grade-result__score');
    let gradeTestDesc = $('.grade-test__desc');
    let gradeResultBtn = $('.grade-result__btn');

    gradeTestItemPointCircle.on('click', function () {
        resultGrade = 0;

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).parent().parent().find('.grade-test__item-point__circle').removeClass('active');
            $(this).addClass('active');
        }

        $.each(gradeTestItemPointCircle, function (index, value) {
            if(value.classList.contains('active')) {
                resultGrade += Number(value.dataset.id);
            }
        });
        gradeResultScore.html(resultGrade + ' балл' + declination(resultGrade));

        gradeTestDesc.addClass('dn');
        if (resultGrade <= 36) {
            $('.grade-test__desc[data-id="2"]').removeClass('dn');
        } else if (resultGrade > 36) {
            $('.grade-test__desc[data-id="3"]').removeClass('dn');
        }
    })

    function declination(number) {
        const ends = ["ов", "", "а", "а", "а", "ов", "ов", "ов", "ов", "ов"];
        let end = "";
        if (number % 100 >= 9 && number % 100 <= 19) {
            end = "ов";
        } else if (number <= 0) {
            end = "ой";
        } else {
            return ends[number % 10];
        }
        return end;
    }

    gradeResultBtn.on('click', function () {
        gradeResultScore.html('0 баллов');
        gradeTestItemPointCircle.removeClass('active');
        gradeTestDesc.addClass('dn');
        $('.grade-test__desc[data-id="1"]').removeClass('dn');
    });



    $('.js-children-test').change(function (){
        let b1 = $('.js-children-test[name="test1"]:checked').length,
            b2 = $('.js-children-test[name="test2"]:checked').length,
            b3 = $('.js-children-test[name="test3"]:checked').length;

        console.log(b1, b2, b3);
        if(b3+b2+b1 > 0) {
            $('.v1').addClass('d-none')


            if(b3 >= 4 && b1 >= 6 && b2 >=3){

                $('.v2').removeClass('d-none')
                $('.v3').addClass('d-none')
            } else {

                $('.v2').addClass('d-none')
                $('.v3').removeClass('d-none')
            }

        } else {
            $('.v1').removeClass('d-none')
            $('.v2').addClass('d-none')
            $('.v3').addClass('d-none')
        }

    });
//	********************
});



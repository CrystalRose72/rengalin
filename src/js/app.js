import { Mask, MaskInput } from 'Maska'
import "./blocks.js";
import "./forms";
import "./plugins";

console.log('v3')
$(document).ready(function(){
    $(document).on('click', '.popup-start__buttons-ok', function (e){
        console.log('hide')
        $('.popup-start_wrap').hide();
    });
    $(document).on('click', '.dd-toggle', function (e){
        if($(window).width() < 1400) {
            e.preventDefault();

            $(this).parent().toggleClass('open')
        }
    })
    new MaskInput("[data-maska]") // for masked input
})


$(window).on('load',function(){
    /* test */
    var appTest = function () {
        var $FORM;
        var $ITEMS;
        var $NUMBERS;
        var $PREV;
        var $NEXT;
        var CURRENT;

        function showCurrent() {
            $ITEMS.removeClass('active');
            $ITEMS.eq(CURRENT).addClass('active');

            $NUMBERS.removeClass('quiz_question__numbers__item-current quiz_question__numbers__item-passed');
            $NUMBERS.eq(CURRENT).addClass('quiz_question__numbers__item-current').prevAll().addClass('quiz_question__numbers__item-passed');

            if (CURRENT === 0) {
                $PREV.hide();
            } else {
                $PREV.show();
            }
        }

        function setup() {
            $PREV.on('click', function (e) {
                e.preventDefault();
                if (CURRENT === 0) return;
                CURRENT -= 1;
                showCurrent();
            });
            $NEXT.on('click', function (e) {
                e.preventDefault();
                if (CURRENT === $ITEMS.length - 1) {
                    $FORM.submit();
                } else {
                    CURRENT += 1;
                    showCurrent();
                }
            });
        }

        return {
            init: function init() {
                $FORM = $('.jsTestForm');
                $PREV = $('.jsTestPrev');
                $NEXT = $('.jsTestNext');
                $ITEMS = $('.jsTestList').children();
                $NUMBERS = $('.jsTestNumbers').children();
                CURRENT = 0;

                setup();
            }
        };
    }();
    appTest.init();

    /* slider */
    var appSlider = function () {
        var $ITEMS;
        var ITEMS_LENGTH;
        var $PREV;
        var $NEXT;
        var CURRENT;

        function showCurrent() {
            $ITEMS.removeClass('active');
            $ITEMS.eq(CURRENT).addClass('active');
        }

        function setup() {
            $NEXT.on('click', function (e) {
                e.preventDefault();
                CURRENT = CURRENT + 1 < ITEMS_LENGTH ? CURRENT + 1 : 0;
                showCurrent();
            });
            $PREV.on('click', function (e) {
                e.preventDefault();
                CURRENT = CURRENT - 1 >= 0 ? CURRENT - 1 : ITEMS_LENGTH - 1;
                showCurrent();
            });
        }

        return {
            init: function init() {
                $ITEMS = $('.main_adv__slider__list').children();
                ITEMS_LENGTH = $ITEMS.length;
                if (!ITEMS_LENGTH) return;
                $PREV = $('.main_adv__slider__arrow-prev');
                $NEXT = $('.main_adv__slider__arrow-next');
                CURRENT = 0;

                setup();
            }
        };
    }();
    appSlider.init();

    /* popup */
    var appPopup = function () {
        var $BODY;
        var $CONTENT;
        var $POPUP;

        function open(html) {

            close();

            var bodyWidth = $BODY.width();
            $BODY.css({
                position: 'relative',
                overflow: 'hidden'
            });
            $BODY.css({
                paddingRight: $BODY.width() - bodyWidth, //vertical scroll width
                width: 'auto'
            });

            $CONTENT.html(html);
            $POPUP.show();
        }

        function close() {
            $POPUP.hide();
            $CONTENT.html('');
            $BODY.removeAttr('style');
        }

        return {
            init: function init() {
                $BODY = $('body');
                $POPUP = $('' + '<div class="popup">' + '<div class="popup__overlay"></div>' + '<div class="popup__container">' + '<div class="popup__content">' + '<div class="popup__item">' + '<div class="popup__close"></div>' + '<div class="popup__item__content"></div>' + '</div>' + '</div>' + '</div>' + '</div>' + '');
                $CONTENT = $POPUP.find('.popup__item__content');

                $POPUP.hide().find('.popup__close, .popup__overlay').on('click', function (e) {
                    e.preventDefault();
                    close();
                });

                // $('body').append('<div>aPPENd</div>');
                $BODY.append($POPUP);

                $BODY.on('click', '.jsPopupClose', function (e) {
                    e.preventDefault();
                    close();
                });
            },
            close: close,
            open: open
        };
    }();
    appPopup.init();



    /* video */
    $('.main_adv__slider__list__play, .expert__play-video').on('click', function (e) {
        e.preventDefault();
        var src = $(this).attr('data-src');
        var html = '<div class="popup__video"><iframe src="https://www.youtube.com/embed/' + src + '?autoplay=1&wmode=transparent" width="100%" height="100%" frameborder="0" allowfullscreen wmode="Opaque"></iframe></div>';

        appPopup.open(html);
    });



    /* articles upload */
    var $upList = $('.jsUploadList');
    var $upButton = $('.jsUploadButton');
    var FLAG = true;

    $upButton.on('click', function (e) {
        e.preventDefault();
        if (!FLAG) return;
        FLAG = false;
        var url = $(this).attr('data-url');
        $.ajax({
            url: url,
            dataType: "json",
            error: function error(_error2) {
                console.log(_error2);
            },
            success: function success(response) {
                $upList.append(response.html);
                console.log($upList);
                if (response.isLast) {
                    $upButton.hide();
                } else {
                    FLAG = true;
                }
            }
        });
    });



    /* specialists */
    var $docPopup = $('#doctors__popup');
    if ($docPopup.length) {
        appPopup.open($docPopup.html());
    }



    $('form[action*="ajax"]').on('submit', function (event) {
        event.preventDefault();
        // var validation = true;
        // if ($(this).hasClass('faq__form'))
        //     validation = checkValidationForm($(this));

        // if (validation) {
        var t = $(this);
        var action = t.attr('action');
        var data = t.serialize();
        $.ajax({
            type: "POST",
            url: action,
            data: data,
            success: function (response) {
                try {
                    var responseObj = JSON.parse(response);
                    if(responseObj['status'] === true){
                        t[0].reset();

                        if (action == '/ajax/add_faq.php')
                            dataLayer.push({'event': 'afalaza1_form_send'});
                    }
                    // var message = '<div class="popup__message">' + responseObj['msg'] + '</div>';
                    // appPopup.open(message);
                    alert(responseObj['msg']);

                }
                catch (e) {

                    console.log(response, e);
                }
            }
        });
        // }
    });

});


$(document).ready(function() {

    $('[data-el="toggle-accordion"]').on('click', function(){
        let curAccordion = $(this).closest('[data-el="accordion"]'),
            curAccordionGroup = curAccordion.data('akk-group');
        curAccordion.toggleClass('active');
        $('[data-el="accordion"][data-akk-group="'+curAccordionGroup+'"]').not(curAccordion).removeClass('active');
        $("html, body").animate({
            scrollTop: curAccordion.offset().top - $('header').innerHeight()
        }, 500, 'swing');
    });

});

import "./header";
import "./home";





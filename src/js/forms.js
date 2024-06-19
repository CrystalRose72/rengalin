import {Notifications} from "./plugins/notifications";

$(document).ready(function(){
    $(document).on('submit', '.js-ajax-form', function (e) {
        e.preventDefault();
        var $form = $(this),
            $btn = $(this).find('button[type="submit"]'),
            text = $btn.text(),
            loadingText = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ' + $btn.data('text-loading')

        $btn.prop("disabled", true);
        $btn.html(loadingText);


        $form.find('.is-error').removeClass('is-error')
        //$form.find('.error-message').remove()


        let data = $form.serializeArray();

        data.push({name: 'page', value: window.location.href })
        data.push({name: 'lang', value: $('html').attr('lang') })


        console.log(data)
        window.ajax.postForm('/submitForm', data ).then(()=>{
            $btn.prop("disabled", false);
            $btn.html(text);

            $('.btn-close').trigger('click')

            $form.get(0).reset();
        }, (e)=>{
            e = e || {};
            if(e && e.errors) {
                Object.keys(e.errors).map((name)=>{
                    let errorText = e.errors[name],
                        $input = $form.find('[name="'+name+'"]')
                    // $wrap = $input.closest('.ui-control-group');

                    $input.addClass('is-error');
                    // $wrap.append('<div class="error-message">'+errorText+'</div>')
                });
            } else {
                Notifications.error('Server error')
            }
            $btn.prop("disabled", false);
            $btn.html(text);
        })
        return false;
    });

});

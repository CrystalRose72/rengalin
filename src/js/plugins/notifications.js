import Notify from 'simple-notify'

export const Notifications = {

    init() {
        //$.jGrowl.defaults.closerTemplate = '<div>Закрыть все</div>';
        //$.extend(this.options, options || {});
    },

    /**
     * Отображение информационного сообщения
     */
    show( title, message, type, params = {}) {
        if ( ! title && ! message ) {
            console.warn('Необходимо указать заголовок или текст уведомления');
            return;
        }


        new Notify({
            status: type,
            title: title,
            text: message,
            effect: 'fade',
            speed: 300,
            customClass: null,
            customIcon: null,
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 3000,
            gap: 20,
            distance: 20,
            type: 1,
            position: 'right bottom',
            ...params
        })

    },

    /**
     * Отображение информационного сообщения
     */
    notice( title, message, params ) {
        this.show(title, message, 'success', params)
    },

    success( title, message, params ) {
        this.show(title, message, 'success', params)
    },

    /**
     * Отображение сообщения об ошибке
     */
    error( title, message, params ) {
        this.show(title, message, 'error', params)
    },

    /**
     * Отображение сообщения об ошибке
     */
    info( title, message, params ) {
        this.show(title, message, 'warning', params)
    }
};
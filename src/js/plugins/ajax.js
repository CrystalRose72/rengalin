import axios from 'axios';
import NProgress from 'nprogress/nprogress';
NProgress.configure({ showSpinner: false });
import { Notifications } from './notifications'

let AjaxPlugin = {
    action(func='get', url, params = {}, config = {}) {
        return new Promise(function(resolve, reject) {

            config.showNotices = typeof config.showNotices === 'undefined' ? true : config.showNotices;
            config.showProgress = typeof config.showProgress === 'undefined' ? true : config.showProgress;

            if(config.showProgress) NProgress.start();

            let httpParams = func === 'post' ? params : { params: params };

            axios[func](url, httpParams, { headers: { "Content-Type": "multipart/form-data" } }).then( (response) => {

                let json = response.data;
                if( typeof json !== 'object' || !json ) {
                    Notifications.error( 'Ошибка сервера, данные не получены' )
                    reject(response);
                    return;
                }

                if(config.showProgress) NProgress.done();

                if ( !!!json.success || json.errors ) {
                    if ( config.showNotices && ( json.message_title || json.message ) ) Notifications.error( json.message_title, json.message );

                    if(json.routerRedirect || json.redirect) {
                        window.location = json.routerRedirect || json.redirect
                    }
                    reject(json);

                } else {
                    if ( config.showNotices && ( json.message_title || json.message ) ) Notifications.notice( json.message_title, json.message );
                    resolve(json)

                    if(json.routerRedirect || json.redirect) {
                        window.location = json.routerRedirect || json.redirect
                    }
                }

            },  (response) => {
                let json = response.body || {};

                if ( json.errors ) {
                    if ( config.showNotices && ( json.message_title || json.message ) ) Notifications.error( json.message_title, json.message );
                }
                if(config.showProgress) NProgress.done();
                reject(response);
            })
        });
    },
    delete(url, params = {}, config = {}){
        return AjaxPlugin.action('delete', url, params, config,)
    },
    get(url, params = {}, config = {}){
        return AjaxPlugin.action('get', url, params, config )
    },
    post(url, params = {}, config = {}){
        return  AjaxPlugin.action('post', url, params, config)
    },
    postForm(url, formParams = {}, config = {}){
        let params = {};
        formParams.map((item)=>{
            params[ item.name ] = item.value
        })
        return  AjaxPlugin.action('post', url, params, config)
    }
};

export default AjaxPlugin;
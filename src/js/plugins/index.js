import "./notifications";
import AjaxPlugin from './ajax'

window.ajax = {}
window.ajax.get = AjaxPlugin.get;
window.ajax.post = AjaxPlugin.post
window.ajax.postForm = AjaxPlugin.postForm
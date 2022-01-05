import axios from 'axios'
import qs from 'qs'
import store from 'redux/store.js'
import {doLogout} from 'redux/Slices/userSlice'
import {showLoading,hideLoading} from 'redux/Slices/appSlice'
//设置loading及致命错误跳转
function checkPermission(data){
    if(data.result.success===444){
       window.$msg(data.result.info)
       store.dispatch(doLogout())
       window.location.href=process.env.REACT_APP_HOMEPAGE
       return false;
    }
}

const config={
    baseURL: process.env.REACT_APP_BACKEND_API,
    timeout: 10000
  }

async function get(url,data){
    const token=store.getState().user.token
    config['url']=url
    config['headers']={'vshoptoken':token,'Content-Type':'application/x-www-form-urlencoded'}
    config['method']='get'
    
    store.dispatch(showLoading())
    const result=await axios.post(url,qs.stringify(data),config)
    store.dispatch(hideLoading())

    checkPermission(result.data)
    return result.data
}

async function post(url,data){
    const token=store.getState().user.token
    config['url']=url
    config['headers']={'vshoptoken':token,'Content-Type':'application/x-www-form-urlencoded'}
    config['method']='post'

    store.dispatch(showLoading())
    const result=await axios.post(url,qs.stringify(data),config)
    store.dispatch(hideLoading())

    checkPermission(result.data)
    return result.data
}

export {get,post} 
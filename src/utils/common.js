import { Toast } from 'react-vant';
import { post } from 'axios/axios.js'

window.$msg=(info)=>{Toast.info({ message: info });}
window.$post=(url,data)=>{return post(url,data);}

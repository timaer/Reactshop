import './index.css'
import Nums from 'component/nums'
import {useNavigate} from 'react-router-dom'
function ShopShowItem(props){
    let navigate=useNavigate()
    const goUrl=()=>{
       if(props.url!==undefined){
           navigate(props.url)
       }
    }
    return(
        <div className='shopshowitem-container'>
            <div onClick={()=>goUrl()}>
                  <div className='shopshowitem-img'><img src={props.img} className='shopshowImg' alt='pic'/></div>
                  <div className='shopshowitem-title'>{props.title}</div>  
            </div> 
            <div className='shopshowitem-priceitem'>
                  <div className='shopshowitem-price'>¥{props.price}</div>
                  <div className='shopshowitem-btn'><Nums type='inline' item={props.itemdata}/></div>
            </div>
      </div>
    )
}
function ShopShow(props){
   let itemcon=props.children.map((item)=>item)
   let bgstyle=props.bg!==undefined?{backgroundImage: 'url(' + props.bg + ')' }:{}
   return(
        <div className='shopshow-container' style={bgstyle}>
            <div className='shopshow-title' >{props.title}</div>
            <div className='shopshow-items'>{itemcon}</div>
        </div>
   )
}

export {ShopShow,ShopShowItem}
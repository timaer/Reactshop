import './index.css'
import Nums from 'component/nums'
import {useNavigate} from 'react-router-dom'
function ClassGoodsItem(props){
   let navigate=useNavigate()
   const goUrl=()=>{
      if(props.url!==undefined){
         navigate(props.url)
      }
   }
   return(
    <div className='goodsitem-container'>
         <div className='goodsitem-img' onClick={()=>goUrl()}><img src={props.img} className='goodsitemImg' alt='pic'/></div>     
         <div className='goodsitem-content'>
                  <div className='goodsitem-title'>{props.title}</div>  
                  <div className='goodsitem-subtitle'>{props.subtitle}</div>  
                  <div className='goodsitem-priceitem'>
                          <div className='goodsitem-price'>¥{props.price}</div>
                          <div className='goodsitem-btn'><Nums item={props.itemdata}/></div>
                  </div>
         </div>
    </div>
   )
}

function ClassGoods(props){
   let goodsContent=props.children.map((item)=>item) 
   return(
    <div className='goodsclass-container'>
        <span className='goodsclass-title' >
             {props.title}
        </span>
    <span className='goodsclass-subtitle'>{props.subtitle}</span>
     {goodsContent}
    </div>
   )
}

export {ClassGoods,ClassGoodsItem}
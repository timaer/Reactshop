import './index.css'
import { Icon } from 'react-vant';
import {useNavigate} from 'react-router-dom'
function OrderItem(props){
     let navigate=useNavigate()
     const shopinfo=props.shopinfo
     const ordergoods=props.ordergoods
     const orderinfo=props.orderinfo

     let ordergoodscon
     if(ordergoods.length===1){
            ordergoodscon=ordergoods.map((item)=>{
               return(
                   <div key={item.id}>
                        <div className='orderitem-show-icon'>
                            <img src={item.headimg} alt='pic'/>
                        </div>
                        <div className='orderitem-show-desc'>
                            <div className='orderitem-show-title'>{item.name}</div>
                        </div>
                    </div>
                  )
            })                                 
     }else{
          ordergoodscon=ordergoods.map((item)=>{
             return(
                <div className='orderitem-slide' key={item.id}>
                     <img src={item.headimg} alt='pic'/>
                </div>
             ) 
          }) 
     }

     let statuscon
     if(orderinfo.status===1){
        statuscon='待支付'
     }else if(orderinfo.status===2){
        statuscon='已完成'
     }else if(orderinfo.status===3){
        statuscon='售后中'
     }
     
     let paycon
     if(orderinfo.status===1){
          paycon=<div className='orderitem-btn orderitem-btn-pay' onClick={()=>goUrl('/gopay/'+orderinfo.id)}>去支付</div>
     }else{
          paycon=<></>
     }
     
     const goUrl=(url)=>{
         navigate(url)
     }
     return(
            <div className='orderitem-container'>
                <div className='orderitem-shopinfo'>
                        <div className='orderitem-shopinfo-logo'>
                            <img src={shopinfo.logo} alt='pic'/>
                        </div>  
                        <div className='orderitem-shopinfo-name'>
                            {shopinfo.name}
                        </div>
                        <div className='orderitem-shopinfo-arrow'>
                            <Icon src="arrow" />
                        </div>
                </div>  
                <div className='orderitem-content'>  
                        <div className='orderitem-show' >
                            {ordergoodscon}
                        </div>    
                        <div className='orderitem-sum'>
                            <div className='orderitem-sum-totalmoney'>
                                ¥{orderinfo.totalmoney} 
                            </div>
                            <div className='orderitem-sum-nums'>
                                共{orderinfo.totalnums}件
                            </div>     
                        </div> 
                </div> 
                <div className='orderitem-btn-container'>
                    <div className='orderitem-btn-left'>
                        <span className='orderitem-btn-leftstatus' >
                            {statuscon}
                        </span>
                    </div>   
                    <div className='orderitem-btn-right'>
                        <div className='orderitem-btn orderitem-btn-look' onClick={()=>goUrl("/orderdetail/"+orderinfo.id)}>
                        查看详情
                        </div>
                        {paycon} 
                    </div>      
                </div>   
            </div>
     )
}

export default OrderItem
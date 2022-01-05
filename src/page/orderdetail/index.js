import './index.css'
import NavTop from 'component/navtop'
import {Cell,Icon,SubmitBar} from 'react-vant'
import {useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
function OrderDetail(){
    const {id}=useParams()
    let navigate=useNavigate()
    const [orderinfo,setorderinfo]=useState([]) 
    const [cartlistcon,setcartlistcon]=useState([])
    const [paycon,setpaycon]=useState(null)

    useEffect(()=>{
        getOrderInfo()
        // eslint-disable-next-line
    },[])

    const getOrderInfo= () =>{
        window.$post("/order/getOrderDetail",{orderid:id}).then((data)=>{
            if(data.result.success){
               setorderinfo(data.result.info)
               let orderdata=data.result.info
               let cartListContent=orderdata.ordergoods.map((item)=>{
                    return(
                        <div className='cellitem' key={item.id}>
                            <div className='goodsimg'><img src={item.headimg} alt='pic'/></div>
                            <div className='info'>
                                <div className='line'><div className='goodstitle'>{item.name}</div><div className='price'>¥{item.price}</div></div>
                                <div className='line'><div className='subprice'>x{item.nums}</div><div className='dashprice'>¥{item.dashprice}</div></div>
                            </div>
                        </div>
                    )
                })
                setcartlistcon(cartListContent)
                let paycontent=orderdata.status===1?<SubmitBar price={orderdata.realmoney*100} buttonText="提交订单" onSubmit={()=>navigate("/gopay/"+orderdata.id)} /> :<></>
                setpaycon(paycontent)
            }else{
               window.$msg(data.result.info)
            }
        })
    }

   
   return(
      <div className='maincontent awaytop'>
          <NavTop title='订单详情' />
          <Cell  className='mtsmall' >
               <div className='order_addrinfo'>
                <div><Icon name="location-o" /><span className='order_addrinfo_tip'>收货地址:</span>{orderinfo.province+orderinfo.city+orderinfo.county}</div>
                <div>{orderinfo.name} {orderinfo.mobile}</div>
               </div>  
         </Cell>
         <Cell className='mtsmall'>
             <div className='orderdetail_ordernum'>订单号:{orderinfo.ordernum}</div>
             {cartlistcon}
         </Cell>
         <Cell.Group className='mtsmall'>
               <Cell title="备注">{orderinfo.memo}</Cell>
               <Cell title="餐具份数">{orderinfo.dinnerware}</Cell>
         </Cell.Group>
         {paycon}
      </div>
   )
}

export default OrderDetail
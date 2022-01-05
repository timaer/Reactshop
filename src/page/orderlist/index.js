import { Tabs } from 'react-vant';
import './index.css'
import {useState,useEffect} from 'react'
import OrderItem from 'component/orderitem'
function Orderlist(){
    const [orderList,setOrderList]=useState(null)
    useEffect(()=>{
        getOrderList(0)
    },[])

    const getOrderList= (status) =>{
        window.$post("/order/getOrderList",{status:status}).then((data)=>{
           if(data.result.success){
                const orderlistcon=data.result.info.map((item)=>{
                    return(
                        <OrderItem 
                        key={item.id}
                        shopinfo={item.shopinfo}
                        ordergoods={item.ordergoods}
                        orderinfo={item.orderinfo}/>
                    )
                })
                setOrderList(orderlistcon) 
           }else{
               window.$msg(data.result.info)
           }
        })
    }

    const handleChangeTab=(status,title)=>{
       getOrderList(status)
    }
    
    return(
       <div className='maincontent'>
            <Tabs active="active" titleActiveColor="#646566" onChange={handleChangeTab} className='orderlist_tab'>
                <Tabs.TabPane title="全部"></Tabs.TabPane>
                <Tabs.TabPane title="待付款"></Tabs.TabPane>
                <Tabs.TabPane title="待评价"></Tabs.TabPane>
                <Tabs.TabPane title="待退款"></Tabs.TabPane>
            </Tabs>
            <div className='orderlist'>
                    {orderList}
            </div>
       </div>  
    )
}
export default Orderlist
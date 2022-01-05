import './index.css'
import {SubmitBar,Icon,Badge,ActionSheet} from 'react-vant'
import {ClassGoods,ClassGoodsItem} from 'component/classgoods'
import {useSelector} from 'react-redux'
import {useState} from 'react'
import {getCartTotalNums,getCartTotalMoney} from 'redux/Slices/cartSlice'
import {useNavigate} from 'react-router-dom'

function CartBar(props){
    let navigate=useNavigate()
    const totalnums=useSelector(state=>getCartTotalNums(state))
    const totalmoney=useSelector(state=>getCartTotalMoney(state))
    const checkOrder=()=>{
        if(totalmoney<=0){
            window.$msg("您的购物车还是空的哦！");return false;
        }
        navigate("/order")
    } 
    return (
        <SubmitBar
            price={totalmoney*100}
            buttonText="提交订单"
            tip={<div className='tipwords'><Icon name="info-o" />全场满99包邮</div>}
            onSubmit={()=>checkOrder()}
            >
            <div className='shop_cart_icon' onClick={props.onClick}>
                    <Badge content={totalnums}>
                        <Icon name='cart' size='18'/>
                    </Badge>
            </div> 
        </SubmitBar>
    )
}
function Cart(){
   const [cartShow,setCartShow]=useState(false) 
   let cartlist=useSelector(state=>state.cart.cartlist)
   let classgoodscon=cartlist.map((item)=><ClassGoodsItem key={item.id} title={item.name} subtitle={item.desc} price={item.price} img={item.headimg} itemdata={item}/>)

   return(
       <>
        <ActionSheet title="购物清单" visible={cartShow} onCancel={() => setCartShow(!cartShow)} overlayClass='popCart'>
           <div className='cart-content'>
                <ClassGoods title='已选商品' subtitle='购物车' >{classgoodscon}</ClassGoods>
                <CartBar onClick={()=>setCartShow(!cartShow)} />
            </div> 
        </ActionSheet>
        <CartBar onClick={()=>setCartShow(!cartShow)}/> 
      </> 
   )


}

export default Cart
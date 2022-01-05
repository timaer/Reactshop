import './index.css'
import NavTop from 'component/navtop'
import Nums from 'component/nums'
import {Checkbox,Button} from 'react-vant'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux' 
import {useState} from 'react'
import {getCheckedTotalMoney,checkAll,checkOne,checkOut,delCheck} from 'redux/Slices/cartSlice'

function ShopCart(){
    let dispatch=useDispatch()
    const [editable,seteditable]=useState(false)
    const [checkedAll,setcheckedAll]=useState(false)
    let navigate=useNavigate()
    const toggleEdit=()=>{
        seteditable(!editable)
    }
    const goUrl=(url)=>{
         navigate(url)
    }
    let cartlist=useSelector(state=>state.cart.cartlist)
    let carttotal=useSelector(state=>getCheckedTotalMoney(state))
    let cartlistcon=cartlist.map((item)=>{
        return(
            <div className='goodsitem-container' key={item.id}>
                 <div className='checkbox'><Checkbox checked={item.checked} checkedColor="#ee0a24" onClick={()=>handleCheckOne(item.id)}></Checkbox></div>
                <div className='goodsitem-img' onClick={()=>goUrl('/goodsdetail/'+item.id)}><img src={item.headimg} className='goodsitemImg' alt='pic'/></div>
                <div className='goodsitem-content'>
                            <div className='goodsitem-title'>{item.title}</div>  
                            <div className='goodsitem-priceitem'>
                                    <div className='goodsitem-price'>¥{item.price}</div>
                                    <div className='goodsitem-btn'><Nums item={item}/></div>
                            </div>
                </div>    
            </div>
        )
    })    
    const handleCheckOne=(id)=>{
        dispatch(checkOne(id))
    }

    const handleCheckAll=()=>{
       let checkStatus=!checkedAll
       setcheckedAll(checkStatus)
       dispatch(checkAll(checkStatus))
    }
    let submitcon
    if(!editable){
        submitcon=(
            <div className='submitbar'  >
                 <div className='checkbox'>
                 <Checkbox checked={checkedAll} checkedColor="#ee0a24" onClick={()=>handleCheckAll()}>全选</Checkbox>
                 </div>
                 <div className='rightcon'>
                     合计：
                     <div className='price'>¥{carttotal}</div>
                     <div className='btn'><Button type='danger' onClick={()=>doCheckout()} round>去结算</Button></div>
                 </div>
            </div>
        )
    }else{
        submitcon=(
           <div className='submitbar' >
                <div className='checkbox'>
                <Checkbox checked={checkedAll} checkedColor="#ee0a24" onClick={()=>handleCheckAll()}>全选</Checkbox>
                </div>
                <div className='rightcon'>
                     <div className='btn'><Button type='danger' onClick={()=>doDeleteItem()} round>删 除</Button></div>
                 </div>
           </div>
        )
    }

    const doCheckout=()=>{
        dispatch(checkOut())
        if(carttotal<=0){
            window.$msg("请选择结算商品");return false;
        } 
        navigate("/order")
    }

    const doDeleteItem=()=>{
       dispatch(delCheck()) 
    }

    return(
        <div className='maincontent awaytop' id='shopcart'>
            <NavTop title='购物车' rightText={<div>编辑</div>}  rightClick={()=>toggleEdit()}/>
            <div className="cart-content">
            <div className='goodsclass-container'>
                <span className='goodsclass-title' >购物列表</span>
                {cartlistcon}
            </div>
            {submitcon}
            </div>
        </div>
    )
}

export default ShopCart
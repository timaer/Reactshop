import './index.css'
import { Badge } from 'react-vant';
import {addToCart ,delFromCart,getCartGoodsNums} from 'redux/Slices/cartSlice'
import {useDispatch,useSelector} from 'react-redux';

function Nums(props){
    let dispatch=useDispatch()
    let goodsnum=useSelector(state=>getCartGoodsNums(state,props.item))

    const add=()=>{
        dispatch(addToCart(props.item))
    }
    const dec=()=>{
        dispatch(delFromCart(props.item))
    }

    let numContent
    let badgeContent
    if(props.type!=='inline'){
        numContent=(
         <>
            <div className='price-btn' onClick={()=>dec()}>-</div>
            <div className='price-input'><input value={goodsnum} readOnly/></div>
         </>
        )
        badgeContent=<></>
    }else{
        numContent=<></>
        badgeContent=(
                <div className='price-badge'>
                    <Badge content={goodsnum}></Badge>
                </div>  
        )
    }

    return(
        <div className='price-container'>
             {numContent}
            <div className='price-btn' onClick={()=>add()}>+
             {badgeContent}   
            </div>      
        </div>
    )
}

export default Nums
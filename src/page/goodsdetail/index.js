import './index.css'
import {useParams} from 'react-router-dom'
import {Button,Swiper} from 'react-vant'
import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {addToCart} from 'redux/Slices/cartSlice'
import Icon from 'component/icon'
import {useNavigate} from 'react-router-dom'
import {ShopShow,ShopShowItem} from 'component/shopshow'
import Cart from 'component/cart'

function GoodsDetail(){
    const {id}=useParams()
    let dispatch=useDispatch()
    let navigate=useNavigate()
    const [goodsinfo,setgoodsinfo]=useState({})
    const [goodsslide,setgoodsslide]=useState([])
    const [moregoods,setmoregoods]=useState([])
    useEffect(()=>{
        window.$post("/shop/getGoodsInfo",{id:id}).then((data)=>{
            if(data.result.success){
                setgoodsinfo(data.result.info.goodsinfo)
                let slidecontent=data.result.info.goodsslide.map((item)=><Swiper.Item key={item.id}><img src={item.img} alt='pic' className='slideimg_style'/></Swiper.Item>)
                let slidelist=<Swiper className="my-swipe" autoplay={3000}>{slidecontent}</Swiper>
                setgoodsslide(slidelist) 
                let moregoodscon=data.result.info.moregoods.map((item)=><ShopShowItem key={item.id} img={item.headimg} title={item.name} price={item.price} url={'/goodsdetail/'+item.id} itemdata={item}/>)
                setmoregoods(moregoodscon) 
            }else{
                window.$msg(data.result.info)
            }
        })
    },[id])

    const addCart=(item)=>{
        dispatch(addToCart(item))
    }
    return(
        <div id='goodsdetail'>
                        <Icon src='left' className='navleft' onClick={()=>navigate(-1)}/>
                            {goodsslide}
                         <div className='goodspanel'>
                            <div className='title'>{goodsinfo.name}</div>
                            <div className='subtitle'>{goodsinfo.desc}</div>
                            <div className='priceline'>
                                <div className='mainprice'>¥{goodsinfo.price}</div>
                                <div className='dashprice'>¥{goodsinfo.dashprice}</div>   
                                <div className='btncart'>
                                    <Button type="danger" size='mini' round onClick={()=>addCart(goodsinfo)}>+加入购物车</Button>
                                </div>         
                            </div>
                        </div>  
                        <div className='goodspanel'>
                            <div className='title'>商品详情</div>
                            <div className='priceline'>
                                <div className='label'>
                                    商品描述：
                                </div>
                                <div className='description'>
                                    {goodsinfo.desc}
                                </div>        
                            </div>
                            <div className='priceline'>
                                <div className='label'>
                                    价格说明：
                                </div>
                                <div className='description'>
                                    {goodsinfo.desc}
                                </div>    
                            </div>
                        </div>
                        <div className='goodspanel'>
                        <div className='title'>更多推荐</div>
                        <div className='goodspromotion'>
                                    <ShopShow>{moregoods}</ShopShow>
                        </div>
                        </div> 
                        <Cart/>
        </div>
    )
}
export default GoodsDetail

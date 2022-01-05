import './index.css'
import Icon from 'component/icon'
import {Icon as VanIcon,Sidebar,Tabs,Empty,Swiper} from 'react-vant'
import {useNavigate,useParams} from 'react-router-dom'
import Badge from 'component/badge'
import ShopIntro from 'component/shopintro'
import {useState,useEffect} from 'react'
import {ShopShow,ShopShowItem} from 'component/shopshow'
import {ClassGoods,ClassGoodsItem} from 'component/classgoods'
import Cart from 'component/cart'
import {useDispatch} from 'react-redux'
import {setShopid} from 'redux/Slices/cartSlice'

function Shop(){
    
    let navigate=useNavigate()
    let { id }=useParams()

    let dispatch=useDispatch()
    dispatch(setShopid(id))

    const [shopinfo,setshopinfo]=useState({})
    const [couponlist,setcouponlist]=useState([])
    const [activeTab, setActiveTab] = useState(0);
    const [shopshowitems,setshopshowitems]=useState([])
    const [classgoodslist,setclassgoodslist]=useState([])
    const [classgoodscon,setclassgoodscon]=useState([])
    const [classnames,setclassnames]=useState([])
    const [classinfocon,setclassinfocon]=useState({classname:'',classdesc:''})
    const [classinfolist,setclassinfolist]=useState([])
    const [slidelist,setslidelist]=useState([])

    const getClassGoodsList=(goodslist)=>{
       return goodslist.map((item)=><ClassGoodsItem key={item.id} title={item.name} subtitle={item.desc} price={item.price} img={item.headimg} url={'/goodsdetail/'+item.id} itemdata={item}/>)
    }
    const switchTab=(tabIndex)=>{
        setActiveTab(tabIndex);
        let classgoodscontent=classgoodslist[tabIndex]===undefined?[]:getClassGoodsList(classgoodslist[tabIndex])
        setclassinfocon(classinfolist[tabIndex])
        setclassgoodscon(classgoodscontent)
    }
    
    useEffect(()=>{
       window.$post("/shop/getShopInfo",{id:id}).then((data)=>{
           if(data.result.success){
               setshopinfo(data.result.info.shopinfo)
               let couponcon=data.result.info.couponlist.map((item)=><Badge title={item.name} key={item.id} />)
               let shopshowitemscon=data.result.info.hotlist.map((item)=><ShopShowItem key={item.id} img={item.headimg} title={item.name} price={item.price} url={'/goodsdetail/'+item.id} itemdata={item}/>)
               let classgoodscontent=data.result.info.classgoods[0]===undefined?[]:getClassGoodsList(data.result.info.classgoods[0])
               let classgoodslist=data.result.info.classgoods
               let classnamescon=data.result.info.classlist.map((item)=><Sidebar.Item key={item.id} title={item.name}/>)
               let classinfolist=data.result.info.classinfo
               let classinfocon=classinfolist[0]
               let slidecontent=data.result.info.slidelist.map((item)=><Swiper.Item key={item.id}><img src={item.img} alt='pic' className='slideimg_style'/></Swiper.Item>)
               let slidelist=<Swiper className="my-swipe" autoplay={3000}>{slidecontent}</Swiper>
               setcouponlist(couponcon)
               setshopshowitems(shopshowitemscon)
               setclassgoodscon(classgoodscontent)
               setclassgoodslist(classgoodslist)
               setclassnames(classnamescon)
               setclassinfocon(classinfocon)
               setclassinfolist(classinfolist)
               setslidelist(slidelist)
           }else{
               window.$msg(data.result.info)
           }
       })
    },[id])
    
    return (
        <div id="shop">
            <Icon src='left' className='navleft' onClick={()=>navigate(-1)}/>
                {slidelist}
            <ShopIntro title={shopinfo.name} subtitle={shopinfo.intro} desc={shopinfo.desc} logo={shopinfo.logo}>
               {couponlist}
            </ShopIntro> 
            <div className='shop_content'>
                    <Tabs active="active" titleActiveColor="#646566">
                        <Tabs.TabPane title="点餐">
                            <ShopShow bg={shopinfo.hotbg} title='商家推荐'>
                               {shopshowitems}
                            </ShopShow>
                            <div className='shop_goods_container'>
                                <div className='shop_goods_nav'>
                                    <Sidebar value={activeTab} onChange={(tabIndex)=>{switchTab(tabIndex)}} >
                                        {classnames}
                                    </Sidebar >
                                </div>
                                <div className='shop_goods_list'>
                                    <ClassGoods title={classinfocon.classname} subtitle={classinfocon.classdesc} >
                                        {classgoodscon}
                                    </ClassGoods>
                                </div>    
                            </div> 
                        </Tabs.TabPane>
                        <Tabs.TabPane title="评价"><Empty image="error" description="暂无评价内容" /></Tabs.TabPane>
                        <Tabs.TabPane title="商家信息">
                                <div className='shop_info'>
                                <div className='shop_info_item'>
                                    <div className='shop_info_title'>
                                        {shopinfo.name}
                                    </div> 
                                    <div className='shop_info_desc'>
                                        <VanIcon name='location-o' size='18' /> {shopinfo.address}
                                    </div> 
                                </div>  
                                <div className='shop_info_item'>
                                    <div className='shop_info_title'>
                                        商家信息
                                    </div> 
                                    <div className='shop_info_desc'>
                                        商家品类:{shopinfo.business}
                                    </div> 
                                    <div className='shop_info_desc'>
                                        营业时间:{shopinfo.opentime}
                                    </div> 
                                </div> 
                            </div> 
                        </Tabs.TabPane>
                    </Tabs>
            </div>
            <Cart />
        </div>
    )
}
export default Shop
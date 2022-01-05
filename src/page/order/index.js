import './index.css'
import NavTop from 'component/navtop'
import { Cell,SubmitBar,Icon,Picker,Popup,Field,Button} from 'react-vant';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getCartTotalDash,getCartTotalDiscount,getCartTotalMoney,emptyCart} from 'redux/Slices/cartSlice'
import {emptyAddress} from 'redux/Slices/addressSlice'
import {useState,useEffect} from 'react'
function Order(){
    let navigate=useNavigate()
    let processing=false
    let dispatch=useDispatch()

    const [dinnerwareShow,setdinnerwareShow]=useState(false)
    const [dinnerwareNums,setdinnerwareNums]=useState('')
    const [memoShow,setmemoShow]=useState(false)
    const [memoVal,setmemoVal]=useState('')
    const [addresscon,setaddresscon]=useState('')
    const [selectedAddress,setselectedAddress]=useState(null)
    const [hasDefaultAddr,sethasDefaultAddr]=useState(false)

    let shopid=useSelector(state=>state.cart.shopid)
    let totalDash=useSelector(state=>getCartTotalDash(state))
    let totalDiscount=useSelector(state=>getCartTotalDiscount(state))
    let realmoney=useSelector(state=>getCartTotalMoney(state))
    let selectedAddr=useSelector(state=>state.address.info.detail)
    let isSetAddress=useSelector(state=>state.address.info.isSetAddress)

    useEffect(()=>{
       window.$post("/address/getDefaultAddr",{}).then((data)=>{
            let hasDefaultAddrVal=data.result.success
            let defaultAddress=data.result.info
            sethasDefaultAddr(hasDefaultAddrVal)
            if(!isSetAddress && !hasDefaultAddrVal){
                let addresscontent=<Cell title="添加邮寄地址" icon="add-o" isLink={true} onClick={()=>goAddress()}></Cell>
                setaddresscon(addresscontent)
            }else{
                let selectedAddress=isSetAddress?selectedAddr:defaultAddress
                setselectedAddress(selectedAddress)
                let addresscontent=(
                    <Cell  isLink={true} className='mtsmall' onClick={()=>goAddress()}>
                    <div className='order_addrinfo'>
                        <div><Icon name="location-o" /><span className='order_addrinfo_tip'>收货地址:</span>{selectedAddress.province+selectedAddress.city+selectedAddress.county}</div>
                        <div>{selectedAddress.name} {selectedAddress.mobile}</div>
                    </div>  
                    </Cell>
                )
                setaddresscon(addresscontent)
            }
       })
       // eslint-disable-next-line
    },[])

    let cartlist=useSelector(state=>state.cart.cartlist)
    let cartListCon=cartlist.map((item)=>{
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

    const closeDinnerware=()=>{
        setdinnerwareShow(false)
    }
    const closeMemo=()=>{
        setmemoShow(false)
    }
    const goAddress= ()=>{
        navigate("/addresslist/order")
    }
    const goPay=()=>{
        if(processing){
            window.$msg("请等待处理完成");return false;
        }
        if(!isSetAddress && !hasDefaultAddr){
            window.$msg("请先添加收货地址");return false;
        }
        let orderinfo=[]
        orderinfo['shopid']=shopid
        orderinfo['goodslist']=cartlist
        orderinfo['memo']=memoVal
        orderinfo['dinnerware']=dinnerwareNums
        orderinfo["discount"]=0
        orderinfo["total"]=realmoney
        orderinfo["addressinfo"]=selectedAddress
        processing=true
        window.$post("/order/Order",{orderinfo:orderinfo}).then((data)=>{
            if(data.result.success){ 
                dispatch(emptyCart())
                dispatch(emptyAddress())
                navigate("/gopay/"+data.result.info)
            }else{
                window.$msg(data.result.info)
            }
            processing=false
        })
    }
    return(
        <div className='maincontent awaytop'>
           <NavTop title='订单确认' link='/index' />
           {addresscon}
           <Cell.Group className='mtsmall'>
                <Cell>
                <div className='title'>购物清单</div>
                  <div className='goodsitem'>
                        {cartListCon}
                        <div className='cellitem'>
                           <div className='celltitle'>红包/优惠券</div>
                           <div className='cellright'><span>无红包可用</span><van-icon name="arrow" color='#969799'/></div>
                        </div>
                        <div className='cellitem'>
                           <div className='celltitle'>优惠说明</div>
                           <div className='cellright'>总价:{totalDash}  优惠:-{totalDiscount}</div>
                        </div>
                  </div>   
                </Cell>
           </Cell.Group>
           <Cell.Group className='mtsmall'>
               <Cell title="备注" isLink={true} onClick={()=>setmemoShow(!memoShow)}>{memoVal}</Cell>
               <Cell title="餐具份数" isLink={true} onClick={()=>setdinnerwareShow(!dinnerwareShow)}>{dinnerwareNums}</Cell>
           </Cell.Group>
           <SubmitBar price={realmoney*100} buttonText="提交订单" onSubmit={()=>goPay()} />
           <Popup visible={memoShow} position="bottom" style={{ height: '15%' }} closeOnClickOverlay={true}>
                  <Field
                    value={memoVal}
                    center
                    clearable
                    label="备注"
                    placeholder="请输入备注文字"
                    onChange={(value)=>setmemoVal(value)}
                    button={<><Button size="small" type="default" onClick={()=>closeMemo()}>确定</Button><Button size="small" type="default" onClick={()=>closeMemo()}>取消</Button></>}
                    />
           </Popup> 
           <Popup visible={dinnerwareShow} position="bottom" style={{ height: '30%' }}>
               <Picker
                columns={['无需餐具','一份','二份','三份','四份','五份','六份','七份']}
                defaultIndex={0}
                title="请选择餐具份数"
                onConfirm={(value) =>{setdinnerwareNums(value);closeDinnerware()}}
                onCancel={()=>closeDinnerware()}
                />
           </Popup> 
        </div>
    )
}
export default Order
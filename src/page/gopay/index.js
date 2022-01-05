import './index.css'
import {Cell,Radio,SubmitBar} from 'react-vant'
import NavTop from 'component/navtop'
import Icon from 'component/icon'
import {useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
function Gopay(){
    let {id}=useParams() 
    let navigate=useNavigate()
    let processing=false

    const [paytype,setpaytype]=useState('1')
    const [realmoney,setrealmoney]=useState(0)
     
    useEffect(()=>{
        window.$post('/order/getOrderInfo',{orderid:id}).then((data)=>{
            if(data.result.success){
                setrealmoney(Number(data.result.info.realmoney))
            }
        })
    },[id])
    const doPay=()=>{
        if(processing){
            window.$msg("请等待交易完成");return false;
        } 
        window.$post("/order/goPay",{orderid:id,type:paytype}).then((data)=>{
            if(data.result.success){
                navigate("/payresult")
            }else{
                window.$msg(data.result.info)
            }
        })
    }

    return(
        <div className='maincontent awaytop'>
           <NavTop title='支付选择' link='/index'/>
           <Radio.Group value={paytype}>
                <Cell.Group>
                    <Cell title="支付宝" icon={<Icon src='alipay' className='gopay_icon'/>} rightIcon={<Radio name="1" checkedColor='#07C160'/>}  onClick={()=>setpaytype('1')}/>
                    <Cell title="微信支付" icon={<Icon src='wechat' className='gopay_icon'/>} rightIcon={<Radio name="2" checkedColor='#07C160'/>} onClick={()=>setpaytype('2')}/>
                </Cell.Group>
            </Radio.Group>    
            <SubmitBar price={realmoney*100} buttonText="提交订单" onSubmit={()=>doPay()} /> 
        </div>
    )
}

export default Gopay
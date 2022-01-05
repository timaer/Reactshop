import './index.css'
import { Field,Cell,Button,Switch,Area,Popup  } from 'react-vant';
import { areaList } from '@vant/area-data';
import {useState,useEffect} from 'react'
import NavTop from 'component/navtop'
import {useNavigate, useParams} from 'react-router-dom'
function EditAddress(){
    let navigate=useNavigate()
    const [title,settitle]=useState('')
    const [name,setname]=useState('')
    const [mobile,setmobile]=useState('')
    const [area,setarea]=useState('')
    const [detail,setdetail]=useState('')
    const [postalcode,setpostalcode]=useState('')
    const [areashow,setareashow]=useState(false)
    const [areacode,setareacode]=useState('')
    const [isdefault,setisdefault]=useState(false)

    let { id,from } = useParams()
    useEffect(()=>{
        if(id!=='0'){
            settitle('编辑地址')
            window.$post("/address/getAddressInfo",{id:id}).then((data)=>{
                if(data.result.success){
                    let addr=data.result.info
                    setname(addr["name"])
                    setmobile(addr["tel"])
                    setarea(addr["province"]+"/"+addr["city"]+"/"+addr["county"])
                    setdetail(addr["address"])
                    setpostalcode(addr["postalCode"])
                    setareacode(addr["areaCode"])
                    setisdefault(addr["isDefault"])
                }else{
                    window.$msg(data.result.info)
                }
            })
        }else{
            settitle("新增地址")
        }
    },[id])

    const getAreaCode=(obj)=>{
        const province=obj[0].code.substring(0,2)
        const city=obj[1].code.substring(2,4)
        const county=obj[2].code.substring(4,6)
        return province+city+county
    }
    const confirmAddress=(obj)=>{
        const address_string=obj[0].name+'/'+obj[1].name+'/'+obj[2].name
        const areacode=getAreaCode(obj)
        setarea(address_string)
        setareashow(false)
        setareacode(areacode)
    }

    const saveAddress=()=>{
         if(name===''||mobile===''||area===''||detail===''){
             window.$msg("收货信息表格不能为空");return false; 
         }
         let areaArr=area.split('/')
         const content={id:id,name:name,tel:mobile,province:areaArr[0],city:areaArr[1],county:areaArr[2],addressDetail:detail,postalCode:postalcode,areaCode:areacode,isDefault:isdefault}
         window.$post("/address/saveAddress",{content:content}).then((data)=>{
             if(data.result.success){
                 window.$msg(data.result.info)
                 setTimeout(()=>{navigate("/addresslist/"+from)},500)
             }else{
                 window.$msg(data.result.info)
             }
         })
    }

    const delAddress=()=>{
         window.$post("/address/delAddress",{id:id}).then((data)=>{
             if(data.result.success){
                 window.$msg(data.result.info)
                 setTimeout(()=>{navigate("/addresslist/"+from)},500)
             }else{
                 window.$msg(data.result.info)
             }
         })
    }
    return(
        <div className='maincontent awaytop'>
           <NavTop title={title} /> 
           <Cell.Group>
               <Cell>
                    <Field value={name} label="姓名" onChange={(value)=>setname(value)} />
                    <Field value={mobile}  label="电话" onChange={(value)=>setmobile(value)} />
                    <Field value={area} label="地区" readonly={true} onClick={()=>setareashow(!areashow)}   rightIcon="arrow"/>
                    <Field value={detail}  label="详细地址" onChange={(value)=>setdetail(value)} />
                    <Field value={postalcode}  label="邮政编码" onChange={(value)=>setpostalcode(value)}/>
                </Cell>
            </Cell.Group>
            <Cell.Group className='mtsmall'>
                <Cell title='设为默认地址'>
                    <Switch checked={isdefault} onChange={()=>setisdefault(!isdefault)}  size="24px"/>
                </Cell>
            </Cell.Group>
            <div className='editaddress_btngroup'>
                <Button  type="danger" round block className='editaddress_btn' onClick={()=>saveAddress()}>保 存</Button>
                <Button  type="danger" round plain block className='editaddress_btn' onClick={()=>delAddress()}>删 除</Button>
            </div>
            
            <Popup visible={areashow} position="bottom" style={{ height: '30%' }}>
                 <Area value={areacode} title="请选择地址"  areaList={areaList} onCancel={()=>setareashow(false)} onConfirm={(value)=>confirmAddress(value)} />
            </Popup>           
        </div>
    )
}

export default EditAddress
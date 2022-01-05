import './index.css'
import NavTop from 'component/navtop'
import { Cell,Radio ,Button,Icon,Tag } from 'react-vant';
import {useNavigate,useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux' 
import {setShopAddress} from 'redux/Slices/addressSlice'
function AddressList(){
     let {from}=useParams()
     let backUrl=from==='order'?'/order':'/my'
     let dispatch=useDispatch()
     const [addresslist,setaddresslist]=useState([])
     const [selectedid,setselectedid]=useState('')
    
     let navigate=useNavigate()
     const goEdit=(id)=>{
         navigate("/editaddress/"+id+"/"+from)
     }

     const handleCheck=(value)=>{ 
        setselectedid(value)
     }
     
     const setAddress=(item)=>{
        dispatch(setShopAddress({isSetAddress:true,detail:item}))
     }
     const goSelect=(item)=>{
        setselectedid(item.id)
        setAddress(item)
        navigate(backUrl)
     }
     useEffect(()=>{
         window.$post("/address/getAddressList",{}).then((data)=>{
             if(data.result.success){
                 let addresscon=data.result.info.addresslist.map((item)=>{
                     let defaultcon=item.isdefault===1?<Tag type="danger" size="mini" round>默认地址</Tag>:<></>
                     return(
                        <Cell.Group className='mtsmall' key={item.id}> 
                            <Cell>
                            <div className='address_item'>
                                <div className='address_item_checkbox'>
                                    <Radio name={item.id.toString()} checkedColor="#ee0a24" onClick={()=>setAddress(item)}></Radio>
                                </div>
                                <div className='address_item_detail' onClick={()=>goSelect(item)}>
                                    <div className='address_item_detail_mobile'><span>{item.name}</span><span>{item.mobile}</span><span>{defaultcon}</span></div>
                                    <div className='address_item_detail_address'>{item.province+item.city+item.county+item.address}</div>
                                </div>
                                <div className='address_item_edit' onClick={()=>goEdit(item.id)}><Icon name="edit" size='18'/></div>
                            </div>
                            </Cell> 
                       </Cell.Group> 
                     )
                 })
                 setaddresslist(addresscon)
             }else{
                 window.$msg(data.result.info)
             }
         })
          // eslint-disable-next-line
     },[])
 
     

     return(
        <div id='addresslist'>
            <NavTop title='地址列表' link={backUrl}/>
            <div className='maincontent'>
              <Radio.Group value={selectedid} onChange={(value)=>handleCheck(value)} >
                {addresslist}
              </Radio.Group>  
            </div>
            <div className='addresslist_addbtn_container' onClick={()=> navigate("/editaddress/0/"+from)}><Button className='addresslist_addbtn' type="danger" round>新增地址</Button></div>
        </div>
     )
}

export default AddressList
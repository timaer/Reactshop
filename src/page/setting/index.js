import './index.css'
import NavTop from 'component/navtop';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-vant';
import {doLogout} from 'redux/Slices/userSlice'
import { emptyCart } from 'redux/Slices/cartSlice';
import { emptyAddress} from 'redux/Slices/addressSlice';
import {useDispatch} from 'react-redux'

function Setting(){
   let navigate=useNavigate()
   let dispatch=useDispatch()

   const exitAcount=()=>{
      dispatch(doLogout())
      dispatch(emptyCart())
      dispatch(emptyAddress())
      navigate('/login')
   }
   return(
      <>
         <NavTop title="设置页"/>
         <div className='maincontent awaytop'>
               <Button block plain className='exitbtn' onClick={exitAcount}>
               退出登陆
               </Button>
         </div> 
      </>
   )
}

export default Setting
import './index.css'
import { NavBar } from 'react-vant';
import {useNavigate} from 'react-router-dom'

function NavTop(props){
   let navigate=useNavigate() 
   const goLink=()=>{
      if(props.link!==undefined){
          navigate(props.link)
      }else{
          navigate(-1)
      }
   } 
   const onRightClick=()=>{
       if(props.rightClick!==undefined){
           return props.rightClick
       }
   }
   let rightText=props.rightText!==undefined ? props.rightText : <></>
   return(
        <NavBar
            title={props.title}
            leftArrow
            onClickLeft={goLink}
            fixed
            rightText={rightText}
            onClickRight={onRightClick()}
        />
   )
}

export default NavTop
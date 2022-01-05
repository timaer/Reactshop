import './index.css'
import { Icon } from 'react-vant';
import { Image } from 'react-vant';
import { useNavigate } from "react-router-dom";

function Profile(props){
  let navicate=useNavigate()
  const doNav= ()=>{
      navicate(props.url)
  }   
  return(
    <div className='mypanel-container'>
        <div className='baseinfo'> 
                <div className='baseinfo-icon'>
                        <Image
                        round
                        width="2rem"
                        height="2rem"
                        src={props.src}
                        />
                </div>
                <div className='baseinfo-profile'>
                        <div className='baseinfo-title'>{props.title}</div>
                        <div className='baseinfo-desc'>{props.desc}</div>
                </div> 
                <div className='baseinf-setting'>
                        <Icon name="setting-o" size="0.5rem" onClick={doNav}/>
                </div>     
        </div>
      </div>     
   )
}

export default Profile
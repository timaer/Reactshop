import './index.css'
import {useNavigate} from 'react-router-dom'
function ShopItem(props){
    let navigate=useNavigate()
    const doNav=()=>{
        if(props.url!==undefined) navigate(props.url)
    }
    return(
        <div className='shopitem-container' onClick={doNav}>
            <div className='shopitem-icon'>
              <img src={props.data.headimg} alt='缩略图'/>
            </div>
            <div className='shopitem-desc'>
                <div className='shopitem-title'>{props.data.name}</div>
                <div className='shopitem-subtitle'>{props.data.desc}</div>
            </div>
        </div>
    )
}

export default ShopItem
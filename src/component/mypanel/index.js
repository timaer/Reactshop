import './index.css'
import Icon from 'component/icon'
import {useNavigate} from 'react-router-dom'

function PanelItem(props){
    let navigate=useNavigate()
    const doNav= ()=>{
        if(props.url!==undefined){
             navigate(props.url)
        }
    }
    let subtitle=props.subtitle===undefined?<></>:<div className='panelitem-title'>{props.subtitle}</div>  
    return(
            <div className='panelitem-container' onClick={doNav}>
                    <div className='panelitem-icon'><Icon src={props.icon} className='panelIcon'/></div>
                    <div className='panelitem-title'>{props.title}</div>  
                    {subtitle}
            </div>
    )
}

function MyPanel(props){
    let PanelContent=props.children.map((item)=>item)
    return(
       <div className='mypanel-container'>
              <div className='mypanel-title'>{props.title}</div>
              <div className='mypanel-items'>{PanelContent}</div>
        </div>
    )
}

export {MyPanel,PanelItem}
import './index.css'
function ShopIntro(props){
   return(
    <div className='shopintro-container'>
        <div className='shopintro-top'>
            <div className='shopintro-topcon'>
                <div className='shopintro-title'>{props.title}</div>
                <div className='shopintro-subtitle'>{props.subtitle}</div>
            </div>
            <div className='shopintro-topimg'>
                <img src={props.logo} className='shoplogo' alt='pic'/>
            </div>    
        </div>
        <div className='shopintro-desc'>{props.desc}</div>
        {props.children}
    </div>
   )
}

export default ShopIntro
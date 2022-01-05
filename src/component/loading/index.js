import "./index.css"
import { Loading as VantLoad} from 'react-vant';

function Loading(props){
    let loadingContent=props.isloading?<div className='loadingcon'><VantLoad type="spinner"/></div>:<></>
    return(
        loadingContent
    )
}

export default Loading
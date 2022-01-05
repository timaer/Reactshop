import { useLocation  } from 'react-router';
import RouterView from 'router';
import TabNav from 'component/tabnav'
import Loading from 'component/loading'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'

function App(){
      const loadingState = useSelector(state => state.app.loading)
      const currentPath=useLocation().pathname
      const hasTabPages=['/index','/orderlist','/my']
      let AppContent=hasTabPages.includes(currentPath)?<div><RouterView/><TabNav/></div>:<RouterView/>

      useEffect(()=>{
            window.scrollTo(0,0)
         },[currentPath])
      return(
            <>
              <Loading isloading={loadingState} />
              {AppContent}
            </>     
      )  
}
export default App
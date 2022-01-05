import './index.css'
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import NavTop from 'component/navtop';

function Article(){
   let { id }=useParams()
   const [content,setcontent]=useState('')

   useEffect(()=>{
     window.$post("/article/getArticle",{id:id}).then((data)=>{
         if(data.result.success){
             setcontent(data.result.info.content)
         }else{
             window.$msg(data.result.info)
         }
     })
   },[id])
   return(
       <>
       <NavTop title="详情页"/>
      <div className='maincontent awaytop'>  
        <div className='article'>
        {content}
        </div> 
      </div> 
      </>
   )
}
export default Article
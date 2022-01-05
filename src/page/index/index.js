import './index.css'
import { Search } from 'react-vant';
import ShopItem from 'component/shopitem'
import {useEffect,useState} from 'react'
function Index(){
    const [shopListCon,setShopListCon]=useState([])
    const getShopList=(keywords)=>{
        window.$post('/shop/getShopList',{keywords:keywords}).then((data)=>{
            let shopList
            if(data.result.success){
                const list=data.result.info
                shopList=list.map((item)=><ShopItem data={item} key={item.id} url={'/shop/'+item.id}/>)
                setShopListCon(shopList)
            }else{
                window.$msg(data.result.info)
            }
        })
    }
    const onSearch= (keywords)=>{
        getShopList(keywords)
    }
    useEffect(() => {
        getShopList()
    },[])
    return(
        <div className='maincontent'>
            <Search shape="round" background="#FA614F" placeholder="请输入搜索关键词" onSearch={onSearch} />
            <div className='shopItemList'>
                {shopListCon}
            </div>
        </div>
    )
}
export default Index
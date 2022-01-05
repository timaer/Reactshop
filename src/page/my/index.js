import './index.css'
import {MyPanel,PanelItem } from 'component/mypanel'
import Profile from 'component/profile'
function My(){
    return(
       <div className='maincontent'>
            <Profile src='https://img01.yzcdn.cn/vant/cat.jpeg' title='我是ReactShop' desc='这是一个用React开发的小商城' url='/setting'/>
            <MyPanel title='常用功能' >
                <PanelItem icon='order' title='订单' url='/orderlist'/>
                <PanelItem icon='shopcart' title='购物车' url='/shopcart'/>
                <PanelItem icon='coupon' title='优惠券' />
            </MyPanel>
            <MyPanel title='我的资产' >
                <PanelItem icon='money' title='余额' subtitle='¥200'/>
                <PanelItem icon='points' title='积分' subtitle='5000'/>
            </MyPanel>
            <MyPanel title='更多功能' >
                <PanelItem icon='address' title='我的地址' url='/addresslist/my'/>
                <PanelItem icon='service' title='客服' />
                <PanelItem icon='agreement' title='服务协议' url='/article/1'/>
                <PanelItem icon='privacy' title='隐私政策' url='/article/2'/>
            </MyPanel>
        </div>  
    )
}

export default My
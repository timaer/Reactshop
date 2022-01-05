import {Routes,Route,Navigate} from "react-router-dom";
import store from 'redux/store'

import Index from 'page/index'
import Orderlist from 'page/orderlist'
import My from 'page/my'
import Login from 'page/login'
import Setting from 'page/setting'
import Article from "page/article";
import Shop from 'page/shop'
import GoodsDetail from 'page/goodsdetail'
import Order from 'page/order'
import AddressList from 'page/addresslist'
import EditAddress from 'page/editaddress'
import Gopay from 'page/gopay'
import Payresult from 'page/payresult'
import OrderDetail from 'page/orderdetail'
import ShopCart from 'page/shopcart'

function AuthRoutes(props){
    const authToken=store.getState().user.token
    const routelist=props.children.map((route)=><Route path={route.props.path} element={authToken===''?<Login/>:route.props.element} key={route.props.path}/>)
    return(
          <Routes>
            {routelist}
          </Routes>
    )
}

function RouterView(){ 
    return(
          <AuthRoutes> 
                <Route path="/login" element={<Login />} />
                <Route path="/index" element={<Index />} />
                <Route path="/" element={<Navigate to='/index'/>} />
                <Route path="/orderlist" element={<Orderlist />} />
                <Route path="/my" element={<My />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/shop/:id" element={<Shop />} />
                <Route path="/goodsdetail/:id" element={<GoodsDetail />} />
                <Route path="/order" element={<Order />} />
                <Route path="/addresslist/:from" element={<AddressList />} />
                <Route path="/editaddress/:id/:from" element={<EditAddress />} />
                <Route path="/gopay/:id" element={<Gopay />} />
                <Route path="/payresult" element={<Payresult />} />
                <Route path="/orderdetail/:id" element={<OrderDetail />} />
                <Route path="/shopcart" element={<ShopCart />} />
          </AuthRoutes> 
    )  
}

export default RouterView
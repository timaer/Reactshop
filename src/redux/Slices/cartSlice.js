import { createSlice ,current } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    shopid:'',
    cartlist: []
  },
  reducers: {
    setShopid:(state,action)=>{
      let currentShopid=state.shopid
      if(currentShopid!=='' && action.payload!==currentShopid){
        state.cartlist=[]
      }
      state.shopid=action.payload
    },
    addToCart: (state,action) => {
      let addItem=JSON.parse(JSON.stringify(action.payload))
      let currentCartList=current(state.cartlist)
      let isNew=true
      for(let i=0;i<currentCartList.length;i++){
          if(addItem.id===currentCartList[i].id){
              state.cartlist[i].nums++
              isNew=false
              break;
          }
       } 
       if(isNew){
           addItem['nums']=1
           state.cartlist.push(addItem)
        }     
    },
    delFromCart: (state,action) => {
      let delItem=action.payload
      let currentCartList=current(state.cartlist)
      for(let i=0;i<currentCartList.length;i++){
        if(delItem.id===currentCartList[i].id){
              if(currentCartList[i].nums>1){
                  state.cartlist[i].nums--
              }else{
                  state.cartlist.splice(i,1)
              }
              break;
        }
      }
    },
    emptyCart:state=>{
        state.cartlist=[]
    },
    checkAll:(state,action)=>{
      let currentCartList=current(state.cartlist)
      for(let i=0;i<currentCartList.length;i++){
        state.cartlist[i].checked=action.payload
      }
    },
    checkOne:(state,action)=>{
      let currentCartList=current(state.cartlist)
      for(let i=0;i<currentCartList.length;i++){
        if(action.payload===currentCartList[i].id){
            state.cartlist[i].checked=state.cartlist[i].checked===undefined?true:!state.cartlist[i].checked
            break;
        }
      }
    },
    checkOut:state=>{
      let currentCartList=current(state.cartlist)
      state.cartlist=currentCartList.filter((item)=>item.checked===true) 
    },
    delCheck:state=>{
      let currentCartList=current(state.cartlist)
      state.cartlist=currentCartList.filter((item)=>item.checked!==true) 
    }
  }
});

export const getCheckedTotalMoney=state=>{
  let totalprice=0
  state.cart.cartlist.forEach((item)=>{
      if(item.checked===true) totalprice+=item.nums*item.price
  })
  return totalprice.toFixed(2)
}

export const getCartTotalNums = state => {
   let totalnums=0
   state.cart.cartlist.forEach((item)=>{
       totalnums+=item.nums
   })
   return totalnums
}

export const getCartTotalMoney = state => {
  let totalprice=0
  state.cart.cartlist.forEach((item)=>{
       totalprice+=item.nums*item.price
  })
  return totalprice.toFixed(2)
}
export const getCartTotalDash = state => {
  let totalprice=0
  state.cart.cartlist.forEach((item)=>{
       totalprice+=item.nums*item.dashprice
  })
  return totalprice.toFixed(2)
}
export const getCartTotalDiscount = state => {
  let totalprice=0
  state.cart.cartlist.forEach((item)=>{
       totalprice+=item.nums*(item.dashprice-item.price)
  })
  return totalprice.toFixed(2)
}

export const getCartGoodsNums = (state,finditem) => {
   let findOne=state.cart.cartlist.find((item)=>item.id===finditem.id)
   return findOne===undefined?0:findOne.nums
}

export const { addToCart,delFromCart,emptyCart,setShopid,checkAll,checkOne,checkOut,delCheck} = cartSlice.actions
export default cartSlice.reducer
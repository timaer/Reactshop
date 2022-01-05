import './index.css'
import NavTop from 'component/navtop'
import payOK from 'assets/img/payok.svg'

function Payresult(){
   return(
      <div className='maincontent awaytop'>
          <NavTop title='支付结果' link='/index'/>
          <div className='payresult_item'>
             <div className='payresult_icon'><img width="50" height="50" src={payOK} alt='pic'/></div>
             <div className='payresult_word'>支付成功</div>
          </div>
      </div>
   )

}

export default Payresult
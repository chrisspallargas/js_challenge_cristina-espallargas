import './style.scss';
import React, { Component } from 'react';
import bag from '../../svg/bag.svg';
import star from '../../svg/wishlist.svg';
import Feature from '../Feature';
import logo from '../../images/logo.png';

class Header extends Component {  
    render() { 
      const {cartProducts,cartPrice, favorites} = this.props;
      return (
        <div className="header-wrapper">
          <div className="header-left-side">
         <img className="header-logo" alt='' src={logo}/>
         <div className="header-brand">BRAND</div>
         </div>
         <div className="header-features">
             <Feature info={cartPrice+'€'} icon={bag} number={cartProducts}/>
             <Feature icon={star} number={favorites}/>
         </div>
        </div>
      );
    }
  }
 
export default Header;
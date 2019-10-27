import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './style.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import Product from '../../components/Product';
import Pagination from '../../components/Pagination';


Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            products:[],
            currentPage:1,
            productPerPage:6,
            totalProducts:0
        }
    }

    changeCurrentPage = (newCurrent) =>{
        this.props.history.push('page'+newCurrent);
        this.setState({currentPage:newCurrent});
    }

    shouldPaint = (index) =>{
        const {currentPage,productPerPage} =this.state;
        var rangeInf = (currentPage-1)*productPerPage;
        var rangeSup = rangeInf+ (productPerPage);
        if(index>=rangeInf && index<rangeSup){return true}
        else{return false}
    }

    addProductToCart = (uuid, price) => {
        var cartProducts=localStorage.getObj('cart');
        var cartPrices = localStorage.getObj('prices');
        cartPrices.push(price);
        cartProducts.push(uuid);
        localStorage.setObj('cart', cartProducts);
        localStorage.setObj('prices', cartPrices);
        this.forceUpdate();
    }

    removeProductCart = (uuid) => {
        var cartProducts=localStorage.getObj('cart');
        var cartPrices = localStorage.getObj('prices');
        var index=cartProducts.indexOf(uuid);
        var newCartProducts = cartProducts.filter(product => product !== uuid);
        var newCartPrices = cartPrices.filter((product,i) => i !== index);
        localStorage.setObj('cart', newCartProducts);
        localStorage.setObj('prices', newCartPrices);
        this.forceUpdate();
    }

    addFavorite = (uuid) => {
        var favorites= localStorage.getObj('favorites');
        favorites.push(uuid);
        localStorage.setObj('favorites', favorites);
        this.forceUpdate();
    }

    removeFavorite = (uuid) => {
        var favorites=localStorage.getObj('favorites');
        var newFavorites = favorites.filter(product => product !== uuid);
        localStorage.setObj('favorites', newFavorites);
        this.forceUpdate();
    }

    async componentDidMount(){
       const result = await axios.get(`https://api.musement.com/api/v3/venues/164/activities`);

       var currentPage=1;

       if(this.props.match.params.page){
            currentPage=parseInt(this.props.match.params.page);
       }

       if(localStorage.getObj('cart')===null){
          localStorage.setObj('cart',[]);
       }
       if(localStorage.getObj('prices') === null){
           localStorage.setObj('prices', []);
       }
       if(localStorage.getObj('favorites')===null){
        localStorage.setObj('favorites',[]);
        }
       
        this.setState({products:result.data, totalProducts:result.data.length, currentPage});
    }
    render(){
        const {products, totalProducts, currentPage, productPerPage}=this.state;
        var cartProducts=[];
        var favorites = [];
        var cartPrice=0;
        if(localStorage.getObj('cart')!==null){
            cartProducts = localStorage.getObj('cart');
        }
        if(localStorage.getObj('prices')!==null){
            var prices=localStorage.getObj('prices');
            prices.forEach((elem)=>{
                cartPrice += elem;
            }) 
            
            cartPrice = cartPrice.toFixed(2);
        }
        if(localStorage.getObj('favorites')!==null){
            favorites = localStorage.getObj('favorites');
        }
        const cartNumber = cartProducts.length;
        const favNumber = favorites.length;

        return(
            <div className="musement-app">
                <Header cartProducts={cartNumber} cartPrice={cartPrice} favorites={favNumber} />
                {products.length === 0 && <div>loading</div>}
                <div className="product-global-wrapper">
                    {products.length !== 0 && products.map((product, i)=>{
                        var added= cartProducts.includes(product.uuid) ? true : false;
                        var favorite= favorites.includes(product.uuid) ? true : false;
                        if(this.shouldPaint(i)){
                        return <Product key={product.uuid}
                                        product={product} 
                                        added={added} 
                                        favorite={favorite}
                                        onAdd={this.addProductToCart} 
                                        onRemove={this.removeProductCart}
                                        onAddFavorite={this.addFavorite}
                                        onRemoveFavorite={this.removeFavorite}/>}
                        else{ return null}
                })}</div>
                <Pagination totalProducts={totalProducts} 
                            productPerPage={productPerPage}
                            currentPage={currentPage} 
                            changeCurrentPage={this.changeCurrentPage}/>
               <Footer />
            </div>
        )
    }
}
export default withRouter(Home);
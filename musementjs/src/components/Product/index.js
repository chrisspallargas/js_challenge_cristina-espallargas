import React from 'react';
import './style.scss';
import star from '../../svg/wishlist.svg';

const Product = ({product, added, onAdd, onRemove, onAddFavorite, onRemoveFavorite, favorite}) => {
    return (
        <div className="product-wrapper">
            <div className="product-star-wrapper">
                {favorite && <div className="product-star yellow"><img alt='yellow star' className="icon-star" src={star} onClick = { () => onRemoveFavorite(product.uuid)} /></div>}
                {!favorite && <div className="product-star"><img alt='star' className="icon-star" src={star} onClick = { () => onAddFavorite(product.uuid)} /></div>}
            </div>
           <div className="product-img-wrapper"><img alt='product' className="product-img" src={product.cover_image_url} /></div>
            <div className="product-title">{product.title}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-price">{product.retail_price.formatted_iso_value}</div>
            {added && <button className="product-button cart" onClick = { () => onRemove (product.uuid)}>IN CART</button>}
            {!added && <button className="product-button add" onClick = { () => onAdd (product.uuid, product.retail_price.value)}>ADD TO CART</button>}
        </div>
    )
}

export default Product;
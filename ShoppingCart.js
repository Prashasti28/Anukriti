import {addToCart} from 'cartActions';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

function ShoppingCart(props) {

    const cart = useSelector(state => state.cart);

    const {cartItems}= cart;

    const productId = props.match.params.id;
    const qty = props.location.search? Number (props.loaction.search.split("=")[1]):1;
    const dispatch = useDispatch();
    const removeFromCart = (productId) => {
    dispatch(removeFrom (productId));
    }

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    } , [])

    const checkOutHandler = () => {
        props.history.push("/checkout?redirect=shipping")
    }



    return <div classname="Shopping Cart">
        <div classname="cart_list">
            <ul className="cart_list_storage">
                <li>
                    <h3>
                    Shopping Cart  
                    </h3>
                    <div>
                        Price (INR)
                    </div>

                </li>
                {
                    cartItems.length ===0?
                    <div>
                        There are no items in the cart!
                    </div>
                    :
                    cartItems.map( item =>
                        <li>
                            <div className='cart-image'>
                            <img src={item.image} alt="item.name" />
                            </div>
                            
                            <div className="cart_name">
                                <div>
                                    <Link to={"/product/" + item.product }>
                                    {item.name}
                                    </Link>
                                    
                                </div>
                                <div>
                                    Quantity:
                                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                        <option valu="1">1</option>
                                        <option valu="2">2</option>
                                        <option valu="3">3</option>
                                        <option valu="4">4</option>
                                        <option valu="5">5</option>
                                    </select>
                                    <button type="button2" className="button2" onClick={() =>removeFromCart(item.product)}>
                                    Delete from cart 
                                    </button>
                                </div>
                            </div>
                            <div className="cart-price">
                                Rs.{item.price}
                            </div>

                        </li>
                        )

                }
            </ul>

        </div>
        <div classname="cart_action">
            <h3>
                Total: ({cartItems.reduce((a,c) => (a + c.qty),0)}items)
                :
            $ ({cartItems.reduce((a,c)=>a + c.price*c.qty,0)}
            </h3>
            <button onClick={checkOutHandler} className="primary button" disabled={cartItems.length===0}>
                Prodceed to Checkout
            </button>
        </div>
    </div>
}

export default ShoppingCart;


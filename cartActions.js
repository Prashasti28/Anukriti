import Axios from "axios"
import {CART_ADD_ITEM} from "../constants/cartConst";
import Cookie from "js-cookie";


const addToCart = (productId, qty) => async (dispatch, getState ) =>{


    try {
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload:{
            product: data.id,
            name : data.name,
            image : data.image,
            price : data.price,
            countStock : data.countStock,
            qty
        }
    } );
    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {
        
    }
}
const removeFrom= (productId) => (dispatch, getState) =>{
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

}
export { addToCart, removeFrom }





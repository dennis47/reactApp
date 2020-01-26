import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState" 

export default function cartReducer(state=initialState.cart,action){
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            var addedItem =state.find(c=>c.product.id===action.payload.product.id);
            if(addedItem){
                //redux ta ilgili nesnenini referansını değiştirmek gerekiyor
                //referans değişmese redux statenin değişmediğini kabul eder.
                var newState=state.map(cartItem=>{//map ile bir array gezilip yeni bir array oluşturulur. newState yeni array
                    if(cartItem.product.id===action.payload.product.id){
                        return Object.assign({},addedItem,{quantity:addedItem.quantity+1})
                    }
                    return cartItem;//maping, return u. yeni array oluşturulur.       
                })
                return newState;
            }else{
                return [...state,{...action.payload}]//redux da pop push yapılmıyor.
            }
        case actionTypes.REMOVE_FROM_CART:
            const newState2= state.filter(cartItem=>cartItem.product.id!==action.payload.id)
            return newState2;
        default:
           return state;
    }
}
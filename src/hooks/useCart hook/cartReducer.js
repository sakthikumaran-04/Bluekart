export const initialstate = {
  cart: [],
};
export function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const newCart = [...state.cart];
      const index = newCart.findIndex((item) => item.id == action.payload.id);
      if (index >= 0) {
        newCart[index].quantity+=action.payload.quantity;
        return { ...state, cart: [...newCart] };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        newCart.push(newItem);
        return { ...state, cart: [...newCart] };
      }
    case "REMOVE_ITEM":
      const newcart =[...state.cart];
      const Index = newcart.findIndex((item)=>item.id==action.payload.id);
      if(Index>=0 && action.payload.removeOne){
        if(newcart[Index].quantity>1){
        newcart[Index].quantity-=1;
        return {...state,cart:[...newcart]}
        }else{
          return {
            ...state,
            cart: state.cart.filter((item) => item.id != action.payload.id),
          };
        }
      } 
      else{
      return {
        ...state,
        cart: state.cart.filter((item) => item.id != action.payload.id),
      };
    }
    case "RESET_CART":
      return { ...initialstate };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

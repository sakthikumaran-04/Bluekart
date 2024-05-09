import { create } from "zustand";

export const useCartStore = create((set) => ({
    cart: [],
    addToCart: (payload) =>
        set((state) => {
            const index = state.cart.findIndex((item) => item.id === payload.id);
            if (index === -1) {
                return { cart: [...state.cart, { ...payload, quantity: 1 }] };
            } else {
                const updatedCart = [...state.cart];
                updatedCart[index].quantity += 1;
                return { cart: updatedCart };
            }
        }),
    removeFromCart: (id) => set((state) => {
        const index=state.cart.findIndex((item)=>item.id==id);
        if(state.cart[index].quantity==1){
            return {cart:state.cart.filter((item)=>item.id!=id)}
        }else{
            const updatedCart = [...state.cart];
            updatedCart[index].quantity-=1;
            return {cart: updatedCart}
        }
    }),
    checkCart: (id) => {
        const foundItem = useCartStore.getState().cart.find((item) => item.id === id);
        return foundItem !== undefined;
    },
    resetCart: () => set(() => ({ cart: [] })),
}));

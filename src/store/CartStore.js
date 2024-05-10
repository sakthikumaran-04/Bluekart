import { create } from "zustand";
import { database } from "../appwrite/config";
import {Query} from "appwrite"

const getCart = async(email)=>{
    try {
        const res = await database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_COLLECTION_ID,[
            Query.equal('email',email)])
        console.log(res)
        return res.documents[0];
    } catch (error) {
        console.log(error);
        return null
    }
}

const doUpdateCart=async(id,cart)=>{
    try {
        console.log(id)
        const res = await database.updateDocument(import.meta.env.VITE_DB_ID,import.meta.env.VITE_COLLECTION_ID,id,{
            cart:[JSON.stringify(cart)] 
        })
        console.log(res)
    } catch (error) {
        console.log(error);
    }
}

export const useCartStore = create((set) => ({
    cart: [],
    init:async (email)=>{
        const data = await getCart(email);
        const arr = JSON.parse(data.cart[0])
        set({cart:arr})
    },
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
    removeFromCart: (id,immediate) => set((state) => {
        const index=state.cart.findIndex((item)=>item.id==id);
        if(state.cart[index].quantity==1){
            return {cart:state.cart.filter((item)=>item.id!=id)}
        }
        else if(immediate){
            return {cart:state.cart.filter((item)=>item.id!=id)}
        }
        else{
            const updatedCart = [...state.cart];
            updatedCart[index].quantity-=1;
            return {cart: updatedCart}
        }
    }),
    checkCart: (id) => {
        const foundItem = useCartStore.getState().cart.find((item) => item.id === id);
        return foundItem !== undefined;
    },
    updateCart:async(id)=>{
        await doUpdateCart(id,useCartStore.getState().cart)
    },
    resetCart: () => set(() => ({ cart: [] })),
}));

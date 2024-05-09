import {create} from "zustand";
export const useLikeStore = create((set)=>({
    like:[],
    addToLike:(product)=>set((state)=>{
        return {like:[...state.like,product]}
    }),
    removeFromLike:(id)=>set((state)=>{
        return {like:state.like.filter((item)=>item.id!=id)}
    }),
    checkLike:(id)=>set((state)=>{
        const foundItem = useLikeStore.getState().like.find((item)=>item.id===id);
        return foundItem!=undefined;
    }),
    resetLike:()=>set(()=>({like:[]}))
}))
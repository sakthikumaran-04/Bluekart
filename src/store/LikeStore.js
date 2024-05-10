import {create} from "zustand";
import { database } from "../appwrite/config";
import {Query} from "appwrite";

const getLike = async(email)=>{
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
const doUpdateLike=async(id,like)=>{
    try {
        console.log(id)
        const res = await database.updateDocument(import.meta.env.VITE_DB_ID,import.meta.env.VITE_COLLECTION_ID,id,{
            like:[JSON.stringify(like)] 
        })
        console.log(res)
    } catch (error) {
        console.log(error);
    }
}

export const useLikeStore = create((set)=>({
    like:[],
    init:async (email)=>{
        const data = await getLike(email);
        const arr = JSON.parse(data.like[0])
        set({like:arr})
    },
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
    updateLike:async(id)=>{
        await doUpdateLike(id,useLikeStore.getState().like)
    },
    resetLike:()=>set(()=>({like:[]}))
}))
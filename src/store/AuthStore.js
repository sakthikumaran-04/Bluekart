import { account, database } from "../appwrite/config";
import {toast} from "react-toastify"
import { create } from "zustand";
import {Query} from "appwrite";
const getAuth = async () => {
  try {
    const data = await account.get("current");
    let res = await database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_COLLECTION_ID,[
      Query.equal('email',data.email)])
     console.log(res);
     if(res.documents.length==0){
      const temp = await database.createDocument(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_COLLECTION_ID,
        `unique()`,
        {
          email: data.email,
          cart: [],
          like: [],
          orders: [],
        }
      );
      res=await database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_COLLECTION_ID,[
        Query.equal('email',data.email)])
     }
     console.log(data)
    return {
      id: res.documents[0].$id,
      username: data.name,
      email: data.email,
      isVerified:data.emailVerification
    };
  } catch (error) {
    console.log(error);
    return null; // Return null if there's an error fetching authentication data
  }
};

export const useAuthStore = create((set) => ({
  auth: null, // Initially set auth to null
  init: async () => {
    const authData = await getAuth();
    set({ auth: authData }); // Set auth data once it's fetched
  },
  registerWithEmailAndPassword: async (id,email, password, name) => {
    try {
      const result = await account.create(`unique()`, email, password, name);
      set({
        auth: {
          id: id,
          username: result.name,
          email: result.email,
          isVerified:result.emailVerification
        },
      });
    } catch (error) {
      console.log(error);if (error.message.includes("Invalid credentials")) {
        toast.error("Invalid credential!", {
          position: "top-center",
        });
      } else {
        toast.error("Unexpected Error", {
          position: "top-center",
        });
      }
    }
  },
  loginWithEmailAndPassword: async (id,email, password) => {
    try {
      const result = await account.createEmailPasswordSession(email, password);
      console.log(result)
      const data = await account.get("current");
      set({
        auth: {
          id: id,
          username: data.name,
          email: data.email,
          isVerified:data.emailVerification
        },
      });
    } catch (error) {
      if (error.message.includes("Invalid credentials")) {
        toast.error("Invalid credential!", {
          position: "top-center",
        });
      } else {
        toast.error("Unexpected Error", {
          position: "top-center",
        });
      }
    }
  },
  createOAuthSession:async()=>{
    const data = account.createOAuth2Session("google","https://bluekart.vercel.app/#/","https://bluekart.vercel.app/#/signin")
  },
  doVerify:async ()=>{
    try {
      const data = await account.get("current");
      set((state)=>({auth:{...state.auth,isVerified:true}}))
    } catch (error) {
      console.log(error);
    }
  },
  logout: async () => {
    try {
      await account.deleteSession("current");
      set({
        auth: null, // Set auth to null upon logout
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

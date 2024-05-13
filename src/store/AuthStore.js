import { account, database } from "../appwrite/config";
import {toast} from "react-toastify"
import { create } from "zustand";
import {Query} from "appwrite";
const getAuth = async () => {
  try {
    const data = await account.get("current");
    const res = await database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_COLLECTION_ID,[
      Query.equal('email',data.email)])
  
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
    const data = await account.createOAuth2Session(
      "google",
      `${import.meta.env.VITE_HOST}/`,
      `${import.meta.env.VITE_HOST}/#/signup`
    )
    console.log(data);
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

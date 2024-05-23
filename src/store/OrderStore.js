import { create } from "zustand";
import { database } from "../appwrite/config";
import { Query } from "appwrite";

const getOrders = async (email) => {
  try {
    const res = await database.listDocuments(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_COLLECTION_ID,
      [Query.equal("email", email)]
    );
    console.log(res);
    return res.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const doUpdateOrders = async (id, orders) => {
  try {
    console.log(id);
    const res = await database.updateDocument(
      import.meta.env.VITE_DB_ID,
      import.meta.env.VITE_COLLECTION_ID,
      id,
      {
        orders: [JSON.stringify(orders)],
      }
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const useOrderStore = create((set) => ({
  orders: [],
  init: async (email) => {
    const data = await getOrders(email);
    const arr = JSON.parse(data.orders[0]||data.orders);
    set({ orders: arr });
  },
  addToOrders: async(id,orderid, payload) =>{
    const isThere = useOrderStore.getState().orders.some((item)=>item.orderId==orderid);
    if(isThere) return
    set((state) => ({
      orders: [...state.orders, { orderId: orderid , date: new Date(), items: payload }],
    }))
    await doUpdateOrders(id, useOrderStore.getState().orders);
},
  updateOrders: async (id) => {
    await doUpdateOrders(id, useOrderStore.getState().orders);
  },
  resetOrders: () => set(() => ({ orders: [] })),
}));

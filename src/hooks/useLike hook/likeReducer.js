export const initialstate = {
  liked: [],
};
export function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const newLiked = [...state.liked];
      const newItem = { ...action.payload, quantity: 1 };
      newLiked.push(newItem);
      return { ...state, liked: [...newLiked] };
    case "REMOVE_ITEM":
      return {
        ...state,
        liked: state.liked.filter((item) => item.id != action.payload.id),
      };
    case "RESET":
      return { ...initialstate };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface BasketState {
  items: Product[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      console.log("index: ", action.payload._id);
      const itemIndex = state.items.findIndex(
        (item) => item._id == action.payload._id
      );
      const newBasket = [...state.items];
      if (itemIndex >= 0) newBasket.splice(itemIndex, 1);
      else
        console.log(
          `Cant remove product (id: ${action.payload.id}) as its not in the basket!`
        );
      state.items = newBasket;
    },
  },
});
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export default basketSlice.reducer;

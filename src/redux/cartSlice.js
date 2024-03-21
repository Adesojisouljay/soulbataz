import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
    
      if (newItem.quantity === undefined) {
        newItem.quantity = 1;
      }
    
      const priceWithoutCommas = newItem.price.replace(/,/g, '');
      const numericPrice = parseFloat(priceWithoutCommas);
    
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
    
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity,
          price: numericPrice,
        });
      }
    
      state.totalPrice += numericPrice * newItem.quantity;
    },
    
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemoveIndex = state.items.findIndex(item => item.id === itemId);

      if (itemToRemoveIndex !== -1) {
        state.totalPrice -= state.items[itemToRemoveIndex].price * state.items[itemToRemoveIndex].quantity;
        state.items.splice(itemToRemoveIndex, 1);
      }
    },
    updateItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === itemId);

      if (itemToUpdate) {
        state.totalPrice += (newQuantity - itemToUpdate.quantity) * itemToUpdate.price;
        itemToUpdate.quantity = newQuantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;

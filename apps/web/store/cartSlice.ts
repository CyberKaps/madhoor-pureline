import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCardProps } from '../components/ProductCard';

export interface CartItem extends ProductCardProps {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductCardProps>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.isCartOpen = true; // Auto-open the cart sheet
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.isCartOpen = action.payload;
      } else {
        state.isCartOpen = !state.isCartOpen;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;

export default cartSlice.reducer;

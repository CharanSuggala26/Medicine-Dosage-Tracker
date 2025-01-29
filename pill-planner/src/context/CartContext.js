// import React, { createContext, useContext, useReducer } from "react";

// const CartContext = createContext(null);

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART": {
//       const existingItem = state.items.find(
//         (item) => item.id === action.payload.id
//       );
//       if (existingItem) {
//         return {
//           ...state,
//           items: state.items.map((item) =>
//             item.id === action.payload.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           ),
//           total: state.total + action.payload.price,
//         };
//       }
//       return {
//         ...state,
//         items: [...state.items, { ...action.payload, quantity: 1 }],
//         total: state.total + action.payload.price,
//       };
//     }
//     case "REMOVE_FROM_CART": {
//       const item = state.items.find((item) => item.id === action.payload);
//       return {
//         ...state,
//         items: state.items.filter((item) => item.id !== action.payload),
//         total: state.total - (item ? item.price * item.quantity : 0),
//       };
//     }
//     case "UPDATE_QUANTITY": {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (!item) return state;

//       const quantityDiff = action.payload.quantity - item.quantity;
//       return {
//         ...state,
//         items: state.items.map((item) =>
//           item.id === action.payload.id
//             ? { ...item, quantity: action.payload.quantity }
//             : item
//         ),
//         total: state.total + item.price * quantityDiff,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export function CartProvider({ children }) {
//   const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }

// export default CartProvider;

import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    }
    case "REMOVE_FROM_CART": {
      const item = state.items.find((item) => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - (item ? item.price * item.quantity : 0),
      };
    }
    case "UPDATE_QUANTITY": {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + item.price * quantityDiff,
      };
    }
    case "SET_CART": {
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      };
    }
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const initialState = JSON.parse(localStorage.getItem("cart")) || {
    items: [],
    total: 0,
  };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const setCart = (cart) => {
    dispatch({ type: "SET_CART", payload: cart });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartProvider;

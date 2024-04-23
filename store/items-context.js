import { createContext, useState } from "react";

export const ItemsContext = createContext({
  quantityItems: [],
  items: [],
});
function ItemsContextProvider({children}) {
  const [quantityItems, setQuantityItems] = useState([]);
  function quantityHandler(quantityItems) {
    setQuantityItems(quantityItems);
  }
  function itemHandler(quantityItems) {}
  const value = {
    quantityItems: quantityItems,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
}
export default ItemsContextProvider;

export const getItemPrice = (item) => {
  const info = item?.card?.info;
  return (info?.price ?? info?.defaultPrice ?? 0) / 100;
};

export const getCartSubtotal = (items = []) =>
  items.reduce((sum, item) => sum + getItemPrice(item), 0);

export const DELIVERY_FEE = 49;
export const TAX_RATE = 0.05;

export const getOrderTotals = (items = []) => {
  const subtotal = getCartSubtotal(items);
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = Number((subtotal + tax + deliveryFee).toFixed(2));

  return { subtotal, tax, deliveryFee, total };
};

export const createOrderId = () => {
  const stamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);
  return `SF-${stamp}${random}`;
};

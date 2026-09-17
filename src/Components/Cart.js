import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { clearCart } from "../Utils/CartSlice";
import CartItems from "./CartItems";
import { getOrderTotals } from "../Utils/cartTotals";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cartd.items);
  const totals = getOrderTotals(items);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-orange-700">
            Cart → Checkout → Confirmation
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">
            Your cart
          </h1>
          <p className="text-sm text-stone-500">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
        {items.length > 0 && (
          <Button
            title="Clear Cart"
            onClick={() => dispatch(clearCart())}
            className="bg-white ring-1 ring-red-200 hover:bg-red-50"
            textClassName="text-red-700"
          />
        )}
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100 sm:p-6">
        <CartItems items={items} />
        {items.length === 0 && (
          <div className="pb-4 text-center">
            <Link
              to="/"
              className="inline-flex rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Browse restaurants
            </Link>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-4 space-y-3 rounded-2xl bg-orange-50 px-5 py-4 ring-1 ring-orange-100">
          <div className="flex items-center justify-between text-lg font-bold text-stone-900">
            <span>Subtotal</span>
            <span className="text-orange-700">Rs: {totals.subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-stone-500">
            Tax and delivery are added at checkout.
          </p>
          <Button
            title="Proceed to checkout"
            onClick={() => navigate("/Checkout")}
            className="w-full bg-orange-600 hover:bg-orange-700"
            textClassName="text-white"
          />
        </div>
      )}
    </div>
  );
};

export default Cart;

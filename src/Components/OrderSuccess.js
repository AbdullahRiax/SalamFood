import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";
import CartItems from "./CartItems";
import { cancelOrder } from "../Utils/OrderSlice";
import { restoreCart } from "../Utils/CartSlice";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order.lastOrder);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const isCancelled = order?.status === "cancelled";

  const handleCancel = () => {
    dispatch(restoreCart(order.items));
    dispatch(cancelOrder());
    setShowConfirm(false);
  };

  if (!order) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-100">
          <h1 className="text-2xl font-extrabold text-stone-900">No recent order</h1>
          <p className="mt-2 text-sm text-stone-500">
            Place an order from checkout to see confirmation here.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 sm:w-auto"
          >
            Browse restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-stone-500">
          Cart → Checkout →{" "}
          <span className="text-orange-700">
            {isCancelled ? "Cancelled" : "Confirmation"}
          </span>
        </p>
      </div>

      <section className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-stone-100 sm:p-8">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
            isCancelled ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {isCancelled ? "✕" : "✓"}
        </div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-stone-900">
          {isCancelled ? "Order cancelled" : "Order placed"}
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          {isCancelled
            ? "This dummy order was cancelled. Items were moved back to your cart."
            : "Dummy checkout complete. Your food is on the way."}
        </p>
        <p className="mt-4 text-sm font-semibold text-orange-700">
          Order ID: {order.id}
        </p>
        {!isCancelled && <p className="mt-1 text-sm text-stone-600">ETA {order.eta}</p>}
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100">
          <h2 className="font-bold text-stone-900">Deliver to</h2>
          <p className="mt-2 text-sm font-medium text-stone-800">{order.delivery.name}</p>
          <p className="text-sm text-stone-600">{order.delivery.phone}</p>
          <p className="mt-1 break-words text-sm text-stone-600">
            {order.delivery.address}, {order.delivery.city}
          </p>
          {order.delivery.notes && (
            <p className="mt-2 text-sm text-stone-500">Note: {order.delivery.notes}</p>
          )}
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100">
          <h2 className="font-bold text-stone-900">Payment</h2>
          <p className="mt-2 text-sm text-stone-600">{order.payment}</p>
          <p className="mt-3 text-sm text-stone-600">
            Subtotal: Rs {order.totals.subtotal.toFixed(2)}
          </p>
          <p className="text-sm text-stone-600">Tax: Rs {order.totals.tax.toFixed(2)}</p>
          <p className="text-sm text-stone-600">
            Delivery: Rs {order.totals.deliveryFee.toFixed(2)}
          </p>
          <p className="mt-2 text-base font-bold text-orange-700">
            Total: Rs {order.totals.total.toFixed(2)}
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100">
        <h2 className="font-bold text-stone-900">Items</h2>
        <CartItems items={order.items} readOnly />
      </section>

      {!isCancelled && showConfirm && (
        <div className="mt-6 rounded-2xl bg-red-50 p-4 ring-1 ring-red-100 sm:p-5">
          <h3 className="font-semibold text-red-800">Cancel this order?</h3>
          <p className="mt-1 text-sm text-red-700">
            This is a dummy cancel. Your items will go back to the cart.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              title="Keep order"
              onClick={() => setShowConfirm(false)}
              className="min-h-12 w-full bg-white ring-1 ring-stone-200 hover:bg-stone-50 sm:flex-1"
              textClassName="text-stone-700"
            />
            <Button
              title="Yes, cancel order"
              onClick={handleCancel}
              className="min-h-12 w-full bg-red-600 hover:bg-red-700 sm:flex-1"
              textClassName="text-white"
            />
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
        >
          Back to home
        </Link>
        {!isCancelled && !showConfirm && (
          <Button
            title="Cancel order"
            onClick={() => setShowConfirm(true)}
            className="min-h-12 w-full bg-white ring-1 ring-red-200 hover:bg-red-50 sm:flex-1"
            textClassName="text-red-700"
          />
        )}
        <Link
          to="/Cart"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
        >
          {isCancelled ? "View cart" : "View cart"}
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

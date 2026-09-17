import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order.lastOrder);

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
            className="mt-6 inline-flex rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
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
          Cart → Checkout → <span className="text-orange-700">Confirmation</span>
        </p>
      </div>

      <section className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-stone-100 sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
          ✓
        </div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-stone-900">
          Order placed
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Dummy checkout complete. Your food is on the way.
        </p>
        <p className="mt-4 text-sm font-semibold text-orange-700">
          Order ID: {order.id}
        </p>
        <p className="mt-1 text-sm text-stone-600">ETA {order.eta}</p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100">
          <h2 className="font-bold text-stone-900">Deliver to</h2>
          <p className="mt-2 text-sm font-medium text-stone-800">{order.delivery.name}</p>
          <p className="text-sm text-stone-600">{order.delivery.phone}</p>
          <p className="mt-1 text-sm text-stone-600">
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
          <p className="text-sm text-stone-600">
            Tax: Rs {order.totals.tax.toFixed(2)}
          </p>
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

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
        >
          Back to home
        </Link>
        <Link
          to="/Cart"
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
        >
          View cart
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

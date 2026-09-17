import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import CartItems from "./CartItems";
import { clearCart } from "../Utils/CartSlice";
import { placeOrder } from "../Utils/OrderSlice";
import { createOrderId, getOrderTotals } from "../Utils/cartTotals";

const inputClass =
  "h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100";

const Checkout = () => {
  const items = useSelector((state) => state.cartd.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totals = getOrderTotals(items);
  const [isPlacing, setIsPlacing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    payment: "cod",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    if (items.length === 0 && !isPlacing) {
      navigate("/Cart");
    }
  }, [items.length, isPlacing, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    if (items.length === 0 || isPlacing) return;

    setIsPlacing(true);

    const order = {
      id: createOrderId(),
      placedAt: new Date().toISOString(),
      items,
      totals,
      delivery: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        notes: form.notes,
      },
      payment: form.payment === "cod" ? "Cash on delivery" : "Card (dummy)",
      eta: "30-40 mins",
    };

    window.setTimeout(() => {
      dispatch(placeOrder(order));
      dispatch(clearCart());
      navigate("/OrderSuccess");
    }, 1200);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-stone-500">
          Cart → <span className="text-orange-700">Checkout</span> → Confirmation
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
          Checkout
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          This is a dummy checkout. No real payment is charged.
        </p>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100 sm:p-6">
            <h2 className="text-lg font-bold text-stone-900">Delivery details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="03xx xxxxxxx"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="address">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Street, house no, area"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Lahore"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="notes">
                  Notes (optional)
                </label>
                <input
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Gate code, landmark..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100 sm:p-6">
            <h2 className="text-lg font-bold text-stone-900">Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 ${
                  form.payment === "cod"
                    ? "border-orange-400 bg-orange-50"
                    : "border-stone-200 bg-stone-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-stone-800">
                  Cash on delivery
                </span>
              </label>
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 ${
                  form.payment === "card"
                    ? "border-orange-400 bg-orange-50"
                    : "border-stone-200 bg-stone-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.payment === "card"}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-stone-800">
                  Dummy card
                </span>
              </label>
            </div>

            {form.payment === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="cardNumber">
                    Card number
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    required={form.payment === "card"}
                    minLength={16}
                    maxLength={19}
                    value={form.cardNumber}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="expiry">
                    Expiry
                  </label>
                  <input
                    id="expiry"
                    name="expiry"
                    required={form.payment === "card"}
                    value={form.expiry}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    name="cvv"
                    required={form.payment === "card"}
                    minLength={3}
                    maxLength={4}
                    value={form.cvv}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="123"
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-100">
            <h2 className="text-lg font-bold text-stone-900">Order summary</h2>
            <div className="mt-3 max-h-72 overflow-y-auto">
              <CartItems items={items} readOnly />
            </div>
            <dl className="mt-4 space-y-2 border-t border-stone-100 pt-4 text-sm">
              <div className="flex justify-between text-stone-600">
                <dt>Subtotal</dt>
                <dd>Rs: {totals.subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-stone-600">
                <dt>Tax (5%)</dt>
                <dd>Rs: {totals.tax.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-stone-600">
                <dt>Delivery</dt>
                <dd>Rs: {totals.deliveryFee.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900">
                <dt>Total</dt>
                <dd className="text-orange-700">Rs: {totals.total.toFixed(2)}</dd>
              </div>
            </dl>
          </section>

          {isPlacing && (
            <div className="rounded-xl bg-orange-50 p-3 ring-1 ring-orange-100">
              <p className="text-sm font-medium text-orange-800">
                Placing your dummy order...
              </p>
              <div className="shimmer mt-2 h-2 w-full rounded-full" />
            </div>
          )}

          <Button
            title={isPlacing ? "Placing order..." : "Place order"}
            type="submit"
            disabled={isPlacing}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:hover:bg-orange-600"
            textClassName="text-white"
          />
          <Link
            to="/Cart"
            className="block text-center text-sm font-semibold text-stone-600 hover:text-orange-700"
          >
            Back to cart
          </Link>
        </aside>
      </form>
    </div>
  );
};

export default Checkout;

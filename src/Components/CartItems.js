import Button from "./Button";
import { ResImg } from "../Utils/configData";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../Utils/CartSlice";

const CartItems = ({ items, readOnly = false }) => {
  const dispatch = useDispatch();

  if (!items || items.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-lg font-semibold text-stone-800">Your cart is empty</h2>
        <p className="mt-1 text-sm text-stone-500">
          Add a few dishes from a restaurant to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-stone-100">
      {items.map((item, index) => {
        const info = item?.card?.info;
        const price = (info?.price ?? info?.defaultPrice ?? 0) / 100;

        return (
          <div
            key={`${info?.id || "item"}-${index}`}
            className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-stone-900">{info?.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-stone-500">
                {info?.description}
              </p>
              <p className="mt-2 text-sm font-semibold text-orange-700">
                Rs: {price}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {info?.imageId && (
                <img
                  className="h-20 w-20 rounded-xl object-cover"
                  src={ResImg + info.imageId}
                  alt={info?.name}
                />
              )}
              {!readOnly && (
                <Button
                  title="Remove"
                  onClick={() => dispatch(removeFromCart())}
                  className="bg-white ring-1 ring-stone-200 hover:bg-stone-50"
                  textClassName="text-stone-700"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;

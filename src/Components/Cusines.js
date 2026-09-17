import { useState } from "react";
import Button from "./Button";
import { ResImg } from "../Utils/configData";
import { useDispatch } from "react-redux";
import { addToCart } from "../Utils/CartSlice";
import ShimmerBlock from "./Shimmer";

const Cuisines = ({ cuisinesData }) => {
  const [accordinData, setAcordinData] = useState(0);
  const dispatch = useDispatch();

  if (!cuisinesData) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <ShimmerBlock key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  const filtered = cuisinesData?.filter((c) => c?.card?.card?.title);

  function clickfun(index) {
    setAcordinData(accordinData === index ? null : index);
  }

  function addbtnfun(item) {
    dispatch(addToCart(item));
  }

  return (
    <div className="space-y-3">
      {filtered.map((c, index) => {
        const isOpen = accordinData === index;

        return (
          <div
            key={c?.card?.card?.title || index}
            className="overflow-hidden rounded-xl ring-1 ring-orange-100"
          >
            <button
              type="button"
              onClick={() => clickfun(index)}
              className="flex w-full items-center justify-between bg-orange-50 px-4 py-3 text-left"
            >
              <h3 className="font-semibold text-orange-800">
                {c?.card?.card?.title}
              </h3>
              <span
                className={`text-stone-500 transition ${isOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="divide-y divide-stone-100">
                {c?.card?.card?.itemCards?.map((item) => {
                  const info = item?.card?.info;
                  const price = (info?.price ?? info?.defaultPrice ?? 0) / 100;

                  return (
                    <div
                      className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
                      key={info?.id}
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
                        <Button
                          title="Add"
                          onClick={() => addbtnfun(item)}
                          className="bg-orange-600 hover:bg-orange-700"
                          textClassName="text-white"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Cuisines;

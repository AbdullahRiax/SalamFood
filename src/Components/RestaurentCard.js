import { Link } from "react-router-dom";
import { useContext } from "react";
import { ResImg } from "../Utils/configData";
import SaleContext from "../Utils/SaleContext";

const RestaurentCard = ({ resData }) => {
  const { id, name, cuisines, costForTwo, avgRating, cloudinaryImageId, sla } =
    resData?.info;
  const data = useContext(SaleContext);

  return (
    <Link to={"/RestaurantDetail/" + id} className="block h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-44 overflow-hidden">
          <img
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            src={ResImg + cloudinaryImageId}
            alt={name}
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-stone-700">
            {sla?.slaString}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3 className="line-clamp-1 text-base font-semibold text-stone-900">{name}</h3>
          <p className="line-clamp-2 text-sm text-stone-500">{cuisines?.join(", ")}</p>
          <div className="mt-auto flex items-center justify-between pt-2 text-sm">
            <span className="rounded-full bg-green-100 px-2 py-0.5 font-semibold text-green-800">
              ⭐ {avgRating}
            </span>
            <span className="font-medium text-stone-700">{costForTwo}</span>
          </div>
          <p className="text-xs font-medium text-orange-700">{data.saleName}</p>
        </div>
      </article>
    </Link>
  );
};

export default RestaurentCard;

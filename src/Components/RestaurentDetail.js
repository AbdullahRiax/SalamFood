import { useParams } from "react-router-dom";
import { ResImg } from "../Utils/configData";
import useResMenu from "../Utils/CustomHooks/useResMenu";
import Cuisines from "./Cusines";
import { MenuShimmer } from "./Shimmer";

const RestaurantDetail = () => {
  const { resId } = useParams();
  const [resdata, cusineData] = useResMenu(resId);

  if (!resdata) {
    return <MenuShimmer />;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100">
          <img
            className="h-48 w-full object-cover"
            src={ResImg + resdata.cloudinaryImageId}
            alt={resdata.name}
          />
          <div className="space-y-1 p-5">
            <h1 className="text-xl font-bold text-stone-900">{resdata.name}</h1>
            <p className="text-sm text-stone-500">{resdata.areaName}</p>
            <p className="text-sm text-stone-500">{resdata.locality}</p>
            <div className="flex items-center justify-between pt-3 text-sm">
              <span className="rounded-full bg-green-100 px-2.5 py-1 font-semibold text-green-800">
                ⭐ {resdata.avgRatingString}
              </span>
              <span className="font-medium text-orange-700">
                {resdata.totalRatingsString}
              </span>
            </div>
          </div>
        </aside>

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100 sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-stone-900">Menu</h2>
          <Cuisines cuisinesData={cusineData} />
        </section>
      </div>
    </div>
  );
};

export default RestaurantDetail;

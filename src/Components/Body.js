import { useState, useEffect } from "react";
import RestaurentCard from "./RestaurentCard";
import Search from "./Search";
import PopularRestaurant from "./PopularRestaurant";
import { RestaurantListShimmer } from "./Shimmer";
import { fetchRestaurants } from "../Utils/api";

const RestaurantCardPopular = PopularRestaurant(RestaurentCard);

const Body = () => {
  const [livedata, setLiveData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRestaurants = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const restaurantList = await fetchRestaurants();
      setLiveData(restaurantList);
      setFilterData(restaurantList);
    } catch (fetchError) {
      console.error("Error fetching restaurant data:", fetchError);
      setError("We couldn’t load restaurants right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
          Restaurants near you
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Discover popular spots and order your favorite meals.
        </p>
      </div>

      <Search resdata={livedata} setLiveData={setFilterData} />

      {isLoading && <RestaurantListShimmer />}

      {!isLoading && error && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-stone-100">
          <p className="font-medium text-stone-700">{error}</p>
        </div>
      )}

      {!isLoading && !error && filterData.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-stone-100">
          <p className="font-medium text-stone-700">No restaurants found.</p>
        </div>
      )}

      {!isLoading && !error && filterData.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filterData.map((restaurant) =>
            restaurant?.info?.avgRating > 4.5 ? (
              <RestaurantCardPopular
                key={restaurant.info.id}
                resData={restaurant}
              />
            ) : (
              <RestaurentCard key={restaurant.info.id} resData={restaurant} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Body;

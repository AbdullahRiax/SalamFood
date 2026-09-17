const PopularRestaurant = (RestaurentCard) => {
  return (props) => {
    return (
      <div className="relative h-full">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-700 px-2.5 py-1 text-xs font-semibold text-white shadow">
          Popular
        </span>
        <RestaurentCard {...props} />
      </div>
    );
  };
};

export default PopularRestaurant;

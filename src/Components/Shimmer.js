const ShimmerBlock = ({ className = "" }) => (
  <div className={`shimmer rounded-lg ${className}`} />
);

export const RestaurantCardShimmer = () => (
  <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100">
    <ShimmerBlock className="h-44 w-full rounded-none" />
    <div className="space-y-3 p-4">
      <ShimmerBlock className="h-5 w-3/4" />
      <ShimmerBlock className="h-4 w-full" />
      <ShimmerBlock className="h-4 w-1/2" />
      <div className="flex gap-2 pt-1">
        <ShimmerBlock className="h-4 w-16" />
        <ShimmerBlock className="h-4 w-20" />
      </div>
    </div>
  </div>
);

export const RestaurantListShimmer = ({ count = 8 }) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }).map((_, index) => (
      <RestaurantCardShimmer key={index} />
    ))}
  </div>
);

export const MenuShimmer = () => (
  <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100">
        <ShimmerBlock className="mb-4 h-44 w-full" />
        <ShimmerBlock className="mb-3 h-6 w-2/3" />
        <ShimmerBlock className="mb-2 h-4 w-1/2" />
        <ShimmerBlock className="h-4 w-1/3" />
      </div>
      <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100">
        {Array.from({ length: 6 }).map((_, index) => (
          <ShimmerBlock key={index} className="h-12 w-full" />
        ))}
      </div>
    </div>
  </div>
);

export const PageShimmer = () => (
  <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <ShimmerBlock className="mb-6 h-8 w-48" />
    <RestaurantListShimmer count={4} />
  </div>
);

export default ShimmerBlock;

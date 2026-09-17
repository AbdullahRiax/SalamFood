import { useState } from "react";
import Button from "./Button";

const Search = ({ resdata, setLiveData }) => {
  const [value, setValue] = useState("");

  const searchFunction = () => {
    const filtered = resdata?.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(value.toLowerCase())
    );
    setLiveData(filtered);
  };

  const topRatedFunction = () => {
    const filtered = resdata?.filter(
      (restaurant) => restaurant.info.avgRating > 4.5
    );
    setLiveData(filtered);
  };

  const resetFunction = () => {
    setValue("");
    setLiveData(resdata);
  };

  return (
    <div className="mb-8 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-stone-100 sm:flex-row sm:items-center sm:p-4">
      <input
        type="text"
        className="h-12 w-full min-w-0 flex-1 appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 text-base leading-normal outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:h-11 sm:text-sm lg:h-12 lg:text-base"
        placeholder="Search restaurants"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchFunction();
        }}
      />

      <div className="flex shrink-0 flex-row flex-wrap gap-2 sm:flex-nowrap">
        <Button
          title="Search"
          onClick={searchFunction}
          className="h-12 px-4 sm:h-11 lg:h-12 bg-orange-600 hover:bg-orange-700"
          textClassName="text-white"
        />
        <Button
          title="Top Rated"
          onClick={topRatedFunction}
          className="h-12 px-4 sm:h-11 lg:h-12 bg-white ring-1 ring-orange-200 hover:bg-orange-50"
          textClassName="text-orange-700"
        />
        <Button
          title="All"
          onClick={resetFunction}
          className="h-12 px-4 sm:h-11 lg:h-12 bg-white ring-1 ring-stone-200 hover:bg-stone-50"
          textClassName="text-stone-700"
        />
      </div>
    </div>
  );
};

export default Search;

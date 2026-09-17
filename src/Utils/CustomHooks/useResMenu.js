import { useState, useEffect } from "react";

const useResMenu = (resId) => {
  const [liveData, setLiveData] = useState(null);
  const [cusineData, setCusineData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(
      "https://namastedev.com/api/v1/listRestaurantMenu/" + resId
    );

    const data = await response.json();

    setLiveData(
      data?.data?.cards?.[2]?.card?.card?.info
    );

    setCusineData(
      data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    );
  };

  useEffect(() => {
    fetchData();
  }, [resId]);

  return [liveData, cusineData];
};

export default useResMenu;
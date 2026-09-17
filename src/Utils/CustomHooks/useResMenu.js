import { useState, useEffect } from "react";
import { fetchRestaurantMenu } from "../api";

const useResMenu = (resId) => {
  const [liveData, setLiveData] = useState(null);
  const [cusineData, setCusineData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadMenu = async () => {
      setLiveData(null);
      setCusineData(null);
      const [info, cuisines] = await fetchRestaurantMenu(resId);
      if (isMounted) {
        setLiveData(info);
        setCusineData(cuisines);
      }
    };

    if (resId) {
      loadMenu();
    }

    return () => {
      isMounted = false;
    };
  }, [resId]);

  return [liveData, cusineData];
};

export default useResMenu;

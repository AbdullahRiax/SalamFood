import {
  FALLBACK_MENU_CARDS,
  FALLBACK_MENU_INFO,
  FALLBACK_RESTAURANTS,
} from "./fallbackData";

const LIST_URL = "https://namastedev.com/api/v1/listRestaurants";
const MENU_URL = "https://namastedev.com/api/v1/listRestaurantMenu/";

const parseRestaurants = (data) =>
  data?.data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
    ?.restaurants || [];

const parseMenu = (data) => [
  data?.data?.cards?.[2]?.card?.card?.info || null,
  data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || null,
];

async function fetchJson(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJsonWithCors(url) {
  try {
    return await fetchJson(url);
  } catch {
    return await fetchJson(`https://corsproxy.io/?${encodeURIComponent(url)}`);
  }
}

export async function fetchRestaurants() {
  try {
    const data = await fetchJsonWithCors(LIST_URL);
    const restaurants = parseRestaurants(data);
    if (!restaurants.length) {
      throw new Error("Empty restaurant list");
    }
    return restaurants;
  } catch {
    return FALLBACK_RESTAURANTS;
  }
}

export async function fetchRestaurantMenu(resId) {
  try {
    const data = await fetchJsonWithCors(MENU_URL + resId);
    const [info, cuisines] = parseMenu(data);
    if (!info) {
      throw new Error("Empty menu");
    }
    return [info, cuisines];
  } catch {
    const localInfo =
      FALLBACK_RESTAURANTS.find((restaurant) => restaurant.info.id === resId)
        ?.info || FALLBACK_MENU_INFO;
    return [localInfo, FALLBACK_MENU_CARDS];
  }
}

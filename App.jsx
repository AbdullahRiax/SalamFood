import React from "react";
import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./src/Components/Header";
import Footer from "./src/Components/Footer";
import Body from "./src/Components/Body";
import ContactUs from "./src/Components/ContactUs";
import RestaurentDetail from "./src/Components/RestaurentDetail";
import Cart from "./src/Components/Cart";
import Checkout from "./src/Components/Checkout";
import OrderSuccess from "./src/Components/OrderSuccess";
import { PageShimmer } from "./src/Components/Shimmer";
import SaleContext from "./src/Utils/SaleContext";
import Appstore from "./src/Utils/Appstore";
import logo from "url:./src/Assets/logo.png";

document.title = "SalamFood";

const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/png";
favicon.href = logo;
document.head.appendChild(favicon);

const AboutUs = lazy(() => import("./src/Components/AboutUs"));

const Appcontainer = () => {
  return (
    <Provider store={Appstore}>
      <SaleContext.Provider value={{ saleName: "Eid sale ☪️" }}>
        <div className="flex min-h-screen flex-col bg-stone-50">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </SaleContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <Appcontainer />,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/Aboutus",
          element: (
            <Suspense fallback={<PageShimmer />}>
              <AboutUs />
            </Suspense>
          ),
        },
        {
          path: "/Contactus",
          element: <ContactUs />,
        },
        {
          path: "/RestaurantDetail/:resId",
          element: <RestaurentDetail />,
        },
        {
          path: "/Cart",
          element: <Cart />,
        },
        {
          path: "/Checkout",
          element: <Checkout />,
        },
        {
          path: "/OrderSuccess",
          element: <OrderSuccess />,
        },
      ],
    },
  ],
  {
    basename: window.location.hostname.endsWith("github.io")
      ? "/SalamFood"
      : "/",
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

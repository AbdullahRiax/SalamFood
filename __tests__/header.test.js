import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Header from "../src/Components/Header";
import CartReducer from "../src/Utils/CartSlice";
import OrderReducer from "../src/Utils/OrderSlice";
import SaleContext from "../src/Utils/SaleContext";

const renderHeader = (items = []) => {
  const store = configureStore({
    reducer: {
      cartd: CartReducer,
      order: OrderReducer,
    },
    preloadedState: {
      cartd: { items },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <SaleContext.Provider value={{ saleName: "Eid sale ☪️" }}>
          <Header />
        </SaleContext.Provider>
      </MemoryRouter>
    </Provider>
  );
};

describe("Header", () => {
  test("renders the logo and app name", () => {
    renderHeader();

    expect(screen.getByAltText("SalamFood logo")).toBeInTheDocument();
    expect(screen.getByText("SalamFood")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About us" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact us" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Cart/ })).toBeInTheDocument();
  });

  test("shows 0 items when the cart is empty", () => {
    renderHeader();

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("shows the cart item count from the store", () => {
    renderHeader([{ id: 1 }, { id: 2 }]);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("renders the sale name from context", () => {
    renderHeader();

    expect(screen.getAllByText("Eid sale ☪️").length).toBeGreaterThan(0);
  });

  test("opens the mobile menu when the toggle is clicked", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: "Toggle navigation" }));

    expect(screen.getByRole("link", { name: /Cart \(0\)/ })).toBeInTheDocument();
  });
});

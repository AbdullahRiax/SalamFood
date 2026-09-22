import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "url:../Assets/logo.png";
import SaleContext from "../Utils/SaleContext";

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-orange-100 text-orange-800"
      : "text-stone-700 hover:bg-orange-50 hover:text-orange-700"
  }`;

const Header = () => {
  const data = useContext(SaleContext);
  const items = useSelector((state) => state.cartd.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <img className="h-11 w-11 rounded-full object-cover" src={logo} alt="SalamFood logo" />
          <div>
            <p className="text-lg font-extrabold tracking-tight text-orange-700">SalamFood</p>
            <p className="hidden text-xs text-stone-500 sm:block">Meals you’ll love</p>
          </div>
        </Link>

        <span className="hidden rounded-full bg-red-700 px-3 py-1 text-xs font-semibold text-white md:inline-flex">
          {data.saleName}
        </span>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/Aboutus" className={navLinkClass}>
            About us
          </NavLink>
          <NavLink to="/Contactus" className={navLinkClass}>
            Contact us
          </NavLink>
          <NavLink
            to="/Cart"
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} relative`
            }
          >
            Cart
            <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-orange-600 px-1.5 text-xs font-bold text-white">
              {items.length}
            </span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <NavLink
            to="/Cart"
            onClick={closeMenu}
            aria-label={`Cart (${items.length})`}
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} relative inline-flex h-10 items-center`
            }
          >
            Cart
            <span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-orange-600 px-1.5 text-xs font-bold text-white">
              {items.length}
            </span>
          </NavLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-stone-700"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <span className="text-xl">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-orange-100 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <span className="mb-2 w-fit rounded-full bg-red-700 px-3 py-1 text-xs font-semibold text-white">
              {data.saleName}
            </span>
            <NavLink to="/" className={navLinkClass} end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/Aboutus" className={navLinkClass} onClick={closeMenu}>
              About us
            </NavLink>
            <NavLink to="/Contactus" className={navLinkClass} onClick={closeMenu}>
              Contact us
            </NavLink>
            <NavLink to="/Cart" className={navLinkClass} onClick={closeMenu}>
              Cart
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

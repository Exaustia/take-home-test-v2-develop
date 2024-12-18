import { useState } from "react";
import "./header.css";
const links = [
  { name: "Ingredients", path: "/ingredients" },
  { name: "Recipes", path: "/recipes" },
  { name: "Shopping lists", path: "/shopping-list" },
  { name: "Parameters", path: "/parameters" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="header-container">
      <h1>SHOPPING LIST HELPER</h1>
      <nav className="desktop-nav">
        {links.map((link) => (
          <a href={link.path} key={link.name}>
            {link.name}
          </a>
        ))}
      </nav>
      <div className="burger-menu">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            role="presentation"
            strokeWidth="2"
            focusable="false"
            width="22"
            height="22"
            className="icon icon-hamburger"
            viewBox="0 0 22 22"
            color="black"
          >
            <path
              d="M1 5h20M1 11h20M1 17h20"
              stroke="currentColor"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
        <div
          className={
            "burger-menu__content" + (isMenuOpen ? " burger-menu__open" : " burger-menu__close")
          }
        >
          {links.map((link) => (
            <a href={link.path} key={link.name}>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

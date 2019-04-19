import * as React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";

export interface Menu {
  name: string;
  path: string;
}

export default function Navigation({
  menuList
}: {
  menuList: Menu[];
}): React.ReactElement {
  return (
    <nav className="nav-component">
      {menuList.map(
        (menu: Menu): React.ReactNode => {
          return (
            <Link className="nav-link" key={menu.name} to={menu.path}>
              {menu.name}
            </Link>
          );
        }
      )}
    </nav>
  );
}

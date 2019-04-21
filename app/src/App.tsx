// Router: https://reacttraining.com/react-router/web/guides/quick-start

import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Menu } from "./components/Navigation";
import SidebarLayout from "./layouts/SidebarLayout";

import Overview from "./pages/Overview";
import Members from "./pages/Members";
import Providers from "./pages/Providers";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";

export default class App extends React.Component {
  public static displayName: string = "App";

  public render(): React.ReactNode {
    const menuList: Menu[] = [
      { name: "Overview", path: "/" },
      { name: "Members", path: "/members" },
      { name: "Providers", path: "/providers" },
      { name: "Incomes", path: "/incomes" },
      { name: "Expenses", path: "/expenses" }
    ];

    return (
      <Router>
        <SidebarLayout menuList={menuList}>
          <div className="admv-app">
            <Route exact path="/" component={Overview} />
            <Route exact path="/members" component={Members} />
            <Route exact path="/providers" component={Providers} />
            <Route exact path="/incomes" component={Incomes} />
            <Route exact path="/expenses" component={Expenses} />
          </div>
        </SidebarLayout>
      </Router>
    );
  }
}

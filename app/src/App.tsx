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
import IncomeTypes from "./pages/IncomeTypes";
import ExpenseTypes from "./pages/ExpenseTypes";

export default class App extends React.Component {
  public static displayName: string = "App";

  public render(): React.ReactNode {
    const menuList: Menu[] = [
      { name: "Overview", path: "/" },
      { name: "Members", path: "/members" },
      { name: "Providers", path: "/providers" },
      { name: "Incomes", path: "/incomes" },
      { name: "Expenses", path: "/expenses" },
      { name: "IncomeTypes", path: "/income-types" },
      { name: "ExpenseTypes", path: "/expense-types" }
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
            <Route exact path="/income-types" component={IncomeTypes} />
            <Route exact path="/expense-types" component={ExpenseTypes} />
          </div>
        </SidebarLayout>
      </Router>
    );
  }
}

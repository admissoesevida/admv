import * as React from "react";
import ReactDOM from "react-dom";
import ExpenseTypes from "./Expenses";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(<ExpenseTypes />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("it calls componentDidMount", (): void => {
  const div = document.createElement("div");
  const spy = jest.spyOn(ExpenseTypes.prototype, "componentDidMount");

  ReactDOM.render(<ExpenseTypes />, div);

  expect(spy).toHaveBeenCalled();

  ReactDOM.unmountComponentAtNode(div);
});

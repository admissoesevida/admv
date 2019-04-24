import * as React from "react";
import ReactDOM from "react-dom";
import Expenses from "./Expenses";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(<Expenses />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("it calls componentDidMount", (): void => {
  const div = document.createElement("div");
  const spy = jest.spyOn(Expenses.prototype, "componentDidMount");

  ReactDOM.render(<Expenses />, div);

  expect(spy).toHaveBeenCalled();

  ReactDOM.unmountComponentAtNode(div);
});

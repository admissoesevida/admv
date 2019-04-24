import * as React from "react";
import ReactDOM from "react-dom";
import Incomes from "./Incomes";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(<Incomes />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("it calls componentDidMount", (): void => {
  const div = document.createElement("div");
  const spy = jest.spyOn(Incomes.prototype, "componentDidMount");

  ReactDOM.render(<Incomes />, div);

  expect(spy).toHaveBeenCalled();

  ReactDOM.unmountComponentAtNode(div);
});

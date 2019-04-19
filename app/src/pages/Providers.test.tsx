import * as React from "react";
import ReactDOM from "react-dom";
import Providers from "./Providers";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(<Providers />, div);
  ReactDOM.unmountComponentAtNode(div);
});

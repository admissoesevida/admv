import * as React from "react";
import ReactDOM from "react-dom";
import Title, { TitleProps } from "./Title";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  const props: TitleProps = {
    text: "Test"
  };
  ReactDOM.render(<Title {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

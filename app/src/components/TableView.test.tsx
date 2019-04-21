import * as React from "react";
import ReactDOM from "react-dom";
import TableView from "./TableView";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  const headers = ["ID", "Test"];
  const fields = ["id", "test"];
  const list = [
    {
      id: "a",
      test: "b"
    }
  ];
  ReactDOM.render(
    <TableView headers={headers} fields={fields} list={list} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

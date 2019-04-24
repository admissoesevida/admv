import * as React from "react";
import ReactDOM from "react-dom";
import TableView, { TableViewConfig } from "./TableView";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  const fields = {
    id: {
      label: "ID"
    },
    test: {
      label: "test"
    }
  };

  const list = [
    {
      id: "a",
      test: "b"
    }
  ];
  ReactDOM.render(<TableView fields={fields} list={list} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing using a number", (): void => {
  const div = document.createElement("div");
  const fields = {
    id: {
      label: "ID"
    },
    test: {
      label: "test"
    }
  };

  const list = [
    {
      id: "a",
      test: 123
    }
  ];
  ReactDOM.render(<TableView fields={fields} list={list} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import * as React from "react";

export default class Expenses extends React.Component {
  public static displayName: string = "Expenses";

  public render(): React.ReactNode {
    return (
      <div className="page-expenses">
        <p>Expenses</p>
      </div>
    );
  }
}

import * as React from "react";

export default class Overview extends React.Component {
  public static displayName: string = "Overview";

  public render(): React.ReactNode {
    return (
      <div className="page-overview">
        <p>Overview</p>
      </div>
    );
  }
}

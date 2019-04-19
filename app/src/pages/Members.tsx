import * as React from "react";

export default class Members extends React.Component {
  public static displayName: string = "Members";

  public render(): React.ReactNode {
    return (
      <div className="page-members">
        <p>Members</p>
      </div>
    );
  }
}

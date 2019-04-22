import * as React from "react";
import TableView from "../components/TableView";
import Title from "../components/Title";

export interface Member {
  id: number;
  name: string;
  cpf: string;
}

export default class Members extends React.Component {
  public static displayName: string = "Members";

  public state = {
    list: []
  };

  public componentDidMount(): void {
    fetch("/api/members")
      .then((res): Promise<Member[]> => res.json())
      .then((list): void => this.setState({ list }));
  }

  public render(): React.ReactNode {
    return (
      <div className="page-members">
        <Title text="Members" />
        <TableView
          list={this.state.list}
          headers={["ID", "Name", "CPF"]}
          fields={["id", "name", "cpf"]}
        />
      </div>
    );
  }
}

import * as React from "react";
import TableView, { TableViewConfig } from "../components/TableView";
import Title from "../components/Title";
import fetchData from "../util/fetchData";

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

  public async componentDidMount(): Promise<void> {
    const list = await fetchData("/api/members");
    this.setState({ list });
  }

  public render(): React.ReactNode {
    const fields: TableViewConfig = {
      id: {
        label: "ID"
      },
      name: {
        label: "Nome"
      },
      cpf: {
        label: "CPF"
      }
    };

    return (
      <div className="page-members">
        <Title text="Membros" />
        <TableView list={this.state.list} fields={fields} />
      </div>
    );
  }
}

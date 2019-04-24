import * as React from "react";
import Title from "../components/Title";
import TableView, { TableViewConfig } from "../components/TableView";
import fetchData from "../util/fetchData";

export interface IncomeType {
  id: number;
  name: number;
  note: string;
}

export default class IncomeTypes extends React.Component {
  public static displayName: string = "IncomeTypes";

  public state = {
    list: []
  };

  public async componentDidMount(): Promise<void> {
    const list = await fetchData("/api/income-types");
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
      note: {
        label: "Nota"
      }
    };

    return (
      <div className="page-income-types">
        <Title text="Tipos de Entradas" />
        <TableView list={this.state.list} fields={fields} />
      </div>
    );
  }
}

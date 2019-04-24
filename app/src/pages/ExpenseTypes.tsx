import * as React from "react";
import Title from "../components/Title";
import TableView, { TableViewConfig } from "../components/TableView";
import fetchData from "../util/fetchData";

export interface ExpenseType {
  id: number;
  name: number;
  note: string;
}

export default class ExpenseTypes extends React.Component {
  public static displayName: string = "ExpenseTypes";

  public state = {
    list: []
  };

  public async componentDidMount(): Promise<void> {
    const list = await fetchData("/api/expense-types");
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
      <div className="page-expense-types">
        <Title text="Tipos de Saídas" />
        <TableView list={this.state.list} fields={fields} />
      </div>
    );
  }
}

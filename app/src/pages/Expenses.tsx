import * as React from "react";
import Title from "../components/Title";
import TableView, { TableViewConfig } from "../components/TableView";
import { toLocaleDate, toCurrency } from "../util/processors";
import fetchData from "../util/fetchData";

export interface Expense {
  id: number;
  date: string;
  value: number;
  note: string;
  expenseTypeId: number;
  providerId: number;
}

export default class Expenses extends React.Component {
  public static displayName: string = "Expenses";

  public state = {
    list: []
  };

  public async componentDidMount(): Promise<void> {
    const list = await fetchData("/api/expenses");
    this.setState({ list });
  }

  public render(): React.ReactNode {
    const fields: TableViewConfig = {
      id: {
        label: "ID"
      },
      "expenseType.name": {
        label: "Tipo"
      },
      "provider.name": {
        label: "Fornecedor"
      },
      date: {
        label: "Data",
        processor: toLocaleDate
      },
      value: {
        label: "Valor",
        processor: toCurrency
      }
    };

    return (
      <div className="page-expenses">
        <Title text="Saídas" />
        <TableView list={this.state.list} fields={fields} />
      </div>
    );
  }
}

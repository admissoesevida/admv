import * as React from "react";
import Title from "../components/Title";
import TableView from "../components/TableView";

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

  public componentDidMount(): void {
    fetch("/api/expenses")
      .then((res): Promise<Expense[]> => res.json())
      .then((list): void => this.setState({ list }));
  }

  public render(): React.ReactNode {
    return (
      <div className="page-expenses">
        <Title text="Saídas" />
        <TableView
          list={this.state.list}
          headers={["ID", "Data", "ID de Tipo", "Fornecedor", "Valor"]}
          fields={["id", "date", "expenseTypeId", "provider.name", "value"]}
        />
      </div>
    );
  }
}

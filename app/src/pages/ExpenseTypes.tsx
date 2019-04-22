import * as React from "react";
import Title from "../components/Title";
import TableView from "../components/TableView";

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

  public componentDidMount(): void {
    fetch("/api/expense-types")
      .then((res): Promise<ExpenseType[]> => res.json())
      .then((list): void => this.setState({ list }));
  }

  public render(): React.ReactNode {
    return (
      <div className="page-expense-types">
        <Title text="Tipos de Saídas" />
        <TableView
          list={this.state.list}
          headers={["ID", "Nome", "Nota"]}
          fields={["id", "name", "note"]}
        />
      </div>
    );
  }
}

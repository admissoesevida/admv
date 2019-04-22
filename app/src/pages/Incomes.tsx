import * as React from "react";
import Title from "../components/Title";
import TableView from "../components/TableView";

export interface Income {
  id: number;
  date: string;
  value: number;
  note: string;
  incomeTypeId: number;
  memberId: number;
}

export default class Incomes extends React.Component {
  public static displayName: string = "Incomes";

  public state = {
    list: []
  };

  public componentDidMount(): void {
    fetch("/api/incomes")
      .then((res): Promise<Income[]> => res.json())
      .then((list): void => this.setState({ list }));
  }

  public render(): React.ReactNode {
    return (
      <div className="page-incomes">
        <Title text="Incomes" />
        <TableView
          list={this.state.list}
          headers={["ID", "Data", "ID de Tipo", "ID de Membro", "Valor"]}
          fields={["id", "date", "incomeTypeId", "memberId", "value"]}
        />
      </div>
    );
  }
}

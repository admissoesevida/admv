import * as React from "react";
import Title from "../components/Title";
import TableView from "../components/TableView";

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

  public componentDidMount(): void {
    fetch("/api/income-types")
      .then((res): Promise<IncomeType[]> => res.json())
      .then((list): void => this.setState({ list }));
  }

  public render(): React.ReactNode {
    return (
      <div className="page-income-types">
        <Title text="Tipos de Entradas" />
        <TableView
          list={this.state.list}
          headers={["ID", "Nome", "Nota"]}
          fields={["id", "name", "note"]}
        />
      </div>
    );
  }
}

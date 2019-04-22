import * as React from "react";
import Title from "../components/Title";
import TableView from "../components/TableView";

export interface Provider {
  id: number;
  name: string;
  cpf_cnpj: string;
}
export default class Providers extends React.Component {
  public static displayName: string = "Providers";

  public state = {
    list: []
  };

  public componentDidMount(): void {
    fetch("/api/providers")
      .then((res): Promise<Provider[]> => res.json())
      .then((list): void => this.setState({ list }));
  }

  public render(): React.ReactNode {
    return (
      <div className="page-providers">
        <Title text="Fornecedores" />
        <TableView
          list={this.state.list}
          headers={["ID", "Name", "CPF/CNPJ"]}
          fields={["id", "name", "cpf_cnpj"]}
        />
      </div>
    );
  }
}

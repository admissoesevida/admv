import * as React from "react";
import Title from "../components/Title";
import TableView, { TableViewConfig } from "../components/TableView";
import fetchData from "../util/fetchData";

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

  public async componentDidMount(): Promise<void> {
    const list = await fetchData("/api/providers");
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
      // eslint-disable-next-line @typescript-eslint/camelcase
      cpf_cnpj: {
        label: "CPF/CNPJ"
      }
    };

    return (
      <div className="page-providers">
        <Title text="Fornecedores" />
        <TableView list={this.state.list} fields={fields} />
      </div>
    );
  }
}

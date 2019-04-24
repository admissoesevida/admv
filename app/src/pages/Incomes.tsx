import * as React from "react";
import Title from "../components/Title";
import TableView, { TableViewConfig } from "../components/TableView";
import { Member } from "./Members";
import { toLocaleDate, toCurrency } from "../util/processors";
import fetchData from "../util/fetchData";

export interface Income {
  id: number;
  date: string;
  value: number;
  note: string;
  incomeTypeId: number;
  memberId: number;
  member: Member;
}

export default class Incomes extends React.Component {
  public static displayName: string = "Incomes";

  public state = {
    list: []
  };

  public async componentDidMount(): Promise<void> {
    const list = await fetchData("/api/incomes");
    this.setState({ list });
  }

  public render(): React.ReactNode {
    const fields: TableViewConfig = {
      id: {
        label: "ID"
      },
      "member.name": {
        label: "Membro"
      },
      "incomeType.name": {
        label: "Tipo"
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
      <div className="page-incomes">
        <Title text="Entradas" />
        <TableView list={this.state.list} fields={fields} />
      </div>
    );
  }
}

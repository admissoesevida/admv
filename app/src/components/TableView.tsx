import * as React from "react";
import "./TableView.scss";
import Loader from "./Loader";
import getValue from "../util/getValue";

export interface Config {
  label: string;
  processor?: Function;
}

export interface TableViewConfig {
  [field: string]: Config;
}

export default function TableView({
  list,
  fields
}: {
  list: any[];
  fields: TableViewConfig;
}): React.ReactElement {
  if (list.length === 0) {
    return (
      <div className="table-view-component">
        <Loader style="dark" />
      </div>
    );
  }

  const fieldList = Object.keys(fields);

  return (
    <table className="table-view-component" cellSpacing="0">
      <thead>
        <tr>
          {fieldList.map(
            (key: string): React.ReactElement => {
              const { label } = fields[key];
              return <td key={key}>{label}</td>;
            }
          )}
        </tr>
      </thead>
      <tbody>
        {list.map(
          (item): React.ReactElement => {
            const rows = fieldList.map(
              (key: string): React.ReactElement => {
                const className = isNaN(item[key])
                  ? "type-text"
                  : "type-number";

                return (
                  <td key={key} className={className}>
                    {getValue(item, key, fields[key].processor)}
                  </td>
                );
              }
            );
            return <tr key={item.id}>{rows}</tr>;
          }
        )}
      </tbody>
    </table>
  );
}

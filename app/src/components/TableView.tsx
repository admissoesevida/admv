import * as React from "react";
import "./TableView.scss";
import Loader from "./Loader";

export default function TableView({
  list,
  fields,
  headers
}: {
  list: any[];
  fields: string[];
  headers: string[];
}): React.ReactElement {
  if (list.length === 0) {
    return (
      <div className="table-view-component">
        <Loader style="dark" />
      </div>
    );
  }

  return (
    <table className="table-view-component" cellSpacing="0">
      <thead>
        <tr>
          {headers.map(
            (header: string): React.ReactElement => {
              return <td key={header}>{header}</td>;
            }
          )}
        </tr>
      </thead>
      <tbody>
        {list.map(
          (item): React.ReactElement => {
            const rows = fields.map(
              (field: string): React.ReactElement => {
                const className = isNaN(item[field])
                  ? "type-text"
                  : "type-number";
                return (
                  <td key={field} className={className}>
                    {item[field]}
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

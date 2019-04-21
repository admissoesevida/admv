import * as React from "react";

export interface Member {
  id: number;
  name: string;
  cpf: string;
  other: string;
}

export default class Members extends React.Component {
  public static displayName: string = "Members";

  public state = {
    list: []
  };

  public componentDidMount(): void {
    fetch("/api/members")
      .then((res): Promise<Member[]> => res.json())
      .then((list): void => this.setState({ list }));
  }

  public render(): React.ReactNode {
    return (
      <div className="page-members">
        <p>Members</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(
              (member: Member): React.ReactElement => {
                return (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

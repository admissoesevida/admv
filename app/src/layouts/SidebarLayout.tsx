import * as React from "react";
import Navigation, { Menu } from "../components/Navigation";
import "./Sidebar.scss";

export interface SidebarProps {
  menuList: Menu[];
  children: React.ReactNode;
}

export default class SidebarLayout extends React.Component<SidebarProps> {
  public static displayName: string = "SidebarLayout";

  public render(): React.ReactNode {
    return (
      <section className="layout-sidebar">
        <aside className="sidebar-content">
          <Navigation menuList={this.props.menuList} />
        </aside>
        <section className="main-content">{this.props.children}</section>
      </section>
    );
  }
}

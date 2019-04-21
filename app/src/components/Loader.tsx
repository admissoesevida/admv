import * as React from "react";
import "./Loader.scss";

export default function Loader({
  size = "",
  style = ""
}: {
  size?: string;
  style?: string;
}): React.ReactElement {
  const classes = ["loader-component", size, style];
  return <div className={classes.join(" ")}>Loading...</div>;
}

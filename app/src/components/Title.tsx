import * as React from "react";
import "./Title.scss";

export interface TitleProps {
  text: string;
}

export default function App({ text }: TitleProps): React.ReactElement {
  return <h1>{text}</h1>;
}

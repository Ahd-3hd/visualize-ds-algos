import { Link } from "react-router-dom";
import "./menuItem.scss";

interface Props {
  title: string;
}

export const MenuItem = ({ title }: Props) => {
  return <Link to={`/${title}`}>- {title}</Link>;
};

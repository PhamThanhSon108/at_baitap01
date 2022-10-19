import { ReactChild, ReactChildren } from "react";
import "./GlobalStyles.scss";
interface AuxProps {
  children: ReactChild | ReactChildren;
}
const GlobalStyles = ({ children }: AuxProps) => {
  return <>{children}</>;
};
export default GlobalStyles;

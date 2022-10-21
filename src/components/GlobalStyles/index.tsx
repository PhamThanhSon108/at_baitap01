import { ReactChild, ReactChildren, ReactNode } from "react";
import "./GlobalStyles.scss";
interface AuxProps {
  children: ReactNode;
}
const GlobalStyles = ({ children }: AuxProps) => {
  return <>{children}</>;
};
export default GlobalStyles;

import { Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";

export default function Counter() {
  const state = useSelector((state: RootState) => state.bank);
  const dispatch = useDispatch();

  const { depositMoney, withdrawMoney, bankrupt } = bindActionCreators(
    actionCreators,
    dispatch
  );

  return (
    <div className="App">
      <Typography.Title>COUNTER APP</Typography.Title>
      <h1>{state}</h1>
      <Button onClick={() => depositMoney(1000)}>Deposit</Button>
      <Button onClick={() => withdrawMoney(1000)}>Withdraw</Button>
      <Button onClick={() => bankrupt()}>Bankrupt</Button>
    </div>
  );
}

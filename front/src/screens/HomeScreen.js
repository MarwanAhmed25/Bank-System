import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccount } from "../features/account/accountSlice";
import NewUserScreen from "./NewUserScreen";
import UserDashboardScreen from "./UserDashboardScreen";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAccount());
  }, [dispatch]);

  return (
    <div>
      <h3>Welcom to Modern Bank</h3>
      {user && (accounts === null || accounts.accepted === false) ? (
        <NewUserScreen />
      ) : accounts.accepted ? (
        <UserDashboardScreen />
      ) : null}
    </div>
  );
};

export default HomeScreen;

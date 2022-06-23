import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccount } from "../features/account/accountSlice";
import NewUserScreen from "./NewUserScreen";
import UserDashboardScreen from "./UserDashboardScreen";

const UserScreen = () => {
  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAccount());
  }, [dispatch]);

  return (
    <>
      {user && (accounts === null || accounts.accepted === false) ? (
        <NewUserScreen />
      ) : accounts.accepted ? (
        <UserDashboardScreen />
      ) : null}
    </>
  );
};

export default UserScreen;

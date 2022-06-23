import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import "./App.css";
import AdminDashScreen from "./screens/AdminDashScreen";
import NewUserScreen from "./screens/NewUserScreen";
import PendingAccountScreen from "./screens/PendingAccountScreen";
import DepositScreen from "./screens/DepositScreen";
import WithdrawScreen from "./screens/WithdrawScreen";
import UserDashboardScreen from "./screens/UserDashboardScreen";
import TransferScreen from "./screens/TransferScreen";
import TransactionsList from "./screens/TransactionsList";
// import AdminScreen from "./screens/AdminScreen";
import UserListScreen from "./screens/UserListScreen";
import AccountApproval from "./screens/AccountApproval";
import NewRegisterRequest from "./screens/NewRegisterRequest";
import PendingRegisterScreen from "./screens/pendingRegisterScreen";
import UserScreen from "./screens/UserScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      {/* when Admin sign in will be redirected to Admin dashboard */}
      {/* <AdminDashScreen /> */}

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* Will be Protected Route */}
            <Route path="/adminPanel" element={<AdminDashScreen />} />
            <Route path="/newuser" element={<NewUserScreen />} />
            <Route path="/pending" element={<PendingAccountScreen />} />
            <Route path="/deposit" element={<DepositScreen />} />
            <Route path="/transfer" element={<TransferScreen />} />

            <Route path="/withdraw" element={<WithdrawScreen />} />

            <Route path="/user" element={<UserDashboardScreen />} />
            <Route path="/list/*" element={<TransactionsList />} />
            {/* <Route path="/admin" element={<AdminScreen />} /> */}
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/accountList" element={<AccountApproval />} />

            <Route path="/admin/newrequest" element={<NewRegisterRequest />} />
            <Route path="/pendingreg" element={<PendingRegisterScreen />} />
            <Route path="/userscreen" element={<UserScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

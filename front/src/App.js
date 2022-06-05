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
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

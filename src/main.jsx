import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Redux/store";
import App from "./App"; // Import the App component
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import CountryList from "./page/countryList";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/countryList" element={<CountryList />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { Provider } from "react-redux";
import store from "../store";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import AddAppointment from "./components/AddAppointment";
import EditAppointment from "./components/EditAppointment";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/reset' element={<ResetPassword />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/add' element={<AddAppointment />} />
            <Route path='/edit/:id' element={<EditAppointment />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;

/*
 *  Document    : App.js
 *  Author      : ticvic
 *  Description : root file for index
 */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./screens/NotFound/404";
import Login from "./screens/Login/Login";
import Register from "./screens/register/Register";
import Forgotpassword from "./screens/forgotpassword/Forgotpassword";
import Profile from "./screens/myaccount/Profile";
import Homepage from "./screens/home/Homepage";
import ChangePassword from "./screens/myaccount/ChangePassword";
import Postrequirement from "./screens/requirements/Postrequirement";
import Requirement from "./screens/requirements/Requirement";
import Watchlive from "./screens/watchlive/Watchlive";
import Wallet from "./screens/wallet/Wallet";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<Forgotpassword />} />
        <Route path="home" element={<Homepage />} />
        <Route path="myaccount/profile" element={<Profile />} />
        <Route path="myaccount/changepassword" element={<ChangePassword />} />
        <Route path="requirements/post" element={<Postrequirement />} />
        <Route path="requirements/myrequirement" element={<Requirement />} />
        <Route path="watchLive" element={<Watchlive />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

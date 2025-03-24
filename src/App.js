import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./presentation/user/Home";
import SystemDesign from "./presentation/user/SystemDesign";
import { AdminRoute, LoginRoute } from "./utils/Route";
import DSA from "./presentation/user/DSA";
import Topics from "./presentation/user/Topics";
import Login from "./presentation/admin/Login";
import AdminPanel from "./presentation/admin/AdminPanel";

function App() {
  return (
    <Router>
    <Routes>
      <Route  path="/" element={<Home />} />
      <Route path="/system-design" element={<SystemDesign />} />
      <Route path="/dsa" element={<DSA />} />
      <Route path="/topics" element={<Topics />} />
      <Route element={ <LoginRoute />}>
         <Route path="/login" element={<Login />} />
      </Route>
      <Route element={ <AdminRoute />}>       
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;

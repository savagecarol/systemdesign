import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./presentation/user/Home";
import { AdminRoute, LoginRoute } from "./utils/Route";
import Login from "./presentation/admin/Login";
import AdminPanel from "./presentation/admin/AdminPanel";
import Page from './presentation/user/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Page />} />

        <Route element={<LoginRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

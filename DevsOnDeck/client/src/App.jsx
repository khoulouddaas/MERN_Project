import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // adjust path if needed

import { NavBar } from './components/NavBar';
import DevRegistration from './components/DevRegister';
import { DevLogin } from './components/DevLogin';
import { OrgLogin } from './components/OrgLogin';
import { Home } from './components/Home';
import Languages from './components/Languages';
import DevProfile from './components/DevProfile';
import DevEdit from './components/UpdateDev';
import OrgRegistration from './components/OrgRegister';
import DevList from './components/DevList';
import Newposition from './components/NewPosition';
import PositionDetails from './components/PositionDetails';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <div className="content">
          <Routes>
            <Route element={<DevRegistration />} path="/devs/register" />
            <Route element={<Home />} path="/" default />
            <Route element={<DevLogin />} path="/devs/login" />
            <Route path="/devs/skills/languages/:devId" element={<Languages />} />
            <Route path="/devs/profile" element={<DevProfile />} />
            <Route element={<OrgRegistration />} path="/org/register" />
            <Route element={<OrgLogin />} path="/org/login" />
            <Route path="/devs/update/:id" element={<DevEdit />} />
            <Route element={<DevList />} path="/org/dashboard" />
            <Route element={<Newposition />} path="/jobs/create" />
            <Route path="/positions/:positionId" element={<PositionDetails />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { NavBar } from './components/NavBar';
import DevRegistration from './components/DevRegister';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DevLogin } from './components/DevLogin';

import { Home }  from './components/Home';
import Languages from './components/Languages';

import DevDashboard from './components/DevDashboard';
import DevEdit from './components/UpdateDev';



function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <div className='content'>
        <Routes>
         
          <Route element={<DevRegistration/>} path="/devs/register" />
              <Route element={<Home/>} path="/" default />
          <Route element={<DevLogin/>} path="/devs/login" />
<Route path="/devs/skills/languages/:devId" element={<Languages />} />
<Route path="/devs/allDevs" element={<DevDashboard />} />

<Route path="/devs/update/:id" element={<DevEdit />} />

        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;

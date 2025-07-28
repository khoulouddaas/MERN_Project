import { NavBar } from './components/NavBar';
import DevRegistration from './components/DevRegister';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DevLogin } from './components/DevLogin';

import { Home }  from './components/Home';
import Languages from './components/Languages';


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


        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;

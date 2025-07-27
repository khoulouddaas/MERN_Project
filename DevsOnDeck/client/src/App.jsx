import { NavBar } from './components/NavBar';
import AllDevs from './components/AllDevs';
import DevRegistration from './components/DevRegister';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DevLogin } from './components/DevLogin';
import { Developer } from './components/Developer';
import { UpdateDev } from './components/DevForm';
import { Landing }  from './components/Home';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <div className='content'>
        <Routes>
         
          <Route element={<DevRegistration/>} path="/devs/register" />
              <Route element={<Landing/>} path="/" default />
          <Route element={<DevLogin/>} path="/devs/login" />

        </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;

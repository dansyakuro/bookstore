import Landing from './Landing/LandingUse';
import AuthUse from './Auth/AuthUse';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={
          <Landing tipe={"Home"}/>
      }>
      </Route>
      <Route path='/book/detail/:id' element={
          <Landing tipe={"Detail Book"}/>
      }>
      </Route>
      <Route path= '/auth/login' element={<AuthUse tipe={"Login"}/>}></Route>
      <Route path= '/auth/register' element={<AuthUse tipe={"Register"}/>}></Route>
      <Route path= '/auth/forgot' element={<AuthUse tipe={"Forgot"}/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import MyProfile from './Component/MyProfile';
function App() {

  return (
    <div>
      <Navbar />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/myProfile' element={<MyProfile />} />
     </Routes>
     <ToastContainer />
    </div>
  );
}

export default App;

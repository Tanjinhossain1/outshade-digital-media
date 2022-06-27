import './App.css';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
function App() {

  return (
    <div>
      <Navbar />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signIn' element={<SignUp />} />
     </Routes>
     <ToastContainer />
    </div>
  );
}

export default App;

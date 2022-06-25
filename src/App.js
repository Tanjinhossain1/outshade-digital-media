import './App.css';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import { Routes,Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <Navbar />
     <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/home' element={<Home />}></Route>
     </Routes>
    </div>
  );
}

export default App;

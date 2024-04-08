import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

//pages
import Home from './pages/Home';
import Register from './pages/Regester';
import Login from './pages/Login';

//style sheets
import "./stylesheets/alignments.css";
import "./stylesheets/custom.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/sizes.css";
import "./stylesheets/theme.css";
import ProtectedRoute from './components/ProtectedRoutes';

import {useSelector} from "react-redux"

function App() {
  const {loading} = useSelector(store => store.loaders)
  
  return (
    <div>
      {
        loading && (<div className='loader-parent'>
          <div className='loader'></div>
          </div>)
      }
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

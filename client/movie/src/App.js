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



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

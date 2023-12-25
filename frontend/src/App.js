import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './screens/SignUp.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrder from './screens/MyOrder.jsx';

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/createuser" element={<SignUp />} />
              <Route path="/myOrder" element={<MyOrder/>} />

            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;

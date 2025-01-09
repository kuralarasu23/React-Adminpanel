import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addproducts from './Pages/Addproducts';
import Userform from './Components/Userform';
import Login from './Pages/Login';
import Error from './Pages/Error';
import Signup from './Pages/Signup';
import Products from './Pages/Products';
import Update from './Pages/Update';
import ForgotPassword from './Pages/ForgotPassword';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
            <Route path="/Addproducts" element={<Addproducts />} />
            <Route path="/userform" element={<Userform />} />
            <Route path="signup" element={<Signup/>} />
            <Route path="/*" element={<Error />} />
            <Route path="/products" element={<Products />} />
            <Route path="/" element={<Login /> } />
            <Route path="/forgot" element={<ForgotPassword /> } />
            <Route path="/update/:id" element={<Update /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

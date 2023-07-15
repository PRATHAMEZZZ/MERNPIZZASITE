
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route,BrowserRouter} from "react-router-dom";
import { Suspense, createContext, lazy, useState } from 'react';
import Loader from './Components/Loader';
import ProtectedRoute from './Components/protected';

const Products=lazy(()=>import('./Pages/Products'))
const Home=lazy(()=>import('./Pages/Home'))
const Cart=lazy(()=>import('./Pages/Cart'))
const Orders=lazy(()=>import('./Pages/Orders'))
const Admin=lazy(()=>import('./Pages/Admin'))
const Login=lazy(()=>import('./Pages/Login'))
const SignUp=lazy(()=>import('./Pages/SignUp'))

function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
          <Route path="/" element={<Suspense fallback={<Loader/>}><Home/></Suspense>}></Route>
          <Route path="/login" element={<Suspense fallback={<Loader/>}><Login/></Suspense>}></Route>
          <Route path="/signUp" element={<Suspense fallback={<Loader/>}><SignUp/></Suspense>}></Route>
          <Route path="/products/:id" element={<Suspense fallback={<Loader/>}><Products/></Suspense>}></Route>
          <Route path="/cart" element={<Suspense fallback={<Loader/>}><ProtectedRoute Component={Cart}/></Suspense>}/>
          <Route path="/orders" element={<Suspense fallback={<Loader/>}><ProtectedRoute Component={Orders}/></Suspense>}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;

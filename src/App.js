import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Routes,Route, Outlet} from "react-router-dom"
import Home from './components/Home';
import Profile from './components/Profile';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Forgetpassword from './components/Forgetpassword';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Category from './components/Category';
import Detail from './components/Detail';
import Create from './components/Create';
import Edit from './components/Edit';
import Search from './components/Search';


function App() {
  return (
    <>
    <Router>
      <div className="container mx-auto">
      <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<PrivateRoute/>}>
                <Route path="/profile" element={<Profile/>} />
            </Route>
            <Route path="/category/:categoryName" element={<Category/>} />
            <Route path="/detail/:postId" element={<Detail/>} />
            <Route path="/sign-in" element={<Signin/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/edit/:postId" element={<Edit/>} />
            <Route path="/search/:text" element={<Search/>} />
            <Route path="/sign-up" element={<Signup/>} />
            <Route path="/forgetpassword" element={<Forgetpassword/>} />
           
          </Routes>
     
          <ToastContainer />
      </div>  
    </Router>

    </>
   
       
  );
}

export default App;

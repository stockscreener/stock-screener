import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { login } from './features/authSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from './components/navigationBar'
import Screener from './components/screener'
import Login from './components/login'
import Signup from './components/signup'
import Screens from './components/screens'
import NewScreen from './components/newScreen'
import UserProfile from './components/profile'
import UpdatePassword from './components/updatePassword'
import VisibleStocks from './components/admin/visibleStocks';
import VisibleStockDetails from './components/admin/visibleStockDetails'
import ManageUsers from './components/admin/manageUsers'


function App() {

  const navState = useSelector((state) => state.navbar.visible)
  const navUpdate = useSelector((state)=>state.navbar.update)
  const dispatch = useDispatch()


  useEffect(() => {
    if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
      dispatch(login());
    }
  }, [])

  return (
    <div className=''>
      {/* navigation bar */}
      <ConditionalNavigationBar navState={navState} navUpdate={navUpdate}/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Screener />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />}/>
          <Route path="/screens" element={<Screens />}/>
          <Route path="/screens/new" element={<NewScreen />}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/profile/password" element={<UpdatePassword/>}/>
          <Route path="/admin/stocks" element={<VisibleStocks />}/> 
          <Route path="/admin/details" element={<VisibleStockDetails />}/> 
          <Route path="/admin/users" element={<ManageUsers />}/> 
        </Routes>
      </div>
      <ToastContainer autoClose={4000} position='bottom-right'/>
    </div>
  );
}

function ConditionalNavigationBar(props) {
  const isLoginOrSignup = window.location.pathname.includes('/login') || window.location.pathname.includes('/register');  
  return isLoginOrSignup ? null : <NavigationBar />;
}

export default App;

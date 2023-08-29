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
import Watchlist from './components/watchlist'
// import Watchlist from './components/createWatchlist'

function App() {

  const loginStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()


  useEffect(() => {
    if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
      dispatch(login());
    }
  }, [])

  return (
    <div className=''>
      {/* navigation bar */}
      <ConditionalNavigationBar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Screener />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />}/>
         {/* // <Route path='/createNewWatchlist' element={<CreateNewWatchlist />} /> */}
         <Route path='/createWatchlist' element={<Watchlist />} />
          <Route path='/watchlist' element={<Watchlist />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

function ConditionalNavigationBar() {
  const isLoginOrSignup = window.location.pathname.includes('/login') || window.location.pathname.includes('/register');

  return isLoginOrSignup ? null : <NavigationBar />;
}

export default App;

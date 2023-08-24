import { Profile, useEffect } from 'react'
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
      {loginStatus && <NavigationBar />}
      <div className="container">
        <Routes>
          <Route path='/' element={<Screener />} />
          <Route path='/login' element={<Login />} />
<<<<<<< HEAD
          <Route path='/profile' element={<Profile/>} />
=======
          <Route path='/register' element={<Signup />}/>
>>>>>>> 99c3774e4b1f6158c8a77ad4ba3f7bee782bc504
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

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
import CreateBlog from './components/CreateBlog'

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
          <Route path='/createblog' element={<CreateBlog />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

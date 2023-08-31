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
import VerifyUsers from './components/admin/verifyUsers'
import Support from './components/support'
import JoinPremium from './components/joinPremium'
import MyScreens from './components/myScreens'
import ProtectedRoute from './utils/protected-routes'
import AdminRoute from './utils/admin-routes'
import InvalidRoute from './components/invalidRoute'
import StockInfo from './components/stockInfo'


function App() {

  const navState = useSelector((state) => state.navbar.visible)
  const navUpdate = useSelector((state) => state.navbar.update)
  const role = useSelector(state => state.auth.role)
  const isAuthenticated = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()


  useEffect(() => {
    if (sessionStorage['token'] && sessionStorage['token'].length > 0) {
      dispatch(login());
    }
  }, [])

  return (
    <div className=''>
      {/* navigation bar */}
      <ConditionalNavigationBar navState={navState} navUpdate={navUpdate} />
      <div className="">
        <Routes>
          <Route path='/' element={<Screener />} />
          
          <Route path='/login' element={<Login />} />
          
          <Route path='/register' element={<Signup />} />
          
          <Route path="/screens" element={<Screens />} />
          
          <Route path="/stock-info" element={<StockInfo />} />

          {/* Protected Routes */}
          <Route path="/my-screens" element={
            <ProtectedRoute authenticated={isAuthenticated} >
              <MyScreens />
            </ProtectedRoute>} />

          <Route path="/screens/new" element={
            <ProtectedRoute authenticated={isAuthenticated}>
              <NewScreen />
            </ProtectedRoute>} />

          <Route path="/profile" element={
            <ProtectedRoute authenticated={isAuthenticated}>
              <UserProfile />
            </ProtectedRoute>}
          />
          <Route path="/support" element={
            <ProtectedRoute authenticated={isAuthenticated}>
              <Support />
            </ProtectedRoute>}
          />

          <Route path="/profile/password" element={
            <ProtectedRoute authenticated={isAuthenticated} >
              <UpdatePassword />
            </ProtectedRoute>}
          />

          <Route path="/premium" element={
            <ProtectedRoute authenticated={isAuthenticated}>
              <JoinPremium />
            </ProtectedRoute>}
          />

          {/* Admin Routes */}
          <Route path="/admin/stocks" element={
            <AdminRoute isAdmin={role === "ROLE_ADMIN"} >
              <VisibleStocks />
            </AdminRoute>}
          />

          <Route path="/admin/details" element={
            <AdminRoute isAdmin={role === "ROLE_ADMIN"} >
              <VisibleStockDetails />
            </AdminRoute>}
          />

          <Route path="/admin/users" element={
            <AdminRoute isAdmin={role === "ROLE_ADMIN"} >
              <ManageUsers />
            </AdminRoute>}
          />

          <Route path="/admin/users/verify" element={
            <AdminRoute isAdmin={role === "ROLE_ADMIN"}>
              <VerifyUsers id={4} />
            </AdminRoute>}
          />
          {/* Invalid requests route */}
          <Route path="*" element={<InvalidRoute />} />
        </Routes>
      </div>
      <ToastContainer autoClose={4000} position='bottom-right' />
    </div>
  );
}

function ConditionalNavigationBar(props) {
  const isLoginOrSignup = window.location.pathname.includes('/login') || window.location.pathname.includes('/register');
  return isLoginOrSignup ? null : <NavigationBar />;
}

export default App;

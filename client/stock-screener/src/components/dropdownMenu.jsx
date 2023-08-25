import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { logout } from "../features/authSlice";

function DropdownMenu() {
    const authSlice = useSelector((state)=>state.auth)
    const optionalName = "Set Your Name in Profile"
    const dispatch = useDispatch()
    var role = authSlice.role
    var logoutUser=()=>{
        sessionStorage.clear()
        dispatch(logout())
    }
    
    switch (role) {
        case "ROLE_INVESTOR":
            return (<div className="nav-item dropdown text-light pe-5 me-5 pe-5 ms-4">
                <Link className="nav-link dropdown-toggle" to="/" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{authSlice.name != 'null'?authSlice.name : optionalName}</Link>
                <div className="dropdown-menu p-3 pe-5 border border-secondary border-3" aria-labelledby="dropdownId">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/">Watchlists</Link>
                    <Link className="dropdown-item" to="/">My Screens</Link>
                    <Link className="dropdown-item" to="/">Join Premium</Link>
                    <Link className="dropdown-item" to="/">Advisors</Link>
                    <Link className="dropdown-item" to="/">Support</Link>
                    <Link className="dropdown-item" to="/" onClick={logoutUser}>Logout</Link>
                </div>
            </div>);
        case "ROLE_ADMIN":
            return (<div className="nav-item dropdown text-light pe-5 me-5 pe-5 ms-4">
                <Link className="nav-link dropdown-toggle" to="/" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{authSlice.name != 'null'?authSlice.name : optionalName}</Link>
                <div className="dropdown-menu p-3 pe-5 border border-secondary border-3" aria-labelledby="dropdownId">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/">Manage Visible Stocks</Link>
                    <Link className="dropdown-item" to="/">Manage Stock Details</Link>
                    <Link className="dropdown-item" to="/">Manage Users</Link>
                    <Link className="dropdown-item" to="/">Statistics</Link>
                    <Link className="dropdown-item" to="/">Support</Link>
                    <Link className="dropdown-item" to="/" onClick={logoutUser}>Logout</Link>
                </div>
            </div>);
        case "ROLE_ADVISOR":
            return (<div className="nav-item dropdown text-light pe-5 me-5 pe-5 ms-4">
                <Link className="nav-link dropdown-toggle" to="/" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{authSlice.name != 'null'?authSlice.name : optionalName}</Link>
                <div className="dropdown-menu p-3 pe-5 border border-secondary border-3" aria-labelledby="dropdownId">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/">Watchlists</Link>
                    <Link className="dropdown-item" to="/">My Screens</Link>
                    <Link className="dropdown-item" to="/">My Blogs</Link>
                    <Link className="dropdown-item" to="/">Join Premium</Link>
                    <Link className="dropdown-item" to="/">Support</Link>
                    <Link className="dropdown-item" to="/" onClick={logoutUser}>Logout</Link>
                </div>
            </div>);
        default:
            return (<div className="nav-item dropdown text-light pe-5 me-5 pe-5 ms-4">
                <a className="nav-link text-primary" href="/login" id="dropdownId">login</a>
            </div>);
    }
}

export default DropdownMenu;
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { logout } from "../features/authSlice";
import { hideNavbar } from "../features/navbarSlice";

function DropdownMenu() {
    const authSlice = useSelector((state)=>state.auth)
    const optionalName = "Set Your Name in Profile"
    const dispatch = useDispatch()
    var role = authSlice.role
    if(role === undefined){
        role = ""
    }
    var logoutUser=()=>{
        sessionStorage.clear()
        dispatch(logout())
    }
    
    switch (role) {
        case "ROLE_INVESTOR":
            return (<div className="nav-item dropdown text-light pe-5 me-5 ms-4">
                <Link className="nav-link dropdown-toggle" to="/" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{authSlice.name != 'null'?authSlice.name : optionalName}</Link>
                <div className="dropdown-menu px-1 border border-secondary border-3" aria-labelledby="dropdownId">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/my-screens">My Screens</Link>
                    <Link className="dropdown-item" to="/premium">Join Premium</Link>
                    <Link className="dropdown-item" to="/advisors">Advisors</Link>
                    <Link className="dropdown-item" to="/support">Support</Link>
                    <Link className="dropdown-item" to="/" onClick={logoutUser}>Logout</Link>
                </div>
            </div>);
        case "ROLE_ADMIN":
            return (<div className="nav-item dropdown text-light pe-5 me-5 ms-4">
                <Link className="nav-link dropdown-toggle" to="/" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{authSlice.name != 'null'?authSlice.name : optionalName}</Link>
                <div className="dropdown-menu px-1 border border-secondary border-3" aria-labelledby="dropdownId">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/admin/stocks">Manage Visible Stocks</Link>
                    <Link className="dropdown-item" to="/admin/details">Manage Stock Details</Link>
                    <Link className="dropdown-item" to="/admin/users">Manage Users</Link>
                    <Link className="dropdown-item" to="/admin/stats">Statistics</Link>
                    <Link className="dropdown-item" to="/support">Support</Link>
                    <Link className="dropdown-item" to="/" onClick={logoutUser}>Logout</Link>
                </div>
            </div>);
        case "ROLE_ADVISOR":
            return (<div className="nav-item dropdown text-light pe-5 me-5 ms-4">
                <Link className="nav-link dropdown-toggle" to="/" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{authSlice.name != 'null'?authSlice.name : optionalName}</Link>
                <div className="dropdown-menu x-1 border border-secondary border-3" aria-labelledby="dropdownId">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <Link className="dropdown-item" to="/my-screens">My Screens</Link>
                    <Link className="dropdown-item" to="/premium">Join Premium</Link>
                    <Link className="dropdown-item" to="/support">Support</Link>
                    <Link className="dropdown-item" to="/" onClick={logoutUser}>Logout</Link>
                </div>
            </div>);
        default:
            return (<div className="nav-item dropdown text-light pe-5 me-5 pe-5 ms-4">
                <Link className="nav-link text-primary" to="/login" id="dropdownId" onClick={()=>dispatch(hideNavbar())}>login</Link>
            </div>);
    }
}

export default DropdownMenu;
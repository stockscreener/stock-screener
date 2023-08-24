import { Link } from "react-router-dom";
import DropdownMenu from "./dropdownMenu";

function NavigationBar() {
    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

        <Link className="navbar-brand text-secondary ps-5" to="/"><b>Stock Screener</b></Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation"></button>

        <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" to="/" aria-current="page">Home <span className="visually-hidden">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Screener</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/blogs">Blogs</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/screens">Screens</Link>
                </li>
            </ul>
            <nav className="navbar bg-dark me-3">
                <div className="container-fluid bg-dark">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                </div>
            </nav>
            <DropdownMenu />
        </div>

    </nav>
}

export default NavigationBar;
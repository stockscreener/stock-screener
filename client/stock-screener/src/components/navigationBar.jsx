import { Link } from "react-router-dom";
import DropdownMenu from "./dropdownMenu";
import StockSearchDropdown from "./searchStocks";

function NavigationBar() {
    return <nav className="navbar navbar-expand-md navbar-dark bg-dark">

        <Link className="navbar-brand text-secondary ps-5" to="/"><b>Stock Screener</b></Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

        <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 ms-5 mt-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Screener</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/screens">Screens</Link>
                </li>
            </ul>
            <nav className="navbar bg-dark mx-3">
                <div className="container-fluid bg-dark">
                    <StockSearchDropdown />
                </div>
            </nav>
            <DropdownMenu />
            <div className="col-1"></div>
        </div>

    </nav>
}

export default NavigationBar;
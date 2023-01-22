import { Link } from "react-router-dom"
import './Footer.scss'
export const Footer = () => {
    return(
        <footer id="footer">
            <div className="forMarginFooter">
            <div className="container">
                <div className="row">
                    <div className="first col-lg-4 col-md-4 col-12">
                        <ul>
                            <li>
                                <h5>TAKE HIQ</h5>
                            </li>
                            <li>
                                <Link to=''>About Us</Link>
                            </li>
                            <li>
                                <Link to=''>Delivery Informations</Link>
                            </li>
                            <li>
                                <Link to=''>Return and Exchange</Link>
                            </li>
                            <li>
                                <Link to=''>Returning Rules</Link>
                            </li>
                            <li>
                                <Link to=''>Safity and Security</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="second col-lg-4 col-md-4 col-12">
                        <ul>
                            <li><h5>REGISTER NOW AND ENJOY THE ADVANTAGES </h5></li>
                            <li><p>Subscribe for special offers, freebies and once-in-a-lifetime opportunities.</p></li>
                        </ul>
                    </div>
                    <div className="third col-lg-4 col-md-4 col-12">
                        <ul>
                            <li>
                                <h5>PAGES</h5>
                            </li>
                            <li>
                                <Link to=''>Products</Link>
                            </li>
                            <li>
                                <Link to=''>Sales</Link>
                            </li>
                            <li>
                                <Link to=''>About Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>© Copyright MammadliNurlan - All Rights Reserved</p>
                </div>  
            </div>
            </div>
           
        </footer>
    )
}
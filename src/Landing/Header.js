import React from "react";
import { Navigate } from "react-router-dom";

const Header = () => {
    const logged =  window.localStorage.getItem("username") !== null;
    const logout = () => {
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("password");
        <Navigate to="/" />;
        window.location.reload(true);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top " role="navigation">
            <div className="container">
                <a className="navbar-brand page-scroll" href="/"><img src={`${process.env.PUBLIC_URL}/assets/logos/logo.png`} alt="adminity Logo" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <ul className="navbar-nav my-2 my-lg-0">
                        <li className="nav-item">
                            <a className="nav-link page-scroll" href="/">Product</a>
                        </li>
                        {   
                            logged 
                            ? 
                            (
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="http://bookstore.rtcserver.cloud">Data</a>
                            </li> 
                            )
                            : ""
                        }
                        {   
                            logged 
                            ? 
                            (
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="/cart">Cart</a>
                            </li> 
                            )
                            : ""
                        }
                        <li className="nav-item">
                            {   
                                logged 
                                ? ( <a className="nav-link" href= "/#" onClick={ logout }>Logout</a> )
                                : ( <a className="nav-link" href= "/auth/login">Login</a> )
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header
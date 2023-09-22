import React from "react";
import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';

const AuthUse = ({ tipe }) => {
    const path = window?.location.pathname;
    if ( path === '/auth/login' || path === '/auth/register' || path === '/auth/forgot' ){
        require('../loginAssets/bower_components/bootstrap/css/bootstrap.min.css');
        require('../loginAssets/assets/icon/themify-icons/themify-icons.css');
        require('../loginAssets/assets/icon/icofont/css/icofont.css');
        require('../loginAssets/assets/css/style.css');
    }

    return (
        <div>
        { /*  Pre-loader start */}
        <section className="login-block">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        {
                            tipe === "Login" 
                            ? <Login />
                            : ''
                        }
                        {
                            tipe === "Register" 
                            ? <Register />
                            : ''
                        }
                        {
                            tipe === "Forgot" 
                            ? <Forgot />
                            : ''
                        }
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}

export default AuthUse
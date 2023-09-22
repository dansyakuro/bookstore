import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Forgot = () => {
    const MySwal = withReactContent(Swal);
    
    const [inputs, setInputs] = useState({
        username:'',
        password:''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
        }));
        console.log(e.target.name + ', '+e.target.value);
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(inputs);
        MySwal.fire({
            title: 'Processing...',
            html: 'Please wait...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                MySwal.showLoading()
            }
        });
        sendRequest();
    }

    const sendRequest = async() => {
        await fetch('http://bookstore.rtcserver.cloud/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: inputs.username,
                password: inputs.password
            })
        }).then(res=>res.json().then(json =>{
            if (json.status === 'success'){
                window.localStorage.setItem("username", inputs.username);
                window.localStorage.setItem("password", inputs.password);
                MySwal.fire(
                    'Success!',
                    json.text,
                    json.status
                )

                if(json.reload === 1){
                    setTimeout(function(){
                        navigate('/');
                        window.location.reload(true);
                    }, 2000);
                }
            }else{
                MySwal.fire({
                    title: 'Oops...',
                    icon: json.status,
                    html: json.text,
               })
           }
        }))
    }

    return (       
        <form className="md-float-material form-material py-5" onSubmit={submitHandler}>
            <div className="text-center">
                <img src={ require('../loginAssets/assets/images/logo.png') } className="p-1 rounded bg-light" alt="logo.png" />
            </div>
            <div className="auth-box card">
                <div className="card-block">
                    <div className="row m-b-20">
                        <div className="col-md-12">
                            <h3 className="text-center">Sign In</h3>
                        </div>
                    </div>
                    <div className="form-group form-primary">
                        <input type="text" name="username" className="form-control" required="" placeholder="Your Username" onChange={handleChange} value={inputs.username}/>
                        <span className="form-bar"></span>
                    </div>
                    <div className="form-group form-primary">
                        <input type="password" name="password" className="form-control" required="" placeholder="Password" onChange={handleChange} value={inputs.password}/>
                        <span className="form-bar"></span>
                    </div>
                    <div className="row m-t-25 text-left">
                        <div className="col-12">
                            <div className="forgot-phone text-left f-left">
                                <a href="/#" className="text-left f-w-600"> Create account</a>
                            </div>
                            <div className="forgot-phone text-right f-right">
                                <a href="/#" className="text-right f-w-600"> Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                    <div className="row m-t-30">
                        <div className="col-md-12">
                            <button type="Submit" className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20">Sign in</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-10">
                            <p className="text-inverse text-left m-b-0">Thank you.</p>
                            <p className="text-inverse text-left"><a href="/"><b className="f-w-600">Back to website</b></a></p>
                        </div>
                        <div className="col-md-2">
                            <img src={ require('../loginAssets/assets/images/auth/Logo-small-bottom.png') } alt="small-logo.png" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Forgot
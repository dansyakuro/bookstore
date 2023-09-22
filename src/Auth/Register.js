import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Register = () => {
    const MySwal = withReactContent(Swal);
    
    const [inputs, setInputs] = useState({
        nama:'',
        alamat:'',
        kodePos:'',
        tanggalLahir:'',
        noTelp:'',
        email:'',
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
        await fetch('http://bookstore.rtcserver.cloud/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nama:inputs.nama,
                alamat:inputs.alamat,
                kodePos:inputs.kodePos,
                tanggalLahir:inputs.tanggalLahir,
                noTelp:inputs.noTelp,
                email:inputs.email,
                username: inputs.username,
                password: inputs.password
            })
        }).then(res=>res.json().then(json =>{
            if (json.status === 'success'){
                MySwal.fire(
                    'Success!',
                    json.text,
                    json.status
                )

                if(json.reload === 1){
                    setTimeout(function(){
                        navigate('/auth/login');
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
                            <h3 className="text-center">Sign Up</h3>
                        </div>
                    </div>
                    <div className="form-group form-primary">
                        <input type="text" name="nama" className="form-control" required="" placeholder="Your Fullname" onChange={handleChange} value={inputs.nama}/>
                        <span className="form-bar"></span>
                    </div>
                    <div className="form-group form-primary">
                        <textarea type="alamat" name="alamat" className="form-control" required="" placeholder="Your Adress" onChange={handleChange} value={inputs.alamat}>
                            {inputs.alamat}
                        </textarea>
                        <span className="form-bar"></span>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group form-primary">
                                <input type="date" name="tanggalLahir" className="form-control" required="" placeholder="Your Birthday" onChange={handleChange} value={inputs.tanggalLahir} />
                                <span className="form-bar"></span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group form-primary">
                                <input type="text" name="kodePos" className="form-control" required="" placeholder="Your Postal Code" onChange={handleChange} value={inputs.kodePos}/>
                                <span className="form-bar"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group form-primary">
                                <input type="text" name="noTelp" className="form-control" required="" placeholder="Your Phone Number" onChange={handleChange} value={inputs.noTelp} />
                                <span className="form-bar"></span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group form-primary">
                                <input type="text" name="email" className="form-control" required="" placeholder="Your E-Mail" onChange={handleChange} value={inputs.email}/>
                                <span className="form-bar"></span>
                            </div>
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
                    <div className="row m-t-30">
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">Sign up now</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-10">
                            <p className="text-inverse text-left m-b-0">Back to <a href="/auth/login">Login.</a></p>
                            <p className="text-inverse text-left"><a href="/auth/login"><b className="f-w-600">Back to website</b></a></p>
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

export default Register
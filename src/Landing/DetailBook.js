import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";


const DetailBook = () => {
    const routeParams = useParams();

    if ( window?.location.pathname.includes("/book/detail") ){
        require('../loginAssets/bower_components/bootstrap/css/bootstrap.min.css');
        require('../loginAssets/assets/icon/themify-icons/themify-icons.css');
        require('../loginAssets/assets/icon/icofont/css/icofont.css');
        require('../loginAssets/assets/css/style.css');
        require('../loginAssets/bower_components/jquery-bar-rating/css/bars-1to10.css');
        require('../loginAssets/bower_components/jquery-bar-rating/css/bars-horizontal.css');
        require('../loginAssets/bower_components/jquery-bar-rating/css/bars-movie.css');
        require('../loginAssets/bower_components/jquery-bar-rating/css/bars-pill.css');
        require('../loginAssets/bower_components/jquery-bar-rating/css/bars-reversed.css');
        require('../loginAssets/bower_components/jquery-bar-rating/css/bars-square.css');
        require('../loginAssets/bower_components/jquery-bar-rating/css/css-stars.css');
        require('../loginAssets/assets/icon/feather/css/feather.css');
        require('../loginAssets/assets/css/jquery.mCustomScrollbar.css');
    }
    const addCart = () => {
        if(window.localStorage.getItem("username") !== null)
        console.log("Tambah kerangj");
        else {
            <Navigate to="/auth/login" />;
            window.location.reload(true);
        }
    }
    const [books, setBooks] = useState([]);

    const [data, setData] = useState({
        hasMore:true,
        limit:3,
        count:0,
        search: sessionStorage.getItem("search") !== null ? sessionStorage.getItem("search") : "All"
    });

    const handleChange = (e) => {
        setData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value === "" ? "All" : e.target.value
        }));
        console.log(e.target.name + ', '+e.target.value);
    }
    const submitSearch = (e) => {
        sessionStorage.setItem("search", data.search);
        window.location.reload(true);
    }
    const refreshSearch = (e) => {
        sessionStorage.removeItem("search");
        window.location.reload(true);
    }

    const fetchMoreData = async () => {
        await fetch(`http://bookstore.rtcserver.cloud/book/${routeParams.id}`).then((res)=>res.json()).then(json=>{
            setBooks(books.concat(json));
            console.log("JSON :",json);
            if(json.length < data.limit){
                setData((prevState) => ({
                    ...prevState,
                    hasMore: false
                }));
                if(data.count === 0) 
                setData((prevState) => ({
                    ...prevState,
                    count: json.length
                }));
            } else {
                setData((prevState) => ({
                    ...prevState,
                    count: data.count + data.limit
                }));
            }
        }).catch(err=>console.log(err));
    };
    if (data.hasMore === true && data.count === 0) fetchMoreData();
    console.log("Data :",books);
    console.log("Count :",data);

    return (
        <div className="pcoded-content">
            <div className="pcoded-inner-content">
                <div className="main-body">
                    <div className="page-wrapper">
                        <div className="page-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card product-detail-page">
                                        <div className="card-block">
                                            <div className="row">
                                                <div className="col-lg-5 col-xs-12">
                                                    <div className="port_details_all_img row">
                                                        <div className="col-lg-12 m-b-15">
                                                            <div id="big_banner">
                                                                <div className="port_big_img">
                                                                    <img className="img img-fluid" src={ require('../loginAssets/assets/images/product-detail/pro-d-l-1.jpg') } alt="Big_ Details" />
                                                                </div>
                                                                <div className="port_big_img">
                                                                    <img className="img img-fluid" src={ require('../loginAssets/assets/images/product-detail/pro-d-l-2.jpg') } alt="Big_ Details" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 product-right">
                                                            <div id="small_banner">
                                                                <div>
                                                                    <img className="img img-fluid" src={ require('../loginAssets/assets/images/product-detail/pro-d-s-1.jpg') } alt="small-details" />
                                                                </div>
                                                                <div>
                                                                    <img className="img img-fluid" src={ require('../loginAssets/assets/images/product-detail/pro-d-s-2.jpg') } alt="small-details" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7 col-xs-12 product-detail" id="product-detail">
                                                    <div className="row">
                                                        <div>
                                                            <div className="col-lg-12">
                                                                <span className="txt-muted d-inline-block">Product Code: <a href="#!"> PRDT1234 </a> </span>
                                                                <span className="f-right">Availablity : <a href="#!"> In Stock </a> </span>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <h4 className="pro-desc">Athena Black & Red Polyester Georgette Maxi Dress</h4>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <span className="txt-muted"> Brand : Denim </span>
                                                            </div>
                                                            <div className="stars stars-example-css m-t-15 detail-stars col-lg-12">
                                                                <select id="product-view" className="rating-star" name="rating" autoComplete="off">
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <span className="text-primary product-price"><i className="icofont icofont-cur-dollar"></i>80.00</span> <span className="done-task txt-muted">$90.59</span>
                                                                <hr />
                                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                                                                </p>
                                                                <hr />
                                                                <h6 className="f-16 f-w-600 m-t-10 m-b-10">Quantity</h6>
                                                            </div>
                                                            <div className="col-xl-3 col-sm-12">
                                                                <div className="p-l-0 m-b-25">
                                                                    <div className="input-group">
                                                                        <span className="input-group-btn">
                                                                            <button type="button" className="btn btn-default btn-number shadow-none btn-sm" disabled="disabled" data-type="minus" data-field="quant[1]">
                                                                                <span className="icofont icofont-minus m-0"></span>
                                                                            </button>
                                                                        </span>
                                                                        <input type="text" name="quant[1]" className="form-control input-number text-center mt-0" value="1" />
                                                                        <span className="input-group-btn">
                                                                            <button type="button" className="btn btn-default btn-number shadow-none btn-sm" data-type="plus" data-field="quant[1]">
                                                                                <span className="icofont icofont-plus m-0"></span>
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-sm-12 mob-product-btn">
                                                                <button type="button" className="btn btn-primary waves-effect waves-light m-r-20">
                                                                    <i className="icofont icofont-cart-alt f-16"></i><span className="m-l-10">ADD TO CART</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card product-detail-page">
                                <ul className="nav nav-tabs md-tabs tab-timeline" role="tablist">
                                    <li className="nav-item m-b-0">
                                        <a className="nav-link active f-18 p-b-0" data-toggle="tab" href="#review" role="tab">Review</a>
                                        <div className="slide"></div>
                                    </li>
                                </ul>
                            </div>

                            <div className="card">
                                <div className="card-block">
                                    <div className="tab-content bg-white">
                                        <div className="tab-pane active" id="review" role="tabpanel">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="styleSelector">

                </div>
                {/* footerLanding Section */} 
                <div className="footerLanding">
                    <div className="container">
                        <div className="col-md-12 text-center">
                            <img src={`${process.env.PUBLIC_URL}/assets/logos/logo.png`} alt="Adminty Logo" />
                            <ul className="footerLanding-menu">
                                <li><a href="http://dansyakuro.github.io">Site</a></li>
                                <li><a href="/#">Support</a></li>
                                <li><a href="/#">Terms</a></li>
                                <li><a href="/#">Privacy</a></li>
                            </ul>
                            <div className="footerLanding-text">
                                <p>
                                    Copyright © 2017 Adminty. All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Scroll To Top */} 
                <a id="back-top" className="back-to-top page-scroll" href="/#main">
                    <i className="ion-ios-arrow-thin-up"></i>
                </a>
                {/* Scroll To Top Ends */}
            </div>
        </div>
    );
}

export default DetailBook
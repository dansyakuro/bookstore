import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Product = () => {
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
        await fetch(`http://bookstore.rtcserver.cloud/index.php/limitBook/${data.limit}/${data.count}/${data.search}`).then((res)=>res.json()).then(json=>{
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
                            <div className="card">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-lg-6 offset-lg-3">
                                            <h1 className="txt-highlight text-center m-t-20">Book Search
                                            </h1>
                                            <p className="text-center">By Title or Author
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row seacrh-header">
                                        <div className="col-lg-4 offset-lg-4 offset-sm-3 col-sm-6 offset-sm-1 col-xs-12">
                                            <div className="input-group input-group-button input-group-primary">
                                                <input type="text" name="search" onChange={handleChange} value={data.username} className="form-control mt-0" placeholder="Search here..." />
                                                {
                                                    data.hasMore === false && data.count === 0
                                                    ? (<button className="btn btn-primary input-group-addon" id="basic-addon1" onClick={refreshSearch}>Search All</button>)
                                                    : (<button className="btn btn-primary input-group-addon" id="basic-addon1" onClick={submitSearch}>Search</button>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                {
                                    <InfiniteScroll
                                        dataLength={data.count} //This is important field to render the next data
                                        next={fetchMoreData}
                                        hasMore={data.hasMore}
                                        loader={
                                            <h1 className="txt-highlight text-center m-t-20">Loading...</h1>
                                        }
                                        endMessage={
                                            <div className="row justify-content-center mx-0">
                                                {
                                                data.hasMore === false && data.count === 0
                                                ? (<b>Unfortunately, the search did not find anything</b>)
                                                : (<b>Yay! You have seen it all</b>)
                                                }
                                            </div>
                                        }
                                        // below props only if you need pull down functionality
                                        refreshFunction={fetchMoreData}
                                        pullDownToRefresh={true}
                                        pullDownToRefreshThreshold={50}
                                        pullDownToRefreshContent={
                                        <h6 className="text-center mt-3">&#8595; Pull down to refresh</h6>
                                        }
                                        releaseToRefreshContent={
                                        <h6 className="text-center mt-3">&#8593; Release to refresh</h6>
                                        }
                                        style={{ overflow: 'none'}}
                                    >
                                    {
                                    (<div className="row justify-content-center align-items-center mx-0"> 
                                        {books.map((book, key) => (
                                            <div className="col-xl-4 col-md-6 col-sm-6 col-xs-12" key={key}>
                                                <div className="card prod-view">
                                                    <div className="prod-item text-center">
                                                        <div className="prod-img">
                                                            <div className="option-hover">
                                                                <button type="button" className="btn btn-success btn-icon waves-effect waves-light m-r-15 hvr-bounce-in option-icon">
                                                                    <i className="icofont icofont-cart-alt f-20"></i>
                                                                </button>
                                                                <button type="button" className="btn btn-primary btn-icon waves-effect waves-light m-r-15 hvr-bounce-in option-icon" onClick={sessionStorage.setItem("detailBook", book.id_buku)}>
                                                                    <i className="icofont icofont-eye-alt f-20"></i>
                                                                </button>
                                                            </div>
                                                            <a href={ `/book/detail/${book.id_buku}` } className="hvr-shrink" onClick={sessionStorage.setItem("detailBook", book.id_buku)}>
                                                                <img src={`${process.env.PUBLIC_URL}/images/${book.gambar}`} alt={ `Gambar_Produk${key+1}` } className="img-fluid o-hidden p-5" />
                                                            </a>
                                                        </div>
                                                        <div className="prod-info pt-0">
                                                            <a href={ `/book/detail/${book.id_buku}` } className="txt-muted" onClick={sessionStorage.setItem("detailBook", book.id_buku)}><h4>{ book.judul }</h4></a>
                                                            <div className="m-b-10">
                                                                <label className="label label-success">3.5 <i className="fa fa-star"></i></label><a className="text-muted f-w-600" href="/#">14 Ratings &amp;  3 Reviews</a>
                                                            </div>
                                                            <span className="prod-price">Rp. { parseInt(book.harga).toLocaleString("id-ID") }</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>)
                                    }
                                    </InfiniteScroll>
                                }
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

export default Product
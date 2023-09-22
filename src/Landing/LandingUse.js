import Header from './Header';
import Product from './Product';
import DetailBook from './DetailBook';

function LandingUse({ tipe }) {
    if (window?.location.pathname === '/' || window?.location.pathname.includes("/book/detail")){
        require('../loginAssets/css/bootstrap.min.css');
        require('../loginAssets/css/ionicons.min.css');
        require('../loginAssets/css/style.css');
        require('../loginAssets/bower_components/bootstrap/css/bootstrap.min.css');
        require('../loginAssets/bower_components/font-awesome/css/font-awesome.min.css');
        require('../loginAssets/bower_components/jquery-bar-rating/css/fontawesome-stars.css');
        require('../loginAssets/assets/icon/themify-icons/themify-icons.css');
        require('../loginAssets/assets/icon/icofont/css/icofont.css');
        require('../loginAssets/assets/icon/feather/css/feather.css');
        require('../loginAssets/assets/css/style.css');
        require('../loginAssets/assets/css/jquery.mCustomScrollbar.css');
    }
  return (
    <div className="pcoded-wrapper mt-5">
        <Header />
        {
            tipe === "Home" 
            ? <Product />
            : ''
        }
        {
            tipe === "Cart" 
            ? <Product />
            : ''
        }
        {
            tipe === "Detail Book" 
            ? <DetailBook />
            : ''
        }
    </div>
  );
}

export default LandingUse;

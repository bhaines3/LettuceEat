import React from 'react';
import {Link} from 'react-router-dom';
import ModalSignUp from '../ModalSignUp';

// const Nav = () => {
//   return (
//     <nav className="navbar navbar-inverse">
//       <div className="container-fluid">
//         {/* Brand and toggle get grouped for better mobile display */}
//         <div className="navbar-header">
//           <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
//             <span className="sr-only">Toggle navigation</span>
//             <span className="icon-bar" />
//             <span className="icon-bar" />
//             <span className="icon-bar" />
//           </button>
//           <Link className="navbar-brand text-warning" to="/">New York Times Scraper</Link>
//         </div>
//         {/* Collect the nav links, forms, and other content for toggling */}
//         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
//           <ul className="nav navbar-nav navbar-right">
//             <li><NavLink 
//               exact
//               to="/" 
//               activeStyle={{
//                 fontWeight: 'bold',
//                 color: 'white'
//               }}
//             >Home</NavLink></li>

//             <li><NavLink 
//               to="/saved"
//               activeStyle={{
//                 fontWeight: 'bold',
//                 color: 'white'
//               }}
//             >Saved</NavLink></li>
//           </ul>
//         </div>{/* /.navbar-collapse */}
//       </div>{/* /.container-fluid */}
//     </nav>
//   );
// };
const Nav = () => {
    return (   
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="navbar-brand" href="/">LettuceEat</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style={{}}>
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">About Us</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Statistics</a>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-link text-white btn-sm my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#modal-signup">Sign-Up</button>
                    <button className="btn btn-link text-white btn-sm my-2 my-sm-0" type="submit">Sign-In</button>
                    
                    <ModalSignUp/>
                    
                </form>
            </div>
        </nav>
    );
};

export default Nav;
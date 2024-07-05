import React, { useContext } from 'react'
import '../CSS/Navbar.css'
import logo from "../Images/download.png"
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { mycontx } from './Context';

const Navbar = () => {
  const {logUser, setLogUser}=useContext(mycontx)
  const handleLogout = () => {
    setLogUser({ email: '' });  // Clear the user email to log out
  };

  return (
    <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
      <a className="navbar-brand" > <img src={logo} alt='logo'/><b> E-Blood Bank</b> </a>
      </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
       
        <form className="d-flex">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <a className="nav-link active" aria-current="page"  style={{marginRight: "30px"}} >Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/about'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <a className="nav-link" href="#" style={{color:"black"}} ><b>About us </b></a>
            </Link>

            </li>
            {/* <li className="nav-item">
            <button className="donate-now-btn">
            Donate Now
          </button>
            </li> */}
            <li className="nav-item3 dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color: "black"}}><b>
              <FaUser />
</b>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {
                      logUser.email ? (
                        <li><a onClick={handleLogout} className='dropdown-item'>Logout</a></li>
                      ) : (
                        <>
                          <li><Link to={'/Login'} className='dropdown-item'>Login</Link></li>
                          <li><Link to={'/Register'} className='dropdown-item'>Signup</Link></li>
                        </>
                      )
                    }
                  </ul>
                </li>
              </ul>
          </form>
        </div>
      </div>
      </nav>
    </div>
  )
}

export default Navbar
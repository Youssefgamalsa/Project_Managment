import React, { useContext } from 'react'
import logo from '../../../../assets/images/nav-logo.png';
import { AuthContext } from '../../../../context/AuthContext'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import avatar from '../../../../assets/images/avatar.png'


export default function NavBar() {
  let { userData } = useContext(AuthContext)
  const navigate = useNavigate();


  const handleLogout = () => {        
    toast.success("Log Out Success");

    navigate('/login');

    localStorage.removeItem('token');
    clearLoginData();

  };


  return <>
  
  <nav className="navbar navbar-expand-lg navbar-brand bg-light border-bottom edit">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center justify-content-between w-100  ">
         <img src={logo}/>
    <Dropdown>
    <i className="fa-solid mx-3 icon fa-bell"></i>
    <span className='border'></span>
    <img className='mx-2 ms-3' src={avatar}/>

      <Dropdown.Toggle className='bg-white border-0 text-dark ' id="dropdown-basic">
      <span className="d-flex">{userData?.userName}  
      </span>
      <span className="text-black-50">{userData?.userEmail}</span>

      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >
        <h5 className=' hover'  onClick={handleLogout}> LogOut <i className="fa-solid fa-right-from-bracket mx-2"></i></h5>

        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </ul>
    </div>
  </div>
</nav>

  </>
}





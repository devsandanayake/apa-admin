import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authAction';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaInbox,
  FaGavel,
  FaUsers,
  FaSignOutAlt,
  FaSignInAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import './SideNavBar.scss'

export default function SideNavbar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [inquiryCount, setInquiryCount] = useState(0);
  const [showAuctionSubItems, setShowAuctionSubItems] = useState(false);
  const [showinqurySubItems, setShowinqurySubItems] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const fetchInquiryCount = () => {
    const count = localStorage.getItem('inqueryCount') || 0;
    setInquiryCount(count);
  };


  useEffect(() => {
    fetchInquiryCount();
    const interval = setInterval(fetchInquiryCount, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleAuctionSubItems = () => {
    setShowAuctionSubItems(!showAuctionSubItems);
    
  };
  const toggleAuctionSubItems1 = () => {
    setShowinqurySubItems(!showinqurySubItems);
  };

  return (
      <aside id="sidebar" className={`sidebar`}>

        <ul className="sidebar-nav" id="sidebar-nav">
        {
        auth.isAuthenticated && (
          <>
          <a
            className="nav-link nav-profile d-flex align-items-center pe-0 mt-2 mb-3"
            href="#"
            data-bs-toggle="dropdown"
          >
            <img src="/assets/img/profile-img.jpg" alt="Profile" className="rounded-circle dashboard-profile-icon" />
            <span className="d-none d-md-block ps-2 admin-title">
              Admin Pannel &nbsp;
              <i className="bi bi-bookmark-check-fill check"></i>
            </span>
           
          </a>
          <hr className='hr-tag'/>
          </>
        )
      }
          {
            !auth.isAuthenticated && <li className="nav-item">
                <a className="nav-link " href="index.html">
                  <i className="bi bi-grid"></i>
                  <span>Home</span>
                </a>
              </li>
          }
          {
              auth.isAuthenticated && <>
                <li className="nav-item">
                  <a onClick={() => window.location = '/'} className="nav-link ">
                    <i className="bi bi-grid"></i>
                    <span>Home</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                    <i className="bi bi-chat-left-quote"></i><span>Inquiries Management</span><i className="bi bi-chevron-down ms-auto"></i>
                  </a>
                  <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                      <Link
                          className="flex items-center"
                          to="/acInquery">
                        <i className="bi bi-hammer"></i><span>Auction</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                          className="flex items-center"
                          to="/LrentInquiry">
                        <i className="bi bi-calendar4-week"></i><span>Long Term Rent</span>
                       
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                    <i className="bi bi-calendar-plus"></i><span>Rent Management</span><i className="bi bi-chevron-down ms-auto"></i>
                  </a>
                  <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                      <Link
                          className="flex items-center"
                          to="/shortRent/view">
                        <i className="bi bi-calendar-range"></i><span>Short Term Rent</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                          className="flex items-center"
                          to="/rentInquiry/sub2">
                        <i className="bi bi-calendar4-week"></i><span>Long Term Rent</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="nav-link collapsed" to="/userProfiles">
                    <i class="bi bi-people"></i>
                    <span>Users Management</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link collapsed">
                    <i className="bi bi-grid"></i>
                    <span>Logout</span>
                  </a>
                </li>

              </>
          }
        </ul>
      </aside>
  );
}

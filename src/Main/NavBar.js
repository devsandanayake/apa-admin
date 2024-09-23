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
  FaUserCircle,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

export default function Sidebar() {
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
    <div className="h-screen flex flex-col bg-gray-800 text-white w-64 fixed z-20">
      <div className="p-4 text-lg font-bold flex items-center">
        <span className="mt-2">Admin Panel</span>
        <div className="ml-14">
          <img
            src={auth.user.profilePicture || 'https://th.bing.com/th/id/OIP.OdQQJxf0UFikV_SreFYyoQAAAA?rs=1&pid=ImgDetMain'}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-4 font-sans">
        {!auth.isAuthenticated && (
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 hover:scale-105 transform transition duration-300 flex items-center"
            onClick={() => { window.location = '/login'; }}
          >
            <FaSignInAlt className="mr-2" />
            Login
          </button>
        )}
        {auth.isAuthenticated && (
          <>
            <button
              className="hover:text-gray-300 hover:scale-105 transform transition duration-300 flex items-center"
              onClick={() => window.location = '/'}
            >
              <FaHome className="mr-2" />
              Home
            </button>
            <Link
              className="hover:text-gray-300 hover:scale-105 transform transition duration-300 relative flex items-center"
              to="/acInquery"
            >
              <FaInbox className="mr-2" />
              Auction Inquiries
              {inquiryCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {inquiryCount}
                </span>
              )}
            </Link>
             
            <button
              className="hover:text-gray-300 hover:scale-105 transform transition duration-300 flex items-center"
              onClick={toggleAuctionSubItems1}
            >
               <FaInbox className="mr-2" />
               Inquiries Management
              {showinqurySubItems ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
              {localStorage.getItem('pendingLRCount') > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1  bg-red-600 rounded-full">
                    </span>
                  )}
            </button>
            {showinqurySubItems && (
              <div className="ml-6 space-y-2">
                
                <Link
                  className="hover:text-gray-300 hover:scale-105 transform transition duration-300 flex items-center"
                  to="/LrentInquiry"
                >
                  Long Term Rent Inquiry
                  {localStorage.getItem('LRpendingCount') > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {localStorage.getItem('LRpendingCount')}
                    </span>
                  )}
                </Link>
              </div>
            )}





            <button
              className="hover:text-gray-300 hover:scale-105 transform transition duration-300 flex items-center"
              onClick={toggleAuctionSubItems}
            >
              <FaGavel className="mr-2" />
              Rent Management
              {showAuctionSubItems ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
              {localStorage.getItem('pendingLRCount') > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1  bg-red-600 rounded-full">
                    </span>
                  )}
            </button>
            {showAuctionSubItems && (
              <div className="ml-6 space-y-2">
                <Link
                  className="hover:text-gray-300 hover:scale-105 transform transition duration-300 flex items-center"
                  to="/auction/sub1"
                >
                  Short Term Rent
                </Link>
                <Link
                  className="hover:text-gray-300 hover:scale-105 transform transition duration-300 flex items-center"
                  to="/rentInquiry/sub2"
                >
                  Long Term Rent 
                  {localStorage.getItem('pendingLRCount') > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {localStorage.getItem('pendingLRCount')}
                    </span>
                  )}
                </Link>
              </div>
            )}
            <Link
              className="hover:text-gray-300 hover:scale-105 transform transition duration-300 flex items-center"
              to="/userProfiles"
            >
              <FaUsers className="mr-2" />
              User Management
            </Link>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 hover:scale-105 transform transition duration-300 flex items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </>
        )}
      </div>
      <p className="text-center text-lg font-semibold text-gray-500 mt-4">
        Effective Solutions Pvt
      </p>
    </div>
  );
}

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import HomePage from './Components/Home';
import AboutPage from './Components/AboutPage';
import LoginPage from './Components/Login';
import InqueryPage from './Components/acInqueryPage';
import AuctionPage from './Components/auctionPage'
import ViewInqueries from './Components/Inquery/Inquery';
import UserProfiles from './Components/UserM/userProfiles';
import UserAds from './Components/UserM/userAds';
import Adspage from './Components/AdsPage/Adspage';
import Dashboard from './Components/Dashboard/Dashboard';
import Lrent from './Components/LongRent/Lrent';
import ViewModel from './Components/LongRent/ViewModel';
import LRinquery from './Components/LongRent/LRinquery';
import Charges from './Components/LongRent/Charges';
import Setting from './Components/Setting';
import AuctionRegUser from './Components/AuctionRegUser';
import Calander from './Components/CalanderView/Calander';
import Srent from './Components/ShortRent/Srent';
import ShortViewModel from './Components/ShortRent/ViewModel';
import UserProfile from './Components/UserM/User'
 


function App() {
  const authState = useSelector(state => state.auth);

  if(!authState.isAuthenticated){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/acInquery" element={<InqueryPage />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/inquery/:auctionID" element={<ViewInqueries />} />
        <Route path="/userProfiles" element={<UserProfiles />} />
        <Route path="/userAds/:username" element={<UserAds />} />
        <Route path="/adsPage/view/:adCode" element={<Adspage />} />
        <Route path="/rentInquiry/sub2" element={<Lrent />} />
        <Route path="/shortRent/view" element={<Srent />} />
        <Route path="/viewLongrent/:adCode" element={<ViewModel/>} />
        <Route path="/viewShortrent/:adCode" element={<ShortViewModel/>} />
        <Route path="/LrentInquiry" element={<LRinquery />} />
        <Route path="/charges/:adCode" element={<Charges />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/auctionRegUser/:auctionID" element={<AuctionRegUser />} />
        <Route path="/calander/:adCode" element={<Calander />} />
        <Route path='/userDetails/:username' element={<UserProfile />} />
      </Routes>
      </Layout>
    </Router>
    
  );
}

export default App;

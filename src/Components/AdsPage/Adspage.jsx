import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataSpecific } from '../../actions/postAction';
import { approvelPost } from '../../actions/approvelAction';
import { Pannellum } from 'pannellum-react';
import { TfiAngleDoubleRight } from "react-icons/tfi";
import { FaEdit } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { BiGridSmall } from "react-icons/bi";
import AllPhotosPopup from './AllPhotoPopup';
import './style.css';

export default function Adspage() {
  const { adCode } = useParams();
  const dispatch = useDispatch();
  const postState = useSelector(state => state.data);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPannellumReady, setIsPannellumReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDataSpecific(adCode));
  }, [dispatch, adCode]);

  useEffect(() => {
    if (postState.data && postState.data.images && postState.data.images.length > 0) {
      setSelectedImage(postState.data.images[0]);
      setIsPannellumReady(true);
    }
  }, [postState.data]);

  const isEquirectangular = (image) => {
    return image.includes('360');
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setSelectedImage(postState.data.images[index]);
  };

  const handleSeeMore = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Advertisement Details</h1>
      
      {postState.loading && <p className="text-blue-600 text-center">Loading...</p>}
      {postState.error && <p className="text-red-600 text-center">{postState.error}</p>}
       
        {/* user Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className='flex items-center gap-4'>
          <TfiAngleDoubleRight className='text-blue-500 text-2xl'/>
          <p className="font-semibold text-xl">Published Details</p>
        </div>
        <div className="ml-9 mt-4 space-y-2">
                   <p className="text-gray-600"><strong>Published By:</strong> <a href={`/userDetails/${postState.data.username}`}>{postState.data.username}</a></p>
          <p className="text-gray-600"><strong>Published Date:</strong> {postState.data.publishedAt}</p>
        </div>
      </div>
      
      {/* Title Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className='flex items-center gap-4'>
          <TfiAngleDoubleRight className='text-blue-500 text-2xl'/>
          <p className="font-semibold text-xl">Title</p>
          <button className='ml-auto text-red-500 hover:text-red-700 transition'>
            <FaEdit size={20}/>
          </button>
        </div>
        <div className="ml-9 mt-4 space-y-2">
          <p className="text-gray-600">{postState.data.title}</p>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center gap-4">
          <IoLocation className="text-blue-500 text-2xl"/>
          <p className="font-semibold text-xl">Location Details</p>
        </div>
        <div className="ml-9 mt-4 space-y-2">
          <p className="text-gray-600">{postState.data.districts}</p>
          <p className="text-gray-600">{postState.data.areas}</p>
          <p className="text-gray-600">{postState.data.address?.street}</p>
          <p className="text-gray-600">{postState.data.address?.postCode}</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center gap-4">
          <TfiAngleDoubleRight className="text-blue-500 text-2xl"/>
          <p className="font-semibold text-xl">Description</p>
        </div>
        <div className="ml-9 mt-4">
          <p className="text-gray-600">{postState.data.description}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white p-6 rounded-lg shadow-lg">
        
        {/* General Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <TfiAngleDoubleRight className="text-blue-500 text-2xl"/>
            <p className="font-semibold text-xl">Details</p>
          </div>
          <p className="text-gray-600"><strong>Price:</strong> {postState.data.currency} {postState.data.price}</p>
          <p className="text-gray-600"><strong>Bedroom Count:</strong> {postState.data.bedroomCount}</p>
          <p className="text-gray-600"><strong>Bathroom Count:</strong> {postState.data.bathroomCount}</p>
          <p className="text-gray-600"><strong>Area Size:</strong> {postState.data.areaSize} sq ft</p>
          <p className="text-gray-600"><strong>Floor:</strong> {postState.data.floor}</p>
          <p className="text-gray-600"><strong>Park Space:</strong> {postState.data.parkSpace}</p>
        </div>

        {/* Key Features */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <TfiAngleDoubleRight className="text-blue-500 text-2xl"/>
            <p className="font-semibold text-xl">Key Features</p>
          </div>
          {postState.data.keyFeatures?.map((keyFeature, index) => (
            <p key={index} className="text-gray-600 flex items-center gap-2">
              <BiGridSmall className="text-xl"/> {keyFeature}
            </p>
          ))}
        </div>

        {/* Exclusive Amenities */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <TfiAngleDoubleRight className="text-blue-500 text-2xl"/>
            <p className="font-semibold text-xl">Exclusive Amenities</p>
          </div>
          {postState.data.ExclusiveAmenities?.map((amenity, index) => (
            <p key={index} className="text-gray-600 flex items-center gap-2">
              <BiGridSmall className="text-xl"/> {amenity}
            </p>
          ))}
        </div>

        {/* Community Perks */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <TfiAngleDoubleRight className="text-blue-500 text-2xl"/>
            <p className="font-semibold text-xl">Community Perks</p>
          </div>
          {postState.data.CommunityPerks?.map((perk, index) => (
            <p key={index} className="text-gray-600 flex items-center gap-2">
              <BiGridSmall className="text-xl"/> {perk}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white p-6 rounded-lg shadow-lg mt-4">

        {/* features*/}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <TfiAngleDoubleRight className="text-blue-500 text-2xl"/>
            <p className="font-semibold text-xl">features</p>
          </div>
          <div className='flex-wrap'>
          {postState.data.features?.map((features, index) => (
            <p key={index} className="text-gray-600 flex items-center gap-2">
              <BiGridSmall className="text-xl"/> {features}
            </p>
          ))} 
          </div>
         
        </div>

       
      </div>



       {/* Auction Details Section */}
       {postState.data.transactionType === 4 && postState.data.auctionStatus?.status && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <div className="flex items-center gap-4">
            <TfiAngleDoubleRight className="text-blue-500 text-2xl"/>
            <p className="font-semibold text-xl">Auction Details</p>
          </div>
          <div className="ml-9 mt-4 space-y-2">
            <p className="text-gray-600"><strong>Auction ID:</strong> {postState.data.auctionStatus.auctionID}</p>
            <p className="text-gray-600"><strong>Start Price:</strong> {postState.data.currency} {postState.data.auctionStatus.startPrice}</p>
            <p className="text-gray-600"><strong>Bid Value:</strong> {postState.data.currency} {postState.data.auctionStatus.BidValue}</p>
            <p className="text-gray-600"><strong>Current Rate:</strong> {postState.data.currency} {postState.data.auctionStatus.currentRate}</p>
            <p className="text-gray-600"><strong>Max Rate:</strong> {postState.data.currency} {postState.data.auctionStatus.maxRate}</p>
            <p className="text-gray-600"><strong>Start Date:</strong> {postState.data.auctionStatus.startDate}</p>
            <p className="text-gray-600"><strong>Start Time:</strong> {postState.data.auctionStatus.startTime}</p>
            <p className="text-gray-600"><strong>End Date:</strong> {postState.data.auctionStatus.endDate}</p>
            <p className="text-gray-600"><strong>End Time:</strong> {postState.data.auctionStatus.endTime}</p>
          </div>
        </div>
      )}

      {/* Main Image Container */}
      <div className="main-image-container mt-8">
        {selectedImage && isPannellumReady && (
          isEquirectangular(selectedImage) ? (
            <Pannellum
              width="100%"
              height="500px"
              image={`http://124.43.179.118:8081/uploads/${selectedImage.split('\\').pop()}`}
              pitch={10}
              yaw={180}
              hfov={110}
              autoLoad
            />
          ) : (
            <img
              src={`http://124.43.179.118:8081/uploads/${selectedImage.split('\\').pop()}`}
              alt="Selected"
              className="large-image w-full h-96 object-cover rounded-lg shadow-md"
            />
          )
        )}
      </div>

      {/* Thumbnail Images Container */}
      <div className="thumbnail-images-container mt-8 flex gap-4">
        {postState.data.images && postState.data.images.slice(0, 3).map((image, index) => (
          <img
            key={index}
            src={`http://124.43.179.118:8081/uploads/${image.split('\\').pop()}`}
            alt={`Thumbnail ${index}`}
            className={`thumbnail cursor-pointer w-32 h-32 object-cover rounded-lg shadow-md ${currentIndex === index ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleImageClick(index)}
          />
        ))}
        {postState.data.images && postState.data.images.length > 3 && (
          <button
            className="see-more-button text-blue-500 hover:text-blue-700 transition"
            onClick={handleSeeMore}
          >
            All Photos
          </button>
        )}
      </div>

      {/* Popup Overlay */}
      {isPopupOpen && (
        <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AllPhotosPopup
            images={postState.data.images || []}
            isOpen={isPopupOpen}
            onClose={closePopup}
          />
        </div>
      )}


    </div>
  );
}
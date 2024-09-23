import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../actions/postAction';
import { approvelPost } from '../actions/approvelAction';
import { FaHome, FaBuilding, FaExchangeAlt, FaGavel, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaCheck, FaTimes } from 'react-icons/fa';
import { Table, Button, Badge } from 'antd';
import { FaCalendarAlt } from "react-icons/fa";

const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data);
  const updateSucess = useSelector((state) => state.approvel);
  const [activeTab, setActiveTab] = useState('pending');
  const [transactionType, setTractionType] = useState(1); // 1: Rent, 2: Short Term Rent, 3: Auction

  console.log(updateSucess);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, updateSucess]);

  const pendingCount = dataState.data.filter((post) => post.status === 0 && parseInt(post.transactionType) === 1).length;

  const handleApproval = (adCode, status) => {
      const isConfirmed = window.confirm('Are you sure you want to update the status?');
      if (isConfirmed) {
          dispatch(approvelPost(adCode, status));
      }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`text-sm ${status === 1 ? 'text-green-500' : status === 2 ? 'text-red-500' : 'text-yellow-500'}`}>
          {status === 1 ? 'Approved' : status === 2 ? 'Rejected' : 'Pending'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          {activeTab !== 'approved' && (
            <Button
              type="primary"
              icon={<FaCheck />}
              onClick={(e) => {
                e.stopPropagation();
                handleApproval(record.adCode, 1);
              }}
            >
              Approve
            </Button>
          )}
           {activeTab !== 'rejected' && (
          <Button
            type="danger"
            icon={<FaTimes />}
            onClick={(e) => {
              e.stopPropagation();
              handleApproval(record.adCode, 2);
            }}
          >
            Reject
          </Button>
    )}
    {transactionType === 2 && (
      <Button
        type="primary"
        onClick={(e) => {
          e.stopPropagation();
          window.location = `/calander/${record.adCode}`;
        }}
      >
        <FaCalendarAlt />
      </Button>
    )}
        </div>
      ),
    },
  ];

  const dataSource = dataState.data
    .filter((post) => post.status === (activeTab === 'pending' ? 0 : activeTab === 'approved' ? 1 : 2) && parseInt(post.transactionType) === transactionType)
    .map((post, index) => ({
      key: index,
      title: post.title,
      status: post.status,
      adCode: post.adCode,
    }));

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className='text-2xl font-semibold'>Advertisement</h1>
      <p className='mb-2 text-gray-600 cursor-pointer'>Home / Advertisement</p>
      <button onClick={()=>{
        window.location = '/settings';
      }}>Settings</button>
      {dataState.loading && <p className="text-blue-600">Loading...</p>}
      {dataState.error && <p className="text-red-600">Error: {dataState.error}</p>}

      <div className="flex space-x-4 mb-4">
        <Button
          type={transactionType === 1 ? 'primary' : 'default'}
          icon={<FaHome />}
          onClick={() => setTractionType(1)}
        >
          Short Term Rent
        </Button>
        <Button
          type={transactionType === 2 ? 'primary' : 'default'}
          icon={<FaBuilding />}
          onClick={() => setTractionType(2)}
        >
          Long Term Rent
        </Button>
        <Button
          type={transactionType === 3 ? 'primary' : 'default'}
          icon={<FaExchangeAlt />}
          onClick={() => setTractionType(3)}
        >
          Short Term/Long Term
        </Button>
        <Button
          type={transactionType === 4 ? 'primary' : 'default'}
          icon={<FaGavel />}
          onClick={() => setTractionType(4)}
        >
          Auction
        </Button>
      </div>

      <div className="flex space-x-4 mb-4">
        <Button
          type={activeTab === 'pending' ? 'primary' : 'default'}
          icon={<FaHourglassHalf />}
          onClick={() => setActiveTab('pending')}
        >
          Pending
          {pendingCount > 0 && <Badge count={pendingCount} style={{ backgroundColor: '#f5222d' }} />}
        </Button>
        <Button
          type={activeTab === 'approved' ? 'primary' : 'default'}
          icon={<FaCheckCircle />}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </Button>
        <Button
          type={activeTab === 'rejected' ? 'primary' : 'default'}
          icon={<FaTimesCircle />}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected
        </Button>
      </div>

      <Table
        className='cursor-pointer'
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            window.location = `/adsPage/view/${record.adCode}`;
          },
        })}
      />
    </div>
  );
};

export default App;
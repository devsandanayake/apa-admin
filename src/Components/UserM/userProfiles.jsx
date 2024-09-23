import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/userAction';
import { Table, Button, Tabs, Tag } from 'antd';

const { TabPane } = Tabs;

export default function UserProfiles() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('user');

  const fetchUser = () => {
    dispatch(getUser());
  };

  React.useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'volcano' : 'geekblue'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <div className="flex space-x-2">
          {activeTab === 'user' && (
            <>
              <Button
                type="primary"
                onClick={() => window.location = `/userAds/${user.username}`}
              >
                View Advertisements
              </Button>
              <Button
                type="default"
                onClick={() => window.location = `/userAuctions/${user.username}`}
              >
                View Auction Details
              </Button>
              <Button
                type="danger"
                onClick={() => window.location = `/userInquiries/${user.username}`}
              >
                View Inquiry
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const filteredData = userState.data.filter((user) => 
    activeTab === 'user' ? user.role !== 'admin' : user.role === 'admin'
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profiles</h1>
      <Tabs defaultActiveKey="user" onChange={handleTabChange} centered>
        <TabPane tab="Registered Users" key="user" />
        <TabPane tab="Admin Accounts" key="admin" />
      </Tabs>
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="username"
        pagination={false}
      />
    </div>
  );
}
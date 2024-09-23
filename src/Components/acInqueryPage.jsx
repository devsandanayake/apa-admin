import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInquery, replyInquery } from '../actions/inqueryAction';
import { Table, Button, Input, Badge } from 'antd';

export default function AcInqueryPage() {
  const dispatch = useDispatch();
  const inqueryState = useSelector(state => state.inquery);
  const [replyMessages, setReplyMessages] = useState({});
  const [activeTab, setActiveTab] = useState('Pending');
  const [inquiryCount, setInquiryCount] = useState(0);

  const fetchInquiryCount = () => {
    // Simulate an API call or get from localStorage
    const count = localStorage.getItem('inqueryCount') || 0;
    setInquiryCount(count);
  };

  useEffect(() => {
    fetchInquiryCount();
    dispatch(getInquery());
    const interval = setInterval(() => {
      fetchInquiryCount();
      dispatch(getInquery());
    }, 1000); // Update every 1 second
  
    return () => clearInterval(interval); 
  }, [dispatch]);

  const handleReply = (inqueryID, replyMessage) => {
    dispatch(replyInquery(inqueryID, replyMessage));
    setReplyMessages(prevState => ({
      ...prevState,
      [inqueryID]: '',
    }));
  };

  const handleInputChange = (inqueryID, value) => {
    setReplyMessages(prevState => ({
      ...prevState,
      [inqueryID]: value,
    }));
  };

  if (inqueryState.error) {
    return <p>Error: {inqueryState.error}</p>;
  }

  const columns = [
    {
      title: 'Inquiry ID',
      dataIndex: 'inqueryID',
      key: 'inqueryID',
    },
    {
      title: 'Auction ID',
      dataIndex: 'auctionID',
      key: 'auctionID',
    },
    {
      title:'first name',
      dataIndex:'firstName',
      key:'firstName',
    },
    {
      title:'last name',
      dataIndex:'lastName',
      key:'lastName',
    },
    {
      title:'email',
      dataIndex:'email',
      key:'email',
  
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Reply Status',
      dataIndex: 'replyStatus',
      key: 'replyStatus',
      render: (text) => (
        <Badge
          count={text}
          style={{ backgroundColor: text === 'Pending' ? '#f5222d' : '#52c41a' }}
        />
      ),
    },
    {
      title: 'Reply Message',
      key: 'replyMessage',
      render: (_, record) => (
        record.replyStatus === 'Pending' ? (
          <form onSubmit={(e) => { e.preventDefault(); handleReply(record.inqueryID, replyMessages[record.inqueryID]); }}>
            <Input
              type="text"
              name="replyMessage"
              value={replyMessages[record.inqueryID] || ''}
              onChange={(e) => handleInputChange(record.inqueryID, e.target.value)}
              placeholder="Type your reply here"
              required
            />
            <Button
              type="primary"
              htmlType="submit"
              className="mt-2"
            >
              Send
            </Button>
          </form>
        ) : (
          <p>{record.reply}</p>
        )
      ),
    },
  ];

  const dataSource = Array.isArray(inqueryState.data) ? inqueryState.data
    .filter(inquery => inquery.replyStatus === activeTab)
    .map((inquery, index) => ({
      key: index,
      inqueryID: inquery.inqueryID,
      auctionID: inquery.auctionID,
      firstName: inquery.firstName,
      lastName: inquery.lastName,
      email: inquery.email,
      message: inquery.message,
      number: inquery.number,
      replyStatus: inquery.replyStatus,
      reply: inquery.reply,
    })) : [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Inquiry</h1>
      <p className="text-gray-600 cursor-pointer">
        Home / <span className="cursor-pointer">Inquiry</span>
      </p>
      <div className="mt-4">
        <Button
          type={activeTab === 'Pending' ? 'primary' : 'default'}
          onClick={() => setActiveTab('Pending')}
          className="mr-4"
        >
          Pending
          {inquiryCount > 0 && (
            <span className="absolute -mt-9 ml-12 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {inquiryCount}
            </span>
          )}
        </Button>
        <Button
          type={activeTab === 'Replied' ? 'primary' : 'default'}
          onClick={() => setActiveTab('Replied')}
        >
          Replied
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
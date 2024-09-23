import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewInqueries, replyInquery } from '../../actions/inqueryAction';
import { Table, Button, Tabs, Tag, Input, Form, Spin, Alert } from 'antd';

const { TabPane } = Tabs;

export default function AcInqueryPage() {
  const dispatch = useDispatch();
  const inqueryState = useSelector(state => state.inquery);
  const [replyMessages, setReplyMessages] = useState({});
  const [activeTab, setActiveTab] = useState('Pending');
  const { auctionID } = useParams();
   
  useEffect(() => {
    if (auctionID) {
      dispatch(viewInqueries(auctionID));
    }
  }, [dispatch, auctionID]);

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

  if (inqueryState.loading) {
    return <Spin tip="Loading..." />;
  }

  if (inqueryState.error) {
    return <Alert message="Error" description={inqueryState.error} type="error" showIcon />;
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
      render: (replyStatus) => (
        <Tag color={replyStatus === 'Pending' ? 'red' : 'green'}>
          {replyStatus}
        </Tag>
      ),
    },
    {
      title: 'Reply Message',
      key: 'replyMessage',
      render: (_, inquery) => (
        inquery.replyStatus === 'Pending' ? (
          <Form
            onFinish={() => handleReply(inquery.inqueryID, replyMessages[inquery.inqueryID])}
          >
            <Form.Item>
              <Input
                type="text"
                value={replyMessages[inquery.inqueryID] || ''}
                onChange={(e) => handleInputChange(inquery.inqueryID, e.target.value)}
                placeholder="Type your reply here"
                required
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <p>{inquery.reply}</p>
        )
      ),
    },
  ];

  const filteredData = inqueryState.data.filter(inquery => inquery.replyStatus === activeTab);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Inquiries</h1>
      <Tabs defaultActiveKey="Pending" onChange={setActiveTab} centered>
        <TabPane tab="Pending" key="Pending" />
        <TabPane tab="Replied" key="Replied" />
      </Tabs>
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="inqueryID"
        pagination={false}
      />
    </div>
  );
}
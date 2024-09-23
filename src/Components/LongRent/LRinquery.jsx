import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Select, Input, Tabs } from 'antd';
import { getLongrentInquery, updateInqueryStatus } from '../../actions/LRentInquery';

const { Option } = Select;
const { TabPane } = Tabs;

const AlertPopup = ({ message, onClose }) => (
  <Modal
    visible={!!message}
    onCancel={onClose}
    footer={[
      <Button key="close" type="primary" onClick={onClose}>
        Close
      </Button>
    ]}
  >
    <p>{message}</p>
  </Modal>
);

export default function LRinquery() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.LRentInquery);
  const [selectedAlertMsg, setSelectedAlertMsg] = useState(null);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [currentInqueryID, setCurrentInqueryID] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Pending');

  React.useEffect(() => {
    dispatch(getLongrentInquery());
  }, [dispatch]);

  const handleViewAlertMsg = (msg) => {
    setSelectedAlertMsg(msg);
  };

  const handleClosePopup = () => {
    setSelectedAlertMsg(null);
  };

  const handleStatusChange = (inqueryID, status) => {
    if (status === 'Rejected') {
      setCurrentInqueryID(inqueryID);
      setIsRejectModalVisible(true);
    } else {
      dispatch(updateInqueryStatus(inqueryID, status, ''));
    }
  };

  const handleRejectSubmit = () => {
    dispatch(updateInqueryStatus(currentInqueryID, 'Rejected', replyMessage));
    setIsRejectModalVisible(false);
    setReplyMessage('');
  };

  const handleRejectCancel = () => {
    setIsRejectModalVisible(false);
    setReplyMessage('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
    { 
      title: 'Ads Code', 
      dataIndex: 'adCode', 
      key: 'adCode',
      render: (text) => <a href='/wd'>{text}</a> 
    },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    { title: 'Inquery ID', dataIndex: 'inqueryID', key: 'inqueryID' },
    { 
      title: 'Username', 
      dataIndex: 'username', 
      key: 'username',
      render: (text, record) => <a href={`/userDetails/${record.username}`}>{text}</a> 
    },
    { title: 'Preferred Date', dataIndex: 'preferredDate', key: 'preferredDate' },
    { title: 'Preferred Time', dataIndex: 'preferredTime', key: 'preferredTime' },
    { title: 'Alternate Date', dataIndex: 'alternateDate', key: 'alternateDate' },
    { title: 'Alternate Time', dataIndex: 'alternateTime', key: 'alternateTime' },
    {
      title: 'Reply Status',
      dataIndex: 'replyStatus',
      key: 'replyStatus',
      render: (text) => {
        let color;
        switch (text) {
          case 'Pending':
            color = 'text-blue-500';
            break;
          case 'Rejected':
            color = 'text-red-500';
            break;
          case 'AssignAgent':
            color = 'text-orange-500';
            break;
          case 'Completed':
            color = 'text-green-500';
            break;
          default:
            color = 'text-gray-500';
        }
        return <span className={color}>{text}</span>;
      },
    },
    {
      title: 'Update Status',
      dataIndex: 'inqueryID',
      key: 'updateStatus',
      render: (inqueryID) => (
        <Select
          defaultValue="Pending"
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(inqueryID, value)}
        >
          <Option value='Pending'>Pending</Option>
          <Option value='AssignAgent'>Assign Agent</Option>
          <Option value='Completed'>Completed</Option>
          <Option value='Rejected'>Rejected</Option>
        </Select>
      ),
    },
    {
      title: 'Alert Message',
      dataIndex: 'alertMsg',
      key: 'alertMsg',
      render: (text) => (
        text ? (
          <Button type="link" onClick={() => handleViewAlertMsg(text)}>
            View
          </Button>
        ) : (
          'N/A'
        )
      ),
    }
  ];

  const filteredData = data.filter(inquery => inquery.replyStatus === activeTab);

  return (
    <div className="p-6">
      <Tabs defaultActiveKey="Pending" onChange={setActiveTab} centered>
        <TabPane tab="Pending" key="Pending" />
        <TabPane tab="Rejected" key="Rejected" />
        <TabPane tab="Assign Agent" key="AssignAgent" />
        <TabPane tab="Completed" key="Completed" />
      </Tabs>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="inqueryID"
        loading={loading}
        pagination={false}
      />

      <AlertPopup message={selectedAlertMsg} onClose={handleClosePopup} />

      <Modal
        title="Reject Inquery"
        visible={isRejectModalVisible}
        onCancel={handleRejectCancel}
        onOk={handleRejectSubmit}
        okText="Submit"
      >
        <Input.TextArea
          rows={4}
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          placeholder="Enter reply message"
        />
      </Modal>
    </div>
  );
}
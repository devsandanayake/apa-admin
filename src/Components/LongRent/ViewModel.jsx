import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewEachLongrent, updateStatus } from '../../actions/longrentAction';
import { useParams } from 'react-router-dom';
import { Table, Select, Input, Button, Spin, Alert, Tabs ,Tag} from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;

const ViewModel = React.memo(() => {
  const { adCode } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.longrent);

  const [formDataArray, setFormDataArray] = useState([]);

  useEffect(() => {
    dispatch(viewEachLongrent(adCode));
  }, [dispatch, adCode]);

  useEffect(() => {
    if (data && data.length > 0) {
      const initialFormDataArray = data.map(item => ({
        adminKeyStatus: item.adminKeyStatus,
        advancePayment: item.advancePayment || '',
        username: item.username,
        _id: item._id
      }));
      setFormDataArray(initialFormDataArray);
    }
  }, [data]);

  const handleInputChange = (value, name, id) => {
    setFormDataArray(prevState =>
      prevState.map(item =>
        item._id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSubmit = (id) => {
    const formData = formDataArray.find(item => item._id === id);
    if (formData) {
      dispatch(updateStatus(adCode, formData.adminKeyStatus, formData.username, formData.monthlyRate, formData.advancePayment , id));
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <a href={`/userDetails/${record.username}`}>{text}</a> 
    },
    {
      title: 'BookingID',
      dataIndex: 'BookingID',
      key: 'BookingID',
      render: (_, record) => data.find(d => d._id === record._id)?.BookingID

    },
    {
      title: 'Ad Code',
      dataIndex: 'adCode',
      key: 'adCode',
      render: () => adCode
    },
    {
      title: 'Rental Start Date',
      dataIndex: 'rentalStartDate',
      key: 'rentalStartDate',
      render: (_, record) => data.find(d => d._id === record._id)?.rentalStartDate
    },
    {
      title: 'Rental End Date',
      dataIndex: 'rentalEndDate',
      key: 'rentalEndDate',
      render: (_, record) => data.find(d => d._id === record._id)?.rentalEndDate
    },
    {
      title: 'User Message',
      dataIndex: 'userMessage',
      key: 'userMessage',
      render: (_, record) => data.find(d => d._id === record._id)?.userMessage
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (_, record) => data.find(d => d._id === record._id)?.phoneNumber
    },
    {
      title: 'Admin Key Status',
      dataIndex: 'adminKeyStatus',
      key: 'adminKeyStatus',
      render: (_, record) => (
        <Select
          defaultValue={ 'Pending'}
          onChange={(value) => handleInputChange(value, 'adminKeyStatus', record._id)}
        >
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
          <Option value="Pending">Pending</Option>
        </Select>
      )
    },
  {
      title:'Status',
      dataIndex:'adminKeyStatus',
      key:'adminKeyStatus',
      render:(_,record)=>data.find(d=>d._id===record._id)?.adminKeyStatus
  },
    {
      title: 'Advance Payment',
      dataIndex: 'advancePayment',
      key: 'advancePayment',
      render: (_, record) => (
        <Input.Group compact>
          <Input
            style={{ width: '150px', height: '40px' }}
            prefix={<DollarOutlined />}
            type="number"
            value={record.advancePayment || ''}
            onChange={(e) => handleInputChange(e.target.value, 'advancePayment', record._id)}
          />
        </Input.Group>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleSubmit(record._id)} type="primary">
          Update
        </Button>
      )
    },
    {
      title: 'Alert Message',
      dataIndex: 'alertMsg',
      key: 'alertMsg',
      render: (_, record) => {
        const alertMsg = data.find(d => d._id === record._id)?.alertMsg;
        return alertMsg ? (
          <div onClick={() => alert(alertMsg)} className='cursor-pointer'>
          <Tag color="red" className='text-red-500'>
            Warning
          </Tag>
        </div>
        ) : <Tag color="green">NO</Tag>;
      }
    }
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error.message} type="error" />;
  }

  const approvedData = data.filter(item => item.adminKeyStatus === 'Approved');
  const rejectedData = data.filter(item => item.adminKeyStatus === 'Rejected');
  const pendingData = data.filter(item => item.adminKeyStatus === 'Pending');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Long Rent</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Approved" key="1">
          <Table
            dataSource={approvedData}
            columns={columns}
            rowKey="_id"
            pagination={false}
          />
        </TabPane>
        <TabPane tab="Rejected" key="2">
          <Table
            dataSource={rejectedData}
            columns={columns}
            rowKey="_id"
            pagination={false}
          />
        </TabPane>
        <TabPane tab="Pending" key="3">
          <Table
            dataSource={pendingData}
            columns={columns}
            rowKey="_id"
            pagination={false}
          />
        </TabPane>
      </Tabs>
    </div>
  );
});

export default ViewModel;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewEachShortrent } from '../../actions/shortrentAction';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

const ViewModel = React.memo(() => {
  const { adCode } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.shortrent);

  const [formDataArray, setFormDataArray] = useState([]);

  useEffect(() => {
    dispatch(viewEachShortrent(adCode));
  }, [dispatch, adCode]);

  useEffect(() => {
    if (data) {
      setFormDataArray(data);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <a href={`/userDetails/${record.username}`}>{text}</a> 
    },
    {
      title: 'Ad Code',
      dataIndex: 'adCode',
      key: 'adCode',
    },
    {
      title: 'Rental Start Date',
      dataIndex: 'rentalStartDate',
      key: 'rentalStartDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Rental End Date',
      dataIndex: 'rentalEndDate',
      key: 'rentalEndDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
    },
  ];

  return (
    <div>
      <Table dataSource={formDataArray} columns={columns} rowKey="_id" />
    </div>
  );
});

export default ViewModel;
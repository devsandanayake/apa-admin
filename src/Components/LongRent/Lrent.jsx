import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { longrentGet } from '../../actions/longrentAction';
import { fetchData } from '../../actions/postAction';
import { Table, Button, Badge } from 'antd';

export default function Lrent() {
  const dispatch = useDispatch();
  const longrentState = useSelector((state) => state.longrent);
  const postState = useSelector((state) => state.data);

  // Filter only longrent data
  const LongrentData = postState.data.filter((item) => item.transactionType === 2);
  console.log("test", LongrentData);

  const pendingCount = longrentState.data.filter((item) => item.adminKeyStatus === "Pending").length;

  console.log('pending', pendingCount);

  localStorage.setItem('pendingLRCount', pendingCount);

  React.useEffect(() => {
    dispatch(longrentGet());
    dispatch(fetchData());
  }, [dispatch]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Pending Count',
      dataIndex: 'pendingCount',
      key: 'pendingCount',
      render: (text) => (
        <Badge count={text} style={{ backgroundColor: '#f5222d' }} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
          type="primary"
          onClick={() => window.location = `/viewLongrent/${record.adCode}`}
        >
          View
        </Button>

         <Button
         type="secondary"
         onClick={() => window.location = `/charges/${record.adCode}`}
         style={{ marginLeft: '10px' }} // Add some space between buttons
       >
         ChargingRate
       </Button>
        </>
        
      ),
    },
  ];

  const dataSource = LongrentData.map((item) => {
    const pendingCount = longrentState.data.filter(
      (lrItem) => lrItem.adCode === item.adCode && lrItem.adminKeyStatus === "Pending"
    ).length;
    return {
      key: item.id,
      title: item.title,
      pendingCount: pendingCount,
      adCode: item.adCode,
    };
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Long Rent</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </>
  );
}
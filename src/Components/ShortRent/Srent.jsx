import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../actions/postAction';
import { Table, Button, Badge } from 'antd';

export default function Srent() {
  const dispatch = useDispatch();
  const longrentState = useSelector((state) => state.longrent);
  const postState = useSelector((state) => state.data);

  // Filter only longrent data
  const LongrentData = postState.data.filter((item) => item.transactionType === 1);
  console.log("test", LongrentData);

  const pendingCount = longrentState.data.filter((item) => item.adminKeyStatus === "Pending").length;

  console.log('pending', pendingCount);

  localStorage.setItem('pendingLRCount', pendingCount);

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
          type="primary"
          onClick={() => window.location = `/viewShortrent/${record.adCode}`}
        >
          View
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
      <h1 className="text-2xl font-bold mb-4">Short Rent</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </>
  );
}
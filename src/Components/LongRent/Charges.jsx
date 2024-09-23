import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCharging } from '../../actions/ChargingAction';
import { Select, Table, Spin, Alert } from 'antd';

const { Option } = Select;

export default function Charges() {
  const { adCode } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.charging);
  
  const [selectedYear, setSelectedYear] = useState(null);

  React.useEffect(() => {
    dispatch(getCharging(adCode));
  }, [dispatch, adCode]);

  console.log(data);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const selectedPrice = data?.price?.find(price => price.year === parseInt(selectedYear));

  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  const dataSource = selectedPrice?.details.flatMap((detail) =>
    Array.from({ length: detail.endMonth - detail.startMonth + 1 }, (_, i) => ({
      key: `${selectedPrice.year}-${i + detail.startMonth}`,
      month: `${i + detail.startMonth}/${selectedPrice.year}`,
      price: `$${detail.price}`,
    }))
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Charges for {adCode}</h1>

      <div className="mb-4">
        <label htmlFor="yearSelect" className="block text-lg font-medium mb-2">Select Year:</label>
        <Select
          id="yearSelect"
          className="w-full"
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Select a year"
        >
          {data?.price?.map((yearlyPrice) => (
            <Option key={yearlyPrice._id} value={yearlyPrice.year}>
              {yearlyPrice.year}
            </Option>
          ))}
        </Select>
      </div>

      {selectedPrice && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Year: {selectedPrice.year}</h2>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
          />
        </div>
      )}
    </div>
  );
}
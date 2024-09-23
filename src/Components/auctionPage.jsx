import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuction, openForAuction, updateAuction } from '../actions/auctionAction';
import { Row, Col, Form, Input, Button, Spin, Alert, Card, Tag } from 'antd';

export default function AuctionPage() {
  const dispatch = useDispatch();
  const auctionState = useSelector(state => state.auction);
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    dispatch(getAuction());
  }, [dispatch]);

  const handleInputChange = (adCode, field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [adCode]: {
        ...prevFormData[adCode],
        [field]: value,
      }
    }));
  };

  const handleFormSubmit = (adCode) => {
    if (formData[adCode]) {
      const { startDate, startTime,endDate, endTime,startPrice, maxRate, BidValue } = formData[adCode];
      dispatch(updateAuction(adCode, startDate,startTime, endDate,endTime, startPrice, maxRate, BidValue));
    }
  };

  return (
    <div className="p-4">
      <p className='text-2xl font-bold'>Auction</p>
      <p className='text-sm font-extralight'>Overview</p>
      {auctionState.loading && <Spin tip="Loading..." className="text-center" />}
      {auctionState.error && <Alert message="Error" description={auctionState.error} type="error" showIcon className="text-center" />}
      <Row gutter={[16, 16]}>
        {Array.isArray(auctionState.data) && auctionState.data.map((auction, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card title={auction.title} bordered={false}>
              <p className='mb-5 '>
                <a 
                  href={`/inquery/${auction.auctionStatus.auctionID}`} 
                  className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Inquire
                </a>
                 <span className="ml-5">
                 <a 
                  href={`/auctionRegUser/${auction.auctionStatus.auctionID}`} 
                  className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Register Users
                </a>
                 </span>
              
              </p>
              <p><strong>Ads Code:</strong> {auction.adCode}</p>
              <p><strong>Ads Status:</strong> {auction.status === 1 ? 'Approved' : 'Rejected'}</p>
              <p><strong>Ads Price:</strong> {auction.price}</p>
              <Form onFinish={() => handleFormSubmit(auction.adCode)}>
                <Form.Item label="Start Price">
                  <Input
                    type="number"
                    value={formData[auction.adCode]?.startPrice || auction.auctionStatus.startPrice || ''}
                    onChange={(e) => handleInputChange(auction.adCode, 'startPrice', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Start Date">
                  <Input
                    type="date"
                    value={formData[auction.adCode]?.startDate || auction.auctionStatus.startDate || ''}
                    onChange={(e) => handleInputChange(auction.adCode, 'startDate', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Start Time">
                  <Input
                    type="time"
                    value={formData[auction.adCode]?.startTime || auction.auctionStatus.startTime || ''}
                    onChange={(e) => handleInputChange(auction.adCode, 'startTime', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="End Date">
                  <Input
                    type="date"
                    value={formData[auction.adCode]?.endDate || auction.auctionStatus.endDate || ''}
                    onChange={(e) => handleInputChange(auction.adCode, 'endDate', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="End Time">
                  <Input
                    type="time"
                    value={formData[auction.adCode]?.endTime || auction.auctionStatus.endTime || ''}
                    onChange={(e) => handleInputChange(auction.adCode, 'endTime', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Max Rate">
                  <Input
                    type="number"
                    value={formData[auction.adCode]?.maxRate || auction.auctionStatus.maxRate || ''}
                    onChange={(e) => handleInputChange(auction.adCode, 'maxRate', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Bid Value">
                  <Input
                    type="number"
                    value={formData[auction.adCode]?.BidValue || auction.auctionStatus.BidValue || ''}
                    onChange={(e) => handleInputChange(auction.adCode, 'BidValue', e.target.value)}
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form>
              <p className="mt-4">
                <strong>Auction Status:</strong>
                <Tag color={auction.auctionStatus.status ? 'green' : 'red'} className="ml-2">
                  {auction.auctionStatus.status ? 'Open' : 'Close'}
                </Tag>
              </p>
              <p><strong>Current Rate:</strong> {auction.auctionStatus.currentRate}</p>
              <p><strong>Max Rate:</strong> {auction.auctionStatus.maxRate}</p>
              <div className="flex justify-between">
                <Button type="primary" onClick={() => dispatch(openForAuction(auction.adCode, true))}>
                  Open for Auction
                </Button>
                <Button type="danger" onClick={() => dispatch(openForAuction(auction.adCode, false))}>
                  Close Auction
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
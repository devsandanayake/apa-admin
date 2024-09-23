import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { viewRegisterUsers } from '../actions/auctionAction';
import { Table, Spin, Alert, Tag } from 'antd';
import { CrownOutlined, CheckCircleOutlined, CloseCircleOutlined, DollarOutlined } from '@ant-design/icons';

export default function AuctionRegUser() {

    const { auctionID } = useParams();
    const dispatch = useDispatch();
    const auctionState = useSelector((state) => state.auction);

    React.useEffect(() => {
        dispatch(viewRegisterUsers(auctionID));
    }, [dispatch, auctionID]);

    if (auctionState.error) {
        return <Alert message="Error" description={auctionState.error} type="error" showIcon />;
    }

    const currencyFormatter = new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
    });

    // Find the maximum offer rate across all users
    const maxOfferRate = Math.max(
        ...auctionState.data.flatMap(user => user.userOffer.map(offer => offer.rate))
    );

    const winnerUser = auctionState.data.find(user => user.userOffer.some(offer => offer.rate === maxOfferRate));

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (username, record) => (
                <span className="flex items-center">
                    {winnerUser?.username === username && <CrownOutlined className="text-yellow-500 mr-2" />}
                    {username}
                </span>
            ),
        },
        {
            title: 'Ad Code',
            dataIndex: 'adCode',
            key: 'adCode',
        },
        {
            title: 'Registration Date',
            dataIndex: 'registrationDate',
            key: 'registrationDate',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status) => (
                status ? (
                    <Tag color="success" icon={<CheckCircleOutlined />}>
                        Paid
                    </Tag>
                ) : (
                    <Tag color="error" icon={<CloseCircleOutlined />}>
                        Unpaid
                    </Tag>
                )
            ),
        },
        {
            title: 'Bid Amounts',
            dataIndex: 'bidAmount',
            key: 'bidAmount',
            render: (amounts) => amounts.map((amount, index) => (
                <Tag color="blue" icon={<DollarOutlined />} key={index}>
                    {currencyFormatter.format(amount)}
                </Tag>
            )),
        },
        {
            title: 'User Offers',
            dataIndex: 'userOffer',
            key: 'userOffer',
            render: (offers) => {
                // Sort offers by timestamp in descending order (latest date first)
                const sortedOffers = offers.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                // Find the maximum rate
                const maxRate = Math.max(...offers.map(offer => offer.rate));

                return sortedOffers.map((offer, index) => (
                    <div key={index} className="mb-2">
                        <Tag color={offer.rate === maxRate ? "red" : "green"}>
                            <strong>Rate:</strong> {currencyFormatter.format(offer.rate)}
                        </Tag>
                        <p><strong>Timestamp:</strong> {new Date(offer.timestamp).toLocaleString()}</p>
                    </div>
                ));
            },
        }
    ];

    return (
        <div className="p-5 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Auction Registered Users</h2>
            <div className="text-center mb-4">
                <p className="text-xl">
                    <strong>Winner:</strong> <span className="text-yellow-500 font-bold">{winnerUser?.username}</span> 
                    ({currencyFormatter.format(maxOfferRate)})
                </p>
            </div>
            {auctionState.loading ? (
                <div className="flex justify-center items-center">
                    <Spin tip="Loading..." />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={auctionState.data}
                    rowKey="auctionID"
                    pagination={false}
                    className="shadow-lg"
                />
            )}
        </div>
    );
}

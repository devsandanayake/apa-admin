import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Typography, List, Divider } from 'antd';
import { userDetails } from '../../actions/userAction';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function User() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data.user);

  React.useEffect(() => {
    dispatch(userDetails(username));
  }, [dispatch, username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      style={{ maxWidth: 600, margin: 'left' }}
      cover={
        <Avatar
          size={128}
          icon={!user.images && <UserOutlined />}
          src={user.images ? `http://124.43.179.118:8081/${user.images.replace('../', '')}` : null}
          style={{ margin: 'auto', display: 'block', marginTop: 16 }}
        />
      }
    >
      <Title level={2}>{user.username}</Title>
      <Divider />
      <List>
        <List.Item>
          <Text strong>
            <MailOutlined /> Email:
          </Text>
          <Text>{user.email}</Text>
        </List.Item>
        <List.Item>
          <Text strong>
            <PhoneOutlined /> Contact Number:
          </Text>
          <Text>{user.contactNumber}</Text>
        </List.Item>
        <List.Item>
          <Text strong>
            <CalendarOutlined /> Register Date:
          </Text>
          <Text>{user.registerDate}</Text>
        </List.Item>
      </List>
    </Card>
  );
}
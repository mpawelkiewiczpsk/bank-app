import React, { useState } from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Button,
  List,
  Avatar,
  Divider,
  Select,
  message,
} from 'antd';
import {
  BankOutlined,
  SwapOutlined,
  DollarOutlined,
  MobileOutlined,
  CopyOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

export default function Home() {
  const accounts = {
    '1234 5678 9101 1121': {
      type: 'Checking Account',
      balance: '$3,450.00',
      transactions: [
        { title: 'Grocery Shopping', amount: '-$50.00', date: '10/11/2024' },
        { title: 'Transfer from Tom', amount: '+$100.00', date: '09/11/2024' },
        { title: 'Mobile Recharge', amount: '-$20.00', date: '08/11/2024' },
        { title: 'Salary', amount: '+$1500.00', date: '01/11/2024' },
      ],
    },
    '2234 5678 9101 3345': {
      type: 'Savings Account',
      balance: '$10,250.00',
      transactions: [
        { title: 'Interest Payment', amount: '+$25.00', date: '10/11/2024' },
        {
          title: 'Transfer to Checking',
          amount: '-$500.00',
          date: '09/11/2024',
        },
        { title: 'Salary Deposit', amount: '+$2000.00', date: '01/11/2024' },
      ],
    },
  };

  const [selectedAccount, setSelectedAccount] = useState('1234 5678 9101 1121');

  const handleAccountChange = (value) => {
    setSelectedAccount(value);
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(selectedAccount);
    message.success('Account number copied to clipboard!');
  };

  const accountDetails = accounts[selectedAccount];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>
        {sessionStorage.getItem('name')
          ? `${sessionStorage.getItem('name')} ${sessionStorage.getItem('surname')}`
          : 'Your Account'}
      </Title>

      <Row gutter={[16, 16]}>
        {/* Account Selector */}
        <Col span={24}>
          <Card>
            <Text>Select Account:</Text>
            <Select
              defaultValue={selectedAccount}
              style={{ width: '100%', marginTop: '10px' }}
              onChange={handleAccountChange}
            >
              {Object.keys(accounts).map((accountNumber) => (
                <Option key={accountNumber} value={accountNumber}>
                  {accounts[accountNumber].type} - {accountNumber}
                </Option>
              ))}
            </Select>
            <Button
              icon={<CopyOutlined />}
              onClick={copyAccountNumber}
              style={{ marginTop: '10px' }}
            >
              Copy Account Number
            </Button>
          </Card>
        </Col>

        {/* Balance */}
        <Col span={12}>
          <Card>
            <Title level={3}>Balance</Title>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {accountDetails.balance}
            </Text>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col span={12}>
          <Card title="Quick Actions">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Button type="primary" icon={<SwapOutlined />} block>
                  Transfer
                </Button>
              </Col>
              <Col span={8}>
                <Button type="primary" icon={<DollarOutlined />} block>
                  BLIK
                </Button>
              </Col>
              <Col span={8}>
                <Button type="primary" icon={<MobileOutlined />} block>
                  Recharge
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Recent Transactions */}
      <Title level={3}>Recent Transactions</Title>
      <List
        itemLayout="horizontal"
        dataSource={accountDetails.transactions}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<BankOutlined />} />}
              title={item.title}
              description={item.date}
            />
            <Text>{item.amount}</Text>
          </List.Item>
        )}
      />
    </div>
  );
}

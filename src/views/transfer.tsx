import React, { useState } from 'react';
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Switch,
  message,
} from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

export default function Transfer() {
  const [form] = Form.useForm();
  const [isImmediate, setIsImmediate] = useState(false);

  const handleFinish = (values) => {
    // Logic to process the transfer would go here
    console.log('Transfer Details:', values);
    message.success('Transfer submitted successfully!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Make a Transfer</Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {/* Select or Enter Recipient */}
          <Form.Item
            label="Recipient"
            name="recipient"
            rules={[
              { required: true, message: 'Please select or enter a recipient' },
            ]}
          >
            <Select placeholder="Select recipient or enter a new one">
              <Option value="Tom Smith">Tom Smith</Option>
              <Option value="Alice Johnson">Alice Johnson</Option>
              <Option value="New Recipient">New Recipient</Option>
            </Select>
          </Form.Item>

          {/* Recipient Account Number */}
          <Form.Item
            label="Recipient Account Number"
            name="accountNumber"
            rules={[
              {
                required: true,
                message: 'Please enter the recipient’s account number',
              },
              { len: 26, message: 'Account number must be 26 digits' },
            ]}
          >
            <Input placeholder="Enter account number" maxLength={26} />
          </Form.Item>

          {/* Transfer Amount */}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: 'Please enter the transfer amount' },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Enter amount"
              min={1}
              step={0.01}
              formatter={(value) => `$ ${value}`}
            />
          </Form.Item>

          {/* Transfer Title */}
          <Form.Item
            label="Transfer Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter the transfer title' },
            ]}
          >
            <Input placeholder="Enter transfer title" />
          </Form.Item>

          {/* Immediate Transfer Switch */}
          <Form.Item label="Immediate Transfer">
            <Switch
              checked={isImmediate}
              onChange={() => setIsImmediate(!isImmediate)}
            />
            <Text style={{ marginLeft: '10px' }}>Send immediately</Text>
          </Form.Item>

          {/* Save Recipient Switch */}
          <Form.Item label="Save Recipient to Contacts">
            <Switch />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Transfer
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

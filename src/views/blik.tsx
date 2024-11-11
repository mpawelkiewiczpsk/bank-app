import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Button,
  Row,
  Col,
  message,
  List,
  Divider,
} from 'antd';
import {
  CopyOutlined,
  ReloadOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Blik() {
  const [blikCode, setBlikCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [blikHistory, setBlikHistory] = useState([]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const generateBlikCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
    setBlikCode(newCode);
    setBlikHistory([
      { code: newCode, date: new Date().toLocaleString() },
      ...blikHistory,
    ]);
    setTimeLeft(120); // Reset timer to 2 minutes
    message.success('New BLIK code generated');
  };

  const copyBlikCode = () => {
    if (blikCode) {
      navigator.clipboard.writeText(blikCode.toString());
      message.success('BLIK code copied to clipboard');
    } else {
      message.warning('Generate a BLIK code first');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Generate BLIK Code</Title>

      <Card style={{ textAlign: 'center' }}>
        {/* BLIK Code Display */}
        <Title level={3}>Your BLIK Code</Title>
        <div
          style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          {blikCode || '------'}
        </div>

        {/* Timer */}
        <Text type="secondary">
          <ClockCircleOutlined style={{ marginRight: '5px' }} />
          Code expires in: {formatTime(timeLeft)}
        </Text>

        {/* Actions */}
        <Row gutter={16} justify="center" style={{ marginTop: '20px' }}>
          <Col>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={generateBlikCode}
            >
              Generate BLIK Code
            </Button>
          </Col>
          <Col>
            <Button
              type="default"
              icon={<CopyOutlined />}
              onClick={copyBlikCode}
              disabled={!blikCode}
            >
              Copy BLIK Code
            </Button>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* BLIK Code History */}
      <Title level={3}>BLIK Code History</Title>
      <List
        bordered
        dataSource={blikHistory}
        renderItem={(item) => (
          <List.Item>
            <Text strong>{item.code}</Text>
            <Text type="secondary">{item.date}</Text>
          </List.Item>
        )}
        locale={{ emptyText: 'No BLIK codes generated yet' }}
      />
    </div>
  );
}

import { Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import {
  LogoutOutlined,
  HomeOutlined,
  BankOutlined,
  BarcodeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';

const { Header, Content, Sider } = Layout;

export default function Root() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sidebarItems: MenuProps['items'] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => navigate('/home'), // Update this to your desired path
    },
    {
      key: 'transfer',
      icon: <BankOutlined />,
      label: 'Transfer',
      onClick: () => navigate('/transfer'), // Update this to your desired path
    },
    {
      key: 'blik',
      icon: <BarcodeOutlined />,
      label: 'Blik',
      onClick: () => navigate('/blik'), // Update this to your desired path
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            style={{ height: '100%', borderRight: 0 }}
            items={sidebarItems}
          />
          <Button
            icon={<LogoutOutlined />}
            type="text"
            onClick={() => navigate('/login')}
            style={{ width: '100%', textAlign: 'center', marginBottom: '16px' }}
          >
            Logout
          </Button>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

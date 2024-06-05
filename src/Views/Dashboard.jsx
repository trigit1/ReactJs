import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../utils";
import Items from "../Components/Items";
import Categories from "../Components/Categories";
import Stocks from "../Components/Stocks";
import PosDashboard from "../Components/PosDashboard";
import "./Dashboard.css"; // Import custom CSS file

const { Header, Content } = Layout;

const Dashboard = () => {
  const snap = useSnapshot(state);

  const onMenuItemClicked = (index) => {
    state.activeIndex = index;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Header className="site-layout-header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["4"]}
            style={{ justifyContent: "center", flexWrap: "nowrap" }}
          >
            <Menu.Item
              onClick={() => onMenuItemClicked(3)}
              key="4"
              icon={<UserOutlined />}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              onClick={() => onMenuItemClicked(0)}
              key="1"
              icon={<UnorderedListOutlined />}
            >
              Items
            </Menu.Item>
            <Menu.Item
              onClick={() => onMenuItemClicked(1)}
              key="2"
              icon={<AppstoreAddOutlined />}
            >
              Categories
            </Menu.Item>
            <Menu.Item
              onClick={() => onMenuItemClicked(2)}
              key="3"
              icon={<ShoppingCartOutlined />}
            >
              Stock
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout-content"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {snap.activeIndex === 0 && <Items />}
          {snap.activeIndex === 1 && <Categories />}
          {snap.activeIndex === 2 && <Stocks />}
          {snap.activeIndex === 3 && <PosDashboard />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

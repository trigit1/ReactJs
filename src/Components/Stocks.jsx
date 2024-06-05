import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Select } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getAllStocks,
  createStock,
  updateStock,
  deleteStock,
} from "../api/stockController";

import SingleItem from "./SingleItem";
import { getAllItems } from "../api/itemController";
import "./Stocks.css"; // Import custom CSS file

const { confirm } = Modal;

const Stocks = () => {
  const [items, setItems] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchItems().then(() => {
      fetchStocks();
    });
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      message.error("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStocks = async () => {
    try {
      const data = await getAllStocks();
      setStocks(data);
    } catch (error) {
      message.error("Failed to fetch stocks.");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEditMode) {
        await updateStock(currentStock.id, values);
        message.success("Stock updated successfully!");
      } else {
        await createStock({
          ...values,
          quantity: parseInt(values.quantity),
          costPrice: parseFloat(values.costPrice),
        });
        message.success("Stock created successfully!");
      }
      fetchStocks();
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save stock.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentStock(null);
    setIsEditMode(false);
  };

  const handleEdit = (stock) => {
    setCurrentStock(stock);
    setIsEditMode(true);
    form.setFieldsValue(stock);
    showModal();
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this stock?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteStock(id);
      message.success("Stock deleted successfully!");
      fetchStocks();
    } catch (error) {
      message.error("Failed to delete stock.");
    }
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "itemId",
      key: "itemId",
      render: (itemId) => <SingleItem id={itemId} />,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Cost Price (LKR)",
      dataIndex: "costPrice",
      key: "costPrice",
    },
    {
      title: "Total Price (LKR)",
      dataIndex: "total",
      key: "total",
      render: (_, record) => {
        const total = record.quantity * record.costPrice;
        return <p>{total}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: "8px" }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="dashed"
            danger
            onClick={() => showDeleteConfirm(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="stocks-container">
      <h1>Stocks</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: 16 }}
      >
        Add Stock
      </Button>
      <Table
        columns={columns}
        dataSource={stocks}
        loading={loading}
        rowKey="id"
        bordered
      />

      <Modal
        title={isEditMode ? "Edit Stock" : "Add Stock"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEditMode ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" name="stockForm">
          <Form.Item
            name="itemId"
            label="Item"
            rules={[{ required: true, message: "Please select an item!" }]}
          >
            <Select placeholder="Select an item">
              {items.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="costPrice"
            label="Cost Price"
            rules={[
              { required: true, message: "Please input the cost price!" },
            ]}
          >
            <Input type="number" step="0.01" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Stocks;

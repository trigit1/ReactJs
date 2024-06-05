import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Select } from "antd";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "../api/itemController";
import { render } from "@testing-library/react";
import SingleCateogry from "./SingleCateogry";
import { getAllCategories } from "../api/categoryController";

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories().then(() => {
      fetchItems();
    });
  }, []);

  const fetchCategories = async () => {
    try {
      setCategories([]);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      message.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEditMode) {
        await updateItem(currentItem.id, values);
        message.success("Item updated successfully!");
      } else {
        await createItem(values);
        message.success("Item created successfully!");
      }
      fetchItems();
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save item.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentItem(null);
    setIsEditMode(false);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditMode(true);
    form.setFieldsValue(item);
    showModal();
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      message.success("Item deleted successfully!");
      fetchItems();
    } catch (error) {
      message.error("Failed to delete item.");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => <SingleCateogry id={categoryId} />,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button
            style={{ marginLeft: "8px" }}
            type="dashed"
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Items</h1>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Item
      </Button>
      <Table
        columns={columns}
        dataSource={items}
        loading={loading}
        pagination
        rowKey="id"
      />

      <Modal
        title={isEditMode ? "Edit Item" : "Add Item"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEditMode ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" name="itemForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name={"categoryId"}
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option value={category?.id}>
                  {category?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Items;

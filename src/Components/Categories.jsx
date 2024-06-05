import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryController";

const { confirm } = Modal;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      message.error("Failed to fetch categories.");
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
        await updateCategory(currentCategory.id, values);
        setIsEditMode(false);
        message.success("Category updated successfully!");
      } else {
        await createCategory(values);
        message.success("Category created successfully!");
      }
      fetchCategories();
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save category.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentCategory(null);
    setIsEditMode(false);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setIsEditMode(true);
    form.setFieldsValue(category);
    showModal();
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this category?",
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
      await deleteCategory(id);
      message.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      message.error("Failed to delete category.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Categories", 14, 10);
    const columns = ["ID", "Name"];
    const rows = categories.map((category) => [category.id, category.name]);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });
    doc.save("categories.pdf");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
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
    <div>
      <h1>Categories</h1>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Category
      </Button>
      <Button
        type="primary"
        onClick={generatePDF}
        style={{ marginBottom: 16, marginLeft: 8 }}
      >
        Export PDF
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={isEditMode ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEditMode ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" name="categoryForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;

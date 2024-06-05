import React, { useEffect, useState } from "react";
import { getCategoryById } from "../api/categoryController";

const SingleCateogry = ({ id }) => {
  const [category, setCategory] = useState(null);
  useEffect(() => {
    getCategoryById(id).then((res) => setCategory(res));
  }, [id]);
  return <div>{category?.name}</div>;
};

export default SingleCateogry;

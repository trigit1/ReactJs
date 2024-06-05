import React, { useState, useEffect } from "react";
import { getItemById } from "../api/itemController";

const SingleItem = ({ id }) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    getItemById(id).then((res) => setItem(res));
  }, [id]);
  return <div>{item?.name}</div>;
};

export default SingleItem;

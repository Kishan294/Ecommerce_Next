"use client";

import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [productInfo, setProductInfo] = useState<Product>();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/api/products?id=" + id)
      .then((response) => setProductInfo(response.data));
  }, [id]);
  return (
    <div className="px-2">
      {productInfo && (
        <ProductForm heading={"Edit Product"} productInfo={productInfo} />
      )}
    </div>
  );
};

export default page;

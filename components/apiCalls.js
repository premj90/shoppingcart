import axios from "axios";
import React, { Component } from "react";

export async function addNewRecord(values) {
  console.log(values);
  let data = new FormData();
  data.append("uploaded_image", values.uploaded_image);
  data.append("product_name", values.product_name);
  data.append("product_price", values.product_price);
  data.append("description", values.description);
  data.append("unit_of_measurement", values.unit_of_measurement);

  const payload = values;
  let res = await axios({
    method: "post",
    url: "http://localhost:8088/create",
    data: data
  });
  return res["data"];
}

export async function getAllData() {
  let payload = {};
  let res = await axios({
    method: "post",
    url: "http://localhost:8088/get_all_data",
    data: payload
  });
  return res["data"];
}

export async function getImage(name) {
  console.log(name);
  let payload = { product_name: name };
  let resp = axios({
    method: "post",
    url: "http://localhost:8088/get_image",
    data: payload,
    responseType: "blob"
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    return <img src={url}></img>;
  });
  return resp;
}

export async function deleteRow(name) {
  console.log(name);
  let payload = { product_name: name };
  let resp = axios({
    method: "post",
    url: "http://localhost:8088/delete_product",
    data: payload
  });

  return resp["data"];
}

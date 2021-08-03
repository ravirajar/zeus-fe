import axios from "axios";
import Urls from "../constants/urls";

function makeApiCall(path, method, parameters) {
  path = Urls.API_BASE_PATH_LOCAL + path;
  if (method === "GET") {
    return axios.get(path + parameters);
  } else if (method === "POST") {
    return axios.post(path, parameters, {
      headers: { "content-type": "application/json" },
    });
  }
}

export function getBrandList(path) {
  return makeApiCall(Urls.API_GET_BRAND_LIST, "GET", path);
}

export function getDeviceList(path) {
  return makeApiCall(Urls.API_GET_DEVICE_LIST, "GET", path);
}

export function getPricing(path) {
  return makeApiCall(Urls.API_GET_PRICING, "GET", path);
}

export function getRepairBrandList(path) {
  return makeApiCall(Urls.API_GET_REPAIR_BRAND_LIST, "GET", path);
}

export function getRepairDeviceList(path) {
  return makeApiCall(Urls.API_GET_REPAIR_DEVICE_LIST, "GET", path);
}

export function getRepairDetails(path) {
  return makeApiCall(Urls.API_GET_REPAIR_DETAILS, "GET", path);
}

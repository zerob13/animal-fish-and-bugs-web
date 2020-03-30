import axios from "axios";

const BASE_URL = "http://li.zerob13.com:8080/function/ac";
// const BASE_URL = "http://192.168.10.189:8080/function/ac";
export default function getData(isSouthern = false, type = "fish") {
  let url = "";
  if (!isSouthern) {
    url = `${BASE_URL}/northern/${type}`;
  } else {
    url = `${BASE_URL}/southern/${type}`;
  }
  return axios({
    url,
    method: "GET",
    withCredentials: true
  }).then(resp => {
    if (resp.status === 200) {
      if (resp.data && resp.data.code == 200) {
        return resp.data.data;
      } else {
        return [];
      }
    }
    return [];
  });
}

import axios from "axios";

const API_URL = "http://localhost:5000/api/";

export const postRequest = async (
  url: string,
  body: any
) => {
  await axios.post(`${API_URL}${url}/`, body)
    .then(res => {
      console.log(res.data);
    })

}

export const getRequest = async (url: string) => {
  const result = await axios.get(`${API_URL}${url}/`)
    .then(res => {
      console.log(res.data);
      return res.data
    })

    return result;
}

export const putRequest = async (
  url: string,
  body: any,
  id: string
) => {
  await axios.put(`${API_URL}${url}/${id}`, body)
    .then(res => {
      console.log(res.data);
    })

}


export const deleteRequest = async (
  url: string,
  id: string
) => {
  await axios.delete(`${API_URL}${url}/${id}`)
    .then(res => {
      console.log(res.data);
    })

}
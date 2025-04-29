import axios from "axios"
export const registerAPI = (params: any) => {
    return new Promise((resolve) => {
       axios
          .post("http://localhost:8080/api/register", params, {
             headers: {
                "Content-Type": "application/json",
             },
          })
          .then((response) => {
            //  const parsedResult = axios.parseUserSecurityOptionApi(response.data)
             resolve(response.data)
          })
          .catch(() => {
             const commonModel = {
                status: false,
                message: "Something went wrong, please try again later",
             }
             resolve(commonModel)
          })
    })
}
export const loginAPI = (params: any) => {
    return new Promise((resolve) => {
       axios
          .post(" http://localhost:8080/api/login", params, {
             headers: {
                "Content-Type": "application/json",
             },
          })
          .then((response) => {
            //  const parsedResult = axios.parseUserSecurityOptionApi(response.data)
             resolve(response.data)
          })
          .catch(() => {
             const commonModel = {
                status: false,
                message: "Something went wrong, please try again later",
             }
             resolve(commonModel)
          })
    })
}
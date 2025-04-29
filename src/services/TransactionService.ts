import axios from "axios"

export const addAPI = (params: any) => {
    return new Promise((resolve) => {
       axios
          .post("http://localhost:8080/api/add", params, {
             headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
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
export const listAPI = () => {
    return new Promise((resolve) => {
       axios
          .get("http://localhost:8080/api/list", {
             headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
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

export const updateAPI = (params: any) => {
    return new Promise((resolve) => {
       axios
          .post(" http://localhost:8080/api/update", params, {
             headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
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

export const getBudgetAPI = () => {
    return new Promise((resolve) => {
       axios
          .get(" http://localhost:8080/api/get-budget", {
             headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
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

export const deleteAPI = (params: any) => {
    return new Promise((resolve) => {
       axios
          .post("  http://localhost:8080/api/delete-transaction", params, {
             headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
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
import { toast } from "react-toastify"

const STORAGE_AUTH_KEY="BEARER_TOKEN"

const getAuthHeaders = () => {
    return { 
        Authorization: `Bearer ${localStorage.getItem(STORAGE_AUTH_KEY)}`
    }
}

export const returnOrThrow = async resJSON => {
    try {
        if (resJSON.status === 401) {
            throw "Unauthorized"
        }
        const result = await resJSON.json()
        if (resJSON.status !== 200) {
            throw result
        }
        return result
    }
    catch (err) {
        toast.error(result)
        throw err
    }
}

export const getWrapper = async (url) => {
    const result = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders()
    })
    return result
}

export const postWrapper = async (url, additionalOptions = {}, headers = {}) => {
    // console.log("url",url)
    // console.log("additionalOptions",additionalOptions)
    const result = await fetch(url, {
        method: "POST",
        body: additionalOptions.body,
        headers: {
            ...headers
           
            // ...getAuthHeaders()
        }
    })
    // console.log("result ",result)
    return result
}
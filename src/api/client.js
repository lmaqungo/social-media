import apiURL from "../utils/selectdb";

async function client(endpoint, { method = 'GET', body, headers = {}, ...customConfig } = {}) {

    const config = {
        method, 
        credentials: "include", 
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        }, 
        ...(body && { body: JSON.stringify(body) }), 
        ...customConfig
    }

    try{
        const response = await fetch(`${apiURL}${endpoint}`, config )
        const result = await response.json()
        
        if (!response.ok) {
            throw new Error(`error message: ${result.status}`)
        }
        
        console.log(result)
        return result
    } catch(error) {
        console.error(error)
    }
}

export default client
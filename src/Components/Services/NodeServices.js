import axios from "axios"
const ServerURL = 'http://localhost:5000'

const getData = async (url) => {

    try {
        //alert(url)
        var response = await axios.get(`${ServerURL}/${url}`)
        console.log('responseeeeeeeee',response.data)
        
        var result = await response.data
        //alert(JSON.stringify(result))
        return result

    } catch (error) {
        alert(error)
        console.log('errorrr',error)

        return error

    }


}

const postData = async (url,body) => {

    try {
        console.log(url,body)
        var response = await axios.post(`${ServerURL}/${url}`,body)
        console.log('responseeeeeeeee',response.data)
        
        var result = await response.data
        //alert(JSON.stringify(result))
        return result

    } catch (error) {
        alert(error)
        console.log('errorrr',error)

        return error

    }


}

export {ServerURL, getData, postData}
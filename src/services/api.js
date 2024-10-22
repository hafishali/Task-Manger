import {apiInstance, base_url} from './axiosConfig'

// register
export const userRegister = async (reqBody) => {
    return await apiInstance('POST', `${base_url}/register/`, reqBody,{} )
}
// login
export const userLogin = async (reqBody) => {
    return await apiInstance('POST', `${base_url}/login/`, reqBody,{} )
}
// user profile
export const getProfile = async () => {
    return await apiInstance('GET', `${base_url}/profile/`, "")
}
// add tasks
export const addNewtask = async (reqBody) => {
    return await apiInstance('POST', `${base_url}/tasks/`, reqBody)
}
// get tasks
export const getTask = async () => {
    return await apiInstance('GET', `${base_url}/tasks/`,"")
}
// view tasks
export const viewTask = async (taskId) => {
    return await apiInstance('GET', `${base_url}/tasks/${taskId}/`, "")
}
// update tasks
export const updateTask = async (taskId,reqBody) => {
    return await apiInstance('PUT', `${base_url}/tasks/${taskId}/`, reqBody)
}
// delete tasks
export const deleteTask = async (taskId) => {
    return await apiInstance('DELETE', `${base_url}/tasks/${taskId}/`, "")
}
// filter tasks
export const filterTask = async (task_status) => {
    return await apiInstance('GET', `${base_url}/tasks/status/${task_status}/`, "")
}
// refresh access token
export const refreshAccessToken = async (reqBody) => {
    return await apiInstance('POST', `${base_url}/token/refresh/`, reqBody,null)
}
// logout
export const logoutUser = async (reqBody) => {
    return await apiInstance('POST', `${base_url}/logout/`, reqBody,null)
}



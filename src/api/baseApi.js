import req from '../utils/req.js';
const PREFIX_URL = "api/v1/layers";

/**
 * Lấy toàn bộ dữ liệu 
 * @returns danh sách dữ liệu
 * CreatedBy: NGDuong 07/11/2021
 */
export const getGeoDatas = () =>
    req.get(`https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson`)
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(err));
/**
 * Lấy toàn bộ dữ liệu 
 * @returns danh sách dữ liệu
 * CreatedBy: NGDuong 07/11/2021
 */
 export const getAll = () =>
 req.get(PREFIX_URL)
     .then(res => Promise.resolve(res))
     .catch(err => Promise.reject(err));
        
/**
 * Lấy dữ liệu theo tìm kiếm, phân trang, sắp xếp
 * @param {object} filterData chuỗi json filter
 * @returns danh sách
 * CreatedBy: NGDuong 07/11/2021
 */
 export const getPaging = (filterData) =>
 req({
     url: `${PREFIX_URL}/GetPaging`,
     data: filterData,
     method: 'POST'
 })
     .then(res => Promise.resolve(res.data))
     .catch(err => Promise.reject(err));

/**
* Xóa một layer
* @param {uuid} id mã layer  
* @returns true/false
* CreatedBy: NGDuong (08/11/2021)
*/
export const deleteItemByID = (id) =>
    req.delete(`${PREFIX_URL}/${id}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Lấy thông tin theo ID
* @param {uuid} id  
* @returns true/false
* CreatedBy: NGDuong (08/11/2021)
*/
export const getItemByID = (id) =>
    req.get(`${PREFIX_URL}/${id}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
/**
* Lấy mã mới
* @param {}  
* @returns 
* CreatedBy: NGDuong (08/11/2021)
*/
export const getNewCode = (tableName, fieldName) =>
    req.get(`${PREFIX_URL}/GetNewCode?tableName=${tableName}&fieldName=${fieldName}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
/**
* Lưu thông tin layer
* @param {object, boolean}  
* @returns 
* CreatedBy: NGDuong (08/11/2021)
*/
export const saveItem = (data, isInsert = true) =>
    req({
        url: isInsert ? `${PREFIX_URL}` : `${PREFIX_URL}/${data.id}`,
        data: data,
        method: isInsert ? 'POST' : 'PUT'
    })
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

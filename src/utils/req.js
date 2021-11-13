import axios from 'axios';

import { BASE_URL } from './envConst.js';

/**
 * Khởi tạo config mặc định
 * CreatedBy: NGDuong 07/06/2021
// */
export default axios.create({
    baseURL: BASE_URL,
    timeout: 600000,
    headers: {
        'Content-Type': 'application/json'
    }
});
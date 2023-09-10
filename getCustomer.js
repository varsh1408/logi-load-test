import http from 'k6/http';
import { check } from "k6";
import { CUSTOMER_BASE_URL, params } from '../config.js';

export function getCustomer(referenceId) {

    const url = `${CUSTOMER_BASE_URL}/get/list?ids=${referenceId}`;

    let response = http.get(url, params);

    check(response, { 'Success getCustomer': (r) => r.status === 200 });

    return response.status;
}

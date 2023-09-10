import http from 'k6/http';
import { check } from "k6";
import { CUSTOMER_BASE_URL, params } from '../config.js';

export function updateCustomer(referenceId) {

    const url = `${CUSTOMER_BASE_URL}/update`;

    const payload = JSON.stringify([
        {
            "referenceId": referenceId,
            "name": "Han Wan",
            "mobile": "341245673212",
            "email": "james@ablogs.com",
            "customerType": "Preferred",
            "billingAddress": {
                "apartment": "Suite No. 1, Milsons Towers",
                "streetName": "Michigan Avenue",
                "landmark": "Opp. Subway",
                "locality": "Dowtown Chicago",
                "city": "Chicago",
                "state": "IL",
                "country": "USA",
                "pincode": "10045",
                "latitude": 40.760838,
                "longitude": 79.555
            }
        }
    ]);

    let response = http.post(url, payload, params);

    check(response, { 'Success updateCustomer': (r) => r.status === 200 });

    return JSON.parse(response.body).data[0].referenceId;
}

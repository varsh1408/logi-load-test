import http from 'k6/http';
import { check } from "k6";
import { params } from './config.js';

export const options = {
  stages: [
    { duration: '2m', target: 15000 }, 
    { duration: '1m', target: 0 },
  ],
};

export default function() {

    const url = `https://api.loginextsolutions.com/DeliveryMediumApp/mile/v1/create`;

    const payload = JSON.stringify([
    {
        "vehicleNumber": Date.now(),
        "branchName": "1",
        "vehicleType": "2 Wheeler"
        
    }
]
);

    let response = http.post(url, payload, params);

    console.log('CREATE-VACHILE:', response);

    check(response, { 'CREATE-VACHILE:': (r) => r.status === 200 });
}
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

    const url = `https://api.loginextsolutions.com/DriverApp/mile/v1/create`;

    const payload = JSON.stringify([
    {
        "driverName": "Untitled Driver",
        "phoneNumber": Math.floor(Math.random() * 9000000000) + 1000000000,
        "licenseNumber": Date.now(),
        "countryShortCode":"USA"

    }
]);

    let response = http.post(url, payload, params);

    console.log('CREATE-DRIVER:', response);

    check(response, { 'CREATE-DRIVER:': (r) => r.status === 200 });
}
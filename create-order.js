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

    const url = `https://api.loginextsolutions.com/BookingApp/mile/v1/create`;

    const payload = JSON.stringify([
       {
    "shipmentRequestType":"PICKUP",
    "pickupAccountCode": Date.now(),
    "pickupOrderNo": Date.now(),
    "pickupBranch":"Carters",
    "pickupOrderDate": "11, Sep 2023 20:54",
    "pickupcustomerID": "32324233",
    "pickupAccountName": "James Walker",
    "pickupCity": "mumbai",
    "pickupCountry": "IND",
    "pickupStartTimeWindow": "2023-11-11T21:00:00.000Z",
    "pickupEndTimeWindow": "2023-11-11T21:30:00.000Z"
    }
    ]);

    let response = http.post(url, payload, params);

    console.log('CREATE-ORDER:', response);

    check(response, { 'CREATE-ORDER-SUCCESS': (r) => r.status === 200 });
}
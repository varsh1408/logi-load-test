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
        "employeeId": Date.now(),
        "userGroupName": "try",
        "branchName": "A",
        "deliveryMediumMasterName": "Jamesbond",
        "phoneNumber": Math.floor(Math.random() * 9000000000) + 1000000000,
        "userName": `hacker-${Date.now}`,
        "password": "james0034"
    }
]);

    let response = http.post(url, payload, params);

    console.log('CREATE-ORDER-COMMENT:', response);

    check(response, { 'CREATE-ORDER-COMMENT:': (r) => r.status === 200 });
}
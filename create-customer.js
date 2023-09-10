import { sleep } from 'k6';
import { createCustomer } from './requests/createCustomer.js';
import { getCustomer } from './requests/getCustomer.js';
import { updateCustomer } from './requests/updateCustomer.js';

export const options = {
  stages: [
    { duration: '2m', target: 15000 }, // fast ramp-up to a high point
    // No plateau
    { duration: '1m', target: 0 }, // quick ramp-down to 0 users
  ],
};

export default function () {
  const accountCode = Math.random();
  //Create Customer
  const customerRef = createCustomer(accountCode);
  console.log('Customer Ref', customerRef);
  //Get Customer
  console.log('Customer fetch completed with response status:', getCustomer(customerRef));
  //Update Customer
  const updatedCustomerRef = updateCustomer(customerRef);
  console.log('Updated Customer Ref', updatedCustomerRef);
  //Get Customer
  console.log('Customer fetch completed with response status:', getCustomer(customerRef));

  sleep(1);
}
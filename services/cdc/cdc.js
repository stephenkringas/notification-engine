'use strict'

import axios from "axios";


function getCustomerPreferences(nmi) {

    // Mock response for SAP CDC / CX Customer Preference & Details
    axios.get('https://run.mocky.io/v3/439116d8-6599-43cb-b438-4ef173935ab5')
        .then(response => {
            // console.log(response.data.customers);
            return response.data.customers;
        })
        .catch(error => {
            console.log(error);
        });
};


export { getCustomerPreferences };
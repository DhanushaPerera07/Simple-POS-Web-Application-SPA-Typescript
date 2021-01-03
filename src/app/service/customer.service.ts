/**
 MIT License

 Copyright (c) 2020 Dhanusha Perera

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/**
 * @author : Dhanusha Perera
 * @since : 15/12/2020
 **/

import {Customer} from "../model/customer.model";

/* Customers array */
let customers: Array<Customer> = [];
let loaded = false;

export function getAllCustomer(): Promise<Array<Customer>> {

    /* Promise returns here */
    return new Promise((resolve, reject) => {

        if (!loaded) {

            /*// step 1 - initiate http request
            let http = new XMLHttpRequest();

            // step 2 - setting up the call back function
            http.onreadystatechange = function () {
                if (http.readyState == 4) {
                    console.log("Hooray customers la awa");
                    // console.log(http.responseText);
                    // let dom = $(http.responseXML as any);
                    customers = JSON.parse(http.responseText);

                    loaded = true;
                    resolve(customers); // in here we pass the customers array with the resolve function
                }
            }

            // step 3
            http.open('GET', 'http://localhost:8080/pos/customers', true); // async = true

            // step 4 - if we have to set headers

            // step 5
            http.send();*/

            /* Done using jQuery AJAX */
            $.ajax({
                method: "GET",
                url: 'http://localhost:8080/pos/customers'
            }).then((data)=>{
                /* successful */
                console.log("Hooray customers la awa");
                customers = data; // jQuery takes it as JSON
                loaded = true;
                resolve(customers); // in here we pass the customers array with the resolve function

            }).fail(()=>{
                /* something went wrong */
            });

        } else {
            resolve(customers);
        }

    });
}// getAllCustomer

export function saveCustomer(customer: Customer): Promise<void> {

    return new Promise((resolve, reject) => {

        /*// step 1
        let http = new XMLHttpRequest();

        // step 2
        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if (http.status == 201){
                    console.log(http.responseText);
                    customers.push(customer);
                    resolve();
                } else {
                    reject();
                }

            }
        }

        // step 3
        http.open('POST', 'http://localhost:8080/pos/customers', true); // true ---> async

        // step 4 - if we want to add something to header
        http.setRequestHeader("Content-Type", "application/json");

        // step 5 - if we want to add something to the body
        http.send(JSON.stringify(customer));*/

        /* Done using jQuery AJAX */
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/pos/customers',
            contentType: 'application/json',
            data: JSON.stringify(customer)
        }).then(()=>{
            customers.push(customer);
            resolve();
        }).fail(()=>{
            reject();
        });

    });

}// saveCustomer

export function deleteCustomer(id: String): Promise<void> {
    return new Promise((resolve,reject) =>{
/*        // step 1
        let http = new XMLHttpRequest();

        // step 2
        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if (http.status == 204){
                    customers.splice(customers.findIndex((elm)=>elm.id===id),1)
                    resolve();
                } else {
                    reject();
                }

            }
        }

        // step 3
        http.open('DELETE', `http://localhost:8080/pos/customers?id=${id}`, true); // true ---> async

        // step 4 - if we want to add something to header

        // step 5 - if we want to add something to the body
        http.send();*/

        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/pos/customers?id=${id}`
        }).then(()=>{
            /* success - status code 2xx */
            customers.splice(customers.findIndex((elm)=>elm.id===id),1);
            resolve();
        }).catch(()=>{
            /* failed - status code 4xx and 5xx*/
            reject();
        })

    });
}

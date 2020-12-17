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

import { Customer } from "../model/customer.model";

/* Customers array */
let customers: Array<Customer> = [];

export function getAllCustomer(): Promise<Array<Customer>> {
    // TODO: retrieve data from database

    /* Promise returns here */
    return  new Promise((resolve,reject)=>{

    // step 1 - initiate http request
    let http = new XMLHttpRequest();

    // step 2 - setting up the call back function
    http.onreadystatechange = function () {
        if (http.readyState == 4){
            console.log("Hooray customers la awa");
            // console.log(http.responseText);
            let dom = $(http.responseXML as any);

            // console.log(http.responseXML);
            if (dom){
                dom.find("customer").each((index, elm) => {
                    let id = $(elm).find("id").text();
                    let name = $(elm).find("name").text();
                    let address = $(elm).find("address").text();
                    let email = $(elm).find("email").text();
                    let contact = $(elm).find("contact").text();

                    // console.log(id,name,address,email,contact);
                    /* Add customer to the customers array */
                    customers.push(new Customer(id, name, address, email, contact));
                    // console.log("---------------------");
                });
                /* After things happening successfully, we gonna return the resolve function */
                resolve(customers); // in here we pass the customers array with the resolve function

            }
        }
    }

    // step 3
    http.open('GET','http://localhost:8080/pos/customers',true); // async = true

    // step 4 - if we have to set headers

    // step 5
    http.send();


    // for (let i = 0; i < 50; i++) {
    //     customers.push(new Customer(`C${i}`, "Kasun", "Galle","abc@gmail.com","077123456"));
    // }

    });
}

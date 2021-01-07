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
 * @since : 03/01/2021
 **/

/* Customers array */
import {Order} from "../model/order.model";
import {OrderDetail} from "../model/order-detail.model";
import {Item} from "../model/item.model";
import {Customer} from "../model/customer.model";

export let orders: Array<OrderDetail> = [];
export let ordersFromDatabase: Array<OrderDetail> = [];
let loaded = false;


/** Place / save an order */
export function saveOrder(orderDetail: OrderDetail): Promise<void> {

    return new Promise((resolve, reject) => {

        /* Done using jQuery AJAX */
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/pos/place-orders',
            contentType: 'application/json',
            data: JSON.stringify(orderDetail)
        }).then(() => {
            orders.push(orderDetail);
            resolve();
        }).fail(() => {
            reject();
        });

    });

}// saveOrder


export function getAllOrderDetails(): Promise<Array<OrderDetail>> {

    /* Promise returns here */
    return new Promise((resolve, reject) => {

        if (!loaded) {

            /* Done using jQuery AJAX */
            $.ajax({
                method: "GET",
                url: 'http://localhost:8080/pos/orders'
            }).then((data)=>{
                /* successful */
                console.log("Hooray orders tika awa");
                ordersFromDatabase = data; // jQuery takes it as JSON
                loaded = true;
                resolve(ordersFromDatabase); // in here we pass the customers array with the resolve function

            }).fail(()=>{
                /* something went wrong */
            });

        } else {
            resolve(ordersFromDatabase);
        }

    });
}// getAllOrderDetails

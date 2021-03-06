/**
 * @author : Dhanusha Perera
 * @date : 12/14/20
 **/

import searchOrder from './search-order.component.html';
import style from './search-order.component.scss';
/* required imports for the DataTable */
import "../../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js";
import {getAllCustomer} from "../../service/customer.service";
import {Customer} from "../../model/customer.model";
import {collectAllDependants} from "ts-loader/dist/utils";
import {getAllOrderDetails, ordersFromDatabase} from "../../service/order.service";
import {OrderDetail} from "../../model/order-detail.model";
/* ./required imports for the DataTable */

// handle app-search-item tag
$("app-search-order").replaceWith('<div id="search-order">' + searchOrder + '</div>');

// handle styles
var html = '<style>' + style + '</style>';
$("#place-order").append(html);

// ==========================================================================================
/* GLOBAL VARIABLE */
// ==========================================================================================

/* DataTables for item table */
let searchOrderDataTable: any;


// ==========================================================================================
/* Events and timers */
// ==========================================================================================


// ==========================================================================================
/* functions */
// ==========================================================================================

/* async functions always Return Promise*/
export async function loadAllOrderDetails() {

    let orderDetails = await getAllOrderDetails();

    /* DataTables */
    if (searchOrderDataTable) {
        searchOrderDataTable.destroy();
        $('#orderList tbody tr').remove();
    }

    for (const orderDetail of orderDetails) {

        let itemsDetails = ``;
        let total = 0;
        for (const item of orderDetail.itemList){
            itemsDetails += `<div>${item.id} - ${item.name} - ${item.quantity} -${item.unitPrice}</div>`;
            total += Number(item.unitPrice) * Number(item.quantity);
        }

        $('#orderList tbody').append(`
              <tr>
                <td>${orderDetail.orderId}</td>
                <td>${orderDetail.customer.id}</td>
                <td>${orderDetail.customer.name}</td>
                <td>${itemsDetails}</td>
                <td>${total}</td>
                <td>${orderDetail.orderedDate}</td>
            </tr>
        `);
    } // for loop


    searchOrderDataTable = ($('#orderList') as any).DataTable({
        "info": false,
        "searching": true,
        "lengthChange": false,
        "pageLength": 5,
    });

    searchOrderDataTable.page(Math.ceil(orderDetails.length / 5) - 1).draw('page');

    getAllOrderDetails().then(function (orderDetails: Array<OrderDetail>) {
        /* resolve function */


    }).catch(function () {
        /* reject function */

    });


}

/* Call and load all the order details */
loadAllOrderDetails();




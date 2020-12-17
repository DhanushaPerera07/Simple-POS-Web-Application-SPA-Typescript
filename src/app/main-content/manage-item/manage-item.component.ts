/**
 * @author : Dhanusha Perera
 * @date : 12/14/20
 **/

import manageItem from './manage-item.component.html';
import style from './manage-item.component.scss';
/* required imports for the DataTable */
import "../../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js";
import {getAllCustomer} from "../../service/customer.service";
import {Customer} from "../../model/customer.model";
import {getAllItems} from "../../service/item.service";
import {Item} from "../../model/item.model";
/* ./required imports for the DataTable */

// handle app-manage-item tag
$("app-manage-item").replaceWith('<div id="manage-item">' + manageItem + '</div>');

// handle styles
var html = '<style>' + style + '</style>';
$("#manage-item").append(html);

// ==========================================================================================
/* GLOBAL VARIABLE */
// ==========================================================================================

// export var items = [];




// ==========================================================================================
/* Events and timers */
// ==========================================================================================



// ==========================================================================================
/* functions */
// ==========================================================================================

/* async functions always Return Promise*/
async function loadAllItems(){

    let items = await getAllItems();

    for (const item of items) {
        $('#tbl-items tbody').append(`
              <tr>
                <th scope="row"><img class="item-image"  src="/src/asset/iPhone12-1.jpg" alt=""></th>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${item.description}</td>
                <td>
                    <i class="fa fa-trash trashHover" aria-hidden="true" title="Delete record"></i>
                    <i class="fa fa-pencil-square-o editHover" aria-hidden="true" title="Edit record"></i>
                </td>
            </tr>
        `);
    } // for loop

    /* DataTables */
    ($('#tbl-items') as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
    });

    getAllItems().then(function (customers: Array<Item>) {
        /* resolve function */


    }).catch(function () {
        /* reject function */

    });


}

loadAllItems();


// /* DataTables for item table */
// ($('#tbl-items') as any).DataTable({
//     "info":false,
//     "searching":false,
//     "lengthChange":false,
//     "pageLength": 5,
// });


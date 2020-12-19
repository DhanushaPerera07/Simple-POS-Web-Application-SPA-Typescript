/**
 * @author : Dhanusha Perera
 * @date : 11/26/20
 **/

import manageCustomer from './manage-customer.component.html';
import style from './manage-customer.component.scss';
/* required imports for the DataTable */
import "../../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js";
import {getAllCustomer} from "../../service/customer.service";
import {Customer} from "../../model/customer.model";
/* ./required imports for the DataTable */

// handle app-manage-customer tag
$("app-manage-customer").replaceWith('<div id="manage-customer">' + manageCustomer + '</div>');

// handle styles
var html = '<style>' + style + '</style>';
$("#manage-customer").append(html);

// ==========================================================================================
/* GLOBAL VARIABLE */
// ==========================================================================================

// export var customers = [];
let customerDataTable: any = null;


// ==========================================================================================
/* Events and timers */
// ==========================================================================================


// ==========================================================================================
/* functions */
// ==========================================================================================

/* Load all customers */
function old_loadAllCustomers() {
    getAllCustomer().then(function (customers: Array<Customer>) {
        /* resolve function */
        for (const customer of customers) {
            $('#tbl-customers tbody').append(`
              <tr>
                <th scope="row"><img class="customer-image"  src="/src/asset/avatar1.jpg" alt=""></th>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.email}</td>
                <td>${customer.contact}</td>
                <td>
                    <i class="fa fa-trash trashHover" aria-hidden="true" title="Delete record"></i>
                    <i class="fa fa-pencil-square-o editHover" aria-hidden="true" title="Edit record"></i>
                </td>
            </tr>
        `);
        } // for loop

        /* DataTables */
        ($('#tbl-customers') as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
        });

    }).catch(function () {
        /* reject function */

    });


}

/* async functions always Return Promise*/
export async function loadAllCustomers() {

    let customers = await getAllCustomer();

    /* DataTables */
    if (customerDataTable) {
        customerDataTable.destroy();
        $('#tbl-customers tbody tr').remove();
    }

    for (const customer of customers) {
        $('#tbl-customers tbody').append(`
              <tr>
                <th scope="row"><img class="customer-image"  src="/src/asset/avatar1.jpg" alt=""></th>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.email}</td>
                <td>${customer.contact}</td>
                <td>
                    <i class="fa fa-trash trashHover" aria-hidden="true" title="Delete record"></i>
                    <i class="fa fa-pencil-square-o editHover" aria-hidden="true" title="Edit record"></i>
                </td>
            </tr>
        `);
    } // for loop



    customerDataTable = ($('#tbl-customers') as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
    });

    getAllCustomer().then(function (customers: Array<Customer>) {
        /* resolve function */


    }).catch(function () {
        /* reject function */

    });


}

loadAllCustomers();


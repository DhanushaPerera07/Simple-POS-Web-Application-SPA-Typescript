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




// ==========================================================================================
/* Events and timers */
// ==========================================================================================



// ==========================================================================================
/* functions */
// ==========================================================================================

($('#tbl-customers') as any).DataTable({
    "info":false,
    "searching":false,
    "lengthChange":false,
    "pageLength": 5,
});

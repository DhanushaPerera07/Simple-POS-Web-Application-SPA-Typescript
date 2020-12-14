/**
 * @author : Dhanusha Perera
 * @date : 12/14/20
 **/

import placeOrder from './place-order.component.html';
import style from './place-order.component.scss';
/* required imports for the DataTable */
import "../../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js";
import "../../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js";
/* ./required imports for the DataTable */

// handle app-manage-item tag
$("app-place-order").replaceWith('<div id="place-order">' + placeOrder + '</div>');

// handle styles
var html = '<style>' + style + '</style>';
$("#place-order").append(html);

// ==========================================================================================
/* GLOBAL VARIABLE */
// ==========================================================================================

export var placeOrders = [];


// ==========================================================================================
/* Events and timers */
// ==========================================================================================


// ==========================================================================================
/* functions */
// ==========================================================================================

/* DataTables for item table */
($('#simpleCart') as any).DataTable({
    "info": false,
    "searching": false,
    "lengthChange": false,
    "pageLength": 5,
});

/* DataTables for item table */
($('#itemList') as any).DataTable({
    "info": false,
    "searching": false,
    "lengthChange": false,
    "pageLength": 5,
});
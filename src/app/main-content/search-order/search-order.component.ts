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
/* ./required imports for the DataTable */

// handle app-search-item tag
$("app-search-order").replaceWith('<div id="search-order">' + searchOrder + '</div>');

// handle styles
var html = '<style>' + style + '</style>';
$("#place-order").append(html);

// ==========================================================================================
/* GLOBAL VARIABLE */
// ==========================================================================================

// export var searchOrders = [];


// ==========================================================================================
/* Events and timers */
// ==========================================================================================


// ==========================================================================================
/* functions */
// ==========================================================================================

/* DataTables for item table */
($('#orderList') as any).DataTable({
    "info": false,
    "searching": true,
    "lengthChange": false,
    "pageLength": 5,
});

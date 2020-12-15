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
/* ./required imports for the DataTable */

// handle app-manage-item tag
$("app-manage-item").replaceWith('<div id="manage-item">' + manageItem + '</div>');

// handle styles
var html = '<style>' + style + '</style>';
$("#manage-item").append(html);

// ==========================================================================================
/* GLOBAL VARIABLE */
// ==========================================================================================

export var items = [];




// ==========================================================================================
/* Events and timers */
// ==========================================================================================



// ==========================================================================================
/* functions */
// ==========================================================================================




/* DataTables for item table */
($('#tbl-items') as any).DataTable({
    "info":false,
    "searching":false,
    "lengthChange":false,
    "pageLength": 5,
});


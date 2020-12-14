/**
 * @author : Dhanusha Perera
 * @date : 11/26/20
 **/

import manageCustomer from './manage-customer.component.html';
import style from './manage-customer.component.scss';

// handle app-manage-customer tag
$("app-manage-customer").replaceWith('<div id="manage-customer">' + manageCustomer + '</div>');

// handle styles
var html = '<style>' + style + '</style>';
$("#manage-customer").append(html);

// ==========================================================================================
/* GLOBAL VARIABLE */
// ==========================================================================================

export var customers = [];




// ==========================================================================================
/* Events and timers */
// ==========================================================================================



// ==========================================================================================
/* functions */
// ==========================================================================================



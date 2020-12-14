/**
 * @author : Dhanusha Perera
 * @date : 12/14/20
 **/

import placeOrder from './place-order.component.html';
import style from './place-order.component.scss';

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



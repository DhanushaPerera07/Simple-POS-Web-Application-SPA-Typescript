/**
 * @author : Dhanusha Perera
 * @date : 12/14/20
 **/

import searchOrder from './search-order.component.html';
import style from './search-order.component.scss';

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



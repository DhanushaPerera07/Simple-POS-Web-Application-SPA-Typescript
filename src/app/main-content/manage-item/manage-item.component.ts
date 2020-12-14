/**
 * @author : Dhanusha Perera
 * @date : 12/14/20
 **/

import manageItem from './manage-item.component.html';
import style from './manage-item.component.scss';

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



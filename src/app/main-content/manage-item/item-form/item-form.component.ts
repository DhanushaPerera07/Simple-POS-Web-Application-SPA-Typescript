import itemForm from './item-form.component.html';
import itemFormStyle from './item-form.component.scss';
import {hideAllMainContent} from "../../../main-sidebar/sidebar/sidebar.component";


/* handle app-item-form tag */
var htmlItemForm = '<div id="itemForm">' + itemForm + '</div>';
$("app-item-form").replaceWith(htmlItemForm);

/* handle styles */
var html = '<style>' + itemFormStyle + '</style>';
$("#itemForm").append(html);


/* Submit item form data */
$('#btn-submit-item').click(function () {
    console.log("Customer form submit btn clicked");
    // TODO: handle submitting form data
});

/* Cancel button will redirect to the manage item main page */
$('#btn-cancel-item').click(function () {
    hideAllMainContent();
    $("#manage-item").show();
});

/* Delete the item data */
$('#btn-delete-item').click(function () {
    console.log("Item form delete btn clicked");
    // TODO: handle delete item
});
import contentHeader from './content-header.component.html';
import contentHeaderStyle from './content-header.component.scss';
import {hideAllMainContent} from "../../main-sidebar/sidebar/sidebar.component";

// handle app-content-header
var htmlContentHeader = '<div id="contentHeader">' + contentHeader + '</div>';
$("app-content-header").replaceWith(htmlContentHeader);

// handle styles
var html = '<style>' + contentHeaderStyle + '</style>';
$("#contentHeader").append(html);


$('#btn-add').click(function () {
    console.log($(this).parent().find("#header-content-header").text());

    var pageHeader = $(this).parent().find("#header-content-header").text();

    openPopUpDialogBox(pageHeader);

});


function openPopUpDialogBox(pageHeader: string):void {

    hideAllMainContent();

    switch (pageHeader) {
        case "Manage Customer":
            $('#customerForm').show();
            break;
        case "Manage Item":
            $('#itemForm').show();
            break;
        default:
            console.log("default page header");

    }
}
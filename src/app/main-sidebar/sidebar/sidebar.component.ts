import sideBar from "./sidebar.component.html";
import sideBarStyle from "./sidebar.component.scss";
import {loadAllCustomers} from "../../main-content/manage-customer/manage-customer.component";

// handle app-brand-logo
// var htmlSideBar = '<div id="sideBar">' + sideBar + '</div>';
var htmlSideBar = sideBar;
$("app-sidebar").replaceWith(htmlSideBar);

$("#mainSideBar>li").each(function () {
  $(this).click(function () {
    removeAllActiveClassFromSideNav();
    $(this).children("a").addClass("active");

    // hide all main content
    hideAllMainContent();

    /* depending on the selected list item,
        display the main content accordingly */
    switch ($(this).children("a").attr("data-index")) {
      case "1":
        /* Show dashboard */
        $("#dashboard").show();
        $("#header-content-header").text("Dashboard");
        $($('#content-header').children()[1]).text("Dashboard");
        $("#btn-add").addClass("d-none");

        break;
      case "2":
        /* Show manage customer */
        $("#manage-customer").show();
        // $("#customerForm").show();
        $("#header-content-header").text("Manage Customer");
        $($('#content-header').children()[1]).text("Manage Customer");
        $("#btn-add").removeClass("d-none");
        break;
      case "3":
        /* Show manage item */
        $("#manage-item").show();
        // $("#itemForm").show();
        $("#header-content-header").text("Manage Item");
        $($('#content-header').children()[1]).text("Manage Item");
        $("#btn-add").removeClass("d-none");
        break;
      case "4":
        /* Show place order*/
        // $("#manage-customer").show();
        $("#place-order").show();
        $("#header-content-header").text("Place Order");
        $($('#content-header').children()[1]).text("Place Order");
        $("#btn-add").addClass("d-none");
        break;
      case "5":
        /* Show search order */
        // $("#manage-customer").show();
        $("#search-order").show();
        $("#header-content-header").text("Search Order");
        $($('#content-header').children()[1]).text("Search Order");
        $("#btn-add").addClass("d-none");

        // $("#btn-add").addClass("d-none");
        break;
      default:
        $("#dashboard").show();
    }
  });
});

/* Hide main content from the page */
export function hideAllMainContent() {
  $("#dynamic-main-content")
    .children()
    .each(function () {
      // console.log($(this));
      $(this).hide();
    });
}

function removeAllActiveClassFromSideNav() {
  $("#mainSideBar>li").each(function () {
    $(this).children("a").removeClass("active");
  });
}


export function showManageCustomerPage() {

  hideAllMainContent();

  /* Show manage customer */
  $("#manage-customer").show();
  // $("#customerForm").show();
  $("#header-content-header").text("Manage Customer");
  $($('#content-header').children()[1]).text("Manage Customer");
  $("#btn-add").removeClass("d-none");

}

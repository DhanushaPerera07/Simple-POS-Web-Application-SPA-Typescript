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
import {getAllItems} from "../../service/item.service";
import {Item} from "../../model/item.model";
import {OrderDetail} from "../../model/order-detail.model";
import {Customer} from "../../model/customer.model";
import {getAllCustomer} from "../../service/customer.service";
import {saveOrder} from "../../service/order.service";
/* ./required imports for the DataTable */


// handle app-manage-item tag
$("app-place-order").replaceWith('<div id="place-order">' + placeOrder + '</div>');

// handle styles
var html = '<style>' + style + '</style>';
$("#place-order").append(html);


// ==========================================================================================
/* GLOBAL VARIABLE */
// ==========================================================================================

// export var placeOrders = [];
let customerList: Array<Customer> = []; /* variable holds all the customers */
let selectedCustomerId = 0; /* variable holds the selected customer */

let itemInTheCart: Array<Item> = []; /* variable holds the items in the cart */
let itemInTheCartToPlaceOrder: Array<Item> = []; /* variable holds cart items with user order qty */
let itemList: Array<Item> = []; /* holds the items in the database */
let totalAmount: number = 0; /* holds the total amount of the cart */

/* Declare variables for DataTables */
let cartDataTable: any = null;  /* Datatable for the Cart Table*/
let itemDataTable: any = null; /* DataTables for the Item Table */


// ==========================================================================================
/* Constants */
// ==========================================================================================

let SIMPLE_CART_TABLE_IDENTIFIER = "simpleCart";
let ITEM_LIST_TABLE_IDENTIFIER = "itemList";

/* EVENTS related constants */
let CLICK_EVENT = "click";
let CHANGE_EVENT = "change";

/* Confirm messages related constants */
let PLACE_ORDER_CONFIRM_MESSAGE = "Confirm this order. " +
    "Are you sure you want to proceed? " +
    "Click OK to proceed, " +
    "Otherwise, Click Cancel";
let ADD_TO_CART_CONFIRM_MESSAGE = "Are you sure you want to add this item to the cart?";
let REMOVE_FROM_CART_CONFIRM_MESSAGE = "Are you sure you want to remove this item from the cart?";
let CUSTOMER_NOT_SELECTED_ALERT_MESSAGE = "Please select the customer, first; that you want to place this order for.";
let ORDERING_QUANTITY_INVALID_ALERT_MESSAGE = "Ordering Quantity of the item is invalid, please enter an integer";


// ==========================================================================================
/* Events and timers */
// ==========================================================================================

/** Add an item to the cart - event  */
$("#itemList tbody").on(CLICK_EVENT, 'tr .fa-cart-arrow-down', async (event: Event) => {
    if (confirm(ADD_TO_CART_CONFIRM_MESSAGE)) {

        let orderingUnitPriceForTheItem: string;
        let orderingQuantityForTheItem: any;
        let stockQuantityForTheItem: string;

        /* DataTables - cart table */
        destroyDataTable(cartDataTable);
        // if (cartDataTable) {
        //     cartDataTable.destroy();
        //     // $('#simpleCart tbody tr').remove();
        // }

        /* When user click add to cart icon then, catch the item id */
        let id = ($(event.target as any)).parents("tr").find("td:nth-child(2)").text();
        console.log(id);

        /* Adding an item to the cart */
        if ((itemInTheCart.findIndex((elm) => elm.id === id)) === (-1)) {
            /* Item should be added into the cart */
            itemList.find((elm) => {
                if (elm.id === id) {
                    itemInTheCart.push(elm);
                    loadItemToCartTable(elm);

                    /* Show number of items in the cart */
                    $("#cartNoOfItems").text(itemInTheCart.length);

                    changePlaceOrderButtonBehaviour();

                    calculateCartTotal();
                }
            });

            alert("Item added to the cart successfully...!");
            // console.log(itemInTheCart);
        } else {
            /* Item is already added into the cart */
            alert("Item is already added into the cart!");
        }

        let row = ($(event.target as any)).parents("tr");

        /* Load items to the cart table */
        // loadItemsToCartTable();

        /* Handle Ordering Quantity in the cart */
        $('#simpleCart tbody').on(CHANGE_EVENT, 'tr .cart-input', async (event: Event) => {

            orderingQuantityForTheItem = ($(event.target as any)).parents("tr").find('.cart-input').val();
            orderingUnitPriceForTheItem = ($(event.target as any)).parents("tr").find('.itemUnitPrice').text();
            stockQuantityForTheItem = ($(event.target as any)).parents("tr").find('.itemQuantity').text();

            let orderingQuantity = Number(orderingQuantityForTheItem);
            let orderingUnitPrice = Number(orderingUnitPriceForTheItem);

            if (orderingQuantity > 0 && orderingQuantity <= Number(stockQuantityForTheItem)) {
                ($(event.target as any)).parents("tr").find('.itemTotal').text((orderingUnitPrice * orderingQuantity).toFixed(2));
            } else {
                alert(ORDERING_QUANTITY_INVALID_ALERT_MESSAGE);
                ($(event.target as any)).parents("tr").find('.cart-input').val(1);
            }

            calculateCartTotal();
        });

        /* DataTables for cart table */
        initializeDataTable(cartDataTable, SIMPLE_CART_TABLE_IDENTIFIER);
        // cartDataTable = ($('#simpleCart') as any).DataTable({
        //     "info": false,
        //     "searching": false,
        //     "lengthChange": false,
        //     "pageLength": 5,
        // });
    }
});
//end - add item


/** Remove selected item from the cart - event */
$("#simpleCart tbody").on(CLICK_EVENT, 'tr .fa-times-circle', async (event: Event) => {
    if (confirm(REMOVE_FROM_CART_CONFIRM_MESSAGE)) {
        /* remove item from the cart */

        /* DataTables - cart table */
        destroyDataTable(cartDataTable);
        // if (cartDataTable) {
        //     cartDataTable.destroy();
        //     // $('#simpleCart tbody tr').remove();
        // }

        /* When user click add to cart icon then, catch the item id */
        let id = ($(event.target as any)).parents("tr").find("td:nth-child(2)").text();
        console.log(id);

        /* remove item form the cart array */
        removeItemFromCart(id);

        /* remove particular table row from the cart */
        ($(event.target as any)).parents("tr").remove();

        /* DataTables for cart table */
        initializeDataTable(cartDataTable, SIMPLE_CART_TABLE_IDENTIFIER);
    }
});
//end - remove item


/** Button event on Place order button */
$("#btnPlaceOrder").on(CLICK_EVENT, () => {
    if (selectedCustomerId && selectedCustomerId != 0) {
        /* order should be placed when user click on place order button */
        if (confirm(PLACE_ORDER_CONFIRM_MESSAGE)) {
            let orderDetail = new OrderDetail("");
            orderDetail.orderDetailId = "";
            orderDetail.orderId = "";
            orderDetail.customer = new Customer(selectedCustomerId.toString(), "", "", "", "");
            prepareItemInTheCartToPlaceOrder();

            if (itemInTheCartToPlaceOrder.length == 0) {
                alert("Something went wrong in the item cart");
                return;
            }

            orderDetail.itemList = itemInTheCartToPlaceOrder;
            orderDetail.orderedDate = new Date(Date.now());

            console.log(orderDetail);

            saveOrder(orderDetail);

        }
    } else {
        /* Customer is not selected for the order, prompt an alert message */
        alert(CUSTOMER_NOT_SELECTED_ALERT_MESSAGE);
    }

});

/** Dropdown event when selecting a customer */
$("#customerDropDown").on(CHANGE_EVENT, function () {
    selectedCustomerId = Number($(this).val());
    console.log($(this).val());
});


// ==========================================================================================
/* functions */
// ==========================================================================================

/* async functions always Return Promise */
async function loadAllItems() {

    let items = await getAllItems();

    if (items) {
        itemList = items.slice();
    }

    for (const item of items) {
        $('#itemList tbody').append(`
              <tr>
                <th scope="row"><img class="item-image"  src="/src/asset/iPhone12-1.jpg" alt=""></th>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${item.description}</td>
                <td>
                    <i class="fa fa-cart-arrow-down setGreen" aria-hidden="true"></i>
                </td>
            </tr>
        `);
    } // for loop

    /* DataTables */
    ($('#itemList') as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
    });

    getAllItems().then(function (customers: Array<Item>) {
        /* resolve function */


    }).catch(function () {
        /* reject function */

    });


}

/* Call loadAllItems function and load all items */
loadAllItems();

/** load all customers to display them in the drop down */
async function loadAllCustomersToDropDown() {
    /* Load all customers to display */
    customerList = await getAllCustomer();

    if (customerList) {
        $("#customerDropDown").append(`<option value=\"0" disabled selected>Choose the customer</option>`);
        for (const customer of customerList) {
            $("#customerDropDown").append(`<option value=\"${customer.id}">C${customer.id} - ${customer.name}</option>`);
        }
    }

}

/* Call loadAllCustomersToDropDown function and load all customers */
loadAllCustomersToDropDown();


/** Load all items in the itemInTheCart array to cart table */

/*function loadItemsToCartTable() {

    for (const item of itemInTheCart) {
        $('#simpleCart tbody').append(`
              <tr>
                <th scope="row"><img class="item-image"  src="/src/asset/iPhone12-1.jpg" alt=""></th>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td class="itemUnitPrice">${item.unitPrice.toFixed(2)}</td>
                <td>${item.description}</td>
                <td> 
                    <input class="cart-input" name="qty" type="number" min="1" max="${item.quantity}" value="1" title="Integers only"> 
                </td> 
                <td class="itemTotal">${item.unitPrice.toFixed(2)}</td>
                <td> 
                    <i class="fa fa-times-circle closeIcon" aria-hidden="true"></i>' 
                </td>
               </tr>
        `);
    } // for loop
}*/

/** Load particular item row to cart table */
function loadItemToCartTable(item: Item) {
    $('#simpleCart tbody').last().append(`
              <tr>
                <th scope="row"><img class="item-image"  src="/src/asset/iPhone12-1.jpg" alt=""></th>
                <td class="itemId">${item.id}</td>
                <td class="itemName">${item.name}</td>
                <td class="itemQuantity">${item.quantity}</td>
                <td class="itemUnitPrice">${item.unitPrice.toFixed(2)}</td>
                <td class="itemDescription">${item.description}</td>
                <td> 
                    <input class="cart-input" 
                    name="qty" type="number" 
                    min="1" max="${item.quantity}" 
                    value="1" 
                    title="Integers only">
                </td> 
                <td class="itemTotal">${item.unitPrice.toFixed(2)}</td>
                <td> 
                    <i class="fa fa-times-circle closeIcon" aria-hidden="true"></i>
                </td>
               </tr>
        `);
}

/** If the datatable is initialized already then, it will be destroyed.
 * DataTables reinitialization issue is handled here.
 * @param dataTableToBeDestroyed : the DataTable to be destroyed
 * (or intended datable to be reinitialized) */
function destroyDataTable(dataTableToBeDestroyed: any) {
    /* DataTable */
    if (dataTableToBeDestroyed) {
        dataTableToBeDestroyed.destroy();
        // $('#simpleCart tbody tr').remove();
    }
}

/** Initialize the DataTable.
 * Get the DataTable variable as the parameter,
 * assign the initialized DataTable to the variable.
 * @param dataTableVariable : the DataTable variable
 * @param dataTableIdentifier : identity(id) of the Datatable which is to be reinitialized */
function initializeDataTable(dataTableVariable: any, dataTableIdentifier: string) {
    if (dataTableVariable && dataTableIdentifier) {
        /* Get the DataTable from the parameter and Initialized it */
        dataTableVariable = ($('#' + dataTableIdentifier) as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
        });
    }
}

/** Add an given object to the given array.
 * @param array : the array. Given object is pushed(inserted) to the array.
 * @param object : */
function addObjectToArray<T>(array: Array<T>, object: T) {
    array.push(object);
    // itemInTheCart.push(item);
}

/** Remove an given object from the given array.
 * @param array : the array. Given object is pushed(inserted) to the array.
 * @param object : */
// function removeObjectFromArray<T>(array: Array<T>, id: string) {
//     array.splice(array.findIndex((elm) => elm.id === id), 1);
// }

/** Remove item from the item-in-the-array */
function removeItemFromCart(id: string) {
    itemInTheCart.splice(itemInTheCart.findIndex((elm) => elm.id === id), 1);
}

/** Calculate the total amount of the items in the cart */
function calculateCartTotal() {
    totalAmount = 0;
    $("#simpleCart tbody tr").find(".itemTotal");
    console.log($("#simpleCart tbody tr").find(".itemTotal").length);
    $("#simpleCart tbody tr").find(".itemTotal").each(function () {
        totalAmount = totalAmount + Number($(this).text());
        // console.log(Number($(this).text()));
    });
    $("#cartTotal").text(totalAmount.toFixed(2));
    // console.log(cartTotal);
}

/** disable or enable the place holder button in the cart */
function changePlaceOrderButtonBehaviour() {
    if (itemInTheCart.length != 0 || itemInTheCart) {
        // $("#btnPlaceOrder").removeClass("btn-secondary");
        // $("#btnPlaceOrder").addClass("btn-success");
        $("#btnPlaceOrder").removeAttr("disabled");
    } else {
        // $("#btnPlaceOrder").removeClass("btn-success");
        // $("#btnPlaceOrder").addClass("btn-secondary");
        // $("#btnPlaceOrder").attr("disabled",'disabled');
        $("#btnPlaceOrder").attr("disabled", 'disabled');
    }
}

function prepareItemInTheCartToPlaceOrder() {
    $("#simpleCart tbody tr").each(function (elmNo, htmlElm) {
        let orderingItemId = $(this).find("td:nth-child(2)").text();
        let itemUnitPrice = $(this).find("td:nth-child(5)").text();
        let orderingQuantity = $(this).find(".cart-input").val();

        let item = new Item(orderingItemId.toString(), "", Number(orderingQuantity), Number(itemUnitPrice), "");
        itemInTheCartToPlaceOrder.push(item);
    });
}



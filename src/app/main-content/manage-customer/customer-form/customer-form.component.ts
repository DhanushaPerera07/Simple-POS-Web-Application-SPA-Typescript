import customerForm from './customer-form.component.html';
import customerFormStyle from './customer-form.component.scss';
import {hideAllMainContent, showManageCustomerPage} from "../../../main-sidebar/sidebar/sidebar.component";
import {saveCustomer} from "../../../service/customer.service";
import {Customer} from "../../../model/customer.model";
import {loadAllCustomers} from "../manage-customer.component";
/* required imports for the DataTable */
import "../../../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js";
import "../../../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js";
import "../../../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js";
import "../../../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js";

// handle app-customer-form tag
var htmlCustomerForm = '<div id="customerForm">' + customerForm + '</div>';
$("app-customer-form").replaceWith(htmlCustomerForm);


// handle styles
var html = '<style>' + customerFormStyle + '</style>';
$("#customerForm").append(html);

/* Submit customer form data */
$('#btn-submit-customer').click(async function () {
    console.log("Customer form submit btn clicked");
    // TODO: handle submitting form data
    let customerId = <string>$("#customerId").val();
    let name = <string>$("#name").val();
    let address = <string>$("#address").val();
    let email = <string>$("#email").val();
    let contact = <string>$("#contact").val();

    // if (customerId === "") {
    let success = await saveCustomer(new Customer('', name, address, email, contact));

    if (success) {
        alert("Customer inserted successfully...!");
        showManageCustomerPage();
        /* DataTables */
        // ($('#tbl-customers') as any).DataTable().destroy();
        loadAllCustomers();

    } else {
        alert("Failed to save customer..!");
    }
    // }
});

/* Cancel button will redirect to the manage customer main page */
$('#btn-cancel-customer').click(function () {
    hideAllMainContent();
    $("#manage-customer").show();
});

/* Delete the customer data */
$('#btn-delete-customer').click(function () {
    console.log("Customer form delete btn clicked");
    // TODO: handle delete customer
});

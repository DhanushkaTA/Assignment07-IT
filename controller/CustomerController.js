import {Customer} from "../dto/Customer.js";
import {getAllDB, saveCustomerDB, updateCustomerDB, deleteCustomerDB} from "../db/DB.js";

export class CustomerController {
    constructor() {
        //$('#saveBtn').click(this.handleValidation.bind(this));
        $('#btnCustomerSave').on('click', () => {
            this.handleValidation("Save");
        });
        $('#btnCustomerUpdate').on('click', () => {
            this.handleValidation2("Update");
        });
        $('#btnCustomerDelete').on('click', () => {
            this.handleValidation2("Delete");
        });
        // this.handleSaveCustomer.bind(this);
        this.handleLoadCustomer();
        this.handleTableClickEvent();
    }

    handleValidation(Function) {

        !/^(C)([0-9]{2,})$/.test($('#customerIdNew').val()) ? alert("Invalid ID") : !$('#customerNameNew').val() ? alert("Invalid name") :
            !$('#customerAddressNew').val() ? alert("Invalid address") : !/^(075|077|071|074|078|076|070|072)([0-9]{7})$/.test($('#customerContactNew').val()) ? alert("Invalid Tele") :
                Function === "Save" ? this.handleSaveCustomer() : Function === "Update" ? this.handleUpdateCustomer() :
                    this.handleDeleteCustomer();
    }

    handleValidation2(Function) {

        !/^(C)([0-9]{2,})$/.test($('#customerId').val()) ? alert("Invalid ID") : !$('#customerName').val() ? alert("Invalid name") :
            !$('#customerAddress').val() ? alert("Invalid address") : !/^(075|077|071|074|078|076|070|072)([0-9]{7})$/.test($('#customerContact').val()) ? alert("Invalid Tele") :
                Function === "Save" ? this.handleSaveCustomer() : Function === "Update" ? this.handleUpdateCustomer() :
                    this.handleDeleteCustomer();
    }

    handleSaveCustomer() {

        if (this.handleExistsCustomer()) {
            alert("Customer ID all ready exists !");
            return;
        }
        saveCustomerDB(new Customer($('#customerIdNew').val(), $('#customerNameNew').val(), $('#customerAddressNew').val(), $('#customerContactNew').val()));

        this.handleLoadCustomer();


    }

    handleUpdateCustomer() {

        updateCustomerDB(new Customer($('#customerId').val(), $('#customerName').val(), $('#customerAddress').val(), $('#customerContact').val()));

        this.handleLoadCustomer();
    }

    handleDeleteCustomer() {

        deleteCustomerDB(new Customer($('#customerId').val(), $('#customerName').val(), $('#customerAddress').val(), $('#customerContact').val()));

        this.handleLoadCustomer();
    }

    handleLoadCustomer() {

        $('#tableCustomer tbody tr td').remove();

        getAllDB("DATA").map((value) => {
            var row = "<tr>" +
                "<td>" + value._id + "</td>" +
                "<td>" + value._name + "</td>" +
                "<td>" + value._address + "</td>" +
                "<td>" + value._contact + "</td>" +
                "</tr>";

            $('#tableCustomer tbody').append(row);
        });


        //clearData();
        $('#customerId').val("");
        $('#customerName').val("");
        $('#customerAddress').val("");
        $('#customerContact').val("");

        $('#customerIdNew').val("");
        $('#customerNameNew').val("");
        $('#customerAddressNew').val("");
        $('#customerContactNew').val("");

    }

    handleExistsCustomer() {

        let flag = false;
        getAllDB("DATA").filter((event) => {
            if (event._id === $('#id').val()) {
                flag = true;
            }
        });
        return flag;
    }

    handleTableClickEvent() {

        $('#tableCustomer tbody').on('click', 'tr', (event) => {
            $('#customerId').val($(event.target).closest('tr').find('td').eq(0).text())
            $('#customerName').val($(event.target).closest('tr').find('td').eq(1).text())
            $('#customerAddress').val($(event.target).closest('tr').find('td').eq(2).text())
            $('#customerContact').val($(event.target).closest('tr').find('td').eq(3).text())

        });
    }
}
new CustomerController();
import {Order} from "../dto/Order.js";
import {Order_Item} from "../dto/Order_Item.js";
import {getAllDB, saveOrderDB} from "../db/DB.js";

var order_item_arr = [];
var cus;
var itm;
var index;
var selectedItemCode;

export class OrderController {

    constructor() {
        $('#customerIdCmb').on('change', (event) => {
            this.handleCustomerDetails(event.target.value);
        });
        $('#itemIdCmb').on('change', (event) => {
            this.handleItemDetails(event.target.value);
        });
        $('#orderAddBtn').on('click', () => {
            this.handleValidation();
        });
        // $('#placeOrderBtn').on('click', () => {
        //     this.handleSaveOrder();
        // });


        this.handleTableClickEvent();
        this.handleOrderID();
        this.handleComboBox();
       this.handleQty();
    }

    handleOrderID() {

        let arr = getAllDB("ORDER");
        if (arr.length === 0) {
            $('#order_id').text("MD-00001");
            return;
        }
        let old_arr = arr[arr.length - 1]._orderId;
        let t = old_arr.split("-");
        let x = +t[1];
        x++;
        $('#order_id').text("MD-" + String(x).padStart(5, '0'));
    }


    handleComboBox() {

        getAllDB("ITEM").map((value) => {
            $('#itemIdCmb').append("<option>" + value._itemCode + "</option>");
        });

        getAllDB("DATA").map((value) => {
            $('#customerIdCmb').append("<option>" + value._id + "</option>");
        });


    }

    handleCustomerDetails(id) {

        getAllDB("DATA").map((value) => {
            if (value._id === id) {
                cus = value;
                $('#cusNameOrder').val(value._name);


                $('#customerCmb').css({borderBottom: "1px solid #ced4da"});
                cus = value;
            }
        });
    }

    handleItemDetails(itemCode) {

        getAllDB("ITEM").map((value) => {
            if (value._itemCode === itemCode) {
                itm = value;
                $('#itemDesOrder').val(value._description);
                $('#itemPriceOrder').val(value._unitPrice);
                $('#itemQtyOnHandOrder').val(value._qtyOnHand);

                $('#itemCodeCmb').css({borderBottom: "1px solid #ced4da"});
                itm = value;
            }
        });
    }

    handleValidation() {

        $('#customerIdCmb :selected').text() === "Choose Customer" ? (alert("Please select the customer details !"), $('#customerIdCmb').focus(), $('#customerIdCmb').css({borderBottom: "2px solid red"})) :
            $('#itemIdCmb :selected').text() === "Choose Item" ? (alert("Please select the item details !"), $('#itemIdCmb').focus(), $('#itemIdCmb').css({borderBottom: "2px solid red"})) :
                !/\d+$/.test($('#itemQtyOrder').val()) ? (alert("Qty invalid or empty 7777!"), $('#qty').focus(), $('#qty').css({borderBottom: "2px solid red"})) :
                    parseInt($('#itemQtyOrder').val()) > parseInt($('#itemQtyOnHandOrder').val()) ? (alert("Noo much qty left999 !"), $('#itemQtyOrder').focus(), $('#qty').css({borderBottom: "2px solid red"})) :
                        $('#orderAddBtn').text() === ' Add' ?  (console.log("vv"),this.handleAddItem() ): this.handleUpdateItem();


    }

    handleUpdateItem(){

    }

    handleAddItem(){
        console.log("aaa")

        let index = this.handleIsExists();
        console.log(index)

        if (index === -1) {

            order_item_arr.push(new Order_Item(itm, $('#itemQtyOrder').val(), $('#itemQtyOrder').val() * $('#itemPriceOrder').val()));

        } else if ((parseInt(order_item_arr[index]._qty) + parseInt($('#itemQtyOrder').val())) > parseInt($('#itemQtyOnHandOrder').val())) {

            alert("Noo much qty left !");
            $('#itemQtyOrder').focus();
            $('#itemQtyOrder').css({borderBottom: "2px solid red"});

        } else {

            console.log("jjj")
            order_item_arr[index]._qty = parseInt(order_item_arr[index]._qty) + parseInt($('#itemQtyOrder').val());
            order_item_arr[index]._total = parseInt(order_item_arr[index]._qty) * parseInt($('#itemPriceOrder').val());


        }


        this.handleLoadTable();
        this.handleClearFunction();
    }

    handleClearFunction(){


        $('#orderAddBtn').text('Add');
        $('#orderAddBtn').css({background: '#188b1a', border: '#2bc421'});
        $('#itemDesOrder').text('.');
        $('#itemQtyOnHandOrder').text(".");
        $('#itemPriceOrder').text(".");
        $('#itemQtyOrder').val("");

    }

    handleIsExists() {

        return order_item_arr.findIndex(value => value._item._itemCode === $('#itemCodeCmb :selected').text());

    }

    handleSaveOrder() {

        if (order_item_arr.length === 0) {
            alert("Please add the order details first !");
            return;
        }

        saveOrderDB(new Order($('#order_id').text(), cus, order_item_arr, $('#date').text()));

        order_item_arr = [];

        document.getElementById("customerCmb").selectedIndex = 0;
        document.getElementById('customerCmb').disabled = false;
        $('#customer_name').text(".");
        $('#customer_address').text(".");
        $('#customer_contact').text(".");

        this.handleLoadTable();
        this.handleOrderID();
    }

    handleLoadTable() {
        console.log("tt")

        $('#orderTable tbody tr').remove();

        order_item_arr.map((value) => {
            var row = "<tr>" +
                "<td>" + value._item._itemCode + "</td>" +
                "<td>" + value._item._description + "</td>" +
                "<td>" + value._item._unitPrice + "</td>" +
                "<td>" + value._qty + "</td>" +
                "<td>" + value._total + "</td>" +
                "</tr>";

            $('#orderTable tbody').append(row);

        });

        var tot = 0;

        order_item_arr.map(value => {
            tot += value._total;
        });

        $('#total').text(tot)
    }

    handleTableClickEvent() {

        $('#orderTable tbody').on('click', 'tr', (event) => {

            var arr = document.getElementById('itemIdCmb');
            for (var i = 0; i < arr.length; i++){
                if(arr[i].value === $(event.target).closest('tr').find('td').eq(0).text()){
                    arr.selectedIndex = i;
                }
            }
            selectedItemCode = $(event.target).closest('tr').find('td').eq(0).text();
            $('#itemDesOrder').text($(event.target).closest('tr').find('td').eq(1).text());
            $('#itemQtyOnHandOrder').text($(event.target).closest('tr').find('td').eq(2).text());
            $('#itemPriceOrder').text($(event.target).closest('tr').find('td').eq(3).text());
            $('#itemQtyOrder').val($(event.target).closest('tr').find('td').eq(4).text());

            index = order_item_arr.findIndex(value => value._item._itemCode === $("#itemCodeCmb :selected").text());

            $('#orderAddBtn').text('Update');
            $('#orderAddBtn').css({
                background: '#5f27cd', border: '#5f27cd'
            });

        });
    }

    handleQty() {

        $('#itemQtyOrder').on('keyup', () => {
            $('#itemQtyOrder').css({borderBottom: "1px solid #ced4da"});
        });
    }
}

new OrderController();
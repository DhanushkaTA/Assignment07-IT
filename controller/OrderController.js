import {Order} from "../dto/Order.js";
import {Order_Item} from "../dto/Order_Item.js";
import {getAllDB, saveOrderDB} from "../db/DB.js";

var orderDetailsArray = [];
var cus;
var item;
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

        $('#itemQtyOrder').on('keyup', () => {
            this.handleQty();
        });
        $('#resetBtn').on('click', () => {
            this.handleClearFunction();
        });

        this.handleTableClickEvent();
        this.handleOrderID();
        //this.handleComboBox();
        this.handDateTime();
        $('#resetBtn').css({visibility:'hidden'});
    }

    handleOrderID() {
        let date = new Date();

        let arr = getAllDB("ORDER");
        if (arr.length === 0) {
            $('#orderId').text(date.getFullYear()+"/"+(+date.getMonth()+1)+"/OID@0001");
            return;
        }
        let old_arr = arr[arr.length - 1]._orderId;
        let data = old_arr.split("@");
        let num = +data[1];
        num++;
        if(data[0]===date.getFullYear()+"/"+date.getMonth()+"/OID"){
            $('#order_id').text(data[0] + String(num).padStart(4, '0'));
        }else {
            data[0]=date.getFullYear()+"/"+(+date.getMonth()+1)+"/OID";
            $('#order_id').text(data[0] + String(num).padStart(4, '0'));
        }

    }

    handDateTime() {
        let date = new Date();
        $('#orderDate').text(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear());
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

    handleItemDetails(itemId) {

        getAllDB("ITEM").map((value) => {
            if (value._itemCode === itemId) {
                item = value;
                $('#itemDesOrder').val(value._description);
                $('#itemPriceOrder').val(value._unitPrice);
                $('#itemQtyOnHandOrder').val(value._qtyOnHand);

                $('#itemCodeCmb').css({borderBottom: "1px solid #ced4da"});
                item = value;
            }
        });
    }

    handleValidation() {

        $('#customerIdCmb :selected').text() === "Choose Customer" ? (alert("Please select the customer details !"), $('#customerIdCmb').focus(), $('#customerIdCmb').css({border:"2px solid red"})) :
            $('#itemIdCmb :selected').text() === "Choose Item" ? (alert("Please select the item details !"), $('#itemIdCmb').focus(), $('#itemIdCmb').css({borderBottom: "2px solid red"})) :
                !/\d+$/.test($('#itemQtyOrder').val()) ? (alert("Qty invalid or empty 7777!"), $('#qty').focus(), $('#qty').css({borderBottom: "2px solid red"})) :
                    parseInt($('#itemQtyOrder').val()) > parseInt($('#itemQtyOnHandOrder').val()) ? (alert("Noo much qty left999 !"), $('#itemQtyOrder').focus(), $('#qty').css({borderBottom: "2px solid red"})) :
                        $('#orderAddBtn').text() === 'Add' ?  (console.log("vv"),this.handleAddItem() ): this.handleUpdateItem();


    }

    handleUpdateItem(){

    }

    handleAddItem(){

        let itemId=$('#itemIdCmb :selected').text();
        let index = this.handleIsExists(itemId);
        console.log(index)

        if (index === -1) {
            orderDetailsArray.push(new Order_Item(item, $('#itemQtyOrder').val(), $('#itemQtyOrder').val() * $('#itemPriceOrder').val()));

        } else if ((parseInt(orderDetailsArray[index]._qty) + parseInt($('#itemQtyOrder').val())) > parseInt($('#itemQtyOnHandOrder').val())) {

            alert("Noo much qty left !");
            $('#itemQtyOrder').focus();
            $('#itemQtyOrder').css({borderBottom: "2px solid red"});

        } else {

            console.log("jjj")
            orderDetailsArray[index]._qty = parseInt(orderDetailsArray[index]._qty) + parseInt($('#itemQtyOrder').val());
            orderDetailsArray[index]._total = parseInt(orderDetailsArray[index]._qty) * parseInt($('#itemPriceOrder').val());


        }


        this.handleLoadTable();
        this.handleClearFunction();
    }

    handleClearFunction(){
        $('#orderAddBtn').text('Add');
        $('#orderAddBtn').css({background: '#157347', border: '#157347'});
        $('#itemDesOrder').val('');
        $('#itemQtyOnHandOrder').val("");
        $('#itemPriceOrder').val("");
        $('#itemQtyOrder').val("");
        $('#resetBtn').css({visibility:'hidden'});
    }

    handleIsExists(itemId) {
        for(let index in orderDetailsArray){
            if(orderDetailsArray[index]._item._itemCode===itemId){
                return index;
            }
        }
        return -1;

    }

    handleSaveOrder() {

        if (orderDetailsArray.length === 0) {
            alert("Please add the order details first !");
            return;
        }

        saveOrderDB(new Order($('#orderId').text(), cus, orderDetailsArray, $('#orderDate').text()));

        orderDetailsArray = [];

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

        orderDetailsArray.map((value) => {
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

        orderDetailsArray.map(value => {
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

            this.handleItemDetails(selectedItemCode);
            $('#itemQtyOrder').val($(event.target).closest('tr').find('td').eq(3).text());

            index = orderDetailsArray.findIndex(value => value._item._itemCode === $("#itemIdCmb :selected").text());

            $('#orderAddBtn').text('Update');
            $('#orderAddBtn').css({
                background: '#5f27cd', border: '#5f27cd'
            });
            $('#resetBtn').css({visibility:'visible'});

        });
    }

    handleQty() {
        if($('#itemQtyOrder').val()>$('#itemQtyOnHandOrder').val()){
            alert('Qty over the Qty On Hand!!!')
        }
    }

    static handleComboBox() {
        $('#itemIdCmb > option').remove();
        $('#customerIdCmb > option').remove();
        $('#itemIdCmb').append("<option>Choose Item</option>");
        $('#customerIdCmb').append("<option>Choose Customer</option>");

        getAllDB("ITEM").map((value) => {
            $('#itemIdCmb').append("<option>" + value._itemCode + "</option>");
        });

        getAllDB("DATA").map((value) => {
            $('#customerIdCmb').append("<option>" + value._id + "</option>");
        });
    }
}

new OrderController();
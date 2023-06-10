import {Order} from "../models/Order.js";
import {getAllDB} from "../db/DB.js";

export class DashBoardController {

    constructor() {
        this.handleTableLoad();
        this.handleLabelData();
    }

    handleTableLoad() {

        getAllDB("ORDER").map(value => {

            let count = value._itemArray.length;

            for (let i = 0; i < count; i++) {

                var row = "<tr>" +
                    "<td>" + value._orderId + "</td>" +
                    "<td>" + value._customer._id + "</td>" +
                    "<td>" + value._itemArray[i]._item._description + "</td>" +
                    "<td>" + value._itemArray[i]._qty + "</td>" +
                    "<td>" + value._itemArray[i]._item._unitPrice + "</td>" +
                    "<td>" + value._itemArray[i]._total + "</td>" +
                    "</tr>";

                $('#tbl tbody').append(row);
            }
        });
    }

    handleLabelData() {

        $('#totalCustomer').text(getAllDB("DATA").length);

        let count = 0;
        var todayIncome = 0;

        var date = new Date();
        var nowDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

        getAllDB("ORDER").map(value => {
            if (value._orderDate === nowDate) {
                for (let i = 0; i < value._itemArray.length; i++) {
                    console.log(value._itemArray[i]._total);
                    todayIncome += parseInt(value._itemArray[i]._total)
                }
                count++;
            }
        });
        $('#todayOrders').text(count);
        $('#todayIncome').text("Rs  "+ todayIncome);
    }
}

new DashBoardController();
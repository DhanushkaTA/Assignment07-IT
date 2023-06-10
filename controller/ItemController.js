import {Item} from "../dto/Item.js";
import {getAllDB, saveItemDB, updateItemDB, deleteItemDB} from "../db/DB.js";

export class ItemController{
    constructor() {
        $('#itemAddBtn').on('click', () => {
            this.handleValidation("Save");
        });
        $('#itemUpdateBtn').on('click', () => {
            this.handleValidation("Update");
        });
        $('#itemDeleteBtn').on('click', () => {
            this.handleValidation("Delete");
        });
        this.handleLoadItem();
        this.handleTableClickEvent();
    }

    handleValidation(Function) {

        !/^(I)([0-9]{2,})$/.test($('#itemId').val()) ? alert("Invalid Item code") : !$('#itemDes').val() ? alert("Description is empty !") :
            !/\d+$/.test($('#itemPrice').val()) ? alert("Invalid unit price or empty !") : !/^\d+$/.test($('#itemQtyOnHand').val()) ? alert("Invalid qty or empty !") :
                Function === "Save" ? this.handleSaveItem() : Function === "Update" ? this.handleUpdateItem() :
                    this.handleDeleteItem();
    }

    handleSaveItem(){

        if (this.handleExistingItem()){
            alert("Item code all ready exists !");
            return;
        }
        saveItemDB(new Item($('#itemId').val(), $('#itemDes').val(), $('#itemPrice').val(), $('#itemQtyOnHand').val()));

        this.handleLoadItem();
    }

    handleUpdateItem(){

        updateItemDB(new Item($('#itemId').val(), $('#itemDes').val(), $('#itemPrice').val(), $('#itemQtyOnHand').val()));

        this.handleLoadItem();
    }

    handleDeleteItem(){

        deleteItemDB(new Item($('#itemId').val(), $('#itemDes').val(), $('#itemPrice').val(), $('#itemQtyOnHand').val()));

        this.handleLoadItem();
    }

    handleLoadItem(){

        $('#itemTable tbody tr td').remove();

        getAllDB("ITEM").map((value) => {
            var row = "<tr>" +
                "<td>" + value._itemCode + "</td>" +
                "<td>" + value._description + "</td>" +
                "<td>" + value._unitPrice + "</td>" +
                "<td>" + value._qtyOnHand + "</td>" +
                "</tr>";

            $('#itemTable tbody').append(row);
        });


        //clearData();
        $('#itemId').val("");
        $('#itemDes').val("");
        $('#itemPrice').val("");
        $('#itemQtyOnHand').val("");

    }

    handleExistingItem(){

        let flag = false;
        getAllDB("ITEM").filter((event) => {
            if (event._itemCode === $('#itemId').val()) {
                flag = true;
            }
        });
        return flag;
    }

    handleTableClickEvent(){

        $('#itemTable tbody').on('click', 'tr', (event) => {
            $('#itemId').val($(event.target).closest('tr').find('td').eq(0).text())
            $('#itemDes').val($(event.target).closest('tr').find('td').eq(1).text())
            $('#itemPrice').val($(event.target).closest('tr').find('td').eq(2).text())
            $('#itemQtyOnHand').val($(event.target).closest('tr').find('td').eq(3).text())

        });
    }
}
new ItemController();
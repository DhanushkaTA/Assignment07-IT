class ItemController{

    constructor() {
        $('#itemAddBtn').on('click',() => {
           this.saveItem()
        });
    }

    saveItem(){
        console.log("save item")
    }
}
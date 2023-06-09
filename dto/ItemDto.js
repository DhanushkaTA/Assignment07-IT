export default class ItemDto{

    constructor() {
    }

    constructor(itemId,itemDes,itemPrice,itemQty) {
        this._itemId=itemId;
        this._itemDes=itemDes;
        this._itemPrice=itemPrice;
        this._itemQty=itemQty;
    }

    get itemId(){
        return this._itemId;
    }

    set itemId(itemID){
        this._itemId=itemID;
    }

    get itemDes(){
        return this._itemDes;
    }

    set itemDes(itemDes){
        this._itemDes=itemDes;
    }

    get itemPrice(){
        return this._itemPrice;
    }

    set itemPrice(itemPrice){
        this._itemPrice=itemPrice;
    }

    get itemQty(){
        return this._itemQty;
    }

    set itemQty(itemQty){
        this._itemQty=itemQty;
    }
}
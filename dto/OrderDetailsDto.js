export default class OrderDetailsDto{

    constructor() {
    }

    constructor(orderDetailsId,itemId,itemQty,itemPrice) {
        this._orderDetailsId=orderDetailsId;
        this._itemId=itemId;
        this._itemQty=itemQty;
        this._itemPrice=itemPrice;
    }

    get orderDetailsId(){
        return this._orderDetailsId
    }

    set orderDetailsId(orderDetailsId){
        this._orderDetailsId=orderDetailsId;
    }

    get itemId(){
        return this._itemId;
    }

    set itemId(itemId){
        this._itemId=itemId;
    }

    get itemQty(){
        return this._itemQty;
    }

    set itemQty(itemQty){
        this._itemQty=itemQty;
    }

    get itemPrice(){
        return this._itemPrice;
    }

    set itemPrice(itemPrice){
        this._itemPrice=itemPrice;
    }
}
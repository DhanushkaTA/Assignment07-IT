export default class OrderDto{

    constructor() {
    }

    constructor(orderId,orderDate,orderPrice,customerID) {
        this._orderID=orderId;
        this._orderDate=orderDate;
        this._orderPrice=orderPrice;
        this.customerID=customerID;
    }

    get orderID(){
        return this._orderID;
    }

    set orderId(orderID){
        this._orderID=orderID;
    }

    get orderDate(){
        return this._orderDate;
    }

    set orderDate(orderDate){
        this._orderDate=orderDate;
    }

    get orderPrice(){
        return this._orderPrice;
    }

    set orderPrice(orderPrice){
        this._orderPrice=orderPrice;
    }

    get customerID(){
        return this.customerID;
    }

    set customerID(customerID){
        this.customerID=customerID;
    }
}
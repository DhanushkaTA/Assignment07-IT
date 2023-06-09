export class CustomerDto {
    constructor(cus_id,cus_name,cus_address,cus_phone) {
        this._cus_id= cus_id;
        this._cus_name=cus_name;
        this._cus_address=cus_address;
        this._cus_phone=cus_phone;
    }

    get cus_id(){
        return this._cus_id;
    }

    set cus_id(cus_id){
        this._cus_id=cus_id;
    }

    get cus_name(){
        return this._cus_name;
    }

    set cus_name(cus_name){
        this._cus_name=cus_name;
    }

    get cus_address(){
        return this._cus_address;
    }

    set cus_address(cus_address){
        this._cus_address=cus_address;
    }

    get cus_phone(){
        return this._cus_phone;
    }

    set cus_phone(cus_phone){
        this._cus_phone=cus_phone;
    }

}

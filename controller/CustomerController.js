// import {getCustomerDB} from "../db/db";

import {CustomerDto} from "../dto/CustomerDto";

class CustomerController{
    constructor() {
        $('#btnCustomerSave').on('click', () => {
            this.saveCustomer();
        });
        $('#btnCustomerDelete').on('click', () => {
            this.deleteCustomer();
        });
        $('#btnCustomerUpdate').on('click', () => {
            this.updateCustomer();
        });
        // $('#btnCustomerSave').click(this.saveCustomer().bind(this))
        // $('#btnCustomerDelete').click(this.deleteCustomer.bind())
        // $('#btnCustomerUpdate').click(this.updateCustomer.bind())
        // this.loadData();
    }

    loadData(){
        let arry=getCustomerDB();
    }


    validateCustomer(){

        var customerId=$('#customerIdNew').val();
        var customerName=$('#customerNameNew').val();
        var customerAddress=$('#customerAddressNew').val();
        var customerPhone=$('#customerContactNew').val();

        const regexNumber=/^\d+$/;

        // if(!regexNumber.test(customerPhone)){
        //     alert("Invaliddb Input")
        // }

        !regexNumber.test(customerPhone) ? alert("Invalid Input") :
            !customerName ? alert("Invalid Input") :
                !customerAddress ? alert("Invalid Input") :
                    !customerPhone ? alert("Invalid") : this.saveCustomer();
    }

    saveCustomer(){

        var customerId=$('#customerIdNew').val();
        var customerName=$('#customerNameNew').val();
        var customerAddress=$('#customerAddressNew').val();
        var customerPhone=$('#customerContactNew').val();

        let customer=new CustomerDto(customerId,customerName,customerAddress,customerPhone);
        console.log(customer.cus_id+" "+customer.cus_name)

        // let pre_dara=localStorage.getItem();
        console.log("Save CustomerDto")
    }

    updateCustomer(){
        console.log("Update CustomerDto")
    }

    deleteCustomer(){
        console.log("Delete CustomerDto")
    }

    loadCustomers(){

    }


}

new CustomerController();
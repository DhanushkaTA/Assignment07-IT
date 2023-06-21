import {OrderController} from "../controller/OrderController.js";

hideAll();
$("#home").css("display","block")

$("#homeBtn").on("click",function (){
    hideAll();
    $("#home").css("display","block")
})

$("#logoBtn").on("click",function (){
    hideAll();
    $("#home").css("display","block")
})

$("#customerBtn").on("click",function (){
    hideAll();
    $("#customer").css("display","block")
})

$("#itemBtn").on("click",function (){
    hideAll();
    $("#item").css("display","block")
})

$("#orderBtn").on("click",function (){
    hideAll();
    $("#order").css("display","block")
    OrderController.handleComboBox();
})

function hideAll(){
    $("#home,#customer,#order,#item").css({
        "display":"none"
    })
}
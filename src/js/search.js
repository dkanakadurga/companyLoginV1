

function search() {
    var obj = { };
    $.ajax({
        url: "http://localhost:49980/api/Authentication/Search?searchTerm=Test",
      
        type: "GET",
        data: {Name, Description, ImageId, Price}
    
        
    }) 
}
$(document).ready(function() {
$('#autocomplete').autocomplete({
    source: function (request, response) {
        
        $.getJSON("http://localhost:49980/api/Authentication/Search?searchTerm=" + request.term, function (data) {
            response($.map(data, function (value, key) {
               
                return {
                    label: value.Name,
                    value: value.Name,
                    object: value
                };
            }));
        });
    },
    select: function( event, ui ) {
        obj = ui.item.object;
//         window.location.href = "http://localhost:49980/api/Authentication/Search?searchTerm="  + obj.Name
      displayItem(obj);
    },
    
    minLength: 2,
    delay: 100
    
});

});

function displayItem(obj){
     console.log(obj);
    $("#itemName").html(obj.Name);
    $("#itemDescription").html(obj.Description);
    $("#itemPrice").html(obj.Price);
    var image = obj.ImageId + '.jpg';
   // var image = "xyz" + '.jpg';
    var imageUrl = "../img/"+image;
    $("#carImg").attr("src", imageUrl );

    var $input = $('<input type="button" id="AddToCart" value="Add to cart" />');
    $input.appendTo($("#AddBtn"));
    $("#AddToCart").click(function(){
       window.location.href=
           "../Html/checkout1.html?itemName=" +obj.Name +"&itemPrice=" +obj.Price +"&carImg=" +obj.ImageId;
 
//       window.location.href = "../Html/checkout1.html"
//        $("#selectName").html(obj.Name);
//         $("#selectPrice").html(obj.Price);
//        $("#selectImage").attr("src", imageUrl);
    })
                         }

    



function displayWithAjax() {
    var obj = {};
    obj.userName = $("#userName").val();
    obj.password = $("#password").val();
   var obj = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "http://localhost:49980/api/Authentication/ValidateUser",
        data: obj,
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if(data.ValidUser === true && data.Reason === "Validated"){
            window.location.href = "/myPage.html"
            }
            else {
                $("#errorMsgText").text("Invalid user name or password");
            }    
            
        },
        error: function () {
            alert("error");
           
        }
    });
}
    
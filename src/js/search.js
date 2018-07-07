

//function search() {
//    var obj = { };
//    $.ajax({
//        url: "http://localhost:51017/api/search?searchTerm=Test",
//      
//        type: "GET",
//        data: {Name, Description, ImageId, Price}
//    
//        
//    }) 
//}

function getRelItems(selectedValue) {
   $.getJSON("http://localhost:51017/api/search/relatedSearch?selectedItem=" + selectedValue, function (data) {
       for(i=0 ; i<data.length ; i++){
          data[i].priceNum = parseFloat(data[i].price);
          }
      displayRelatedItemsWithArray(data);
});
}

function autoCompleteSource(request, response) {
        
$.getJSON("http://localhost:51017/api/search?searchTerm=" + request.term, function (data) {
    response($.map(data, function (value, key) {

        return {
            label: value.name,
            value: value.name,
            object: value
        };
    }));
});
}




$(document).ready(function() {
$("#sortBy").hide();

$('#autocomplete').autocomplete({
    source: autoCompleteSource,
    select: function( event, ui ) {
            obj = ui.item.object;
            displayItem(obj);
            displayRelatedItems(obj.name);
            $("#sortBy").show();
    },
    
    minLength: 2,
    delay: 100
    
});
    
   $("#sortBy").on("change", displayRelatedItems); 
});

function displayItem(obj){
     console.log(obj);
    $("#itemName").html(obj.name);
    $("#itemDescription").html(obj.description);
    $("#itemPrice").html(obj.price);
    var image = obj.imageId + '.jpg';
   // var image = "xyz" + '.jpg';
    var imageUrl = "../img/"+image;
    $("#carImg").attr("src", imageUrl );

    var $input = $('<input type="button" id="AddToCart" value="Add to cart" />');
    $input.appendTo($("#AddBtn"));
    
    $("#AddToCart").click(function(){
        var itemImage = obj.imageId+".jpg";
       window.location.href=
           "../Html/checkout1.html?itemName=" +obj.name +"&itemPrice=" +obj.price +"&carImg=" +itemImage;
 

    })
}

//function displayRelatedItems(selectedValue) {
//    var sortType = $('#sortBy').val();
//     var RelItems = getRelItems(selectedValue);
//   
//}

function displayRelatedItems(selectedValue) {
    if(!selectedValue){
        selectedValue = $("#sortBy").val();
    }
    
    
    getRelItems(selectedValue);
    
    
}

function displayRelatedItemsWithArray(jsonArray){
    var sortType = $('#sortBy').val();
    jsonArray = sortByKey(jsonArray, sortType);
    
    var tbl=$("<table/>").attr("id","mytable");
    $("#div1").contents().remove();
    $("#div1").append(tbl);
    
        for(var i=0;i<jsonArray.length;i++) {
        var tr="<tr>";
        var td1="<td>"+jsonArray[i]["name"]+"</td>";
        var td2="<td>"+jsonArray[i]["price"]+"</td>";
        var itemImage = "../img/"+jsonArray[i].imageId+".jpg";
        console.log(itemImage);
        var td3='<td><img src="'+itemImage+'"></td>';
        var btnId='Add'+i;
        var b = "<td>"+'<input id = '+btnId+' class = "AddBtn" type = "button" value = "Add to cart" />'+"<td></tr>"
        
      
        
       $("#mytable").append(tr+td1+td2+td3+b);
              $("#mytable").css("border", "1px solid #000");
    }
        

        $(".AddBtn").on('click', function(e){
            var jsonArray = getRelatedItems();
             jsonArray = sortByKey(jsonArray, sortType);
            var x= e.currentTarget.id;
            var y= x.split(/(\d+)/)[1];
          
            console.log(y);

          
            
       window.location.href=
           "../Html/checkout1.html?itemName=" +jsonArray[y]["name"]+"&itemPrice=" +jsonArray[y]["price"] +"&carImg=" +jsonArray[y]["ImageId"];
    
    });
}


function sortByKey(array, key) {
    console.log(array);
    console.log(key);
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
    
    
  




function getRelatedItems(selectedValue) {
    //selectedValue will be used to get the related items list
    var jsonArray = [
                {
            Name : "Tesla",
          
            Price  : 600.00,
           
            ImageName: "img3.jpg"
    
        },
        {
            Name : "BMW",
            
            Price  : 700.00,
            
            ImageName: "img1.jpg"
        },
        {
            Name : "Merc Benz",
            
            Price  : 500.00,
            
            ImageName: "img2.jpg"
        }
    ];
    return jsonArray;
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
    
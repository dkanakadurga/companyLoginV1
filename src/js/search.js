

function search() {
    var obj = { };
    $.ajax({
        url: "http://localhost:49980/api/Authentication/Search?searchTerm=Test",
      
        type: "GET",
        data: {Name, Description, ImageId, Price}
    
        
    }) 
}
function autoCompleteSource(request, response) {
        
$.getJSON("http://localhost:49980/api/Authentication/Search?searchTerm=" + request.term, function (data) {
    response($.map(data, function (value, key) {

        return {
            label: value.Name,
            value: value.Name,
            object: value
        };
    }));
});
}

function displayRelatedItems() {
    
    var sortType = $('#sortBy').val();
    var jsonArray = getRelatedItems();
    jsonArray = sortByKey(jsonArray, sortType);
    var tbl=$("<table/>").attr("id","mytable");
    $("#div1").contents().remove();
    $("#div1").append(tbl);
    
//    
//     var image = obj.ImageId + '.jpg';
//   // var image = "xyz" + '.jpg';
//    var imageUrl = "../img/"+image;
//    $("#carImg").attr("src", imageUrl );
   
    for(var i=0;i<jsonArray.length;i++) {
        var tr="<tr>";
        var td1="<td>"+jsonArray[i]["Name"]+"</td>";
        var td2="<td>"+jsonArray[i]["Price"]+"</td>";
        var itemImage = "../img/"+jsonArray[i]["ImageName"];
        console.log(Image);
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
           "../Html/checkout1.html?itemName=" +jsonArray[y]["Name"]+"&itemPrice=" +jsonArray[y]["Price"] +"&carImg=" +jsonArray[y]["ImageName"];
    
    });
        
         
 
   
                    }

$(document).ready(function() {
$("#sortBy").hide();

$('#autocomplete').autocomplete({
    source: autoCompleteSource,
    select: function( event, ui ) {
            obj = ui.item.object;
            displayItem(obj);
            displayRelatedItems();
            $("#sortBy").show();
    },
    
    minLength: 2,
    delay: 100
    
});
    
   $("#sortBy").on("change", displayRelatedItems); 
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
        var itemImage = obj.ImageId+".jpg";
       window.location.href=
           "../Html/checkout1.html?itemName=" +obj.Name +"&itemPrice=" +obj.Price +"&carImg=" +itemImage;
 

    })
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
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
    
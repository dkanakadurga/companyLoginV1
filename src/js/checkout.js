$( document ).ready(function() {
    
    function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    var itemName = getUrlParameter("itemName");
    var itemPrice = getUrlParameter("itemPrice");
    var itemImage = getUrlParameter("carImg");
    $("#selectName").html(itemName);
    $("#selectPrice").html(itemPrice);
    
    var Img= "../img/"+itemImage;
    console.log(Img);
     $("#selectedImage").attr("src", Img);
    
 
  });


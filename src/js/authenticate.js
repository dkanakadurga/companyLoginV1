


function displayWithAjax() {
    var obj = {};
    obj.userName = $("#userName").val();
    obj.password = $("#password").val();
   var obj = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "http://localhost:51017/api/Authentication/ValidateUser",
        data: obj,
        crossDomain: true,
        contentType: "application/json; charset=utf-8", 
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if(data.validUser === true && data.reason === "Validated"){
            window.location.href = "../Html/myPage.html"
            }
            else {
                $("#errorMsgText").text("Invalid user name or password");
            }    
            
        },
        error: function (e) {
            console.log(e);
           
        }
    });
}
    
function displayWithPromise(){
    var promise1 = new Promise(function(resolve, reject) {
          var obj = {};
     obj.userName = $("#userName").val();
     obj.password = $("#password").val();                       
        axios.post("http://localhost:51017/api/Authentication/ValidateUser",  obj , {
            headers: {
                'content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': 'localhost:8080',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'DELETE, PUT, GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                
            }
        });
      resolve(obj); 
    })
    promise1.then(value => {
        console.log(value);
        
    }, reason => {
        console.log(reason);
    });
}
    

    

$( document ).ready(function() {
  // Handler for .ready() called.
   $("#btnLoginSubmit").click(displayWithAjax);

   // $("#btnLoginSubmit").click(displayWithPromise);
    //$("#searchIcon").click()
});

















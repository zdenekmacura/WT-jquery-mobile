var url="http://www.brrr.cz/brrr.php?";


$(document).ready(function(){

$("#registrace").click(function() {

        var fullname=$("#fullname").val();
        var email=$("#email").val();
        var password=$("#password").val();
        var dataString="fullname="+fullname+"&email="+email+"&password="+password+"&registrace=";

        
        if($.trim(fullname).length>0 & $.trim(email).length>0 & $.trim(password).length>0)
        {

            $.ajax({
                type: "GET",
                url: url,
                async: 'true',
                dataType: 'json',
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function(){ $("#registrace").text('Connecting...'); $.mobile.loading('show');},
                complete: function() { $.mobile.loading('hide'); },
                success: function (result){
                    if( result.status == 'success')
                    {
                    $.mobile.changePage("#afterreg"); 
                        }
                    else if( result.status == 'exist')
                    {
                        alert("Hey! You alreay has account! you can login with us");
                    }
                    else if( result.status == 'failed')
                    {
                        alert("Something Went wrong");
                    } 
                }
            });
        }
        return false;
    });

$("#prihlaseni").click(function() {

        var email=$("#email_login").val();
        var password=$("#password_login").val();
        //var dataString="&email_login="+email+"&passwordlogin="+password+"&registrace=";
        var formdata = {prihlaseni: 'yes', email: email, password: password};

        if($.trim(email).length>0 & $.trim(password).length>0)
        {

            $.ajax({
                type: "post",
                url: url,
                async: 'true',
                dataType: 'json',
                data: formdata,
                crossDomain: true,
                cache: false,
                beforeSend: function(){ $("#prihlaseni").text('Connecting...'); $.mobile.loading('show');},
                complete: function() { $.mobile.loading('hide'); $("#regbuttontext").text('Prihlasit se') },
                success: function (result){
                    
                    if( result.status == 'success')
                    {
                        $.mobile.changePage("#afterreg"); 
                    }
                    else if( result.status == 'failed')
                    {
                        alert("user name and/or password are invalid");
                    } 
                }
            });
        }
        return false;
    });
});


/*var userHandler = {
    username : '',
    status : ''
}
 
$(document).on('pagecontainershow', function (e, ui) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    if(activePage.attr('id') === 'login') {
        $(document).on('click', '#submit', function() { // catch the form's submit event
            if($('#username').val().length > 0 && $('#password').val().length > 0){
             
                userHandler.username = $('#username').val();
             
                // Send data to server through the Ajax call
                // action is functionality we want to call and outputJSON is our data
                $.ajax({url: 'auth.php',
                    data: {action : 'authorization', formData : $('#check-user').serialize()},
                    type: 'post',                  
                    async: 'true',
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show'); // This will show Ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete   
                        $.mobile.loading('hide'); // This will hide Ajax spinner
                    },
                    success: function (result) {
                        // Check if authorization process was successful
                        if(result.status == 'success') {
                            userHandler.status = result.status;
                            $.mobile.changePage("#second");                        
                        } else {
                            alert('Logon unsuccessful!');
                        }
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Network error has occurred please try again!');
                    }
                });                  
            } else {
                alert('Please fill all necessary fields');
            }          
            return false; // cancel original event to prevent form submitting
        });  
    } else if(activePage.attr('id') === 'second') {
        activePage.find('.ui-content').text('Wellcome ' + userHandler.username);
    }
});
 
$(document).on('pagecontainerbeforechange', function (e, ui) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    if(activePage.attr('id') === 'second') {
        var to = ui.toPage;
         
        if (typeof to  === 'string') {
            var u = $.mobile.path.parseUrl(to);
            to = u.hash || '#' + u.pathname.substring(1);
              
            if (to === '#login' && userHandler.status === 'success') {
                alert('You cant open a login page while youre still logged on!');
                e.preventDefault();
                e.stopPropagation();
                  
                // remove active status on a button if a transition was triggered with a button
                $('#back-btn').removeClass('ui-btn-active ui-shadow').css({'box-shadow':'0 0 0 #3388CC'});
            } 
        }
    }
});*/
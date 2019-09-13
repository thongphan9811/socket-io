const socket = io("http://localhost:4000")

socket.on("server-send-dki-thatbai",function(){
    alert("user da ton tai");
    $("#loginForm").show(1000);
});

socket.on("server-send-dki-thanhcong",function(data){
    $("currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);

})

socket.on("server-send-danhsach-User",function(data){
    $("#boxContent").html("");
    data.forEach(i => {
        $("#boxContent").append("<div class='User'>"+i+"</div>");
    });
});

socket.on("server-send-Mess",function(data){
    $("#listMess").append("<div class='nd'>"+data.user+":"+data.mess+"</div>");
})

$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(function(){
        socket.emit("client-send-Username",$("#txtUsername").val());
    });

    $("#txtMess").focusin(function(){
        socket.emit("toi-dang-go-tin");
    })

    $("#txtMess").focusout(function(){
        socket.emit("toi-stop-go-tin");
    })

    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(1000);
        $("#chatForm").hide(1000);
    });
    $("#btnSendMess").click(function(){
        socket.emit("user-send-Mess",$("#txtMess").val());
    });
});

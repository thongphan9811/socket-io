const express = require('express');
const app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

const server = require("http").Server(app);
const io  = require("socket.io")(server);
server.listen(4000);

var arrUSer=[];

io.on("connection",function(socket){
    console.log("co nguoi ket noi" + socket.id);
    socket.on("client-send-Username",function(data){
        if(arrUSer.indexOf(data)>=0){
            socket.emit("server-send-dki-thatbai");
        }
        console.log(data);
        socket.Username = data;
        arrUSer.push(data);
        socket.emit("server-send-dki-thanhcong",data);
        io.sockets.emit("server-send-danhsach-User",arrUSer);
    });
    socket.on("logout",function(){
        arrUSer.splice(arrUSer.indexOf(socket.Username),1);
        socket.broadcast.emit("server-send-danhsach-User",arrUSer);
    });
    socket.on("user-send-Mess",function(data){
        io.sockets.emit("server-send-Mess",{user :socket.Username , mess:data});
    });
    socket.on("toi-dang-go-tin",function(){
        
    })
})

app.get("/",function(req,res){
    res.render("trangchu");
});


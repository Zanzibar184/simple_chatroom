var username = "user";


function add_msg(){ //add element to list-box aka add message
    if (document.getElementById("input-box").value.length !== 0)
    {
        var text = document.getElementById("input-box").value;

        socket.emit('new_msg', {msg: text, user: username});


        axios.post('/', {action: "insert",msg: text, user: username})
            .then(function(response){
               // console.log("from node.js: " + response.data.msg);
            });

        document.getElementById("input-box").value=null;
    }
}

function clear_db(){ //delete the history from db
    axios.post('/', {action: "clear"});
}

function set_username(){

    username = document.getElementById("username").value;
    console.log("username: " + username);

}

function refresh_history(){
    axios.get('/chat')
        .then(function(messages) {
            messages.data.forEach(function (msg) {
                append_new_message(msg['text'],msg['user']);
            });
        });
}





function scroll_bottom(){ //keep scrollbar on bottom
    var objDiv = document.getElementById("list-box");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function append_new_message(text, user){

    var ul = document.getElementById("list-box");
    var li = document.createElement("li");

    li.appendChild(document.createTextNode(user + ":  " +text));
    li.setAttribute("class", "list-group-item");
    ul.appendChild(li);

}
function clear_board(){
    document.getElementById("list-box").innerHTML= null;
}









function add_msg(){ //add element to list-box aka add message
    if (document.getElementById("input-box").value.length !== 0)
    {
        var text = document.getElementById("input-box").value;

        socket.emit('new_msg', {msg: text});


        axios.post('/', {msg: text})
            .then(function(response){
               // console.log("from node.js: " + response.data.msg);
            });

        document.getElementById("input-box").value=null;
    }

}

function scroll_bottom(){ //keep scrollbar on bottom
    var objDiv = document.getElementById("list-box");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function append_new_message(text){

    var ul = document.getElementById("list-box");
    var li = document.createElement("li");

    li.appendChild(document.createTextNode(text));
    li.setAttribute("class", "list-group-item");
    ul.appendChild(li);

}






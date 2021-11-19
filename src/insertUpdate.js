import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'


// first I'm gonna create an espace to the client to create new names and add it to localStorage
// I'll create random key for every name with length of 7 to create new name each time
// display an error message if the name is not validated
// second I'll get a the list from locale sotrage
// for delete button I'll delete the button by deleting the key in localStorage
// edit will set the name in the input above, also the button "add" will be changed to "Edit"
// then I'll send an attribute "key" with Edit function to see if the value of the input is coming from edit button or not
// so if is come from edit button I'll use the same key in setItem function to update the name, if not I'll use random name
// the page will be reloaded each time to see the changes
// clear all will clear all the localstorage keys


const Cruid = () =>{
    // get names from localStorage
    let names = [];
    for(let i = 0; i < localStorage.length; i++){
        names.push(<List key={i} name={localStorage.getItem(localStorage.key(i))} key_name={localStorage.key(i)} />);
    }
    return (
        <>
            <div className="divAbove">
                <div className="divInp">
                    <input type="text" id="inpName" className="inpName" placeholder="Enter name here..."/>
                    <button className="btnAdd" onClick={handleAddClick}>Add</button>
                </div>
                <div className="divMsgAlert">
                    <p></p>
                </div>
            </div>
            {
                names.map(v => v)
            }
            <MsgEmptyOrClear />
        </>
    )
}
    
/* check if the localstorage is empty or not, if it's empty display message to add names,
if it's not display clear all button */
const MsgEmptyOrClear = () => {
    if(localStorage.length > 0){
        return <button className="btnClearAll" onClick={handleClearAll}>Clear All Names</button>;
    }
    else return <h3 className="h3Empty">Your list is empty!</h3>
}

// list raw
const List = (props) => {
    return (
        <>
            <div className="divList">
                <p>{props.name}</p>
                <button className="btnEdit" edit_key_name={props.key_name} val_name={props.name} onClick={handleButtonEdit}>
                    <FontAwesomeIcon icon={faEdit}/>
                </button>
                <button className="btnDelete" del_key_name={props.key_name} onClick={handleButtonDelete}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>
            </div>
        </>
    )
}

// Add name
const handleAddClick = (e) => {
    const name = document.getElementById("inpName").value;
    const msgAlert = document.querySelector(".divMsgAlert");
    // value validation
    if(name.length === 0 || name.length > 30){
        // display the err message
        msgAlert.style.display = "inline-block";
        displayOffAlert(msgAlert,5000)
        msgAlert.style.backgroundColor = "rgb(255, 170, 170)";
        // add a custom text to the p tag of this div
        msgAlert.children[0].innerHTML = "Name should contains between 0-30 character!";
    }
    else if(e.currentTarget.getAttribute("key_name")){
        // set new name for the same key to be apdated
        localStorage.setItem(e.currentTarget.getAttribute("key_name"),name);
        // reload the page to see the changes
        window.location.reload();
    }
    else{
        // insert new value in local sotrage
        localStorage.setItem(genRandName(),name);
        // reload the page
        window.location.reload();
    }
}

// delete name
const handleButtonDelete = (e) => {
    // get the key of the item in localstorag, i stored it as an attribute of the button
    const keyName = e.currentTarget.getAttribute("del_key_name");
    localStorage.removeItem(keyName);
    // reload to see he changes
    window.location.reload();
}

// edit name
const handleButtonEdit = (e) => {
    // the box of errors if the name is not validated
    const msgAlert = document.querySelector(".divMsgAlert");
    // the key of the item which would be change
    const keyName = e.currentTarget.getAttribute("edit_key_name");
    // the name which will be changed
    const name = e.currentTarget.getAttribute("val_name");
    // set the input value to equal the name to make edit it
    document.getElementById("inpName").value = name;
    // console.log(inp);
    // change the button add to edit
    const btnEdit = document.querySelector(".btnAdd");
    btnEdit.innerHTML = "Edit";
    btnEdit.style.backgroundColor = "green";
    // add an attribute to store on it the name key (I'll use it above to check if it's new name or an existing name)
    btnEdit.setAttribute("key_name",keyName);
}

// clear all
const handleClearAll = () => {
    // clear all key from localstorage
    localStorage.clear();
    // realoed to see the changes
    window.location.reload();
}

// display off the alert msg after specific time
const displayOffAlert = (elmnt,periode) => {
    setTimeout(() => elmnt.style.display = "none", periode)
}

// generate new name to use it as a key in localstorage
const genRandName = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_", nameLength = 6;
    let name = "";
    for(let i = 0; i < nameLength; i++){
        let randChar = Math.floor(Math.random() * chars.length);
        name += chars.substring(randChar,randChar+1)
    }
    return name;
}

export default Cruid; 
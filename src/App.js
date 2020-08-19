import React, { useState, useEffect } from "react";
import { IconButton, FormControl, InputLabel, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

function App() {
    // useState = variable, short-time memory
    // useEffect = run code on a condition (условие)

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    // this is listener
    useEffect(() => {
        // run once when the app component loads
        db.collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        message: doc.data(),
                    }))
                );
            });
    }, []);

    useEffect(() => {
        // run code here...
        // if its blank inside [], this code runs ONCE when the app component loads
        // if we have a variable like input, it runs every time input changes

        // const name = prompt("Please enter your name");
        setUsername(prompt("Please enter your name"));
    }, []); // condition

    const sendMessage = (event) => {
        // all the logic to send the message goes here
        event.preventDefault();

        db.collection("messages").add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setMessages([...messages, { username: username, message: input }]);
        setInput("");
    };

    return (
        <div className="App">
            <img
                alt="messenger logo"
                src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
            />
            <h1>Messenger (but its clone)</h1>
            <h2>Welcome, {username}</h2>

            <form className="app__form">
                <FormControl>
                    <Input
                        autoFocus="true"
                        placeholder="How its going?"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <IconButton
                        type="submit"
                        disabled={!input}
                        onClick={sendMessage}
                    >
                        <SendRoundedIcon />
                    </IconButton>
                </FormControl>
            </form>

            <div className="message__block">
                {messages.map(({ id, message }) => (
                    <Message key={id} username={username} message={message} />
                ))}
            </div>
        </div>
    );
}

export default App;

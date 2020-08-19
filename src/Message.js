import React, { forwardRef, useRef, useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Message.css";
import HeadShake from "react-reveal/HeadShake";

const Message = forwardRef(({ message, username }, ref) => {
    const isUser = username === message.username;

    const endOfMessages = useRef(true);

    const scrollToBottom = () => {
        endOfMessages.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [message.message]);

    return (
        <HeadShake>
            <div
                key={message.message}
                className={`message ${isUser && "message__user"}`}
            >
                <Typography
                    style={{ textAlign: "left", fontSize: "0.7em" }}
                    color="textSecondary"
                >
                    {!isUser && message.username}
                </Typography>
                <Card
                    className={
                        isUser ? "message__userCard" : "message__guestCard"
                    }
                >
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {message.message}
                        </Typography>
                    </CardContent>
                </Card>
                <div ref={endOfMessages} />
            </div>
        </HeadShake>
    );
});

export default Message;

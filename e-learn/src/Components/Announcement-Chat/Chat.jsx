import classes from './chat.module.css';
import { useState, useRef, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa6';
import img from '../../assets/avatar.jpg'
import ChatItem from './ChatItem';
export default function Chat() {
    // const [messages, setMessages] = useState([]);
    // const [newMessage, setNewMessage] = useState('');
    // const messagesEndRef = useRef(null);

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messages]);

    // const sendMessage = () => {
    //     if (newMessage.trim() === '') return;

    //     const message = {
    //         id: messages.length + 1,
    //         content: newMessage,
    //         sender: 'user',
    //         timestamp: new Date().toLocaleTimeString(),
    //     };

    //     // Add new message to the beginning of the array to appear at the bottom
    //     setMessages([message, ...messages]);
    //     setNewMessage('');
    // };

    // const handleInputChange = (event) => {
    //     setNewMessage(event.target.value);
    // };

    // return (
    //     <div className={classes.chat}>
    //         <div className="content__header">
    //             <div className="blocks">
    //                 <div className="current-chatting-user">
    //                     <img className={classes.img} src={img}></img>
    //                     <p>Tim Hover</p>
    //                 </div>
    //             </div>
    //             <div className="blocks">
    //                 <div className="settings">
    //                     <FaIcons.FaHandDots></FaIcons.FaHandDots>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className={classes.content__body}>
    //             <div className={classes.chat__items}>
    //                 {messages.map((message) => ( // Reverse order
    //                     <div
    //                         key={message.id}
    //                         className={`${classes.message} ${message.sender === 'user' ? classes.sender : classes.receiver}`}
    //                     >
    //                         <p>{message.content}</p>
    //                         <span className={classes.timestamp}>{message.timestamp}</span>
    //                     </div>
    //                 ))}
    //             </div>
    //             <div ref={messagesEndRef} />
    //         </div>
    //         <div className={classes.content__footer}>
    //             <div className={classes.write_message}>
    //                 <FaIcons.FaPlus className={classes.plus} />
    //                 <input
    //                     onChange={handleInputChange}
    //                     value={newMessage}
    //                     type='text'
    //                     placeholder='Type your message...'
    //                 />
    //                 <FaIcons.FaPaperPlane onClick={sendMessage} className={classes.send_icon} />
    //             </div>
    //         </div>
    //     </div>
    // );

    const messagesEndRef = useRef(null);

    const initialChatItems = [
        {
            key: 1,
            image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            type: "",
            msg: "Hi Tim, How are you?",
        },
        {
            key: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
            type: "other",
            msg: "I am fine.",
        },
        {
            key: 3,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
            type: "other",
            msg: "What about you?",
        },
        {
            key: 4,
            image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            type: "",
            msg: "Awesome these days.",
        },
        {
            key: 5,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
            type: "other",
            msg: "Finally. What's the plan?",
        },
        {
            key: 6,
            image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            type: "",
            msg: "what plan mate?",
        },
        {
            key: 7,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
            type: "other",
            msg: "I'm talking about the tutorial",
        },
    ];

    const [chat, setChat] = useState(initialChatItems);
    const [msg, setMsg] = useState("");

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 13 && msg !== "") {
                addMessage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        scrollToBottom();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [msg]);

    const handleChange = (e) => {
        setMsg(e.target.value);
    };

    const addMessage = () => {
        if (msg !== "") {
            const newChatItem = {
                key: chat.length + 1,
                type: "",
                msg: msg,
                image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            };
            setChat((prevChat) => [...prevChat, newChatItem]);
            setMsg("");
            scrollToBottom();
        }
    };

    return (
        <div className={classes.main__chatcontent}>
            <div className={classes.content__header}>
                <div className={classes.blocks}>
                    <div className={classes.current_chatting_user}>
                        <img className={classes.img} src={img}></img>
                        <p>Tim Hover</p>
                    </div>
                </div>

                <div className={classes.blocks}>
                    <div className={classes.settings}>
                        <button className={classes.btn_nobg}>
                            <i className="fa fa-cog"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.content__body}>
                <div className={classes.chat__items}>
                    {chat.map((itm, index) => (

                        <ChatItem
                            animationDelay={index + 2}
                            key={itm.key}
                            user={itm.type ? itm.type : "me"}
                            msg={itm.msg}
                            image={itm.image}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className={classes.content__footer}>
                <div className={classes.sendNewMessage}>
                    <button className={classes.addFiles}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message here"
                        onChange={handleChange}
                        value={msg}
                    />
                    <button className={classes.btnSendMsg} id="sendMsgBtn" onClick={addMessage}>
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

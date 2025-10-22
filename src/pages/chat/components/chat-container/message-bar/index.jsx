import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useState, useRef, useEffect } from "react";

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const { userInfo, selectedChatData, selectedChatType } = useAppStore();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact" ) {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        context: message.trim(),
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
     
      setMessage("");
    }
    else if(selectedChatType==="channel"){
        socket.emit("send-channel-message",{
        sender: userInfo.id,
        context: message.trim(),
        messageType: "text",
        fileUrl: undefined,
        channelId:selectedChatData._id,

        })
      }
  };

  const handleAttachementClick = () => {
    fileInputRef.current?.click();
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, { withCredentials: true });
        if (response.status === 200 && response.data) {
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              context: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath,
            });
          }
          else if(selectedChatType==="channel"){
                socket.emit("send-channel-message", {
                  sender: userInfo.id,
                  context: undefined,
                  channelId: selectedChatData._id,
                  messageType: "file",
                  fileUrl: response.data.filePath,
                });
              }
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    // reduced height and left-aligned icon layout
    <div className="h-[10vh] bg-[#1c1d25] flex items-center justify-center px-8 gap-6 mb-6">
      <div className="flex-1 flex items-center  bg-[#2a2b33] rounded-md pr-5 gap-5">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Message"
          className="flex-1 bg-transparent rounded-md focus:outline-none focus:border-none p-5"
         
        />
        {/* attachment and emoji on the left */}
        <button
          className="text-neutral-500 focus:outline-none transition-all focus:text-white duration-300 focus:border-none"
          onClick={handleAttachementClick}
        >
          <GrAttachment className="text-2xl" />
        </button>

        <input type="file" ref={fileInputRef} className="hidden" onChange={handleAttachmentChange} />

        <div className="relative">
          <button
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          className="text-neutral-500 focus:outline-none transition-all focus:text-white duration-300 focus:border-none"
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>

          {emojiPickerOpen && (
            <div className="absolute bottom-16 right-0" ref={emojiRef}>
              <EmojiPicker theme="dark" onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
            </div>
          )}
        </div>

        {/* message input grows and stays to the right of the left icons */}
        
      </div>

      {/* send button stays to the far right */}
      <button
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:outline-none transition-all hover:bg-[#741bda] focus:border-none duration-300 focus:text-white focus:bg-[#741bda]"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;

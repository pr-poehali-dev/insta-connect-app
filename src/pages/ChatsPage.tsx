import { useState } from "react";
import Icon from "@/components/ui/icon";
import { chats } from "@/data/mockData";

interface Message {
  id: number;
  from: string;
  text: string;
  time: string;
}

interface Chat {
  id: number;
  user: { name: string; avatar: string; online: boolean };
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

export default function ChatsPage() {
  const [openChat, setOpenChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>(
    Object.fromEntries(chats.map(c => [c.id, c.messages]))
  );

  const sendMessage = () => {
    if (!message.trim() || !openChat) return;
    const newMsg: Message = {
      id: Date.now(),
      from: "me",
      text: message,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
    };
    setChatMessages(prev => ({
      ...prev,
      [openChat.id]: [...(prev[openChat.id] || []), newMsg],
    }));
    setMessage("");
  };

  if (openChat) {
    const msgs = chatMessages[openChat.id] || [];
    return (
      <div className="flex flex-col h-full animate-slide-up">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 flex-shrink-0 border-b border-border">
          <button onClick={() => setOpenChat(null)} className="text-muted-foreground">
            <Icon name="ArrowLeft" size={22} />
          </button>
          <div className="relative">
            <img src={openChat.user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
            {openChat.user.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-background" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{openChat.user.name}</p>
            <p className="text-xs text-green-400">{openChat.user.online ? "в сети" : "не в сети"}</p>
          </div>
          <button className="text-muted-foreground">
            <Icon name="Phone" size={20} />
          </button>
          <button className="text-muted-foreground">
            <Icon name="Video" size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {msgs.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} animate-fade-up opacity-0`}
              style={{ animationDelay: `${i * 0.03}s`, animationFillMode: "forwards" }}
            >
              {msg.from !== "me" && (
                <img src={openChat.user.avatar} className="w-7 h-7 rounded-full object-cover mr-2 flex-shrink-0 self-end" alt="" />
              )}
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.from === "me"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-white/60" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 px-4 py-3 pb-6 border-t border-border flex-shrink-0">
          <button className="text-muted-foreground">
            <Icon name="Plus" size={22} />
          </button>
          <div className="flex-1 flex items-center bg-muted rounded-2xl px-4 py-2.5">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Сообщение..."
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button className="text-muted-foreground">
              <Icon name="Smile" size={18} />
            </button>
          </div>
          <button
            onClick={sendMessage}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
          >
            <Icon name="Send" size={18} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 flex-shrink-0 flex items-center justify-between">
        <h2 className="text-xl font-bold">Сообщения</h2>
        <button className="text-primary">
          <Icon name="PenSquare" size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {chats.map((chat, i) => (
          <button
            key={chat.id}
            onClick={() => setOpenChat(chat as Chat)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors animate-fade-up opacity-0"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
          >
            <div className="relative">
              <img src={chat.user.avatar} className="w-14 h-14 rounded-full object-cover" alt="" />
              {chat.user.online && (
                <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-background" />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between mb-0.5">
                <p className="font-semibold text-sm">{chat.user.name}</p>
                <p className="text-xs text-muted-foreground">{chat.time}</p>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <span className="w-5 h-5 bg-primary rounded-full text-[10px] text-white flex items-center justify-center font-bold flex-shrink-0">
                {chat.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaUser, FaHistory, FaTimes } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";

// Themed blobs and ripples
function RippleBG({ className = "" }) {
  return (
    <svg viewBox="0 0 800 600" className={`absolute left-0 top-0 w-full h-full z-0 pointer-events-none ${className}`}>
      <circle cx="400" cy="250" r="160" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.09" />
      <circle cx="400" cy="250" r="235" fill="none" stroke="#a7f3d0" strokeWidth="1.8" opacity="0.07" />
      <circle cx="400" cy="250" r="320" fill="none" stroke="#a5b4fc" strokeWidth="2" opacity="0.06" />
    </svg>
  );
}
function Blob({ className, color }) {
  return (
    <svg viewBox="0 0 200 200" className={`absolute ${className}`}>
      <motion.path
        d="M43.6,-57.2C58.3,-51.9,73.7,-43.4,76.9,-31.2C80.1,-18.9,71,-3,62.1,12.4C53.1,27.8,44.3,42.8,32.1,50.2C20,57.5,4.6,57.2,-13.1,57.8C-30.7,58.5,-50.5,60.1,-57.5,50.2C-64.4,40.3,-58.6,19,-55.4,1.2C-52.1,-16.5,-51.3,-33,-43.4,-41.8C-35.4,-50.6,-20.2,-51.6,-6.5,-48.6C7.2,-45.5,14.3,-38.4,23,-36.1C31.8,-33.7,43.6,-57.2,43.6,-57.2Z"
        fill={color}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </svg>
  );
}

// History persistence (can be localStorage)
function useChatHistory() {
  const [history, setHistory] = useState([]);
  const addConversation = conv => setHistory(hist => [conv, ...hist.slice(0, 19)]);
  return { history, addConversation };
}

const BOT_NAME = "DivyaBot";

export default function ChatBotObys() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! How can I help you with your studies today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("New Chat");
  const containerRef = useRef(null);
  const { history, addConversation } = useChatHistory();

  // --- CONFIGURE ME! ---
  const API_URL = "<YOUR_API_ENDPOINT>";
  const API_KEY = "<YOUR_API_KEY>";

  async function sendMessage(e) {
    e && e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input.trim() };
    setMessages(msgs => [...msgs, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "sonar-pro",
          messages: [
            { role: "system", content: "You are a very friendly, fun, and helpful school AI for children in India." },
            ...messages.map(m =>
              m.sender === "user"
                ? { role: "user", content: m.text }
                : { role: "assistant", content: m.text }
            ),
            { role: "user", content: userMessage.text }
          ]
        })
      });
      const data = await response.json();
      const botReply = data?.choices?.[0]?.message?.content ||
        data?.text ||
        "Sorry, I couldn't understand. Can you try again?";
      setMessages(msgs => {
        const newConv = [...msgs, userMessage, { sender: "bot", text: botReply }];
        addConversation({
          title: newConv.find(x => x.sender === "user")?.text?.slice(0, 30) || "Conversation",
          conv: newConv
        });
        return newConv;
      });
    } catch (err) {
      setMessages(msgs => [
        ...msgs,
        { sender: "bot", text: "Sorry, I could not get a response. Please try again in a bit!" }
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
      }, 200);
    }
  }

  function startNewChat() {
    setMessages([
      { sender: "bot", text: "👋 Hi! How can I help you with your studies today?" }
    ]);
    setCurrentTitle("New Chat");
    setShowHistory(false);
  }

  function loadHistory(conv) {
    setMessages(conv);
    setShowHistory(false);
    setCurrentTitle(conv.find(x => x.sender === "user")?.text?.slice(0, 22) || "Chat");
    setTimeout(() => {
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, 150);
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-tr from-[#eefff9] via-sky-300 to-emerald-100 dark:from-[#11182a] dark:via-blue-950 dark:to-emerald-950 flex items-stretch pt-24 relative transition-colors duration-300 overflow-hidden">
      <Blob className="top-[-35px] left-[-90px] w-[290px] opacity-45 z-0" color="#7dd3fc" />
      <Blob className="bottom-[-80px] right-[-66px] w-[260px] opacity-30 z-0" color="#bae6fd" />
      <RippleBG />

      {/* History: md+ sidebar, mobile drawer */}
      <aside className="hidden md:flex flex-col w-64 border-r border-cyan-300 bg-cyan-100/70 dark:bg-cyan-950/80 p-2 pt-6 z-10 space-y-2">
        <button
          onClick={startNewChat}
          className="flex items-center gap-2 px-5 py-3 bg-cyan-600 rounded-full mb-4 font-bold text-white transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <HiOutlineSparkles /> New Chat
        </button>
        <div className="font-semibold text-cyan-700 dark:text-cyan-200 mb-2 pl-2">History</div>
        <div className="overflow-y-auto flex-1 space-y-2 pr-1">
          {history.length === 0 && (
            <div className="pl-2 text-cyan-400/60 text-sm">No chat history yet</div>
          )}
          {history.map((h, i) => (
            <button
              key={i}
              className="w-full text-left px-4 py-3 rounded-xl transition flex items-center gap-2
                bg-cyan-200/60 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-400 dark:hover:bg-cyan-800"
              onClick={() => loadHistory(h.conv)}
            >
              <FaHistory /> {h.title}
            </button>
          ))}
        </div>
      </aside>
      
      {/* Main chat area */}
      <div className="flex flex-col flex-1 max-w-xl mx-auto relative bg-white/90 dark:bg-cyan-950/90 ring-2 ring-cyan-700/10
        shadow-2xl rounded-3xl z-20 overflow-hidden">
        {/* Floating history button mobile */}
        <button
          className="md:hidden absolute top-2 right-4 z-30 bg-cyan-500 hover:bg-cyan-700 text-white rounded-full p-3 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-cyan-300"
          onClick={() => setShowHistory(true)}
          aria-label="View chat history"
        >
          <FaHistory size={22} />
        </button>
        {/* Animated header bot bubble */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12 }}
          className="flex items-center justify-center gap-3 bg-gradient-to-tr from-cyan-200/80 via-[#dbeafe]/80 to-emerald-200/80 dark:from-cyan-900/80 dark:via-blue-900/50 dark:to-cyan-950/80 w-full py-6 rounded-t-3xl shadow z-20"
        >
          <FaRobot className="text-cyan-500 dark:text-cyan-200 text-3xl animate-bounce-slow" />
          <span className="font-black text-xl md:text-2xl text-cyan-900 dark:text-cyan-100 tracking-wider drop-shadow">{BOT_NAME}</span>
        </motion.div>
        <div className="text-center text-base text-cyan-500 dark:text-cyan-200 pb-1 mb-2 pt-1 truncate max-w-[90%] mx-auto">{currentTitle}</div>
        {/* Message area */}
        <div ref={containerRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-4 transition bg-transparent"
          style={{ maxHeight: 440, minHeight: 260 }}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    flex items-center gap-2 rounded-2xl px-4 py-3 transition-all
                    ${msg.sender === "user"
                      ? "bg-gradient-to-tr from-blue-400 via-sky-300 to-cyan-300 text-white font-bold shadow-lg"
                      : "bg-white/92 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 font-medium shadow"
                    }
                    max-w-[82%]
                  `}
                >
                  <span>
                    {msg.sender === "user"
                      ? <FaUser className="inline mr-1 text-cyan-100" />
                      : <FaRobot className="inline mr-1 text-cyan-400" />}
                  </span>
                  <span style={{ wordBreak: "break-word" }}>{msg.text}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 mt-1 text-cyan-500"
            >
              <FaRobot className="animate-spin" /> <span>...</span>
            </motion.div>
          )}
        </div>
        {/* Input area */}
        <form onSubmit={sendMessage} className="w-full p-5 flex gap-2 items-center bg-blue-100/20 dark:bg-cyan-950/60 rounded-b-3xl">
          <input
            type="text"
            className="flex-1 rounded-2xl py-3 px-5 font-semibold text-lg bg-white/90 dark:bg-cyan-900/50 text-cyan-900 dark:text-cyan-100 shadow focus:ring-2 focus:ring-cyan-300 transition-all"
            placeholder="Type your question..."
            value={input}
            autoFocus
            disabled={loading}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) sendMessage(e);
            }}
          />
          <button
            type="submit"
            className={`p-3 rounded-full bg-cyan-600 text-white text-2xl font-bold transition hover:bg-emerald-400 shadow-lg ${loading && "opacity-50 cursor-not-allowed"}`}
            disabled={loading}
            aria-label="Send"
          >
            <IoSend />
          </button>
        </form>
      </div>

      {/* Mobile history drawer */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.33 }}
            className="fixed inset-0 bg-cyan-900/80 z-40 flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between bg-cyan-700/90 px-6 py-5">
              <span className="text-lg font-bold text-white flex items-center gap-2"><FaHistory /> History</span>
              <button onClick={() => setShowHistory(false)} className="p-2 rounded-full bg-cyan-800 hover:bg-cyan-900 transition">
                <FaTimes className="text-white text-xl" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 px-2 py-2">
              <button
                onClick={startNewChat}
                className="flex items-center gap-2 px-5 py-3 bg-cyan-600 rounded-full mb-3 font-bold text-white transition hover:bg-cyan-400 w-full"
              >
                <HiOutlineSparkles /> New Chat
              </button>
              {history.length === 0 && (
                <div className="pl-2 text-cyan-200/70 text-sm mt-4">No chat history yet</div>
              )}
              {history.map((h, i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-3 rounded-xl transition flex items-center gap-2
                    bg-cyan-700 text-cyan-100 hover:bg-cyan-600"
                  onClick={() => loadHistory(h.conv)}
                >
                  <FaHistory /> {h.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

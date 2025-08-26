import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFutbol, FaFlask, FaPaintBrush, FaBrain, FaUsers, FaPlus } from "react-icons/fa";

// Example static events - swap with backend fetch!
const eventTypes = [
  { key: "sports", label: "Sports", icon: <FaFutbol /> },
  { key: "quiz", label: "Quiz", icon: <FaBrain /> },
  { key: "science", label: "Science", icon: <FaFlask /> },
  { key: "art", label: "Art", icon: <FaPaintBrush /> },
  { key: "other", label: "Other", icon: <FaUsers /> }
];

const sampleEvents = [
  {
    title: "Inter-School Football Championship",
    type: "sports",
    date: "2025-09-22",
    time: "9:00 AM",
    org: "St. Xavier’s School, Patna",
    desc: "Boys & girls (U-14/U-16). Free snacks. All are welcome!",
    location: "Stadium Ground"
  },
  {
    title: "Regional Science Olympiad",
    type: "science",
    date: "2025-09-25",
    time: "10:00 AM",
    org: "DAV Public School",
    desc: "Quiz & exhibits for classes 6-10. Winners go to Nationals.",
    location: "DAV Public School Hall"
  },
  {
    title: "Art Splash - Drawing Contest",
    type: "art",
    date: "2025-09-20",
    time: "11:30 AM",
    org: "KidzArt Society",
    desc: "Open for all classes; paint theme: 'Festival of Colors'",
    location: "City Art Center"
  },
  {
    title: "General Knowledge Quiz",
    type: "quiz",
    date: "2025-09-28",
    time: "12:00 PM",
    org: "Model School",
    desc: "Teams of 2 from any grade, win cool prizes!",
    location: "Model School Auditorium"
  },
  {
    title: "Chess Challenge",
    type: "other",
    date: "2025-09-23",
    time: "10:00 AM",
    org: "Chess Academy",
    desc: "Knockout, U-18. Trophy & certificates for all!",
    location: "Chess Academy Room 5"
  }
];

function formatDate(date) {
  // Format e.g. 'Sep 23'
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: "short", day: "numeric" });
}

export default function TournamentEvents() {
  const [selectedType, setSelectedType] = useState("all");
  const [showSuggest, setShowSuggest] = useState(false);

  // Filtering
  const filteredEvents = sampleEvents.filter(ev =>
    selectedType === "all" ? true : ev.type === selectedType
  );

  return (
    <main className="pt-24 pb-10 min-h-screen bg-gradient-to-tr from-yellow-50 via-cyan-50 to-blue-50 dark:from-blue-950 dark:via-cyan-900 dark:to-slate-900">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-extrabold text-3xl md:text-5xl text-center mb-2 text-cyan-700 dark:text-cyan-200 drop-shadow"
      >
        🏆 School Tournaments & Local Competitions
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg md:text-xl text-center text-cyan-900 dark:text-cyan-100 mb-6 max-w-2xl mx-auto"
      >
        Find upcoming events, contests, and tournaments for local kids.<br/>
        <span className="text-sm opacity-80">Sports, GK, science fairs, art, and more—everyone can join!</span>
      </motion.p>
      {/* Event Type Sidebar/Filter (mobile unrolls to tabs) */}
      <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-7">
        <button
          className={`px-5 py-2 rounded-full font-bold text-md shadow-sm transition
            ${selectedType==='all' ? "bg-cyan-600 text-white" : "bg-white dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100 hover:bg-cyan-100"}`}
          onClick={() => setSelectedType('all')}
        >All</button>
        {eventTypes.map(t =>
          <button
            key={t.key}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold shadow-sm text-md transition
              ${selectedType===t.key ? "bg-cyan-600 text-white" : "bg-white dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100 hover:bg-cyan-100"}`}
            onClick={() => setSelectedType(t.key)}
          >
            {t.icon} {t.label}
          </button>
        )}
        <button
          className="ml-3 flex items-center gap-2 bg-emerald-300 dark:bg-emerald-700 px-5 py-2 rounded-full font-bold text-emerald-900 dark:text-white shadow-md hover:bg-emerald-500 dark:hover:bg-emerald-800 transition"
          onClick={()=>setShowSuggest(true)}
        ><FaPlus/> Suggest an Event</button>
      </div>
      {/* Calendar preview row */}
      <div className="flex gap-4 justify-center flex-wrap mb-9">
        {sampleEvents.map(ev => (
          <div 
            key={ev.title}
            className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-100/80 dark:from-blue-900 to-emerald-50 dark:to-cyan-800 shadow-md px-5 py-2 mx-1 w-28 select-none mb-2"
          >
            <div className="text-2xl font-bold text-cyan-800 dark:text-cyan-200">{formatDate(ev.date)}</div>
            <div className="text-xs text-cyan-600 dark:text-cyan-100">{ev.title.split(' ')[0]}</div>
          </div>
        ))}
      </div>
      {/* Upcoming Events Grid */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <AnimatePresence>
          {filteredEvents.map(ev => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, y: 28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.92 }}
              layout
              className="relative bg-white dark:bg-cyan-950 rounded-3xl shadow-2xl ring-2 ring-cyan-100 dark:ring-cyan-800 p-6 flex flex-col items-start hover:bg-cyan-100 dark:hover:bg-cyan-800 cursor-pointer group transition"
            >
              <span className="absolute right-4 top-[-24px] flex items-center justify-center w-12 h-12 rounded-full text-3xl font-bold bg-cyan-400/20 dark:bg-cyan-800/70 shadow">
                {eventTypes.find(e=>e.key===ev.type)?.icon}
              </span>
              <div className="mb-2 text-xs font-semibold text-cyan-600 dark:text-cyan-200">{ev.org}</div>
              <div className="text-xl font-bold mb-1 text-cyan-900 dark:text-cyan-100">{ev.title}</div>
              <div className="text-sm mb-2 text-cyan-700 dark:text-cyan-100">{ev.desc}</div>
              <div className="flex gap-3 mt-1 text-xs">
                <span className="px-2 py-1 rounded bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100">{ev.date} {ev.time}</span>
                <span className="px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100">{ev.location}</span>
              </div>
            </motion.div>
          ))}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center py-12 text-lg text-cyan-700 dark:text-cyan-100"
            >
              No events found for this type!
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {/* Suggest event modal */}
      <AnimatePresence>
        {showSuggest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cyan-900/30 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-md w-full bg-white dark:bg-cyan-950 rounded-2xl p-9 shadow-2xl"
            >
              <h2 className="text-xl font-bold text-cyan-700 dark:text-cyan-200 mb-4">Suggest a New Event or Tournament</h2>
              <form onSubmit={e=>{e.preventDefault(); setShowSuggest(false); alert("Form submitted! (Integrate backend)");}}>
                <input className="w-full px-3 py-2 mb-3 rounded bg-cyan-50 dark:bg-cyan-900 border border-cyan-200 dark:border-cyan-700" placeholder="Event Name" required/>
                <input className="w-full px-3 py-2 mb-3 rounded bg-cyan-50 dark:bg-cyan-900 border border-cyan-200 dark:border-cyan-700" placeholder="Organizer" required/>
                <input className="w-full px-3 py-2 mb-3 rounded bg-cyan-50 dark:bg-cyan-900 border border-cyan-200 dark:border-cyan-700" placeholder="Date (YYYY-MM-DD)" required/>
                <input className="w-full px-3 py-2 mb-3 rounded bg-cyan-50 dark:bg-cyan-900 border border-cyan-200 dark:border-cyan-700" placeholder="Time (e.g. 11:30 AM)" required/>
                <input className="w-full px-3 py-2 mb-3 rounded bg-cyan-50 dark:bg-cyan-900 border border-cyan-200 dark:border-cyan-700" placeholder="Location" required/>
                <textarea className="w-full px-3 py-2 mb-4 rounded bg-cyan-50 dark:bg-cyan-900 border border-cyan-200 dark:border-cyan-700" placeholder="Short description..." required />
                <button type="submit" className="w-full py-3 bg-cyan-700 text-white font-bold rounded-full hover:bg-cyan-800 shadow transition">Submit</button>
              </form>
              <button
                onClick={()=>setShowSuggest(false)}
                className="block mx-auto mt-4 text-cyan-600 dark:text-cyan-300 font-bold underline"
              >Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

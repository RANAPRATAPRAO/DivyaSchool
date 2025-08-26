import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaSearch, FaAlignJustify, FaTimes } from "react-icons/fa";

// ---- VIDEO DATA (Sample grouped, you can fetch from your backend) ----
const topicMap = {
  Science: [
    {
      id: "F8t5bLRSbyw",
      title: "Science is for everyone, kids included | Beau Lotto and Amy O’Toole",
      channel: "TED",
      duration: "16:36"
    },
    {
      id: "dLrPcRr7qzU",
      title: "The Life Cycle of a Plastic Bottle | Emma Bryce",
      channel: "TED-Ed",
      duration: "4:06"
    },
    {
      id: "4O7MX0FtFqY",
      title: "The Science of Skin Color | Angela Koine Flynn",
      channel: "TED-Ed",
      duration: "4:24"
    },
    {
      id: "VlZzfv3A0q0",
      title: "Is Invisibility Possible? | Max G. Levy",
      channel: "TED-Ed",
      duration: "5:17"
    }
  ],
  "Inspiration": [
    {
      id: "aISXCw0Pi94",
      title: "How Every Child Can Thrive by Five | Molly Wright",
      channel: "TED",
      duration: "7:43"
    },
    {
      id: "S9B7im8aQjo",
      title: "How I Harnessed the Wind | William Kamkwamba",
      channel: "TED",
      duration: "6:05"
    },
    {
      id: "F3Xe9Uy76d8",
      title: "12-Year-Old App Developer | Thomas Suarez",
      channel: "TEDx Talks",
      duration: "4:41"
    },
    {
      id: "H14bBuluwB8",
      title: "Grit: Passion and Perseverance | Angela Duckworth",
      channel: "TED",
      duration: "6:13"
    }
  ],
  "Learning/School": [
    {
      id: "SFnMTHhKdkw",
      title: "Every Kid Needs a Champion | Rita Pierson",
      channel: "TED",
      duration: "7:49"
    },
    {
      id: "r9LelXa3U_I",
      title: "Bring on the learning revolution! | Ken Robinson",
      channel: "TED",
      duration: "20:56"
    },
    {
      id: "h11u3vtcpaY",
      title: "Hackschooling Makes Me Happy | Logan LaPlante",
      channel: "TEDx Talks",
      duration: "11:14"
    },
    {
      id: "U6FvJ6jMGHU",
      title: "What we’re learning from online education | Daphne Koller",
      channel: "TED",
      duration: "17:18"
    }
  ],
  "Brain/Wellbeing": [
    {
      id: "R3YrwOiAgWY",
      title: "How playing an instrument benefits your brain | Anita Collins",
      channel: "TED-Ed",
      duration: "4:45"
    },
    {
      id: "noVC5bQTbYw",
      title: "What is Dyslexia? | Kelli Sandman-Hurley",
      channel: "TED-Ed",
      duration: "4:32"
    },
    {
      id: "Z2fGJ7R_RDM",
      title: "Your brain on video games | Daphne Bavelier",
      channel: "TED",
      duration: "17:57"
    },
    {
      id: "4q1dgn_C0AU",
      title: "The Surprising Science of Happiness | Dan Gilbert",
      channel: "TED",
      duration: "21:00"
    }
  ],
  Creativity: [
    {
      id: "t3__x2c_x7w",
      title: "The Magic of Pixar | Danielle Feinberg",
      channel: "TED",
      duration: "11:44"
    },
    {
      id: "r5tICr1F5LI",
      title: "Why a good book is a secret door | Mac Barnett",
      channel: "TED",
      duration: "16:42"
    },
    {
      id: "FzRH3iTQPrk",
      title: "Squishy Circuits | AnnMarie Thomas",
      channel: "TED",
      duration: "5:01"
    },
    {
      id: "qp0HIF3SfI4",
      title: "How great leaders inspire action | Simon Sinek",
      channel: "TED",
      duration: "18:04"
    }
  ]
};

const topics = Object.keys(topicMap);

function flattenVideos(map) {
  let out = [];
  Object.values(map).forEach(arr => out = out.concat(arr));
  return out;
}

export default function VideoSectionObys() {
  // UI states
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [searchText, setSearchText] = useState("");
  const allVideos = useMemo(() => flattenVideos(topicMap), []);

  // Filter logic, matches title (case insensitive substring)
  const filteredVideos = useMemo(() => {
    let vids = activeTopic === 'All'
      ? allVideos
      : topicMap[activeTopic] || [];
    if (searchText.trim()) {
      vids = vids.filter(v =>
        v.title.toLowerCase().includes(searchText.toLowerCase()) ||
        v.channel.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return vids;
  }, [activeTopic, searchText, allVideos]);

  // "Featured" is the first in the filtered list
  const [selected, setSelected] = useState(0);

  // If filter changes, always reset selected to first visible
  React.useEffect(() => {
    setSelected(0);
  }, [filteredVideos.length, activeTopic, searchText]);

  return (
    <main className="relative min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-tr from-[#fffcea] via-cyan-100 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 transition-colors overflow-x-hidden pt-24">
      {/* Soft animated blobs for energy */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50, x: -100 }}
        animate={{ opacity: 0.18, scale: 1.09, y: 0, x: 0 }}
        transition={{ duration: 1.8 }}
        className="absolute left-0 top-0 w-[400px] h-[270px] bg-gradient-to-br from-cyan-300/30 via-pink-200/20 to-amber-200/25 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7, x: 70, y: 140 }}
        animate={{ opacity: 0.15, scale: 1.07, x: 0, y: 20 }}
        transition={{ duration: 2.2 }}
        className="absolute bottom-0 right-0 w-[260px] h-[180px] bg-gradient-to-tr from-violet-300/30 via-amber-400/10 to-cyan-100/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* Sidebar - All Topics */}
      <AnimatePresence>
        {(showSidebar || window.innerWidth >= 768) && (
          <motion.aside
            key="sidebar"
            initial={{ x: -230, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: .45, type: "spring" }}}
            exit={{ x: -230, opacity: 0 }}
            className={`md:sticky md:left-0 left-0 top-0 w-64 px-3 py-10 min-h-[70vh] bg-white/90 dark:bg-cyan-950/90 md:bg-transparent md:dark:bg-transparent shadow-xl md:shadow-none z-30 fixed md:relative md:block ${showSidebar ? "" : "hidden md:block"}`}
            style={{marginTop: '4rem'}}
          >
            <div className="font-bold text-xl mb-4 pt-2 md:pt-0 text-cyan-600 dark:text-cyan-200">
              Categories
            </div>
            <ul className="flex flex-col gap-2">
              {topics.map(topic => (
                <motion.li key={topic}>
                  <button
                    className={`block w-full text-left px-4 py-3 rounded-xl font-semibold transition text-cyan-800 dark:text-cyan-100
                      ${topic === activeTopic ? "bg-gradient-to-r from-cyan-400/30 to-emerald-200/20 dark:from-cyan-900 dark:to-emerald-900 shadow ring-2 ring-cyan-200" : "hover:bg-cyan-50 dark:hover:bg-cyan-900"}
                    `}
                    onClick={() => {
                      setActiveTopic(topic);
                      setShowSidebar(false);
                    }}
                  >
                    {topic}
                  </button>
                </motion.li>
              ))}
            </ul>
            {/* Close on mobile */}
            <button
              className="md:hidden text-xs mt-8 text-cyan-900 dark:text-cyan-300 flex items-center gap-1 hover:underline"
              onClick={() => setShowSidebar(false)}
            ><FaTimes /> Close</button>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* Sidebar button on small screens */}
      <button
        className="md:hidden fixed left-3 top-28 z-40 bg-cyan-600/80 dark:bg-cyan-900/80 text-white p-2 rounded-full shadow-lg
        hover:bg-cyan-700 transition"
        aria-label="Open topics"
        onClick={() => setShowSidebar(true)}
      >
        <FaAlignJustify />
      </button>

      <div className="flex-1 px-2 md:pl-0 w-full max-w-[1300px] mx-auto">
        {/* Search bar */}
        <div className="relative z-20 flex flex-col sm:flex-row gap-3 items-center justify-center mt-2 mb-7">
          <label className="w-full flex items-center gap-2 bg-white/80 dark:bg-slate-900/75 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border-2 border-cyan-100 dark:border-cyan-800 focus-within:ring-2 ring-cyan-300">
            <FaSearch className="text-cyan-600 dark:text-cyan-300 text-xl" />
            <input
              className="flex-1 text-lg bg-transparent focus:outline-none text-cyan-900 dark:text-cyan-100 pl-2"
              placeholder="Search for videos or channels..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </label>
        </div>

        {/* Main area (featured + grid) */}
        <section className="flex flex-col items-center">
          {/* Featured video */}
          {filteredVideos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl aspect-video rounded-3xl overflow-hidden mb-6 shadow-2xl border-4 border-red-200 dark:border-cyan-800 bg-black relative"
            >
              <iframe
                src={`https://www.youtube.com/embed/${filteredVideos[selected].id}`}
                title={filteredVideos[selected].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/90 to-transparent w-full px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <span className="font-bold text-white text-base">{filteredVideos[selected].title}</span>
                <span className="text-xs text-cyan-200 flex gap-2 items-center">
                  {filteredVideos[selected].channel} • {filteredVideos[selected].duration}
                </span>
              </div>
            </motion.div>
          )}
          {/* Responsive grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredVideos.map((vid, i) => (
              <motion.div
                key={vid.id}
                whileHover={{ scale: 1.07, boxShadow: "0 8px 40px #fbbf24" }}
                transition={{ type: "spring", stiffness: 320 }}
                className={`
                  flex flex-col rounded-2xl p-2 cursor-pointer border-2 bg-white/70 dark:bg-slate-900/60
                  ${selected === i ? "border-cyan-500 ring-2 ring-cyan-200" : "border-transparent"}
                  shadow group
                `}
                onClick={() => setSelected(i)}
              >
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                    alt={vid.title}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md"
                  >
                    <FaPlay className="text-white text-2xl group-hover:scale-110 transition" />
                  </motion.div>
                  <span className="absolute bottom-1 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    {vid.duration}
                  </span>
                </div>
                <div className="mt-2 text-sm font-bold text-gray-800 dark:text-cyan-100 text-center">{vid.title}</div>
                <div className="text-xs text-gray-600/80 dark:text-cyan-200 truncate">{vid.channel}</div>
              </motion.div>
            ))}
            {filteredVideos.length === 0 && (
              <div className="col-span-full py-9 text-xl text-cyan-600 text-center w-full">No videos found.</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

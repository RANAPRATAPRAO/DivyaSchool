import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaSearch, FaAlignJustify, FaTimes } from "react-icons/fa";

// --- Playable, educational videos ---
const topicMap = {
  Science: [
    { id: "8Sp6B6s52dw", title: "Why do we itch? | Emma Bryce", channel: "TED-Ed", duration: "4:33" },
    { id: "wJuxLuuV2I4", title: "The Immune System Explained | Kurzgesagt", channel: "Kurzgesagt – In a Nutshell", duration: "6:34" },
    { id: "HSsqzzuGTPo", title: "What is the Fourth Dimension?", channel: "PBS Space Time", duration: "10:46" },
    { id: "DgPaCWJhAgU", title: "The Most Mysterious Star in the Universe", channel: "TED", duration: "12:26" }
  ],
  Inspiration: [
    { id: "Ks-_Mh1QhMc", title: "Do Schools Kill Creativity? | Sir Ken Robinson", channel: "TED", duration: "20:03" },
    { id: "Un3W_UBeB6k", title: "How to Gain Control of Your Free Time | Laura Vanderkam", channel: "TED", duration: "11:54" },
    { id: "jS5fTzMP_mg", title: "How to Make Stress Your Friend | Kelly McGonigal", channel: "TED", duration: "14:29" },
    { id: "h11u3vtcpaY", title: "Hackschooling Makes Me Happy | Logan LaPlante", channel: "TEDx Talks", duration: "11:14" }
  ],
  "Learning/School": [
    { id: "SFnMTHhKdkw", title: "Every Kid Needs a Champion | Rita Pierson", channel: "TED", duration: "7:49" },
    { id: "r9LelXa3U_I", title: "Bring on the learning revolution! | Ken Robinson", channel: "TED", duration: "20:56" },
    { id: "U6FvJ6jMGHU", title: "What we're learning from online education | Daphne Koller", channel: "TED", duration: "17:18" },
    { id: "uMj7MlqOE-Q", title: "How to Speak so that People Want to Listen | Julian Treasure", channel: "TED", duration: "9:58" }
  ],
  "Brain/Wellbeing": [
    { id: "R3YrwOiAgWY", title: "How playing an instrument benefits your brain | Anita Collins", channel: "TED-Ed", duration: "4:45" },
    { id: "noVC5bQTbYw", title: "What is Dyslexia? | Kelli Sandman-Hurley", channel: "TED-Ed", duration: "4:32" },
    { id: "Z2fGJ7R_RDM", title: "Your brain on video games | Daphne Bavelier", channel: "TED", duration: "17:57" },
    { id: "4q1dgn_C0AU", title: "The Surprising Science of Happiness | Dan Gilbert", channel: "TED", duration: "21:00" }
  ],
  Creativity: [
    { id: "t3__x2c_x7w", title: "The Magic of Pixar | Danielle Feinberg", channel: "TED", duration: "11:44" },
    { id: "r5tICr1F5LI", title: "Why a good book is a secret door | Mac Barnett", channel: "TED", duration: "16:42" },
    { id: "FzRH3iTQPrk", title: "Squishy Circuits | AnnMarie Thomas", channel: "TED", duration: "5:01" },
    { id: "qp0HIF3SfI4", title: "How great leaders inspire action | Simon Sinek", channel: "TED", duration: "18:04" }
  ]
};
const topics = ["All", ...Object.keys(topicMap)];
function flattenVideos(map) {
  let out = [];
  Object.values(map).forEach(arr => out = out.concat(arr));
  return out;
}
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

export default function VideoSectionObys() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTopic, setActiveTopic] = useState("All");
  const [searchText, setSearchText] = useState("");
  const allVideos = useMemo(() => flattenVideos(topicMap), []);
  const isMobile = useIsMobile();

  // Filtering videos
  const filteredVideos = useMemo(() => {
    let vids = activeTopic === "All" ? allVideos : (topicMap[activeTopic] || []);
    if (searchText.trim()) {
      vids = vids.filter(v =>
        v.title.toLowerCase().includes(searchText.toLowerCase()) ||
        v.channel.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return vids;
  }, [activeTopic, searchText, allVideos]);

  // Inline player logic
  const [playingIndex, setPlayingIndex] = useState(-1);
  const videoRefs = useRef([]);

  // Reset video playing index (stop playing) on filter change
  useEffect(() => { setPlayingIndex(-1); }, [filteredVideos, activeTopic, searchText]);

  useEffect(() => {
    // Scroll video into view when selected
    if (playingIndex >= 0 && videoRefs.current[playingIndex]) {
      videoRefs.current[playingIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [playingIndex, filteredVideos]);

  // Sidebar full behavior remains unchanged

  return (
    <main className="relative min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-tr from-[#fffcea] via-cyan-100 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 transition-colors overflow-x-hidden pt-24">
      {/* ...BG Blobs, Sidebar, Search omitted for clarity... (same as above) */}
      <AnimatePresence>
        {(showSidebar || window.innerWidth >= 768) && (
          <motion.aside
            key="sidebar"
            initial={{ x: -230, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { duration: .45, type: "spring" } }} exit={{ x: -230, opacity: 0 }}
            className={`md:sticky md:left-0 left-0 top-0 w-64 px-3 py-10 min-h-[70vh] bg-white/90 dark:bg-cyan-950/90 md:bg-transparent md:dark:bg-transparent shadow-xl md:shadow-none z-30 fixed md:relative md:block ${showSidebar ? "" : "hidden md:block"}`}
            style={{ marginTop: '4rem' }}>
            <div className="font-bold text-xl mb-4 pt-2 md:pt-0 text-cyan-600 dark:text-cyan-200">Categories</div>
            <ul className="flex flex-col gap-2">
              {topics.map(topic => (
                <motion.li key={topic}>
                  <button
                    className={`block w-full text-left px-4 py-3 rounded-xl font-semibold transition text-cyan-800 dark:text-cyan-100
                    ${topic === activeTopic ? "bg-gradient-to-r from-cyan-400/30 to-emerald-200/20 dark:from-cyan-900 dark:to-emerald-900 shadow ring-2 ring-cyan-200" : "hover:bg-cyan-50 dark:hover:bg-cyan-900"}
                    `}
                    onClick={() => { setActiveTopic(topic); setShowSidebar(false); }}>
                    {topic}
                  </button>
                </motion.li>
              ))}
            </ul>
            <button className="md:hidden text-xs mt-8 text-cyan-900 dark:text-cyan-300 flex items-center gap-1 hover:underline"
              onClick={() => setShowSidebar(false)}><FaTimes /> Close</button>
          </motion.aside>
        )}
      </AnimatePresence>
      <button
        className="md:hidden fixed left-3 top-28 z-40 bg-cyan-600/80 dark:bg-cyan-900/80 text-white p-2 rounded-full shadow-lg hover:bg-cyan-700 transition"
        aria-label="Open topics"
        onClick={() => setShowSidebar(true)}>
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
              onChange={e => setSearchText(e.target.value)} />
          </label>
        </div>
        {/* Main area */}
        <section className="flex flex-col items-center">
        {/* Only on desktop: show featured video at top */}
        {!isMobile && filteredVideos.length > 0 && playingIndex >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden sm:block w-full max-w-3xl aspect-video rounded-3xl overflow-hidden mb-6 shadow-2xl border-4 border-red-200 dark:border-cyan-800 bg-black relative">
            <iframe
              src={`https://www.youtube.com/embed/${filteredVideos[playingIndex].id}?autoplay=1`}
              title={filteredVideos[playingIndex].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/90 to-transparent w-full px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <span className="font-bold text-white text-base">{filteredVideos[playingIndex].title}</span>
              <span className="text-xs text-cyan-200 flex gap-2 items-center">
                {filteredVideos[playingIndex].channel} • {filteredVideos[playingIndex].duration}
              </span>
            </div>
          </motion.div>
        )}
        {/* Video cards: mobile & desktop */}
        <div className="w-full flex flex-col gap-5 sm:grid sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
          {filteredVideos.map((vid, i) => (
            <motion.div
              ref={el => videoRefs.current[i] = el}
              key={vid.id}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 320 }}
              tabIndex={0}
              role="button"
              aria-label={vid.title}
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setPlayingIndex(i); }}
              onClick={() => setPlayingIndex(i)}
              className={`
                w-full max-w-full flex-shrink-0 flex flex-col rounded-2xl p-2
                cursor-pointer border-2
                bg-white/70 dark:bg-slate-900/60
                ${playingIndex === i && (isMobile || window.innerWidth < 640) ? "border-cyan-500 ring-2 ring-cyan-200" : "border-transparent"}
                shadow group
                transition-all duration-200
                outline-none focus:ring-2 focus:ring-cyan-500
              `}
            >
              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black mb-2">
                {(playingIndex === i && (isMobile || window.innerWidth < 640))
                  ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.id}?autoplay=1`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <img className="w-full h-full object-cover" src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`} alt={vid.title} />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md">
                        <FaPlay className="text-white text-2xl group-hover:scale-110 transition" />
                      </motion.div>
                      <span className="absolute bottom-1 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{vid.duration}</span>
                    </>
                  )
                }
              </div>
              <div className="mt-1 text-base font-bold text-gray-800 dark:text-cyan-100 text-center">{vid.title}</div>
              <div className="text-xs text-gray-600/80 dark:text-cyan-200 truncate text-center">{vid.channel}</div>
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


// import React, { useState, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import { motion, AnimatePresence } from 'framer-motion';
// import Particles from '@tsparticles/react';
// import { loadSlim } from '@tsparticles/slim';
// import './App.css';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// function App() {
//   const [text, setText] = useState('');
//   const [twitterQuery, setTwitterQuery] = useState('');
//   const [redditSubreddit, setRedditSubreddit] = useState('');
//   const [file, setFile] = useState(null);
//   const [results, setResults] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [timeline, setTimeline] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [theme, setTheme] = useState('dark');
//   const [activeSection, setActiveSection] = useState('text');
//   const [searchQuery, setSearchQuery] = useState(''); 

//   const pieChartRef = useRef(null);
//   const barChartRef = useRef(null);

//   const particlesInit = useCallback(async (engine) => {
//     console.log('Particles initializing...');
//     await loadSlim(engine);
//     console.log('Particles initialized successfully!');
//   }, []);

//   const particlesOptions = {
//     background: {
//       color: {
//         value: theme === 'dark'
//           ? 'linear-gradient(135deg, #0a0e1a 0%, #1e2a44 100%)'
//           : 'linear-gradient(135deg, #e0e7ff 0%, #c3cfe2 100%)',
//       },
//     },
//     fpsLimit: 60,
//     interactivity: {
//       events: {
//         onClick: { enable: true, mode: 'push' },
//         onHover: { enable: true, mode: 'repulse' },
//         resize: true,
//       },
//       modes: {
//         push: { quantity: 2 },
//         repulse: { distance: 150, duration: 0.3 },
//       },
//     },
//     particles: {
//       color: { value: theme === 'dark' ? '#6b7280' : '#3b82f6' },
//       links: {
//         color: theme === 'dark' ? '#6b7280' : '#3b82f6',
//         distance: 120,
//         enable: true,
//         opacity: 0.3,
//         width: 0.8,
//       },
//       collisions: { enable: true },
//       move: {
//         direction: 'none',
//         enable: true,
//         outModes: { default: 'bounce' },
//         random: false,
//         speed: 1,
//         straight: false,
//       },
//       number: { density: { enable: true, area: 1000 }, value: 50 },
//       opacity: { value: 0.4 },
//       shape: { type: 'circle' },
//       size: { value: { min: 1, max: 3 } },
//     },
//     detectRetina: true,
//   };

//   const toggleTheme = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light');
//   };

//   const handleTextAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/sentiment?text=${encodeURIComponent(text)}`);
//       console.log('Text API Response:', response.data);
//       setResults([response.data]);
//       setSummary(response.data.summary);
//     } catch (error) {
//       console.error('Text API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while analyzing text');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     setSearchQuery(''); // Reset search query on new upload
//     try {
//       const response = await axios.post('http://localhost:8000/sentiment/file', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log('File Upload API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setError('No results found in the uploaded file.');
//         setResults([]);
//         setSummary(null);
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//       }
//     } catch (error) {
//       console.error('File Upload API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the file');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTwitterAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/twitter?query=${encodeURIComponent(twitterQuery)}`);
//       console.log('Twitter API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setError('No results found for the given query.');
//         setResults([]);
//         setSummary(null);
//         setTimeline([]);
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//         setTimeline(response.data.timeline || []);
//       }
//     } catch (error) {
//       console.error('Twitter API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while fetching Twitter data.');
//       setResults([]);
//       setSummary(null);
//       setTimeline([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRedditAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/reddit?subreddit=${encodeURIComponent(redditSubreddit)}`);
//       console.log('Reddit API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setError('No results found for the given subreddit.');
//         setResults([]);
//         setSummary(null);
//         setTimeline([]);
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//         setTimeline(response.data.timeline || []);
//       }
//     } catch (error) {
//       console.error('Reddit API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while fetching Reddit data');
//       setResults([]);
//       setTimeline([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadResultsAsCSV = () => {
//     if (!results || results.length === 0) {
//       setError('No results to download.');
//       return;
//     }

//     let headers;
//     let rows;

//     if (activeSection === 'twitter' || activeSection === 'reddit') {
//       headers = ['Text', 'Post Author ID', 'Post Date & Time', 'Sentiment', 'Confidence', 'Score (-1 to +1)'];
//       rows = filteredResults.map(result => {
//         const postDateTime = result.created_at
//           ? new Date(result.created_at).toLocaleString()
//           : result.created_utc
//           ? new Date(result.created_utc * 1000).toLocaleString()
//           : 'N/A';
//         const authorId = result.author_id || result.author || 'N/A';
//         return [
//           `"${result.text.replace(/"/g, '""')}"`,
//           authorId,
//           `"${postDateTime}"`,
//           result.sentiment,
//           result.confidence?.toFixed(2),
//           result.sentiment_score?.toFixed(2),
//         ];
//       });
//     } else {
//       headers = ['Text', 'Sentiment', 'Confidence', 'Score (-1 to +1)'];
//       rows = filteredResults.map(result => [
//         `"${result.text.replace(/"/g, '""')}"`,
//         result.sentiment,
//         result.confidence?.toFixed(2),
//         result.sentiment_score?.toFixed(2),
//       ]);
//     }

//     const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', 'sentiment_results.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const downloadChartAsPNG = (chartRef, fileName) => {
//     if (!chartRef.current) {
//       setError('Chart not available for download.');
//       return;
//     }
//     const chart = chartRef.current;
//     const url = chart.toBase64Image();
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Filter results based on search query for file section
//   const filteredResults = activeSection === 'file' && searchQuery
//     ? results.filter(result => result.text.toLowerCase().includes(searchQuery.toLowerCase()))
//     : results;

//   const pieData = {
//     labels: summary ? Object.keys(summary) : [],
//     datasets: [
//       {
//         label: 'Sentiment Distribution',
//         data: summary ? Object.values(summary) : [],
//         backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
//         borderColor: ['#059669', '#d97706', '#dc2626', '#4b5563'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const barData = {
//     labels: (filteredResults || []).map((result, index) => `Entry ${index + 1}`),
//     datasets: [
//       {
//         label: 'Confidence Scores',
//         data: (filteredResults || []).map((result) => result.confidence || 0),
//         backgroundColor: 'rgba(59, 130, 246, 0.6)',
//         borderColor: 'rgba(59, 130, 246, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const barOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 1,
//         title: { display: true, text: 'Confidence' },
//         ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' },
//         grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' },
//       },
//       x: {
//         title: { display: true, text: 'Entries' },
//         ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' },
//         grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' },
//       },
//     },
//     animation: { duration: 1500, easing: 'easeOutQuart' },
//   };

//   const sidebarItemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
//   };

//   const badgeVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' } }),
//   };

//   const tableRowVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' } }),
//   };

//   return (
//     <div className={`App ${theme}`} style={{ background: theme === 'dark' ? '#0a0e1a' : '#e0e7ff' }}>
//       <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="vanta-background" />

//       <motion.div className="sidebar" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
//         <div className="sidebar-header">
//           <h2>Analysis Tools</h2>
//         </div>
//         <ul className="sidebar-menu">
//           {['text', 'file', 'twitter', 'reddit'].map((section, index) => (
//             <motion.li
//               key={section}
//               custom={index}
//               variants={sidebarItemVariants}
//               initial="hidden"
//               animate="visible"
//               className={activeSection === section ? 'active' : ''}
//               onClick={() => setActiveSection(section)}
//             >
//               {section === 'text' && 'Manual Text'}
//               {section === 'file' && 'File Upload'}
//               {section === 'twitter' && 'Twitter Sentiment'}
//               {section === 'reddit' && 'Reddit Sentiment'}
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>

//       <div className="main-content">
//         <motion.header className="header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
//           <h1>AI Sentiment Dashboard</h1>
//           <motion.button className="btn btn-theme" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme}>
//             {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
//           </motion.button>
//         </motion.header>

//         <motion.div className="content-section card" variants={cardVariants} initial="hidden" animate="visible">
//           {activeSection === 'text' && (
//             <>
//               <h2>Manual Text Input</h2>
//               <input
//                 type="text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Enter text to analyze"
//                 className="input-field"
//               />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTextAnalyze}>
//                 Analyze
//               </motion.button>
//             </>
//           )}

//           {activeSection === 'file' && (
//             <>
//               <h2>File Upload (Excel/CSV/Text)</h2>
//               <form onSubmit={handleFileUpload}>
//                 <input type="file" accept=".csv,.xlsx,.txt" onChange={(e) => setFile(e.target.files[0])} className="input-field" />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">
//                   Upload and Analyze
//                 </motion.button>
//               </form>
//             </>
//           )}

//           {activeSection === 'twitter' && (
//             <>
//               <h2>Twitter Sentiment</h2>
//               <input
//                 type="text"
//                 value={twitterQuery}
//                 onChange={(e) => setTwitterQuery(e.target.value)}
//                 placeholder="Enter Twitter query (e.g., #happy)"
//                 className="input-field"
//               />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTwitterAnalyze}>
//                 Analyze
//               </motion.button>
//             </>
//           )}

//           {activeSection === 'reddit' && (
//             <>
//               <h2>Reddit Sentiment</h2>
//               <input
//                 type="text"
//                 value={redditSubreddit}
//                 onChange={(e) => setRedditSubreddit(e.target.value)}
//                 placeholder="Enter subreddit (e.g., india)"
//                 className="input-field"
//               />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRedditAnalyze}>
//                 Analyze
//               </motion.button>
//             </>
//           )}
//         </motion.div>

//         <AnimatePresence>
//           {loading && (
//             <motion.div className="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
//               <div className="spinner"></div>
//               <p>Loading...</p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {error && (
//             <motion.p className="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
//               {error}
//             </motion.p>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {!loading && !error && (!results || results.length === 0) && !summary && (
//             <motion.p
//               className="no-results"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.3 }}
//             >
//               No results to display. Try a different query.
//             </motion.p>
//           )}
//         </AnimatePresence>

//         {summary && (
//           <motion.div className="summary card" variants={cardVariants} initial="hidden" animate="visible">
//             <h3>Sentiment Summary</h3>
//             <div className="summary-badges">
//               {Object.entries(summary).map(([sentiment, count], index) => (
//                 <motion.div
//                   key={sentiment}
//                   custom={index}
//                   variants={badgeVariants}
//                   initial="hidden"
//                   animate="visible"
//                   className={`badge badge-${sentiment.toLowerCase()}`}
//                   title={`Number of ${sentiment} sentiments: ${count}`}
//                 >
//                   {sentiment}: {count}
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {(results || []).length > 0 && (
//           <motion.div className="results card" variants={cardVariants} initial="hidden" animate="visible">
//             <h2>Results</h2>
//             {activeSection === 'file' && (
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search text in results..."
//                 className="input-field"
//                 style={{ marginBottom: '20px', width: '100%' }}
//               />
//             )}
//             <motion.button
//               className="btn btn-primary"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={downloadResultsAsCSV}
//               style={{ marginBottom: '20px' }}
//             >
//               Download Results as CSV
//             </motion.button>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Text</th>
//                   {(activeSection === 'twitter' || activeSection === 'reddit') && (
//                     <>
//                       <th>Post Author ID</th>
//                       <th>Post Date & Time</th>
//                     </>
//                   )}
//                   <th>Sentiment</th>
//                   <th>Confidence</th>
//                   <th>Score (-1 to +1)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(filteredResults || []).map((result, index) => {
//                   const postDateTime = result.created_at
//                     ? new Date(result.created_at).toLocaleString()
//                     : result.created_utc
//                     ? new Date(result.created_utc * 1000).toLocaleString()
//                     : 'N/A';
//                   const authorId = result.author_id || result.author || 'N/A';

//                   return (
//                     <motion.tr key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible" className="table-row">
//                       <td>{result.text}</td>
//                       {(activeSection === 'twitter' || activeSection === 'reddit') && (
//                         <>
//                           <td>{authorId}</td>
//                           <td>{postDateTime}</td>
//                         </>
//                       )}
//                       <td className={`sentiment-${result.sentiment.toLowerCase()}`}>{result.sentiment}</td>
//                       <td>{result.confidence?.toFixed(2)}</td>
//                       <td>{result.sentiment_score?.toFixed(2)}</td>
//                     </motion.tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </motion.div>
//         )}

//         {timeline.length > 0 && (
//           <motion.div className="timeline card" variants={cardVariants} initial="hidden" animate="visible">
//             <h3>Sentiment Timeline</h3>
//             <ul>
//               {timeline.map((entry, index) => (
//                 <motion.li key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible">
//                   <span>{entry.timestamp}</span>: <span className={`sentiment-${entry.sentiment.toLowerCase()}`}>{entry.sentiment}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         )}

//         {summary && (
//           <div className="charts">
//             <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
//               <h3>Sentiment Distribution</h3>
//               {pieData.datasets[0].data.every(val => val === 0) ? (
//                 <p className="no-data">No sentiment data to display.</p>
//               ) : (
//                 <>
//                   <Pie ref={pieChartRef} data={pieData} options={{ animation: { duration: 1500, easing: 'easeOutQuart' } }} />
//                   <motion.button
//                     className="btn btn-primary"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => downloadChartAsPNG(pieChartRef, 'sentiment_distribution.png')}
//                     style={{ marginTop: '10px' }}
//                   >
//                     Download Pie Chart as PNG
//                   </motion.button>
//                 </>
//               )}
//             </motion.div>
//             {(filteredResults || []).length > 0 ? (
//               <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
//                 <h3>Confidence Scores</h3>
//                 <Bar ref={barChartRef} data={barData} options={barOptions} />
//                 <motion.button
//                   className="btn btn-primary"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => downloadChartAsPNG(barChartRef, 'confidence_scores.png')}
//                   style={{ marginTop: '10px' }}
//                 >
//                   Download Bar Chart as PNG
//                 </motion.button>
//               </motion.div>
//             ) : (
//               <p className="no-data">No confidence scores to display.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// 222222

import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './App.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function App() {
  const [text, setText] = useState('');
  const [twitterQuery, setTwitterQuery] = useState('');
  const [redditSubreddit, setRedditSubreddit] = useState('');
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('text');
  const [searchQuery, setSearchQuery] = useState('');

  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  const particlesInit = useCallback(async (engine) => {
    console.log('Particles initializing...');
    await loadSlim(engine);
    console.log('Particles initialized successfully!');
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: theme === 'dark'
          ? 'linear-gradient(135deg, #0a0e1a 0%, #1e2a44 100%)'
          : 'linear-gradient(135deg, #e0e7ff 0%, #c3cfe2 100%)',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: 'push' },
        onHover: { enable: true, mode: 'repulse' },
        resize: true,
      },
      modes: {
        push: { quantity: 2 },
        repulse: { distance: 150, duration: 0.3 },
      },
    },
    particles: {
      color: { value: theme === 'dark' ? '#6b7280' : '#3b82f6' },
      links: {
        color: theme === 'dark' ? '#6b7280' : '#3b82f6',
        distance: 120,
        enable: true,
        opacity: 0.3,
        width: 0.8,
      },
      collisions: { enable: true },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: false,
        speed: 1,
        straight: false,
      },
      number: { density: { enable: true, area: 1000 }, value: 50 },
      opacity: { value: 0.4 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleTextAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setSummary(null);
    setTimeline([]);
    try {
      const response = await axios.get(`http://localhost:8000/sentiment?text=${encodeURIComponent(text)}`);
      console.log('Text API Response:', response.data);
      setResults([response.data]);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Text API Error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred while analyzing text');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);
    setResults([]);
    setSummary(null);
    setTimeline([]);
    setSearchQuery(''); // Reset search query on new upload
    try {
      const response = await axios.post('http://localhost:8000/sentiment/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('File Upload API Response:', response.data);
      if (!response.data.results || response.data.results.length === 0) {
        setError('No results found in the uploaded file.');
        setResults([]);
        setSummary(null);
      } else {
        setResults(response.data.results);
        setSummary(response.data.summary || null);
      }
    } catch (error) {
      console.error('File Upload API Error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred while processing the file');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTwitterAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setSummary(null);
    setTimeline([]);
    try {
      const response = await axios.get(`http://localhost:8000/twitter?query=${encodeURIComponent(twitterQuery)}`);
      console.log('Twitter API Response:', response.data);
      if (!response.data.results || response.data.results.length === 0) {
        setError('No results found for the given query.');
        setResults([]);
        setSummary(null);
        setTimeline([]);
      } else {
        setResults(response.data.results);
        setSummary(response.data.summary || null);
        setTimeline(response.data.timeline || []);
      }
    } catch (error) {
      console.error('Twitter API Error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred while fetching Twitter data.');
      setResults([]);
      setSummary(null);
      setTimeline([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRedditAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setSummary(null);
    setTimeline([]);
    try {
      const response = await axios.get(`http://localhost:8000/reddit?subreddit=${encodeURIComponent(redditSubreddit)}`);
      console.log('Reddit API Response:', response.data);
      if (!response.data.results || response.data.results.length === 0) {
        setError('No results found for the given subreddit.');
        setResults([]);
        setSummary(null);
        setTimeline([]);
      } else {
        setResults(response.data.results);
        setSummary(response.data.summary || null);
        setTimeline(response.data.timeline || []);
      }
    } catch (error) {
      console.error('Reddit API Error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'An error occurred while fetching Reddit data');
      setResults([]);
      setTimeline([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadResultsAsCSV = () => {
    if (!results || results.length === 0) {
      setError('No results to download.');
      return;
    }

    let headers;
    let rows;

    if (activeSection === 'twitter' || activeSection === 'reddit') {
      headers = ['Text', 'Post Author Handle', 'Post Date & Time', 'Sentiment', 'Confidence', 'Score (-1 to +1)'];
      rows = filteredResults.map(result => {
        const postDateTime = result.created_at
          ? new Date(result.created_at).toLocaleString()
          : result.created_utc
          ? new Date(result.created_utc * 1000).toLocaleString()
          : 'N/A';
        const authorHandle = result.author || result.author_id || 'N/A';
        return [
          `"${result.text.replace(/"/g, '""')}"`,
          authorHandle,
          `"${postDateTime}"`,
          result.sentiment,
          result.confidence?.toFixed(2),
          result.sentiment_score?.toFixed(2),
        ];
      });
    } else {
      headers = ['Text', 'Sentiment', 'Confidence', 'Score (-1 to +1)']; // Basic headers for text and file
      rows = filteredResults.map(result => [
        `"${result.text.replace(/"/g, '""')}"`,
        result.sentiment,
        result.confidence?.toFixed(2),
        result.sentiment_score?.toFixed(2),
      ]);
    }

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sentiment_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadChartAsPNG = (chartRef, fileName) => {
    if (!chartRef.current) {
      setError('Chart not available for download.');
      return;
    }
    const chart = chartRef.current;
    const url = chart.toBase64Image();
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter results based on search query for file section
  const filteredResults = activeSection === 'file' && searchQuery
    ? results.filter(result => result.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : results;

  const pieData = {
    labels: summary ? Object.keys(summary) : [],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: summary ? Object.values(summary) : [],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
        borderColor: ['#059669', '#d97706', '#dc2626', '#4b5563'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: (filteredResults || []).map((result, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: 'Confidence Scores',
        data: (filteredResults || []).map((result) => result.confidence || 0),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        title: { display: true, text: 'Confidence' },
        ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' },
        grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' },
      },
      x: {
        title: { display: true, text: 'Entries' },
        ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' },
        grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' },
      },
    },
    animation: { duration: 1500, easing: 'easeOutQuart' },
  };

  const sidebarItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' } }),
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' } }),
  };

  return (
    <div className={`App ${theme}`} style={{ background: theme === 'dark' ? '#0a0e1a' : '#e0e7ff' }}>
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="vanta-background" />

      <motion.div className="sidebar" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        <div className="sidebar-header">
          <h2>Analysis Tools</h2>
        </div>
        <ul className="sidebar-menu">
          {['text', 'file', 'twitter', 'reddit'].map((section, index) => (
            <motion.li
              key={section}
              custom={index}
              variants={sidebarItemVariants}
              initial="hidden"
              animate="visible"
              className={activeSection === section ? 'active' : ''}
              onClick={() => setActiveSection(section)}
            >
              {section === 'text' && 'Manual Text'}
              {section === 'file' && 'File Upload'}
              {section === 'twitter' && 'Twitter Sentiment'}
              {section === 'reddit' && 'Reddit Sentiment'}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="main-content">
        <motion.header className="header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <h1>AI Sentiment Dashboard</h1>
          <motion.button className="btn btn-theme" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </motion.button>
        </motion.header>

        <motion.div className="content-section card" variants={cardVariants} initial="hidden" animate="visible">
          {activeSection === 'text' && (
            <>
              <h2>Manual Text Input</h2>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to analyze"
                className="input-field"
              />
              <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTextAnalyze}>
                Analyze
              </motion.button>
            </>
          )}

          {activeSection === 'file' && (
            <>
              <h2>File Upload (Excel/CSV/Text)</h2>
              <form onSubmit={handleFileUpload}>
                <input type="file" accept=".csv,.xlsx,.txt" onChange={(e) => setFile(e.target.files[0])} className="input-field" />
                <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">
                  Upload and Analyze
                </motion.button>
              </form>
            </>
          )}

          {activeSection === 'twitter' && (
            <>
              <h2>Twitter Sentiment</h2>
              <input
                type="text"
                value={twitterQuery}
                onChange={(e) => setTwitterQuery(e.target.value)}
                placeholder="Enter Twitter query (e.g., #happy)"
                className="input-field"
              />
              <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTwitterAnalyze}>
                Analyze
              </motion.button>
            </>
          )}

          {activeSection === 'reddit' && (
            <>
              <h2>Reddit Sentiment</h2>
              <input
                type="text"
                value={redditSubreddit}
                onChange={(e) => setRedditSubreddit(e.target.value)}
                placeholder="Enter subreddit (e.g., india)"
                className="input-field"
              />
              <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRedditAnalyze}>
                Analyze
              </motion.button>
            </>
          )}
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div className="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="spinner"></div>
              <p>Loading...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.p className="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!loading && !error && (!results || results.length === 0) && !summary && (
            <motion.p
              className="no-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10}}
              transition={{ duration: 0.3 }}
            >
              No results to display. Try a different query.
            </motion.p>
          )}
        </AnimatePresence>

        {summary && (
          <motion.div className="summary card" variants={cardVariants} initial="hidden" animate="visible">
            <h3>Sentiment Summary</h3>
            <div className="summary-badges">
              {Object.entries(summary).map(([sentiment, count], index) => {
                // Normalize sentiment to lowercase for consistency
                const normalizedSentiment = sentiment.toLowerCase();
                const badgeClass = `badge badge-${normalizedSentiment === 'n/a' ? 'n-a' : normalizedSentiment}`;
                return (
                  <motion.div
                    key={sentiment}
                    custom={index}
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    className={badgeClass}
                    title={`Number of ${sentiment} sentiments: ${count}`}
                  >
                    {sentiment}: {count}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {(results || []).length > 0 && (
          <motion.div className="results card" variants={cardVariants} initial="hidden" animate="visible">
            <h2>Results</h2>
            {activeSection === 'file' && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search text in results..."
                className="input-field"
                style={{ marginBottom: '20px', width: '100%' }}
              />
            )}
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadResultsAsCSV}
              style={{ marginBottom: '20px' }}
            >
              Download Results as CSV
            </motion.button>
            <table>
              <thead>
                <tr>
                  {['text', 'file'].includes(activeSection) ? (
                    <>
                      <th>Text</th>
                      <th>Sentiment</th>
                      <th>Confidence</th>
                      <th>Score (-1 to +1)</th>
                    </>
                  ) : (
                    <>
                      <th>Text</th>
                      <th>Post Author Handle</th>
                      <th>Post Date & Time</th>
                      <th>Sentiment</th>
                      <th>Confidence</th>
                      <th>Score (-1 to +1)</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {(filteredResults || []).map((result, index) => {
                  const postDateTime = result.created_at
                    ? new Date(result.created_at).toLocaleString()
                    : result.created_utc
                    ? new Date(result.created_utc * 1000).toLocaleString()
                    : 'N/A';
                  const authorHandle = result.author || result.author_id || 'N/A';

                  return (
                    <motion.tr key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible" className="table-row">
                      <td>{result.text}</td>
                      {['twitter', 'reddit'].includes(activeSection) && (
                        <>
                          <td>{authorHandle}</td>
                          <td>{postDateTime}</td>
                        </>
                      )}
                      <td className={`sentiment-${result.sentiment.toLowerCase()}`}>{result.sentiment}</td>
                      <td>{result.confidence?.toFixed(2)}</td>
                      <td>{result.sentiment_score?.toFixed(2)}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}

        {timeline.length > 0 && (
          <motion.div className="timeline card" variants={cardVariants} initial="hidden" animate="visible">
            <h3>Sentiment Timeline</h3>
            <ul>
              {timeline.map((entry, index) => (
                <motion.li key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible">
                  <span>{entry.timestamp}</span>: <span className={`sentiment-${entry.sentiment.toLowerCase()}`}>{entry.sentiment}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {summary && (
          <div className="charts">
            <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
              <h3>Sentiment Distribution</h3>
              {pieData.datasets[0].data.every(val => val === 0) ? (
                <p className="no-data">No sentiment data to display.</p>
              ) : (
                <>
                  <Pie ref={pieChartRef} data={pieData} options={{ animation: { duration: 1500, easing: 'easeOutQuart' } }} />
                  <motion.button
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => downloadChartAsPNG(pieChartRef, 'sentiment_distribution.png')}
                    style={{ marginTop: '10px' }}
                  >
                    Download Pie Chart as PNG
                  </motion.button>
                </>
              )}
            </motion.div>
            {(filteredResults || []).length > 0 ? (
              <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
                <h3>Confidence Scores</h3>
                <Bar ref={barChartRef} data={barData} options={barOptions} />
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => downloadChartAsPNG(barChartRef, 'confidence_scores.png')}
                  style={{ marginTop: '10px' }}
                >
                  Download Bar Chart as PNG
                </motion.button>
              </motion.div>
            ) : (
              <p className="no-data">No confidence scores to display.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


// // updated changes kiya hai but run nhi hua 


// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import { motion, AnimatePresence } from 'framer-motion';
// import Particles from '@tsparticles/react';
// import { loadSlim } from '@tsparticles/slim';
// // import io from 'socket.io-client';
// import './App.css';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// function App() {
//   const [text, setText] = useState('');
//   const [twitterQuery, setTwitterQuery] = useState('');
//   const [redditSubreddit, setRedditSubreddit] = useState('');
//   const [file, setFile] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [audioFile, setAudioFile] = useState(null);
//   const [results, setResults] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [timeline, setTimeline] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [theme, setTheme] = useState('dark');
//   const [activeSection, setActiveSection] = useState('text');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [socket, setSocket] = useState(null);

//   const pieChartRef = useRef(null);
//   const barChartRef = useRef(null);

//   // useEffect(() => {
//   //   const newSocket = io('http://localhost:8000');
//   //   setSocket(newSocket);

//   //   newSocket.on('connect', () => console.log('Connected to WebSocket'));
//   //   newSocket.on('message', (data) => {
//   //     console.log('WebSocket Data:', data);
//   //     setResults((prev) => [data, ...prev.slice(0, 9)]);
//   //     setSummary((prev) => {
//   //       const newSummary = { ...prev };
//   //       if (newSummary) newSummary[data.sentiment] = (newSummary[data.sentiment] || 0) + 1;
//   //       return newSummary;
//   //     });
//   //   });

//   //   return () => newSocket.disconnect();
//   // }, []);

//   const particlesInit = useCallback(async (engine) => {
//     console.log('Particles initializing...');
//     await loadSlim(engine);
//     console.log('Particles initialized successfully!');
//   }, []);

//   const particlesOptions = {
//     background: {
//       color: {
//         value: theme === 'dark' ? 'linear-gradient(135deg, #0f172a 0%, #2a2e45 100%)' : 'linear-gradient(135deg, #e0e7ff 0%, #c3cfe2 100%)',
//       },
//     },
//     fpsLimit: 60,
//     interactivity: {
//       events: { onClick: { enable: true, mode: 'push' }, onHover: { enable: true, mode: 'repulse' }, resize: true },
//       modes: { push: { quantity: 2 }, repulse: { distance: 150, duration: 0.3 } },
//     },
//     particles: {
//       color: { value: theme === 'dark' ? '#6b7280' : '#3b82f6' },
//       links: { color: theme === 'dark' ? '#6b7280' : '#3b82f6', distance: 120, enable: true, opacity: 0.3, width: 0.8 },
//       collisions: { enable: true },
//       move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 1, straight: false },
//       number: { density: { enable: true, area: 1000 }, value: 50 },
//       opacity: { value: 0.4 },
//       shape: { type: 'circle' },
//       size: { value: { min: 1, max: 3 } },
//     },
//     detectRetina: true,
//   };

//   const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

//   const handleTextAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/sentiment?text=${encodeURIComponent(text)}`);
//       console.log('Text API Response:', response.data);
//       setResults([response.data]);
//       setSummary({ [response.data.sentiment]: 1 });
//     } catch (error) {
//       console.error('Text API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while analyzing text');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     let url = 'http://localhost:8000/sentiment/file';
//     if (file.type.startsWith('image/')) url = 'http://localhost:8000/sentiment/image';
//     else if (file.type.startsWith('audio/')) url = 'http://localhost:8000/sentiment/audio';

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     setSearchQuery('');
//     try {
//       const response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       console.log('File Upload API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setResults([response.data]);
//         setSummary({ [response.data.sentiment]: 1 });
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//       }
//     } catch (error) {
//       console.error('File Upload API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the file');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     e.preventDefault();
//     if (!imageFile) {
//       setError('Please select an image to upload');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', imageFile);

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.post('http://localhost:8000/sentiment/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       console.log('Image API Response:', response.data);
//       setResults([response.data]);
//       setSummary({ [response.data.sentiment]: 1 });
//     } catch (error) {
//       console.error('Image API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the image');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAudioUpload = async (e) => {
//     e.preventDefault();
//     if (!audioFile) {
//       setError('Please select an audio file to upload');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', audioFile);

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.post('http://localhost:8000/sentiment/audio', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       console.log('Audio API Response:', response.data);
//       setResults([response.data]);
//       setSummary({ [response.data.sentiment]: 1 });
//     } catch (error) {
//       console.error('Audio API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the audio');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTwitterAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/twitter?query=${encodeURIComponent(twitterQuery)}`);
//       console.log('Twitter API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setError('No results found for the given query.');
//         setResults([]);
//         setSummary(null);
//         setTimeline([]);
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//         setTimeline(response.data.timeline || []);
//       }
//     } catch (error) {
//       console.error('Twitter API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while fetching Twitter data.');
//       setResults([]);
//       setSummary(null);
//       setTimeline([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRedditAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/reddit?subreddit=${encodeURIComponent(redditSubreddit)}`);
//       console.log('Reddit API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setError('No results found for the given subreddit.');
//         setResults([]);
//         setSummary(null);
//         setTimeline([]);
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//         setTimeline(response.data.timeline || []);
//       }
//     } catch (error) {
//       console.error('Reddit API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while fetching Reddit data');
//       setResults([]);
//       setTimeline([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendToSocket = () => {
//     if (socket && text.trim()) {
//       socket.emit('message', text);
//       setText('');
//     }
//   };

//   const downloadResultsAsCSV = () => {
//     if (!results || results.length === 0) {
//       setError('No results to download.');
//       return;
//     }
//     let headers, rows;
//     if (activeSection === 'twitter' || activeSection === 'reddit') {
//       headers = ['Text', 'Post Author Handle', 'Post Date & Time', 'Sentiment', 'Confidence', 'Score (-1 to +1)'];
//       rows = results.map(result => {
//         const postDateTime = result.created_at ? new Date(result.created_at).toLocaleString() : result.created_utc ? new Date(result.created_utc * 1000).toLocaleString() : 'N/A';
//         const authorHandle = result.author || result.author_id || 'N/A';
//         return [`"${result.text.replace(/"/g, '""')}"`, authorHandle, `"${postDateTime}"`, result.sentiment, result.confidence?.toFixed(2), result.sentiment_score?.toFixed(2)];
//       });
//     } else {
//       headers = ['Text', 'Sentiment', 'Confidence', 'Score (-1 to +1)'];
//       rows = results.map(result => [`"${result.text.replace(/"/g, '""')}"`, result.sentiment, result.confidence?.toFixed(2), result.sentiment_score?.toFixed(2)]);
//     }
//     const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', 'sentiment_results.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const downloadChartAsPNG = (chartRef, fileName) => {
//     if (!chartRef.current) {
//       setError('Chart not available for download.');
//       return;
//     }
//     const chart = chartRef.current;
//     const url = chart.toBase64Image();
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filteredResults = activeSection === 'file' && searchQuery
//     ? results.filter(result => result.text.toLowerCase().includes(searchQuery.toLowerCase()))
//     : results;

//   const pieData = {
//     labels: summary ? Object.keys(summary) : [],
//     datasets: [{
//       label: 'Sentiment Distribution',
//       data: summary ? Object.values(summary) : [],
//       backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
//       borderColor: ['#059669', '#d97706', '#dc2626', '#4b5563'],
//       borderWidth: 1,
//     }],
//   };

//   const barData = {
//     labels: (filteredResults || []).map((result, index) => `Entry ${index + 1}`),
//     datasets: [{
//       label: 'Confidence Scores',
//       data: (filteredResults || []).map(result => result.confidence || 0),
//       backgroundColor: 'rgba(59, 130, 246, 0.6)',
//       borderColor: 'rgba(59, 130, 246, 1)',
//       borderWidth: 1,
//     }],
//   };

//   const barOptions = {
//     scales: {
//       y: { beginAtZero: true, max: 1, title: { display: true, text: 'Confidence' }, ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' }, grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' } },
//       x: { title: { display: true, text: 'Entries' }, ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' }, grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' } },
//     },
//     animation: { duration: 1500, easing: 'easeOutQuart' },
//   };

//   const sidebarItemVariants = { hidden: { opacity: 0, x: -20 }, visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }) };
//   const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
//   const badgeVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' } }) };
//   const tableRowVariants = { hidden: { opacity: 0, x: -20 }, visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' } }) };

//   return (
//     <div className={`App ${theme}`} style={{ background: theme === 'dark' ? '#0f172a' : '#e0e7ff' }}>
//       <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="vanta-background" />
//       <motion.div className="sidebar" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
//         <div className="sidebar-header"><h2>Analysis Tools</h2></div>
//         <ul className="sidebar-menu">
//           {['text', 'file', 'image', 'audio', 'twitter', 'reddit'].map((section, index) => (
//             <motion.li
//               key={section}
//               custom={index}
//               variants={sidebarItemVariants}
//               initial="hidden"
//               animate="visible"
//               className={activeSection === section ? 'active' : ''}
//               onClick={() => setActiveSection(section)}
//             >
//               {section === 'text' && 'Manual Text'}
//               {section === 'file' && 'File Upload'}
//               {section === 'image' && 'Image Sentiment'}
//               {section === 'audio' && 'Audio Sentiment'}
//               {section === 'twitter' && 'Twitter Sentiment'}
//               {section === 'reddit' && 'Reddit Sentiment'}
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>
//       <div className="main-content">
//         <motion.header className="header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
//           <h1>AI Sentiment Dashboard</h1>
//           <motion.button className="btn btn-theme" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme}>
//             {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
//           </motion.button>
//         </motion.header>
//         <motion.div className="content-section card" variants={cardVariants} initial="hidden" animate="visible">
//           {activeSection === 'text' && (
//             <>
//               <h2>Manual Text Input</h2>
//               <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to analyze" className="input-field" />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTextAnalyze}>Analyze Text</motion.button>
//               <motion.button className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={sendToSocket} style={{ marginLeft: '10px' }}>Real-Time Analyze</motion.button>
//             </>
//           )}
//           {activeSection === 'file' && (
//             <>
//               <h2>File Upload (Excel/CSV/Text)</h2>
//               <form onSubmit={handleFileUpload}>
//                 <input type="file" accept=".csv,.xlsx,.txt,image/*,audio/*" onChange={(e) => setFile(e.target.files[0])} className="input-field" />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Upload and Analyze</motion.button>
//               </form>
//             </>
//           )}
//           {activeSection === 'image' && (
//             <>
//               <h2>Image Sentiment</h2>
//               <form onSubmit={handleImageUpload}>
//                 <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="input-field" />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Analyze Image</motion.button>
//               </form>
//             </>
//           )}
//           {activeSection === 'audio' && (
//             <>
//               <h2>Audio Sentiment</h2>
//               <form onSubmit={handleAudioUpload}>
//                 <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} className="input-field" />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Analyze Audio</motion.button>
//               </form>
//             </>
//           )}
//           {activeSection === 'twitter' && (
//             <>
//               <h2>Twitter Sentiment</h2>
//               <input type="text" value={twitterQuery} onChange={(e) => setTwitterQuery(e.target.value)} placeholder="Enter Twitter query (e.g., #happy)" className="input-field" />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTwitterAnalyze}>Analyze</motion.button>
//             </>
//           )}
//           {activeSection === 'reddit' && (
//             <>
//               <h2>Reddit Sentiment</h2>
//               <input type="text" value={redditSubreddit} onChange={(e) => setRedditSubreddit(e.target.value)} placeholder="Enter subreddit (e.g., india)" className="input-field" />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRedditAnalyze}>Analyze</motion.button>
//             </>
//           )}
//         </motion.div>
//         <AnimatePresence>
//           {loading && (
//             <motion.div className="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
//               <div className="spinner"></div>
//               <p>Loading...</p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {error && (
//             <motion.p className="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
//               {error}
//             </motion.p>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {!loading && !error && (!results || results.length === 0) && !summary && (
//             <motion.p className="no-results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
//               No results to display. Try a different query.
//             </motion.p>
//           )}
//         </AnimatePresence>
//         {summary && (
//           <motion.div className="summary card" variants={cardVariants} initial="hidden" animate="visible">
//             <h3>Sentiment Summary</h3>
//             <div className="summary-badges">
//               {Object.entries(summary).map(([sentiment, count], index) => {
//                 const normalizedSentiment = sentiment.toLowerCase();
//                 const badgeClass = `badge badge-${normalizedSentiment === 'n/a' ? 'n-a' : normalizedSentiment}`;
//                 return (
//                   <motion.div key={sentiment} custom={index} variants={badgeVariants} initial="hidden" animate="visible" className={badgeClass} title={`Number of ${sentiment} sentiments: ${count}`}>
//                     {sentiment}: {count}
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//         {(results || []).length > 0 && (
//           <motion.div className="results card" variants={cardVariants} initial="hidden" animate="visible">
//             <h2>Results</h2>
//             {activeSection === 'file' && (
//               <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search text in results..." className="input-field" style={{ marginBottom: '20px', width: '100%' }} />
//             )}
//             <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={downloadResultsAsCSV} style={{ marginBottom: '20px' }}>
//               Download Results as CSV
//             </motion.button>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Text</th>
//                   {(activeSection === 'twitter' || activeSection === 'reddit') && (
//                     <>
//                       <th>Post Author Handle</th>
//                       <th>Post Date & Time</th>
//                     </>
//                   )}
//                   <th>Sentiment</th>
//                   <th>Confidence</th>
//                   <th>Score (-1 to +1)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(filteredResults || []).map((result, index) => {
//                   const postDateTime = result.created_at ? new Date(result.created_at).toLocaleString() : result.created_utc ? new Date(result.created_utc * 1000).toLocaleString() : 'N/A';
//                   const authorHandle = result.author || result.author_id || 'N/A';
//                   return (
//                     <motion.tr key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible" className="table-row">
//                       <td>{result.text}</td>
//                       {(activeSection === 'twitter' || activeSection === 'reddit') && (
//                         <>
//                           <td>{authorHandle}</td>
//                           <td>{postDateTime}</td>
//                         </>
//                       )}
//                       <td className={`sentiment-${result.sentiment.toLowerCase()}`}>{result.sentiment}</td>
//                       <td>{result.confidence?.toFixed(2)}</td>
//                       <td>{result.sentiment_score?.toFixed(2)}</td>
//                     </motion.tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </motion.div>
//         )}
//         {timeline.length > 0 && (
//           <motion.div className="timeline card" variants={cardVariants} initial="hidden" animate="visible">
//             <h3>Sentiment Timeline</h3>
//             <ul>
//               {timeline.map((entry, index) => (
//                 <motion.li key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible">
//                   <span>{entry.timestamp}</span>: <span className={`sentiment-${entry.sentiment.toLowerCase()}`}>{entry.sentiment}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//         {summary && (
//           <div className="charts">
//             <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
//               <h3>Sentiment Distribution</h3>
//               {pieData.datasets[0].data.every(val => val === 0) ? (
//                 <p className="no-data">No sentiment data to display.</p>
//               ) : (
//                 <>
//                   <Pie ref={pieChartRef} data={pieData} options={{ animation: { duration: 1500, easing: 'easeOutQuart' } }} />
//                   <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => downloadChartAsPNG(pieChartRef, 'sentiment_distribution.png')} style={{ marginTop: '10px' }}>
//                     Download Pie Chart as PNG
//                   </motion.button>
//                 </>
//               )}
//             </motion.div>
//             {(filteredResults || []).length > 0 ? (
//               <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
//                 <h3>Confidence Scores</h3>
//                 <Bar ref={barChartRef} data={barData} options={barOptions} />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => downloadChartAsPNG(barChartRef, 'confidence_scores.png')} style={{ marginTop: '10px' }}>
//                   Download Bar Chart as PNG
//                 </motion.button>
//               </motion.div>
//             ) : (
//               <p className="no-data">No confidence scores to display.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import { motion, AnimatePresence } from 'framer-motion';
// import Particles from '@tsparticles/react';
// import { loadSlim } from '@tsparticles/slim';
// // import io from 'socket.io-client'; // Commented out to remove socket.io dependency
// import './App.css';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// function App() {
//   const [text, setText] = useState('');
//   const [twitterQuery, setTwitterQuery] = useState('');
//   const [redditSubreddit, setRedditSubreddit] = useState('');
//   const [file, setFile] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [audioFile, setAudioFile] = useState(null);
//   const [results, setResults] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [timeline, setTimeline] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [theme, setTheme] = useState('dark');
//   const [activeSection, setActiveSection] = useState('text');
//   const [searchQuery, setSearchQuery] = useState('');
//   // const [socket, setSocket] = useState(null); // Keeping this state for now, but it won't be used

//   const pieChartRef = useRef(null);
//   const barChartRef = useRef(null);

//   useEffect(() => {
//     // const newSocket = io('http://localhost:8000');
//     // setSocket(newSocket);
//     //
//     // newSocket.on('connect', () => console.log('Connected to WebSocket'));
//     // newSocket.on('message', (data) => {
//     //   console.log('WebSocket Data:', data);
//     //   setResults((prev) => [data, ...prev.slice(0, 9)]);
//     //   setSummary((prev) => {
//     //     const newSummary = { ...prev };
//     //     if (newSummary) newSummary[data.sentiment] = (newSummary[data.sentiment] || 0) + 1;
//     //     return newSummary;
//     //   });
//     // });
//     //
//     // return () => newSocket.disconnect();
//   }, []);

//   const particlesInit = useCallback(async (engine) => {
//     console.log('Particles initializing...');
//     await loadSlim(engine);
//     console.log('Particles initialized successfully!');
//   }, []);

//   const particlesOptions = {
//     background: {
//       color: {
//         value: theme === 'dark' ? 'linear-gradient(135deg, #0f172a 0%, #2a2e45 100%)' : 'linear-gradient(135deg, #e0e7ff 0%, #c3cfe2 100%)',
//       },
//     },
//     fpsLimit: 60,
//     interactivity: {
//       events: { onClick: { enable: true, mode: 'push' }, onHover: { enable: true, mode: 'repulse' }, resize: true },
//       modes: { push: { quantity: 2 }, repulse: { distance: 150, duration: 0.3 } },
//     },
//     particles: {
//       color: { value: theme === 'dark' ? '#6b7280' : '#3b82f6' },
//       links: { color: theme === 'dark' ? '#6b7280' : '#3b82f6', distance: 120, enable: true, opacity: 0.3, width: 0.8 },
//       collisions: { enable: true },
//       move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 1, straight: false },
//       number: { density: { enable: true, area: 1000 }, value: 50 },
//       opacity: { value: 0.4 },
//       shape: { type: 'circle' },
//       size: { value: { min: 1, max: 3 } },
//     },
//     detectRetina: true,
//   };

//   const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

//   const handleTextAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/sentiment?text=${encodeURIComponent(text)}`);
//       console.log('Text API Response:', response.data);
//       setResults([response.data]);
//       setSummary({ [response.data.sentiment]: 1 });
//     } catch (error) {
//       console.error('Text API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while analyzing text');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     let url = 'http://localhost:8000/sentiment/file';
//     if (file.type.startsWith('image/')) url = 'http://localhost:8000/sentiment/image';
//     else if (file.type.startsWith('audio/')) url = 'http://localhost:8000/sentiment/audio';

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     setSearchQuery('');
//     try {
//       const response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       console.log('File Upload API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setResults([response.data]);
//         setSummary({ [response.data.sentiment]: 1 });
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//       }
//     } catch (error) {
//       console.error('File Upload API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the file');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     e.preventDefault();
//     if (!imageFile) {
//       setError('Please select an image to upload');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', imageFile);

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.post('http://localhost:8000/sentiment/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       console.log('Image API Response:', response.data);
//       setResults([response.data]);
//       setSummary({ [response.data.sentiment]: 1 });
//     } catch (error) {
//       console.error('Image API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the image');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAudioUpload = async (e) => {
//     e.preventDefault();
//     if (!audioFile) {
//       setError('Please select an audio file to upload');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', audioFile);

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.post('http://localhost:8000/sentiment/audio', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       console.log('Audio API Response:', response.data);
//       setResults([response.data]);
//       setSummary({ [response.data.sentiment]: 1 });
//     } catch (error) {
//       console.error('Audio API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the audio');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTwitterAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/twitter?query=${encodeURIComponent(twitterQuery)}`);
//       console.log('Twitter API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setError('No results found for the given query.');
//         setResults([]);
//         setSummary(null);
//         setTimeline([]);
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//         setTimeline(response.data.timeline || []);
//       }
//     } catch (error) {
//       console.error('Twitter API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while fetching Twitter data.');
//       setResults([]);
//       setSummary(null);
//       setTimeline([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRedditAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/reddit?subreddit=${encodeURIComponent(redditSubreddit)}`);
//       console.log('Reddit API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setError('No results found for the given subreddit.');
//         setResults([]);
//         setSummary(null);
//         setTimeline([]);
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//         setTimeline(response.data.timeline || []);
//       }
//     } catch (error) {
//       console.error('Reddit API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while fetching Reddit data');
//       setResults([]);
//       setTimeline([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendToSocket = () => {
//     // if (socket && text.trim()) {
//     //   socket.emit('message', text);
//     //   setText('');
//     // }
//   };

//   const downloadResultsAsCSV = () => {
//     if (!results || results.length === 0) {
//       setError('No results to download.');
//       return;
//     }
//     let headers, rows;
//     if (activeSection === 'twitter' || activeSection === 'reddit') {
//       headers = ['Text', 'Post Author Handle', 'Post Date & Time', 'Sentiment', 'Confidence', 'Score (-1 to +1)'];
//       rows = results.map(result => {
//         const postDateTime = result.created_at ? new Date(result.created_at).toLocaleString() : result.created_utc ? new Date(result.created_utc * 1000).toLocaleString() : 'N/A';
//         const authorHandle = result.author || result.author_id || 'N/A';
//         return [`"${result.text.replace(/"/g, '""')}"`, authorHandle, `"${postDateTime}"`, result.sentiment, result.confidence?.toFixed(2), result.sentiment_score?.toFixed(2)];
//       });
//     } else {
//       headers = ['Text', 'Sentiment', 'Confidence', 'Score (-1 to +1)'];
//       rows = results.map(result => [`"${result.text.replace(/"/g, '""')}"`, result.sentiment, result.confidence?.toFixed(2), result.sentiment_score?.toFixed(2)]);
//     }
//     const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', 'sentiment_results.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const downloadChartAsPNG = (chartRef, fileName) => {
//     if (!chartRef.current) {
//       setError('Chart not available for download.');
//       return;
//     }
//     const chart = chartRef.current;
//     const url = chart.toBase64Image();
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filteredResults = activeSection === 'file' && searchQuery
//     ? results.filter(result => result.text.toLowerCase().includes(searchQuery.toLowerCase()))
//     : results;

//   const pieData = {
//     labels: summary ? Object.keys(summary) : [],
//     datasets: [{
//       label: 'Sentiment Distribution',
//       data: summary ? Object.values(summary) : [],
//       backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
//       borderColor: ['#059669', '#d97706', '#dc2626', '#4b5563'],
//       borderWidth: 1,
//     }],
//   };

//   const barData = {
//     labels: (filteredResults || []).map((result, index) => `Entry ${index + 1}`),
//     datasets: [{
//       label: 'Confidence Scores',
//       data: (filteredResults || []).map(result => result.confidence || 0),
//       backgroundColor: 'rgba(59, 130, 246, 0.6)',
//       borderColor: 'rgba(59, 130, 246, 1)',
//       borderWidth: 1,
//     }],
//   };

//   const barOptions = {
//     scales: {
//       y: { beginAtZero: true, max: 1, title: { display: true, text: 'Confidence' }, ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' }, grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' } },
//       x: { title: { display: true, text: 'Entries' }, ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' }, grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' } },
//     },
//     animation: { duration: 1500, easing: 'easeOutQuart' },
//   };

//   const sidebarItemVariants = { hidden: { opacity: 0, x: -20 }, visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }) };
//   const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
//   const badgeVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' } }) };
//   const tableRowVariants = { hidden: { opacity: 0, x: -20 }, visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' } }) };

//   return (
//     <div className={`App ${theme}`} style={{ background: theme === 'dark' ? '#0f172a' : '#e0e7ff' }}>
//       <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="vanta-background" />
//       <motion.div className="sidebar" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
//         <div className="sidebar-header"><h2>Analysis Tools</h2></div>
//         <ul className="sidebar-menu">
//           {['text', 'file', 'image', 'audio', 'twitter', 'reddit'].map((section, index) => (
//             <motion.li
//               key={section}
//               custom={index}
//               variants={sidebarItemVariants}
//               initial="hidden"
//               animate="visible"
//               className={activeSection === section ? 'active' : ''}
//               onClick={() => setActiveSection(section)}
//             >
//               {section === 'text' && 'Manual Text'}
//               {section === 'file' && 'File Upload'}
//               {section === 'image' && 'Image Sentiment'}
//               {section === 'audio' && 'Audio Sentiment'}
//               {section === 'twitter' && 'Twitter Sentiment'}
//               {section === 'reddit' && 'Reddit Sentiment'}
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>
//       <div className="main-content">
//         <motion.header className="header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
//           <h1>AI Sentiment Dashboard</h1>
//           <motion.button className="btn btn-theme" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme}>
//             {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
//           </motion.button>
//         </motion.header>
//         <motion.div className="content-section card" variants={cardVariants} initial="hidden" animate="visible">
//           {activeSection === 'text' && (
//             <>
//               <h2>Manual Text Input</h2>
//               <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to analyze" className="input-field" />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTextAnalyze}>Analyze Text</motion.button>
//               <motion.button className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={sendToSocket} style={{ marginLeft: '10px' }} disabled>Real-Time Analyze</motion.button>
//             </>
//           )}
//           {activeSection === 'file' && (
//             <>
//               <h2>File Upload (Excel/CSV/Text)</h2>
//               <form onSubmit={handleFileUpload}>
//                 <input type="file" accept=".csv,.xlsx,.txt,image/*,audio/*" onChange={(e) => setFile(e.target.files[0])} className="input-field" />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Upload and Analyze</motion.button>
//               </form>
//             </>
//           )}
//           {activeSection === 'image' && (
//             <>
//               <h2>Image Sentiment</h2>
//               <form onSubmit={handleImageUpload}>
//                 <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="input-field" />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Analyze Image</motion.button>
//               </form>
//             </>
//           )}
//           {activeSection === 'audio' && (
//             <>
//               <h2>Audio Sentiment</h2>
//               <form onSubmit={handleAudioUpload}>
//                 <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} className="input-field" />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Analyze Audio</motion.button>
//               </form>
//             </>
//           )}
//           {activeSection === 'twitter' && (
//             <>
//               <h2>Twitter Sentiment</h2>
//               <input type="text" value={twitterQuery} onChange={(e) => setTwitterQuery(e.target.value)} placeholder="Enter Twitter query (e.g., #happy)" className="input-field" />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTwitterAnalyze}>Analyze</motion.button>
//             </>
//           )}
//           {activeSection === 'reddit' && (
//             <>
//               <h2>Reddit Sentiment</h2>
//               <input type="text" value={redditSubreddit} onChange={(e) => setRedditSubreddit(e.target.value)} placeholder="Enter subreddit (e.g., india)" className="input-field" />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRedditAnalyze}>Analyze</motion.button>
//             </>
//           )}
//         </motion.div>
//         <AnimatePresence>
//           {loading && (
//             <motion.div className="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
//               <div className="spinner"></div>
//               <p>Loading...</p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {error && (
//             <motion.p className="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
//               {error}
//             </motion.p>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {!loading && !error && (!results || results.length === 0) && !summary && (
//             <motion.p className="no-results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
//               No results to display. Try a different query.
//             </motion.p>
//           )}
//         </AnimatePresence>
//         {summary && (
//           <motion.div className="summary card" variants={cardVariants} initial="hidden" animate="visible">
//             <h3>Sentiment Summary</h3>
//             <div className="summary-badges">
//               {Object.entries(summary).map(([sentiment, count], index) => {
//                 const normalizedSentiment = sentiment.toLowerCase();
//                 const badgeClass = `badge badge-${normalizedSentiment === 'n/a' ? 'n-a' : normalizedSentiment}`;
//                 return (
//                   <motion.div key={sentiment} custom={index} variants={badgeVariants} initial="hidden" animate="visible" className={badgeClass} title={`Number of ${sentiment} sentiments: ${count}`}>
//                     {sentiment}: {count}
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//         {(results || []).length > 0 && (
//           <motion.div className="results card" variants={cardVariants} initial="hidden" animate="visible">
//             <h2>Results</h2>
//             {activeSection === 'file' && (
//               <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search text in results..." className="input-field" style={{ marginBottom: '20px', width: '100%' }} />
//             )}
//             <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={downloadResultsAsCSV} style={{ marginBottom: '20px' }}>
//               Download Results as CSV
//             </motion.button>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Text</th>
//                   {(activeSection === 'twitter' || activeSection === 'reddit') && (
//                     <>
//                       <th>Post Author Handle</th>
//                       <th>Post Date & Time</th>
//                     </>
//                   )}
//                   <th>Sentiment</th>
//                   <th>Confidence</th>
//                   <th>Score (-1 to +1)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(filteredResults || []).map((result, index) => {
//                   const postDateTime = result.created_at ? new Date(result.created_at).toLocaleString() : result.created_utc ? new Date(result.created_utc * 1000).toLocaleString() : 'N/A';
//                   const authorHandle = result.author || result.author_id || 'N/A';
//                   return (
//                     <motion.tr key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible" className="table-row">
//                       <td>{result.text}</td>
//                       {(activeSection === 'twitter' || activeSection === 'reddit') && (
//                         <>
//                           <td>{authorHandle}</td>
//                           <td>{postDateTime}</td>
//                         </>
//                       )}
//                       <td className={`sentiment-${result.sentiment.toLowerCase()}`}>{result.sentiment}</td>
//                       <td>{result.confidence?.toFixed(2)}</td>
//                       <td>{result.sentiment_score?.toFixed(2)}</td>
//                     </motion.tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </motion.div>
//         )}
//         {timeline.length > 0 && (
//           <motion.div className="timeline card" variants={cardVariants} initial="hidden" animate="visible">
//             <h3>Sentiment Timeline</h3>
//             <ul>
//               {timeline.map((entry, index) => (
//                 <motion.li key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible">
//                   <span>{entry.timestamp}</span>: <span className={`sentiment-${entry.sentiment.toLowerCase()}`}>{entry.sentiment}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//         {summary && (
//           <div className="charts">
//             <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
//               <h3>Sentiment Distribution</h3>
//               {pieData.datasets[0].data.every(val => val === 0) ? (
//                 <p className="no-data">No sentiment data to display.</p>
//               ) : (
//                 <>
//                   <Pie ref={pieChartRef} data={pieData} options={{ animation: { duration: 1500, easing: 'easeOutQuart' } }} />
//                   <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => downloadChartAsPNG(pieChartRef, 'sentiment_distribution.png')} style={{ marginTop: '10px' }}>
//                     Download Pie Chart as PNG
//                   </motion.button>
//                 </>
//               )}
//             </motion.div>
//             {(filteredResults || []).length > 0 ? (
//               <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
//                 <h3>Confidence Scores</h3>
//                 <Bar ref={barChartRef} data={barData} options={barOptions} />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => downloadChartAsPNG(barChartRef, 'confidence_scores.png')} style={{ marginTop: '10px' }}>
//                   Download Bar Chart as PNG
//                 </motion.button>
//               </motion.div>
//             ) : (
//               <p className="no-data">No confidence scores to display.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import { motion, AnimatePresence } from 'framer-motion';
// import Particles from '@tsparticles/react';
// import { loadSlim } from '@tsparticles/slim';
// // import io from 'socket.io-client'; // Commented out to remove socket.io dependency
// import './App.css';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// function App() {
//   const [text, setText] = useState('');
//   const [twitterQuery, setTwitterQuery] = useState('');
//   const [redditSubreddit, setRedditSubreddit] = useState('');
//   const [file, setFile] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   // const [audioFile, setAudioFile] = useState(null);
//   const [results, setResults] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [timeline, setTimeline] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [theme, setTheme] = useState('dark');
//   const [activeSection, setActiveSection] = useState('text');
//   const [searchQuery, setSearchQuery] = useState('');
//   // const [socket, setSocket] = useState(null); // Keeping this state for now, but it won't be used

//   const pieChartRef = useRef(null);
//   const barChartRef = useRef(null);

//   useEffect(() => {
//     // const newSocket = io('http://localhost:8000');
//     // setSocket(newSocket);
//     //
//     // newSocket.on('connect', () => console.log('Connected to WebSocket'));
//     // newSocket.on('message', (data) => {
//     //   console.log('WebSocket Data:', data);
//     //   setResults((prev) => [data, ...prev.slice(0, 9)]);
//     //   setSummary((prev) => {
//     //     const newSummary = { ...prev };
//     //     if (newSummary) newSummary[data.sentiment] = (newSummary[data.sentiment] || 0) + 1;
//     //     return newSummary;
//     //   });
//     // });
//     //
//     // return () => newSocket.disconnect();
//   }, []);

//   const particlesInit = useCallback(async (engine) => {
//     console.log('Particles initializing...');
//     await loadSlim(engine);
//     console.log('Particles initialized successfully!');
//   }, []);

//   const particlesOptions = {
//     background: {
//       color: {
//         value: theme === 'dark' ? 'linear-gradient(135deg, #0f172a 0%, #2a2e45 100%)' : 'linear-gradient(135deg, #e0e7ff 0%, #c3cfe2 100%)',
//       },
//     },
//     fpsLimit: 60,
//     interactivity: {
//       events: { onClick: { enable: true, mode: 'push' }, onHover: { enable: true, mode: 'repulse' }, resize: true },
//       modes: { push: { quantity: 2 }, repulse: { distance: 150, duration: 0.3 } },
//     },
//     particles: {
//       color: { value: theme === 'dark' ? '#6b7280' : '#3b82f6' },
//       links: { color: theme === 'dark' ? '#6b7280' : '#3b82f6', distance: 120, enable: true, opacity: 0.3, width: 0.8 },
//       collisions: { enable: true },
//       move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 1, straight: false },
//       number: { density: { enable: true, area: 1000 }, value: 50 },
//       opacity: { value: 0.4 },
//       shape: { type: 'circle' },
//       size: { value: { min: 1, max: 3 } },
//     },
//     detectRetina: true,
//   };

//   const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

//   const handleTextAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/sentiment?text=${encodeURIComponent(text)}`);
//       console.log('Text API Response:', response.data);
//       setResults([response.data]);
//       setSummary({ [response.data.sentiment]: 1 });
//     } catch (error) {
//       console.error('Text API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while analyzing text');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     let url = 'http://localhost:8000/sentiment/file';
//     if (file.type.startsWith('image/')) url = 'http://localhost:8000/sentiment/image';
//     else if (file.type.startsWith('audio/')) url = 'http://localhost:8000/sentiment/audio';

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     setSearchQuery('');
//     try {
//       const response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       console.log('File Upload API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setResults([response.data]);
//         setSummary({ [response.data.sentiment]: 1 });
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//       }
//     } catch (error) {
//       console.error('File Upload API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the file');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     e.preventDefault();
//     if (!imageFile) {
//       setError('Please select an image to upload');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', imageFile);

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.post('http://localhost:8000/sentiment/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       console.log('Image API Response:', response.data);
//       setResults([response.data]);
//       setSummary({ [response.data.sentiment]: 1 });
//     } catch (error) {
//       console.error('Image API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the image');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /*
//   const handleAudioUpload = async (e) => {
//     e.preventDefault();
//     if (!audioFile) {
//       setError('Please select an audio file to upload');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', audioFile);

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.post('http://localhost:8000/sentiment/audio', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       console.log('Audio API Response:', response.data);
//       setResults([response.data]);
//       setSummary({ [response.data.sentiment]: 1 });
//     } catch (error) {
//       console.error('Audio API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while processing the audio');
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   */

//   const handleTwitterAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/twitter?query=${encodeURIComponent(twitterQuery)}`);
//       console.log('Twitter API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setError('No results found for the given query.');
//         setResults([]);
//         setSummary(null);
//         setTimeline([]);
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//         setTimeline(response.data.timeline || []);
//       }
//     } catch (error) {
//       console.error('Twitter API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while fetching Twitter data.');
//       setResults([]);
//       setSummary(null);
//       setTimeline([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRedditAnalyze = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setSummary(null);
//     setTimeline([]);
//     try {
//       const response = await axios.get(`http://localhost:8000/reddit?subreddit=${encodeURIComponent(redditSubreddit)}`);
//       console.log('Reddit API Response:', response.data);
//       if (!response.data.results || response.data.results.length === 0) {
//         setError('No results found for the given subreddit.');
//         setResults([]);
//         setSummary(null);
//         setTimeline([]);
//       } else {
//         setResults(response.data.results);
//         setSummary(response.data.summary || null);
//         setTimeline(response.data.timeline || []);
//       }
//     } catch (error) {
//       console.error('Reddit API Error:', error.response?.data || error.message);
//       setError(error.response?.data?.error || 'An error occurred while fetching Reddit data');
//       setResults([]);
//       setTimeline([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const sendToSocket = () => {
//   //   // if (socket && text.trim()) {
//   //   //   socket.emit('message', text);
//   //   //   setText('');
//   //   // }
//   // };

//   const downloadResultsAsCSV = () => {
//     if (!results || results.length === 0) {
//       setError('No results to download.');
//       return;
//     }
//     let headers, rows;
//     if (activeSection === 'twitter' || activeSection === 'reddit') {
//       headers = ['Text', 'Post Author Handle', 'Post Date & Time', 'Sentiment', 'Confidence', 'Score (-1 to +1)'];
//       rows = results.map(result => {
//         const postDateTime = result.created_at ? new Date(result.created_at).toLocaleString() : result.created_utc ? new Date(result.created_utc * 1000).toLocaleString() : 'N/A';
//         const authorHandle = result.author || result.author_id || 'N/A';
//         return [`"${result.text.replace(/"/g, '""')}"`, authorHandle, `"${postDateTime}"`, result.sentiment, result.confidence?.toFixed(2), result.sentiment_score?.toFixed(2)];
//       });
//     } else {
//       headers = ['Text', 'Sentiment', 'Confidence', 'Score (-1 to +1)'];
//       rows = results.map(result => [`"${result.text.replace(/"/g, '""')}"`, result.sentiment, result.confidence?.toFixed(2), result.sentiment_score?.toFixed(2)]);
//     }
//     const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', 'sentiment_results.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const downloadChartAsPNG = (chartRef, fileName) => {
//     if (!chartRef.current) {
//       setError('Chart not available for download.');
//       return;
//     }
//     const chart = chartRef.current;
//     const url = chart.toBase64Image();
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filteredResults = activeSection === 'file' && searchQuery
//     ? results.filter(result => result.text.toLowerCase().includes(searchQuery.toLowerCase()))
//     : results;

//   const pieData = {
//     labels: summary ? Object.keys(summary) : [],
//     datasets: [{
//       label: 'Sentiment Distribution',
//       data: summary ? Object.values(summary) : [],
//       backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
//       borderColor: ['#059669', '#d97706', '#dc2626', '#4b5563'],
//       borderWidth: 1,
//     }],
//   };

//   const barData = {
//     labels: (filteredResults || []).map((result, index) => `Entry ${index + 1}`),
//     datasets: [{
//       label: 'Confidence Scores',
//       data: (filteredResults || []).map(result => result.confidence || 0),
//       backgroundColor: 'rgba(59, 130, 246, 0.6)',
//       borderColor: 'rgba(59, 130, 246, 1)',
//       borderWidth: 1,
//     }],
//   };

//   const barOptions = {
//     scales: {
//       y: { beginAtZero: true, max: 1, title: { display: true, text: 'Confidence' }, ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' }, grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' } },
//       x: { title: { display: true, text: 'Entries' }, ticks: { color: theme === 'dark' ? '#a1b3c9' : '#7f8c8d' }, grid: { color: theme === 'dark' ? 'rgba(161, 179, 201, 0.2)' : 'rgba(0, 0, 0, 0.1)' } },
//     },
//     animation: { duration: 1500, easing: 'easeOutQuart' },
//   };

//   const sidebarItemVariants = { hidden: { opacity: 0, x: -20 }, visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }) };
//   const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
//   const badgeVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' } }) };
//   const tableRowVariants = { hidden: { opacity: 0, x: -20 }, visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' } }) };

//   return (
//     <div className={`App ${theme}`} style={{ background: theme === 'dark' ? '#0f172a' : '#e0e7ff' }}>
//       <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="vanta-background" />
//       <motion.div className="sidebar" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
//         <div className="sidebar-header"><h2>Analysis Tools</h2></div>
//         <ul className="sidebar-menu">
//           {['text', 'file', 'image', 'twitter', 'reddit'].map((section, index) => (
//             <motion.li
//               key={section}
//               custom={index}
//               variants={sidebarItemVariants}
//               initial="hidden"
//               animate="visible"
//               className={activeSection === section ? 'active' : ''}
//               onClick={() => setActiveSection(section)}
//             >
//               {section === 'text' && 'Manual Text'}
//               {section === 'file' && 'File Upload'}
//               {section === 'image' && 'Image Sentiment'}
//               {section === 'twitter' && 'Twitter Sentiment'}
//               {section === 'reddit' && 'Reddit Sentiment'}
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>
//       <div className="main-content">
//         <motion.header className="header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
//           <h1>AI Sentiment Dashboard</h1>
//           <motion.button className="btn btn-theme" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme}>
//             {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
//           </motion.button>
//         </motion.header>
//         <motion.div className="content-section card" variants={cardVariants} initial="hidden" animate="visible">
//           {activeSection === 'text' && (
//             <>
//               <h2>Manual Text Input</h2>
//               <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to analyze" className="input-field" />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTextAnalyze}>Analyze Text</motion.button>
//               {/* Removed Real-Time Analyze Button */}
//             </>
//           )}
//           {activeSection === 'file' && (
//             <>
//               <h2>File Upload (Excel/CSV/Text)</h2>
//               <form onSubmit={handleFileUpload}>
//                 <input type="file" accept=".csv,.xlsx,.txt,image/*,audio/*" onChange={(e) => setFile(e.target.files[0])} className="input-field" />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Upload and Analyze</motion.button>
//               </form>
//             </>
//           )}
//           {activeSection === 'image' && (
//             <>
//               <h2>Image Sentiment</h2>
//               <form onSubmit={handleImageUpload}>
//                 <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="input-field" />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Analyze Image</motion.button>
//               </form>
//             </>
//           )}
//           {/*
//             {activeSection === 'audio' && (
//               <>
//                 <h2>Audio Sentiment</h2>
//                 <form onSubmit={handleAudioUpload}>
//                   <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} className="input-field" />
//                   <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">Analyze Audio</motion.button>
//                 </form>
//               </>
//             )}
//           */}
//           {activeSection === 'twitter' && (
//             <>
//               <h2>Twitter Sentiment</h2>
//               <input type="text" value={twitterQuery} onChange={(e) => setTwitterQuery(e.target.value)} placeholder="Enter Twitter query (e.g., #happy)" className="input-field" />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTwitterAnalyze}>Analyze</motion.button>
//             </>
//           )}
//           {activeSection === 'reddit' && (
//             <>
//               <h2>Reddit Sentiment</h2>
//               <input type="text" value={redditSubreddit} onChange={(e) => setRedditSubreddit(e.target.value)} placeholder="Enter subreddit (e.g., india)" className="input-field" />
//               <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRedditAnalyze}>Analyze</motion.button>
//             </>
//           )}
//         </motion.div>
//         <AnimatePresence>
//           {loading && (
//             <motion.div className="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
//               <div className="spinner"></div>
//               <p>Loading...</p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {error && (
//             <motion.p className="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
//               {error}
//             </motion.p>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {!loading && !error && (!results || results.length === 0) && !summary && (
//             <motion.p className="no-results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
//               No results to display. Try a different query.
//             </motion.p>
//           )}
//         </AnimatePresence>
//         {summary && (
//           <motion.div className="summary card" variants={cardVariants} initial="hidden" animate="visible">
//             <h3>Sentiment Summary</h3>
//             <div className="summary-badges">
//               {Object.entries(summary).map(([sentiment, count], index) => {
//                 const normalizedSentiment = sentiment.toLowerCase();
//                 const badgeClass = `badge badge-${normalizedSentiment === 'n/a' ? 'n-a' : normalizedSentiment}`;
//                 return (
//                   <motion.div key={sentiment} custom={index} variants={badgeVariants} initial="hidden" animate="visible" className={badgeClass} title={`Number of ${sentiment} sentiments: ${count}`}>
//                     {sentiment}: {count}
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//         {(results || []).length > 0 && (
//           <motion.div className="results card" variants={cardVariants} initial="hidden" animate="visible">
//             <h2>Results</h2>
//             {activeSection === 'file' && (
//               <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search text in results..." className="input-field" style={{ marginBottom: '20px', width: '100%' }} />
//             )}
//             <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={downloadResultsAsCSV} style={{ marginBottom: '20px' }}>
//               Download Results as CSV
//             </motion.button>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Text</th>
//                   {(activeSection === 'twitter' || activeSection === 'reddit') && (
//                     <>
//                       <th>Post Author Handle</th>
//                       <th>Post Date & Time</th>
//                     </>
//                   )}
//                   <th>Sentiment</th>
//                   <th>Confidence</th>
//                   <th>Score (-1 to +1)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(filteredResults || []).map((result, index) => {
//                   const postDateTime = result.created_at ? new Date(result.created_at).toLocaleString() : result.created_utc ? new Date(result.created_utc * 1000).toLocaleString() : 'N/A';
//                   const authorHandle = result.author || result.author_id || 'N/A';
//                   return (
//                     <motion.tr key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible" className="table-row">
//                       <td>{result.text}</td>
//                       {(activeSection === 'twitter' || activeSection === 'reddit') && (
//                         <>
//                           <td>{authorHandle}</td>
//                           <td>{postDateTime}</td>
//                         </>
//                       )}
//                       <td className={`sentiment-${result.sentiment.toLowerCase()}`}>{result.sentiment}</td>
//                       <td>{result.confidence?.toFixed(2)}</td>
//                       <td>{result.sentiment_score?.toFixed(2)}</td>
//                     </motion.tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </motion.div>
//         )}
//         {timeline.length > 0 && (
//           <motion.div className="timeline card" variants={cardVariants} initial="hidden" animate="visible">
//             <h3>Sentiment Timeline</h3>
//             <ul>
//               {timeline.map((entry, index) => (
//                 <motion.li key={index} custom={index} variants={tableRowVariants} initial="hidden" animate="visible">
//                   <span>{entry.timestamp}</span>: <span className={`sentiment-${entry.sentiment.toLowerCase()}`}>{entry.sentiment}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//         {summary && (
//           <div className="charts">
//             <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
//               <h3>Sentiment Distribution</h3>
//               {pieData.datasets[0].data.every(val => val === 0) ? (
//                 <p className="no-data">No sentiment data to display.</p>
//               ) : (
//                 <>
//                   <Pie ref={pieChartRef} data={pieData} options={{ animation: { duration: 1500, easing: 'easeOutQuart' } }} />
//                   <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => downloadChartAsPNG(pieChartRef, 'sentiment_distribution.png')} style={{ marginTop: '10px' }}>
//                     Download Pie Chart as PNG
//                   </motion.button>
//                 </>
//               )}
//             </motion.div>
//             {(filteredResults || []).length > 0 ? (
//               <motion.div className="chart-container card" variants={cardVariants} initial="hidden" animate="visible">
//                 <h3>Confidence Scores</h3>
//                 <Bar ref={barChartRef} data={barData} options={barOptions} />
//                 <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => downloadChartAsPNG(barChartRef, 'confidence_scores.png')} style={{ marginTop: '10px' }}>
//                   Download Bar Chart as PNG
//                 </motion.button>
//               </motion.div>
//             ) : (
//               <p className="no-data">No confidence scores to display.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
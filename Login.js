// const Login = ({
//   authError,
//   setAuthError,
//   setIsLoggedIn,
//   setUsername,
//   setPassword,
//   toggleTheme,
//   theme,
// }) => {
//   const navigate = useNavigate();
//   const [localUsername, setLocalUsername] = useState('');
//   const [localPassword, setLocalPassword] = useState('');
//   const [validationError, setValidationError] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setAuthError(null);
//     setValidationError(null);

//     // Input validation
//     if (localUsername.length < 3) {
//       setValidationError('Username must be at least 3 characters long.');
//       return;
//     }
//     if (localPassword.length < 6) {
//       setValidationError('Password must be at least 6 characters long.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/api/login', {
//         username: localUsername,
//         password: localPassword,
//       });

//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       setIsLoggedIn(true);
//       setUsername(localUsername);
//       setPassword(localPassword);
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login Error:', error.response || error.message);
//       setAuthError(error.response?.data?.error || 'Error logging in: ' + error.message);
//     }
//   };

//   return (
//     <motion.div
//       className="auth-container"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2>Login to AI Sentiment Dashboard</h2>
//       <motion.button
//         className="btn btn-theme"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={toggleTheme}
//         style={{ position: 'absolute', top: '20px', right: '20px' }}
//       >
//         {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
//       </motion.button>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Username</label>
//           <input
//             type="text"
//             value={localUsername}
//             onChange={(e) => {
//               console.log('Typing username:', e.target.value);
//               setLocalUsername(e.target.value);
//             }}
//             onKeyDown={(e) => console.log('Key pressed:', e.key)}
//             required
//             className="input-field"
//             autoComplete="off"
//             placeholder="Enter your username"
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={localPassword}
//             onChange={(e) => {
//               console.log('Typing password:', e.target.value);
//               setLocalPassword(e.target.value);
//             }}
//             onKeyDown={(e) => console.log('Key pressed:', e.key)}
//             required
//             className="input-field"
//             autoComplete="off"
//             placeholder="Enter your password"
//           />
//         </div>
//         {validationError && (
//           <motion.p
//             className="error"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             {validationError}
//           </motion.p>
//         )}
//         {authError && (
//           <motion.p
//             className="error"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             {authError}
//           </motion.p>
//         )}
//         <motion.button
//           className="btn btn-primary"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           type="submit"
//         >
//           Login
//         </motion.button>
//       </form>
//       <p>
//         Don't have an account? <Link to="/signup">Sign Up</Link>
//       </p>
//     </motion.div>
//   );
// };

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                // window.location.href = '/dashboard'; // Uncomment to redirect
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    });
});
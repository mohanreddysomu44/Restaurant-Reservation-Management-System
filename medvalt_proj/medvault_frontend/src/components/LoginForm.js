// import { useForm } from "react-hook-form";
// import { login } from "../services/authService";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Paper,
//   InputAdornment,
// } from "@mui/material";
// import LockIcon from "@mui/icons-material/Lock";
// import PersonIcon from "@mui/icons-material/Person";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const { register, handleSubmit } = useForm();
//   const { loginUser } = useContext(AuthContext);
//   const navigate=useNavigate()
//   const onSubmit = async (data) => {

//     try {
//       const res = await login(data.username, data.password);
//       loginUser(res);
//       alert("Login successful!");
//       console.log(res)
//        if(res.role=="ROLE_PATIENT"){
//           navigate("/patient")
//        }else if(res.role=="ROLE_DOCTOR"){
//         navigate("/doctor")
//        }else{
//         navigate("/admin")
//        }
//     } catch {
//       alert("Login failed!");
//     }
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         backdropFilter: "blur(20px)",
//         background: "rgba(255,255,255,0.05)",
//         border: "1px solid rgba(255,255,255,0.1)",
//         borderRadius: "20px",
//         padding: "40px",
//         width: 350,
//         color: "white",
//         boxShadow: "0 0 40px rgba(30,144,255,0.3)",
//         transition: "0.3s",
//         "&:hover": {
//           boxShadow: "0 0 60px rgba(30,144,255,0.6)",
//         },
//       }}
//     >
//       <Typography variant="h4" align="center" gutterBottom>
//         <LockIcon sx={{ color: "#1e90ff", mr: 1 }} />
//         Login
//       </Typography>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           fullWidth
//           label="Username"
//           variant="outlined"
//           margin="normal"
//           {...register("username")}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <PersonIcon sx={{ color: "#1e90ff" }} />
//               </InputAdornment>
//             ),
//             style: { color: "white" },
//           }}
//           sx={{
//             input: { color: "white" },
//             label: { color: "#aaa" },
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": { borderColor: "#1e90ff" },
//               "&:hover fieldset": { borderColor: "#1e90ff" },
//             },
//           }}
//         />

//         <TextField
//           fullWidth
//           label="Password"
//           type="password"
//           margin="normal"
//           {...register("password")}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <LockIcon sx={{ color: "#1e90ff" }} />
//               </InputAdornment>
//             ),
//             style: { color: "white" },
//           }}
//           sx={{
//             input: { color: "white" },
//             label: { color: "#aaa" },
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": { borderColor: "#1e90ff" },
//               "&:hover fieldset": { borderColor: "#1e90ff" },
//             },
//           }}
//         />

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{
//             mt: 3,
//             background: "linear-gradient(45deg, #1e90ff, #00bfff)",
//             fontWeight: "bold",
//             boxShadow: "0 0 20px rgba(30,144,255,0.6)",
//             "&:hover": {
//               boxShadow: "0 0 30px rgba(30,144,255,1)",
//             },
//           }}
//         >
//           LOGIN
//         </Button>
//       </form>
//     </Paper>
//   );
// };

// export default LoginForm;

import { useForm } from "react-hook-form";
import { login } from "../services/authService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Inject styles ──────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

  .login-page-bg {
    min-height: 100vh;
    background: #f5f7ff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .login-blob-1 { position: fixed; width: 500px; height: 500px; border-radius: 50%; background: rgba(79,110,247,.08); filter: blur(90px); top: -150px; right: -100px; pointer-events: none; z-index: 0; }
  .login-blob-2 { position: fixed; width: 400px; height: 400px; border-radius: 50%; background: rgba(124,58,237,.06); filter: blur(90px); bottom: -100px; left: -80px; pointer-events: none; z-index: 0; }
  .login-blob-3 { position: fixed; width: 300px; height: 300px; border-radius: 50%; background: rgba(8,145,178,.04); filter: blur(80px); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; z-index: 0; }

  .login-card {
    background: #ffffff;
    border: 1px solid #e8ecf5;
    border-radius: 24px;
    box-shadow: 0 4px 32px rgba(79,110,247,.10), 0 1px 4px rgba(0,0,0,.04);
    padding: 48px 48px 40px;
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
  }

  /* ── header ── */
  .login-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 36px;
    text-align: center;
  }
  .login-header-icon {
    width: 60px; height: 60px; border-radius: 18px;
    background: linear-gradient(135deg, #4f6ef7, #7c3aed);
    display: flex; align-items: center; justify-content: center;
    color: #fff; margin-bottom: 16px;
    box-shadow: 0 6px 24px rgba(79,110,247,.30);
  }
  .login-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #4f6ef7;
    letter-spacing: .3px;
    margin-bottom: 6px;
  }
  .login-brand span { color: #7c3aed; }
  .login-title {
    font-family: 'Cormorant Garamond', serif !important;
    font-size: 2rem !important;
    font-weight: 700 !important;
    color: #1a1f36 !important;
    line-height: 1.1 !important;
    margin-bottom: 5px !important;
  }
  .login-subtitle {
    font-size: .8rem;
    color: #8892b0;
  }

  /* ── field label ── */
  .login-field-label {
    font-size: .72rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #8892b0;
    font-weight: 600;
    margin-bottom: 6px;
    margin-top: 20px;
  }

  /* ── MUI overrides ── */
  .login-card .MuiOutlinedInput-root {
    border-radius: 12px !important;
    background: #f8f9ff !important;
    font-family: 'Outfit', sans-serif !important;
    font-size: .9rem !important;
    color: #1a1f36 !important;
  }
  .login-card .MuiOutlinedInput-notchedOutline { border-color: #e8ecf5 !important; }
  .login-card .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color: #c7cee8 !important; }
  .login-card .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: #4f6ef7 !important; border-width: 1.5px !important; }
  .login-card input { color: #1a1f36 !important; font-family: 'Outfit', sans-serif !important; }
  .login-adornment-icon { color: #b0b8d4 !important; font-size: 1.1rem !important; }

  /* ── submit button ── */
  .login-submit-btn {
    width: 100%;
    padding: 13px !important;
    border-radius: 12px !important;
    background: linear-gradient(135deg, #4f6ef7, #818cf8) !important;
    font-size: .95rem !important;
    font-weight: 600 !important;
    text-transform: none !important;
    letter-spacing: .2px !important;
    box-shadow: 0 4px 14px rgba(79,110,247,.28) !important;
    transition: all .2s !important;
    margin-top: 28px !important;
    font-family: 'Outfit', sans-serif !important;
  }
  .login-submit-btn:hover {
    box-shadow: 0 6px 22px rgba(79,110,247,.40) !important;
    transform: translateY(-1px);
  }

  /* ── divider + register link ── */
  .login-divider {
    display: flex; align-items: center; gap: 12px; margin: 24px 0 0;
  }
  .login-divider::before, .login-divider::after {
    content: ''; flex: 1; height: 1px; background: #e8ecf5;
  }
  .login-divider span { font-size: .72rem; color: #c0c8e0; white-space: nowrap; }
  .login-register-link {
    text-align: center; margin-top: 14px; font-size: .82rem; color: #8892b0;
  }
  .login-register-link a {
    color: #4f6ef7; font-weight: 600; text-decoration: none;
  }
  .login-register-link a:hover { text-decoration: underline; }
`;

if (!document.getElementById("login-page-styles")) {
  const s = document.createElement("style");
  s.id = "login-page-styles";
  s.textContent = css;
  document.head.appendChild(s);
}

// ─── Component ────────────────────────────────────────────────────────────────
const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ── UNCHANGED ──
  const onSubmit = async (data) => {
    try {
      const res = await login(data.username, data.password);
      loginUser(res);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      console.log(res);
      setTimeout(() => {
        if (res.role === "ROLE_PATIENT") {
          navigate("/patient");
        } else if (res.role === "ROLE_DOCTOR") {
          navigate("/doctor");
        } else {
          navigate("/admin");
        }
      }, 2000);
    } catch {
      toast.error("Login failed!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="login-page-bg">
      <div className="login-blob-1" />
      <div className="login-blob-2" />
      <div className="login-blob-3" />

      <Paper elevation={0} className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-header-icon">
            <LockIcon sx={{ fontSize: 28 }} />
          </div>
          <div className="login-brand">
            Med<span>Vault</span>
          </div>
          <Typography className="login-title">Welcome back</Typography>
          <span className="login-subtitle">
            Sign in to access your health portal
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-field-label">Email</div>
          <TextField
            fullWidth
            placeholder="Enter your username"
            variant="outlined"
            {...register("username")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon className="login-adornment-icon" />
                </InputAdornment>
              ),
            }}
          />

          <div className="login-field-label">Password</div>
          <TextField
            fullWidth
            placeholder="Enter your password"
            type="password"
            variant="outlined"
            {...register("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className="login-adornment-icon" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            className="login-submit-btn"
            startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
          >
            Sign In
          </Button>
        </form>

        <div className="login-divider">
          <span>don't have an account?</span>
        </div>
        <div className="login-register-link">
          <a href="/register">Create one now</a>
        </div>
      </Paper>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;

// import { useForm } from "react-hook-form";
// import { register as registerUser } from "../services/authService";
// import {
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   MenuItem,
//   InputAdornment,
// } from "@mui/material";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// import BadgeIcon from "@mui/icons-material/Badge";

// const RegisterForm = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       await registerUser(data);
//       alert("Registration successful!");
//     } catch (err) {
//       if (err.response && err.response.status === 409) {
//         alert("Username already exists. Please choose another.");
//       } else {
//         alert("Registration failed!");
//         console.log(err);
//       }
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
//         width: 380,
//         color: "white",
//         boxShadow: "0 0 40px rgba(30,144,255,0.3)",
//         transition: "0.3s",
//         "&:hover": {
//           boxShadow: "0 0 60px rgba(30,144,255,0.6)",
//         },
//       }}
//     >
//       <Typography variant="h4" align="center" gutterBottom>
//         <PersonAddIcon sx={{ color: "#1e90ff", mr: 1 }} />
//         Register
//       </Typography>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Username */}
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

//         {/* Password */}
//         <TextField
//           fullWidth
//           label="Password"
//           type="password"
//           autoComplete="new-password"
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

//         {/* Role */}
//         <TextField
//           select
//           fullWidth
//           label="Role"
//           margin="normal"
//           {...register("role")}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <BadgeIcon sx={{ color: "#1e90ff" }} />
//               </InputAdornment>
//             ),
//             style: { color: "white" },
//           }}
//           sx={{
//             label: { color: "#aaa" },
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": { borderColor: "#1e90ff" },
//               "&:hover fieldset": { borderColor: "#1e90ff" },
//             },
//             "& .MuiSvgIcon-root": { color: "white" },
//           }}
//         >
//           <MenuItem value="ROLE_PATIENT">Patient</MenuItem>
//           <MenuItem value="ROLE_DOCTOR">Doctor</MenuItem>
//         </TextField>

//         {/* Button */}
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
//           REGISTER
//         </Button>
//       </form>
//     </Paper>
//   );
// };

// export default RegisterForm;

import { useForm } from "react-hook-form";
import { register as registerUser, login } from "../services/authService";
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Inject styles ──────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

  .register-page-bg {
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

  .reg-blob-1 { position: fixed; width: 500px; height: 500px; border-radius: 50%; background: rgba(79,110,247,.08); filter: blur(90px); top: -150px; right: -100px; pointer-events: none; z-index: 0; }
  .reg-blob-2 { position: fixed; width: 400px; height: 400px; border-radius: 50%; background: rgba(124,58,237,.06); filter: blur(90px); bottom: -100px; left: -80px;  pointer-events: none; z-index: 0; }

  .reg-card {
    background: #ffffff;
    border: 1px solid #e8ecf5;
    border-radius: 24px;
    box-shadow: 0 4px 32px rgba(79,110,247,.10), 0 1px 4px rgba(0,0,0,.04);
    padding: 44px 48px;
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 1;
  }

  /* ── header ── */
  .reg-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
    text-align: center;
  }
  .reg-header-icon {
    width: 56px; height: 56px; border-radius: 16px;
    background: linear-gradient(135deg, #4f6ef7, #7c3aed);
    display: flex; align-items: center; justify-content: center;
    color: #fff; margin-bottom: 14px;
    box-shadow: 0 6px 20px rgba(79,110,247,.28);
  }
  .reg-title {
    font-family: 'Cormorant Garamond', serif !important;
    font-size: 2rem !important;
    font-weight: 700 !important;
    color: #1a1f36 !important;
    line-height: 1.1 !important;
    margin-bottom: 4px !important;
  }
  .reg-subtitle {
    font-size: .8rem;
    color: #8892b0;
  }

  /* ── field label ── */
  .reg-field-label {
    font-size: .72rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #8892b0;
    font-weight: 600;
    margin-bottom: 6px;
    margin-top: 20px;
  }

  /* ── MUI field overrides ── */
  .reg-card .MuiOutlinedInput-root {
    border-radius: 12px !important;
    background: #f8f9ff !important;
    font-family: 'Outfit', sans-serif !important;
    font-size: .9rem !important;
    color: #1a1f36 !important;
  }
  .reg-card .MuiOutlinedInput-notchedOutline { border-color: #e8ecf5 !important; }
  .reg-card .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color: #c7cee8 !important; }
  .reg-card .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: #4f6ef7 !important; border-width: 1.5px !important; }
  .reg-card .MuiInputLabel-root { font-family: 'Outfit', sans-serif !important; color: #8892b0 !important; font-size: .875rem !important; }
  .reg-card .MuiInputLabel-root.Mui-focused { color: #4f6ef7 !important; }
  .reg-card input { color: #1a1f36 !important; }
  .reg-card .MuiSelect-select { color: #1a1f36 !important; font-family: 'Outfit', sans-serif !important; }
  .reg-card .MuiSvgIcon-root { color: #8892b0 !important; }
  .reg-card .MuiMenuItem-root { font-family: 'Outfit', sans-serif !important; }

  /* ── adornment icons ── */
  .reg-adornment-icon { color: #b0b8d4 !important; font-size: 1.1rem !important; }

  /* ── submit button ── */
  .reg-submit-btn {
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
  .reg-submit-btn:hover {
    box-shadow: 0 6px 22px rgba(79,110,247,.38) !important;
    transform: translateY(-1px);
  }

  /* ── login link ── */
  .reg-login-link {
    text-align: center;
    margin-top: 20px;
    font-size: .82rem;
    color: #8892b0;
  }
  .reg-login-link a {
    color: #4f6ef7;
    font-weight: 600;
    text-decoration: none;
  }
  .reg-login-link a:hover { text-decoration: underline; }

  /* ── divider ── */
  .reg-divider {
    display: flex; align-items: center; gap: 12px; margin: 24px 0 0;
  }
  .reg-divider::before, .reg-divider::after {
    content: ''; flex: 1; height: 1px; background: #e8ecf5;
  }
  .reg-divider span { font-size: .72rem; color: #c0c8e0; white-space: nowrap; }
`;

if (!document.getElementById("register-page-styles")) {
  const s = document.createElement("style");
  s.id = "register-page-styles";
  s.textContent = css;
  document.head.appendChild(s);
}

// ─── Component ────────────────────────────────────────────────────────────────

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  // ── UNCHANGED ──
  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 2000, // 2 seconds
      });

      // wait 2 seconds before navigating
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("Username already exists. Please choose another.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Registration failed!", {
          position: "top-right",
          autoClose: 2000,
        });
        console.log(err);
      }
    }
  };

  return (
    <div className="register-page-bg">
      <div className="reg-blob-1" />
      <div className="reg-blob-2" />

      <Paper elevation={0} className="reg-card">
        {/* Header */}
        <div className="reg-header">
          <div className="reg-header-icon">
            <PersonAddIcon sx={{ fontSize: 26 }} />
          </div>
          <Typography className="reg-title">Create Account</Typography>
          <span className="reg-subtitle">
            Join MedVault and manage your health
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="reg-field-label">Email</div>
          <TextField
            fullWidth
            placeholder="Enter your username"
            variant="outlined"
            {...register("username")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon className="reg-adornment-icon" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <div className="reg-field-label">Password</div>
          <TextField
            fullWidth
            placeholder="Create a password"
            type="password"
            autoComplete="new-password"
            variant="outlined"
            {...register("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className="reg-adornment-icon" />
                </InputAdornment>
              ),
            }}
          />

          {/* Role */}
          <div className="reg-field-label">Role</div>
          <TextField
            select
            fullWidth
            variant="outlined"
            defaultValue=""
            {...register("role")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon className="reg-adornment-icon" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="ROLE_PATIENT">Patient</MenuItem>
            <MenuItem value="ROLE_DOCTOR">Doctor</MenuItem>
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            className="reg-submit-btn"
            startIcon={<PersonAddIcon sx={{ fontSize: 18 }} />}
          >
            Create Account
          </Button>
        </form>

        {/* Divider + login hint */}
        <div className="reg-divider">
          <span>already have an account?</span>
        </div>
        <div className="reg-login-link">
          <a href="/login">Sign in instead</a>
        </div>
      </Paper>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;

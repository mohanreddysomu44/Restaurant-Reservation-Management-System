// import { useState } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   MenuItem,
//   InputAdornment,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import WcIcon from "@mui/icons-material/Wc";
// import CakeIcon from "@mui/icons-material/Cake";
// import PhoneIcon from "@mui/icons-material/Phone";
// import NumbersIcon from "@mui/icons-material/Numbers";
// import SaveIcon from "@mui/icons-material/Save";
// import { motion } from "framer-motion";

// // ── Inject styles ──────────────────────────────────────────────────────────────
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

//   .ppf-page {
//     min-height: 100vh;
//     background: #f5f7ff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 40px 16px;
//     font-family: 'Outfit', sans-serif;
//     position: relative;
//     overflow: hidden;
//   }

//   .ppf-blob-1 { position:fixed; width:500px; height:500px; border-radius:50%; background:rgba(79,110,247,.08); filter:blur(90px); top:-150px; right:-100px; pointer-events:none; z-index:0; }
//   .ppf-blob-2 { position:fixed; width:400px; height:400px; border-radius:50%; background:rgba(124,58,237,.06); filter:blur(90px); bottom:-100px; left:-80px; pointer-events:none; z-index:0; }
//   .ppf-blob-3 { position:fixed; width:320px; height:320px; border-radius:50%; background:rgba(8,145,178,.04); filter:blur(80px); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; z-index:0; }

//   .ppf-card {
//     background: #ffffff;
//     border: 1px solid #e8ecf5;
//     border-radius: 24px;
//     box-shadow: 0 4px 32px rgba(79,110,247,.10), 0 1px 4px rgba(0,0,0,.04);
//     padding: 44px 48px;
//     width: 100%;
//     max-width: 480px;
//     position: relative;
//     z-index: 1;
//   }
//   @media(max-width:560px){ .ppf-card{ padding:32px 22px; } }

//   /* header */
//   .ppf-header {
//     display:flex; flex-direction:column; align-items:center;
//     margin-bottom:32px; text-align:center;
//   }
//   .ppf-header-icon {
//     width:58px; height:58px; border-radius:16px;
//     background:linear-gradient(135deg,#4f6ef7,#7c3aed);
//     display:flex; align-items:center; justify-content:center;
//     color:#fff; margin-bottom:16px;
//     box-shadow:0 6px 24px rgba(79,110,247,.28);
//   }
//   .ppf-brand { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:600; color:#4f6ef7; margin-bottom:6px; }
//   .ppf-brand span { color:#7c3aed; }
//   .ppf-title { font-family:'Cormorant Garamond',serif !important; font-size:1.9rem !important; font-weight:700 !important; color:#1a1f36 !important; line-height:1.15 !important; margin-bottom:5px !important; }
//   .ppf-subtitle { font-size:.8rem; color:#8892b0; }

//   /* field label */
//   .ppf-label {
//     font-size:.72rem; text-transform:uppercase; letter-spacing:1px;
//     color:#8892b0; font-weight:600; margin-bottom:6px; margin-top:20px;
//   }

//   /* age display */
//   .ppf-age-row {
//     display:flex; align-items:center; gap:10px;
//     padding:13px 16px; border-radius:12px;
//     background:#f0f2f8; border:1px solid #e8ecf5;
//   }
//   .ppf-age-val { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:#4f6ef7; }
//   .ppf-age-unit { font-size:.82rem; color:#8892b0; }
//   .ppf-age-placeholder { font-size:.88rem; color:#b0b8d0; }

//   /* MUI overrides */
//   .ppf-card .MuiOutlinedInput-root {
//     border-radius:12px !important; background:#f8f9ff !important;
//     font-family:'Outfit',sans-serif !important; font-size:.9rem !important; color:#1a1f36 !important;
//   }
//   .ppf-card .MuiOutlinedInput-notchedOutline { border-color:#e8ecf5 !important; }
//   .ppf-card .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color:#c7cee8 !important; }
//   .ppf-card .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color:#4f6ef7 !important; border-width:1.5px !important; }
//   .ppf-card input { color:#1a1f36 !important; font-family:'Outfit',sans-serif !important; }
//   .ppf-card .MuiSelect-select { color:#1a1f36 !important; font-family:'Outfit',sans-serif !important; }
//   .ppf-card .MuiMenuItem-root { font-family:'Outfit',sans-serif !important; font-size:.875rem !important; }
//   .ppf-card .MuiSvgIcon-root { color:#b0b8d4 !important; }
//   .ppf-adornment { color:#b0b8d4 !important; font-size:1.1rem !important; }

//   /* submit */
//   .ppf-btn {
//     width:100%; padding:13px !important; border-radius:12px !important;
//     background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;
//     font-size:.95rem !important; font-weight:600 !important;
//     text-transform:none !important; letter-spacing:.2px !important;
//     box-shadow:0 4px 14px rgba(79,110,247,.28) !important;
//     transition:all .2s !important; margin-top:28px !important;
//     font-family:'Outfit',sans-serif !important;
//   }
//   .ppf-btn:hover { box-shadow:0 6px 22px rgba(79,110,247,.40) !important; transform:translateY(-1px); }
//   .ppf-btn:disabled { opacity:.7 !important; transform:none !important; }

//   /* error */
//   .ppf-error {
//     margin-top:16px; padding:12px 16px; border-radius:12px;
//     background:#fff1f3; border:1px solid rgba(225,29,72,.2);
//     color:#e11d48; font-size:.83rem; font-weight:500;
//   }
// `;

// if (!document.getElementById("ppf-styles")) {
//   const s = document.createElement("style");
//   s.id = "ppf-styles";
//   s.textContent = css;
//   document.head.appendChild(s);
// }

// // ── age helper (same logic as old code) ───────────────────────────────────────
// const calculateAge = (dob) => {
//   const birthDate = new Date(dob);
//   const diff = Date.now() - birthDate.getTime();
//   return new Date(diff).getUTCFullYear() - 1970;
// };

// // ── Component ──────────────────────────────────────────────────────────────────
// export default function PatientProfileForm({ userId, onCreated }) {
//   const [form, setForm] = useState({
//     name: "",
//     gender: "",
//     dob: "",
//     age: "",
//     contact: "",
//   });
//   const [error,   setError]   = useState("");
//   const [loading, setLoading] = useState(false);

//   // ── SAME logic as old code ──
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "dob") {
//       setForm({ ...form, dob: value, age: calculateAge(value) });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:8080/patient", {
//         ...form,
//         user: { id: Number(userId) },
//       });
//       onCreated(res.data);          // hand created patient back to dashboard
//     } catch {
//       setError("Failed to create patient profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="ppf-page">
//       <div className="ppf-blob-1" />
//       <div className="ppf-blob-2" />
//       <div className="ppf-blob-3" />

//       <motion.div
//         initial={{ opacity: 0, y: 36 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//         style={{ width: "100%", display: "flex", justifyContent: "center" }}
//       >
//         <Paper elevation={0} className="ppf-card">

//           {/* ── Header ── */}
//           <div className="ppf-header">
//             <div className="ppf-header-icon">
//               <PersonIcon sx={{ fontSize: 28 }} />
//             </div>
//             <div className="ppf-brand">Med<span>Vault</span></div>
//             <Typography className="ppf-title">Complete Your Profile</Typography>
//             <span className="ppf-subtitle">Fill in your details to access your health portal</span>
//           </div>

//           {/* ── Form ── */}
//           <form onSubmit={handleSubmit}>

//             {/* Name */}
//             <div className="ppf-label">Full Name</div>
//             <TextField
//               fullWidth
//               name="name"
//               placeholder="e.g. Arjun Sharma"
//               variant="outlined"
//               onChange={handleChange}
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PersonIcon className="ppf-adornment" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Gender */}
//             <div className="ppf-label">Gender</div>
//             <TextField
//               select
//               fullWidth
//               name="gender"
//               variant="outlined"
//               value={form.gender}
//               onChange={handleChange}
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <WcIcon className="ppf-adornment" />
//                   </InputAdornment>
//                 ),
//               }}
//             >
//               <MenuItem value="">Select gender</MenuItem>
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//               <MenuItem value="Other">Other</MenuItem>
//             </TextField>

//             {/* Date of Birth */}
//             <div className="ppf-label">Date of Birth</div>
//             <TextField
//               fullWidth
//               type="date"
//               name="dob"
//               variant="outlined"
//               onChange={handleChange}
//               required
//               InputLabelProps={{ shrink: true }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <CakeIcon className="ppf-adornment" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Age — auto-calculated (read-only, same as old code) */}
//             <div className="ppf-label">Age (auto-calculated)</div>
//             <div className="ppf-age-row">
//               <NumbersIcon sx={{ fontSize: 18, color: "#b0b8d4" }} />
//               {form.age !== "" ? (
//                 <>
//                   <span className="ppf-age-val">{form.age}</span>
//                   <span className="ppf-age-unit">years old</span>
//                 </>
//               ) : (
//                 <span className="ppf-age-placeholder">
//                   Will calculate automatically from DOB
//                 </span>
//               )}
//             </div>

//             {/* Contact */}
//             <div className="ppf-label">Contact Number</div>
//             <TextField
//               fullWidth
//               name="contact"
//               placeholder="e.g. +91 98765 43210"
//               variant="outlined"
//               onChange={handleChange}
//               required
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PhoneIcon className="ppf-adornment" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Submit */}
//             <Button
//               type="submit"
//               variant="contained"
//               className="ppf-btn"
//               disabled={loading}
//               startIcon={<SaveIcon sx={{ fontSize: 18 }} />}
//             >
//               {loading ? "Saving…" : "Save Profile & Continue"}
//             </Button>

//           </form>

//           {error && <div className="ppf-error">⚠ {error}</div>}

//         </Paper>
//       </motion.div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import {
  TextField, Button, Paper, Typography,
  MenuItem, InputAdornment,
} from "@mui/material";
import PersonIcon   from "@mui/icons-material/Person";
import WcIcon       from "@mui/icons-material/Wc";
import CakeIcon     from "@mui/icons-material/Cake";
import PhoneIcon    from "@mui/icons-material/Phone";
import NumbersIcon  from "@mui/icons-material/Numbers";
import EmailIcon    from "@mui/icons-material/Email";
import SaveIcon     from "@mui/icons-material/Save";
import { motion }   from "framer-motion";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

  .ppf-page {
    min-height: 100vh;
    background: #f5f7ff;
    display: flex; align-items: center; justify-content: center;
    padding: 40px 16px;
    font-family: 'Outfit', sans-serif;
    position: relative; overflow: hidden;
  }
  .ppf-blob-1 { position:fixed;width:500px;height:500px;border-radius:50%;background:rgba(79,110,247,.08);filter:blur(90px);top:-150px;right:-100px;pointer-events:none;z-index:0; }
  .ppf-blob-2 { position:fixed;width:400px;height:400px;border-radius:50%;background:rgba(124,58,237,.06);filter:blur(90px);bottom:-100px;left:-80px;pointer-events:none;z-index:0; }
  .ppf-blob-3 { position:fixed;width:320px;height:320px;border-radius:50%;background:rgba(8,145,178,.04);filter:blur(80px);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:0; }

  .ppf-card {
    background:#fff; border:1px solid #e8ecf5; border-radius:24px;
    box-shadow:0 4px 32px rgba(79,110,247,.10),0 1px 4px rgba(0,0,0,.04);
    padding:44px 48px; width:100%; max-width:480px;
    position:relative; z-index:1;
  }
  @media(max-width:560px){ .ppf-card{ padding:32px 22px; } }

  .ppf-header { display:flex;flex-direction:column;align-items:center;margin-bottom:32px;text-align:center; }
  .ppf-header-icon { width:58px;height:58px;border-radius:16px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:16px;box-shadow:0 6px 24px rgba(79,110,247,.28); }
  .ppf-brand { font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:600;color:#4f6ef7;margin-bottom:6px; }
  .ppf-brand span { color:#7c3aed; }
  .ppf-title { font-family:'Cormorant Garamond',serif !important;font-size:1.9rem !important;font-weight:700 !important;color:#1a1f36 !important;line-height:1.15 !important;margin-bottom:5px !important; }
  .ppf-subtitle { font-size:.8rem;color:#8892b0; }

  .ppf-label { font-size:.72rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:6px;margin-top:20px; }

  .ppf-age-row { display:flex;align-items:center;gap:10px;padding:13px 16px;border-radius:12px;background:#f0f2f8;border:1px solid #e8ecf5; }
  .ppf-age-val { font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;color:#4f6ef7; }
  .ppf-age-unit { font-size:.82rem;color:#8892b0; }
  .ppf-age-placeholder { font-size:.88rem;color:#b0b8d0; }

  .ppf-card .MuiOutlinedInput-root { border-radius:12px !important;background:#f8f9ff !important;font-family:'Outfit',sans-serif !important;font-size:.9rem !important;color:#1a1f36 !important; }
  .ppf-card .MuiOutlinedInput-notchedOutline { border-color:#e8ecf5 !important; }
  .ppf-card .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color:#c7cee8 !important; }
  .ppf-card .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color:#4f6ef7 !important;border-width:1.5px !important; }
  .ppf-card input { color:#1a1f36 !important;font-family:'Outfit',sans-serif !important; }
  .ppf-card .MuiSelect-select { color:#1a1f36 !important;font-family:'Outfit',sans-serif !important; }
  .ppf-card .MuiMenuItem-root { font-family:'Outfit',sans-serif !important;font-size:.875rem !important; }
  .ppf-card .MuiSvgIcon-root { color:#b0b8d4 !important; }
  .ppf-adornment { color:#b0b8d4 !important;font-size:1.1rem !important; }

  .ppf-btn { width:100%;padding:13px !important;border-radius:12px !important;background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;font-size:.95rem !important;font-weight:600 !important;text-transform:none !important;letter-spacing:.2px !important;box-shadow:0 4px 14px rgba(79,110,247,.28) !important;transition:all .2s !important;margin-top:28px !important;font-family:'Outfit',sans-serif !important; }
  .ppf-btn:hover { box-shadow:0 6px 22px rgba(79,110,247,.40) !important;transform:translateY(-1px); }
  .ppf-btn:disabled { opacity:.7 !important;transform:none !important; }

  .ppf-error { margin-top:16px;padding:12px 16px;border-radius:12px;background:#fff1f3;border:1px solid rgba(225,29,72,.2);color:#e11d48;font-size:.83rem;font-weight:500; }
`;

if (!document.getElementById("ppf-styles")) {
  const s = document.createElement("style");
  s.id = "ppf-styles"; s.textContent = css;
  document.head.appendChild(s);
}

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  return new Date(diff).getUTCFullYear() - 1970;
};

export default function PatientProfileForm({ userId, onCreated }) {
  const [form, setForm] = useState({
    name: "", gender: "", dob: "", age: "",
    contact: "", email: "",          // ← email added
  });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      setForm({ ...form, dob: value, age: calculateAge(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await axios.post("http://localhost:8080/patient", {
        ...form,
        user: { id: Number(userId) },
      });
      onCreated(res.data);
    } catch {
      setError("Failed to create patient profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ppf-page">
      <div className="ppf-blob-1"/><div className="ppf-blob-2"/><div className="ppf-blob-3"/>
      <motion.div initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
        style={{ width:"100%", display:"flex", justifyContent:"center" }}>
        <Paper elevation={0} className="ppf-card">

          <div className="ppf-header">
            <div className="ppf-header-icon"><PersonIcon sx={{ fontSize:28 }}/></div>
            <div className="ppf-brand">Med<span>Vault</span></div>
            <Typography className="ppf-title">Complete Your Profile</Typography>
            <span className="ppf-subtitle">Fill in your details to access your health portal</span>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="ppf-label">Full Name</div>
            <TextField fullWidth name="name" placeholder="e.g. Arjun Sharma"
              variant="outlined" onChange={handleChange} required
              InputProps={{ startAdornment:<InputAdornment position="start"><PersonIcon className="ppf-adornment"/></InputAdornment> }}/>

            {/* Gender */}
            <div className="ppf-label">Gender</div>
            <TextField select fullWidth name="gender" variant="outlined"
              value={form.gender} onChange={handleChange} required
              InputProps={{ startAdornment:<InputAdornment position="start"><WcIcon className="ppf-adornment"/></InputAdornment> }}>
              <MenuItem value="">Select gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            {/* Date of Birth */}
            <div className="ppf-label">Date of Birth</div>
            <TextField fullWidth type="date" name="dob" variant="outlined"
              onChange={handleChange} required InputLabelProps={{ shrink:true }}
              InputProps={{ startAdornment:<InputAdornment position="start"><CakeIcon className="ppf-adornment"/></InputAdornment> }}/>

            {/* Age — auto-calculated */}
            <div className="ppf-label">Age (auto-calculated)</div>
            <div className="ppf-age-row">
              <NumbersIcon sx={{ fontSize:18, color:"#b0b8d4" }}/>
              {form.age !== "" ? (
                <><span className="ppf-age-val">{form.age}</span><span className="ppf-age-unit">years old</span></>
              ) : (
                <span className="ppf-age-placeholder">Will calculate automatically from DOB</span>
              )}
            </div>

            {/* Email ← NEW */}
            <div className="ppf-label">Email Address</div>
            <TextField fullWidth name="email" type="email"
              placeholder="e.g. arjun@email.com"
              variant="outlined" onChange={handleChange} required
              InputProps={{ startAdornment:<InputAdornment position="start"><EmailIcon className="ppf-adornment"/></InputAdornment> }}/>

            {/* Contact */}
            <div className="ppf-label">Contact Number</div>
            <TextField fullWidth name="contact" placeholder="e.g. +91 98765 43210"
              variant="outlined" onChange={handleChange} required
              InputProps={{ startAdornment:<InputAdornment position="start"><PhoneIcon className="ppf-adornment"/></InputAdornment> }}/>

            <Button type="submit" variant="contained" className="ppf-btn"
              disabled={loading} startIcon={<SaveIcon sx={{ fontSize:18 }}/>}>
              {loading ? "Saving…" : "Save Profile & Continue"}
            </Button>

          </form>

          {error && <div className="ppf-error">⚠ {error}</div>}
        </Paper>
      </motion.div>
    </div>
  );
}
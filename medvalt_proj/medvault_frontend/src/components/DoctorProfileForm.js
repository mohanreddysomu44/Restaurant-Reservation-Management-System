// // import { useState } from "react";
// // import axios from "axios";
// // import {
// //   Box,
// //   TextField,
// //   Button,
// //   Paper,
// //   Typography,
// // } from "@mui/material";

// // export default function DoctorProfileForm({ userId, onCreated }) {
// //   const [name, setName] = useState("");
// //   const [specialization, setSpecialization] = useState("");
// //   const [contact, setContact] = useState("");
// //   const [hospital, setHospital] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");

// //     console.log("User ID:", userId);
// //      // 🔍 debug

// //      localStorage.getItem("user")

// //     try {
// //       const response = await axios.post("http://localhost:8080/doctor", {
// //         name,
// //         specialization,
// //         contact,
// //         hospital,
// //         user:{"id":userId}// ✅ correct for your entity
// //       });

// //       onCreated(response.data);
// //     } catch (err) {
// //       console.error(err);
// //       setError("Failed to create doctor profile");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         background: "linear-gradient(135deg, #020617, #0f172a)",
// //       }}
// //     >
// //       <Paper
// //         elevation={10}
// //         sx={{
// //           p: 5,
// //           width: 400,
// //           borderRadius: 4,
// //           backgroundColor: "#0f172a",
// //           color: "#fff",
// //         }}
// //       >
// //         <Typography
// //           variant="h5"
// //           sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
// //         >
// //           Create Doctor Profile
// //         </Typography>

// //         <form onSubmit={handleSubmit}>
// //           <TextField
// //             label="Full Name"
// //             fullWidth
// //             required
// //             margin="normal"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             InputLabelProps={{ style: { color: "#94a3b8" } }}
// //             InputProps={{ style: { color: "#fff" } }}
// //           />

// //           <TextField
// //             label="Specialization"
// //             fullWidth
// //             required
// //             margin="normal"
// //             value={specialization}
// //             onChange={(e) => setSpecialization(e.target.value)}
// //             InputLabelProps={{ style: { color: "#94a3b8" } }}
// //             InputProps={{ style: { color: "#fff" } }}
// //           />

// //           <TextField
// //             label="Contact Number"
// //             fullWidth
// //             required
// //             margin="normal"
// //             value={contact}
// //             onChange={(e) => setContact(e.target.value)}
// //             InputLabelProps={{ style: { color: "#94a3b8" } }}
// //             InputProps={{ style: { color: "#fff" } }}
// //           />

// //           <TextField
// //             label="Hospital"
// //             fullWidth
// //             required
// //             margin="normal"
// //             value={hospital}
// //             onChange={(e) => setHospital(e.target.value)}
// //             InputLabelProps={{ style: { color: "#94a3b8" } }}
// //             InputProps={{ style: { color: "#fff" } }}
// //           />

// //           {error && (
// //             <Typography color="error" sx={{ mt: 2 }}>
// //               {error}
// //             </Typography>
// //           )}

// //           <Button
// //             type="submit"
// //             fullWidth
// //             variant="contained"
// //             sx={{
// //               mt: 3,
// //               py: 1.5,
// //               backgroundColor: "#2563eb",
// //               "&:hover": { backgroundColor: "#1d4ed8" },
// //             }}
// //             disabled={loading}
// //           >
// //             {loading ? "Creating..." : "Create Profile"}
// //           </Button>
// //         </form>
// //       </Paper>
// //     </Box>
// //   );
// // }


// import { useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   InputAdornment,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import SaveIcon from "@mui/icons-material/Save";
// import { motion } from "framer-motion";

// // ── Inject styles ──────────────────────────────────────────────────────────────
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

//   .dpf-page {
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

//   .dpf-blob-1 { position:fixed; width:500px; height:500px; border-radius:50%; background:rgba(79,110,247,.08); filter:blur(90px); top:-150px; right:-100px; pointer-events:none; z-index:0; }
//   .dpf-blob-2 { position:fixed; width:400px; height:400px; border-radius:50%; background:rgba(124,58,237,.06); filter:blur(90px); bottom:-100px; left:-80px; pointer-events:none; z-index:0; }
//   .dpf-blob-3 { position:fixed; width:320px; height:320px; border-radius:50%; background:rgba(8,145,178,.04); filter:blur(80px); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; z-index:0; }

//   .dpf-card {
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
//   @media(max-width:560px){ .dpf-card{ padding:32px 22px; } }

//   /* header */
//   .dpf-header {
//     display:flex; flex-direction:column; align-items:center;
//     margin-bottom:32px; text-align:center;
//   }
//   .dpf-header-icon {
//     width:58px; height:58px; border-radius:16px;
//     background:linear-gradient(135deg,#4f6ef7,#7c3aed);
//     display:flex; align-items:center; justify-content:center;
//     color:#fff; margin-bottom:16px;
//     box-shadow:0 6px 24px rgba(79,110,247,.28);
//   }
//   .dpf-brand { font-family:'Cormorant Garamond',serif; font-size:1.05rem; font-weight:600; color:#4f6ef7; margin-bottom:6px; }
//   .dpf-brand span { color:#7c3aed; }
//   .dpf-title { font-family:'Cormorant Garamond',serif !important; font-size:1.9rem !important; font-weight:700 !important; color:#1a1f36 !important; line-height:1.15 !important; margin-bottom:5px !important; }
//   .dpf-subtitle { font-size:.8rem; color:#8892b0; }

//   /* field label */
//   .dpf-label {
//     font-size:.72rem; text-transform:uppercase; letter-spacing:1px;
//     color:#8892b0; font-weight:600; margin-bottom:6px; margin-top:20px;
//   }

//   /* MUI overrides */
//   .dpf-card .MuiOutlinedInput-root {
//     border-radius:12px !important; background:#f8f9ff !important;
//     font-family:'Outfit',sans-serif !important; font-size:.9rem !important; color:#1a1f36 !important;
//   }
//   .dpf-card .MuiOutlinedInput-notchedOutline { border-color:#e8ecf5 !important; }
//   .dpf-card .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color:#c7cee8 !important; }
//   .dpf-card .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color:#4f6ef7 !important; border-width:1.5px !important; }
//   .dpf-card input { color:#1a1f36 !important; font-family:'Outfit',sans-serif !important; }
//   .dpf-card .MuiSvgIcon-root { color:#b0b8d4 !important; }
//   .dpf-adornment { color:#b0b8d4 !important; }

//   /* submit */
//   .dpf-btn {
//     width:100%; padding:13px !important; border-radius:12px !important;
//     background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;
//     font-size:.95rem !important; font-weight:600 !important;
//     text-transform:none !important; letter-spacing:.2px !important;
//     box-shadow:0 4px 14px rgba(79,110,247,.28) !important;
//     transition:all .2s !important; margin-top:28px !important;
//     font-family:'Outfit',sans-serif !important;
//   }
//   .dpf-btn:hover { box-shadow:0 6px 22px rgba(79,110,247,.40) !important; transform:translateY(-1px); }
//   .dpf-btn:disabled { opacity:.7 !important; transform:none !important; }

//   /* error */
//   .dpf-error {
//     margin-top:16px; padding:12px 16px; border-radius:12px;
//     background:#fff1f3; border:1px solid rgba(225,29,72,.2);
//     color:#e11d48; font-size:.83rem; font-weight:500;
//   }
// `;

// if (!document.getElementById("dpf-styles")) {
//   const s = document.createElement("style");
//   s.id = "dpf-styles";
//   s.textContent = css;
//   document.head.appendChild(s);
// }

// // ── Component ──────────────────────────────────────────────────────────────────
// export default function DoctorProfileForm({ userId, onCreated }) {
//   const [name,           setName]           = useState("");
//   const [specialization, setSpecialization] = useState("");
//   const [contact,        setContact]        = useState("");
//   const [hospital,       setHospital]       = useState("");
//   const [loading,        setLoading]        = useState(false);
//   const [error,          setError]          = useState("");

//   // ── UNCHANGED ──
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     console.log("User ID:", userId); // 🔍 debug
//     localStorage.getItem("user");

//     try {
//       const response = await axios.post("http://localhost:8080/doctor", {
//         name,
//         specialization,
//         contact,
//         hospital,
//         user: { "id": userId }, // ✅ correct for your entity
//       });

//       onCreated(response.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to create doctor profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="dpf-page">
//       <div className="dpf-blob-1" />
//       <div className="dpf-blob-2" />
//       <div className="dpf-blob-3" />

//       <motion.div
//         initial={{ opacity: 0, y: 36 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//         style={{ width: "100%", display: "flex", justifyContent: "center" }}
//       >
//         <Paper elevation={0} className="dpf-card">

//           {/* ── Header ── */}
//           <div className="dpf-header">
//             <div className="dpf-header-icon">
//               <MedicalServicesIcon sx={{ fontSize: 28 }} />
//             </div>
//             <div className="dpf-brand">Med<span>Vault</span></div>
//             <Typography className="dpf-title">Create Doctor Profile</Typography>
//             <span className="dpf-subtitle">Set up your professional details to get started</span>
//           </div>

//           {/* ── Form ── */}
//           <form onSubmit={handleSubmit}>

//             {/* Full Name */}
//             <div className="dpf-label">Full Name</div>
//             <TextField
//               fullWidth
//               required
//               placeholder="e.g. Dr. Ramesh Iyer"
//               variant="outlined"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PersonIcon className="dpf-adornment" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Specialization */}
//             <div className="dpf-label">Specialization</div>
//             <TextField
//               fullWidth
//               required
//               placeholder="e.g. Cardiologist"
//               variant="outlined"
//               value={specialization}
//               onChange={(e) => setSpecialization(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <MedicalServicesIcon className="dpf-adornment" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Contact */}
//             <div className="dpf-label">Contact Number</div>
//             <TextField
//               fullWidth
//               required
//               placeholder="e.g. +91 98765 43210"
//               variant="outlined"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PhoneIcon className="dpf-adornment" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Hospital */}
//             <div className="dpf-label">Hospital / Clinic</div>
//             <TextField
//               fullWidth
//               required
//               placeholder="e.g. Apollo Hospitals"
//               variant="outlined"
//               value={hospital}
//               onChange={(e) => setHospital(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LocalHospitalIcon className="dpf-adornment" />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Submit */}
//             <Button
//               type="submit"
//               variant="contained"
//               className="dpf-btn"
//               disabled={loading}
//               startIcon={<SaveIcon sx={{ fontSize: 18 }} />}
//             >
//               {loading ? "Creating…" : "Create Profile & Continue"}
//             </Button>

//           </form>

//           {error && <div className="dpf-error">⚠ {error}</div>}

//         </Paper>
//       </motion.div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import {
  Box, TextField, Button, Paper, Typography,
  InputAdornment, MenuItem, Grid,
} from "@mui/material";
import PersonIcon          from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PhoneIcon           from "@mui/icons-material/Phone";
import LocalHospitalIcon   from "@mui/icons-material/LocalHospital";
import EmailIcon           from "@mui/icons-material/Email";
import WcIcon              from "@mui/icons-material/Wc";
import SchoolIcon          from "@mui/icons-material/School";
import WorkHistoryIcon     from "@mui/icons-material/WorkHistory";
import CurrencyRupeeIcon   from "@mui/icons-material/CurrencyRupee";
import SaveIcon            from "@mui/icons-material/Save";
import { motion }          from "framer-motion";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

  .dpf-page {
    min-height:100vh; background:#f5f7ff;
    display:flex; align-items:center; justify-content:center;
    padding:40px 16px; font-family:'Outfit',sans-serif;
    position:relative; overflow:hidden;
  }
  .dpf-blob-1{position:fixed;width:500px;height:500px;border-radius:50%;background:rgba(79,110,247,.08);filter:blur(90px);top:-150px;right:-100px;pointer-events:none;z-index:0;}
  .dpf-blob-2{position:fixed;width:400px;height:400px;border-radius:50%;background:rgba(124,58,237,.06);filter:blur(90px);bottom:-100px;left:-80px;pointer-events:none;z-index:0;}
  .dpf-blob-3{position:fixed;width:320px;height:320px;border-radius:50%;background:rgba(8,145,178,.04);filter:blur(80px);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:0;}

  .dpf-card {
    background:#fff; border:1px solid #e8ecf5; border-radius:24px;
    box-shadow:0 4px 32px rgba(79,110,247,.10),0 1px 4px rgba(0,0,0,.04);
    padding:44px 48px; width:100%; max-width:640px;
    position:relative; z-index:1;
  }
  @media(max-width:680px){.dpf-card{padding:32px 20px;}}

  .dpf-header{display:flex;flex-direction:column;align-items:center;margin-bottom:32px;text-align:center;}
  .dpf-header-icon{width:58px;height:58px;border-radius:16px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:16px;box-shadow:0 6px 24px rgba(79,110,247,.28);}
  .dpf-brand{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:600;color:#4f6ef7;margin-bottom:6px;}
  .dpf-brand span{color:#7c3aed;}
  .dpf-title{font-family:'Cormorant Garamond',serif !important;font-size:1.9rem !important;font-weight:700 !important;color:#1a1f36 !important;line-height:1.15 !important;margin-bottom:5px !important;}
  .dpf-subtitle{font-size:.8rem;color:#8892b0;}

  .dpf-section-title{font-size:.68rem;text-transform:uppercase;letter-spacing:1.3px;color:#4f6ef7;font-weight:700;margin:24px 0 14px;display:flex;align-items:center;gap:8px;}
  .dpf-section-title::after{content:'';flex:1;height:1px;background:#e8ecf5;}
  .dpf-label{font-size:.7rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px;}
  .dpf-fee-note{font-size:.7rem;color:#8892b0;margin-top:4px;}

  .dpf-card .MuiOutlinedInput-root{border-radius:12px !important;background:#f8f9ff !important;font-family:'Outfit',sans-serif !important;font-size:.9rem !important;color:#1a1f36 !important;}
  .dpf-card .MuiOutlinedInput-notchedOutline{border-color:#e8ecf5 !important;}
  .dpf-card .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline{border-color:#c7cee8 !important;}
  .dpf-card .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{border-color:#4f6ef7 !important;border-width:1.5px !important;}
  .dpf-card input{color:#1a1f36 !important;font-family:'Outfit',sans-serif !important;}
  .dpf-card .MuiSelect-select{color:#1a1f36 !important;font-family:'Outfit',sans-serif !important;}
  .dpf-card .MuiSvgIcon-root{color:#b0b8d4 !important;}
  .dpf-adornment{color:#b0b8d4 !important;}

  .dpf-btn{width:100%;padding:13px !important;border-radius:12px !important;background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;font-size:.95rem !important;font-weight:600 !important;text-transform:none !important;letter-spacing:.2px !important;box-shadow:0 4px 14px rgba(79,110,247,.28) !important;transition:all .2s !important;margin-top:28px !important;font-family:'Outfit',sans-serif !important;}
  .dpf-btn:hover{box-shadow:0 6px 22px rgba(79,110,247,.40) !important;transform:translateY(-1px);}
  .dpf-btn:disabled{opacity:.7 !important;transform:none !important;}
  .dpf-error{margin-top:16px;padding:12px 16px;border-radius:12px;background:#fff1f3;border:1px solid rgba(225,29,72,.2);color:#e11d48;font-size:.83rem;font-weight:500;}
`;

if (!document.getElementById("dpf-styles")) {
  const s = document.createElement("style");
  s.id = "dpf-styles";
  s.textContent = css;
  document.head.appendChild(s);
}

export default function DoctorProfileForm({ userId, onCreated }) {
  const [form, setForm] = useState({
    name:"", email:"", contact:"", gender:"",
    specialization:"", qualification:"", experience:"",
    consultationFee:"", hospital:"",
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await axios.post("http://localhost:8080/doctor", {
        ...form,
        experience:      parseInt(form.experience)        || 0,
        consultationFee: parseFloat(form.consultationFee) || 0,
        user: { id: userId },
      });
      onCreated(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to create doctor profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const adornment = (icon) => ({ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> });

  return (
    <div className="dpf-page">
      <div className="dpf-blob-1"/><div className="dpf-blob-2"/><div className="dpf-blob-3"/>

      <motion.div initial={{opacity:0,y:36}} animate={{opacity:1,y:0}}
        transition={{duration:.45,ease:[.22,1,.36,1]}}
        style={{width:"100%",display:"flex",justifyContent:"center"}}>

        <Paper elevation={0} className="dpf-card">
          <div className="dpf-header">
            <div className="dpf-header-icon"><MedicalServicesIcon sx={{fontSize:28}}/></div>
            <div className="dpf-brand">Med<span>Vault</span></div>
            <Typography className="dpf-title">Create Doctor Profile</Typography>
            <span className="dpf-subtitle">Set up your professional details to get started</span>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ── Personal Info ── */}
            <div className="dpf-section-title">Personal Information</div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div className="dpf-label">Full Name *</div>
                <TextField fullWidth required size="small" variant="outlined"
                  placeholder="e.g. Dr. Ramesh Iyer" value={form.name} onChange={set("name")}
                  InputProps={adornment(<PersonIcon className="dpf-adornment"/>)}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="dpf-label">Gender *</div>
                <TextField select fullWidth required size="small" variant="outlined"
                  value={form.gender} onChange={set("gender")}
                  InputProps={adornment(<WcIcon className="dpf-adornment"/>)}>
                  <MenuItem value="">Select gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="dpf-label">Email Address *</div>
                <TextField fullWidth required size="small" type="email" variant="outlined"
                  placeholder="e.g. doctor@hospital.com" value={form.email} onChange={set("email")}
                  InputProps={adornment(<EmailIcon className="dpf-adornment"/>)}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="dpf-label">Phone Number *</div>
                <TextField fullWidth required size="small" variant="outlined"
                  placeholder="e.g. +91 98765 43210" value={form.contact} onChange={set("contact")}
                  InputProps={adornment(<PhoneIcon className="dpf-adornment"/>)}/>
              </Grid>
            </Grid>

            {/* ── Professional Info ── */}
            <div className="dpf-section-title">Professional Details</div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div className="dpf-label">Specialization *</div>
                <TextField fullWidth required size="small" variant="outlined"
                  placeholder="e.g. Cardiologist, Neurologist" value={form.specialization} onChange={set("specialization")}
                  InputProps={adornment(<MedicalServicesIcon className="dpf-adornment"/>)}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="dpf-label">Qualification *</div>
                <TextField fullWidth required size="small" variant="outlined"
                  placeholder="e.g. MBBS, MD, MS, DM" value={form.qualification} onChange={set("qualification")}
                  InputProps={adornment(<SchoolIcon className="dpf-adornment"/>)}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="dpf-label">Years of Experience *</div>
                <TextField fullWidth required size="small" type="number" variant="outlined"
                  placeholder="e.g. 8" value={form.experience} onChange={set("experience")}
                  inputProps={{min:0,max:60}}
                  InputProps={adornment(<WorkHistoryIcon className="dpf-adornment"/>)}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="dpf-label">Consultation Fee (₹) *</div>
                <TextField fullWidth required size="small" type="number" variant="outlined"
                  placeholder="e.g. 500" value={form.consultationFee} onChange={set("consultationFee")}
                  inputProps={{min:0}}
                  InputProps={adornment(<CurrencyRupeeIcon className="dpf-adornment"/>)}/>
                <div className="dpf-fee-note">Shown to patients before booking</div>
              </Grid>
              <Grid item xs={12}>
                <div className="dpf-label">Hospital / Clinic Name *</div>
                <TextField fullWidth required size="small" variant="outlined"
                  placeholder="e.g. Apollo Hospitals, Hyderabad" value={form.hospital} onChange={set("hospital")}
                  InputProps={adornment(<LocalHospitalIcon className="dpf-adornment"/>)}/>
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" className="dpf-btn"
              disabled={loading} startIcon={<SaveIcon sx={{fontSize:18}}/>}>
              {loading ? "Creating Profile…" : "Create Profile & Continue →"}
            </Button>
          </form>

          {error && <div className="dpf-error">⚠ {error}</div>}
        </Paper>
      </motion.div>
    </div>
  );
}
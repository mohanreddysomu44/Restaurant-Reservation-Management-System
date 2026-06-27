// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Alert,
// } from "@mui/material";
// import { motion } from "framer-motion";

// export default function BookAppointmentPage() {
//   const { patientId, doctorId } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     description: "",
//     date: "",
//     timeSlot: "",
//     report: null,
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     if (e.target.name === "report") {
//       setForm({ ...form, report: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("patientId", patientId);
//     formData.append("doctorId", doctorId);
//     formData.append("description", form.description);
//     formData.append("date", form.date);
//     formData.append("timeSlot", form.timeSlot);
//     if (form.report) formData.append("report", form.report);

//     try {
//       await axios.post(
//         "http://localhost:8080/appointments/book",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setMessage("Appointment booked successfully!");
//       setError("");

//       setTimeout(() => navigate("/patient-dashboard"), 1500);
//     } catch (err) {
//       setError("Failed to book appointment.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top, #021024, #020617 60%)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 3,
//       }}
//     >
//       <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
//         <Paper
//           sx={{
//             p: 5,
//             width: 450,
//             borderRadius: 4,
//             backdropFilter: "blur(25px)",
//             background:
//               "linear-gradient(145deg, rgba(0,191,255,0.15), rgba(255,255,255,0.05))",
//             boxShadow: "0 0 40px rgba(0,191,255,0.35)",
//             color: "white",
//           }}
//         >
//           <Typography variant="h4" sx={{ mb: 3 }}>
//             Book Appointment
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Describe your problem"
//               name="description"
//               margin="normal"
//               multiline
//               rows={3}
//               onChange={handleChange}
//               required
//               InputLabelProps={{ style: { color: "#ccc" } }}
//               InputProps={{ style: { color: "#fff" } }}
//             />

//             <TextField
//               fullWidth
//               type="date"
//               name="date"
//               margin="normal"
//               onChange={handleChange}
//               required
//               InputLabelProps={{ shrink: true }}
//               InputProps={{ style: { color: "#fff" } }}
//             />

//             <TextField
//               fullWidth
//               label="Time Slot"
//               name="timeSlot"
//               margin="normal"
//               onChange={handleChange}
//               required
//               placeholder="10:00 AM"
//               InputLabelProps={{ style: { color: "#ccc" } }}
//               InputProps={{ style: { color: "#fff" } }}
//             />

//             <Button
//               variant="contained"
//               component="label"
//               sx={{ mt: 2, mb: 2 }}
//             >
//               Upload Report
//               <input
//                 type="file"
//                 hidden
//                 name="report"
//                 onChange={handleChange}
//               />
//             </Button>

//             <Button
//               fullWidth
//               type="submit"
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 background: "linear-gradient(45deg,#00bfff,#1e90ff)",
//                 boxShadow: "0 0 20px rgba(0,191,255,0.7)",
//               }}
//             >
//               Book Appointment
//             </Button>
//           </form>

//           {message && <Alert sx={{ mt: 2 }}>{message}</Alert>}
//           {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
//         </Paper>
//       </motion.div>
//     </Box>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ── Inject styles ──────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

  .book-page-bg {
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

  .book-blob-1 { position: fixed; width: 500px; height: 500px; border-radius: 50%; background: rgba(79,110,247,.08); filter: blur(90px); top: -150px; right: -100px; pointer-events: none; z-index: 0; }
  .book-blob-2 { position: fixed; width: 400px; height: 400px; border-radius: 50%; background: rgba(124,58,237,.06); filter: blur(90px); bottom: -100px; left: -80px;  pointer-events: none; z-index: 0; }

  .book-card {
    background: #ffffff;
    border: 1px solid #e8ecf5;
    border-radius: 24px;
    box-shadow: 0 4px 32px rgba(79,110,247,.10), 0 1px 4px rgba(0,0,0,.04);
    padding: 44px 48px;
    width: 100%;
    max-width: 480px;
    position: relative;
    z-index: 1;
  }

  .book-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 32px;
  }
  .book-header-icon {
    width: 48px; height: 48px; border-radius: 14px;
    background: linear-gradient(135deg, #4f6ef7, #7c3aed);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 1.3rem;
    box-shadow: 0 4px 14px rgba(79,110,247,.3);
    flex-shrink: 0;
  }
  .book-title {
    font-family: 'Cormorant Garamond', serif !important;
    font-size: 1.8rem !important;
    font-weight: 700 !important;
    color: #1a1f36 !important;
    line-height: 1.1 !important;
  }
  .book-subtitle {
    font-size: .78rem;
    color: #8892b0;
    margin-top: 3px;
  }

  /* ── field label ── */
  .field-label {
    font-size: .72rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #8892b0;
    font-weight: 600;
    margin-bottom: 6px;
    margin-top: 20px;
  }

  /* ── file upload area ── */
  .upload-zone {
    border: 1.5px dashed #c7cee8;
    border-radius: 12px;
    padding: 18px;
    text-align: center;
    cursor: pointer;
    transition: all .2s;
    background: #f8f9ff;
    margin-top: 20px;
  }
  .upload-zone:hover { border-color: #4f6ef7; background: #eef1fe; }
  .upload-zone.has-file { border-color: #4f6ef7; background: #eef1fe; }
  .upload-zone-text { font-size: .82rem; color: #8892b0; margin-top: 6px; }
  .upload-zone-text.has-file { color: #4f6ef7; font-weight: 500; }

  /* ── submit button ── */
  .submit-btn {
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
  .submit-btn:hover { box-shadow: 0 6px 22px rgba(79,110,247,.38) !important; transform: translateY(-1px); }

  /* ── back link ── */
  .back-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: .82rem; color: #8892b0; cursor: pointer;
    margin-bottom: 24px; transition: color .18s;
  }
  .back-link:hover { color: #4f6ef7; }

  /* ── MUI field overrides ── */
  .book-card .MuiOutlinedInput-root {
    border-radius: 12px !important;
    background: #f8f9ff !important;
    font-family: 'Outfit', sans-serif !important;
    font-size: .9rem !important;
    color: #1a1f36 !important;
  }
  .book-card .MuiOutlinedInput-notchedOutline { border-color: #e8ecf5 !important; }
  .book-card .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color: #c7cee8 !important; }
  .book-card .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: #4f6ef7 !important; border-width: 1.5px !important; }
  .book-card .MuiInputLabel-root { font-family: 'Outfit', sans-serif !important; color: #8892b0 !important; font-size: .875rem !important; }
  .book-card .MuiInputLabel-root.Mui-focused { color: #4f6ef7 !important; }
  .book-card input, .book-card textarea { color: #1a1f36 !important; }
`;

if (!document.getElementById("book-page-styles")) {
  const s = document.createElement("style");
  s.id = "book-page-styles";
  s.textContent = css;
  document.head.appendChild(s);
}

export default function BookAppointmentPage() {
  const { patientId, doctorId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: "",
    date: "",
    timeSlot: "",
    report: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ── UNCHANGED ──
  const handleChange = (e) => {
    if (e.target.name === "report") {
      setForm({ ...form, report: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("patientId", patientId);
    formData.append("doctorId", doctorId);
    formData.append("description", form.description);
    formData.append("date", form.date);
    formData.append("timeSlot", form.timeSlot);
    if (form.report) formData.append("report", form.report);

    try {
      await axios.post("http://localhost:8080/appointments/book", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Appointment booked successfully!");
      setError("");
      setTimeout(() => navigate("/patient-dashboard"), 1500);
    } catch {
      setError("Failed to book appointment.");
    }
  };

  return (
    <div className="book-page-bg">
      <div className="book-blob-1" />
      <div className="book-blob-2" />

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Paper elevation={0} className="book-card">

          {/* Back link */}
          <div className="back-link" onClick={() => navigate("/patient-dashboard")}>
            <ArrowBackIcon sx={{ fontSize: 15 }} />
            Back to Dashboard
          </div>

          {/* Header */}
          <div className="book-card-header">
            <div className="book-header-icon">
              <CalendarMonthIcon sx={{ fontSize: 22 }} />
            </div>
            <div>
              <div className="book-title">Book Appointment</div>
              <div className="book-subtitle">Fill in your details below</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <div className="field-label">Describe your problem</div>
            <TextField
              fullWidth
              name="description"
              multiline
              rows={3}
              placeholder="Briefly describe your symptoms or reason for visit…"
              onChange={handleChange}
              required
              variant="outlined"
            />

            <div className="field-label">Preferred Date</div>
            <TextField
              fullWidth
              type="date"
              name="date"
              onChange={handleChange}
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />

            <div className="field-label">Time Slot</div>
            <TextField
              fullWidth
              name="timeSlot"
              placeholder="e.g. 10:00 AM"
              onChange={handleChange}
              required
              variant="outlined"
            />

            {/* File upload */}
            <label htmlFor="report-upload">
              <div className={`upload-zone ${form.report ? "has-file" : ""}`}>
                <UploadFileIcon sx={{ color: form.report ? "#4f6ef7" : "#c7cee8", fontSize: 28 }} />
                <div className={`upload-zone-text ${form.report ? "has-file" : ""}`}>
                  {form.report ? `📎 ${form.report.name}` : "Click to upload a medical report (optional)"}
                </div>
              </div>
            </label>
            <input
              id="report-upload"
              type="file"
              name="report"
              hidden
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              className="submit-btn"
              startIcon={<CheckCircleOutlineIcon />}
            >
              Confirm Booking
            </Button>
          </form>

          {message && (
            <Alert
              severity="success"
              sx={{ mt: 2.5, borderRadius: "12px", fontFamily: "'Outfit',sans-serif", fontSize: ".875rem" }}
            >
              {message}
            </Alert>
          )}
          {error && (
            <Alert
              severity="error"
              sx={{ mt: 2.5, borderRadius: "12px", fontFamily: "'Outfit',sans-serif", fontSize: ".875rem" }}
            >
              {error}
            </Alert>
          )}

        </Paper>
      </motion.div>
    </div>
  );
}
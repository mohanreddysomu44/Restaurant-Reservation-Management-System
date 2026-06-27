// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import DoctorProfileForm from "./DoctorProfileForm";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Divider,
//   Modal,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import LogoutIcon from "@mui/icons-material/Logout";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import EventIcon from "@mui/icons-material/Event";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PersonIcon from "@mui/icons-material/Person";
// import FolderSharedIcon from "@mui/icons-material/FolderShared";
// import DescriptionIcon from "@mui/icons-material/Description";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import DownloadIcon from "@mui/icons-material/Download";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import CheckIcon from "@mui/icons-material/Check";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const BASE = "http://localhost:8080";

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .doc-overlay { position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease; }
//   @keyframes overlayIn { from{opacity:0}to{opacity:1} }

//   .doc-sidebar { width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1); }
//   .doc-sidebar.closed { transform:translateX(-100%); }
//   .doc-sidebar.open   { transform:translateX(0); }
//   .doc-sidebar-top { display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px; }
//   .doc-logo { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px; }
//   .doc-logo-icon { width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0; }
//   .doc-logo-accent { color:#7c3aed; }
//   .doc-close-btn { width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s; }
//   .doc-close-btn:hover { background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2); }
//   .doc-nav-label { font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px; }
//   .doc-nav-item { display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none; }
//   .doc-nav-item:hover { background:#eef1fe;color:#4f6ef7; }
//   .doc-nav-item.active { background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18); }
//   .doc-nav-item.active .doc-nav-icon { background:#4f6ef7 !important;color:#fff !important; }
//   .doc-nav-icon { width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278; }
//   .doc-sidebar-spacer { flex:1; }
//   .doc-user-card { display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px; }
//   .doc-user-av { width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem; }
//   .doc-topbar { display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100; }
//   .doc-topbar-left { display:flex;align-items:center;gap:14px; }
//   .doc-hamburger { width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s; }
//   .doc-hamburger:hover { background:#eef1fe;border-color:rgba(79,110,247,.2); }
//   .doc-blob { position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0; }
//   .doc-blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
//   .doc-blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }

//   .doc-hero { background:linear-gradient(135deg,#fff 55%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;display:flex;align-items:center;gap:28px;margin-bottom:28px; }
//   .doc-hero::after { content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none; }
//   .doc-stat { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important; }
//   .doc-stat:hover { box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px); }
//   .doc-stat-value { font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1; }
//   .doc-stat-label { font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px; }
//   .doc-stat-icon  { position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07; }
//   .doc-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important; }
//   .doc-card:hover { box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important; }
//   .doc-pending-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #f59e0b !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(245,158,11,.08) !important;transition:box-shadow .22s,transform .22s !important; }
//   .doc-pending-card:hover { box-shadow:0 6px 24px rgba(245,158,11,.14) !important;transform:translateY(-3px); }
//   .doc-approved-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #059669 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(5,150,105,.08) !important;transition:box-shadow .22s,transform .22s !important; }
//   .doc-approved-card:hover { box-shadow:0 6px 24px rgba(5,150,105,.14) !important;transform:translateY(-3px); }
//   .doc-patient-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.08) !important;transition:box-shadow .22s,transform .22s,border-color .22s !important;cursor:pointer; }
//   .doc-patient-card:hover { box-shadow:0 6px 28px rgba(79,110,247,.16) !important;transform:translateY(-3px);border-color:#c7cee8 !important; }

//   .report-badge { display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:8px;font-size:.75rem;font-weight:500;background:#eef1fe;color:#4f6ef7;border:1px solid rgba(79,110,247,.18);cursor:pointer;transition:all .15s;text-decoration:none; }
//   .report-badge:hover { background:#e0e8ff; }
//   .report-badge.no-report { background:#f5f7ff;color:#8892b0;border-color:#e8ecf5;cursor:default;pointer-events:none; }

//   /* ── Modals ── */
//   .patient-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:620px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
//   .rx-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:560px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(5,150,105,.16);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
//   .modal-field-label { font-size:.68rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px; }
//   .modal-field-value { font-size:.92rem;font-weight:500;color:#1a1f36;margin-bottom:16px; }

//   /* ── Report viewer ── */
//   .report-viewer-box { border:1.5px dashed #d4daf0;border-radius:14px;background:#f8f9ff;padding:22px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center; }
//   .report-viewer-icon { width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#4f6ef7,#818cf8);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 14px rgba(79,110,247,.28); }
//   .report-filename { font-size:.82rem;font-weight:500;color:#4a5278;word-break:break-all;max-width:100%; }
//   .report-actions { display:flex;gap:10px;flex-wrap:wrap;justify-content:center; }
//   .report-btn-primary { display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;cursor:pointer;font-size:.84rem;font-weight:600;text-decoration:none;background:linear-gradient(135deg,#4f6ef7,#818cf8);color:#fff;border:none;box-shadow:0 3px 12px rgba(79,110,247,.26);transition:all .18s;font-family:'Outfit',sans-serif; }
//   .report-btn-primary:hover { box-shadow:0 5px 20px rgba(79,110,247,.38);transform:translateY(-1px); }
//   .report-btn-secondary { display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;cursor:pointer;font-size:.84rem;font-weight:600;text-decoration:none;background:#fff;color:#4f6ef7;border:1.5px solid rgba(79,110,247,.28);transition:all .18s;font-family:'Outfit',sans-serif; }
//   .report-btn-secondary:hover { background:#eef1fe;border-color:#4f6ef7; }
//   .report-preview-wrap { width:100%;border-radius:12px;overflow:hidden;border:1px solid #e8ecf5;margin-top:4px;animation:fadeUp .3s ease both; }
//   .report-preview-wrap iframe { width:100%;height:400px;border:none;display:block; }
//   .report-preview-wrap img   { width:100%;display:block;max-height:440px;object-fit:contain;background:#f0f2f8; }
//   .no-report-box { border:1.5px dashed #e8ecf5;border-radius:14px;padding:20px;background:#f5f7ff;display:flex;align-items:center;gap:12px; }

//   /* ── Prescription card ── */
//   .rx-card { background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s; }
//   .rx-card:hover { box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px); }

//   /* ── Rx textarea override ── */
//   .rx-modal-box .MuiOutlinedInput-root { border-radius:12px !important;background:#f8f9ff !important; }
//   .rx-modal-box .MuiOutlinedInput-notchedOutline { border-color:#e8ecf5 !important; }
//   .rx-modal-box .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color:#059669 !important; }

//   .doc-sec-heading { font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px; }
//   .doc-sec-heading::after { content:'';flex:1;height:1px;background:#e8ecf5; }

//   .av-blue   { background:linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-violet { background:linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
//   .av-teal   { background:linear-gradient(135deg,#0891b2,#22d3ee) !important; }
//   .av-amber  { background:linear-gradient(135deg,#d97706,#fbbf24) !important; }
//   .av-green  { background:linear-gradient(135deg,#059669,#34d399) !important; }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
// `;

// if (!document.getElementById("doctor-portal-styles")) {
//   const s = document.createElement("style");
//   s.id = "doctor-portal-styles";
//   s.textContent = globalStyles;
//   document.head.appendChild(s);
// }

// // ── Sub-components ─────────────────────────────────────────────────────────────
// function NavItem({ icon, label, active, onClick }) {
//   return (
//     <div className={`doc-nav-item ${active ? "active" : ""}`} onClick={onClick}>
//       <div className="doc-nav-icon">{icon}</div>
//       {label}
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="doc-stat fu">
//       <div className="doc-stat-label">{label}</div>
//       <div className="doc-stat-value" style={{ color }}>
//         {value}
//       </div>
//       <div className="doc-stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── Report Viewer ─────────────────────────────────────────────────────────────
// function ReportViewer({ filename }) {
//   const [showPreview, setShowPreview] = useState(false);
//   if (!filename) {
//     return (
//       <div className="no-report-box">
//         <DescriptionIcon
//           sx={{ fontSize: 30, color: "#c0c8e0", flexShrink: 0 }}
//         />
//         <Box>
//           <Typography
//             sx={{ fontWeight: 600, fontSize: ".88rem", color: "#4a5278" }}
//           >
//             No report attached
//           </Typography>
//           <Typography sx={{ fontSize: ".76rem", color: "#b0b8d0", mt: 0.4 }}>
//             The patient did not upload a report for this appointment.
//           </Typography>
//         </Box>
//       </div>
//     );
//   }
//   const reportUrl = `${BASE}/appointments/report/${filename}`;
//   const lower = filename.toLowerCase();
//   const isPdf = lower.endsWith(".pdf");
//   const isImage =
//     lower.endsWith(".png") ||
//     lower.endsWith(".jpg") ||
//     lower.endsWith(".jpeg") ||
//     lower.endsWith(".webp");
//   const canPreview = isPdf || isImage;
//   return (
//     <div className="report-viewer-box">
//       <div className="report-viewer-icon">
//         <DescriptionIcon sx={{ fontSize: 26 }} />
//       </div>
//       <div className="report-filename">{filename}</div>
//       <div className="report-actions">
//         {canPreview && (
//           <button
//             className="report-btn-primary"
//             onClick={() => setShowPreview((p) => !p)}
//           >
//             {showPreview ? (
//               <>
//                 <VisibilityOffIcon sx={{ fontSize: 16 }} /> Hide Preview
//               </>
//             ) : (
//               <>
//                 <VisibilityIcon sx={{ fontSize: 16 }} /> Preview
//               </>
//             )}
//           </button>
//         )}
//         <a
//           href={reportUrl}
//           target="_blank"
//           rel="noreferrer"
//           className="report-btn-primary"
//         >
//           <OpenInNewIcon sx={{ fontSize: 16 }} /> Open in Tab
//         </a>
//         <a
//           href={reportUrl}
//           download={filename}
//           className="report-btn-secondary"
//         >
//           <DownloadIcon sx={{ fontSize: 16 }} /> Download
//         </a>
//       </div>
//       {showPreview && (
//         <div className="report-preview-wrap" style={{ width: "100%" }}>
//           {isPdf && <iframe src={reportUrl} title="Report PDF" />}
//           {isImage && <img src={reportUrl} alt="Patient Report" />}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Write Prescription Modal ───────────────────────────────────────────────────
// function WritePrescriptionModal({ appt, open, onClose, onSaved }) {
//   const [form, setForm] = useState({
//     diagnosis: "",
//     medicines: "",
//     instructions: "",
//     tests: "",
//     followUpDate: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [saved, setSaved] = useState(false);

//   // Pre-fill if prescription exists
//   useEffect(() => {
//     if (!open || !appt) return;
//     axios
//       .get(`${BASE}/prescriptions/appointment/${appt.id}`)
//       .then((r) =>
//         setForm({
//           diagnosis: r.data.diagnosis || "",
//           medicines: r.data.medicines || "",
//           instructions: r.data.instructions || "",
//           tests: r.data.tests || "",
//           followUpDate: r.data.followUpDate || "",
//         }),
//       )
//       .catch(() =>
//         setForm({
//           diagnosis: "",
//           medicines: "",
//           instructions: "",
//           tests: "",
//           followUpDate: "",
//         }),
//       );
//     setSaved(false);
//   }, [open, appt]);

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       await axios.post(`${BASE}/prescriptions/appointment/${appt.id}`, form);
//       setSaved(true);
//       onSaved(appt.id);
//       setTimeout(() => {
//         onClose();
//         setSaved(false);
//       }, 1200);
//     } catch (e) {
//       alert("Failed to save prescription");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!appt) return null;
//   const fieldSx = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "12px !important",
//       background: "#f8f9ff !important",
//     },
//     "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" },
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#059669 !important",
//     },
//   };
//   const labelSx = {
//     fontSize: ".7rem",
//     textTransform: "uppercase",
//     letterSpacing: "1px",
//     color: "#8892b0",
//     fontWeight: 600,
//     mb: 0.75,
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="rx-modal-box">
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 3,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Box
//               sx={{
//                 width: 46,
//                 height: 46,
//                 borderRadius: "13px",
//                 background: "linear-gradient(135deg,#059669,#34d399)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "0 4px 14px rgba(5,150,105,.3)",
//               }}
//             >
//               <LocalPharmacyIcon sx={{ color: "#fff", fontSize: 22 }} />
//             </Box>
//             <Box>
//               <Typography
//                 sx={{
//                   fontFamily: "'Cormorant Garamond',serif",
//                   fontSize: "1.3rem",
//                   fontWeight: 700,
//                   color: "#1a1f36",
//                 }}
//               >
//                 Write Prescription
//               </Typography>
//               <Typography sx={{ fontSize: ".74rem", color: "#8892b0" }}>
//                 For {appt.patient?.name} · {appt.date}
//               </Typography>
//             </Box>
//           </Box>
//           <IconButton
//             onClick={onClose}
//             size="small"
//             sx={{
//               background: "#f5f7ff",
//               border: "1px solid #e8ecf5",
//               borderRadius: "9px",
//               "&:hover": { background: "#eef1fe" },
//             }}
//           >
//             <CloseIcon sx={{ fontSize: 16 }} />
//           </IconButton>
//         </Box>

//         <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />

//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <Box>
//             <Typography sx={labelSx}>Diagnosis *</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               variant="outlined"
//               placeholder="e.g. Hypertension Stage 1, Type 2 Diabetes"
//               value={form.diagnosis}
//               onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
//               sx={fieldSx}
//             />
//           </Box>
//           <Box>
//             <Typography sx={labelSx}>Medicines &amp; Dosage *</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               multiline
//               rows={4}
//               variant="outlined"
//               placeholder={
//                 "e.g.\nTab. Metformin 500mg — 1-0-1 after meals\nTab. Amlodipine 5mg — 0-0-1\nSyr. Amoxicillin 250mg/5ml — 5ml thrice daily"
//               }
//               value={form.medicines}
//               onChange={(e) => setForm({ ...form, medicines: e.target.value })}
//               sx={fieldSx}
//             />
//           </Box>
//           <Box>
//             <Typography sx={labelSx}>Instructions / Advice</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               multiline
//               rows={2}
//               variant="outlined"
//               placeholder="e.g. Drink 2L water daily. Avoid salt. Rest for 3 days."
//               value={form.instructions}
//               onChange={(e) =>
//                 setForm({ ...form, instructions: e.target.value })
//               }
//               sx={fieldSx}
//             />
//           </Box>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={7}>
//               <Typography sx={labelSx}>Lab Tests Ordered</Typography>
//               <TextField
//                 fullWidth
//                 size="small"
//                 variant="outlined"
//                 placeholder="e.g. CBC, Blood Sugar, Lipid Profile"
//                 value={form.tests}
//                 onChange={(e) => setForm({ ...form, tests: e.target.value })}
//                 sx={fieldSx}
//               />
//             </Grid>
//             <Grid item xs={12} sm={5}>
//               <Typography sx={labelSx}>Follow-Up Date</Typography>
//               <TextField
//                 fullWidth
//                 size="small"
//                 type="date"
//                 variant="outlined"
//                 value={form.followUpDate}
//                 onChange={(e) =>
//                   setForm({ ...form, followUpDate: e.target.value })
//                 }
//                 sx={fieldSx}
//               />
//             </Grid>
//           </Grid>

//           <Button
//             onClick={handleSave}
//             variant="contained"
//             disabled={loading || saved}
//             startIcon={saved ? <CheckIcon /> : <LocalPharmacyIcon />}
//             sx={{
//               background: "linear-gradient(135deg,#059669,#34d399)",
//               borderRadius: "12px",
//               textTransform: "none",
//               fontWeight: 700,
//               fontSize: ".92rem",
//               py: 1.4,
//               mt: 1,
//               boxShadow: "0 4px 14px rgba(5,150,105,.28)",
//               "&:hover": { boxShadow: "0 6px 22px rgba(5,150,105,.40)" },
//             }}
//           >
//             {saved
//               ? "Prescription Saved!"
//               : loading
//                 ? "Saving…"
//                 : "Save Prescription"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// // ── Patient Detail Modal ───────────────────────────────────────────────────────
// function PatientModal({ appt, open, onClose, onWriteRx }) {
//   if (!appt) return null;
//   const p = appt.patient;
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="patient-modal-box">
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 3,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Avatar
//               className="av-blue"
//               sx={{
//                 width: 54,
//                 height: 54,
//                 borderRadius: "16px",
//                 fontSize: "1.4rem",
//                 fontFamily: "'Cormorant Garamond',serif",
//                 fontWeight: 700,
//                 boxShadow: "0 4px 14px rgba(79,110,247,.25)",
//               }}
//             >
//               {p?.name?.charAt(0)}
//             </Avatar>
//             <Box>
//               <Typography
//                 sx={{
//                   fontFamily: "'Cormorant Garamond',serif",
//                   fontSize: "1.4rem",
//                   fontWeight: 700,
//                   color: "#1a1f36",
//                 }}
//               >
//                 {p?.name}
//               </Typography>
//               <Typography sx={{ fontSize: ".78rem", color: "#8892b0" }}>
//                 Patient Record
//               </Typography>
//             </Box>
//           </Box>
//           <IconButton
//             onClick={onClose}
//             size="small"
//             sx={{
//               background: "#f5f7ff",
//               border: "1px solid #e8ecf5",
//               borderRadius: "9px",
//               "&:hover": { background: "#eef1fe", color: "#4f6ef7" },
//             }}
//           >
//             <CloseIcon sx={{ fontSize: 16 }} />
//           </IconButton>
//         </Box>
//         <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />

//         <Typography
//           sx={{
//             fontFamily: "'Cormorant Garamond',serif",
//             fontSize: "1.05rem",
//             fontWeight: 700,
//             color: "#1a1f36",
//             mb: 2,
//           }}
//         >
//           Patient Information
//         </Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           {[
//             ["Full Name", p?.name],
//             ["Age", p?.age ? `${p.age} years` : "—"],
//             ["Gender", p?.gender],
//             ["Date of Birth", p?.dob],
//             ["Contact", p?.contact],
//           ].map(([label, val]) => (
//             <Grid item xs={6} key={label}>
//               <div className="modal-field-label">{label}</div>
//               <div className="modal-field-value">{val || "—"}</div>
//             </Grid>
//           ))}
//         </Grid>
//         <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />

//         <Typography
//           sx={{
//             fontFamily: "'Cormorant Garamond',serif",
//             fontSize: "1.05rem",
//             fontWeight: 700,
//             color: "#1a1f36",
//             mb: 2,
//           }}
//         >
//           Appointment Details
//         </Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           {[
//             ["Date", appt.date],
//             ["Time Slot", appt.timeSlot],
//             ["Status", appt.status],
//           ].map(([label, val]) => (
//             <Grid item xs={6} key={label}>
//               <div className="modal-field-label">{label}</div>
//               <div className="modal-field-value">{val || "—"}</div>
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <div className="modal-field-label">Description / Symptoms</div>
//             <div className="modal-field-value">{appt.description || "—"}</div>
//           </Grid>
//         </Grid>
//         <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />

//         <Typography
//           sx={{
//             fontFamily: "'Cormorant Garamond',serif",
//             fontSize: "1.05rem",
//             fontWeight: 700,
//             color: "#1a1f36",
//             mb: 2,
//           }}
//         >
//           Medical Report
//         </Typography>
//         <ReportViewer filename={appt.report} />

//         {/* Write Prescription button (only for approved appointments) */}
//         {appt.status === "APPROVED" && (
//           <Button
//             onClick={() => {
//               onClose();
//               onWriteRx(appt);
//             }}
//             variant="contained"
//             fullWidth
//             startIcon={<EditNoteIcon />}
//             sx={{
//               mt: 3,
//               background: "linear-gradient(135deg,#059669,#34d399)",
//               borderRadius: "12px",
//               textTransform: "none",
//               fontWeight: 700,
//               fontSize: ".9rem",
//               boxShadow: "0 4px 14px rgba(5,150,105,.28)",
//             }}
//           >
//             Write / Update Prescription
//           </Button>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ── Main ───────────────────────────────────────────────────────────────────────
// export default function DoctorDashboard() {
//   const { user } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [doctor, setDoctor] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [prescriptions, setPrescriptions] = useState([]); // {appointmentId: Prescription}
//   const [loading, setLoading] = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [view, setView] = useState("dashboard");
//   const [selectedAppt, setSelectedAppt] = useState(null);
//   const [rxAppt, setRxAppt] = useState(null); // for write-rx modal

//   useEffect(() => {
//     const fetchData = async () => {
//       // ── Step 1: load doctor (if this fails → show profile form)
//       let doc;
//       try {
//         const docRes = await axios.get(`${BASE}/doctor/user/${userId}`);
//         if (!docRes.data?.id) {
//           setProfileMissing(true);
//           setLoading(false);
//           return;
//         }
//         doc = docRes.data;
//         setDoctor(doc);
//       } catch (err) {
//         // Only show profile form on 404 (doctor doesn't exist yet)
//         if (err.response?.status === 404) {
//           setProfileMissing(true);
//         }
//         setLoading(false);
//         return;
//       }

//       // ── Step 2: load appointments (non-fatal)
//       try {
//         const appRes = await axios.get(`${BASE}/appointments/doctor/${doc.id}`);
//         setAppointments(appRes.data);
//       } catch (err) {
//         console.error("Failed to load appointments:", err);
//       }

//       // ── Step 3: load prescriptions (non-fatal — NEVER triggers profile form)
//       try {
//         const rxRes = await axios.get(`${BASE}/prescriptions/doctor/${doc.id}`);
//         const rxMap = {};
//         rxRes.data.forEach((rx) => {
//           rxMap[rx.appointment?.id] = rx;
//         });
//         setPrescriptions(rxMap);
//       } catch (err) {
//         console.error("Failed to load prescriptions:", err);
//         // intentionally ignored — prescriptions are optional
//       }

//       setLoading(false);
//     };

//     if (userId) fetchData();
//   }, [userId]);

//   const acceptAppointment = async (id) => {
//     await axios.put(`${BASE}/appointments/${id}/approve`);
//     setAppointments((prev) =>
//       prev.map((a) => (a.id === id ? { ...a, status: "APPROVED" } : a)),
//     );
//   };

//   const rejectAppointment = async (id) => {
//     await axios.put(`${BASE}/appointments/${id}/reject`);
//     setAppointments((prev) => prev.filter((a) => a.id !== id));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   const handleNavClick = (key) => {
//     setView(key);
//     setSidebarOpen(false);
//   };

//   const handleRxSaved = (appointmentId) => {
//     // Refetch prescriptions map
//     axios
//       .get(`${BASE}/prescriptions/doctor/${doctor.id}`)
//       .then((r) => {
//         const rxMap = {};
//         r.data.forEach((rx) => {
//           rxMap[rx.appointment?.id] = rx;
//         });
//         setPrescriptions(rxMap);
//       })
//       .catch(() => {});
//   };

//   if (profileMissing) {
//     return (
//       <DoctorProfileForm
//         userId={userId}
//         onCreated={(doc) => {
//           setDoctor(doc);
//           setProfileMissing(false);
//         }}
//       />
//     );
//   }
//   if (loading)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//           background: "#f5f7ff",
//         }}
//       >
//         <CircularProgress sx={{ color: "#4f6ef7" }} />
//       </Box>
//     );

//   const pending = appointments.filter((a) => a.status === "PENDING");
//   const approved = appointments.filter((a) => a.status === "APPROVED");
//   const uniquePatientCount = new Set(approved.map((a) => a.patient?.id)).size;

//   const menuItems = [
//     {
//       key: "dashboard",
//       label: "Dashboard",
//       icon: <DashboardIcon sx={{ fontSize: 18 }} />,
//     },
//     {
//       key: "pending",
//       label: "Pending Requests",
//       icon: <EventIcon sx={{ fontSize: 18 }} />,
//     },
//     {
//       key: "approved",
//       label: "Approved Appointments",
//       icon: <CheckCircleIcon sx={{ fontSize: 18 }} />,
//     },
//     {
//       key: "records",
//       label: "Patient Records",
//       icon: <FolderSharedIcon sx={{ fontSize: 18 }} />,
//     },
//     {
//       key: "prescriptions",
//       label: "Prescriptions",
//       icon: <LocalPharmacyIcon sx={{ fontSize: 18 }} />,
//     },
//     {
//       key: "profile",
//       label: "My Profile",
//       icon: <PersonIcon sx={{ fontSize: 18 }} />,
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "#f5f7ff",
//         fontFamily: "'Outfit',sans-serif",
//       }}
//     >
//       <div className="doc-blob doc-blob-1" />
//       <div className="doc-blob doc-blob-2" />

//       {sidebarOpen && (
//         <div className="doc-overlay" onClick={() => setSidebarOpen(false)} />
//       )}

//       {/* ── Sidebar ── */}
//       <div className={`doc-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="doc-sidebar-top">
//           <div className="doc-logo">
//             <div className="doc-logo-icon">✦</div>
//             Med<span className="doc-logo-accent">Vault</span>
//           </div>
//           <div className="doc-close-btn" onClick={() => setSidebarOpen(false)}>
//             <CloseIcon sx={{ fontSize: 16 }} />
//           </div>
//         </div>
//         <div className="doc-nav-label">Navigation</div>
//         {menuItems.map((item) => (
//           <NavItem
//             key={item.key}
//             icon={item.icon}
//             label={item.label}
//             active={view === item.key}
//             onClick={() => handleNavClick(item.key)}
//           />
//         ))}
//         <div className="doc-sidebar-spacer" />
//         <div className="doc-user-card">
//           <div className="doc-user-av">{doctor?.name?.charAt(0)}</div>
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: ".85rem",
//                 fontWeight: 600,
//                 color: "#1a1f36",
//                 lineHeight: 1.2,
//               }}
//             >
//               Dr. {doctor?.name}
//             </Typography>
//             <Typography sx={{ fontSize: ".72rem", color: "#8892b0" }}>
//               {doctor?.specialization}
//             </Typography>
//           </Box>
//         </div>
//         <button
//           onClick={handleLogout}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//             padding: "10px 12px",
//             borderRadius: 11,
//             cursor: "pointer",
//             fontSize: ".875rem",
//             fontWeight: 500,
//             color: "#e11d48",
//             border: "1px solid transparent",
//             background: "none",
//             width: "100%",
//             fontFamily: "'Outfit',sans-serif",
//             transition: "all .18s",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = "#fff1f3";
//             e.currentTarget.style.borderColor = "rgba(225,29,72,.15)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = "none";
//             e.currentTarget.style.borderColor = "transparent";
//           }}
//         >
//           <div
//             className="doc-nav-icon"
//             style={{ background: "#fff1f3", color: "#e11d48" }}
//           >
//             <LogoutIcon sx={{ fontSize: 16 }} />
//           </div>
//           Sign Out
//         </button>
//       </div>

//       {/* ── Top bar ── */}
//       <div className="doc-topbar">
//         <div className="doc-topbar-left">
//           <div className="doc-hamburger" onClick={() => setSidebarOpen(true)}>
//             <MenuIcon sx={{ fontSize: 20 }} />
//           </div>
//           <Typography
//             sx={{
//               fontFamily: "'Cormorant Garamond',serif",
//               fontWeight: 700,
//               fontSize: "1.3rem",
//               color: "#4f6ef7",
//             }}
//           >
//             Med<span style={{ color: "#7c3aed" }}>Vault</span>
//           </Typography>
//         </div>
//         <Button
//           startIcon={<LogoutIcon />}
//           onClick={handleLogout}
//           size="small"
//           sx={{
//             color: "#e11d48",
//             borderColor: "rgba(225,29,72,.3)",
//             textTransform: "none",
//             borderRadius: 2,
//             border: "1px solid",
//             fontFamily: "'Outfit',sans-serif",
//           }}
//         >
//           Logout
//         </Button>
//       </div>

//       {/* ── Content ── */}
//       <Box
//         sx={{ p: { xs: 2, md: "36px 44px" }, position: "relative", zIndex: 1 }}
//       >
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={view}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* ─────────────── DASHBOARD ─────────────── */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography
//                     sx={{
//                       fontFamily: "'Cormorant Garamond',serif",
//                       fontSize: "2rem",
//                       fontWeight: 700,
//                       color: "#1a1f36",
//                     }}
//                   >
//                     Welcome, Dr. {doctor?.name?.split(" ")[0]} 👨‍⚕️
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     Here's your practice overview
//                   </Typography>
//                 </Box>

//                 <div className="doc-hero">
//                   <Avatar
//                     className="av-blue"
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: "22px",
//                       fontSize: "2rem",
//                       fontFamily: "'Cormorant Garamond',serif",
//                       fontWeight: 700,
//                       boxShadow: "0 8px 24px rgba(79,110,247,.3)",
//                       flexShrink: 0,
//                     }}
//                   >
//                     {doctor?.name?.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography
//                       sx={{
//                         fontFamily: "'Cormorant Garamond',serif",
//                         fontSize: "1.8rem",
//                         fontWeight: 700,
//                         color: "#1a1f36",
//                       }}
//                     >
//                       Dr. {doctor?.name}
//                     </Typography>
//                     <Typography sx={{ color: "#8892b0", fontSize: ".82rem" }}>
//                       {doctor?.qualification} · {doctor?.specialization}
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         gap: 1,
//                         mt: 1.5,
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       {[
//                         `📞 ${doctor?.contact}`,
//                         `🏥 ${doctor?.hospital}`,
//                         `${doctor?.experience} yrs exp`,
//                         `₹${doctor?.consultationFee} fee`,
//                       ]
//                         .filter((v) => !v.includes("undefined"))
//                         .map((v, i) => (
//                           <Chip
//                             key={i}
//                             label={v}
//                             size="small"
//                             sx={{
//                               background: "#eef1fe",
//                               color: "#4f6ef7",
//                               border: "1px solid rgba(79,110,247,.18)",
//                               fontWeight: 500,
//                               fontSize: ".75rem",
//                             }}
//                           />
//                         ))}
//                     </Box>
//                   </Box>
//                 </div>

//                 <Grid container spacing={2.5} sx={{ mb: 4 }}>
//                   <Grid item xs={6} sm={3}>
//                     <StatCard
//                       label="Patients"
//                       value={uniquePatientCount}
//                       icon="👥"
//                       color="#4f6ef7"
//                     />
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <StatCard
//                       label="Appointments"
//                       value={appointments.length}
//                       icon="📅"
//                       color="#7c3aed"
//                     />
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <StatCard
//                       label="Pending"
//                       value={pending.length}
//                       icon="⏳"
//                       color="#d97706"
//                     />
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <StatCard
//                       label="Prescriptions"
//                       value={Object.keys(prescriptions).length}
//                       icon="💊"
//                       color="#059669"
//                     />
//                   </Grid>
//                 </Grid>

//                 {pending.length > 0 && (
//                   <>
//                     <div className="doc-sec-heading">Pending Requests</div>
//                     <Grid container spacing={2.5}>
//                       {pending.slice(0, 3).map((appt) => (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{ scale: 1.02 }}>
//                             <Card className="doc-pending-card">
//                               <CardContent sx={{ p: "22px !important" }}>
//                                 <Box
//                                   sx={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 1.5,
//                                     mb: 1.5,
//                                   }}
//                                 >
//                                   <Avatar
//                                     className="av-amber"
//                                     sx={{
//                                       width: 44,
//                                       height: 44,
//                                       borderRadius: "12px",
//                                       fontSize: "1rem",
//                                       fontWeight: 700,
//                                     }}
//                                   >
//                                     {appt.patient?.name?.charAt(0)}
//                                   </Avatar>
//                                   <Box>
//                                     <Typography
//                                       sx={{
//                                         fontWeight: 600,
//                                         fontSize: ".92rem",
//                                         color: "#1a1f36",
//                                       }}
//                                     >
//                                       {appt.patient?.name}
//                                     </Typography>
//                                     <Typography
//                                       sx={{
//                                         fontSize: ".76rem",
//                                         color: "#8892b0",
//                                       }}
//                                     >
//                                       Age {appt.patient?.age}
//                                     </Typography>
//                                   </Box>
//                                 </Box>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".82rem",
//                                     color: "#4a5278",
//                                     mb: 0.6,
//                                   }}
//                                 >
//                                   🕐 {appt.timeSlot}
//                                 </Typography>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".82rem",
//                                     color: "#4a5278",
//                                     mb: 1.5,
//                                   }}
//                                 >
//                                   📝 {appt.description}
//                                 </Typography>
//                                 {appt.report && (
//                                   <Box sx={{ mb: 1.5 }}>
//                                     <span
//                                       className="report-badge"
//                                       onClick={() => setSelectedAppt(appt)}
//                                     >
//                                       <DescriptionIcon sx={{ fontSize: 13 }} />{" "}
//                                       View Report
//                                     </span>
//                                   </Box>
//                                 )}
//                                 <Box sx={{ display: "flex", gap: 1 }}>
//                                   <Button
//                                     size="small"
//                                     variant="contained"
//                                     onClick={() => acceptAppointment(appt.id)}
//                                     sx={{
//                                       background:
//                                         "linear-gradient(135deg,#059669,#34d399)",
//                                       borderRadius: "8px",
//                                       textTransform: "none",
//                                       fontWeight: 600,
//                                       fontSize: ".78rem",
//                                     }}
//                                   >
//                                     ✓ Accept
//                                   </Button>
//                                   <Button
//                                     size="small"
//                                     variant="outlined"
//                                     onClick={() => rejectAppointment(appt.id)}
//                                     sx={{
//                                       borderColor: "rgba(225,29,72,.3)",
//                                       color: "#e11d48",
//                                       borderRadius: "8px",
//                                       textTransform: "none",
//                                       fontWeight: 600,
//                                       fontSize: ".78rem",
//                                       "&:hover": { background: "#fff1f3" },
//                                     }}
//                                   >
//                                     ✕ Reject
//                                   </Button>
//                                 </Box>
//                               </CardContent>
//                             </Card>
//                           </motion.div>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </>
//                 )}
//               </>
//             )}

//             {/* ─────────────── PENDING ─────────────── */}
//             {view === "pending" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography
//                     sx={{
//                       fontFamily: "'Cormorant Garamond',serif",
//                       fontSize: "2rem",
//                       fontWeight: 700,
//                       color: "#1a1f36",
//                     }}
//                   >
//                     Pending Requests
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     {pending.length} request{pending.length !== 1 ? "s" : ""}{" "}
//                     awaiting your response
//                   </Typography>
//                 </Box>
//                 {pending.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>
//                       🎉
//                     </Typography>
//                     <Typography sx={{ fontWeight: 500 }}>
//                       No pending requests!
//                     </Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {pending.map((appt) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale: 1.02 }}>
//                           <Card className="doc-pending-card">
//                             <CardContent sx={{ p: "24px !important" }}>
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: 1.5,
//                                   mb: 2,
//                                 }}
//                               >
//                                 <Avatar
//                                   className="av-amber"
//                                   sx={{
//                                     width: 48,
//                                     height: 48,
//                                     borderRadius: "14px",
//                                     fontSize: "1.1rem",
//                                     fontWeight: 700,
//                                   }}
//                                 >
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography
//                                     sx={{
//                                       fontWeight: 600,
//                                       fontSize: ".95rem",
//                                       color: "#1a1f36",
//                                     }}
//                                   >
//                                     {appt.patient?.name}
//                                   </Typography>
//                                   <Typography
//                                     sx={{
//                                       fontSize: ".76rem",
//                                       color: "#8892b0",
//                                     }}
//                                   >
//                                     Age {appt.patient?.age}
//                                   </Typography>
//                                 </Box>
//                                 <Chip
//                                   label="Pending"
//                                   size="small"
//                                   sx={{
//                                     ml: "auto",
//                                     background: "#fffbeb",
//                                     color: "#d97706",
//                                     border: "1px solid rgba(217,119,6,.2)",
//                                     fontWeight: 600,
//                                     fontSize: ".7rem",
//                                   }}
//                                 />
//                               </Box>
//                               <Divider
//                                 sx={{ mb: 1.5, borderColor: "#f0f2f8" }}
//                               />
//                               <Typography
//                                 sx={{
//                                   fontSize: ".82rem",
//                                   color: "#4a5278",
//                                   mb: 0.6,
//                                 }}
//                               >
//                                 🕐 {appt.timeSlot}
//                               </Typography>
//                               <Typography
//                                 sx={{
//                                   fontSize: ".82rem",
//                                   color: "#4a5278",
//                                   mb: 0.6,
//                                 }}
//                               >
//                                 📝 {appt.description}
//                               </Typography>
//                               <Box sx={{ mb: 2 }}>
//                                 {appt.report ? (
//                                   <span
//                                     className="report-badge"
//                                     onClick={() => setSelectedAppt(appt)}
//                                   >
//                                     <DescriptionIcon sx={{ fontSize: 13 }} />{" "}
//                                     View Patient Report
//                                   </span>
//                                 ) : (
//                                   <span className="report-badge no-report">
//                                     <DescriptionIcon sx={{ fontSize: 13 }} /> No
//                                     report uploaded
//                                   </span>
//                                 )}
//                               </Box>
//                               <Box sx={{ display: "flex", gap: 1 }}>
//                                 <Button
//                                   variant="contained"
//                                   onClick={() => acceptAppointment(appt.id)}
//                                   sx={{
//                                     background:
//                                       "linear-gradient(135deg,#059669,#34d399)",
//                                     borderRadius: "9px",
//                                     textTransform: "none",
//                                     fontWeight: 600,
//                                     fontSize: ".83rem",
//                                     boxShadow: "0 3px 10px rgba(5,150,105,.25)",
//                                     flex: 1,
//                                   }}
//                                 >
//                                   ✓ Accept
//                                 </Button>
//                                 <Button
//                                   variant="outlined"
//                                   onClick={() => rejectAppointment(appt.id)}
//                                   sx={{
//                                     borderColor: "rgba(225,29,72,.3)",
//                                     color: "#e11d48",
//                                     borderRadius: "9px",
//                                     textTransform: "none",
//                                     fontWeight: 600,
//                                     fontSize: ".83rem",
//                                     flex: 1,
//                                     "&:hover": {
//                                       background: "#fff1f3",
//                                       borderColor: "#e11d48",
//                                     },
//                                   }}
//                                 >
//                                   ✕ Reject
//                                 </Button>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ─────────────── APPROVED ─────────────── */}
//             {view === "approved" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography
//                     sx={{
//                       fontFamily: "'Cormorant Garamond',serif",
//                       fontSize: "2rem",
//                       fontWeight: 700,
//                       color: "#1a1f36",
//                     }}
//                   >
//                     Approved Appointments
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     {approved.length} confirmed
//                   </Typography>
//                 </Box>
//                 {approved.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>
//                       📋
//                     </Typography>
//                     <Typography sx={{ fontWeight: 500 }}>
//                       No approved appointments yet.
//                     </Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {approved.map((appt) => {
//                       const hasPrescription = !!prescriptions[appt.id];
//                       return (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{ scale: 1.02 }}>
//                             <Card className="doc-approved-card">
//                               <CardContent sx={{ p: "24px !important" }}>
//                                 <Box
//                                   sx={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 1.5,
//                                     mb: 2,
//                                   }}
//                                 >
//                                   <Avatar
//                                     className="av-green"
//                                     sx={{
//                                       width: 48,
//                                       height: 48,
//                                       borderRadius: "14px",
//                                       fontSize: "1.1rem",
//                                       fontWeight: 700,
//                                     }}
//                                   >
//                                     {appt.patient?.name?.charAt(0)}
//                                   </Avatar>
//                                   <Box>
//                                     <Typography
//                                       sx={{
//                                         fontWeight: 600,
//                                         fontSize: ".95rem",
//                                         color: "#1a1f36",
//                                       }}
//                                     >
//                                       {appt.patient?.name}
//                                     </Typography>
//                                     <Typography
//                                       sx={{
//                                         fontSize: ".76rem",
//                                         color: "#8892b0",
//                                       }}
//                                     >
//                                       Age {appt.patient?.age}
//                                     </Typography>
//                                   </Box>
//                                   <Chip
//                                     label="Approved"
//                                     size="small"
//                                     sx={{
//                                       ml: "auto",
//                                       background: "#ecfdf5",
//                                       color: "#059669",
//                                       border: "1px solid rgba(5,150,105,.2)",
//                                       fontWeight: 600,
//                                       fontSize: ".7rem",
//                                     }}
//                                   />
//                                 </Box>
//                                 <Divider
//                                   sx={{ mb: 1.5, borderColor: "#f0f2f8" }}
//                                 />
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".82rem",
//                                     color: "#4a5278",
//                                     mb: 0.6,
//                                   }}
//                                 >
//                                   🕐 {appt.timeSlot} · 📅 {appt.date}
//                                 </Typography>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".82rem",
//                                     color: "#4a5278",
//                                     mb: 1.5,
//                                   }}
//                                 >
//                                   📝 {appt.description}
//                                 </Typography>
//                                 <Box
//                                   sx={{
//                                     display: "flex",
//                                     gap: 1,
//                                     flexWrap: "wrap",
//                                   }}
//                                 >
//                                   {appt.report ? (
//                                     <span
//                                       className="report-badge"
//                                       onClick={() => setSelectedAppt(appt)}
//                                     >
//                                       <DescriptionIcon sx={{ fontSize: 13 }} />{" "}
//                                       Report
//                                     </span>
//                                   ) : (
//                                     <span className="report-badge no-report">
//                                       <DescriptionIcon sx={{ fontSize: 13 }} />{" "}
//                                       No report
//                                     </span>
//                                   )}
//                                   <Button
//                                     size="small"
//                                     variant={
//                                       hasPrescription ? "outlined" : "contained"
//                                     }
//                                     onClick={() => setRxAppt(appt)}
//                                     startIcon={
//                                       <EditNoteIcon sx={{ fontSize: 14 }} />
//                                     }
//                                     sx={{
//                                       borderRadius: "8px",
//                                       textTransform: "none",
//                                       fontWeight: 600,
//                                       fontSize: ".75rem",
//                                       background: hasPrescription
//                                         ? "transparent"
//                                         : "linear-gradient(135deg,#059669,#34d399)",
//                                       border: hasPrescription
//                                         ? "1px solid rgba(5,150,105,.35)"
//                                         : "none",
//                                       color: hasPrescription
//                                         ? "#059669"
//                                         : "#fff",
//                                       boxShadow: hasPrescription
//                                         ? "none"
//                                         : "0 2px 8px rgba(5,150,105,.25)",
//                                     }}
//                                   >
//                                     {hasPrescription ? "Edit Rx" : "Write Rx"}
//                                   </Button>
//                                 </Box>
//                               </CardContent>
//                             </Card>
//                           </motion.div>
//                         </Grid>
//                       );
//                     })}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ─────────────── PATIENT RECORDS ─────────────── */}
//             {view === "records" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography
//                     sx={{
//                       fontFamily: "'Cormorant Garamond',serif",
//                       fontSize: "2rem",
//                       fontWeight: 700,
//                       color: "#1a1f36",
//                     }}
//                   >
//                     Patient Records
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     {uniquePatientCount} patient
//                     {uniquePatientCount !== 1 ? "s" : ""} · click any card to
//                     view details
//                   </Typography>
//                 </Box>
//                 {approved.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>
//                       🗂️
//                     </Typography>
//                     <Typography sx={{ fontWeight: 500 }}>
//                       No patient records yet.
//                     </Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {approved.map((appt, i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div
//                           whileHover={{ scale: 1.02 }}
//                           onClick={() => setSelectedAppt(appt)}
//                         >
//                           <Card className="doc-patient-card">
//                             <CardContent sx={{ p: "24px !important" }}>
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: 1.5,
//                                   mb: 2,
//                                 }}
//                               >
//                                 <Avatar
//                                   className={
//                                     [
//                                       "av-blue",
//                                       "av-violet",
//                                       "av-teal",
//                                       "av-green",
//                                     ][i % 4]
//                                   }
//                                   sx={{
//                                     width: 48,
//                                     height: 48,
//                                     borderRadius: "14px",
//                                     fontSize: "1.1rem",
//                                     fontWeight: 700,
//                                   }}
//                                 >
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box sx={{ flex: 1 }}>
//                                   <Typography
//                                     sx={{
//                                       fontWeight: 600,
//                                       fontSize: ".95rem",
//                                       color: "#1a1f36",
//                                     }}
//                                   >
//                                     {appt.patient?.name}
//                                   </Typography>
//                                   <Typography
//                                     sx={{
//                                       fontSize: ".76rem",
//                                       color: "#8892b0",
//                                     }}
//                                   >
//                                     {appt.patient?.gender} · Age{" "}
//                                     {appt.patient?.age}
//                                   </Typography>
//                                 </Box>
//                                 <Chip
//                                   label="Approved"
//                                   size="small"
//                                   sx={{
//                                     background: "#ecfdf5",
//                                     color: "#059669",
//                                     border: "1px solid rgba(5,150,105,.2)",
//                                     fontWeight: 600,
//                                     fontSize: ".7rem",
//                                   }}
//                                 />
//                               </Box>
//                               <Divider
//                                 sx={{ mb: 1.5, borderColor: "#f0f2f8" }}
//                               />
//                               <Typography
//                                 sx={{
//                                   fontSize: ".82rem",
//                                   color: "#4a5278",
//                                   mb: 0.5,
//                                 }}
//                               >
//                                 🕐 {appt.timeSlot} · 📅 {appt.date}
//                               </Typography>
//                               <Typography
//                                 sx={{
//                                   fontSize: ".82rem",
//                                   color: "#4a5278",
//                                   mb: 1.5,
//                                 }}
//                                 noWrap
//                               >
//                                 📝 {appt.description}
//                               </Typography>
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "space-between",
//                                 }}
//                               >
//                                 <span
//                                   className={`report-badge ${appt.report ? "" : "no-report"}`}
//                                   onClick={(e) => {
//                                     if (appt.report) {
//                                       e.stopPropagation();
//                                       setSelectedAppt(appt);
//                                     }
//                                   }}
//                                 >
//                                   <DescriptionIcon sx={{ fontSize: 13 }} />{" "}
//                                   {appt.report
//                                     ? "Report attached"
//                                     : "No report"}
//                                 </span>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".76rem",
//                                     color: "#4f6ef7",
//                                     fontWeight: 600,
//                                   }}
//                                 >
//                                   View details →
//                                 </Typography>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ─────────────── PRESCRIPTIONS VIEW ─────────────── */}
//             {view === "prescriptions" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography
//                     sx={{
//                       fontFamily: "'Cormorant Garamond',serif",
//                       fontSize: "2rem",
//                       fontWeight: 700,
//                       color: "#1a1f36",
//                     }}
//                   >
//                     Prescriptions
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     {Object.keys(prescriptions).length} prescription
//                     {Object.keys(prescriptions).length !== 1 ? "s" : ""} written
//                   </Typography>
//                 </Box>
//                 {Object.keys(prescriptions).length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>
//                       💊
//                     </Typography>
//                     <Typography sx={{ fontWeight: 500 }}>
//                       No prescriptions written yet.
//                     </Typography>
//                     <Typography sx={{ fontSize: ".83rem", mt: 0.5 }}>
//                       Go to Approved Appointments to write a prescription.
//                     </Typography>
//                   </Box>
//                 ) : (
//                   Object.values(prescriptions).map((rx) => {
//                     const appt = approved.find(
//                       (a) => a.id === rx.appointment?.id,
//                     );
//                     return (
//                       <div key={rx.id} className="rx-card">
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "flex-start",
//                             gap: 1.5,
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               width: 46,
//                               height: 46,
//                               borderRadius: "13px",
//                               flexShrink: 0,
//                               background: "#ecfdf5",
//                               border: "1px solid rgba(5,150,105,.2)",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                             }}
//                           >
//                             <LocalPharmacyIcon
//                               sx={{ color: "#059669", fontSize: 22 }}
//                             />
//                           </Box>
//                           <Box sx={{ flex: 1 }}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 1.5,
//                                 flexWrap: "wrap",
//                                 mb: 0.5,
//                               }}
//                             >
//                               <Typography
//                                 sx={{
//                                   fontWeight: 700,
//                                   fontSize: ".95rem",
//                                   color: "#1a1f36",
//                                 }}
//                               >
//                                 {appt?.patient?.name || "Patient"}
//                               </Typography>
//                               <Chip
//                                 label={rx.issuedDate || "—"}
//                                 size="small"
//                                 sx={{
//                                   background: "#f5f7ff",
//                                   color: "#8892b0",
//                                   fontSize: ".68rem",
//                                   height: 20,
//                                 }}
//                               />
//                             </Box>
//                             <Typography
//                               sx={{
//                                 fontSize: ".82rem",
//                                 color: "#059669",
//                                 fontWeight: 600,
//                                 mb: 0.5,
//                               }}
//                             >
//                               🩺 {rx.diagnosis}
//                             </Typography>
//                             {rx.medicines && (
//                               <Box
//                                 sx={{
//                                   background: "#f8f9ff",
//                                   borderRadius: "10px",
//                                   p: 1.5,
//                                   my: 1,
//                                   border: "1px solid #e8ecf5",
//                                 }}
//                               >
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".72rem",
//                                     color: "#8892b0",
//                                     fontWeight: 600,
//                                     textTransform: "uppercase",
//                                     letterSpacing: ".8px",
//                                     mb: 0.5,
//                                   }}
//                                 >
//                                   Medicines
//                                 </Typography>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".83rem",
//                                     color: "#1a1f36",
//                                     whiteSpace: "pre-line",
//                                   }}
//                                 >
//                                   {rx.medicines}
//                                 </Typography>
//                               </Box>
//                             )}
//                             {rx.instructions && (
//                               <Typography
//                                 sx={{ fontSize: ".8rem", color: "#4a5278" }}
//                               >
//                                 📋 {rx.instructions}
//                               </Typography>
//                             )}
//                             {rx.tests && (
//                               <Typography
//                                 sx={{
//                                   fontSize: ".8rem",
//                                   color: "#7c3aed",
//                                   mt: 0.4,
//                                 }}
//                               >
//                                 🔬 Tests: {rx.tests}
//                               </Typography>
//                             )}
//                             {rx.followUpDate && (
//                               <Typography
//                                 sx={{
//                                   fontSize: ".8rem",
//                                   color: "#d97706",
//                                   mt: 0.4,
//                                 }}
//                               >
//                                 📅 Follow-up: {rx.followUpDate}
//                               </Typography>
//                             )}
//                           </Box>
//                           <Button
//                             size="small"
//                             variant="outlined"
//                             onClick={() => setRxAppt(appt)}
//                             startIcon={<EditNoteIcon sx={{ fontSize: 14 }} />}
//                             sx={{
//                               borderRadius: "9px",
//                               textTransform: "none",
//                               fontWeight: 600,
//                               fontSize: ".75rem",
//                               borderColor: "rgba(5,150,105,.3)",
//                               color: "#059669",
//                               flexShrink: 0,
//                               "&:hover": { background: "#ecfdf5" },
//                             }}
//                           >
//                             Edit
//                           </Button>
//                         </Box>
//                       </div>
//                     );
//                   })
//                 )}
//               </>
//             )}

//             {/* ─────────────── PROFILE ─────────────── */}
//             {view === "profile" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography
//                     sx={{
//                       fontFamily: "'Cormorant Garamond',serif",
//                       fontSize: "2rem",
//                       fontWeight: 700,
//                       color: "#1a1f36",
//                     }}
//                   >
//                     My Profile
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     Your professional details
//                   </Typography>
//                 </Box>
//                 <Card className="doc-card" sx={{ p: 4 }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 2.5,
//                       mb: 3,
//                     }}
//                   >
//                     <Avatar
//                       className="av-blue"
//                       sx={{
//                         width: 76,
//                         height: 76,
//                         borderRadius: "22px",
//                         fontSize: "2rem",
//                         fontFamily: "'Cormorant Garamond',serif",
//                         fontWeight: 700,
//                         boxShadow: "0 6px 20px rgba(79,110,247,.25)",
//                       }}
//                     >
//                       {doctor?.name?.charAt(0)}
//                     </Avatar>
//                     <Box>
//                       <Typography
//                         sx={{
//                           fontFamily: "'Cormorant Garamond',serif",
//                           fontSize: "1.6rem",
//                           fontWeight: 700,
//                           color: "#1a1f36",
//                         }}
//                       >
//                         Dr. {doctor?.name}
//                       </Typography>
//                       <Typography
//                         sx={{ fontSize: ".82rem", color: "#8892b0", mt: 0.5 }}
//                       >
//                         Doctor Account · Active
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[
//                       ["Full Name", `Dr. ${doctor?.name}`],
//                       ["Gender", doctor?.gender],
//                       ["Email", doctor?.email],
//                       ["Phone", doctor?.contact],
//                       ["Specialization", doctor?.specialization],
//                       ["Qualification", doctor?.qualification],
//                       [
//                         "Experience",
//                         doctor?.experience ? `${doctor.experience} years` : "—",
//                       ],
//                       [
//                         "Consultation Fee",
//                         doctor?.consultationFee
//                           ? `₹${doctor.consultationFee}`
//                           : "—",
//                       ],
//                       ["Hospital", doctor?.hospital],
//                       ["Doctor ID", `#${doctor?.id}`],
//                     ].map(([label, val]) => (
//                       <Grid item xs={12} sm={6} key={label}>
//                         <Typography
//                           sx={{
//                             fontSize: ".7rem",
//                             textTransform: "uppercase",
//                             letterSpacing: "1.1px",
//                             color: "#8892b0",
//                             fontWeight: 600,
//                             mb: 0.6,
//                           }}
//                         >
//                           {label}
//                         </Typography>
//                         <Typography
//                           sx={{
//                             fontSize: ".95rem",
//                             fontWeight: 500,
//                             color: "#1a1f36",
//                           }}
//                         >
//                           {val || "—"}
//                         </Typography>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Card>
//               </>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </Box>

//       {/* ── Modals ── */}
//       <PatientModal
//         appt={selectedAppt}
//         open={Boolean(selectedAppt)}
//         onClose={() => setSelectedAppt(null)}
//         onWriteRx={(appt) => setRxAppt(appt)}
//       />
//       <WritePrescriptionModal
//         appt={rxAppt}
//         open={Boolean(rxAppt)}
//         onClose={() => setRxAppt(null)}
//         onSaved={handleRxSaved}
//       />
//     </Box>
//   );
// }




// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import DoctorProfileForm from "./DoctorProfileForm";
// import {
//   Box, Typography, CircularProgress, Grid, Avatar, Card, CardContent,
//   Button, Chip, Divider, Modal, IconButton, TextField,
// } from "@mui/material";
// import MenuIcon           from "@mui/icons-material/Menu";
// import CloseIcon          from "@mui/icons-material/Close";
// import LogoutIcon         from "@mui/icons-material/Logout";
// import DashboardIcon      from "@mui/icons-material/Dashboard";
// import EventIcon          from "@mui/icons-material/Event";
// import CheckCircleIcon    from "@mui/icons-material/CheckCircle";
// import PersonIcon         from "@mui/icons-material/Person";
// import FolderSharedIcon   from "@mui/icons-material/FolderShared";
// import DescriptionIcon    from "@mui/icons-material/Description";
// import OpenInNewIcon      from "@mui/icons-material/OpenInNew";
// import DownloadIcon       from "@mui/icons-material/Download";
// import VisibilityIcon     from "@mui/icons-material/Visibility";
// import VisibilityOffIcon  from "@mui/icons-material/VisibilityOff";
// import LocalPharmacyIcon  from "@mui/icons-material/LocalPharmacy";
// import EditNoteIcon       from "@mui/icons-material/EditNote";
// import CheckIcon          from "@mui/icons-material/Check";
// import LockIcon           from "@mui/icons-material/Lock";
// import PaymentIcon        from "@mui/icons-material/Payment";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const BASE = "http://localhost:8080";

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .doc-overlay { position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease; }
//   @keyframes overlayIn { from{opacity:0}to{opacity:1} }

//   .doc-sidebar { width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1); }
//   .doc-sidebar.closed { transform:translateX(-100%); }
//   .doc-sidebar.open   { transform:translateX(0); }
//   .doc-sidebar-top { display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px; }
//   .doc-logo { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px; }
//   .doc-logo-icon { width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0; }
//   .doc-logo-accent { color:#7c3aed; }
//   .doc-close-btn { width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s; }
//   .doc-close-btn:hover { background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2); }
//   .doc-nav-label { font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px; }
//   .doc-nav-item { display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none; }
//   .doc-nav-item:hover { background:#eef1fe;color:#4f6ef7; }
//   .doc-nav-item.active { background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18); }
//   .doc-nav-item.active .doc-nav-icon { background:#4f6ef7 !important;color:#fff !important; }
//   .doc-nav-icon { width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278; }
//   .doc-sidebar-spacer { flex:1; }
//   .doc-user-card { display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px; }
//   .doc-user-av { width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem; }
//   .doc-topbar { display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100; }
//   .doc-topbar-left { display:flex;align-items:center;gap:14px; }
//   .doc-hamburger { width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s; }
//   .doc-hamburger:hover { background:#eef1fe;border-color:rgba(79,110,247,.2); }
//   .doc-blob { position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0; }
//   .doc-blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
//   .doc-blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }

//   .doc-hero { background:linear-gradient(135deg,#fff 55%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;display:flex;align-items:center;gap:28px;margin-bottom:28px; }
//   .doc-hero::after { content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none; }
//   .doc-stat { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important; }
//   .doc-stat:hover { box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px); }
//   .doc-stat-value { font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1; }
//   .doc-stat-label { font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px; }
//   .doc-stat-icon  { position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07; }
//   .doc-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important; }
//   .doc-card:hover { box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important; }
//   .doc-pending-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #f59e0b !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(245,158,11,.08) !important;transition:box-shadow .22s,transform .22s !important; }
//   .doc-pending-card:hover { box-shadow:0 6px 24px rgba(245,158,11,.14) !important;transform:translateY(-3px); }
//   .doc-approved-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #059669 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(5,150,105,.08) !important;transition:box-shadow .22s,transform .22s !important; }
//   .doc-approved-card:hover { box-shadow:0 6px 24px rgba(5,150,105,.14) !important;transform:translateY(-3px); }
//   .doc-patient-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.08) !important;transition:box-shadow .22s,transform .22s,border-color .22s !important;cursor:pointer; }
//   .doc-patient-card:hover { box-shadow:0 6px 28px rgba(79,110,247,.16) !important;transform:translateY(-3px);border-color:#c7cee8 !important; }

//   .report-badge { display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:8px;font-size:.75rem;font-weight:500;background:#eef1fe;color:#4f6ef7;border:1px solid rgba(79,110,247,.18);cursor:pointer;transition:all .15s;text-decoration:none; }
//   .report-badge:hover { background:#e0e8ff; }
//   .report-badge.no-report { background:#f5f7ff;color:#8892b0;border-color:#e8ecf5;cursor:default;pointer-events:none; }

//   .patient-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:620px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
//   .rx-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:560px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(5,150,105,.16);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
//   .modal-field-label { font-size:.68rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px; }
//   .modal-field-value { font-size:.92rem;font-weight:500;color:#1a1f36;margin-bottom:16px; }

//   .report-viewer-box { border:1.5px dashed #d4daf0;border-radius:14px;background:#f8f9ff;padding:22px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center; }
//   .report-viewer-icon { width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#4f6ef7,#818cf8);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 14px rgba(79,110,247,.28); }
//   .report-filename { font-size:.82rem;font-weight:500;color:#4a5278;word-break:break-all;max-width:100%; }
//   .report-actions { display:flex;gap:10px;flex-wrap:wrap;justify-content:center; }
//   .report-btn-primary { display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;cursor:pointer;font-size:.84rem;font-weight:600;text-decoration:none;background:linear-gradient(135deg,#4f6ef7,#818cf8);color:#fff;border:none;box-shadow:0 3px 12px rgba(79,110,247,.26);transition:all .18s;font-family:'Outfit',sans-serif; }
//   .report-btn-primary:hover { box-shadow:0 5px 20px rgba(79,110,247,.38);transform:translateY(-1px); }
//   .report-btn-secondary { display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;cursor:pointer;font-size:.84rem;font-weight:600;text-decoration:none;background:#fff;color:#4f6ef7;border:1.5px solid rgba(79,110,247,.28);transition:all .18s;font-family:'Outfit',sans-serif; }
//   .report-btn-secondary:hover { background:#eef1fe;border-color:#4f6ef7; }
//   .report-preview-wrap { width:100%;border-radius:12px;overflow:hidden;border:1px solid #e8ecf5;margin-top:4px;animation:fadeUp .3s ease both; }
//   .report-preview-wrap iframe { width:100%;height:400px;border:none;display:block; }
//   .report-preview-wrap img   { width:100%;display:block;max-height:440px;object-fit:contain;background:#f0f2f8; }
//   .no-report-box { border:1.5px dashed #e8ecf5;border-radius:14px;padding:20px;background:#f5f7ff;display:flex;align-items:center;gap:12px; }

//   .rx-card { background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s; }
//   .rx-card:hover { box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px); }
//   .rx-modal-box .MuiOutlinedInput-root { border-radius:12px !important;background:#f8f9ff !important; }
//   .rx-modal-box .MuiOutlinedInput-notchedOutline { border-color:#e8ecf5 !important; }
//   .rx-modal-box .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color:#059669 !important; }

//   /* Payment lock banner */
//   .pay-lock-banner { background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:10px;margin-top:10px; }

//   .doc-sec-heading { font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px; }
//   .doc-sec-heading::after { content:'';flex:1;height:1px;background:#e8ecf5; }

//   .av-blue   { background:linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-violet { background:linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
//   .av-teal   { background:linear-gradient(135deg,#0891b2,#22d3ee) !important; }
//   .av-amber  { background:linear-gradient(135deg,#d97706,#fbbf24) !important; }
//   .av-green  { background:linear-gradient(135deg,#059669,#34d399) !important; }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
// `;

// if (!document.getElementById("doctor-portal-styles")) {
//   const s = document.createElement("style");
//   s.id = "doctor-portal-styles";
//   s.textContent = globalStyles;
//   document.head.appendChild(s);
// }

// function NavItem({ icon, label, active, onClick }) {
//   return (
//     <div className={`doc-nav-item ${active ? "active" : ""}`} onClick={onClick}>
//       <div className="doc-nav-icon">{icon}</div>
//       {label}
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="doc-stat fu">
//       <div className="doc-stat-label">{label}</div>
//       <div className="doc-stat-value" style={{ color }}>{value}</div>
//       <div className="doc-stat-icon">{icon}</div>
//     </div>
//   );
// }

// function ReportViewer({ filename }) {
//   const [showPreview, setShowPreview] = useState(false);
//   if (!filename) {
//     return (
//       <div className="no-report-box">
//         <DescriptionIcon sx={{ fontSize:30, color:"#c0c8e0", flexShrink:0 }} />
//         <Box>
//           <Typography sx={{ fontWeight:600, fontSize:".88rem", color:"#4a5278" }}>No report attached</Typography>
//           <Typography sx={{ fontSize:".76rem", color:"#b0b8d0", mt:.4 }}>The patient did not upload a report for this appointment.</Typography>
//         </Box>
//       </div>
//     );
//   }
//   const reportUrl  = `${BASE}/appointments/report/${filename}`;
//   const lower      = filename.toLowerCase();
//   const isPdf      = lower.endsWith(".pdf");
//   const isImage    = lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp");
//   const canPreview = isPdf || isImage;
//   return (
//     <div className="report-viewer-box">
//       <div className="report-viewer-icon"><DescriptionIcon sx={{ fontSize:26 }} /></div>
//       <div className="report-filename">{filename}</div>
//       <div className="report-actions">
//         {canPreview && (
//           <button className="report-btn-primary" onClick={() => setShowPreview(p => !p)}>
//             {showPreview ? <><VisibilityOffIcon sx={{ fontSize:16 }} /> Hide Preview</> : <><VisibilityIcon sx={{ fontSize:16 }} /> Preview</>}
//           </button>
//         )}
//         <a href={reportUrl} target="_blank" rel="noreferrer" className="report-btn-primary">
//           <OpenInNewIcon sx={{ fontSize:16 }} /> Open in Tab
//         </a>
//         <a href={reportUrl} download={filename} className="report-btn-secondary">
//           <DownloadIcon sx={{ fontSize:16 }} /> Download
//         </a>
//       </div>
//       {showPreview && (
//         <div className="report-preview-wrap" style={{ width:"100%" }}>
//           {isPdf   && <iframe src={reportUrl} title="Report PDF"   />}
//           {isImage && <img    src={reportUrl} alt="Patient Report" />}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Write Prescription Modal — locked until payment confirmed ─────────────────
// function WritePrescriptionModal({ appt, open, onClose, onSaved, payments }) {
//   const [form, setForm] = useState({ diagnosis:"", medicines:"", instructions:"", tests:"", followUpDate:"" });
//   const [loading, setLoading] = useState(false);
//   const [saved,   setSaved]   = useState(false);

//   // Check if patient has paid for this appointment
//   const isPaid = appt ? (payments[appt.id]?.status === "SUCCESS") : false;

//   useEffect(() => {
//     if (!open || !appt) return;
//     axios.get(`${BASE}/prescriptions/appointment/${appt.id}`)
//       .then(r => setForm({
//         diagnosis:    r.data.diagnosis    || "",
//         medicines:    r.data.medicines    || "",
//         instructions: r.data.instructions || "",
//         tests:        r.data.tests        || "",
//         followUpDate: r.data.followUpDate || "",
//       }))
//       .catch(() => setForm({ diagnosis:"", medicines:"", instructions:"", tests:"", followUpDate:"" }));
//     setSaved(false);
//   }, [open, appt]);

//   const handleSave = async () => {
//     if (!isPaid) return;
//     setLoading(true);
//     try {
//       await axios.post(`${BASE}/prescriptions/appointment/${appt.id}`, form);
//       setSaved(true);
//       onSaved(appt.id);
//       setTimeout(() => { onClose(); setSaved(false); }, 1200);
//     } catch (e) {
//       alert("Failed to save prescription");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!appt) return null;
//   const fieldSx = { "& .MuiOutlinedInput-root":{ borderRadius:"12px !important", background: isPaid ? "#f8f9ff !important" : "#f5f7ff !important" }, "& .MuiOutlinedInput-notchedOutline":{ borderColor:"#e8ecf5 !important" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{ borderColor:"#059669 !important" } };
//   const labelSx = { fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1px", color:"#8892b0", fontWeight:600, mb:.75 };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="rx-modal-box">
//         <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:3 }}>
//           <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
//             <Box sx={{ width:42, height:42, borderRadius:"12px", background:"linear-gradient(135deg,#059669,#34d399)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(5,150,105,.3)" }}>
//               <LocalPharmacyIcon sx={{ color:"#fff", fontSize:22 }} />
//             </Box>
//             <Box>
//               <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#1a1f36" }}>
//                 Write Prescription
//               </Typography>
//               <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>
//                 {appt.patient?.name} · {appt.date}
//               </Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={onClose} size="small" sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px" }}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </IconButton>
//         </Box>

//         {/* Payment lock notice */}
//         {!isPaid && (
//           <Box className="pay-lock-banner" sx={{ mb:3 }}>
//             <LockIcon sx={{ color:"#d97706", fontSize:20, flexShrink:0 }} />
//             <Box>
//               <Typography sx={{ fontWeight:700, fontSize:".85rem", color:"#92400e" }}>
//                 Payment Pending — Prescription Locked
//               </Typography>
//               <Typography sx={{ fontSize:".76rem", color:"#a16207", mt:.2 }}>
//                 The patient must pay the consultation fee of ₹{appt.doctor?.consultationFee || "—"} before you can write a prescription.
//               </Typography>
//             </Box>
//           </Box>
//         )}

//         {isPaid && (
//           <Box sx={{ background:"#ecfdf5", border:"1px solid rgba(5,150,105,.2)", borderRadius:"10px", px:2, py:1, mb:3, display:"flex", alignItems:"center", gap:1 }}>
//             <CheckIcon sx={{ color:"#059669", fontSize:16 }} />
//             <Typography sx={{ fontSize:".8rem", color:"#059669", fontWeight:600 }}>Payment confirmed — you can now write the prescription</Typography>
//           </Box>
//         )}

//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         <Box sx={{ display:"flex", flexDirection:"column", gap:2 }}>
//           <Box>
//             <Typography sx={labelSx}>Diagnosis *</Typography>
//             <TextField fullWidth size="small" variant="outlined" disabled={!isPaid}
//               placeholder={isPaid ? "e.g. Hypertension Stage 1" : "Locked until payment is confirmed"}
//               value={form.diagnosis} onChange={e => setForm({...form, diagnosis:e.target.value})} sx={fieldSx} />
//           </Box>
//           <Box>
//             <Typography sx={labelSx}>Medicines &amp; Dosage *</Typography>
//             <TextField fullWidth size="small" multiline rows={4} variant="outlined" disabled={!isPaid}
//               placeholder={isPaid ? "e.g.\nTab. Metformin 500mg — 1-0-1\nTab. Amlodipine 5mg — 0-0-1" : "Locked until payment is confirmed"}
//               value={form.medicines} onChange={e => setForm({...form, medicines:e.target.value})} sx={fieldSx} />
//           </Box>
//           <Box>
//             <Typography sx={labelSx}>Instructions / Advice</Typography>
//             <TextField fullWidth size="small" multiline rows={2} variant="outlined" disabled={!isPaid}
//               placeholder={isPaid ? "e.g. Drink 2L water daily. Avoid salt." : "Locked until payment is confirmed"}
//               value={form.instructions} onChange={e => setForm({...form, instructions:e.target.value})} sx={fieldSx} />
//           </Box>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={7}>
//               <Typography sx={labelSx}>Lab Tests Ordered</Typography>
//               <TextField fullWidth size="small" variant="outlined" disabled={!isPaid}
//                 placeholder={isPaid ? "e.g. CBC, Blood Sugar" : "Locked"}
//                 value={form.tests} onChange={e => setForm({...form, tests:e.target.value})} sx={fieldSx} />
//             </Grid>
//             <Grid item xs={12} sm={5}>
//               <Typography sx={labelSx}>Follow-Up Date</Typography>
//               <TextField fullWidth size="small" type="date" variant="outlined" disabled={!isPaid}
//                 value={form.followUpDate} onChange={e => setForm({...form, followUpDate:e.target.value})} sx={fieldSx} />
//             </Grid>
//           </Grid>

//           <Button onClick={handleSave} variant="contained"
//             disabled={!isPaid || loading || saved}
//             startIcon={!isPaid ? <LockIcon /> : saved ? <CheckIcon /> : <LocalPharmacyIcon />}
//             sx={{ background: isPaid ? "linear-gradient(135deg,#059669,#34d399)" : "#e2e8f0",
//                   borderRadius:"12px", textTransform:"none", fontWeight:700, fontSize:".92rem", py:1.4, mt:1,
//                   color: isPaid ? "#fff" : "#94a3b8",
//                   boxShadow: isPaid ? "0 4px 14px rgba(5,150,105,.28)" : "none",
//                   "&:hover":{ boxShadow: isPaid ? "0 6px 22px rgba(5,150,105,.40)" : "none" } }}>
//             {!isPaid ? "Payment Required to Unlock" : saved ? "Prescription Saved!" : loading ? "Saving…" : "Save Prescription"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// function PatientModal({ appt, open, onClose, onWriteRx, payments }) {
//   if (!appt) return null;
//   const p = appt.patient;
//   const isPaid = payments[appt.id]?.status === "SUCCESS";
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="patient-modal-box">
//         <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:3 }}>
//           <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
//             <Avatar className="av-blue" sx={{ width:54, height:54, borderRadius:"16px", fontSize:"1.4rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 4px 14px rgba(79,110,247,.25)" }}>
//               {p?.name?.charAt(0)}
//             </Avatar>
//             <Box>
//               <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#1a1f36" }}>{p?.name}</Typography>
//               <Typography sx={{ fontSize:".78rem", color:"#8892b0" }}>Patient Record</Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={onClose} size="small" sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px" }}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </IconButton>
//         </Box>
//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36", mb:2 }}>Patient Information</Typography>
//         <Grid container spacing={2} sx={{ mb:3 }}>
//           {[["Full Name",p?.name],["Age",p?.age?`${p.age} years`:"—"],["Gender",p?.gender],["Date of Birth",p?.dob],["Contact",p?.contact]].map(([label,val]) => (
//             <Grid item xs={6} key={label}>
//               <div className="modal-field-label">{label}</div>
//               <div className="modal-field-value">{val||"—"}</div>
//             </Grid>
//           ))}
//         </Grid>
//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />

//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36", mb:2 }}>Appointment Details</Typography>
//         <Grid container spacing={2} sx={{ mb:2 }}>
//           {[["Date",appt.date],["Time Slot",appt.timeSlot],["Status",appt.status]].map(([label,val]) => (
//             <Grid item xs={6} key={label}>
//               <div className="modal-field-label">{label}</div>
//               <div className="modal-field-value">{val||"—"}</div>
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <div className="modal-field-label">Description / Symptoms</div>
//             <div className="modal-field-value">{appt.description||"—"}</div>
//           </Grid>
//         </Grid>

//         {/* Payment status */}
//         <Box sx={{ display:"flex", alignItems:"center", gap:1, mb:3 }}>
//           {isPaid
//             ? <Chip label="✓ Payment Confirmed" size="small" sx={{ background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.25)", fontWeight:600 }} />
//             : <Chip icon={<LockIcon sx={{ fontSize:13 }} />} label="Payment Pending" size="small" sx={{ background:"#fff7ed", color:"#d97706", border:"1px solid #fcd34d", fontWeight:600 }} />
//           }
//         </Box>

//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />
//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36", mb:2 }}>Medical Report</Typography>
//         <ReportViewer filename={appt.report} />

//         {appt.status === "APPROVED" && (
//           <Button onClick={() => { onClose(); onWriteRx(appt); }} variant="contained" fullWidth
//             startIcon={isPaid ? <EditNoteIcon /> : <LockIcon />}
//             sx={{ mt:3,
//                   background: isPaid ? "linear-gradient(135deg,#059669,#34d399)" : "linear-gradient(135deg,#f59e0b,#fbbf24)",
//                   borderRadius:"12px", textTransform:"none", fontWeight:700, fontSize:".9rem",
//                   boxShadow: isPaid ? "0 4px 14px rgba(5,150,105,.28)" : "0 4px 14px rgba(245,158,11,.28)" }}>
//             {isPaid ? "Write / Update Prescription" : "View Prescription (Payment Pending)"}
//           </Button>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// export default function DoctorDashboard() {
//   const { user } = useContext(AuthContext);
//   const userId   = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [doctor,         setDoctor]         = useState(null);
//   const [appointments,   setAppointments]   = useState([]);
//   const [prescriptions,  setPrescriptions]  = useState({});  // {appointmentId: Prescription}
//   const [payments,       setPayments]       = useState({});  // {appointmentId: PaymentRecord}
//   const [loading,        setLoading]        = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [sidebarOpen,    setSidebarOpen]    = useState(false);
//   const [view,           setView]           = useState("dashboard");
//   const [selectedAppt,   setSelectedAppt]   = useState(null);
//   const [rxAppt,         setRxAppt]         = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       // Step 1: Doctor (fatal)
//       let doc;
//       try {
//         const docRes = await axios.get(`${BASE}/doctor/user/${userId}`);
//         if (!docRes.data?.id) { setProfileMissing(true); setLoading(false); return; }
//         doc = docRes.data;
//         setDoctor(doc);
//       } catch (err) {
//         if (err.response?.status === 404) setProfileMissing(true);
//         setLoading(false);
//         return;
//       }

//       // Step 2: Appointments (non-fatal)
//       let appts = [];
//       try {
//         const appRes = await axios.get(`${BASE}/appointments/doctor/${doc.id}`);
//         appts = appRes.data;
//         setAppointments(appts);
//       } catch (err) { console.error("Appointments:", err); }

//       // Step 3: Prescriptions (non-fatal)
//       try {
//         const rxRes = await axios.get(`${BASE}/prescriptions/doctor/${doc.id}`);
//         const rxMap = {};
//         rxRes.data.forEach(rx => { rxMap[rx.appointment?.id] = rx; });
//         setPrescriptions(rxMap);
//       } catch (err) { console.error("Prescriptions:", err); }

//       // Step 4: Payments for all approved appointments (non-fatal)
//       try {
//         const approvedIds = appts.filter(a => a.status === "APPROVED").map(a => a.id);
//         const payMap = {};
//         await Promise.all(approvedIds.map(async id => {
//           try {
//             const res = await axios.get(`${BASE}/payments/appointment/${id}`);
//             if (res.data) payMap[id] = res.data;
//           } catch {}
//         }));
//         setPayments(payMap);
//       } catch (err) { console.error("Payments:", err); }

//       setLoading(false);
//     };
//     if (userId) fetchData();
//   }, [userId]);

//   const acceptAppointment = async (id) => {
//     await axios.put(`${BASE}/appointments/${id}/approve`);
//     setAppointments(prev => prev.map(a => a.id === id ? { ...a, status:"APPROVED" } : a));
//   };

//   const rejectAppointment = async (id) => {
//     await axios.put(`${BASE}/appointments/${id}/reject`);
//     setAppointments(prev => prev.filter(a => a.id !== id));
//   };

//   const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };
//   const handleNavClick = key => { setView(key); setSidebarOpen(false); };

//   const handleRxSaved = (appointmentId) => {
//     axios.get(`${BASE}/prescriptions/doctor/${doctor.id}`)
//       .then(r => {
//         const rxMap = {};
//         r.data.forEach(rx => { rxMap[rx.appointment?.id] = rx; });
//         setPrescriptions(rxMap);
//       }).catch(() => {});
//   };

//   if (profileMissing) {
//     return <DoctorProfileForm userId={userId} onCreated={doc => { setDoctor(doc); setProfileMissing(false); }} />;
//   }
//   if (loading) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <CircularProgress sx={{ color:"#4f6ef7" }} />
//     </Box>
//   );

//   const pending  = appointments.filter(a => a.status === "PENDING");
//   const approved = appointments.filter(a => a.status === "APPROVED");
//   const uniquePatientCount = new Set(approved.map(a => a.patient?.id)).size;

//   const menuItems = [
//     { key:"dashboard",     label:"Dashboard",             icon:<DashboardIcon    sx={{ fontSize:18 }} /> },
//     { key:"pending",       label:"Pending Requests",      icon:<EventIcon        sx={{ fontSize:18 }} /> },
//     { key:"approved",      label:"Approved Appointments", icon:<CheckCircleIcon  sx={{ fontSize:18 }} /> },
//     { key:"records",       label:"Patient Records",       icon:<FolderSharedIcon sx={{ fontSize:18 }} /> },
//     { key:"prescriptions", label:"Prescriptions",         icon:<LocalPharmacyIcon sx={{ fontSize:18 }} /> },
//     { key:"profile",       label:"My Profile",            icon:<PersonIcon       sx={{ fontSize:18 }} /> },
//   ];

//   return (
//     <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
//       <div className="doc-blob doc-blob-1" />
//       <div className="doc-blob doc-blob-2" />

//       {sidebarOpen && <div className="doc-overlay" onClick={() => setSidebarOpen(false)} />}

//       {/* Sidebar */}
//       <div className={`doc-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="doc-sidebar-top">
//           <div className="doc-logo">
//             <div className="doc-logo-icon">✦</div>
//             Med<span className="doc-logo-accent">Vault</span>
//           </div>
//           <div className="doc-close-btn" onClick={() => setSidebarOpen(false)}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </div>
//         </div>
//         <div className="doc-nav-label">Navigation</div>
//         {menuItems.map(item => (
//           <NavItem key={item.key} icon={item.icon} label={item.label}
//             active={view === item.key} onClick={() => handleNavClick(item.key)} />
//         ))}
//         <div className="doc-sidebar-spacer" />
//         <div className="doc-user-card">
//           <div className="doc-user-av">{doctor?.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>Dr. {doctor?.name}</Typography>
//             <Typography sx={{ fontSize:".72rem", color:"#8892b0" }}>{doctor?.specialization}</Typography>
//           </Box>
//         </div>
//         <button onClick={handleLogout}
//           style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11, cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48", border:"1px solid transparent", background:"none", width:"100%", fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
//           onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.borderColor="transparent"; }}>
//           <div className="doc-nav-icon" style={{ background:"#fff1f3", color:"#e11d48" }}><LogoutIcon sx={{ fontSize:16 }} /></div>
//           Sign Out
//         </button>
//       </div>

//       {/* Top bar */}
//       <div className="doc-topbar">
//         <div className="doc-topbar-left">
//           <div className="doc-hamburger" onClick={() => setSidebarOpen(true)}><MenuIcon sx={{ fontSize:20 }} /></div>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#4f6ef7" }}>
//             Med<span style={{ color:"#7c3aed" }}>Vault</span>
//           </Typography>
//         </div>
//         <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
//           sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none", borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>
//           Logout
//         </Button>
//       </div>

//       {/* Content */}
//       <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.3 }}>

//             {/* DASHBOARD */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Welcome, Dr. {doctor?.name?.split(" ")[0]} 👨‍⚕️
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Here's your practice overview</Typography>
//                 </Box>

//                 <div className="doc-hero">
//                   <Avatar className="av-blue" sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 8px 24px rgba(79,110,247,.3)", flexShrink:0 }}>
//                     {doctor?.name?.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>Dr. {doctor?.name}</Typography>
//                     <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>Doctor Account · Active</Typography>
//                     <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
//                       {[doctor?.qualification, doctor?.specialization, doctor?.experience?`${doctor.experience} yrs exp`:null, doctor?.consultationFee?`₹${doctor.consultationFee} fee`:null].filter(Boolean).map((v,i) => (
//                         <Chip key={i} label={v} size="small" sx={{ background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.18)", fontWeight:500, fontSize:".75rem" }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </div>

//                 <Grid container spacing={2.5} sx={{ mb:4 }}>
//                   <Grid item xs={6} sm={3}><StatCard label="Pending"       value={pending.length}           icon="⏳" color="#d97706"/></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Approved"      value={approved.length}          icon="✓"  color="#059669"/></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Patients"      value={uniquePatientCount}       icon="👥" color="#4f6ef7"/></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Prescriptions" value={Object.keys(prescriptions).length} icon="💊" color="#7c3aed"/></Grid>
//                 </Grid>

//                 <div className="doc-sec-heading">Recent Pending Requests</div>
//                 {pending.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:5, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2rem", mb:1 }}>✓</Typography>
//                     <Typography sx={{ fontWeight:500 }}>All caught up! No pending requests.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {pending.slice(0,3).map((appt,i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <Card className="doc-pending-card">
//                           <CardContent sx={{ p:"20px !important" }}>
//                             <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                               <Avatar className={["av-blue","av-violet","av-teal","av-amber"][i%4]} sx={{ width:44, height:44, borderRadius:"12px", fontSize:"1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
//                               <Box>
//                                 <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                 <Typography sx={{ fontSize:".75rem", color:"#8892b0" }}>{appt.date} · {appt.timeSlot}</Typography>
//                               </Box>
//                             </Box>
//                             <Box sx={{ display:"flex", gap:1, mt:1 }}>
//                               <Button size="small" variant="contained" onClick={() => acceptAppointment(appt.id)}
//                                 sx={{ flex:1, background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".83rem" }}>✓ Accept</Button>
//                               <Button size="small" variant="outlined" onClick={() => rejectAppointment(appt.id)}
//                                 sx={{ flex:1, borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".83rem", "&:hover":{ background:"#fff1f3" } }}>✕ Reject</Button>
//                             </Box>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* PENDING */}
//             {view === "pending" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Pending Requests</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{pending.length} awaiting your response</Typography>
//                 </Box>
//                 {pending.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>✓</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No pending requests.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {pending.map((appt,i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }}>
//                           <Card className="doc-pending-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className={["av-blue","av-violet","av-teal","av-amber"][i%4]} sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                 </Box>
//                                 <Chip label="Pending" size="small" sx={{ ml:"auto", background:"#fffbeb", color:"#d97706", border:"1px solid #fcd34d", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📝 {appt.description}</Typography>
//                               <Box sx={{ display:"flex", gap:1 }}>
//                                 <Button variant="contained" onClick={() => acceptAppointment(appt.id)}
//                                   sx={{ flex:1, background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".83rem" }}>✓ Accept</Button>
//                                 <Button variant="outlined" onClick={() => rejectAppointment(appt.id)}
//                                   sx={{ flex:1, borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".83rem", "&:hover":{ background:"#fff1f3", borderColor:"#e11d48" } }}>✕ Reject</Button>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* APPROVED */}
//             {view === "approved" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Approved Appointments</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{approved.length} confirmed · write prescriptions after payment</Typography>
//                 </Box>
//                 {approved.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>📋</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No approved appointments yet.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {approved.map(appt => {
//                       const hasPrescription = !!prescriptions[appt.id];
//                       const isPaid = payments[appt.id]?.status === "SUCCESS";
//                       return (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{ scale:1.02 }}>
//                             <Card className="doc-approved-card">
//                               <CardContent sx={{ p:"24px !important" }}>
//                                 <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                   <Avatar className="av-green" sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
//                                   <Box>
//                                     <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                     <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography>
//                                   </Box>
//                                   {isPaid
//                                     ? <Chip label="Paid ✓" size="small" sx={{ ml:"auto", background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }} />
//                                     : <Chip icon={<LockIcon sx={{ fontSize:11 }} />} label="Fee Pending" size="small" sx={{ ml:"auto", background:"#fff7ed", color:"#d97706", border:"1px solid #fcd34d", fontWeight:600, fontSize:".7rem" }} />
//                                   }
//                                 </Box>
//                                 <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📝 {appt.description}</Typography>
//                                 <Box sx={{ display:"flex", gap:1, flexWrap:"wrap" }}>
//                                   {appt.report
//                                     ? <span className="report-badge" onClick={() => setSelectedAppt(appt)}><DescriptionIcon sx={{ fontSize:13 }} /> Report</span>
//                                     : <span className="report-badge no-report"><DescriptionIcon sx={{ fontSize:13 }} /> No report</span>
//                                   }
//                                   <Button size="small" variant={hasPrescription?"outlined":"contained"} onClick={() => setRxAppt(appt)}
//                                     startIcon={!isPaid ? <LockIcon sx={{ fontSize:13 }} /> : <EditNoteIcon sx={{ fontSize:14 }} />}
//                                     sx={{ borderRadius:"8px", textTransform:"none", fontWeight:600, fontSize:".75rem",
//                                           background: !isPaid ? "#f1f5f9" : hasPrescription ? "transparent" : "linear-gradient(135deg,#059669,#34d399)",
//                                           border: hasPrescription || !isPaid ? "1px solid rgba(5,150,105,.35)" : "none",
//                                           color: !isPaid ? "#94a3b8" : hasPrescription ? "#059669" : "#fff",
//                                           boxShadow: (!isPaid||hasPrescription) ? "none" : "0 2px 8px rgba(5,150,105,.25)" }}>
//                                     {!isPaid ? "Locked" : hasPrescription ? "Edit Rx" : "Write Rx"}
//                                   </Button>
//                                 </Box>
//                               </CardContent>
//                             </Card>
//                           </motion.div>
//                         </Grid>
//                       );
//                     })}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* PATIENT RECORDS */}
//             {view === "records" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Patient Records</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{uniquePatientCount} patient{uniquePatientCount!==1?"s":""} · click any card to view details</Typography>
//                 </Box>
//                 {approved.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🗂️</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No patient records yet.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {approved.map((appt,i) => (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{ scale:1.02 }} onClick={() => setSelectedAppt(appt)}>
//                           <Card className="doc-patient-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className={["av-blue","av-violet","av-teal","av-green"][i%4]} sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>
//                                   {appt.patient?.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box sx={{ flex:1 }}>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography>
//                                   <Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>{appt.patient?.gender} · Age {appt.patient?.age}</Typography>
//                                 </Box>
//                                 <Chip label="Approved" size="small" sx={{ background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }} />
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.5 }}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
//                               <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }} noWrap>📝 {appt.description}</Typography>
//                               <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                                 <span className={`report-badge ${appt.report?"":"no-report"}`}>
//                                   <DescriptionIcon sx={{ fontSize:13 }} /> {appt.report?"Report attached":"No report"}
//                                 </span>
//                                 <Typography sx={{ fontSize:".76rem", color:"#4f6ef7", fontWeight:600 }}>View details →</Typography>
//                               </Box>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* PRESCRIPTIONS VIEW */}
//             {view === "prescriptions" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Prescriptions</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{Object.keys(prescriptions).length} prescription{Object.keys(prescriptions).length!==1?"s":""} written</Typography>
//                 </Box>
//                 {Object.keys(prescriptions).length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>💊</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No prescriptions written yet.</Typography>
//                     <Typography sx={{ fontSize:".83rem", mt:.5 }}>Go to Approved Appointments to write a prescription after patient payment.</Typography>
//                   </Box>
//                 ) : (
//                   Object.values(prescriptions).map(rx => {
//                     const appt = approved.find(a => a.id === rx.appointment?.id);
//                     return (
//                       <div key={rx.id} className="rx-card">
//                         <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.5 }}>
//                           <Box sx={{ width:46, height:46, borderRadius:"13px", flexShrink:0, background:"#ecfdf5", border:"1px solid rgba(5,150,105,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
//                             <LocalPharmacyIcon sx={{ color:"#059669", fontSize:22 }} />
//                           </Box>
//                           <Box sx={{ flex:1 }}>
//                             <Box sx={{ display:"flex", alignItems:"center", gap:1.5, flexWrap:"wrap", mb:.5 }}>
//                               <Typography sx={{ fontWeight:700, fontSize:".95rem", color:"#1a1f36" }}>{appt?.patient?.name || "Patient"}</Typography>
//                               <Chip label={rx.issuedDate || "—"} size="small" sx={{ background:"#f5f7ff", color:"#8892b0", fontSize:".68rem", height:20 }} />
//                             </Box>
//                             <Typography sx={{ fontSize:".82rem", color:"#059669", fontWeight:600, mb:.5 }}>🩺 {rx.diagnosis}</Typography>
//                             {rx.medicines && (
//                               <Box sx={{ background:"#f8f9ff", borderRadius:"10px", p:1.5, my:1, border:"1px solid #e8ecf5" }}>
//                                 <Typography sx={{ fontSize:".72rem", color:"#8892b0", fontWeight:600, textTransform:"uppercase", letterSpacing:".8px", mb:.5 }}>Medicines</Typography>
//                                 <Typography sx={{ fontSize:".83rem", color:"#1a1f36", whiteSpace:"pre-line" }}>{rx.medicines}</Typography>
//                               </Box>
//                             )}
//                             {rx.instructions && <Typography sx={{ fontSize:".8rem", color:"#4a5278" }}>📋 {rx.instructions}</Typography>}
//                             {rx.tests && <Typography sx={{ fontSize:".8rem", color:"#7c3aed", mt:.4 }}>🔬 Tests: {rx.tests}</Typography>}
//                             {rx.followUpDate && <Typography sx={{ fontSize:".8rem", color:"#d97706", mt:.4 }}>📅 Follow-up: {rx.followUpDate}</Typography>}
//                           </Box>
//                           <Button size="small" variant="outlined" onClick={() => setRxAppt(appt)}
//                             startIcon={<EditNoteIcon sx={{ fontSize:14 }} />}
//                             sx={{ borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".75rem", borderColor:"rgba(5,150,105,.3)", color:"#059669", flexShrink:0, "&:hover":{ background:"#ecfdf5" } }}>
//                             Edit
//                           </Button>
//                         </Box>
//                       </div>
//                     );
//                   })
//                 )}
//               </>
//             )}

//             {/* PROFILE */}
//             {view === "profile" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>My Profile</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Your professional details</Typography>
//                 </Box>
//                 <Card className="doc-card" sx={{ p:4 }}>
//                   <Box sx={{ display:"flex", alignItems:"center", gap:2.5, mb:3 }}>
//                     <Avatar className="av-blue" sx={{ width:76, height:76, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 6px 20px rgba(79,110,247,.25)" }}>
//                       {doctor?.name?.charAt(0)}
//                     </Avatar>
//                     <Box>
//                       <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:700, color:"#1a1f36" }}>Dr. {doctor?.name}</Typography>
//                       <Typography sx={{ fontSize:".82rem", color:"#8892b0", mt:.5 }}>Doctor Account · Active</Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb:3, borderColor:"#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[
//                       ["Full Name",       `Dr. ${doctor?.name}`],
//                       ["Gender",          doctor?.gender],
//                       ["Email",           doctor?.email],
//                       ["Phone",           doctor?.contact],
//                       ["Specialization",  doctor?.specialization],
//                       ["Qualification",   doctor?.qualification],
//                       ["Experience",      doctor?.experience ? `${doctor.experience} years` : "—"],
//                       ["Consultation Fee",doctor?.consultationFee ? `₹${doctor.consultationFee}` : "—"],
//                       ["Hospital",        doctor?.hospital],
//                       ["Doctor ID",       `#${doctor?.id}`],
//                     ].map(([label,val]) => (
//                       <Grid item xs={12} sm={6} key={label}>
//                         <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1.1px", color:"#8892b0", fontWeight:600, mb:.6 }}>{label}</Typography>
//                         <Typography sx={{ fontSize:".95rem", fontWeight:500, color:"#1a1f36" }}>{val||"—"}</Typography>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Card>
//               </>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </Box>

//       {/* Modals */}
//       <PatientModal appt={selectedAppt} open={Boolean(selectedAppt)} onClose={() => setSelectedAppt(null)} onWriteRx={appt => setRxAppt(appt)} payments={payments} />
//       <WritePrescriptionModal appt={rxAppt} open={Boolean(rxAppt)} onClose={() => setRxAppt(null)} onSaved={handleRxSaved} payments={payments} />
//     </Box>
//   );
// }




// import { useContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import DoctorProfileForm from "./DoctorProfileForm";
// import {
//   Box, Typography, CircularProgress, Grid, Avatar, Card, CardContent,
//   Button, Chip, Divider, Modal, IconButton, TextField,
// } from "@mui/material";
// import MenuIcon            from "@mui/icons-material/Menu";
// import CloseIcon           from "@mui/icons-material/Close";
// import LogoutIcon          from "@mui/icons-material/Logout";
// import DashboardIcon       from "@mui/icons-material/Dashboard";
// import EventIcon           from "@mui/icons-material/Event";
// import CheckCircleIcon     from "@mui/icons-material/CheckCircle";
// import PersonIcon          from "@mui/icons-material/Person";
// import FolderSharedIcon    from "@mui/icons-material/FolderShared";
// import DescriptionIcon     from "@mui/icons-material/Description";
// import OpenInNewIcon       from "@mui/icons-material/OpenInNew";
// import DownloadIcon        from "@mui/icons-material/Download";
// import LocalPharmacyIcon   from "@mui/icons-material/LocalPharmacy";
// import EditNoteIcon        from "@mui/icons-material/EditNote";
// import CheckIcon           from "@mui/icons-material/Check";
// import LockIcon            from "@mui/icons-material/Lock";
// import BadgeIcon           from "@mui/icons-material/Badge";
// import SchoolIcon          from "@mui/icons-material/School";
// import LocalHospitalIcon   from "@mui/icons-material/LocalHospital";
// import UploadFileIcon      from "@mui/icons-material/UploadFile";
// import HourglassTopIcon    from "@mui/icons-material/HourglassTop";
// import VerifiedIcon        from "@mui/icons-material/Verified";
// import ErrorOutlineIcon    from "@mui/icons-material/ErrorOutline";
// import ChevronRightIcon    from "@mui/icons-material/ChevronRight";
// import ChevronLeftIcon     from "@mui/icons-material/ChevronLeft";
// import SendIcon            from "@mui/icons-material/Send";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const BASE = "http://localhost:8080";

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family:'Outfit',sans-serif !important; }
//   .doc-overlay { position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199; }
//   .doc-sidebar { width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1); }
//   .doc-sidebar.closed { transform:translateX(-100%); }
//   .doc-sidebar.open   { transform:translateX(0); }
//   .doc-sidebar-top { display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px; }
//   .doc-logo { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px; }
//   .doc-logo-icon { width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0; }
//   .doc-logo-accent { color:#7c3aed; }
//   .doc-close-btn { width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0; }
//   .doc-close-btn:hover { background:#eef1fe;color:#4f6ef7; }
//   .doc-nav-label { font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px; }
//   .doc-nav-item { display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s;border:1px solid transparent;margin-bottom:3px;user-select:none; }
//   .doc-nav-item:hover { background:#eef1fe;color:#4f6ef7; }
//   .doc-nav-item.active { background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18); }
//   .doc-nav-item.active .doc-nav-icon { background:#4f6ef7 !important;color:#fff !important; }
//   .doc-nav-icon { width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278; }
//   .doc-nav-item.locked-nav { opacity:.5;cursor:not-allowed; }
//   .doc-sidebar-spacer { flex:1; }
//   .doc-user-card { display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px; }
//   .doc-user-av { width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem; }
//   .doc-topbar { display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100; }
//   .doc-topbar-left { display:flex;align-items:center;gap:14px; }
//   .doc-hamburger { width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7; }
//   .doc-hamburger:hover { background:#eef1fe; }
//   .doc-blob { position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0; }
//   .doc-blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
//   .doc-blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }
//   .doc-hero { background:linear-gradient(135deg,#fff 55%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;display:flex;align-items:center;gap:28px;margin-bottom:28px; }
//   .doc-stat { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden; }
//   .doc-stat-value { font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1; }
//   .doc-stat-label { font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px; }
//   .doc-stat-icon  { position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07; }
//   .doc-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06) !important; }
//   .doc-pending-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #f59e0b !important;border-radius:18px !important; }
//   .doc-approved-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #059669 !important;border-radius:18px !important; }
//   .doc-patient-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:18px !important;cursor:pointer; }
//   .doc-sec-heading { font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px; }
//   .doc-sec-heading::after { content:'';flex:1;height:1px;background:#e8ecf5; }
//   .patient-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:620px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
//   .rx-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:560px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(5,150,105,.16);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
//   .modal-field-label { font-size:.68rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px; }
//   .modal-field-value { font-size:.92rem;font-weight:500;color:#1a1f36;margin-bottom:16px; }
//   .rx-card { background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px; }
//   .pay-lock-banner { background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:10px; }
//   .av-blue   { background:linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-violet { background:linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
//   .av-teal   { background:linear-gradient(135deg,#0891b2,#22d3ee) !important; }
//   .av-amber  { background:linear-gradient(135deg,#d97706,#fbbf24) !important; }
//   .av-green  { background:linear-gradient(135deg,#059669,#34d399) !important; }
//   .field-label { font-size:.68rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px; }
//   /* Verification */
//   .verif-step-bar { display:flex;align-items:center;gap:0;margin-bottom:28px;overflow-x:auto;padding-bottom:4px; }
//   .verif-step-pill { display:flex;align-items:center;gap:7px;padding:8px 14px;border-radius:40px;font-size:.76rem;font-weight:600;cursor:pointer;transition:all .22s;white-space:nowrap; }
//   .verif-step-pill.done    { background:#ecfdf5;color:#059669;border:1.5px solid rgba(5,150,105,.25); }
//   .verif-step-pill.active  { background:#eef1fe;color:#4f6ef7;border:1.5px solid rgba(79,110,247,.35);box-shadow:0 2px 10px rgba(79,110,247,.14); }
//   .verif-step-pill.waiting { background:#f5f7ff;color:#b0b8d0;border:1.5px solid #e8ecf5; }
//   .verif-step-connector { flex:1;height:2px;background:#e8ecf5;min-width:10px; }
//   .verif-upload-zone { border:2px dashed #d4daf0;border-radius:14px;background:#f8f9ff;padding:22px 16px;display:flex;flex-direction:column;align-items:center;gap:9px;text-align:center;cursor:pointer;transition:all .2s; }
//   .verif-upload-zone:hover { border-color:#4f6ef7;background:#eef1fe; }
//   .verif-upload-zone.has-file { border-color:#059669;background:#ecfdf5;border-style:solid; }
//   .verif-status-banner { border-radius:16px;padding:18px 22px;display:flex;align-items:flex-start;gap:15px;margin-bottom:26px; }
//   .verif-status-banner.incomplete { background:linear-gradient(135deg,#f0f4ff,#eef1fe);border:1.5px solid rgba(79,110,247,.25); }
//   .verif-status-banner.pending    { background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1.5px solid #fcd34d; }
//   .verif-status-banner.approved   { background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1.5px solid rgba(5,150,105,.3); }
//   .verif-status-banner.rejected   { background:linear-gradient(135deg,#fff1f2,#ffe4e6);border:1.5px solid rgba(225,29,72,.3); }
//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation:fadeUp .38s cubic-bezier(.22,1,.36,1) both; }
// `;
// if (!document.getElementById("doc-css")) {
//   const st = document.createElement("style"); st.id = "doc-css";
//   st.textContent = CSS; document.head.appendChild(st);
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="doc-stat fu">
//       <div className="doc-stat-label">{label}</div>
//       <div className="doc-stat-value" style={{ color }}>{value}</div>
//       <div className="doc-stat-icon">{icon}</div>
//     </div>
//   );
// }

// function NavItem({ icon, label, active, onClick, badge, locked }) {
//   return (
//     <div className={`doc-nav-item ${active?"active":""} ${locked?"locked-nav":""}`}
//       onClick={locked ? undefined : onClick}>
//       <div className="doc-nav-icon">{icon}</div>
//       <span style={{ flex:1 }}>{label}</span>
//       {badge && <span style={{ width:9, height:9, borderRadius:"50%", background:badge, flexShrink:0 }}/>}
//       {locked && <LockIcon sx={{ fontSize:13, color:"#b0b8d0" }}/>}
//     </div>
//   );
// }

// // ─── Report Viewer ─────────────────────────────────────────────────────────────
// function ReportViewer({ filename }) {
//   if (!filename) return (
//     <Box sx={{ border:"1.5px dashed #e8ecf5", borderRadius:"14px", p:2.5, background:"#f5f7ff", display:"flex", alignItems:"center", gap:1.5 }}>
//       <DescriptionIcon sx={{ color:"#b0b8d0", fontSize:22 }}/>
//       <Typography sx={{ fontSize:".82rem", color:"#8892b0" }}>No report uploaded by patient</Typography>
//     </Box>
//   );
//   const url = `${BASE}/appointments/report/${filename}`;
//   const isPdf = filename.toLowerCase().endsWith(".pdf");
//   return (
//     <Box sx={{ border:"1.5px dashed #d4daf0", borderRadius:"14px", background:"#f8f9ff", p:2.5 }}>
//       <Box sx={{ display:"flex", gap:1.5, mb:2 }}>
//         <a href={url} target="_blank" rel="noopener noreferrer"
//           style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:10, background:"linear-gradient(135deg,#4f6ef7,#818cf8)", color:"#fff", fontWeight:600, fontSize:".82rem", textDecoration:"none", fontFamily:"'Outfit',sans-serif" }}>
//           <OpenInNewIcon sx={{ fontSize:15 }}/> View
//         </a>
//         <a href={url} download style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:10, background:"#fff", color:"#4f6ef7", fontWeight:600, fontSize:".82rem", textDecoration:"none", border:"1.5px solid rgba(79,110,247,.28)", fontFamily:"'Outfit',sans-serif" }}>
//           <DownloadIcon sx={{ fontSize:15 }}/> Download
//         </a>
//       </Box>
//       {isPdf
//         ? <Box sx={{ borderRadius:12, overflow:"hidden", border:"1px solid #e8ecf5" }}><iframe src={url} style={{ width:"100%", height:360, border:"none", display:"block" }} title="report"/></Box>
//         : <Box sx={{ borderRadius:12, overflow:"hidden", border:"1px solid #e8ecf5" }}><img src={url} alt="report" style={{ width:"100%", maxHeight:400, objectFit:"contain", background:"#f0f2f8", display:"block" }}/></Box>
//       }
//     </Box>
//   );
// }

// // ─── Patient Modal ─────────────────────────────────────────────────────────────
// function PatientModal({ appt, open, onClose, onWriteRx, payments }) {
//   if (!appt) return null;
//   const p = appt.patient;
//   const isPaid = payments[appt.id]?.status === "SUCCESS";
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="patient-modal-box">
//         <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:2 }}>
//           <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
//             <Avatar className="av-blue" sx={{ width:54, height:54, borderRadius:"16px", fontSize:"1.4rem", fontWeight:700 }}>{p?.name?.charAt(0)}</Avatar>
//             <Box>
//               <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#1a1f36" }}>{p?.name}</Typography>
//               <Typography sx={{ fontSize:".78rem", color:"#8892b0" }}>Patient Record</Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={onClose} size="small" sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px" }}><CloseIcon sx={{ fontSize:16 }}/></IconButton>
//         </Box>
//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }}/>
//         <Grid container spacing={2} sx={{ mb:3 }}>
//           {[["Name",p?.name],["Age",p?.age?`${p.age} yrs`:"—"],["Gender",p?.gender],["DOB",p?.dob],["Contact",p?.contact]].map(([l,v])=>(
//             <Grid item xs={6} key={l}><div className="modal-field-label">{l}</div><div className="modal-field-value">{v||"—"}</div></Grid>
//           ))}
//         </Grid>
//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }}/>
//         <Grid container spacing={2} sx={{ mb:2 }}>
//           {[["Date",appt.date],["Time",appt.timeSlot],["Status",appt.status]].map(([l,v])=>(
//             <Grid item xs={6} key={l}><div className="modal-field-label">{l}</div><div className="modal-field-value">{v||"—"}</div></Grid>
//           ))}
//           <Grid item xs={12}><div className="modal-field-label">Symptoms</div><div className="modal-field-value">{appt.description||"—"}</div></Grid>
//         </Grid>
//         <Box sx={{ mb:3 }}>
//           {isPaid
//             ? <Chip label="✓ Payment Confirmed" size="small" sx={{ background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.25)", fontWeight:600 }}/>
//             : <Chip icon={<LockIcon sx={{ fontSize:13 }}/>} label="Payment Pending" size="small" sx={{ background:"#fff7ed", color:"#d97706", border:"1px solid #fcd34d", fontWeight:600 }}/>}
//         </Box>
//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }}/>
//         <ReportViewer filename={appt.report}/>
//         {appt.status === "APPROVED" && (
//           <Button onClick={()=>{onClose();onWriteRx(appt);}} variant="contained" fullWidth
//             startIcon={isPaid?<EditNoteIcon/>:<LockIcon/>}
//             sx={{ mt:3, background:isPaid?"linear-gradient(135deg,#059669,#34d399)":"linear-gradient(135deg,#f59e0b,#fbbf24)", borderRadius:"12px", textTransform:"none", fontWeight:700 }}>
//             {isPaid?"Write / Update Prescription":"View Prescription (Payment Pending)"}
//           </Button>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ─── Write Prescription Modal ──────────────────────────────────────────────────
// function WritePrescriptionModal({ appt, open, onClose, onSaved, payments }) {
//   const [form, setForm] = useState({ diagnosis:"", medicines:"", instructions:"", tests:"", followUpDate:"" });
//   const [saving, setSaving] = useState(false);
//   const isPaid = payments[appt?.id]?.status === "SUCCESS";

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await axios.post(`${BASE}/prescriptions/appointment/${appt.id}`, form);
//       onSaved(); onClose();
//     } catch { alert("Failed to save prescription."); } finally { setSaving(false); }
//   };

//   const fSx = { "& .MuiOutlinedInput-root":{ borderRadius:"12px", background:"#f8f9ff" }, "& .MuiOutlinedInput-notchedOutline":{ borderColor:"#e8ecf5" } };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="rx-modal-box">
//         <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:2 }}>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#1a1f36" }}>Write Prescription</Typography>
//           <IconButton onClick={onClose} size="small" sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px" }}><CloseIcon sx={{ fontSize:16 }}/></IconButton>
//         </Box>
//         {!isPaid && (
//           <Box className="pay-lock-banner" sx={{ mb:2 }}>
//             <LockIcon sx={{ color:"#d97706", fontSize:20 }}/>
//             <Typography sx={{ fontSize:".82rem", color:"#92400e", fontWeight:600 }}>Editing locked — awaiting patient payment</Typography>
//           </Box>
//         )}
//         <Divider sx={{ mb:3, borderColor:"#e8ecf5" }}/>
//         {[["Diagnosis *","diagnosis","e.g. Hypertension Stage 1",false],["Medicines","medicines","Name · Dosage · Frequency",true],["Instructions","instructions","Dietary / lifestyle notes",true],["Lab Tests","tests","e.g. CBC, LFT",true]].map(([lbl,key,ph,multi])=>(
//           <Box key={key} sx={{ mb:2 }}>
//             <div className="modal-field-label">{lbl}</div>
//             <TextField fullWidth size="small" multiline={multi} rows={multi?3:1} variant="outlined" placeholder={ph}
//               value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} disabled={!isPaid} sx={fSx}/>
//           </Box>
//         ))}
//         <Box sx={{ mb:3 }}>
//           <div className="modal-field-label">Follow-up Date</div>
//           <TextField fullWidth size="small" type="date" variant="outlined" value={form.followUpDate}
//             onChange={e=>setForm(p=>({...p,followUpDate:e.target.value}))} disabled={!isPaid} sx={fSx} InputLabelProps={{ shrink:true }}/>
//         </Box>
//         <Button variant="contained" fullWidth onClick={handleSave} disabled={saving||!isPaid}
//           sx={{ borderRadius:"12px", textTransform:"none", fontWeight:700, background:isPaid?"linear-gradient(135deg,#059669,#34d399)":"#e2e8f0", color:isPaid?"#fff":"#94a3b8" }}>
//           {saving?"Saving…":"Save Prescription"}
//         </Button>
//       </Box>
//     </Modal>
//   );
// }

// // ─── Upload Zone ───────────────────────────────────────────────────────────────
// function UploadZone({ label, field, doctorId, currentFile, onUploaded }) {
//   const inputRef = useRef();
//   const [uploading, setUploading] = useState(false);
//   const [localFile, setLocalFile] = useState(currentFile||null);
//   useEffect(()=>{ setLocalFile(currentFile||null); },[currentFile]);

//   const handleFile = async (file) => {
//     if (!file) return;
//     setUploading(true);
//     const fd = new FormData(); fd.append("file",file); fd.append("field",field);
//     try {
//       const res = await axios.post(`${BASE}/doctor-verification/doctor/${doctorId}/upload`, fd, { headers:{"Content-Type":"multipart/form-data"} });
//       setLocalFile(res.data.filename); onUploaded(field, res.data.filename);
//     } catch { alert(`Upload failed for ${label}`); } finally { setUploading(false); }
//   };

//   return (
//     <Box>
//       <div className="field-label">{label}</div>
//       <div className={`verif-upload-zone ${localFile?"has-file":""}`} onClick={()=>inputRef.current?.click()}>
//         <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display:"none" }} onChange={e=>handleFile(e.target.files[0])}/>
//         {uploading
//           ? <CircularProgress size={22} sx={{ color:"#4f6ef7" }}/>
//           : localFile
//             ? <><CheckCircleIcon sx={{ fontSize:26, color:"#059669" }}/><Typography sx={{ fontSize:".8rem", fontWeight:600, color:"#059669" }}>Uploaded ✓</Typography><Typography sx={{ fontSize:".7rem", color:"#8892b0", wordBreak:"break-all" }}>{localFile}</Typography></>
//             : <><UploadFileIcon sx={{ fontSize:28, color:"#8892b0" }}/><Typography sx={{ fontSize:".82rem", fontWeight:500, color:"#4a5278" }}>Click to upload</Typography><Typography sx={{ fontSize:".72rem", color:"#b0b8d0" }}>PDF · JPG · PNG</Typography></>
//         }
//       </div>
//     </Box>
//   );
// }

// // ─── Complete Profile View ─────────────────────────────────────────────────────
// const STEPS = [
//   { key:"identity",  label:"Identity & Registration", icon:<BadgeIcon sx={{ fontSize:15 }}/> },
//   { key:"education", label:"Education",               icon:<SchoolIcon sx={{ fontSize:15 }}/> },
//   { key:"practice",  label:"Practice",                icon:<LocalHospitalIcon sx={{ fontSize:15 }}/> },
//   { key:"documents", label:"Documents",               icon:<UploadFileIcon sx={{ fontSize:15 }}/> },
//   { key:"about",     label:"About & Submit",          icon:<SendIcon sx={{ fontSize:15 }}/> },
// ];

// const EMPTY_FORM = {
//   fullLegalName:"", dateOfBirth:"", gender:"", nationality:"India",
//   aadhaarNumber:"", aadhaarMobile:"",
//   medicalRegistrationNumber:"", medicalCouncil:"", registrationDate:"", registrationExpiry:"", registrationType:"",
//   idProofType:"", idProofNumber:"",
//   degreeName:"", degreeInstitution:"", degreeUniversity:"", degreePassingYear:"", internshipYear:"",
//   pgDegree:"", pgInstitution:"", pgPassingYear:"",
//   superSpecialization:"", areasOfExpertise:"", totalExperienceYears:"",
//   currentHospitalName:"", currentHospitalAddress:"", clinicName:"", clinicAddress:"",
//   clinicCity:"", clinicState:"", clinicPincode:"",
//   languagesSpoken:"", consultationDays:"", consultationTimings:"",
//   aboutMe:"",
//   medicalCertificateFile:"", degreeFile:"", pgDegreeFile:"", aadhaarFile:"", idProofFile:"", photoFile:"",
// };

// function InfoNote({ text }) {
//   return (
//     <Box sx={{ display:"flex", alignItems:"flex-start", gap:1, p:1.5, borderRadius:"10px", background:"#f0f4ff", border:"1px solid rgba(79,110,247,.15)", mb:2.5 }}>
//       <Typography sx={{ fontSize:".95rem", lineHeight:1, mt:.1 }}>ℹ️</Typography>
//       <Typography sx={{ fontSize:".78rem", color:"#4a5278", lineHeight:1.5 }}>{text}</Typography>
//     </Box>
//   );
// }

// function SHead({ color="#4f6ef7", children }) {
//   return (
//     <Box sx={{ display:"flex", alignItems:"center", gap:1, mb:1.5, mt:.5 }}>
//       <Box sx={{ width:3, height:14, borderRadius:2, background:color, flexShrink:0 }}/>
//       <Typography sx={{ fontSize:".72rem", fontWeight:700, color, textTransform:"uppercase", letterSpacing:"1.1px" }}>{children}</Typography>
//     </Box>
//   );
// }

// function CompleteProfileView({ doctor, verification, onVerificationChange }) {
//   const [step,   setStep]   = useState(0);
//   const [form,   setForm]   = useState(EMPTY_FORM);
//   const [saving, setSaving] = useState(false);
//   const status = verification?.status || "INCOMPLETE";
//   const locked = status === "PENDING" || status === "APPROVED";

//   useEffect(()=>{
//     if (verification) setForm(prev=>({...prev,...Object.fromEntries(Object.keys(EMPTY_FORM).map(k=>[k,verification[k]||""]))}));
//   },[verification]);

//   const f   = k => form[k];
//   const s   = (k,v) => setForm(p=>({...p,[k]:v}));
//   const fSx = { "& .MuiOutlinedInput-root":{ borderRadius:"12px !important", background:"#f8f9ff !important" }, "& .MuiOutlinedInput-notchedOutline":{ borderColor:"#e8ecf5 !important" } };
//   const FL  = ({ children }) => <div className="field-label">{children}</div>;

//   const handleSave = async () => {
//     setSaving(true);
//     try { const res = await axios.post(`${BASE}/doctor-verification/doctor/${doctor.id}`, form); onVerificationChange(res.data); }
//     catch { alert("Save failed."); } finally { setSaving(false); }
//   };
//   const handleSubmit = async () => {
//     await handleSave();
//     try { const res = await axios.post(`${BASE}/doctor-verification/doctor/${doctor.id}/submit`); onVerificationChange(res.data); }
//     catch { alert("Submission failed."); }
//   };

//   const checklist = [
//     ["Full Legal Name",                 !!f("fullLegalName")],
//     ["Date of Birth",                   !!f("dateOfBirth")],
//     ["Aadhaar Number",                  !!f("aadhaarNumber")],
//     ["NMC/MCI Registration Number",     !!f("medicalRegistrationNumber")],
//     ["Issuing Medical Council",         !!f("medicalCouncil")],
//     ["Registration Valid Dates",        !!(f("registrationDate")&&f("registrationExpiry"))],
//     ["Primary Degree",                  !!f("degreeName")],
//     ["Degree Institution",              !!f("degreeInstitution")],
//     ["Years of Experience",             !!f("totalExperienceYears")],
//     ["Hospital / Clinic Name",          !!f("currentHospitalName")],
//     ["Aadhaar Card Upload",             !!f("aadhaarFile")],
//     ["Registration Certificate Upload", !!f("medicalCertificateFile")],
//     ["Degree Certificate Upload",       !!f("degreeFile")],
//     ["Professional Photo Upload",       !!f("photoFile")],
//   ];
//   const done  = checklist.filter(([,d])=>d).length;
//   const allOk = done === checklist.length;

//   const StatusBanner = () => {
//     const cfg = {
//       INCOMPLETE:{ cls:"incomplete", Icon:BadgeIcon,        iconColor:"#4f6ef7", title:"Profile Incomplete",   sub:"Fill all sections and submit for admin review. Until approved your profile will be shown as pending to patients." },
//       PENDING:   { cls:"pending",    Icon:HourglassTopIcon, iconColor:"#d97706", title:"Under Admin Review",   sub:"Submitted and being reviewed by the MedVault admin team against NMC records. You'll be notified once approved." },
//       APPROVED:  { cls:"approved",   Icon:VerifiedIcon,     iconColor:"#059669", title:"Profile Verified ✓",   sub:"Your credentials are verified. You can now receive and manage patient appointments on MedVault." },
//       REJECTED:  { cls:"rejected",   Icon:ErrorOutlineIcon, iconColor:"#e11d48", title:"Verification Rejected",sub: verification?.adminRemarks||"Please update your details and resubmit." },
//     };
//     const c = cfg[status]||cfg.INCOMPLETE;
//     return (
//       <div className={`verif-status-banner ${c.cls}`}>
//         <c.Icon sx={{ fontSize:28, color:c.iconColor, flexShrink:0, mt:.2 }}/>
//         <Box sx={{ flex:1 }}>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontWeight:700, color:"#1a1f36" }}>{c.title}</Typography>
//           <Typography sx={{ fontSize:".83rem", color:"#4a5278", mt:.4 }}>{c.sub}</Typography>
//           {status==="INCOMPLETE" && (
//             <Box sx={{ mt:1.5 }}>
//               <Box sx={{ display:"flex", justifyContent:"space-between", mb:.6 }}>
//                 <Typography sx={{ fontSize:".72rem", color:"#8892b0", fontWeight:600 }}>Completion</Typography>
//                 <Typography sx={{ fontSize:".72rem", color:"#4f6ef7", fontWeight:700 }}>{done}/{checklist.length} required</Typography>
//               </Box>
//               <Box sx={{ height:7, borderRadius:99, background:"#e8ecf5", overflow:"hidden" }}>
//                 <Box sx={{ height:"100%", borderRadius:99, background:`linear-gradient(90deg,${allOk?"#059669,#34d399":"#4f6ef7,#7c3aed"})`, width:`${(done/checklist.length)*100}%`, transition:"width .4s" }}/>
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </div>
//     );
//   };

//   return (
//     <Box className="fu">
//       <Box sx={{ mb:4 }}>
//         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Complete Your Profile</Typography>
//         <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Submit credentials for admin verification to become a trusted MedVault doctor</Typography>
//       </Box>

//       <StatusBanner/>

//       {/* Step bar */}
//       <Box className="verif-step-bar">
//         {STEPS.map((st,i)=>(
//           <Box key={st.key} sx={{ display:"flex", alignItems:"center", flex: i<STEPS.length-1?"1":"0 0 auto" }}>
//             <div className={`verif-step-pill ${i<step?"done":i===step?"active":"waiting"}`} onClick={()=>!locked&&setStep(i)}>
//               {i<step?<CheckIcon sx={{ fontSize:13 }}/>:st.icon}
//               {st.label}
//             </div>
//             {i<STEPS.length-1 && <div className="verif-step-connector"/>}
//           </Box>
//         ))}
//       </Box>

//       <Card className="doc-card" sx={{ p:{ xs:2.5, md:4 }, mb:3 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={step} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:.2 }}>

//             {/* ── STEP 0: Identity & Registration ── */}
//             {step===0 && (
//               <Box>
//                 <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#1a1f36", mb:.5 }}>Identity & Medical Registration</Typography>
//                 <Typography sx={{ fontSize:".82rem", color:"#8892b0", mb:3 }}>This information is cross-verified against NMC/MCI records and government ID databases.</Typography>

//                 <SHead color="#4f6ef7">Personal Identity</SHead>
//                 <InfoNote text="Enter your name exactly as it appears on your Aadhaar card and medical registration certificate. Mismatches will cause rejection."/>
//                 <Grid container spacing={2.5} sx={{ mb:3 }}>
//                   <Grid item xs={12} sm={6}><FL>Full Legal Name (as on Aadhaar) *</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="e.g. Dr. Rajesh Kumar Sharma" value={f("fullLegalName")} onChange={e=>s("fullLegalName",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={3}><FL>Date of Birth *</FL><TextField fullWidth size="small" type="date" variant="outlined" disabled={locked} value={f("dateOfBirth")} onChange={e=>s("dateOfBirth",e.target.value)} sx={fSx} InputLabelProps={{ shrink:true }}/></Grid>
//                   <Grid item xs={12} sm={3}><FL>Gender *</FL>
//                     <TextField fullWidth size="small" select variant="outlined" disabled={locked} value={f("gender")} onChange={e=>s("gender",e.target.value)} sx={fSx} SelectProps={{ native:true }}>
//                       <option value="">Select…</option>
//                       {["Male","Female","Other","Prefer not to say"].map(v=><option key={v} value={v}>{v}</option>)}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12} sm={4}><FL>Nationality</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} value={f("nationality")} onChange={e=>s("nationality",e.target.value)} sx={fSx}/></Grid>
//                 </Grid>

//                 <Divider sx={{ mb:2.5, borderColor:"#e8ecf5" }}/>
//                 <SHead color="#7c3aed">Aadhaar Verification (Mandatory)</SHead>
//                 <InfoNote text="Aadhaar is mandatory for all practicing doctors in India under NMC regulations. Your 12-digit number is verified against UIDAI records by our admin team."/>
//                 <Grid container spacing={2.5} sx={{ mb:3 }}>
//                   <Grid item xs={12} sm={6}><FL>Aadhaar Number *</FL>
//                     <TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="XXXX XXXX XXXX" inputProps={{ maxLength:14 }}
//                       value={f("aadhaarNumber")} onChange={e=>{ const raw=e.target.value.replace(/\D/g,"").slice(0,12); s("aadhaarNumber",raw.replace(/(\d{4})(?=\d)/g,"$1 ")); }} sx={fSx}/>
//                     <Typography sx={{ fontSize:".7rem", color:"#8892b0", mt:.5 }}>12-digit unique identification number</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={4}><FL>Aadhaar Registered Mobile (last 4 digits)</FL>
//                     <TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="e.g. 7890" inputProps={{ maxLength:4 }}
//                       value={f("aadhaarMobile")} onChange={e=>s("aadhaarMobile",e.target.value.replace(/\D/g,"").slice(0,4))} sx={fSx}/>
//                     <Typography sx={{ fontSize:".7rem", color:"#8892b0", mt:.5 }}>For admin verification only — not shared</Typography>
//                   </Grid>
//                 </Grid>

//                 <Divider sx={{ mb:2.5, borderColor:"#e8ecf5" }}/>
//                 <SHead color="#059669">NMC / State Council Registration</SHead>
//                 <InfoNote text="Your NMC or State Medical Council registration number is publicly verifiable. Admins will cross-check at nmc.org.in."/>
//                 <Grid container spacing={2.5} sx={{ mb:3 }}>
//                   <Grid item xs={12} sm={5}><FL>Registration Number *</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="e.g. MH/123456/2010" value={f("medicalRegistrationNumber")} onChange={e=>s("medicalRegistrationNumber",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={7}><FL>Issuing Medical Council *</FL>
//                     <TextField fullWidth size="small" select variant="outlined" disabled={locked} value={f("medicalCouncil")} onChange={e=>s("medicalCouncil",e.target.value)} sx={fSx} SelectProps={{ native:true }}>
//                       <option value="">Select council…</option>
//                       <option value="National Medical Commission (NMC)">National Medical Commission (NMC)</option>
//                       <optgroup label="State Councils">
//                         {["Andhra Pradesh MC","Delhi MC","Gujarat MC","Karnataka MC","Kerala MC","Maharashtra MC","Telangana State MC","Tamil Nadu MC","UP MC","West Bengal MC"].map(v=><option key={v} value={v}>{v}</option>)}
//                       </optgroup>
//                       <option value="Other">Other</option>
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12} sm={4}><FL>Registration Date *</FL><TextField fullWidth size="small" type="date" disabled={locked} variant="outlined" value={f("registrationDate")} onChange={e=>s("registrationDate",e.target.value)} sx={fSx} InputLabelProps={{ shrink:true }}/></Grid>
//                   <Grid item xs={12} sm={4}><FL>Valid Until (Renewal Date) *</FL><TextField fullWidth size="small" type="date" disabled={locked} variant="outlined" value={f("registrationExpiry")} onChange={e=>s("registrationExpiry",e.target.value)} sx={fSx} InputLabelProps={{ shrink:true }}/></Grid>
//                   <Grid item xs={12} sm={4}><FL>Registration Type</FL>
//                     <TextField fullWidth size="small" select variant="outlined" disabled={locked} value={f("registrationType")} onChange={e=>s("registrationType",e.target.value)} sx={fSx} SelectProps={{ native:true }}>
//                       <option value="">Select…</option>
//                       {["Allopathy (MBBS)","Ayurveda (BAMS)","Homeopathy (BHMS)","Dentistry (BDS)","Naturopathy (BNYS)"].map(v=><option key={v} value={v}>{v}</option>)}
//                     </TextField>
//                   </Grid>
//                 </Grid>

//                 <Divider sx={{ mb:2.5, borderColor:"#e8ecf5" }}/>
//                 <SHead color="#d97706">Secondary Government ID</SHead>
//                 <Grid container spacing={2.5}>
//                   <Grid item xs={12} sm={5}><FL>ID Proof Type *</FL>
//                     <TextField fullWidth size="small" select variant="outlined" disabled={locked} value={f("idProofType")} onChange={e=>s("idProofType",e.target.value)} sx={fSx} SelectProps={{ native:true }}>
//                       <option value="">Select…</option>
//                       {["Passport","PAN Card","Voter ID","Driving Licence"].map(v=><option key={v} value={v}>{v}</option>)}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12} sm={7}><FL>ID Number *</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="ID number" value={f("idProofNumber")} onChange={e=>s("idProofNumber",e.target.value.toUpperCase())} sx={fSx}/></Grid>
//                 </Grid>
//               </Box>
//             )}

//             {/* ── STEP 1: Education ── */}
//             {step===1 && (
//               <Box>
//                 <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#1a1f36", mb:.5 }}>Education & Qualifications</Typography>
//                 <Typography sx={{ fontSize:".82rem", color:"#8892b0", mb:3 }}>Provide details exactly as printed on your degree certificates.</Typography>

//                 <SHead color="#4f6ef7">Primary Medical Degree</SHead>
//                 <Grid container spacing={2.5} sx={{ mb:3 }}>
//                   <Grid item xs={12} sm={4}><FL>Degree Name *</FL>
//                     <TextField fullWidth size="small" select variant="outlined" disabled={locked} value={f("degreeName")} onChange={e=>s("degreeName",e.target.value)} sx={fSx} SelectProps={{ native:true }}>
//                       <option value="">Select…</option>
//                       {["MBBS","BDS","BAMS","BHMS","BNYS","BSMS","BVSc"].map(v=><option key={v} value={v}>{v}</option>)}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12} sm={5}><FL>Medical College / Institution *</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="e.g. AIIMS New Delhi" value={f("degreeInstitution")} onChange={e=>s("degreeInstitution",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={3}><FL>Passing Year *</FL><TextField fullWidth size="small" type="number" variant="outlined" disabled={locked} placeholder="2010" inputProps={{ min:1970, max:new Date().getFullYear() }} value={f("degreePassingYear")} onChange={e=>s("degreePassingYear",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={9}><FL>Affiliated University</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="e.g. University of Delhi" value={f("degreeUniversity")} onChange={e=>s("degreeUniversity",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={3}><FL>Internship Completion Year</FL><TextField fullWidth size="small" type="number" variant="outlined" disabled={locked} placeholder="2011" value={f("internshipYear")} onChange={e=>s("internshipYear",e.target.value)} sx={fSx}/></Grid>
//                 </Grid>

//                 <Divider sx={{ mb:2.5, borderColor:"#e8ecf5" }}/>
//                 <SHead color="#7c3aed">Post-Graduation (Optional)</SHead>
//                 <Grid container spacing={2.5} sx={{ mb:3 }}>
//                   <Grid item xs={12} sm={3}><FL>PG Degree</FL>
//                     <TextField fullWidth size="small" select variant="outlined" disabled={locked} value={f("pgDegree")} onChange={e=>s("pgDegree",e.target.value)} sx={fSx} SelectProps={{ native:true }}>
//                       <option value="">None</option>
//                       {["MD","MS","DNB","MCh","DM","MDS","Diploma"].map(v=><option key={v} value={v}>{v}</option>)}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={12} sm={6}><FL>PG Institution</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="e.g. PGI Chandigarh" value={f("pgInstitution")} onChange={e=>s("pgInstitution",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={3}><FL>Passing Year</FL><TextField fullWidth size="small" type="number" variant="outlined" disabled={locked} placeholder="2015" value={f("pgPassingYear")} onChange={e=>s("pgPassingYear",e.target.value)} sx={fSx}/></Grid>
//                 </Grid>

//                 <Divider sx={{ mb:2.5, borderColor:"#e8ecf5" }}/>
//                 <SHead color="#059669">Specialization & Experience</SHead>
//                 <Grid container spacing={2.5}>
//                   <Grid item xs={12} sm={4}><FL>Super Specialization</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="e.g. Interventional Cardiology" value={f("superSpecialization")} onChange={e=>s("superSpecialization",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={5}><FL>Areas of Expertise</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="Diabetes, Hypertension, Thyroid…" value={f("areasOfExpertise")} onChange={e=>s("areasOfExpertise",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={3}><FL>Total Experience (years) *</FL><TextField fullWidth size="small" type="number" variant="outlined" disabled={locked} placeholder="12" value={f("totalExperienceYears")} onChange={e=>s("totalExperienceYears",e.target.value)} sx={fSx}/></Grid>
//                 </Grid>
//               </Box>
//             )}

//             {/* ── STEP 2: Practice ── */}
//             {step===2 && (
//               <Box>
//                 <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#1a1f36", mb:.5 }}>Current Practice Details</Typography>
//                 <Typography sx={{ fontSize:".82rem", color:"#8892b0", mb:3 }}>Where you currently practice — admin will verify address against registration.</Typography>

//                 <SHead color="#4f6ef7">Hospital / Clinic</SHead>
//                 <Grid container spacing={2.5} sx={{ mb:3 }}>
//                   <Grid item xs={12} sm={5}><FL>Current Hospital Name *</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="City General Hospital" value={f("currentHospitalName")} onChange={e=>s("currentHospitalName",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={7}><FL>Hospital Address</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="Street / Area" value={f("currentHospitalAddress")} onChange={e=>s("currentHospitalAddress",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={5}><FL>Private Clinic Name</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="Dr. Sharma's Clinic" value={f("clinicName")} onChange={e=>s("clinicName",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={7}><FL>Clinic Address</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} value={f("clinicAddress")} onChange={e=>s("clinicAddress",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={4}><FL>City</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} value={f("clinicCity")} onChange={e=>s("clinicCity",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={4}><FL>State</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} value={f("clinicState")} onChange={e=>s("clinicState",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={4}><FL>Pincode</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} inputProps={{ maxLength:6 }} value={f("clinicPincode")} onChange={e=>s("clinicPincode",e.target.value.replace(/\D/g,"").slice(0,6))} sx={fSx}/></Grid>
//                 </Grid>

//                 <Divider sx={{ mb:2.5, borderColor:"#e8ecf5" }}/>
//                 <SHead color="#059669">Availability</SHead>
//                 <Grid container spacing={2.5}>
//                   <Grid item xs={12} sm={5}><FL>Languages Spoken</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="English, Hindi, Telugu" value={f("languagesSpoken")} onChange={e=>s("languagesSpoken",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={4}><FL>Consultation Days</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="Mon–Fri" value={f("consultationDays")} onChange={e=>s("consultationDays",e.target.value)} sx={fSx}/></Grid>
//                   <Grid item xs={12} sm={3}><FL>Timings</FL><TextField fullWidth size="small" variant="outlined" disabled={locked} placeholder="09:00–13:00" value={f("consultationTimings")} onChange={e=>s("consultationTimings",e.target.value)} sx={fSx}/></Grid>
//                 </Grid>
//               </Box>
//             )}

//             {/* ── STEP 3: Documents ── */}
//             {step===3 && (
//               <Box>
//                 <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#1a1f36", mb:.5 }}>Upload Documents</Typography>
//                 <Typography sx={{ fontSize:".82rem", color:"#8892b0", mb:1 }}>All documents are stored securely and reviewed only by MedVault admins.</Typography>
//                 <InfoNote text="Required: Aadhaar Card, Medical Registration Certificate, and Degree Certificate. Admin will physically verify each document against the details you entered."/>
//                 {locked ? (
//                   <Box sx={{ background:"#f5f7ff", borderRadius:"14px", p:3, textAlign:"center", border:"1px solid #e8ecf5" }}>
//                     <Typography sx={{ color:"#8892b0", fontSize:".88rem" }}>Documents submitted. Editing is disabled while under review or after approval.</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     <Grid item xs={12} sm={6}><UploadZone label="Aadhaar Card *" field="aadhaarFile" doctorId={doctor.id} currentFile={f("aadhaarFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid>
//                     <Grid item xs={12} sm={6}><UploadZone label="Medical Registration Certificate *" field="medicalCertificateFile" doctorId={doctor.id} currentFile={f("medicalCertificateFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid>
//                     <Grid item xs={12} sm={6}><UploadZone label="MBBS / Primary Degree Certificate *" field="degreeFile" doctorId={doctor.id} currentFile={f("degreeFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid>
//                     <Grid item xs={12} sm={6}><UploadZone label="PG Degree Certificate (Optional)" field="pgDegreeFile" doctorId={doctor.id} currentFile={f("pgDegreeFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid>
//                     <Grid item xs={12} sm={6}><UploadZone label="Secondary ID Proof (Passport/PAN etc.)" field="idProofFile" doctorId={doctor.id} currentFile={f("idProofFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid>
//                     <Grid item xs={12} sm={6}><UploadZone label="Professional Photo *" field="photoFile" doctorId={doctor.id} currentFile={f("photoFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid>
//                   </Grid>
//                 )}
//               </Box>
//             )}

//             {/* ── STEP 4: About & Submit ── */}
//             {step===4 && (
//               <Box>
//                 <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#1a1f36", mb:3 }}>About You & Submit</Typography>
//                 <div className="field-label">Professional Bio</div>
//                 <TextField fullWidth multiline rows={5} variant="outlined" disabled={locked}
//                   placeholder="Describe your approach to medicine, areas of focus, and patient philosophy…"
//                   value={f("aboutMe")} onChange={e=>s("aboutMe",e.target.value)}
//                   sx={{ ...fSx, mb:3, "& .MuiOutlinedInput-root":{ borderRadius:"12px", background:"#f8f9ff" }, "& .MuiOutlinedInput-notchedOutline":{ borderColor:"#e8ecf5" } }}/>

//                 <Box sx={{ background:"#f5f7ff", borderRadius:"14px", p:3, border:"1px solid #e8ecf5" }}>
//                   <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mb:2 }}>
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:700, color:"#1a1f36" }}>Submission Checklist</Typography>
//                     <Chip label={`${done}/${checklist.length} complete`} size="small"
//                       sx={{ background:allOk?"#ecfdf5":"#fff7ed", color:allOk?"#059669":"#d97706", fontWeight:700, border:`1px solid ${allOk?"rgba(5,150,105,.25)":"#fcd34d"}` }}/>
//                   </Box>
//                   <Grid container spacing={1}>
//                     {checklist.map(([item, isDone])=>(
//                       <Grid item xs={12} sm={6} key={item}>
//                         <Box sx={{ display:"flex", alignItems:"center", gap:1.2 }}>
//                           <Box sx={{ width:18, height:18, borderRadius:"50%", flexShrink:0, background:isDone?"#ecfdf5":"#fff1f2", border:`1.5px solid ${isDone?"rgba(5,150,105,.4)":"rgba(225,29,72,.2)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
//                             {isDone ? <CheckIcon sx={{ fontSize:11, color:"#059669" }}/> : <CloseIcon sx={{ fontSize:10, color:"#fca5a5" }}/>}
//                           </Box>
//                           <Typography sx={{ fontSize:".8rem", color:isDone?"#059669":"#8892b0", fontWeight:isDone?600:400 }}>{item}</Typography>
//                         </Box>
//                       </Grid>
//                     ))}
//                   </Grid>
//                   {!allOk && <Box sx={{ mt:2, p:1.5, borderRadius:"10px", background:"#fff7ed", border:"1px solid #fcd34d" }}>
//                     <Typography sx={{ fontSize:".78rem", color:"#92400e", fontWeight:600 }}>⚠ Complete all required fields before submitting.</Typography>
//                   </Box>}
//                 </Box>
//               </Box>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </Card>

//       {/* Navigation buttons */}
//       <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:2, flexWrap:"wrap" }}>
//         <Box sx={{ display:"flex", gap:1.5 }}>
//           {step>0 && <Button variant="outlined" startIcon={<ChevronLeftIcon/>} onClick={()=>setStep(s=>s-1)}
//             sx={{ borderRadius:"12px", textTransform:"none", fontWeight:600, borderColor:"#e8ecf5", color:"#4a5278", "&:hover":{ borderColor:"#4f6ef7", color:"#4f6ef7" } }}>Back</Button>}
//           {!locked && <Button variant="outlined" onClick={handleSave} disabled={saving}
//             sx={{ borderRadius:"12px", textTransform:"none", fontWeight:600, borderColor:"rgba(79,110,247,.3)", color:"#4f6ef7", "&:hover":{ background:"#eef1fe" } }}>
//             {saving?"Saving…":"Save Progress"}
//           </Button>}
//         </Box>
//         <Box sx={{ display:"flex", gap:1.5 }}>
//           {step<STEPS.length-1 && <Button variant="contained" endIcon={<ChevronRightIcon/>}
//             onClick={async()=>{ await handleSave(); setStep(s=>s+1); }} disabled={saving||locked}
//             sx={{ borderRadius:"12px", textTransform:"none", fontWeight:700, background:"linear-gradient(135deg,#4f6ef7,#7c3aed)", boxShadow:"0 4px 14px rgba(79,110,247,.3)" }}>
//             Save & Next
//           </Button>}
//           {step===STEPS.length-1 && !locked && <Button variant="contained" endIcon={<SendIcon/>} onClick={handleSubmit}
//             disabled={saving||!allOk}
//             sx={{ borderRadius:"12px", textTransform:"none", fontWeight:700, px:3,
//               background:allOk?"linear-gradient(135deg,#059669,#34d399)":"#e2e8f0",
//               color:allOk?"#fff":"#94a3b8", boxShadow:allOk?"0 4px 14px rgba(5,150,105,.3)":"none" }}>
//             {saving?"Submitting…":"Submit for Review"}
//           </Button>}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// // ─── Verification Gate ─────────────────────────────────────────────────────────
// function VerificationGate({ status, remarks, onGoToProfile }) {
//   const cfg = {
//     INCOMPLETE:{
//       icon:"🔒", title:"Complete Your Profile First",
//       sub:"You must submit your credentials for admin verification before you can receive patient appointments on MedVault.",
//       btnLabel:"Complete My Profile →", btnBg:"linear-gradient(135deg,#d97706,#f59e0b)", shadowColor:"rgba(217,119,6,.3)",
//       bg:"linear-gradient(135deg,#fffbeb,#fef9ee)", border:"#fcd34d",
//     },
//     PENDING:{
//       icon:"⏳", title:"Verification Under Review",
//       sub:"Your profile has been submitted and is being reviewed by the MedVault admin team against NMC records. Patient access will be enabled automatically once approved.",
//       btnLabel:"View Submission Status", btnBg:"linear-gradient(135deg,#3b82f6,#60a5fa)", shadowColor:"rgba(59,130,246,.3)",
//       bg:"linear-gradient(135deg,#eff6ff,#dbeafe)", border:"rgba(59,130,246,.3)",
//     },
//     REJECTED:{
//       icon:"❌", title:"Verification Rejected",
//       sub:`Your verification was rejected. Admin remarks: "${remarks||"Please update your credentials and resubmit."}". Fix the issues and resubmit to regain patient access.`,
//       btnLabel:"Update & Resubmit →", btnBg:"linear-gradient(135deg,#e11d48,#f43f5e)", shadowColor:"rgba(225,29,72,.3)",
//       bg:"linear-gradient(135deg,#fff1f2,#ffe4e6)", border:"rgba(225,29,72,.25)",
//     },
//   };
//   const c = cfg[status]||cfg.INCOMPLETE;
//   const steps = [
//     { label:"Profile Submitted",   done: status!=="INCOMPLETE" },
//     { label:"Admin Verification",  done: false },
//     { label:"Patient Access Live", done: false },
//   ];
//   return (
//     <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"60vh", textAlign:"center", px:3 }}>
//       <Box sx={{ width:120, height:120, borderRadius:"50%", background:c.bg, border:`2px solid ${c.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"3.2rem", mb:3, boxShadow:`0 12px 40px ${c.border}` }}>
//         {c.icon}
//       </Box>
//       <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.9rem", fontWeight:700, color:"#1a1f36", mb:1 }}>{c.title}</Typography>
//       <Typography sx={{ fontSize:".88rem", color:"#4a5278", maxWidth:520, lineHeight:1.7, mb:3 }}>{c.sub}</Typography>

//       {/* Flow steps */}
//       <Box sx={{ display:"flex", gap:1.5, mb:4, flexWrap:"wrap", justifyContent:"center" }}>
//         {steps.map(({ label, done })=>(
//           <Box key={label} sx={{ display:"flex", alignItems:"center", gap:.8, px:1.5, py:.7, borderRadius:"99px",
//             background:done?"#ecfdf5":status==="PENDING"&&label==="Profile Submitted"?"#ecfdf5":"#f1f5f9",
//             border:`1px solid ${done||status==="PENDING"&&label==="Profile Submitted"?"rgba(5,150,105,.25)":"#e2e8f0"}` }}>
//             <Box sx={{ width:16, height:16, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
//               background:done||status==="PENDING"&&label==="Profile Submitted"?"#059669":"#cbd5e1" }}>
//               {done||status==="PENDING"&&label==="Profile Submitted"
//                 ? <CheckIcon sx={{ fontSize:10, color:"#fff" }}/>
//                 : <LockIcon  sx={{ fontSize:9,  color:"#fff" }}/>}
//             </Box>
//             <Typography sx={{ fontSize:".75rem", fontWeight:600, color:done?"#059669":"#64748b" }}>{label}</Typography>
//           </Box>
//         ))}
//       </Box>

//       <Button variant="contained" onClick={onGoToProfile}
//         sx={{ borderRadius:"14px", textTransform:"none", fontWeight:700, px:4, py:1.4, fontSize:".92rem", background:c.btnBg, boxShadow:`0 6px 20px ${c.shadowColor}` }}>
//         {c.btnLabel}
//       </Button>
//       {status==="PENDING" && <Typography sx={{ mt:2, fontSize:".75rem", color:"#94a3b8" }}>Typical review time: 1–2 business days</Typography>}
//     </Box>
//   );
// }

// // ─── Main DoctorDashboard ──────────────────────────────────────────────────────
// export default function DoctorDashboard() {
//   const { user } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [doctor,        setDoctor]        = useState(null);
//   const [appointments,  setAppointments]  = useState([]);
//   const [prescriptions, setPrescriptions] = useState({});
//   const [payments,      setPayments]      = useState({});
//   const [verification,  setVerification]  = useState(null);
//   const [loading,       setLoading]       = useState(true);
//   const [profileMissing,setProfileMissing]= useState(false);
//   const [sidebarOpen,   setSidebarOpen]   = useState(false);
//   const [view,          setView]          = useState("dashboard");
//   const [selectedAppt,  setSelectedAppt]  = useState(null);
//   const [rxAppt,        setRxAppt]        = useState(null);

//   useEffect(()=>{
//     const fetchData = async () => {
//       let doc;
//       try {
//         const r = await axios.get(`${BASE}/doctor/user/${userId}`);
//         if (!r.data?.id) { setProfileMissing(true); setLoading(false); return; }
//         doc = r.data; setDoctor(doc);
//       } catch(err) {
//         if (err.response?.status===404) setProfileMissing(true);
//         setLoading(false); return;
//       }
//       let appts = [];
//       try { const r = await axios.get(`${BASE}/appointments/doctor/${doc.id}`); appts=r.data; setAppointments(appts); } catch {}
//       try { const r = await axios.get(`${BASE}/prescriptions/doctor/${doc.id}`); const m={}; r.data.forEach(rx=>{m[rx.appointment?.id]=rx;}); setPrescriptions(m); } catch {}
//       try {
//         const ids = appts.filter(a=>a.status==="APPROVED").map(a=>a.id);
//         const pm = {};
//         await Promise.all(ids.map(async id=>{ try{ const r=await axios.get(`${BASE}/payments/appointment/${id}`); if(r.data) pm[id]=r.data; }catch{} }));
//         setPayments(pm);
//       } catch {}
//       try { const r = await axios.get(`${BASE}/doctor-verification/doctor/${doc.id}`); setVerification(r.data); } catch {}
//       setLoading(false);
//     };
//     if (userId) fetchData();
//   },[userId]);

//   const acceptAppointment = async id => { await axios.put(`${BASE}/appointments/${id}/approve`); setAppointments(p=>p.map(a=>a.id===id?{...a,status:"APPROVED"}:a)); };
//   const rejectAppointment = async id => { await axios.put(`${BASE}/appointments/${id}/reject`);  setAppointments(p=>p.filter(a=>a.id!==id)); };
//   const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };
//   const handleNavClick = key => { setView(key); setSidebarOpen(false); };
//   const handleRxSaved = () => { axios.get(`${BASE}/prescriptions/doctor/${doctor.id}`).then(r=>{const m={};r.data.forEach(rx=>{m[rx.appointment?.id]=rx;});setPrescriptions(m);}).catch(()=>{}); };

//   if (profileMissing) return <DoctorProfileForm userId={userId} onCreated={doc=>{ setDoctor(doc); setProfileMissing(false); }}/>;
//   if (loading) return <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}><CircularProgress sx={{ color:"#4f6ef7" }}/></Box>;

//   const pending       = appointments.filter(a=>a.status==="PENDING");
//   const approved      = appointments.filter(a=>a.status==="APPROVED");
//   const uniquePatients= new Set(approved.map(a=>a.patient?.id)).size;
//   const verifStatus   = verification?.status || "INCOMPLETE";
//   const isApproved    = verifStatus === "APPROVED";
//   const verifBadge    = { INCOMPLETE:"#f59e0b", PENDING:"#3b82f6", APPROVED:"#059669", REJECTED:"#e11d48" }[verifStatus];

//   // Patient-facing views that require APPROVED status
//   const PATIENT_VIEWS = ["pending","approved","records","prescriptions"];
//   const isPatientView = PATIENT_VIEWS.includes(view);

//   const menuItems = [
//     { key:"dashboard",       label:"Dashboard",             icon:<DashboardIcon     sx={{ fontSize:18 }}/> },
//     { key:"pending",         label:"Pending Requests",      icon:<EventIcon         sx={{ fontSize:18 }}/>, locked:!isApproved },
//     { key:"approved",        label:"Approved Appointments", icon:<CheckCircleIcon   sx={{ fontSize:18 }}/>, locked:!isApproved },
//     { key:"records",         label:"Patient Records",       icon:<FolderSharedIcon  sx={{ fontSize:18 }}/>, locked:!isApproved },
//     { key:"prescriptions",   label:"Prescriptions",         icon:<LocalPharmacyIcon sx={{ fontSize:18 }}/>, locked:!isApproved },
//     { key:"profile",         label:"My Profile",            icon:<PersonIcon        sx={{ fontSize:18 }}/> },
//     { key:"complete-profile",label:"Get Verified",          icon:<BadgeIcon         sx={{ fontSize:18 }}/>, badge:verifBadge },
//   ];

//   return (
//     <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
//       <div className="doc-blob doc-blob-1"/>
//       <div className="doc-blob doc-blob-2"/>
//       {sidebarOpen && <div className="doc-overlay" onClick={()=>setSidebarOpen(false)}/>}

//       {/* Sidebar */}
//       <div className={`doc-sidebar ${sidebarOpen?"open":"closed"}`}>
//         <div className="doc-sidebar-top">
//           <div className="doc-logo"><div className="doc-logo-icon">✦</div>Med<span className="doc-logo-accent">Vault</span></div>
//           <div className="doc-close-btn" onClick={()=>setSidebarOpen(false)}><CloseIcon sx={{ fontSize:16 }}/></div>
//         </div>
//         <div className="doc-nav-label">Navigation</div>
//         {menuItems.map(item=>(
//           <NavItem key={item.key} icon={item.icon} label={item.label} active={view===item.key}
//             onClick={()=>handleNavClick(item.key)} badge={item.badge} locked={item.locked}/>
//         ))}
//         <div className="doc-sidebar-spacer"/>
//         <div className="doc-user-card">
//           <div className="doc-user-av">{doctor?.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>Dr. {doctor?.name}</Typography>
//             <Typography sx={{ fontSize:".72rem", color:"#8892b0" }}>{doctor?.specialization}</Typography>
//           </Box>
//         </div>
//         <button onClick={handleLogout}
//           style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11, cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48", border:"1px solid transparent", background:"none", width:"100%", fontFamily:"'Outfit',sans-serif" }}
//           onMouseEnter={e=>{e.currentTarget.style.background="#fff1f3";}} onMouseLeave={e=>{e.currentTarget.style.background="none";}}>
//           <div className="doc-nav-icon" style={{ background:"#fff1f3", color:"#e11d48" }}><LogoutIcon sx={{ fontSize:16 }}/></div>Sign Out
//         </button>
//       </div>

//       {/* Topbar */}
//       <div className="doc-topbar">
//         <div className="doc-topbar-left">
//           <div className="doc-hamburger" onClick={()=>setSidebarOpen(true)}><MenuIcon sx={{ fontSize:20 }}/></div>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#4f6ef7" }}>Med<span style={{ color:"#7c3aed" }}>Vault</span></Typography>
//         </div>
//         <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
//           {isApproved
//             ? <Chip icon={<VerifiedIcon sx={{ fontSize:14 }}/>} label="Verified Doctor" size="small" sx={{ background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.25)", fontWeight:600, fontSize:".72rem" }}/>
//             : <Chip
//                 label={verifStatus==="PENDING"?"⏳ Under Review":verifStatus==="REJECTED"?"❌ Rejected — Update Profile":"⚠ Verification Required"}
//                 size="small" onClick={()=>handleNavClick("complete-profile")}
//                 sx={{ cursor:"pointer", fontWeight:600, fontSize:".72rem",
//                   background:verifStatus==="PENDING"?"#eff6ff":verifStatus==="REJECTED"?"#fff1f2":"#fffbeb",
//                   color:verifStatus==="PENDING"?"#3b82f6":verifStatus==="REJECTED"?"#e11d48":"#d97706",
//                   border:`1px solid ${verifStatus==="PENDING"?"rgba(59,130,246,.3)":verifStatus==="REJECTED"?"rgba(225,29,72,.25)":"#fcd34d"}` }}/>
//           }
//           <Button startIcon={<LogoutIcon/>} onClick={handleLogout} size="small"
//             sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none", borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>Logout</Button>
//         </Box>
//       </div>

//       {/* Content */}
//       <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.3 }}>

//             {/* ── GATE: block patient views if not approved ── */}
//             {isPatientView && !isApproved ? (
//               <VerificationGate status={verifStatus} remarks={verification?.adminRemarks} onGoToProfile={()=>handleNavClick("complete-profile")}/>
//             ) : (

//               <>
//                 {/* ── DASHBOARD ── */}
//                 {view==="dashboard" && (
//                   <>
//                     <Box sx={{ mb:4 }}>
//                       <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Welcome, Dr. {doctor?.name?.split(" ")[0]} 👨‍⚕️</Typography>
//                       <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Here's your practice overview</Typography>
//                     </Box>

//                     {/* Verification banner */}
//                     {!isApproved && (
//                       <Box onClick={()=>handleNavClick("complete-profile")} sx={{ cursor:"pointer", mb:3, p:2.5, borderRadius:"16px",
//                         background:verifStatus==="PENDING"?"linear-gradient(135deg,#eff6ff,#dbeafe)":verifStatus==="REJECTED"?"linear-gradient(135deg,#fff1f2,#ffe4e6)":"linear-gradient(135deg,#fffbeb,#fef3c7)",
//                         border:`1.5px solid ${verifStatus==="PENDING"?"rgba(59,130,246,.3)":verifStatus==="REJECTED"?"rgba(225,29,72,.25)":"#fcd34d"}`,
//                         display:"flex", alignItems:"center", gap:2, "&:hover":{ transform:"translateY(-2px)", boxShadow:"0 6px 24px rgba(0,0,0,.08)" }, transition:"all .2s" }}>
//                         {verifStatus==="PENDING"&&<HourglassTopIcon sx={{ color:"#3b82f6", fontSize:28, flexShrink:0 }}/>}
//                         {verifStatus==="REJECTED"&&<ErrorOutlineIcon sx={{ color:"#e11d48", fontSize:28, flexShrink:0 }}/>}
//                         {verifStatus==="INCOMPLETE"&&<BadgeIcon sx={{ color:"#d97706", fontSize:28, flexShrink:0 }}/>}
//                         <Box sx={{ flex:1 }}>
//                           <Typography sx={{ fontWeight:700, fontSize:".92rem", color:"#1a1f36" }}>
//                             {verifStatus==="PENDING"&&"Profile under review — patient access will unlock once approved"}
//                             {verifStatus==="REJECTED"&&"Verification rejected — update your profile and resubmit to get patient access"}
//                             {verifStatus==="INCOMPLETE"&&"Complete your verification profile to start receiving patients"}
//                           </Typography>
//                           <Typography sx={{ fontSize:".78rem", color:"#4a5278", mt:.3 }}>
//                             {verifStatus==="PENDING"
//                               ? "The MedVault admin team is verifying your NMC registration and documents."
//                               : "Click here to fill in your details and upload documents →"}
//                           </Typography>
//                         </Box>
//                         <ChevronRightIcon sx={{ color:"#8892b0", flexShrink:0 }}/>
//                       </Box>
//                     )}

//                     <div className="doc-hero">
//                       <Avatar className="av-blue" sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, boxShadow:"0 8px 24px rgba(79,110,247,.3)", flexShrink:0 }}>{doctor?.name?.charAt(0)}</Avatar>
//                       <Box>
//                         <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>Dr. {doctor?.name}</Typography>
//                         <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>
//                           {isApproved ? "✓ Verified Doctor · Active on MedVault" : "Pending Verification"}
//                         </Typography>
//                         <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
//                           {[doctor?.qualification, doctor?.specialization, doctor?.experience?`${doctor.experience} yrs exp`:null, doctor?.consultationFee?`₹${doctor.consultationFee} fee`:null].filter(Boolean).map((v,i)=>(
//                             <Chip key={i} label={v} size="small" sx={{ background:"#eef1fe", color:"#4f6ef7", border:"1px solid rgba(79,110,247,.18)", fontWeight:500, fontSize:".75rem" }}/>
//                           ))}
//                           {isApproved && <Chip icon={<VerifiedIcon sx={{ fontSize:13 }}/>} label="Verified" size="small" sx={{ background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.25)", fontWeight:600 }}/>}
//                         </Box>
//                       </Box>
//                     </div>

//                     <Grid container spacing={2.5} sx={{ mb:4 }}>
//                       <Grid item xs={6} sm={3}><StatCard label="Pending"       value={isApproved?pending.length:"—"}       icon="⏳" color="#d97706"/></Grid>
//                       <Grid item xs={6} sm={3}><StatCard label="Approved"      value={isApproved?approved.length:"—"}      icon="✓"  color="#059669"/></Grid>
//                       <Grid item xs={6} sm={3}><StatCard label="Patients"      value={isApproved?uniquePatients:"—"}       icon="👥" color="#4f6ef7"/></Grid>
//                       <Grid item xs={6} sm={3}><StatCard label="Prescriptions" value={isApproved?Object.keys(prescriptions).length:"—"} icon="💊" color="#7c3aed"/></Grid>
//                     </Grid>

//                     {isApproved && pending.length > 0 && (
//                       <>
//                         <div className="doc-sec-heading">Recent Pending Requests</div>
//                         <Grid container spacing={2.5}>
//                           {pending.slice(0,3).map((appt,i)=>(
//                             <Grid item xs={12} md={4} key={appt.id}>
//                               <Card className="doc-pending-card"><CardContent sx={{ p:"20px !important" }}>
//                                 <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                                   <Avatar className={["av-blue","av-violet","av-teal","av-amber"][i%4]} sx={{ width:44, height:44, borderRadius:"12px", fontSize:"1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
//                                   <Box><Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography><Typography sx={{ fontSize:".75rem", color:"#8892b0" }}>{appt.date} · {appt.timeSlot}</Typography></Box>
//                                 </Box>
//                                 <Box sx={{ display:"flex", gap:1, mt:1 }}>
//                                   <Button size="small" variant="contained" onClick={()=>acceptAppointment(appt.id)} sx={{ flex:1, background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"9px", textTransform:"none", fontWeight:600 }}>✓ Accept</Button>
//                                   <Button size="small" variant="outlined" onClick={()=>rejectAppointment(appt.id)} sx={{ flex:1, borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"9px", textTransform:"none", fontWeight:600 }}>✕ Reject</Button>
//                                 </Box>
//                               </CardContent></Card>
//                             </Grid>
//                           ))}
//                         </Grid>
//                       </>
//                     )}
//                   </>
//                 )}

//                 {/* ── PENDING ── */}
//                 {view==="pending" && (
//                   <>
//                     <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Pending Requests</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{pending.length} awaiting response</Typography></Box>
//                     {pending.length===0 ? <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}><Typography sx={{ fontSize:"2.5rem", mb:1 }}>✓</Typography><Typography sx={{ fontWeight:500 }}>All caught up!</Typography></Box> : (
//                       <Grid container spacing={2.5}>
//                         {pending.map((appt,i)=>(
//                           <Grid item xs={12} md={4} key={appt.id}>
//                             <motion.div whileHover={{ scale:1.02 }}>
//                               <Card className="doc-pending-card"><CardContent sx={{ p:"24px !important" }}>
//                                 <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                   <Avatar className={["av-blue","av-violet","av-teal","av-amber"][i%4]} sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
//                                   <Box><Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography><Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography></Box>
//                                   <Chip label="Pending" size="small" sx={{ ml:"auto", background:"#fffbeb", color:"#d97706", border:"1px solid #fcd34d", fontWeight:600, fontSize:".7rem" }}/>
//                                 </Box>
//                                 <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }}/>
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
//                                 <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:1.5 }}>📝 {appt.description}</Typography>
//                                 <Box sx={{ display:"flex", gap:1 }}>
//                                   <Button variant="contained" onClick={()=>acceptAppointment(appt.id)} sx={{ flex:1, background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"9px", textTransform:"none", fontWeight:600 }}>✓ Accept</Button>
//                                   <Button variant="outlined" onClick={()=>rejectAppointment(appt.id)} sx={{ flex:1, borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"9px", textTransform:"none", fontWeight:600 }}>✕ Reject</Button>
//                                 </Box>
//                               </CardContent></Card>
//                             </motion.div>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     )}
//                   </>
//                 )}

//                 {/* ── APPROVED ── */}
//                 {view==="approved" && (
//                   <>
//                     <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Approved Appointments</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{approved.length} confirmed</Typography></Box>
//                     {approved.length===0 ? <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}><Typography sx={{ fontSize:"2.5rem", mb:1 }}>📋</Typography><Typography sx={{ fontWeight:500 }}>No approved appointments yet.</Typography></Box> : (
//                       <Grid container spacing={2.5}>
//                         {approved.map(appt=>{
//                           const hasPrescription = !!prescriptions[appt.id];
//                           const isPaid = payments[appt.id]?.status === "SUCCESS";
//                           return (
//                             <Grid item xs={12} md={4} key={appt.id}>
//                               <motion.div whileHover={{ scale:1.02 }}>
//                                 <Card className="doc-approved-card" onClick={()=>setSelectedAppt(appt)} sx={{ cursor:"pointer" }}>
//                                   <CardContent sx={{ p:"24px !important" }}>
//                                     <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                       <Avatar className="av-green" sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
//                                       <Box><Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography><Typography sx={{ fontSize:".76rem", color:"#8892b0" }}>Age {appt.patient?.age}</Typography></Box>
//                                       <Chip label="Approved" size="small" sx={{ ml:"auto", background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.25)", fontWeight:600, fontSize:".7rem" }}/>
//                                     </Box>
//                                     <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }}/>
//                                     <Typography sx={{ fontSize:".82rem", color:"#4a5278", mb:.6 }}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
//                                     <Box sx={{ display:"flex", gap:1, mt:1.5, mb:1.5, flexWrap:"wrap" }}>
//                                       {isPaid ? <Chip label="✓ Paid" size="small" sx={{ background:"#ecfdf5", color:"#059669", border:"1px solid rgba(5,150,105,.2)", fontWeight:600, fontSize:".7rem" }}/> : <Chip icon={<LockIcon sx={{ fontSize:11 }}/>} label="Payment Pending" size="small" sx={{ background:"#fff7ed", color:"#d97706", border:"1px solid #fcd34d", fontWeight:600, fontSize:".7rem" }}/>}
//                                       {hasPrescription && <Chip label="Rx Written" size="small" sx={{ background:"#eef1fe", color:"#4f6ef7", fontWeight:600, fontSize:".7rem" }}/>}
//                                     </Box>
//                                     <Button fullWidth size="small" variant="contained"
//                                       startIcon={isPaid?<EditNoteIcon sx={{ fontSize:15 }}/>:<LockIcon sx={{ fontSize:15 }}/>}
//                                       onClick={e=>{e.stopPropagation();setRxAppt(appt);}}
//                                       sx={{ background:isPaid?"linear-gradient(135deg,#059669,#34d399)":"#e2e8f0", color:isPaid?"#fff":"#94a3b8", borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".82rem", boxShadow:"none" }}>
//                                       {isPaid?(hasPrescription?"Edit Rx":"Write Rx"):"Locked (Awaiting Payment)"}
//                                     </Button>
//                                   </CardContent>
//                                 </Card>
//                               </motion.div>
//                             </Grid>
//                           );
//                         })}
//                       </Grid>
//                     )}
//                   </>
//                 )}

//                 {/* ── RECORDS ── */}
//                 {view==="records" && (
//                   <>
//                     <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Patient Records</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{uniquePatients} unique patients</Typography></Box>
//                     {approved.length===0 ? <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}><Typography sx={{ fontSize:"2.5rem", mb:1 }}>👥</Typography><Typography sx={{ fontWeight:500 }}>No records yet.</Typography></Box> : (
//                       <Grid container spacing={2.5}>
//                         {approved.map((appt,i)=>(
//                           <Grid item xs={12} sm={6} md={4} key={appt.id}>
//                             <motion.div whileHover={{ scale:1.02 }}>
//                               <Card className="doc-patient-card" onClick={()=>setSelectedAppt(appt)}>
//                                 <CardContent sx={{ p:"22px !important" }}>
//                                   <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:1.5 }}>
//                                     <Avatar className={["av-blue","av-violet","av-teal","av-amber","av-green"][i%5]} sx={{ width:46, height:46, borderRadius:"13px", fontSize:"1.1rem", fontWeight:700 }}>{appt.patient?.name?.charAt(0)}</Avatar>
//                                     <Box><Typography sx={{ fontWeight:600, fontSize:".93rem", color:"#1a1f36" }}>{appt.patient?.name}</Typography><Typography sx={{ fontSize:".75rem", color:"#8892b0" }}>Age {appt.patient?.age} · {appt.patient?.gender}</Typography></Box>
//                                   </Box>
//                                   <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", mt:1.5 }}>
//                                     <Chip label={appt.report?"📄 Report":"No Report"} size="small" sx={{ background:appt.report?"#eef1fe":"#f5f7ff", color:appt.report?"#4f6ef7":"#8892b0", fontSize:".72rem" }}/>
//                                     <Typography sx={{ fontSize:".76rem", color:"#4f6ef7", fontWeight:600 }}>View →</Typography>
//                                   </Box>
//                                 </CardContent>
//                               </Card>
//                             </motion.div>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     )}
//                   </>
//                 )}

//                 {/* ── PRESCRIPTIONS ── */}
//                 {view==="prescriptions" && (
//                   <>
//                     <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Prescriptions</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{Object.keys(prescriptions).length} written</Typography></Box>
//                     {Object.keys(prescriptions).length===0 ? <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}><Typography sx={{ fontSize:"2.5rem", mb:1 }}>💊</Typography><Typography sx={{ fontWeight:500 }}>No prescriptions yet.</Typography></Box> : (
//                       Object.values(prescriptions).map(rx=>{
//                         const appt = approved.find(a=>a.id===rx.appointment?.id);
//                         return (
//                           <div key={rx.id} className="rx-card">
//                             <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.5 }}>
//                               <Box sx={{ width:46, height:46, borderRadius:"13px", flexShrink:0, background:"#ecfdf5", border:"1px solid rgba(5,150,105,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}><LocalPharmacyIcon sx={{ color:"#059669", fontSize:22 }}/></Box>
//                               <Box sx={{ flex:1 }}>
//                                 <Box sx={{ display:"flex", alignItems:"center", gap:1.5, flexWrap:"wrap", mb:.5 }}>
//                                   <Typography sx={{ fontWeight:700, fontSize:".95rem", color:"#1a1f36" }}>{appt?.patient?.name||"Patient"}</Typography>
//                                   <Chip label={rx.issuedDate||"—"} size="small" sx={{ background:"#f5f7ff", color:"#8892b0", fontSize:".68rem", height:20 }}/>
//                                 </Box>
//                                 <Typography sx={{ fontSize:".82rem", color:"#059669", fontWeight:600, mb:.5 }}>🩺 {rx.diagnosis}</Typography>
//                                 {rx.medicines && <Box sx={{ background:"#f8f9ff", borderRadius:"10px", p:1.5, my:1, border:"1px solid #e8ecf5" }}><Typography sx={{ fontSize:".72rem", color:"#8892b0", fontWeight:600, textTransform:"uppercase", letterSpacing:".8px", mb:.5 }}>Medicines</Typography><Typography sx={{ fontSize:".83rem", color:"#1a1f36", whiteSpace:"pre-line" }}>{rx.medicines}</Typography></Box>}
//                                 {rx.instructions && <Typography sx={{ fontSize:".8rem", color:"#4a5278" }}>📋 {rx.instructions}</Typography>}
//                                 {rx.tests && <Typography sx={{ fontSize:".8rem", color:"#7c3aed", mt:.4 }}>🔬 {rx.tests}</Typography>}
//                                 {rx.followUpDate && <Typography sx={{ fontSize:".8rem", color:"#d97706", mt:.4 }}>📅 Follow-up: {rx.followUpDate}</Typography>}
//                               </Box>
//                               <Button size="small" variant="outlined" onClick={()=>setRxAppt(appt)} startIcon={<EditNoteIcon sx={{ fontSize:14 }}/>}
//                                 sx={{ borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".75rem", borderColor:"rgba(5,150,105,.3)", color:"#059669", flexShrink:0, "&:hover":{ background:"#ecfdf5" } }}>Edit</Button>
//                             </Box>
//                           </div>
//                         );
//                       })
//                     )}
//                   </>
//                 )}

//                 {/* ── PROFILE ── */}
//                 {view==="profile" && (
//                   <>
//                     <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>My Profile</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Your professional details</Typography></Box>
//                     <Card className="doc-card" sx={{ p:4 }}>
//                       <Box sx={{ display:"flex", alignItems:"center", gap:2.5, mb:3 }}>
//                         <Avatar className="av-blue" sx={{ width:76, height:76, borderRadius:"22px", fontSize:"2rem", fontFamily:"'Cormorant Garamond',serif", fontWeight:700 }}>{doctor?.name?.charAt(0)}</Avatar>
//                         <Box>
//                           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:700, color:"#1a1f36" }}>Dr. {doctor?.name}</Typography>
//                           <Box sx={{ display:"flex", gap:1, mt:.8 }}>
//                             {isApproved
//                               ? <Chip icon={<VerifiedIcon sx={{ fontSize:13 }}/>} label="Verified" size="small" sx={{ background:"#ecfdf5", color:"#059669", fontWeight:600 }}/>
//                               : <Chip label={verifStatus==="PENDING"?"Under Review":"Not Verified"} size="small" sx={{ background:"#fff7ed", color:"#d97706", fontWeight:600 }}/>}
//                           </Box>
//                         </Box>
//                       </Box>
//                       <Divider sx={{ mb:3, borderColor:"#e8ecf5" }}/>
//                       <Grid container spacing={3}>
//                         {[["Full Name",`Dr. ${doctor?.name}`],["Gender",doctor?.gender],["Email",doctor?.email],["Phone",doctor?.contact],["Specialization",doctor?.specialization],["Qualification",doctor?.qualification],["Experience",doctor?.experience?`${doctor.experience} years`:"—"],["Consultation Fee",doctor?.consultationFee?`₹${doctor.consultationFee}`:"—"],["Hospital",doctor?.hospital],["Doctor ID",`#${doctor?.id}`]].map(([l,v])=>(
//                           <Grid item xs={12} sm={6} key={l}>
//                             <Typography sx={{ fontSize:".7rem", textTransform:"uppercase", letterSpacing:"1.1px", color:"#8892b0", fontWeight:600, mb:.6 }}>{l}</Typography>
//                             <Typography sx={{ fontSize:".95rem", fontWeight:500, color:"#1a1f36" }}>{v||"—"}</Typography>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     </Card>
//                   </>
//                 )}

//                 {/* ── COMPLETE PROFILE ── */}
//                 {view==="complete-profile" && (
//                   <CompleteProfileView doctor={doctor} verification={verification} onVerificationChange={setVerification}/>
//                 )}
//               </>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </Box>

//       <PatientModal appt={selectedAppt} open={Boolean(selectedAppt)} onClose={()=>setSelectedAppt(null)} onWriteRx={appt=>setRxAppt(appt)} payments={payments}/>
//       <WritePrescriptionModal appt={rxAppt} open={Boolean(rxAppt)} onClose={()=>setRxAppt(null)} onSaved={handleRxSaved} payments={payments}/>
//     </Box>
//   );
// }







// import { useContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import DoctorProfileForm from "./DoctorProfileForm";
// import {
//   Box, Typography, CircularProgress, Grid, Avatar, Card, CardContent,
//   Button, Chip, Divider, Modal, IconButton, TextField,
//   Dialog, DialogTitle, DialogContent, DialogActions,
// } from "@mui/material";
// import MenuIcon            from "@mui/icons-material/Menu";
// import CloseIcon           from "@mui/icons-material/Close";
// import LogoutIcon          from "@mui/icons-material/Logout";
// import DashboardIcon       from "@mui/icons-material/Dashboard";
// import EventIcon           from "@mui/icons-material/Event";
// import CheckCircleIcon     from "@mui/icons-material/CheckCircle";
// import PersonIcon          from "@mui/icons-material/Person";
// import FolderSharedIcon    from "@mui/icons-material/FolderShared";
// import DescriptionIcon     from "@mui/icons-material/Description";
// import OpenInNewIcon       from "@mui/icons-material/OpenInNew";
// import DownloadIcon        from "@mui/icons-material/Download";
// import LocalPharmacyIcon   from "@mui/icons-material/LocalPharmacy";
// import EditNoteIcon        from "@mui/icons-material/EditNote";
// import CheckIcon           from "@mui/icons-material/Check";
// import LockIcon            from "@mui/icons-material/Lock";
// import BadgeIcon           from "@mui/icons-material/Badge";
// import SchoolIcon          from "@mui/icons-material/School";
// import LocalHospitalIcon   from "@mui/icons-material/LocalHospital";
// import UploadFileIcon      from "@mui/icons-material/UploadFile";
// import HourglassTopIcon    from "@mui/icons-material/HourglassTop";
// import VerifiedIcon        from "@mui/icons-material/Verified";
// import ErrorOutlineIcon    from "@mui/icons-material/ErrorOutline";
// import ChevronRightIcon    from "@mui/icons-material/ChevronRight";
// import ChevronLeftIcon     from "@mui/icons-material/ChevronLeft";
// import SendIcon            from "@mui/icons-material/Send";
// import AssignmentIcon      from "@mui/icons-material/Assignment";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const BASE = "http://localhost:8080";

// const CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family:'Outfit',sans-serif !important; }
//   .doc-overlay { position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199; }
//   .doc-sidebar { width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1); }
//   .doc-sidebar.closed { transform:translateX(-100%); }
//   .doc-sidebar.open   { transform:translateX(0); }
//   .doc-sidebar-top { display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px; }
//   .doc-logo { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px; }
//   .doc-logo-icon { width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0; }
//   .doc-logo-accent { color:#7c3aed; }
//   .doc-close-btn { width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0; }
//   .doc-close-btn:hover { background:#eef1fe;color:#4f6ef7; }
//   .doc-nav-label { font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px; }
//   .doc-nav-item { display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s;border:1px solid transparent;margin-bottom:3px;user-select:none; }
//   .doc-nav-item:hover { background:#eef1fe;color:#4f6ef7; }
//   .doc-nav-item.active { background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18); }
//   .doc-nav-item.active .doc-nav-icon { background:#4f6ef7 !important;color:#fff !important; }
//   .doc-nav-icon { width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278; }
//   .doc-nav-item.locked-nav { opacity:.5;cursor:not-allowed; }
//   .doc-sidebar-spacer { flex:1; }
//   .doc-user-card { display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px; }
//   .doc-user-av { width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem; }
//   .doc-topbar { display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100; }
//   .doc-topbar-left { display:flex;align-items:center;gap:14px; }
//   .doc-hamburger { width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7; }
//   .doc-hamburger:hover { background:#eef1fe; }
//   .doc-blob { position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0; }
//   .doc-blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
//   .doc-blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }
//   .doc-hero { background:linear-gradient(135deg,#fff 55%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;display:flex;align-items:center;gap:28px;margin-bottom:28px; }
//   .doc-stat { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden; }
//   .doc-stat-value { font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1; }
//   .doc-stat-label { font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px; }
//   .doc-stat-icon  { position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07; }
//   .doc-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06) !important; }
//   .doc-pending-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #f59e0b !important;border-radius:18px !important; }
//   .doc-approved-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #059669 !important;border-radius:18px !important; }
//   .doc-patient-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:18px !important;cursor:pointer; }
//   .doc-sec-heading { font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px; }
//   .doc-sec-heading::after { content:'';flex:1;height:1px;background:#e8ecf5; }
//   .patient-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:620px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
//   .rx-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:560px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(5,150,105,.16);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
//   .modal-field-label { font-size:.68rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px; }
//   .modal-field-value { font-size:.92rem;font-weight:500;color:#1a1f36;margin-bottom:16px; }
//   .rx-card { background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px; }
//   .pay-lock-banner { background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:10px; }
//   .av-blue   { background:linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-violet { background:linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
//   .av-teal   { background:linear-gradient(135deg,#0891b2,#22d3ee) !important; }
//   .av-amber  { background:linear-gradient(135deg,#d97706,#fbbf24) !important; }
//   .av-green  { background:linear-gradient(135deg,#059669,#34d399) !important; }
//   .field-label { font-size:.68rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px; }
//   .verif-step-bar { display:flex;align-items:center;gap:0;margin-bottom:28px;overflow-x:auto;padding-bottom:4px; }
//   .verif-step-pill { display:flex;align-items:center;gap:7px;padding:8px 14px;border-radius:40px;font-size:.76rem;font-weight:600;cursor:pointer;transition:all .22s;white-space:nowrap; }
//   .verif-step-pill.done    { background:#ecfdf5;color:#059669;border:1.5px solid rgba(5,150,105,.25); }
//   .verif-step-pill.active  { background:#eef1fe;color:#4f6ef7;border:1.5px solid rgba(79,110,247,.35);box-shadow:0 2px 10px rgba(79,110,247,.14); }
//   .verif-step-pill.waiting { background:#f5f7ff;color:#b0b8d0;border:1.5px solid #e8ecf5; }
//   .verif-step-connector { flex:1;height:2px;background:#e8ecf5;min-width:10px; }
//   .verif-upload-zone { border:2px dashed #d4daf0;border-radius:14px;background:#f8f9ff;padding:22px 16px;display:flex;flex-direction:column;align-items:center;gap:9px;text-align:center;cursor:pointer;transition:all .2s; }
//   .verif-upload-zone:hover { border-color:#4f6ef7;background:#eef1fe; }
//   .verif-upload-zone.has-file { border-color:#059669;background:#ecfdf5;border-style:solid; }
//   .verif-status-banner { border-radius:16px;padding:18px 22px;display:flex;align-items:flex-start;gap:15px;margin-bottom:26px; }
//   .verif-status-banner.incomplete { background:linear-gradient(135deg,#f0f4ff,#eef1fe);border:1.5px solid rgba(79,110,247,.25); }
//   .verif-status-banner.pending    { background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1.5px solid #fcd34d; }
//   .verif-status-banner.approved   { background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1.5px solid rgba(5,150,105,.3); }
//   .verif-status-banner.rejected   { background:linear-gradient(135deg,#fff1f2,#ffe4e6);border:1.5px solid rgba(225,29,72,.3); }
//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation:fadeUp .38s cubic-bezier(.22,1,.36,1) both; }
// `;
// if (!document.getElementById("doc-css")) {
//   const st = document.createElement("style"); st.id = "doc-css";
//   st.textContent = CSS; document.head.appendChild(st);
// }

// function StatCard({label,value,icon,color}) {
//   return (<div className="doc-stat fu"><div className="doc-stat-label">{label}</div><div className="doc-stat-value" style={{color}}>{value}</div><div className="doc-stat-icon">{icon}</div></div>);
// }
// function NavItem({icon,label,active,onClick,badge,locked}) {
//   return (
//     <div className={`doc-nav-item ${active?"active":""} ${locked?"locked-nav":""}`} onClick={locked?undefined:onClick}>
//       <div className="doc-nav-icon">{icon}</div>
//       <span style={{flex:1}}>{label}</span>
//       {badge&&<span style={{width:9,height:9,borderRadius:"50%",background:badge,flexShrink:0}}/>}
//       {locked&&<LockIcon sx={{fontSize:13,color:"#b0b8d0"}}/>}
//     </div>
//   );
// }

// function ReportViewer({filename}) {
//   if(!filename)return(<Box sx={{border:"1.5px dashed #e8ecf5",borderRadius:"14px",p:2.5,background:"#f5f7ff",display:"flex",alignItems:"center",gap:1.5}}><DescriptionIcon sx={{color:"#b0b8d0",fontSize:22}}/><Typography sx={{fontSize:".82rem",color:"#8892b0"}}>No report uploaded by patient</Typography></Box>);
//   const url=`${BASE}/appointments/report/${filename}`;const isPdf=filename.toLowerCase().endsWith(".pdf");
//   return (<Box sx={{border:"1.5px dashed #d4daf0",borderRadius:"14px",background:"#f8f9ff",p:2.5}}>
//     <Box sx={{display:"flex",gap:1.5,mb:2}}>
//       <a href={url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:10,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",color:"#fff",fontWeight:600,fontSize:".82rem",textDecoration:"none",fontFamily:"'Outfit',sans-serif"}}><OpenInNewIcon sx={{fontSize:15}}/> View</a>
//       <a href={url} download style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:10,background:"#fff",color:"#4f6ef7",fontWeight:600,fontSize:".82rem",textDecoration:"none",border:"1.5px solid rgba(79,110,247,.28)",fontFamily:"'Outfit',sans-serif"}}><DownloadIcon sx={{fontSize:15}}/> Download</a>
//     </Box>
//     {isPdf?<Box sx={{borderRadius:12,overflow:"hidden",border:"1px solid #e8ecf5"}}><iframe src={url} style={{width:"100%",height:360,border:"none",display:"block"}} title="report"/></Box>:<Box sx={{borderRadius:12,overflow:"hidden",border:"1px solid #e8ecf5"}}><img src={url} alt="report" style={{width:"100%",maxHeight:400,objectFit:"contain",background:"#f0f2f8",display:"block"}}/></Box>}
//   </Box>);
// }

// // ── PatientModal — shows full patient info + payment status ──────────────────
// function PatientModal({appt,open,onClose,onWriteRx,payments}) {
//   if(!appt)return null;
//   const p=appt.patient;
//   // FIX: check payment status correctly
//   const isPaid=payments[appt.id]?.status==="SUCCESS";
//   return (
//     <Modal open={open} onClose={onClose}><Box className="patient-modal-box">
//       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:2}}>
//         <Box sx={{display:"flex",alignItems:"center",gap:2}}><Avatar className="av-blue" sx={{width:54,height:54,borderRadius:"16px",fontSize:"1.4rem",fontWeight:700}}>{p?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36"}}>{p?.name}</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0"}}>Patient Record</Typography></Box></Box>
//         <IconButton onClick={onClose} size="small" sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton>
//       </Box>
//       <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//       <Grid container spacing={2} sx={{mb:3}}>
//         {[["Name",p?.name],["Age",p?.age?`${p.age} yrs`:"—"],["Gender",p?.gender],["DOB",p?.dob],["Email",p?.email],["Contact",p?.contact]].map(([l,v])=>(<Grid item xs={6} key={l}><div className="modal-field-label">{l}</div><div className="modal-field-value">{v||"—"}</div></Grid>))}
//       </Grid>
//       <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//       <Grid container spacing={2} sx={{mb:2}}>
//         {[["Date",appt.date],["Time",appt.timeSlot],["Status",appt.status]].map(([l,v])=>(<Grid item xs={6} key={l}><div className="modal-field-label">{l}</div><div className="modal-field-value">{v||"—"}</div></Grid>))}
//         <Grid item xs={12}><div className="modal-field-label">Symptoms</div><div className="modal-field-value">{appt.description||"—"}</div></Grid>
//       </Grid>
//       <Box sx={{mb:3}}>
//         {isPaid
//           ?<Chip label="✓ Payment Confirmed" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.25)",fontWeight:600}}/>
//           :<Chip icon={<LockIcon sx={{fontSize:13}}/>} label="Payment Not Yet Received" size="small" sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600}}/>}
//       </Box>
//       <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//       <ReportViewer filename={appt.report||appt.reportFileName}/>
//       {appt.status==="APPROVED"&&(
//         <Button onClick={()=>{onClose();onWriteRx(appt);}} variant="contained" fullWidth
//           startIcon={isPaid?<EditNoteIcon/>:<LockIcon/>}
//           sx={{mt:3,background:isPaid?"linear-gradient(135deg,#059669,#34d399)":"linear-gradient(135deg,#94a3b8,#64748b)",borderRadius:"12px",textTransform:"none",fontWeight:700}}>
//           {isPaid?"Write / Update Prescription":"Prescription Locked — Awaiting Patient Payment"}
//         </Button>
//       )}
//     </Box></Modal>
//   );
// }

// // ── WritePrescriptionModal — locked until patient pays ───────────────────────
// function WritePrescriptionModal({appt,open,onClose,onSaved,payments}) {
//   const [form,setForm]=useState({diagnosis:"",medicines:"",instructions:"",tests:"",followUpDate:""});
//   const [saving,setSaving]=useState(false);
//   // FIX: check payment correctly
//   const isPaid=payments[appt?.id]?.status==="SUCCESS";

//   // Load existing prescription if exists
//   useEffect(()=>{
//     if(open&&appt?.id){
//       axios.get(`${BASE}/prescriptions/appointment/${appt.id}`)
//         .then(r=>{
//           if(r.data){
//             setForm({
//               diagnosis:r.data.diagnosis||"",
//               medicines:r.data.medicines||"",
//               instructions:r.data.instructions||"",
//               tests:r.data.tests||"",
//               followUpDate:r.data.followUpDate||"",
//             });
//           }
//         }).catch(()=>{
//           // No existing prescription, form stays empty
//           setForm({diagnosis:"",medicines:"",instructions:"",tests:"",followUpDate:""});
//         });
//     }
//   },[open,appt?.id]);

//   const handleSave=async()=>{
//     if(!isPaid){alert("Cannot write prescription until patient has paid the consultation fee.");return;}
//     if(!form.diagnosis.trim()){alert("Please enter a diagnosis.");return;}
//     setSaving(true);
//     try{await axios.post(`${BASE}/prescriptions/appointment/${appt.id}`,form);onSaved();onClose();}
//     catch{alert("Failed to save prescription.");}finally{setSaving(false);}
//   };
//   const fSx={"& .MuiOutlinedInput-root":{borderRadius:"12px",background:"#f8f9ff"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5"}};
//   return (
//     <Modal open={open} onClose={onClose}><Box className="rx-modal-box">
//       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:2}}>
//         <Box>
//           <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36"}}>Write Prescription</Typography>
//           {appt&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3}}>Patient: {appt.patient?.name} · {appt.date}</Typography>}
//         </Box>
//         <IconButton onClick={onClose} size="small" sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton>
//       </Box>

//       {/* FIX: Show clear lock banner when not paid */}
//       {!isPaid&&(
//         <Box sx={{background:"linear-gradient(135deg,#fff7ed,#fef3c7)",border:"1.5px solid #fcd34d",borderRadius:"12px",p:"14px 18px",mb:2,display:"flex",alignItems:"center",gap:1.5}}>
//           <LockIcon sx={{color:"#d97706",fontSize:22,flexShrink:0}}/>
//           <Box>
//             <Typography sx={{fontSize:".88rem",color:"#92400e",fontWeight:700}}>Prescription locked</Typography>
//             <Typography sx={{fontSize:".78rem",color:"#a16207",mt:.3}}>The patient must complete payment before you can write or save a prescription.</Typography>
//           </Box>
//         </Box>
//       )}
//       {isPaid&&(
//         <Box sx={{background:"#ecfdf5",border:"1px solid rgba(5,150,105,.25)",borderRadius:"12px",p:"10px 16px",mb:2,display:"flex",alignItems:"center",gap:1.5}}>
//           <CheckCircleIcon sx={{color:"#059669",fontSize:18,flexShrink:0}}/>
//           <Typography sx={{fontSize:".82rem",color:"#065f46",fontWeight:600}}>Payment confirmed — you can write the prescription</Typography>
//         </Box>
//       )}

//       <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//       {[["Diagnosis *","diagnosis","e.g. Hypertension Stage 1",false],["Medicines","medicines","Name · Dosage · Frequency (one per line)",true],["Instructions","instructions","Dietary / lifestyle notes",true],["Lab Tests","tests","e.g. CBC, LFT, ECG",true]].map(([lbl,key,ph,multi])=>(
//         <Box key={key} sx={{mb:2}}>
//           <div className="modal-field-label">{lbl}</div>
//           <TextField fullWidth size="small" multiline={multi} rows={multi?3:1} variant="outlined" placeholder={ph}
//             value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} disabled={!isPaid} sx={fSx}/>
//         </Box>
//       ))}
//       <Box sx={{mb:3}}>
//         <div className="modal-field-label">Follow-up Date</div>
//         <TextField fullWidth size="small" type="date" variant="outlined" value={form.followUpDate}
//           onChange={e=>setForm(p=>({...p,followUpDate:e.target.value}))} disabled={!isPaid} sx={fSx} InputLabelProps={{shrink:true}}/>
//       </Box>
//       <Button variant="contained" fullWidth onClick={handleSave} disabled={saving||!isPaid}
//         sx={{borderRadius:"12px",textTransform:"none",fontWeight:700,background:isPaid?"linear-gradient(135deg,#059669,#34d399)":"#e2e8f0",color:isPaid?"#fff":"#94a3b8",boxShadow:isPaid?"0 4px 14px rgba(5,150,105,.3)":"none"}}>
//         {saving?"Saving…":!isPaid?"Locked — Awaiting Payment":"Save Prescription"}
//       </Button>
//     </Box></Modal>
//   );
// }

// function UploadZone({label,field,doctorId,currentFile,onUploaded}) {
//   const inputRef=useRef();const[uploading,setUploading]=useState(false);const[localFile,setLocalFile]=useState(currentFile||null);
//   useEffect(()=>{setLocalFile(currentFile||null);},[currentFile]);
//   const handleFile=async(file)=>{if(!file)return;setUploading(true);const fd=new FormData();fd.append("file",file);fd.append("field",field);try{const res=await axios.post(`${BASE}/doctor-verification/doctor/${doctorId}/upload`,fd,{headers:{"Content-Type":"multipart/form-data"}});setLocalFile(res.data.filename);onUploaded(field,res.data.filename);}catch{alert(`Upload failed for ${label}`);}finally{setUploading(false);}};
//   return (<Box><div className="field-label">{label}</div><div className={`verif-upload-zone ${localFile?"has-file":""}`} onClick={()=>inputRef.current?.click()}><input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>{uploading?<CircularProgress size={22} sx={{color:"#4f6ef7"}}/>:localFile?<><CheckCircleIcon sx={{fontSize:26,color:"#059669"}}/><Typography sx={{fontSize:".8rem",fontWeight:600,color:"#059669"}}>Uploaded ✓</Typography><Typography sx={{fontSize:".7rem",color:"#8892b0",wordBreak:"break-all"}}>{localFile}</Typography></>:<><UploadFileIcon sx={{fontSize:28,color:"#8892b0"}}/><Typography sx={{fontSize:".82rem",fontWeight:500,color:"#4a5278"}}>Click to upload</Typography><Typography sx={{fontSize:".72rem",color:"#b0b8d0"}}>PDF · JPG · PNG</Typography></>}</div></Box>);
// }

// const STEPS=[{key:"identity",label:"Identity & Registration",icon:<BadgeIcon sx={{fontSize:15}}/>},{key:"education",label:"Education",icon:<SchoolIcon sx={{fontSize:15}}/>},{key:"practice",label:"Practice",icon:<LocalHospitalIcon sx={{fontSize:15}}/>},{key:"documents",label:"Documents",icon:<UploadFileIcon sx={{fontSize:15}}/>},{key:"about",label:"About & Submit",icon:<SendIcon sx={{fontSize:15}}/>}];
// const EMPTY_FORM={fullLegalName:"",dateOfBirth:"",gender:"",nationality:"India",aadhaarNumber:"",aadhaarMobile:"",medicalRegistrationNumber:"",medicalCouncil:"",registrationDate:"",registrationExpiry:"",registrationType:"",idProofType:"",idProofNumber:"",degreeName:"",degreeInstitution:"",degreeUniversity:"",degreePassingYear:"",internshipYear:"",pgDegree:"",pgInstitution:"",pgPassingYear:"",superSpecialization:"",areasOfExpertise:"",totalExperienceYears:"",currentHospitalName:"",currentHospitalAddress:"",clinicName:"",clinicAddress:"",clinicCity:"",clinicState:"",clinicPincode:"",languagesSpoken:"",consultationDays:"",consultationTimings:"",aboutMe:"",medicalCertificateFile:"",degreeFile:"",pgDegreeFile:"",aadhaarFile:"",idProofFile:"",photoFile:""};
// function InfoNote({text}){return<Box sx={{display:"flex",alignItems:"flex-start",gap:1,p:1.5,borderRadius:"10px",background:"#f0f4ff",border:"1px solid rgba(79,110,247,.15)",mb:2.5}}><Typography sx={{fontSize:".95rem",lineHeight:1,mt:.1}}>ℹ️</Typography><Typography sx={{fontSize:".78rem",color:"#4a5278",lineHeight:1.5}}>{text}</Typography></Box>;}
// function SHead({color="#4f6ef7",children}){return<Box sx={{display:"flex",alignItems:"center",gap:1,mb:1.5,mt:.5}}><Box sx={{width:3,height:14,borderRadius:2,background:color,flexShrink:0}}/><Typography sx={{fontSize:".72rem",fontWeight:700,color,textTransform:"uppercase",letterSpacing:"1.1px"}}>{children}</Typography></Box>;}

// function CompleteProfileView({doctor,verification,onVerificationChange}) {
//   const[step,setStep]=useState(0);const[form,setForm]=useState(EMPTY_FORM);const[saving,setSaving]=useState(false);
//   const status=verification?.status||"INCOMPLETE";const locked=status==="PENDING"||status==="APPROVED";
//   useEffect(()=>{if(verification)setForm(prev=>({...prev,...Object.fromEntries(Object.keys(EMPTY_FORM).map(k=>[k,verification[k]||""]))}))},[verification]);
//   const f=k=>form[k];const s=(k,v)=>setForm(p=>({...p,[k]:v}));
//   const fSx={"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}};
//   const FL=({children})=><div className="field-label">{children}</div>;
//   const handleSave=async()=>{setSaving(true);try{const res=await axios.post(`${BASE}/doctor-verification/doctor/${doctor.id}`,form);onVerificationChange(res.data);}catch{alert("Save failed.");}finally{setSaving(false);}};
//   const handleSubmit=async()=>{await handleSave();try{const res=await axios.post(`${BASE}/doctor-verification/doctor/${doctor.id}/submit`);onVerificationChange(res.data);}catch{alert("Submission failed.");}};
//   const checklist=[["Full Legal Name",!!f("fullLegalName")],["Date of Birth",!!f("dateOfBirth")],["Aadhaar Number",!!f("aadhaarNumber")],["NMC/MCI Registration Number",!!f("medicalRegistrationNumber")],["Issuing Medical Council",!!f("medicalCouncil")],["Registration Valid Dates",!!(f("registrationDate")&&f("registrationExpiry"))],["Primary Degree",!!f("degreeName")],["Degree Institution",!!f("degreeInstitution")],["Years of Experience",!!f("totalExperienceYears")],["Hospital / Clinic Name",!!f("currentHospitalName")],["Aadhaar Card Upload",!!f("aadhaarFile")],["Registration Certificate Upload",!!f("medicalCertificateFile")],["Degree Certificate Upload",!!f("degreeFile")],["Professional Photo Upload",!!f("photoFile")]];
//   const done=checklist.filter(([,d])=>d).length;const allOk=done===checklist.length;
//   const cfgMap={INCOMPLETE:{cls:"incomplete",Icon:BadgeIcon,iconColor:"#4f6ef7",title:"Profile Incomplete",sub:"Fill all sections and submit for admin review."},PENDING:{cls:"pending",Icon:HourglassTopIcon,iconColor:"#d97706",title:"Under Admin Review",sub:"Being reviewed by MedVault admin team."},APPROVED:{cls:"approved",Icon:VerifiedIcon,iconColor:"#059669",title:"Profile Verified ✓",sub:"Credentials verified. You can now receive patient appointments."},REJECTED:{cls:"rejected",Icon:ErrorOutlineIcon,iconColor:"#e11d48",title:"Verification Rejected",sub:verification?.adminRemarks||"Please update and resubmit."}};
//   const c=cfgMap[status]||cfgMap.INCOMPLETE;
//   return (<Box className="fu">
//     <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Complete Your Profile</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Submit credentials for admin verification</Typography></Box>
//     <div className={`verif-status-banner ${c.cls}`}><c.Icon sx={{fontSize:28,color:c.iconColor,flexShrink:0,mt:.2}}/><Box sx={{flex:1}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:700,color:"#1a1f36"}}>{c.title}</Typography><Typography sx={{fontSize:".83rem",color:"#4a5278",mt:.4}}>{c.sub}</Typography>{status==="INCOMPLETE"&&<Box sx={{mt:1.5}}><Box sx={{display:"flex",justifyContent:"space-between",mb:.6}}><Typography sx={{fontSize:".72rem",color:"#8892b0",fontWeight:600}}>Completion</Typography><Typography sx={{fontSize:".72rem",color:"#4f6ef7",fontWeight:700}}>{done}/{checklist.length} required</Typography></Box><Box sx={{height:7,borderRadius:99,background:"#e8ecf5",overflow:"hidden"}}><Box sx={{height:"100%",borderRadius:99,background:`linear-gradient(90deg,${allOk?"#059669,#34d399":"#4f6ef7,#7c3aed"})`,width:`${(done/checklist.length)*100}%`,transition:"width .4s"}}/></Box></Box>}</Box></div>
//     <Box className="verif-step-bar">{STEPS.map((st,i)=>(<Box key={st.key} sx={{display:"flex",alignItems:"center",flex:i<STEPS.length-1?"1":"0 0 auto"}}><div className={`verif-step-pill ${i<step?"done":i===step?"active":"waiting"}`} onClick={()=>!locked&&setStep(i)}>{i<step?<CheckIcon sx={{fontSize:13}}/>:st.icon}{st.label}</div>{i<STEPS.length-1&&<div className="verif-step-connector"/>}</Box>))}</Box>
//     <Card className="doc-card" sx={{p:{xs:2.5,md:4},mb:3}}><AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:.2}}>
//       {step===0&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:3}}>Identity & Medical Registration</Typography><SHead color="#4f6ef7">Personal Identity</SHead><InfoNote text="Enter your name exactly as it appears on your Aadhaar card."/><Grid container spacing={2.5} sx={{mb:3}}><Grid item xs={12} sm={6}><FL>Full Legal Name *</FL><TextField fullWidth size="small" disabled={locked} value={f("fullLegalName")} onChange={e=>s("fullLegalName",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={3}><FL>Date of Birth *</FL><TextField fullWidth size="small" type="date" disabled={locked} value={f("dateOfBirth")} onChange={e=>s("dateOfBirth",e.target.value)} sx={fSx} InputLabelProps={{shrink:true}}/></Grid><Grid item xs={12} sm={3}><FL>Gender *</FL><TextField fullWidth size="small" select disabled={locked} value={f("gender")} onChange={e=>s("gender",e.target.value)} sx={fSx} SelectProps={{native:true}}><option value="">Select…</option>{["Male","Female","Other"].map(v=><option key={v} value={v}>{v}</option>)}</TextField></Grid></Grid><Divider sx={{mb:2.5,borderColor:"#e8ecf5"}}/><SHead color="#059669">NMC / State Council Registration</SHead><Grid container spacing={2.5}><Grid item xs={12} sm={5}><FL>Registration Number *</FL><TextField fullWidth size="small" disabled={locked} placeholder="e.g. MH/123456/2010" value={f("medicalRegistrationNumber")} onChange={e=>s("medicalRegistrationNumber",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={7}><FL>Issuing Medical Council *</FL><TextField fullWidth size="small" select disabled={locked} value={f("medicalCouncil")} onChange={e=>s("medicalCouncil",e.target.value)} sx={fSx} SelectProps={{native:true}}><option value="">Select…</option><option value="National Medical Commission (NMC)">NMC</option>{["Andhra Pradesh MC","Delhi MC","Gujarat MC","Karnataka MC","Kerala MC","Maharashtra MC","Telangana State MC","Tamil Nadu MC","UP MC","West Bengal MC"].map(v=><option key={v} value={v}>{v}</option>)}</TextField></Grid><Grid item xs={12} sm={4}><FL>Registration Date *</FL><TextField fullWidth size="small" type="date" disabled={locked} value={f("registrationDate")} onChange={e=>s("registrationDate",e.target.value)} sx={fSx} InputLabelProps={{shrink:true}}/></Grid><Grid item xs={12} sm={4}><FL>Valid Until *</FL><TextField fullWidth size="small" type="date" disabled={locked} value={f("registrationExpiry")} onChange={e=>s("registrationExpiry",e.target.value)} sx={fSx} InputLabelProps={{shrink:true}}/></Grid><Grid item xs={12} sm={4}><FL>Aadhaar Number</FL><TextField fullWidth size="small" disabled={locked} placeholder="XXXX XXXX XXXX" value={f("aadhaarNumber")} onChange={e=>{const raw=e.target.value.replace(/\D/g,"").slice(0,12);s("aadhaarNumber",raw.replace(/(\d{4})(?=\d)/g,"$1 "));}} sx={fSx}/></Grid></Grid></Box>}
//       {step===1&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:3}}>Education & Qualifications</Typography><SHead color="#4f6ef7">Primary Medical Degree</SHead><Grid container spacing={2.5} sx={{mb:3}}><Grid item xs={12} sm={4}><FL>Degree *</FL><TextField fullWidth size="small" select disabled={locked} value={f("degreeName")} onChange={e=>s("degreeName",e.target.value)} sx={fSx} SelectProps={{native:true}}><option value="">Select…</option>{["MBBS","BDS","BAMS","BHMS","BNYS"].map(v=><option key={v} value={v}>{v}</option>)}</TextField></Grid><Grid item xs={12} sm={5}><FL>Medical College *</FL><TextField fullWidth size="small" disabled={locked} placeholder="e.g. AIIMS" value={f("degreeInstitution")} onChange={e=>s("degreeInstitution",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={3}><FL>Passing Year *</FL><TextField fullWidth size="small" type="number" disabled={locked} placeholder="2010" value={f("degreePassingYear")} onChange={e=>s("degreePassingYear",e.target.value)} sx={fSx}/></Grid></Grid><Divider sx={{mb:2.5,borderColor:"#e8ecf5"}}/><SHead color="#059669">Experience</SHead><Grid container spacing={2.5}><Grid item xs={12} sm={5}><FL>Areas of Expertise</FL><TextField fullWidth size="small" disabled={locked} placeholder="Diabetes, Hypertension…" value={f("areasOfExpertise")} onChange={e=>s("areasOfExpertise",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={3}><FL>Total Experience (years) *</FL><TextField fullWidth size="small" type="number" disabled={locked} placeholder="12" value={f("totalExperienceYears")} onChange={e=>s("totalExperienceYears",e.target.value)} sx={fSx}/></Grid></Grid></Box>}
//       {step===2&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:3}}>Current Practice Details</Typography><Grid container spacing={2.5}><Grid item xs={12} sm={5}><FL>Hospital Name *</FL><TextField fullWidth size="small" disabled={locked} placeholder="City General Hospital" value={f("currentHospitalName")} onChange={e=>s("currentHospitalName",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={7}><FL>Hospital Address</FL><TextField fullWidth size="small" disabled={locked} value={f("currentHospitalAddress")} onChange={e=>s("currentHospitalAddress",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={4}><FL>City</FL><TextField fullWidth size="small" disabled={locked} value={f("clinicCity")} onChange={e=>s("clinicCity",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={4}><FL>State</FL><TextField fullWidth size="small" disabled={locked} value={f("clinicState")} onChange={e=>s("clinicState",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={4}><FL>Consultation Days</FL><TextField fullWidth size="small" disabled={locked} placeholder="Mon–Fri" value={f("consultationDays")} onChange={e=>s("consultationDays",e.target.value)} sx={fSx}/></Grid></Grid></Box>}
//       {step===3&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:1}}>Upload Documents</Typography><InfoNote text="Required: Aadhaar Card, Medical Registration Certificate, and Degree Certificate."/>{locked?<Box sx={{background:"#f5f7ff",borderRadius:"14px",p:3,textAlign:"center"}}><Typography sx={{color:"#8892b0"}}>Documents submitted — editing disabled while under review.</Typography></Box>:<Grid container spacing={2.5}><Grid item xs={12} sm={6}><UploadZone label="Aadhaar Card *" field="aadhaarFile" doctorId={doctor.id} currentFile={f("aadhaarFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid><Grid item xs={12} sm={6}><UploadZone label="Registration Certificate *" field="medicalCertificateFile" doctorId={doctor.id} currentFile={f("medicalCertificateFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid><Grid item xs={12} sm={6}><UploadZone label="Degree Certificate *" field="degreeFile" doctorId={doctor.id} currentFile={f("degreeFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid><Grid item xs={12} sm={6}><UploadZone label="Professional Photo *" field="photoFile" doctorId={doctor.id} currentFile={f("photoFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid></Grid>}</Box>}
//       {step===4&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:3}}>About You & Submit</Typography><div className="field-label">Professional Bio</div><TextField fullWidth multiline rows={4} disabled={locked} placeholder="Describe your approach to medicine…" value={f("aboutMe")} onChange={e=>s("aboutMe",e.target.value)} sx={{...fSx,mb:3,"& .MuiOutlinedInput-root":{borderRadius:"12px",background:"#f8f9ff"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5"}}}/><Box sx={{background:"#f5f7ff",borderRadius:"14px",p:3,border:"1px solid #e8ecf5"}}><Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:2}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.05rem",fontWeight:700,color:"#1a1f36"}}>Checklist</Typography><Chip label={`${done}/${checklist.length}`} size="small" sx={{background:allOk?"#ecfdf5":"#fff7ed",color:allOk?"#059669":"#d97706",fontWeight:700}}/></Box><Grid container spacing={1}>{checklist.map(([item,isDone])=>(<Grid item xs={12} sm={6} key={item}><Box sx={{display:"flex",alignItems:"center",gap:1.2}}><Box sx={{width:18,height:18,borderRadius:"50%",flexShrink:0,background:isDone?"#ecfdf5":"#fff1f2",border:`1.5px solid ${isDone?"rgba(5,150,105,.4)":"rgba(225,29,72,.2)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{isDone?<CheckIcon sx={{fontSize:11,color:"#059669"}}/>:<CloseIcon sx={{fontSize:10,color:"#fca5a5"}}/>}</Box><Typography sx={{fontSize:".8rem",color:isDone?"#059669":"#8892b0",fontWeight:isDone?600:400}}>{item}</Typography></Box></Grid>))}</Grid></Box></Box>}
//     </motion.div></AnimatePresence></Card>
//     <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:2,flexWrap:"wrap"}}><Box sx={{display:"flex",gap:1.5}}>{step>0&&<Button variant="outlined" startIcon={<ChevronLeftIcon/>} onClick={()=>setStep(s=>s-1)} sx={{borderRadius:"12px",textTransform:"none",fontWeight:600,borderColor:"#e8ecf5",color:"#4a5278"}}>Back</Button>}{!locked&&<Button variant="outlined" onClick={handleSave} disabled={saving} sx={{borderRadius:"12px",textTransform:"none",fontWeight:600,borderColor:"rgba(79,110,247,.3)",color:"#4f6ef7"}}>{saving?"Saving…":"Save Progress"}</Button>}</Box><Box sx={{display:"flex",gap:1.5}}>{step<STEPS.length-1&&<Button variant="contained" endIcon={<ChevronRightIcon/>} onClick={async()=>{await handleSave();setStep(s=>s+1);}} disabled={saving||locked} sx={{borderRadius:"12px",textTransform:"none",fontWeight:700,background:"linear-gradient(135deg,#4f6ef7,#7c3aed)"}}>Save & Next</Button>}{step===STEPS.length-1&&!locked&&<Button variant="contained" endIcon={<SendIcon/>} onClick={handleSubmit} disabled={saving||!allOk} sx={{borderRadius:"12px",textTransform:"none",fontWeight:700,px:3,background:allOk?"linear-gradient(135deg,#059669,#34d399)":"#e2e8f0",color:allOk?"#fff":"#94a3b8"}}>{saving?"Submitting…":"Submit for Review"}</Button>}</Box></Box>
//   </Box>);
// }

// function VerificationGate({status,remarks,onGoToProfile}) {
//   const cfg={INCOMPLETE:{icon:"🔒",title:"Complete Your Profile First",sub:"Submit credentials for verification.",btnLabel:"Complete My Profile →",btnBg:"linear-gradient(135deg,#d97706,#f59e0b)",bg:"linear-gradient(135deg,#fffbeb,#fef9ee)",border:"#fcd34d"},PENDING:{icon:"⏳",title:"Verification Under Review",sub:"Profile is being reviewed. Patient access unlocks automatically once approved.",btnLabel:"View Submission Status",btnBg:"linear-gradient(135deg,#3b82f6,#60a5fa)",bg:"linear-gradient(135deg,#eff6ff,#dbeafe)",border:"rgba(59,130,246,.3)"},REJECTED:{icon:"❌",title:"Verification Rejected",sub:`Admin remarks: "${remarks||"Please update and resubmit."}". Fix issues and resubmit.`,btnLabel:"Update & Resubmit →",btnBg:"linear-gradient(135deg,#e11d48,#f43f5e)",bg:"linear-gradient(135deg,#fff1f2,#ffe4e6)",border:"rgba(225,29,72,.25)"}};
//   const c=cfg[status]||cfg.INCOMPLETE;
//   return (<Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",textAlign:"center",px:3}}>
//     <Box sx={{width:120,height:120,borderRadius:"50%",background:c.bg,border:`2px solid ${c.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3.2rem",mb:3}}>{c.icon}</Box>
//     <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.9rem",fontWeight:700,color:"#1a1f36",mb:1}}>{c.title}</Typography>
//     <Typography sx={{fontSize:".88rem",color:"#4a5278",maxWidth:520,lineHeight:1.7,mb:3}}>{c.sub}</Typography>
//     <Button variant="contained" onClick={onGoToProfile} sx={{borderRadius:"14px",textTransform:"none",fontWeight:700,px:4,py:1.4,fontSize:".92rem",background:c.btnBg}}>{c.btnLabel}</Button>
//   </Box>);
// }

// // ── MAIN DoctorDashboard ──────────────────────────────────────────────────────
// export default function DoctorDashboard() {
//   const{user}=useContext(AuthContext);
//   const userId=user?.id||localStorage.getItem("userId");
//   const navigate=useNavigate();

//   const[doctor,        setDoctor]        =useState(null);
//   const[appointments,  setAppointments]  =useState([]);
//   const[prescriptions, setPrescriptions] =useState({});
//   const[payments,      setPayments]      =useState({}); // key = appointmentId
//   const[verification,  setVerification]  =useState(null);
//   const[loading,       setLoading]       =useState(true);
//   const[profileMissing,setProfileMissing]=useState(false);
//   const[sidebarOpen,   setSidebarOpen]   =useState(false);
//   const[view,          setView]          =useState("dashboard");
//   const[selectedAppt,  setSelectedAppt]  =useState(null);
//   const[rxAppt,        setRxAppt]        =useState(null);
//   const[docReqDialog,  setDocReqDialog]  =useState(null);
//   const[docReqMsg,     setDocReqMsg]     =useState("");
//   const[docReqLoading, setDocReqLoading] =useState(false);

//   useEffect(()=>{
//     const fetchData=async()=>{
//       let doc;
//       try{const r=await axios.get(`${BASE}/doctor/user/${userId}`);if(!r.data?.id){setProfileMissing(true);setLoading(false);return;}doc=r.data;setDoctor(doc);}
//       catch(err){if(err.response?.status===404)setProfileMissing(true);setLoading(false);return;}

//       let appts=[];
//       try{const r=await axios.get(`${BASE}/appointments/doctor/${doc.id}`);appts=r.data;setAppointments(appts);}catch{}

//       // FIX: load prescriptions as map keyed by appointmentId
//       try{const r=await axios.get(`${BASE}/prescriptions/doctor/${doc.id}`);const m={};r.data.forEach(rx=>{if(rx.appointment?.id)m[rx.appointment.id]=rx;});setPrescriptions(m);}catch{}

//       // FIX: load payments correctly — key by appointmentId, only SUCCESS ones
//       try{
//         const approvedAppts=appts.filter(a=>a.status==="APPROVED");
//         const pm={};
//         await Promise.all(approvedAppts.map(async a=>{
//           try{
//             const r=await axios.get(`${BASE}/payments/appointment/${a.id}`);
//             if(r.data&&r.data.status==="SUCCESS"){
//               pm[a.id]={status:"SUCCESS",paymentId:r.data.id};
//             }
//           }catch{}
//         }));
//         setPayments(pm);
//       }catch{}

//       try{const r=await axios.get(`${BASE}/doctor-verification/doctor/${doc.id}`);setVerification(r.data);}catch{}
//       setLoading(false);
//     };
//     if(userId)fetchData();
//   },[userId]);

//   const acceptAppointment=async id=>{await axios.put(`${BASE}/appointments/${id}/approve`);setAppointments(p=>p.map(a=>a.id===id?{...a,status:"APPROVED"}:a));};
//   const rejectAppointment=async id=>{await axios.put(`${BASE}/appointments/${id}/reject`);setAppointments(p=>p.filter(a=>a.id!==id));};
//   const handleLogout=()=>{localStorage.removeItem("user");navigate("/");};
//   const handleNavClick=key=>{setView(key);setSidebarOpen(false);};

//   // FIX: After saving prescription, reload from server
//   const handleRxSaved=async()=>{
//     try{
//       const r=await axios.get(`${BASE}/prescriptions/doctor/${doctor.id}`);
//       const m={};r.data.forEach(rx=>{if(rx.appointment?.id)m[rx.appointment.id]=rx;});
//       setPrescriptions(m);
//     }catch{}
//   };

//   const handleDocRequest=async(appt)=>{
//     setDocReqLoading(true);
//     try{const res=await axios.put(`${BASE}/appointments/${appt.id}/request-docs`,{message:docReqMsg});setAppointments(prev=>prev.map(a=>a.id===appt.id?res.data:a));setDocReqDialog(null);setDocReqMsg("");}
//     catch{alert("Failed to send request.");}
//     finally{setDocReqLoading(false);}
//   };

//   if(profileMissing)return<DoctorProfileForm userId={userId} onCreated={doc=>{setDoctor(doc);setProfileMissing(false);}}/>;
//   if(loading)return<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>;

//   const pending        =appointments.filter(a=>a.status==="PENDING");
//   const approved       =appointments.filter(a=>a.status==="APPROVED");
//   const uniquePatients =new Set(approved.map(a=>a.patient?.id)).size;
//   const verifStatus    =verification?.status||"INCOMPLETE";
//   const isApproved     =verifStatus==="APPROVED";
//   const verifBadge     ={INCOMPLETE:"#f59e0b",PENDING:"#3b82f6",APPROVED:"#059669",REJECTED:"#e11d48"}[verifStatus];
//   const PATIENT_VIEWS  =["pending","approved","records","prescriptions"];
//   const isPatientView  =PATIENT_VIEWS.includes(view);

//   // FIX: helper to check if appointment is paid
//   const isApptPaid = (apptId) => payments[apptId]?.status === "SUCCESS";

//   const menuItems=[
//     {key:"dashboard",       label:"Dashboard",             icon:<DashboardIcon     sx={{fontSize:18}}/>},
//     {key:"pending",         label:"Pending Requests",      icon:<EventIcon         sx={{fontSize:18}}/>,locked:!isApproved},
//     {key:"approved",        label:"Approved Appointments", icon:<CheckCircleIcon   sx={{fontSize:18}}/>,locked:!isApproved},
//     {key:"records",         label:"Patient Records",       icon:<FolderSharedIcon  sx={{fontSize:18}}/>,locked:!isApproved},
//     {key:"prescriptions",   label:"Prescriptions",         icon:<LocalPharmacyIcon sx={{fontSize:18}}/>,locked:!isApproved},
//     {key:"profile",         label:"My Profile",            icon:<PersonIcon        sx={{fontSize:18}}/>},
//     {key:"complete-profile",label:"Get Verified",          icon:<BadgeIcon         sx={{fontSize:18}}/>,badge:verifBadge},
//   ];

//   return (
//     <Box sx={{minHeight:"100vh",background:"#f5f7ff",fontFamily:"'Outfit',sans-serif"}}>
//       <div className="doc-blob doc-blob-1"/>
//       <div className="doc-blob doc-blob-2"/>
//       {sidebarOpen&&<div className="doc-overlay" onClick={()=>setSidebarOpen(false)}/>}

//       {/* Sidebar */}
//       <div className={`doc-sidebar ${sidebarOpen?"open":"closed"}`}>
//         <div className="doc-sidebar-top"><div className="doc-logo"><div className="doc-logo-icon">✦</div>Med<span className="doc-logo-accent">Vault</span></div><div className="doc-close-btn" onClick={()=>setSidebarOpen(false)}><CloseIcon sx={{fontSize:16}}/></div></div>
//         <div className="doc-nav-label">Navigation</div>
//         {menuItems.map(item=>(<NavItem key={item.key} icon={item.icon} label={item.label} active={view===item.key} onClick={()=>handleNavClick(item.key)} badge={item.badge} locked={item.locked}/>))}
//         <div className="doc-sidebar-spacer"/>
//         <div className="doc-user-card"><div className="doc-user-av">{doctor?.name?.charAt(0)}</div><Box><Typography sx={{fontSize:".85rem",fontWeight:600,color:"#1a1f36",lineHeight:1.2}}>Dr. {doctor?.name}</Typography><Typography sx={{fontSize:".72rem",color:"#8892b0"}}>{doctor?.specialization}</Typography></Box></div>
//         <button onClick={handleLogout} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:11,cursor:"pointer",fontSize:".875rem",fontWeight:500,color:"#e11d48",border:"1px solid transparent",background:"none",width:"100%",fontFamily:"'Outfit',sans-serif"}} onMouseEnter={e=>{e.currentTarget.style.background="#fff1f3";}} onMouseLeave={e=>{e.currentTarget.style.background="none";}}><div className="doc-nav-icon" style={{background:"#fff1f3",color:"#e11d48"}}><LogoutIcon sx={{fontSize:16}}/></div>Sign Out</button>
//       </div>

//       {/* Topbar */}
//       <div className="doc-topbar">
//         <div className="doc-topbar-left"><div className="doc-hamburger" onClick={()=>setSidebarOpen(true)}><MenuIcon sx={{fontSize:20}}/></div><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:"1.3rem",color:"#4f6ef7"}}>Med<span style={{color:"#7c3aed"}}>Vault</span></Typography></div>
//         <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
//           {isApproved?<Chip icon={<VerifiedIcon sx={{fontSize:14}}/>} label="Verified Doctor" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.25)",fontWeight:600,fontSize:".72rem"}}/>:<Chip label={verifStatus==="PENDING"?"⏳ Under Review":verifStatus==="REJECTED"?"❌ Rejected":"⚠ Verification Required"} size="small" onClick={()=>handleNavClick("complete-profile")} sx={{cursor:"pointer",fontWeight:600,fontSize:".72rem",background:verifStatus==="PENDING"?"#eff6ff":verifStatus==="REJECTED"?"#fff1f2":"#fffbeb",color:verifStatus==="PENDING"?"#3b82f6":verifStatus==="REJECTED"?"#e11d48":"#d97706"}}/>}
//           <Button startIcon={<LogoutIcon/>} onClick={handleLogout} size="small" sx={{color:"#e11d48",borderColor:"rgba(225,29,72,.3)",textTransform:"none",borderRadius:2,border:"1px solid",fontFamily:"'Outfit',sans-serif"}}>Logout</Button>
//         </Box>
//       </div>

//       {/* Content */}
//       <Box sx={{p:{xs:2,md:"36px 44px"},position:"relative",zIndex:1}}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}}>
//             {isPatientView&&!isApproved?<VerificationGate status={verifStatus} remarks={verification?.adminRemarks} onGoToProfile={()=>handleNavClick("complete-profile")}/>:(<>

//               {/* DASHBOARD */}
//               {view==="dashboard"&&(<>
//                 <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Welcome, Dr. {doctor?.name?.split(" ")[0]} 👨‍⚕️</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Here's your practice overview</Typography></Box>
//                 {!isApproved&&<Box onClick={()=>handleNavClick("complete-profile")} sx={{cursor:"pointer",mb:3,p:2.5,borderRadius:"16px",background:verifStatus==="PENDING"?"linear-gradient(135deg,#eff6ff,#dbeafe)":verifStatus==="REJECTED"?"linear-gradient(135deg,#fff1f2,#ffe4e6)":"linear-gradient(135deg,#fffbeb,#fef3c7)",border:`1.5px solid ${verifStatus==="PENDING"?"rgba(59,130,246,.3)":verifStatus==="REJECTED"?"rgba(225,29,72,.25)":"#fcd34d"}`,display:"flex",alignItems:"center",gap:2,"&:hover":{boxShadow:"0 6px 24px rgba(0,0,0,.08)"},transition:"all .2s"}}>
//                   {verifStatus==="PENDING"&&<HourglassTopIcon sx={{color:"#3b82f6",fontSize:28,flexShrink:0}}/>}{verifStatus==="REJECTED"&&<ErrorOutlineIcon sx={{color:"#e11d48",fontSize:28,flexShrink:0}}/>}{verifStatus==="INCOMPLETE"&&<BadgeIcon sx={{color:"#d97706",fontSize:28,flexShrink:0}}/>}
//                   <Box sx={{flex:1}}><Typography sx={{fontWeight:700,fontSize:".92rem",color:"#1a1f36"}}>{verifStatus==="PENDING"?"Profile under review — patient access will unlock once approved":verifStatus==="REJECTED"?"Verification rejected — update and resubmit":"Complete your verification profile to start receiving patients"}</Typography></Box>
//                   <ChevronRightIcon sx={{color:"#8892b0",flexShrink:0}}/>
//                 </Box>}
//                 <div className="doc-hero">
//                   <Avatar className="av-blue" sx={{width:80,height:80,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 8px 24px rgba(79,110,247,.3)",flexShrink:0}}>{doctor?.name?.charAt(0)}</Avatar>
//                   <Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:"#1a1f36"}}>Dr. {doctor?.name}</Typography><Typography sx={{color:"#8892b0",fontSize:".82rem",mt:.5}}>{isApproved?"✓ Verified Doctor · Active on MedVault":"Pending Verification"}</Typography><Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>{[doctor?.qualification,doctor?.specialization,doctor?.experience?`${doctor.experience} yrs exp`:null,doctor?.consultationFee?`₹${doctor.consultationFee} fee`:null].filter(Boolean).map((v,i)=>(<Chip key={i} label={v} size="small" sx={{background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:500,fontSize:".75rem"}}/>))}{isApproved&&<Chip icon={<VerifiedIcon sx={{fontSize:13}}/>} label="Verified" size="small" sx={{background:"#ecfdf5",color:"#059669",fontWeight:600}}/>}</Box></Box>
//                 </div>
//                 <Grid container spacing={2.5} sx={{mb:4}}>
//                   <Grid item xs={6} sm={3}><StatCard label="Pending"       value={isApproved?pending.length:"—"}       icon="⏳" color="#d97706"/></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Approved"      value={isApproved?approved.length:"—"}      icon="✓"  color="#059669"/></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Patients"      value={isApproved?uniquePatients:"—"}       icon="👥" color="#4f6ef7"/></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Prescriptions" value={isApproved?Object.keys(prescriptions).length:"—"} icon="💊" color="#7c3aed"/></Grid>
//                 </Grid>
//                 {isApproved&&pending.length>0&&(<><div className="doc-sec-heading">Recent Pending Requests</div><Grid container spacing={2.5}>{pending.slice(0,3).map((appt,i)=>(<Grid item xs={12} md={4} key={appt.id}><Card className="doc-pending-card"><CardContent sx={{p:"20px !important"}}><Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}><Avatar className={["av-blue","av-violet","av-teal","av-amber"][i%4]} sx={{width:44,height:44,borderRadius:"12px",fontSize:"1rem",fontWeight:700}}>{appt.patient?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontWeight:600,fontSize:".92rem",color:"#1a1f36"}}>{appt.patient?.name}</Typography><Typography sx={{fontSize:".75rem",color:"#8892b0"}}>{appt.date} · {appt.timeSlot}</Typography></Box></Box><Box sx={{display:"flex",gap:1}}><Button size="small" variant="contained" onClick={()=>acceptAppointment(appt.id)} sx={{flex:1,background:"linear-gradient(135deg,#059669,#34d399)",borderRadius:"9px",textTransform:"none",fontWeight:600}}>✓ Accept</Button><Button size="small" variant="outlined" onClick={()=>rejectAppointment(appt.id)} sx={{flex:1,borderColor:"rgba(225,29,72,.3)",color:"#e11d48",borderRadius:"9px",textTransform:"none",fontWeight:600}}>✕ Reject</Button></Box></CardContent></Card></Grid>))}</Grid></>)}
//               </>)}

//               {/* PENDING */}
//               {view==="pending"&&(<>
//                 <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Pending Requests</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{pending.length} awaiting response</Typography></Box>
//                 {pending.length===0?<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>✓</Typography><Typography sx={{fontWeight:500}}>All caught up!</Typography></Box>:(
//                   <Grid container spacing={2.5}>{pending.map((appt,i)=>(<Grid item xs={12} md={4} key={appt.id}><motion.div whileHover={{scale:1.02}}><Card className="doc-pending-card"><CardContent sx={{p:"24px !important"}}>
//                     <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:2}}><Avatar className={["av-blue","av-violet","av-teal","av-amber"][i%4]} sx={{width:48,height:48,borderRadius:"14px",fontSize:"1.1rem",fontWeight:700}}>{appt.patient?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontWeight:600,fontSize:".95rem",color:"#1a1f36"}}>{appt.patient?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>Age {appt.patient?.age}</Typography></Box><Chip label="Pending" size="small" sx={{ml:"auto",background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".7rem"}}/></Box>
//                     <Divider sx={{mb:1.5,borderColor:"#f0f2f8"}}/>
//                     <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:.6}}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
//                     <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:1.5}}>📝 {appt.description||"No description"}</Typography>
//                     <Box sx={{display:"flex",gap:1}}><Button variant="contained" onClick={()=>acceptAppointment(appt.id)} sx={{flex:1,background:"linear-gradient(135deg,#059669,#34d399)",borderRadius:"9px",textTransform:"none",fontWeight:600}}>✓ Accept</Button><Button variant="outlined" onClick={()=>rejectAppointment(appt.id)} sx={{flex:1,borderColor:"rgba(225,29,72,.3)",color:"#e11d48",borderRadius:"9px",textTransform:"none",fontWeight:600}}>✕ Reject</Button></Box>
//                   </CardContent></Card></motion.div></Grid>))}</Grid>
//                 )}
//               </>)}

//               {/* APPROVED — FIX: show correct payment status, lock Rx properly */}
//               {view==="approved"&&(<>
//                 <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Approved Appointments</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{approved.length} confirmed</Typography></Box>
//                 {approved.length===0?<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>📋</Typography><Typography sx={{fontWeight:500}}>No approved appointments yet.</Typography></Box>:(
//                   <Grid container spacing={2.5}>{approved.map(appt=>{
//                     const hasPrescription=!!prescriptions[appt.id];
//                     const isPaid=isApptPaid(appt.id);
//                     const docStatus=appt.docRequestStatus||"DOC_REQUEST_NONE";
//                     return (
//                       <Grid item xs={12} md={4} key={appt.id}><motion.div whileHover={{scale:1.02}}>
//                         <Card className="doc-approved-card" onClick={()=>setSelectedAppt(appt)} sx={{cursor:"pointer"}}>
//                           <CardContent sx={{p:"24px !important"}}>
//                             <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:2}}>
//                               <Avatar className="av-green" sx={{width:48,height:48,borderRadius:"14px",fontSize:"1.1rem",fontWeight:700}}>{appt.patient?.name?.charAt(0)}</Avatar>
//                               <Box><Typography sx={{fontWeight:600,fontSize:".95rem",color:"#1a1f36"}}>{appt.patient?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>Age {appt.patient?.age}</Typography></Box>
//                               <Chip label="Approved" size="small" sx={{ml:"auto",background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.25)",fontWeight:600,fontSize:".7rem"}}/>
//                             </Box>
//                             <Divider sx={{mb:1.5,borderColor:"#f0f2f8"}}/>
//                             <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:.6}}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
//                             <Box sx={{display:"flex",gap:1,mt:1.5,mb:1.5,flexWrap:"wrap"}}>
//                               {/* FIX: Show actual payment status */}
//                               {isPaid
//                                 ?<Chip label="✓ Payment Received" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".7rem"}}/>
//                                 :<Chip icon={<LockIcon sx={{fontSize:11}}/>} label="Awaiting Payment" size="small" sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".7rem"}}/>
//                               }
//                               {hasPrescription&&<Chip label="Rx Written ✓" size="small" sx={{background:"#eef1fe",color:"#4f6ef7",fontWeight:600,fontSize:".7rem"}}/>}
//                             </Box>

//                             {/* FIX: Write Rx button — clearly locked or unlocked */}
//                             <Button fullWidth size="small" variant="contained"
//                               startIcon={isPaid?<EditNoteIcon sx={{fontSize:15}}/>:<LockIcon sx={{fontSize:15}}/>}
//                               onClick={e=>{e.stopPropagation();setRxAppt(appt);}}
//                               sx={{background:isPaid?"linear-gradient(135deg,#059669,#34d399)":"#e2e8f0",color:isPaid?"#fff":"#94a3b8",borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".82rem",boxShadow:"none",mb:1}}>
//                               {isPaid?(hasPrescription?"Edit Rx":"Write Rx"):"Locked — Awaiting Patient Payment"}
//                             </Button>

//                             {/* Document request section */}
//                             {docStatus==="DOC_REQUEST_NONE"&&isPaid&&(
//                               <Button fullWidth size="small" variant="outlined"
//                                 startIcon={<AssignmentIcon sx={{fontSize:14}}/>}
//                                 onClick={e=>{e.stopPropagation();setDocReqDialog(appt);setDocReqMsg("");}}
//                                 sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".78rem",borderColor:"rgba(79,110,247,.35)",color:"#4f6ef7","&:hover":{background:"#eef1fe"}}}>
//                                 📋 Request Documents
//                               </Button>
//                             )}
//                             {docStatus==="DOC_REQUEST_PENDING"&&<Chip label="⏳ Awaiting Patient Documents" size="small" sx={{background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".7rem",width:"100%",justifyContent:"center"}}/>}
//                             {docStatus==="DOC_REQUEST_DONE"&&appt.docFileName&&(
//                               <a href={`${BASE}/appointments/doc/${appt.docFileName}`} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5,padding:"6px 12px",borderRadius:8,fontSize:".78rem",fontWeight:600,textDecoration:"none",background:"linear-gradient(135deg,#059669,#34d399)",color:"#fff"}}>📄 View Patient Documents</a>
//                             )}
//                           </CardContent>
//                         </Card>
//                       </motion.div></Grid>
//                     );
//                   })}</Grid>
//                 )}
//               </>)}

//               {/* RECORDS */}
//               {view==="records"&&(<>
//                 <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Patient Records</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{uniquePatients} unique patients</Typography></Box>
//                 {approved.length===0?<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>👥</Typography><Typography sx={{fontWeight:500}}>No records yet.</Typography></Box>:(
//                   <Grid container spacing={2.5}>{approved.map((appt,i)=>(<Grid item xs={12} sm={6} md={4} key={appt.id}><motion.div whileHover={{scale:1.02}}><Card className="doc-patient-card" onClick={()=>setSelectedAppt(appt)}><CardContent sx={{p:"22px !important"}}>
//                     <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}><Avatar className={["av-blue","av-violet","av-teal","av-amber","av-green"][i%5]} sx={{width:46,height:46,borderRadius:"13px",fontSize:"1.1rem",fontWeight:700}}>{appt.patient?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontWeight:600,fontSize:".93rem",color:"#1a1f36"}}>{appt.patient?.name}</Typography><Typography sx={{fontSize:".75rem",color:"#8892b0"}}>Age {appt.patient?.age} · {appt.patient?.gender}</Typography></Box></Box>
//                     <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mt:1.5}}>
//                       <Chip label={appt.report||appt.reportFileName?"📄 Report":"No Report"} size="small" sx={{background:appt.report||appt.reportFileName?"#eef1fe":"#f5f7ff",color:appt.report||appt.reportFileName?"#4f6ef7":"#8892b0",fontSize:".72rem"}}/>
//                       <Typography sx={{fontSize:".76rem",color:"#4f6ef7",fontWeight:600}}>View →</Typography>
//                     </Box>
//                   </CardContent></Card></motion.div></Grid>))}</Grid>
//                 )}
//               </>)}

//               {/* PRESCRIPTIONS — FIX: show only appointments with prescriptions written */}
//               {view==="prescriptions"&&(<>
//                 <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Prescriptions</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{Object.keys(prescriptions).length} written</Typography></Box>
//                 {Object.keys(prescriptions).length===0?<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>💊</Typography><Typography sx={{fontWeight:500}}>No prescriptions written yet.</Typography><Typography sx={{fontSize:".82rem",mt:.5}}>Write prescriptions from the Approved Appointments tab after patient pays.</Typography></Box>:(
//                   Object.values(prescriptions).map(rx=>{
//                     const appt=approved.find(a=>a.id===rx.appointment?.id);
//                     if(!rx.diagnosis)return null; // FIX: skip empty prescriptions
//                     return (<div key={rx.id} className="rx-card">
//                       <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
//                         <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><LocalPharmacyIcon sx={{color:"#059669",fontSize:22}}/></Box>
//                         <Box sx={{flex:1}}>
//                           <Box sx={{display:"flex",alignItems:"center",gap:1.5,flexWrap:"wrap",mb:.5}}><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>{appt?.patient?.name||"Patient"}</Typography><Chip label={rx.issuedDate||"—"} size="small" sx={{background:"#f5f7ff",color:"#8892b0",fontSize:".68rem",height:20}}/></Box>
//                           <Typography sx={{fontSize:".82rem",color:"#059669",fontWeight:600,mb:.5}}>🩺 {rx.diagnosis}</Typography>
//                           {rx.medicines&&<Box sx={{background:"#f8f9ff",borderRadius:"10px",p:1.5,my:1,border:"1px solid #e8ecf5"}}><Typography sx={{fontSize:".72rem",color:"#8892b0",fontWeight:600,textTransform:"uppercase",letterSpacing:".8px",mb:.5}}>Medicines</Typography><Typography sx={{fontSize:".83rem",color:"#1a1f36",whiteSpace:"pre-line"}}>{rx.medicines}</Typography></Box>}
//                           {rx.instructions&&<Typography sx={{fontSize:".8rem",color:"#4a5278"}}>📋 {rx.instructions}</Typography>}
//                           {rx.followUpDate&&<Typography sx={{fontSize:".8rem",color:"#d97706",mt:.4}}>📅 Follow-up: {rx.followUpDate}</Typography>}
//                         </Box>
//                         <Button size="small" variant="outlined" onClick={()=>setRxAppt(appt)} startIcon={<EditNoteIcon sx={{fontSize:14}}/>} sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".75rem",borderColor:"rgba(5,150,105,.3)",color:"#059669",flexShrink:0,"&:hover":{background:"#ecfdf5"}}}>Edit</Button>
//                       </Box>
//                     </div>);
//                   })
//                 )}
//               </>)}

//               {/* PROFILE */}
//               {view==="profile"&&(<>
//                 <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>My Profile</Typography></Box>
//                 <Card className="doc-card" sx={{p:4}}>
//                   <Box sx={{display:"flex",alignItems:"center",gap:2.5,mb:3}}><Avatar className="av-blue" sx={{width:76,height:76,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700}}>{doctor?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>Dr. {doctor?.name}</Typography><Box sx={{display:"flex",gap:1,mt:.8}}>{isApproved?<Chip icon={<VerifiedIcon sx={{fontSize:13}}/>} label="Verified" size="small" sx={{background:"#ecfdf5",color:"#059669",fontWeight:600}}/>:<Chip label={verifStatus==="PENDING"?"Under Review":"Not Verified"} size="small" sx={{background:"#fff7ed",color:"#d97706",fontWeight:600}}/>}</Box></Box></Box>
//                   <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//                   <Grid container spacing={3}>{[["Full Name",`Dr. ${doctor?.name}`],["Gender",doctor?.gender],["Email",doctor?.email],["Phone",doctor?.contact],["Specialization",doctor?.specialization],["Qualification",doctor?.qualification],["Experience",doctor?.experience?`${doctor.experience} years`:"—"],["Consultation Fee",doctor?.consultationFee?`₹${doctor.consultationFee}`:"—"],["Hospital",doctor?.hospital],["Doctor ID",`#${doctor?.id}`]].map(([l,v])=>(<Grid item xs={12} sm={6} key={l}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1.1px",color:"#8892b0",fontWeight:600,mb:.6}}>{l}</Typography><Typography sx={{fontSize:".95rem",fontWeight:500,color:"#1a1f36"}}>{v||"—"}</Typography></Grid>))}</Grid>
//                 </Card>
//               </>)}

//               {/* COMPLETE PROFILE */}
//               {view==="complete-profile"&&<CompleteProfileView doctor={doctor} verification={verification} onVerificationChange={setVerification}/>}

//             </>)}
//           </motion.div>
//         </AnimatePresence>
//       </Box>

//       {/* Request Documents Dialog */}
//       <Dialog open={Boolean(docReqDialog)} onClose={()=>setDocReqDialog(null)} maxWidth="sm" fullWidth PaperProps={{sx:{borderRadius:"20px",border:"1px solid #e8ecf5"}}}>
//         <DialogTitle sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36",borderBottom:"1px solid #e8ecf5"}}>📋 Request Health Documents</DialogTitle>
//         <DialogContent sx={{pt:"24px !important"}}>
//           <Typography sx={{fontSize:".88rem",color:"#4a5278",mb:2}}>Request <strong>{docReqDialog?.patient?.name}</strong> to upload specific health documents. They will see a notification in their "Doc Requests" tab.</Typography>
//           <TextField fullWidth multiline rows={3} label="What documents do you need? (optional)" placeholder="e.g. Please upload your latest blood test report and ECG scan from the past 3 months." value={docReqMsg} onChange={e=>setDocReqMsg(e.target.value)} sx={{"& .MuiOutlinedInput-root":{borderRadius:"12px",background:"#f8f9ff"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5"}}}/>
//         </DialogContent>
//         <DialogActions sx={{p:"16px 24px",borderTop:"1px solid #e8ecf5",gap:1}}>
//           <Button onClick={()=>setDocReqDialog(null)} sx={{color:"#8892b0",textTransform:"none",fontWeight:600}}>Cancel</Button>
//           <Button onClick={()=>handleDocRequest(docReqDialog)} variant="contained" disabled={docReqLoading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:700,px:3}}>{docReqLoading?"Sending…":"Send Request"}</Button>
//         </DialogActions>
//       </Dialog>

//       <PatientModal appt={selectedAppt} open={Boolean(selectedAppt)} onClose={()=>setSelectedAppt(null)} onWriteRx={appt=>setRxAppt(appt)} payments={payments}/>
//       <WritePrescriptionModal appt={rxAppt} open={Boolean(rxAppt)} onClose={()=>setRxAppt(null)} onSaved={handleRxSaved} payments={payments}/>
//     </Box>
//   );
// }


import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import DoctorProfileForm from "./DoctorProfileForm";
import {
  Box, Typography, CircularProgress, Grid, Avatar, Card, CardContent,
  Button, Chip, Divider, Modal, IconButton, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import MenuIcon            from "@mui/icons-material/Menu";
import CloseIcon           from "@mui/icons-material/Close";
import LogoutIcon          from "@mui/icons-material/Logout";
import DashboardIcon       from "@mui/icons-material/Dashboard";
import EventIcon           from "@mui/icons-material/Event";
import CheckCircleIcon     from "@mui/icons-material/CheckCircle";
import PersonIcon          from "@mui/icons-material/Person";
import FolderSharedIcon    from "@mui/icons-material/FolderShared";
import DescriptionIcon     from "@mui/icons-material/Description";
import OpenInNewIcon       from "@mui/icons-material/OpenInNew";
import DownloadIcon        from "@mui/icons-material/Download";
import LocalPharmacyIcon   from "@mui/icons-material/LocalPharmacy";
import EditNoteIcon        from "@mui/icons-material/EditNote";
import CheckIcon           from "@mui/icons-material/Check";
import LockIcon            from "@mui/icons-material/Lock";
import BadgeIcon           from "@mui/icons-material/Badge";
import SchoolIcon          from "@mui/icons-material/School";
import LocalHospitalIcon   from "@mui/icons-material/LocalHospital";
import UploadFileIcon      from "@mui/icons-material/UploadFile";
import HourglassTopIcon    from "@mui/icons-material/HourglassTop";
import VerifiedIcon        from "@mui/icons-material/Verified";
import ErrorOutlineIcon    from "@mui/icons-material/ErrorOutline";
import ChevronRightIcon    from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon     from "@mui/icons-material/ChevronLeft";
import SendIcon            from "@mui/icons-material/Send";
import AssignmentIcon      from "@mui/icons-material/Assignment";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BASE = "http://localhost:8080";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
  body { font-family:'Outfit',sans-serif !important; }
  .doc-overlay { position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199; }
  .doc-sidebar { width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1); }
  .doc-sidebar.closed { transform:translateX(-100%); }
  .doc-sidebar.open   { transform:translateX(0); }
  .doc-sidebar-top { display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px; }
  .doc-logo { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px; }
  .doc-logo-icon { width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0; }
  .doc-logo-accent { color:#7c3aed; }
  .doc-close-btn { width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0; }
  .doc-close-btn:hover { background:#eef1fe;color:#4f6ef7; }
  .doc-nav-label { font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px; }
  .doc-nav-item { display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s;border:1px solid transparent;margin-bottom:3px;user-select:none; }
  .doc-nav-item:hover { background:#eef1fe;color:#4f6ef7; }
  .doc-nav-item.active { background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18); }
  .doc-nav-item.active .doc-nav-icon { background:#4f6ef7 !important;color:#fff !important; }
  .doc-nav-icon { width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278; }
  .doc-nav-item.locked-nav { opacity:.5;cursor:not-allowed; }
  .doc-sidebar-spacer { flex:1; }
  .doc-user-card { display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px; }
  .doc-user-av { width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem; }
  .doc-topbar { display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100; }
  .doc-topbar-left { display:flex;align-items:center;gap:14px; }
  .doc-hamburger { width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7; }
  .doc-hamburger:hover { background:#eef1fe; }
  .doc-blob { position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0; }
  .doc-blob-1 { width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px; }
  .doc-blob-2 { width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px; }
  .doc-hero { background:linear-gradient(135deg,#fff 55%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;display:flex;align-items:center;gap:28px;margin-bottom:28px; }
  .doc-stat { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden; }
  .doc-stat-value { font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1; }
  .doc-stat-label { font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px; }
  .doc-stat-icon  { position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07; }
  .doc-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06) !important; }
  .doc-pending-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #f59e0b !important;border-radius:18px !important; }
  .doc-approved-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #059669 !important;border-radius:18px !important; }
  .doc-patient-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:18px !important;cursor:pointer; }
  .doc-sec-heading { font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px; }
  .doc-sec-heading::after { content:'';flex:1;height:1px;background:#e8ecf5; }
  .patient-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:620px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
  .rx-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:560px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(5,150,105,.16);padding:36px;outline:none;max-height:90vh;overflow-y:auto; }
  .modal-field-label { font-size:.68rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px; }
  .modal-field-value { font-size:.92rem;font-weight:500;color:#1a1f36;margin-bottom:16px; }
  .rx-card { background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px; }
  .pay-lock-banner { background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:10px; }
  .av-blue   { background:linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
  .av-violet { background:linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
  .av-teal   { background:linear-gradient(135deg,#0891b2,#22d3ee) !important; }
  .av-amber  { background:linear-gradient(135deg,#d97706,#fbbf24) !important; }
  .av-green  { background:linear-gradient(135deg,#059669,#34d399) !important; }
  .field-label { font-size:.68rem;text-transform:uppercase;letter-spacing:1px;color:#8892b0;font-weight:600;margin-bottom:5px; }
  .verif-step-bar { display:flex;align-items:center;gap:0;margin-bottom:28px;overflow-x:auto;padding-bottom:4px; }
  .verif-step-pill { display:flex;align-items:center;gap:7px;padding:8px 14px;border-radius:40px;font-size:.76rem;font-weight:600;cursor:pointer;transition:all .22s;white-space:nowrap; }
  .verif-step-pill.done    { background:#ecfdf5;color:#059669;border:1.5px solid rgba(5,150,105,.25); }
  .verif-step-pill.active  { background:#eef1fe;color:#4f6ef7;border:1.5px solid rgba(79,110,247,.35);box-shadow:0 2px 10px rgba(79,110,247,.14); }
  .verif-step-pill.waiting { background:#f5f7ff;color:#b0b8d0;border:1.5px solid #e8ecf5; }
  .verif-step-connector { flex:1;height:2px;background:#e8ecf5;min-width:10px; }
  .verif-upload-zone { border:2px dashed #d4daf0;border-radius:14px;background:#f8f9ff;padding:22px 16px;display:flex;flex-direction:column;align-items:center;gap:9px;text-align:center;cursor:pointer;transition:all .2s; }
  .verif-upload-zone:hover { border-color:#4f6ef7;background:#eef1fe; }
  .verif-upload-zone.has-file { border-color:#059669;background:#ecfdf5;border-style:solid; }
  .verif-status-banner { border-radius:16px;padding:18px 22px;display:flex;align-items:flex-start;gap:15px;margin-bottom:26px; }
  .verif-status-banner.incomplete { background:linear-gradient(135deg,#f0f4ff,#eef1fe);border:1.5px solid rgba(79,110,247,.25); }
  .verif-status-banner.pending    { background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1.5px solid #fcd34d; }
  .verif-status-banner.approved   { background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1.5px solid rgba(5,150,105,.3); }
  .verif-status-banner.rejected   { background:linear-gradient(135deg,#fff1f2,#ffe4e6);border:1.5px solid rgba(225,29,72,.3); }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
  .fu { animation:fadeUp .38s cubic-bezier(.22,1,.36,1) both; }
`;
if (!document.getElementById("doc-css")) {
  const st = document.createElement("style"); st.id = "doc-css";
  st.textContent = CSS; document.head.appendChild(st);
}

function StatCard({label,value,icon,color}) {
  return (<div className="doc-stat fu"><div className="doc-stat-label">{label}</div><div className="doc-stat-value" style={{color}}>{value}</div><div className="doc-stat-icon">{icon}</div></div>);
}
function NavItem({icon,label,active,onClick,badge,locked}) {
  return (
    <div className={`doc-nav-item ${active?"active":""} ${locked?"locked-nav":""}`} onClick={locked?undefined:onClick}>
      <div className="doc-nav-icon">{icon}</div>
      <span style={{flex:1}}>{label}</span>
      {badge&&<span style={{width:9,height:9,borderRadius:"50%",background:badge,flexShrink:0}}/>}
      {locked&&<LockIcon sx={{fontSize:13,color:"#b0b8d0"}}/>}
    </div>
  );
}

function ReportViewer({filename}) {
  if(!filename)return(<Box sx={{border:"1.5px dashed #e8ecf5",borderRadius:"14px",p:2.5,background:"#f5f7ff",display:"flex",alignItems:"center",gap:1.5}}><DescriptionIcon sx={{color:"#b0b8d0",fontSize:22}}/><Typography sx={{fontSize:".82rem",color:"#8892b0"}}>No report uploaded by patient</Typography></Box>);
  const url=`${BASE}/appointments/report/${filename}`;const isPdf=filename.toLowerCase().endsWith(".pdf");
  return (<Box sx={{border:"1.5px dashed #d4daf0",borderRadius:"14px",background:"#f8f9ff",p:2.5}}>
    <Box sx={{display:"flex",gap:1.5,mb:2}}>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:10,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",color:"#fff",fontWeight:600,fontSize:".82rem",textDecoration:"none",fontFamily:"'Outfit',sans-serif"}}><OpenInNewIcon sx={{fontSize:15}}/> View</a>
      <a href={url} download style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:10,background:"#fff",color:"#4f6ef7",fontWeight:600,fontSize:".82rem",textDecoration:"none",border:"1.5px solid rgba(79,110,247,.28)",fontFamily:"'Outfit',sans-serif"}}><DownloadIcon sx={{fontSize:15}}/> Download</a>
    </Box>
    {isPdf?<Box sx={{borderRadius:12,overflow:"hidden",border:"1px solid #e8ecf5"}}><iframe src={url} style={{width:"100%",height:360,border:"none",display:"block"}} title="report"/></Box>:<Box sx={{borderRadius:12,overflow:"hidden",border:"1px solid #e8ecf5"}}><img src={url} alt="report" style={{width:"100%",maxHeight:400,objectFit:"contain",background:"#f0f2f8",display:"block"}}/></Box>}
  </Box>);
}

// ── PatientModal — shows full patient info + payment status ──────────────────
function PatientModal({appt,open,onClose,onWriteRx,payments}) {
  if(!appt)return null;
  const p=appt.patient;
  // FIX: check payment status correctly
  const isPaid=payments[appt.id]?.status==="SUCCESS";
  return (
    <Modal open={open} onClose={onClose}><Box className="patient-modal-box">
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:2}}>
        <Box sx={{display:"flex",alignItems:"center",gap:2}}><Avatar className="av-blue" sx={{width:54,height:54,borderRadius:"16px",fontSize:"1.4rem",fontWeight:700}}>{p?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36"}}>{p?.name}</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0"}}>Patient Record</Typography></Box></Box>
        <IconButton onClick={onClose} size="small" sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton>
      </Box>
      <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
      <Grid container spacing={2} sx={{mb:3}}>
        {[["Name",p?.name],["Age",p?.age?`${p.age} yrs`:"—"],["Gender",p?.gender],["DOB",p?.dob],["Email",p?.email],["Contact",p?.contact]].map(([l,v])=>(<Grid item xs={6} key={l}><div className="modal-field-label">{l}</div><div className="modal-field-value">{v||"—"}</div></Grid>))}
      </Grid>
      <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
      <Grid container spacing={2} sx={{mb:2}}>
        {[["Date",appt.date],["Time",appt.timeSlot],["Status",appt.status]].map(([l,v])=>(<Grid item xs={6} key={l}><div className="modal-field-label">{l}</div><div className="modal-field-value">{v||"—"}</div></Grid>))}
        <Grid item xs={12}><div className="modal-field-label">Symptoms</div><div className="modal-field-value">{appt.description||"—"}</div></Grid>
      </Grid>
      <Box sx={{mb:3}}>
        {isPaid
          ?<Chip label="✓ Payment Confirmed" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.25)",fontWeight:600}}/>
          :<Chip icon={<LockIcon sx={{fontSize:13}}/>} label="Payment Not Yet Received" size="small" sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600}}/>}
      </Box>
      <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
      <ReportViewer filename={appt.report||appt.reportFileName}/>
      {appt.status==="APPROVED"&&(
        <Button onClick={()=>{onClose();onWriteRx(appt);}} variant="contained" fullWidth
          startIcon={isPaid?<EditNoteIcon/>:<LockIcon/>}
          sx={{mt:3,background:isPaid?"linear-gradient(135deg,#059669,#34d399)":"linear-gradient(135deg,#94a3b8,#64748b)",borderRadius:"12px",textTransform:"none",fontWeight:700}}>
          {isPaid?"Write / Update Prescription":"Prescription Locked — Awaiting Patient Payment"}
        </Button>
      )}
    </Box></Modal>
  );
}

// ── WritePrescriptionModal — locked until patient pays ───────────────────────
function WritePrescriptionModal({appt,open,onClose,onSaved,payments}) {
  const [form,setForm]=useState({diagnosis:"",medicines:"",instructions:"",tests:"",followUpDate:""});
  const [saving,setSaving]=useState(false);
  // FIX: check payment correctly
  const isPaid=payments[appt?.id]?.status==="SUCCESS";

  // Load existing prescription if exists
  useEffect(()=>{
    if(open&&appt?.id){
      axios.get(`${BASE}/prescriptions/appointment/${appt.id}`)
        .then(r=>{
          if(r.data){
            setForm({
              diagnosis:r.data.diagnosis||"",
              medicines:r.data.medicines||"",
              instructions:r.data.instructions||"",
              tests:r.data.tests||"",
              followUpDate:r.data.followUpDate||"",
            });
          }
        }).catch(()=>{
          // No existing prescription, form stays empty
          setForm({diagnosis:"",medicines:"",instructions:"",tests:"",followUpDate:""});
        });
    }
  },[open,appt?.id]);

  const handleSave=async()=>{
    if(!isPaid){alert("Cannot write prescription until patient has paid the consultation fee.");return;}
    if(!form.diagnosis.trim()){alert("Please enter a diagnosis.");return;}
    setSaving(true);
    try{
      await axios.post(`${BASE}/prescriptions/appointment/${appt.id}`,form);
      // Send email notification to patient
      try{ await axios.post(`${BASE}/prescriptions/appointment/${appt.id}/notify-patient`); }catch{}
      onSaved();onClose();
    }
    catch{alert("Failed to save prescription.");}finally{setSaving(false);}
  };
  const fSx={"& .MuiOutlinedInput-root":{borderRadius:"12px",background:"#f8f9ff"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5"}};
  return (
    <Modal open={open} onClose={onClose}><Box className="rx-modal-box">
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:2}}>
        <Box>
          <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36"}}>Write Prescription</Typography>
          {appt&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3}}>Patient: {appt.patient?.name} · {appt.date}</Typography>}
        </Box>
        <IconButton onClick={onClose} size="small" sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton>
      </Box>

      {/* FIX: Show clear lock banner when not paid */}
      {!isPaid&&(
        <Box sx={{background:"linear-gradient(135deg,#fff7ed,#fef3c7)",border:"1.5px solid #fcd34d",borderRadius:"12px",p:"14px 18px",mb:2,display:"flex",alignItems:"center",gap:1.5}}>
          <LockIcon sx={{color:"#d97706",fontSize:22,flexShrink:0}}/>
          <Box>
            <Typography sx={{fontSize:".88rem",color:"#92400e",fontWeight:700}}>Prescription locked</Typography>
            <Typography sx={{fontSize:".78rem",color:"#a16207",mt:.3}}>The patient must complete payment before you can write or save a prescription.</Typography>
          </Box>
        </Box>
      )}
      {isPaid&&(
        <Box sx={{background:"#ecfdf5",border:"1px solid rgba(5,150,105,.25)",borderRadius:"12px",p:"10px 16px",mb:2,display:"flex",alignItems:"center",gap:1.5}}>
          <CheckCircleIcon sx={{color:"#059669",fontSize:18,flexShrink:0}}/>
          <Typography sx={{fontSize:".82rem",color:"#065f46",fontWeight:600}}>Payment confirmed — you can write the prescription</Typography>
        </Box>
      )}

      <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
      {[["Diagnosis *","diagnosis","e.g. Hypertension Stage 1",false],["Medicines","medicines","Name · Dosage · Frequency (one per line)",true],["Instructions","instructions","Dietary / lifestyle notes",true],["Lab Tests","tests","e.g. CBC, LFT, ECG",true]].map(([lbl,key,ph,multi])=>(
        <Box key={key} sx={{mb:2}}>
          <div className="modal-field-label">{lbl}</div>
          <TextField fullWidth size="small" multiline={multi} rows={multi?3:1} variant="outlined" placeholder={ph}
            value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} disabled={!isPaid} sx={fSx}/>
        </Box>
      ))}
      <Box sx={{mb:3}}>
        <div className="modal-field-label">Follow-up Date</div>
        <TextField fullWidth size="small" type="date" variant="outlined" value={form.followUpDate}
          onChange={e=>setForm(p=>({...p,followUpDate:e.target.value}))} disabled={!isPaid} sx={fSx} InputLabelProps={{shrink:true}}/>
      </Box>
      <Button variant="contained" fullWidth onClick={handleSave} disabled={saving||!isPaid}
        sx={{borderRadius:"12px",textTransform:"none",fontWeight:700,background:isPaid?"linear-gradient(135deg,#059669,#34d399)":"#e2e8f0",color:isPaid?"#fff":"#94a3b8",boxShadow:isPaid?"0 4px 14px rgba(5,150,105,.3)":"none"}}>
        {saving?"Saving…":!isPaid?"Locked — Awaiting Payment":"Save Prescription"}
      </Button>
    </Box></Modal>
  );
}

function UploadZone({label,field,doctorId,currentFile,onUploaded}) {
  const inputRef=useRef();const[uploading,setUploading]=useState(false);const[localFile,setLocalFile]=useState(currentFile||null);
  useEffect(()=>{setLocalFile(currentFile||null);},[currentFile]);
  const handleFile=async(file)=>{if(!file)return;setUploading(true);const fd=new FormData();fd.append("file",file);fd.append("field",field);try{const res=await axios.post(`${BASE}/doctor-verification/doctor/${doctorId}/upload`,fd,{headers:{"Content-Type":"multipart/form-data"}});setLocalFile(res.data.filename);onUploaded(field,res.data.filename);}catch{alert(`Upload failed for ${label}`);}finally{setUploading(false);}};
  return (<Box><div className="field-label">{label}</div><div className={`verif-upload-zone ${localFile?"has-file":""}`} onClick={()=>inputRef.current?.click()}><input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>{uploading?<CircularProgress size={22} sx={{color:"#4f6ef7"}}/>:localFile?<><CheckCircleIcon sx={{fontSize:26,color:"#059669"}}/><Typography sx={{fontSize:".8rem",fontWeight:600,color:"#059669"}}>Uploaded ✓</Typography><Typography sx={{fontSize:".7rem",color:"#8892b0",wordBreak:"break-all"}}>{localFile}</Typography></>:<><UploadFileIcon sx={{fontSize:28,color:"#8892b0"}}/><Typography sx={{fontSize:".82rem",fontWeight:500,color:"#4a5278"}}>Click to upload</Typography><Typography sx={{fontSize:".72rem",color:"#b0b8d0"}}>PDF · JPG · PNG</Typography></>}</div></Box>);
}

const STEPS=[{key:"identity",label:"Identity & Registration",icon:<BadgeIcon sx={{fontSize:15}}/>},{key:"education",label:"Education",icon:<SchoolIcon sx={{fontSize:15}}/>},{key:"practice",label:"Practice",icon:<LocalHospitalIcon sx={{fontSize:15}}/>},{key:"documents",label:"Documents",icon:<UploadFileIcon sx={{fontSize:15}}/>},{key:"about",label:"About & Submit",icon:<SendIcon sx={{fontSize:15}}/>}];
const EMPTY_FORM={fullLegalName:"",dateOfBirth:"",gender:"",nationality:"India",aadhaarNumber:"",aadhaarMobile:"",medicalRegistrationNumber:"",medicalCouncil:"",registrationDate:"",registrationExpiry:"",registrationType:"",idProofType:"",idProofNumber:"",degreeName:"",degreeInstitution:"",degreeUniversity:"",degreePassingYear:"",internshipYear:"",pgDegree:"",pgInstitution:"",pgPassingYear:"",superSpecialization:"",areasOfExpertise:"",totalExperienceYears:"",currentHospitalName:"",currentHospitalAddress:"",clinicName:"",clinicAddress:"",clinicCity:"",clinicState:"",clinicPincode:"",languagesSpoken:"",consultationDays:"",consultationTimings:"",aboutMe:"",medicalCertificateFile:"",degreeFile:"",pgDegreeFile:"",aadhaarFile:"",idProofFile:"",photoFile:""};
function InfoNote({text}){return<Box sx={{display:"flex",alignItems:"flex-start",gap:1,p:1.5,borderRadius:"10px",background:"#f0f4ff",border:"1px solid rgba(79,110,247,.15)",mb:2.5}}><Typography sx={{fontSize:".95rem",lineHeight:1,mt:.1}}>ℹ️</Typography><Typography sx={{fontSize:".78rem",color:"#4a5278",lineHeight:1.5}}>{text}</Typography></Box>;}
function SHead({color="#4f6ef7",children}){return<Box sx={{display:"flex",alignItems:"center",gap:1,mb:1.5,mt:.5}}><Box sx={{width:3,height:14,borderRadius:2,background:color,flexShrink:0}}/><Typography sx={{fontSize:".72rem",fontWeight:700,color,textTransform:"uppercase",letterSpacing:"1.1px"}}>{children}</Typography></Box>;}

function CompleteProfileView({doctor,verification,onVerificationChange}) {
  const[step,setStep]=useState(0);const[form,setForm]=useState(EMPTY_FORM);const[saving,setSaving]=useState(false);
  const status=verification?.status||"INCOMPLETE";const locked=status==="PENDING"||status==="APPROVED";
  useEffect(()=>{if(verification)setForm(prev=>({...prev,...Object.fromEntries(Object.keys(EMPTY_FORM).map(k=>[k,verification[k]||""]))}))},[verification]);
  const f=k=>form[k];const s=(k,v)=>setForm(p=>({...p,[k]:v}));
  const fSx={"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}};
  const FL=({children})=><div className="field-label">{children}</div>;
  const handleSave=async()=>{setSaving(true);try{const res=await axios.post(`${BASE}/doctor-verification/doctor/${doctor.id}`,form);onVerificationChange(res.data);}catch{alert("Save failed.");}finally{setSaving(false);}};
  const handleSubmit=async()=>{await handleSave();try{const res=await axios.post(`${BASE}/doctor-verification/doctor/${doctor.id}/submit`);onVerificationChange(res.data);}catch{alert("Submission failed.");}};
  const checklist=[["Full Legal Name",!!f("fullLegalName")],["Date of Birth",!!f("dateOfBirth")],["Aadhaar Number",!!f("aadhaarNumber")],["NMC/MCI Registration Number",!!f("medicalRegistrationNumber")],["Issuing Medical Council",!!f("medicalCouncil")],["Registration Valid Dates",!!(f("registrationDate")&&f("registrationExpiry"))],["Primary Degree",!!f("degreeName")],["Degree Institution",!!f("degreeInstitution")],["Years of Experience",!!f("totalExperienceYears")],["Hospital / Clinic Name",!!f("currentHospitalName")],["Aadhaar Card Upload",!!f("aadhaarFile")],["Registration Certificate Upload",!!f("medicalCertificateFile")],["Degree Certificate Upload",!!f("degreeFile")],["Professional Photo Upload",!!f("photoFile")]];
  const done=checklist.filter(([,d])=>d).length;const allOk=done===checklist.length;
  const cfgMap={INCOMPLETE:{cls:"incomplete",Icon:BadgeIcon,iconColor:"#4f6ef7",title:"Profile Incomplete",sub:"Fill all sections and submit for admin review."},PENDING:{cls:"pending",Icon:HourglassTopIcon,iconColor:"#d97706",title:"Under Admin Review",sub:"Being reviewed by MedVault admin team."},APPROVED:{cls:"approved",Icon:VerifiedIcon,iconColor:"#059669",title:"Profile Verified ✓",sub:"Credentials verified. You can now receive patient appointments."},REJECTED:{cls:"rejected",Icon:ErrorOutlineIcon,iconColor:"#e11d48",title:"Verification Rejected",sub:verification?.adminRemarks||"Please update and resubmit."}};
  const c=cfgMap[status]||cfgMap.INCOMPLETE;
  return (<Box className="fu">
    <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Complete Your Profile</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Submit credentials for admin verification</Typography></Box>
    <div className={`verif-status-banner ${c.cls}`}><c.Icon sx={{fontSize:28,color:c.iconColor,flexShrink:0,mt:.2}}/><Box sx={{flex:1}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:700,color:"#1a1f36"}}>{c.title}</Typography><Typography sx={{fontSize:".83rem",color:"#4a5278",mt:.4}}>{c.sub}</Typography>{status==="INCOMPLETE"&&<Box sx={{mt:1.5}}><Box sx={{display:"flex",justifyContent:"space-between",mb:.6}}><Typography sx={{fontSize:".72rem",color:"#8892b0",fontWeight:600}}>Completion</Typography><Typography sx={{fontSize:".72rem",color:"#4f6ef7",fontWeight:700}}>{done}/{checklist.length} required</Typography></Box><Box sx={{height:7,borderRadius:99,background:"#e8ecf5",overflow:"hidden"}}><Box sx={{height:"100%",borderRadius:99,background:`linear-gradient(90deg,${allOk?"#059669,#34d399":"#4f6ef7,#7c3aed"})`,width:`${(done/checklist.length)*100}%`,transition:"width .4s"}}/></Box></Box>}</Box></div>
    <Box className="verif-step-bar">{STEPS.map((st,i)=>(<Box key={st.key} sx={{display:"flex",alignItems:"center",flex:i<STEPS.length-1?"1":"0 0 auto"}}><div className={`verif-step-pill ${i<step?"done":i===step?"active":"waiting"}`} onClick={()=>!locked&&setStep(i)}>{i<step?<CheckIcon sx={{fontSize:13}}/>:st.icon}{st.label}</div>{i<STEPS.length-1&&<div className="verif-step-connector"/>}</Box>))}</Box>
    <Card className="doc-card" sx={{p:{xs:2.5,md:4},mb:3}}><AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:.2}}>
      {step===0&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:3}}>Identity & Medical Registration</Typography><SHead color="#4f6ef7">Personal Identity</SHead><InfoNote text="Enter your name exactly as it appears on your Aadhaar card."/><Grid container spacing={2.5} sx={{mb:3}}><Grid item xs={12} sm={6}><FL>Full Legal Name *</FL><TextField fullWidth size="small" disabled={locked} value={f("fullLegalName")} onChange={e=>s("fullLegalName",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={3}><FL>Date of Birth *</FL><TextField fullWidth size="small" type="date" disabled={locked} value={f("dateOfBirth")} onChange={e=>s("dateOfBirth",e.target.value)} sx={fSx} InputLabelProps={{shrink:true}}/></Grid><Grid item xs={12} sm={3}><FL>Gender *</FL><TextField fullWidth size="small" select disabled={locked} value={f("gender")} onChange={e=>s("gender",e.target.value)} sx={fSx} SelectProps={{native:true}}><option value="">Select…</option>{["Male","Female","Other"].map(v=><option key={v} value={v}>{v}</option>)}</TextField></Grid></Grid><Divider sx={{mb:2.5,borderColor:"#e8ecf5"}}/><SHead color="#059669">NMC / State Council Registration</SHead><Grid container spacing={2.5}><Grid item xs={12} sm={5}><FL>Registration Number *</FL><TextField fullWidth size="small" disabled={locked} placeholder="e.g. MH/123456/2010" value={f("medicalRegistrationNumber")} onChange={e=>s("medicalRegistrationNumber",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={7}><FL>Issuing Medical Council *</FL><TextField fullWidth size="small" select disabled={locked} value={f("medicalCouncil")} onChange={e=>s("medicalCouncil",e.target.value)} sx={fSx} SelectProps={{native:true}}><option value="">Select…</option><option value="National Medical Commission (NMC)">NMC</option>{["Andhra Pradesh MC","Delhi MC","Gujarat MC","Karnataka MC","Kerala MC","Maharashtra MC","Telangana State MC","Tamil Nadu MC","UP MC","West Bengal MC"].map(v=><option key={v} value={v}>{v}</option>)}</TextField></Grid><Grid item xs={12} sm={4}><FL>Registration Date *</FL><TextField fullWidth size="small" type="date" disabled={locked} value={f("registrationDate")} onChange={e=>s("registrationDate",e.target.value)} sx={fSx} InputLabelProps={{shrink:true}}/></Grid><Grid item xs={12} sm={4}><FL>Valid Until *</FL><TextField fullWidth size="small" type="date" disabled={locked} value={f("registrationExpiry")} onChange={e=>s("registrationExpiry",e.target.value)} sx={fSx} InputLabelProps={{shrink:true}}/></Grid><Grid item xs={12} sm={4}><FL>Aadhaar Number</FL><TextField fullWidth size="small" disabled={locked} placeholder="XXXX XXXX XXXX" value={f("aadhaarNumber")} onChange={e=>{const raw=e.target.value.replace(/\D/g,"").slice(0,12);s("aadhaarNumber",raw.replace(/(\d{4})(?=\d)/g,"$1 "));}} sx={fSx}/></Grid></Grid></Box>}
      {step===1&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:3}}>Education & Qualifications</Typography><SHead color="#4f6ef7">Primary Medical Degree</SHead><Grid container spacing={2.5} sx={{mb:3}}><Grid item xs={12} sm={4}><FL>Degree *</FL><TextField fullWidth size="small" select disabled={locked} value={f("degreeName")} onChange={e=>s("degreeName",e.target.value)} sx={fSx} SelectProps={{native:true}}><option value="">Select…</option>{["MBBS","BDS","BAMS","BHMS","BNYS"].map(v=><option key={v} value={v}>{v}</option>)}</TextField></Grid><Grid item xs={12} sm={5}><FL>Medical College *</FL><TextField fullWidth size="small" disabled={locked} placeholder="e.g. AIIMS" value={f("degreeInstitution")} onChange={e=>s("degreeInstitution",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={3}><FL>Passing Year *</FL><TextField fullWidth size="small" type="number" disabled={locked} placeholder="2010" value={f("degreePassingYear")} onChange={e=>s("degreePassingYear",e.target.value)} sx={fSx}/></Grid></Grid><Divider sx={{mb:2.5,borderColor:"#e8ecf5"}}/><SHead color="#059669">Experience</SHead><Grid container spacing={2.5}><Grid item xs={12} sm={5}><FL>Areas of Expertise</FL><TextField fullWidth size="small" disabled={locked} placeholder="Diabetes, Hypertension…" value={f("areasOfExpertise")} onChange={e=>s("areasOfExpertise",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={3}><FL>Total Experience (years) *</FL><TextField fullWidth size="small" type="number" disabled={locked} placeholder="12" value={f("totalExperienceYears")} onChange={e=>s("totalExperienceYears",e.target.value)} sx={fSx}/></Grid></Grid></Box>}
      {step===2&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:3}}>Current Practice Details</Typography><Grid container spacing={2.5}><Grid item xs={12} sm={5}><FL>Hospital Name *</FL><TextField fullWidth size="small" disabled={locked} placeholder="City General Hospital" value={f("currentHospitalName")} onChange={e=>s("currentHospitalName",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={7}><FL>Hospital Address</FL><TextField fullWidth size="small" disabled={locked} value={f("currentHospitalAddress")} onChange={e=>s("currentHospitalAddress",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={4}><FL>City</FL><TextField fullWidth size="small" disabled={locked} value={f("clinicCity")} onChange={e=>s("clinicCity",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={4}><FL>State</FL><TextField fullWidth size="small" disabled={locked} value={f("clinicState")} onChange={e=>s("clinicState",e.target.value)} sx={fSx}/></Grid><Grid item xs={12} sm={4}><FL>Consultation Days</FL><TextField fullWidth size="small" disabled={locked} placeholder="Mon–Fri" value={f("consultationDays")} onChange={e=>s("consultationDays",e.target.value)} sx={fSx}/></Grid></Grid></Box>}
      {step===3&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:1}}>Upload Documents</Typography><InfoNote text="Required: Aadhaar Card, Medical Registration Certificate, and Degree Certificate."/>{locked?<Box sx={{background:"#f5f7ff",borderRadius:"14px",p:3,textAlign:"center"}}><Typography sx={{color:"#8892b0"}}>Documents submitted — editing disabled while under review.</Typography></Box>:<Grid container spacing={2.5}><Grid item xs={12} sm={6}><UploadZone label="Aadhaar Card *" field="aadhaarFile" doctorId={doctor.id} currentFile={f("aadhaarFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid><Grid item xs={12} sm={6}><UploadZone label="Registration Certificate *" field="medicalCertificateFile" doctorId={doctor.id} currentFile={f("medicalCertificateFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid><Grid item xs={12} sm={6}><UploadZone label="Degree Certificate *" field="degreeFile" doctorId={doctor.id} currentFile={f("degreeFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid><Grid item xs={12} sm={6}><UploadZone label="Professional Photo *" field="photoFile" doctorId={doctor.id} currentFile={f("photoFile")} onUploaded={(field,fn)=>s(field,fn)}/></Grid></Grid>}</Box>}
      {step===4&&<Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:3}}>About You & Submit</Typography><div className="field-label">Professional Bio</div><TextField fullWidth multiline rows={4} disabled={locked} placeholder="Describe your approach to medicine…" value={f("aboutMe")} onChange={e=>s("aboutMe",e.target.value)} sx={{...fSx,mb:3,"& .MuiOutlinedInput-root":{borderRadius:"12px",background:"#f8f9ff"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5"}}}/><Box sx={{background:"#f5f7ff",borderRadius:"14px",p:3,border:"1px solid #e8ecf5"}}><Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:2}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.05rem",fontWeight:700,color:"#1a1f36"}}>Checklist</Typography><Chip label={`${done}/${checklist.length}`} size="small" sx={{background:allOk?"#ecfdf5":"#fff7ed",color:allOk?"#059669":"#d97706",fontWeight:700}}/></Box><Grid container spacing={1}>{checklist.map(([item,isDone])=>(<Grid item xs={12} sm={6} key={item}><Box sx={{display:"flex",alignItems:"center",gap:1.2}}><Box sx={{width:18,height:18,borderRadius:"50%",flexShrink:0,background:isDone?"#ecfdf5":"#fff1f2",border:`1.5px solid ${isDone?"rgba(5,150,105,.4)":"rgba(225,29,72,.2)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{isDone?<CheckIcon sx={{fontSize:11,color:"#059669"}}/>:<CloseIcon sx={{fontSize:10,color:"#fca5a5"}}/>}</Box><Typography sx={{fontSize:".8rem",color:isDone?"#059669":"#8892b0",fontWeight:isDone?600:400}}>{item}</Typography></Box></Grid>))}</Grid></Box></Box>}
    </motion.div></AnimatePresence></Card>
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:2,flexWrap:"wrap"}}><Box sx={{display:"flex",gap:1.5}}>{step>0&&<Button variant="outlined" startIcon={<ChevronLeftIcon/>} onClick={()=>setStep(s=>s-1)} sx={{borderRadius:"12px",textTransform:"none",fontWeight:600,borderColor:"#e8ecf5",color:"#4a5278"}}>Back</Button>}{!locked&&<Button variant="outlined" onClick={handleSave} disabled={saving} sx={{borderRadius:"12px",textTransform:"none",fontWeight:600,borderColor:"rgba(79,110,247,.3)",color:"#4f6ef7"}}>{saving?"Saving…":"Save Progress"}</Button>}</Box><Box sx={{display:"flex",gap:1.5}}>{step<STEPS.length-1&&<Button variant="contained" endIcon={<ChevronRightIcon/>} onClick={async()=>{await handleSave();setStep(s=>s+1);}} disabled={saving||locked} sx={{borderRadius:"12px",textTransform:"none",fontWeight:700,background:"linear-gradient(135deg,#4f6ef7,#7c3aed)"}}>Save & Next</Button>}{step===STEPS.length-1&&!locked&&<Button variant="contained" endIcon={<SendIcon/>} onClick={handleSubmit} disabled={saving||!allOk} sx={{borderRadius:"12px",textTransform:"none",fontWeight:700,px:3,background:allOk?"linear-gradient(135deg,#059669,#34d399)":"#e2e8f0",color:allOk?"#fff":"#94a3b8"}}>{saving?"Submitting…":"Submit for Review"}</Button>}</Box></Box>
  </Box>);
}

function VerificationGate({status,remarks,onGoToProfile}) {
  const cfg={INCOMPLETE:{icon:"🔒",title:"Complete Your Profile First",sub:"Submit credentials for verification.",btnLabel:"Complete My Profile →",btnBg:"linear-gradient(135deg,#d97706,#f59e0b)",bg:"linear-gradient(135deg,#fffbeb,#fef9ee)",border:"#fcd34d"},PENDING:{icon:"⏳",title:"Verification Under Review",sub:"Profile is being reviewed. Patient access unlocks automatically once approved.",btnLabel:"View Submission Status",btnBg:"linear-gradient(135deg,#3b82f6,#60a5fa)",bg:"linear-gradient(135deg,#eff6ff,#dbeafe)",border:"rgba(59,130,246,.3)"},REJECTED:{icon:"❌",title:"Verification Rejected",sub:`Admin remarks: "${remarks||"Please update and resubmit."}". Fix issues and resubmit.`,btnLabel:"Update & Resubmit →",btnBg:"linear-gradient(135deg,#e11d48,#f43f5e)",bg:"linear-gradient(135deg,#fff1f2,#ffe4e6)",border:"rgba(225,29,72,.25)"}};
  const c=cfg[status]||cfg.INCOMPLETE;
  return (<Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",textAlign:"center",px:3}}>
    <Box sx={{width:120,height:120,borderRadius:"50%",background:c.bg,border:`2px solid ${c.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3.2rem",mb:3}}>{c.icon}</Box>
    <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.9rem",fontWeight:700,color:"#1a1f36",mb:1}}>{c.title}</Typography>
    <Typography sx={{fontSize:".88rem",color:"#4a5278",maxWidth:520,lineHeight:1.7,mb:3}}>{c.sub}</Typography>
    <Button variant="contained" onClick={onGoToProfile} sx={{borderRadius:"14px",textTransform:"none",fontWeight:700,px:4,py:1.4,fontSize:".92rem",background:c.btnBg}}>{c.btnLabel}</Button>
  </Box>);
}

// ── MAIN DoctorDashboard ──────────────────────────────────────────────────────
export default function DoctorDashboard() {
  const{user}=useContext(AuthContext);
  const userId=user?.id||localStorage.getItem("userId");
  const navigate=useNavigate();

  const[doctor,        setDoctor]        =useState(null);
  const[appointments,  setAppointments]  =useState([]);
  const[prescriptions, setPrescriptions] =useState({});
  const[payments,      setPayments]      =useState({}); // key = appointmentId
  const[verification,  setVerification]  =useState(null);
  const[loading,       setLoading]       =useState(true);
  const[profileMissing,setProfileMissing]=useState(false);
  const[sidebarOpen,   setSidebarOpen]   =useState(false);
  const[view,          setView]          =useState("dashboard");
  const[selectedAppt,  setSelectedAppt]  =useState(null);
  const[rxAppt,        setRxAppt]        =useState(null);
  const[docReqDialog,  setDocReqDialog]  =useState(null);
  const[docReqMsg,     setDocReqMsg]     =useState("");
  const[docReqLoading, setDocReqLoading] =useState(false);

  useEffect(()=>{
    const fetchData=async()=>{
      let doc;
      try{const r=await axios.get(`${BASE}/doctor/user/${userId}`);if(!r.data?.id){setProfileMissing(true);setLoading(false);return;}doc=r.data;setDoctor(doc);}
      catch(err){if(err.response?.status===404)setProfileMissing(true);setLoading(false);return;}

      let appts=[];
      try{const r=await axios.get(`${BASE}/appointments/doctor/${doc.id}`);appts=r.data;setAppointments(appts);}catch{}

      // FIX: load prescriptions as map keyed by appointmentId
      try{const r=await axios.get(`${BASE}/prescriptions/doctor/${doc.id}`);const m={};r.data.forEach(rx=>{if(rx.appointment?.id)m[rx.appointment.id]=rx;});setPrescriptions(m);}catch{}

      // FIX: load payments correctly — key by appointmentId, only SUCCESS ones
      try{
        const approvedAppts=appts.filter(a=>a.status==="APPROVED");
        const pm={};
        await Promise.all(approvedAppts.map(async a=>{
          try{
            const r=await axios.get(`${BASE}/payments/appointment/${a.id}`);
            if(r.data&&r.data.status==="SUCCESS"){
              pm[a.id]={status:"SUCCESS",paymentId:r.data.id};
            }
          }catch{}
        }));
        setPayments(pm);
      }catch{}

      try{const r=await axios.get(`${BASE}/doctor-verification/doctor/${doc.id}`);setVerification(r.data);}catch{}
      setLoading(false);
    };
    if(userId)fetchData();
  },[userId]);

  const acceptAppointment=async id=>{await axios.put(`${BASE}/appointments/${id}/approve`);setAppointments(p=>p.map(a=>a.id===id?{...a,status:"APPROVED"}:a));};
  const rejectAppointment=async id=>{await axios.put(`${BASE}/appointments/${id}/reject`);setAppointments(p=>p.filter(a=>a.id!==id));};
  const handleLogout=()=>{localStorage.removeItem("user");navigate("/");};
  const handleNavClick=key=>{setView(key);setSidebarOpen(false);};

  // FIX: After saving prescription, reload from server
  const handleRxSaved=async()=>{
    try{
      const r=await axios.get(`${BASE}/prescriptions/doctor/${doctor.id}`);
      const m={};r.data.forEach(rx=>{if(rx.appointment?.id)m[rx.appointment.id]=rx;});
      setPrescriptions(m);
    }catch{}
  };

  const handleDocRequest=async(appt)=>{
    setDocReqLoading(true);
    try{const res=await axios.put(`${BASE}/appointments/${appt.id}/request-docs`,{message:docReqMsg});setAppointments(prev=>prev.map(a=>a.id===appt.id?res.data:a));setDocReqDialog(null);setDocReqMsg("");}
    catch{alert("Failed to send request.");}
    finally{setDocReqLoading(false);}
  };

  if(profileMissing)return<DoctorProfileForm userId={userId} onCreated={doc=>{setDoctor(doc);setProfileMissing(false);}}/>;
  if(loading)return<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>;

  const pending        =appointments.filter(a=>a.status==="PENDING");
  const approved       =appointments.filter(a=>a.status==="APPROVED");
  const uniquePatients =new Set(approved.map(a=>a.patient?.id)).size;
  const verifStatus    =verification?.status||"INCOMPLETE";
  const isApproved     =verifStatus==="APPROVED";
  const verifBadge     ={INCOMPLETE:"#f59e0b",PENDING:"#3b82f6",APPROVED:"#059669",REJECTED:"#e11d48"}[verifStatus];
  const PATIENT_VIEWS  =["pending","approved","records","prescriptions"];
  const isPatientView  =PATIENT_VIEWS.includes(view);

  // FIX: helper to check if appointment is paid
  const isApptPaid = (apptId) => payments[apptId]?.status === "SUCCESS";

  const menuItems=[
    {key:"dashboard",       label:"Dashboard",             icon:<DashboardIcon     sx={{fontSize:18}}/>},
    {key:"pending",         label:"Pending Requests",      icon:<EventIcon         sx={{fontSize:18}}/>,locked:!isApproved},
    {key:"approved",        label:"Approved Appointments", icon:<CheckCircleIcon   sx={{fontSize:18}}/>,locked:!isApproved},
    {key:"records",         label:"Patient Records",       icon:<FolderSharedIcon  sx={{fontSize:18}}/>,locked:!isApproved},
    {key:"prescriptions",   label:"Prescriptions",         icon:<LocalPharmacyIcon sx={{fontSize:18}}/>,locked:!isApproved},
    {key:"profile",         label:"My Profile",            icon:<PersonIcon        sx={{fontSize:18}}/>},
    {key:"complete-profile",label:"Get Verified",          icon:<BadgeIcon         sx={{fontSize:18}}/>,badge:verifBadge},
  ];

  return (
    <Box sx={{minHeight:"100vh",background:"#f5f7ff",fontFamily:"'Outfit',sans-serif"}}>
      <div className="doc-blob doc-blob-1"/>
      <div className="doc-blob doc-blob-2"/>
      {sidebarOpen&&<div className="doc-overlay" onClick={()=>setSidebarOpen(false)}/>}

      {/* Sidebar */}
      <div className={`doc-sidebar ${sidebarOpen?"open":"closed"}`}>
        <div className="doc-sidebar-top"><div className="doc-logo"><div className="doc-logo-icon">✦</div>Med<span className="doc-logo-accent">Vault</span></div><div className="doc-close-btn" onClick={()=>setSidebarOpen(false)}><CloseIcon sx={{fontSize:16}}/></div></div>
        <div className="doc-nav-label">Navigation</div>
        {menuItems.map(item=>(<NavItem key={item.key} icon={item.icon} label={item.label} active={view===item.key} onClick={()=>handleNavClick(item.key)} badge={item.badge} locked={item.locked}/>))}
        <div className="doc-sidebar-spacer"/>
        <div className="doc-user-card"><div className="doc-user-av">{doctor?.name?.charAt(0)}</div><Box><Typography sx={{fontSize:".85rem",fontWeight:600,color:"#1a1f36",lineHeight:1.2}}>Dr. {doctor?.name}</Typography><Typography sx={{fontSize:".72rem",color:"#8892b0"}}>{doctor?.specialization}</Typography></Box></div>
        <button onClick={handleLogout} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:11,cursor:"pointer",fontSize:".875rem",fontWeight:500,color:"#e11d48",border:"1px solid transparent",background:"none",width:"100%",fontFamily:"'Outfit',sans-serif"}} onMouseEnter={e=>{e.currentTarget.style.background="#fff1f3";}} onMouseLeave={e=>{e.currentTarget.style.background="none";}}><div className="doc-nav-icon" style={{background:"#fff1f3",color:"#e11d48"}}><LogoutIcon sx={{fontSize:16}}/></div>Sign Out</button>
      </div>

      {/* Topbar */}
      <div className="doc-topbar">
        <div className="doc-topbar-left"><div className="doc-hamburger" onClick={()=>setSidebarOpen(true)}><MenuIcon sx={{fontSize:20}}/></div><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:"1.3rem",color:"#4f6ef7"}}>Med<span style={{color:"#7c3aed"}}>Vault</span></Typography></div>
        <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
          {isApproved?<Chip icon={<VerifiedIcon sx={{fontSize:14}}/>} label="Verified Doctor" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.25)",fontWeight:600,fontSize:".72rem"}}/>:<Chip label={verifStatus==="PENDING"?"⏳ Under Review":verifStatus==="REJECTED"?"❌ Rejected":"⚠ Verification Required"} size="small" onClick={()=>handleNavClick("complete-profile")} sx={{cursor:"pointer",fontWeight:600,fontSize:".72rem",background:verifStatus==="PENDING"?"#eff6ff":verifStatus==="REJECTED"?"#fff1f2":"#fffbeb",color:verifStatus==="PENDING"?"#3b82f6":verifStatus==="REJECTED"?"#e11d48":"#d97706"}}/>}
          <Button startIcon={<LogoutIcon/>} onClick={handleLogout} size="small" sx={{color:"#e11d48",borderColor:"rgba(225,29,72,.3)",textTransform:"none",borderRadius:2,border:"1px solid",fontFamily:"'Outfit',sans-serif"}}>Logout</Button>
        </Box>
      </div>

      {/* Content */}
      <Box sx={{p:{xs:2,md:"36px 44px"},position:"relative",zIndex:1}}>
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}}>
            {isPatientView&&!isApproved?<VerificationGate status={verifStatus} remarks={verification?.adminRemarks} onGoToProfile={()=>handleNavClick("complete-profile")}/>:(<>

              {/* DASHBOARD */}
              {view==="dashboard"&&(<>
                <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Welcome, Dr. {doctor?.name?.split(" ")[0]} 👨‍⚕️</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Here's your practice overview</Typography></Box>
                {!isApproved&&<Box onClick={()=>handleNavClick("complete-profile")} sx={{cursor:"pointer",mb:3,p:2.5,borderRadius:"16px",background:verifStatus==="PENDING"?"linear-gradient(135deg,#eff6ff,#dbeafe)":verifStatus==="REJECTED"?"linear-gradient(135deg,#fff1f2,#ffe4e6)":"linear-gradient(135deg,#fffbeb,#fef3c7)",border:`1.5px solid ${verifStatus==="PENDING"?"rgba(59,130,246,.3)":verifStatus==="REJECTED"?"rgba(225,29,72,.25)":"#fcd34d"}`,display:"flex",alignItems:"center",gap:2,"&:hover":{boxShadow:"0 6px 24px rgba(0,0,0,.08)"},transition:"all .2s"}}>
                  {verifStatus==="PENDING"&&<HourglassTopIcon sx={{color:"#3b82f6",fontSize:28,flexShrink:0}}/>}{verifStatus==="REJECTED"&&<ErrorOutlineIcon sx={{color:"#e11d48",fontSize:28,flexShrink:0}}/>}{verifStatus==="INCOMPLETE"&&<BadgeIcon sx={{color:"#d97706",fontSize:28,flexShrink:0}}/>}
                  <Box sx={{flex:1}}><Typography sx={{fontWeight:700,fontSize:".92rem",color:"#1a1f36"}}>{verifStatus==="PENDING"?"Profile under review — patient access will unlock once approved":verifStatus==="REJECTED"?"Verification rejected — update and resubmit":"Complete your verification profile to start receiving patients"}</Typography></Box>
                  <ChevronRightIcon sx={{color:"#8892b0",flexShrink:0}}/>
                </Box>}
                <div className="doc-hero">
                  <Avatar className="av-blue" sx={{width:80,height:80,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 8px 24px rgba(79,110,247,.3)",flexShrink:0}}>{doctor?.name?.charAt(0)}</Avatar>
                  <Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:"#1a1f36"}}>Dr. {doctor?.name}</Typography><Typography sx={{color:"#8892b0",fontSize:".82rem",mt:.5}}>{isApproved?"✓ Verified Doctor · Active on MedVault":"Pending Verification"}</Typography><Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>{[doctor?.qualification,doctor?.specialization,doctor?.experience?`${doctor.experience} yrs exp`:null,doctor?.consultationFee?`₹${doctor.consultationFee} fee`:null].filter(Boolean).map((v,i)=>(<Chip key={i} label={v} size="small" sx={{background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:500,fontSize:".75rem"}}/>))}{isApproved&&<Chip icon={<VerifiedIcon sx={{fontSize:13}}/>} label="Verified" size="small" sx={{background:"#ecfdf5",color:"#059669",fontWeight:600}}/>}</Box></Box>
                </div>
                <Grid container spacing={2.5} sx={{mb:4}}>
                  <Grid item xs={6} sm={3}><StatCard label="Pending"       value={isApproved?pending.length:"—"}       icon="⏳" color="#d97706"/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Approved"      value={isApproved?approved.length:"—"}      icon="✓"  color="#059669"/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Patients"      value={isApproved?uniquePatients:"—"}       icon="👥" color="#4f6ef7"/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Prescriptions" value={isApproved?Object.keys(prescriptions).length:"—"} icon="💊" color="#7c3aed"/></Grid>
                </Grid>
                {isApproved&&pending.length>0&&(<><div className="doc-sec-heading">Recent Pending Requests</div><Grid container spacing={2.5}>{pending.slice(0,3).map((appt,i)=>(<Grid item xs={12} md={4} key={appt.id}><Card className="doc-pending-card"><CardContent sx={{p:"20px !important"}}><Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}><Avatar className={["av-blue","av-violet","av-teal","av-amber"][i%4]} sx={{width:44,height:44,borderRadius:"12px",fontSize:"1rem",fontWeight:700}}>{appt.patient?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontWeight:600,fontSize:".92rem",color:"#1a1f36"}}>{appt.patient?.name}</Typography><Typography sx={{fontSize:".75rem",color:"#8892b0"}}>{appt.date} · {appt.timeSlot}</Typography></Box></Box><Box sx={{display:"flex",gap:1}}><Button size="small" variant="contained" onClick={()=>acceptAppointment(appt.id)} sx={{flex:1,background:"linear-gradient(135deg,#059669,#34d399)",borderRadius:"9px",textTransform:"none",fontWeight:600}}>✓ Accept</Button><Button size="small" variant="outlined" onClick={()=>rejectAppointment(appt.id)} sx={{flex:1,borderColor:"rgba(225,29,72,.3)",color:"#e11d48",borderRadius:"9px",textTransform:"none",fontWeight:600}}>✕ Reject</Button></Box></CardContent></Card></Grid>))}</Grid></>)}
              </>)}

              {/* PENDING */}
              {view==="pending"&&(<>
                <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Pending Requests</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{pending.length} awaiting response</Typography></Box>
                {pending.length===0?<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>✓</Typography><Typography sx={{fontWeight:500}}>All caught up!</Typography></Box>:(
                  <Grid container spacing={2.5}>{pending.map((appt,i)=>(<Grid item xs={12} md={4} key={appt.id}><motion.div whileHover={{scale:1.02}}><Card className="doc-pending-card"><CardContent sx={{p:"24px !important"}}>
                    <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:2}}><Avatar className={["av-blue","av-violet","av-teal","av-amber"][i%4]} sx={{width:48,height:48,borderRadius:"14px",fontSize:"1.1rem",fontWeight:700}}>{appt.patient?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontWeight:600,fontSize:".95rem",color:"#1a1f36"}}>{appt.patient?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>Age {appt.patient?.age}</Typography></Box><Chip label="Pending" size="small" sx={{ml:"auto",background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".7rem"}}/></Box>
                    <Divider sx={{mb:1.5,borderColor:"#f0f2f8"}}/>
                    <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:.6}}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
                    <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:1.5}}>📝 {appt.description||"No description"}</Typography>
                    <Box sx={{display:"flex",gap:1}}><Button variant="contained" onClick={()=>acceptAppointment(appt.id)} sx={{flex:1,background:"linear-gradient(135deg,#059669,#34d399)",borderRadius:"9px",textTransform:"none",fontWeight:600}}>✓ Accept</Button><Button variant="outlined" onClick={()=>rejectAppointment(appt.id)} sx={{flex:1,borderColor:"rgba(225,29,72,.3)",color:"#e11d48",borderRadius:"9px",textTransform:"none",fontWeight:600}}>✕ Reject</Button></Box>
                  </CardContent></Card></motion.div></Grid>))}</Grid>
                )}
              </>)}

              {/* APPROVED — FIX: show correct payment status, lock Rx properly */}
              {view==="approved"&&(<>
                <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Approved Appointments</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{approved.length} confirmed</Typography></Box>
                {approved.length===0?<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>📋</Typography><Typography sx={{fontWeight:500}}>No approved appointments yet.</Typography></Box>:(
                  <Grid container spacing={2.5}>{approved.map(appt=>{
                    const hasPrescription=!!prescriptions[appt.id];
                    const isPaid=isApptPaid(appt.id);
                    const docStatus=appt.docRequestStatus||"DOC_REQUEST_NONE";
                    return (
                      <Grid item xs={12} md={4} key={appt.id}><motion.div whileHover={{scale:1.02}}>
                        <Card className="doc-approved-card" onClick={()=>setSelectedAppt(appt)} sx={{cursor:"pointer"}}>
                          <CardContent sx={{p:"24px !important"}}>
                            <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:2}}>
                              <Avatar className="av-green" sx={{width:48,height:48,borderRadius:"14px",fontSize:"1.1rem",fontWeight:700}}>{appt.patient?.name?.charAt(0)}</Avatar>
                              <Box><Typography sx={{fontWeight:600,fontSize:".95rem",color:"#1a1f36"}}>{appt.patient?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>Age {appt.patient?.age}</Typography></Box>
                              <Chip label="Approved" size="small" sx={{ml:"auto",background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.25)",fontWeight:600,fontSize:".7rem"}}/>
                            </Box>
                            <Divider sx={{mb:1.5,borderColor:"#f0f2f8"}}/>
                            <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:.6}}>🕐 {appt.timeSlot} · 📅 {appt.date}</Typography>
                            <Box sx={{display:"flex",gap:1,mt:1.5,mb:1.5,flexWrap:"wrap"}}>
                              {/* FIX: Show actual payment status */}
                              {isPaid
                                ?<Chip label="✓ Payment Received" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".7rem"}}/>
                                :<Chip icon={<LockIcon sx={{fontSize:11}}/>} label="Awaiting Payment" size="small" sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".7rem"}}/>
                              }
                              {hasPrescription&&<Chip label="Rx Written ✓" size="small" sx={{background:"#eef1fe",color:"#4f6ef7",fontWeight:600,fontSize:".7rem"}}/>}
                            </Box>

                            {/* FIX: Write Rx button — clearly locked or unlocked */}
                            <Button fullWidth size="small" variant="contained"
                              startIcon={isPaid?<EditNoteIcon sx={{fontSize:15}}/>:<LockIcon sx={{fontSize:15}}/>}
                              onClick={e=>{e.stopPropagation();setRxAppt(appt);}}
                              sx={{background:isPaid?"linear-gradient(135deg,#059669,#34d399)":"#e2e8f0",color:isPaid?"#fff":"#94a3b8",borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".82rem",boxShadow:"none",mb:1}}>
                              {isPaid?(hasPrescription?"Edit Rx":"Write Rx"):"Locked — Awaiting Patient Payment"}
                            </Button>

                            {/* Document request section */}
                            {docStatus==="DOC_REQUEST_NONE"&&isPaid&&(
                              <Button fullWidth size="small" variant="outlined"
                                startIcon={<AssignmentIcon sx={{fontSize:14}}/>}
                                onClick={e=>{e.stopPropagation();setDocReqDialog(appt);setDocReqMsg("");}}
                                sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".78rem",borderColor:"rgba(79,110,247,.35)",color:"#4f6ef7","&:hover":{background:"#eef1fe"}}}>
                                📋 Request Documents
                              </Button>
                            )}
                            {docStatus==="DOC_REQUEST_PENDING"&&<Chip label="⏳ Awaiting Patient Documents" size="small" sx={{background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".7rem",width:"100%",justifyContent:"center"}}/>}
                            {docStatus==="DOC_REQUEST_DONE"&&appt.docFileName&&(
                              <a href={`${BASE}/appointments/doc/${appt.docFileName}`} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5,padding:"6px 12px",borderRadius:8,fontSize:".78rem",fontWeight:600,textDecoration:"none",background:"linear-gradient(135deg,#059669,#34d399)",color:"#fff"}}>📄 View Patient Documents</a>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div></Grid>
                    );
                  })}</Grid>
                )}
              </>)}

              {/* RECORDS */}
              {view==="records"&&(<>
                <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Patient Records</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{uniquePatients} unique patients</Typography></Box>
                {approved.length===0?<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>👥</Typography><Typography sx={{fontWeight:500}}>No records yet.</Typography></Box>:(
                  <Grid container spacing={2.5}>{approved.map((appt,i)=>(<Grid item xs={12} sm={6} md={4} key={appt.id}><motion.div whileHover={{scale:1.02}}><Card className="doc-patient-card" onClick={()=>setSelectedAppt(appt)}><CardContent sx={{p:"22px !important"}}>
                    <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}><Avatar className={["av-blue","av-violet","av-teal","av-amber","av-green"][i%5]} sx={{width:46,height:46,borderRadius:"13px",fontSize:"1.1rem",fontWeight:700}}>{appt.patient?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontWeight:600,fontSize:".93rem",color:"#1a1f36"}}>{appt.patient?.name}</Typography><Typography sx={{fontSize:".75rem",color:"#8892b0"}}>Age {appt.patient?.age} · {appt.patient?.gender}</Typography></Box></Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mt:1.5}}>
                      <Chip label={appt.report||appt.reportFileName?"📄 Report":"No Report"} size="small" sx={{background:appt.report||appt.reportFileName?"#eef1fe":"#f5f7ff",color:appt.report||appt.reportFileName?"#4f6ef7":"#8892b0",fontSize:".72rem"}}/>
                      <Typography sx={{fontSize:".76rem",color:"#4f6ef7",fontWeight:600}}>View →</Typography>
                    </Box>
                  </CardContent></Card></motion.div></Grid>))}</Grid>
                )}
              </>)}

              {/* PRESCRIPTIONS — FIX: show only appointments with prescriptions written */}
              {view==="prescriptions"&&(<>
                <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Prescriptions</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{Object.keys(prescriptions).length} written</Typography></Box>
                {Object.keys(prescriptions).length===0?<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>💊</Typography><Typography sx={{fontWeight:500}}>No prescriptions written yet.</Typography><Typography sx={{fontSize:".82rem",mt:.5}}>Write prescriptions from the Approved Appointments tab after patient pays.</Typography></Box>:(
                  Object.values(prescriptions).map(rx=>{
                    const appt=approved.find(a=>a.id===rx.appointment?.id);
                    if(!rx.diagnosis)return null; // FIX: skip empty prescriptions
                    return (<div key={rx.id} className="rx-card">
                      <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
                        <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><LocalPharmacyIcon sx={{color:"#059669",fontSize:22}}/></Box>
                        <Box sx={{flex:1}}>
                          <Box sx={{display:"flex",alignItems:"center",gap:1.5,flexWrap:"wrap",mb:.5}}><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>{appt?.patient?.name||"Patient"}</Typography><Chip label={rx.issuedDate||"—"} size="small" sx={{background:"#f5f7ff",color:"#8892b0",fontSize:".68rem",height:20}}/></Box>
                          <Typography sx={{fontSize:".82rem",color:"#059669",fontWeight:600,mb:.5}}>🩺 {rx.diagnosis}</Typography>
                          {rx.medicines&&<Box sx={{background:"#f8f9ff",borderRadius:"10px",p:1.5,my:1,border:"1px solid #e8ecf5"}}><Typography sx={{fontSize:".72rem",color:"#8892b0",fontWeight:600,textTransform:"uppercase",letterSpacing:".8px",mb:.5}}>Medicines</Typography><Typography sx={{fontSize:".83rem",color:"#1a1f36",whiteSpace:"pre-line"}}>{rx.medicines}</Typography></Box>}
                          {rx.instructions&&<Typography sx={{fontSize:".8rem",color:"#4a5278"}}>📋 {rx.instructions}</Typography>}
                          {rx.followUpDate&&<Typography sx={{fontSize:".8rem",color:"#d97706",mt:.4}}>📅 Follow-up: {rx.followUpDate}</Typography>}
                        </Box>
                        <Button size="small" variant="outlined" onClick={()=>setRxAppt(appt)} startIcon={<EditNoteIcon sx={{fontSize:14}}/>} sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".75rem",borderColor:"rgba(5,150,105,.3)",color:"#059669",flexShrink:0,"&:hover":{background:"#ecfdf5"}}}>Edit</Button>
                      </Box>
                    </div>);
                  })
                )}
              </>)}

              {/* PROFILE */}
              {view==="profile"&&(<>
                <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>My Profile</Typography></Box>
                <Card className="doc-card" sx={{p:4}}>
                  <Box sx={{display:"flex",alignItems:"center",gap:2.5,mb:3}}><Avatar className="av-blue" sx={{width:76,height:76,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700}}>{doctor?.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>Dr. {doctor?.name}</Typography><Box sx={{display:"flex",gap:1,mt:.8}}>{isApproved?<Chip icon={<VerifiedIcon sx={{fontSize:13}}/>} label="Verified" size="small" sx={{background:"#ecfdf5",color:"#059669",fontWeight:600}}/>:<Chip label={verifStatus==="PENDING"?"Under Review":"Not Verified"} size="small" sx={{background:"#fff7ed",color:"#d97706",fontWeight:600}}/>}</Box></Box></Box>
                  <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
                  <Grid container spacing={3}>{[["Full Name",`Dr. ${doctor?.name}`],["Gender",doctor?.gender],["Email",doctor?.email],["Phone",doctor?.contact],["Specialization",doctor?.specialization],["Qualification",doctor?.qualification],["Experience",doctor?.experience?`${doctor.experience} years`:"—"],["Consultation Fee",doctor?.consultationFee?`₹${doctor.consultationFee}`:"—"],["Hospital",doctor?.hospital],["Doctor ID",`#${doctor?.id}`]].map(([l,v])=>(<Grid item xs={12} sm={6} key={l}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1.1px",color:"#8892b0",fontWeight:600,mb:.6}}>{l}</Typography><Typography sx={{fontSize:".95rem",fontWeight:500,color:"#1a1f36"}}>{v||"—"}</Typography></Grid>))}</Grid>
                </Card>
              </>)}

              {/* COMPLETE PROFILE */}
              {view==="complete-profile"&&<CompleteProfileView doctor={doctor} verification={verification} onVerificationChange={setVerification}/>}

            </>)}
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Request Documents Dialog */}
      <Dialog open={Boolean(docReqDialog)} onClose={()=>setDocReqDialog(null)} maxWidth="sm" fullWidth PaperProps={{sx:{borderRadius:"20px",border:"1px solid #e8ecf5"}}}>
        <DialogTitle sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36",borderBottom:"1px solid #e8ecf5"}}>📋 Request Health Documents</DialogTitle>
        <DialogContent sx={{pt:"24px !important"}}>
          <Typography sx={{fontSize:".88rem",color:"#4a5278",mb:2}}>Request <strong>{docReqDialog?.patient?.name}</strong> to upload specific health documents. They will see a notification in their "Doc Requests" tab.</Typography>
          <TextField fullWidth multiline rows={3} label="What documents do you need? (optional)" placeholder="e.g. Please upload your latest blood test report and ECG scan from the past 3 months." value={docReqMsg} onChange={e=>setDocReqMsg(e.target.value)} sx={{"& .MuiOutlinedInput-root":{borderRadius:"12px",background:"#f8f9ff"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5"}}}/>
        </DialogContent>
        <DialogActions sx={{p:"16px 24px",borderTop:"1px solid #e8ecf5",gap:1}}>
          <Button onClick={()=>setDocReqDialog(null)} sx={{color:"#8892b0",textTransform:"none",fontWeight:600}}>Cancel</Button>
          <Button onClick={()=>handleDocRequest(docReqDialog)} variant="contained" disabled={docReqLoading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:700,px:3}}>{docReqLoading?"Sending…":"Send Request"}</Button>
        </DialogActions>
      </Dialog>

      <PatientModal appt={selectedAppt} open={Boolean(selectedAppt)} onClose={()=>setSelectedAppt(null)} onWriteRx={appt=>setRxAppt(appt)} payments={payments}/>
      <WritePrescriptionModal appt={rxAppt} open={Boolean(rxAppt)} onClose={()=>setRxAppt(null)} onSaved={handleRxSaved} payments={payments}/>
    </Box>
  );
}
// import { useContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import PatientProfileForm from "./PatientProfileForm";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Button,
//   Divider,
//   Chip,
//   TextField,
//   InputAdornment,
//   MenuItem,
//   Select,
//   Modal,
//   IconButton,
//   LinearProgress,
//   Rating,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import LogoutIcon from "@mui/icons-material/Logout";
// import EventIcon from "@mui/icons-material/Event";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import FolderIcon from "@mui/icons-material/Folder";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import DescriptionIcon from "@mui/icons-material/Description";
// import DeleteIcon from "@mui/icons-material/Delete";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import DownloadIcon from "@mui/icons-material/Download";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
// import PaymentIcon from "@mui/icons-material/Payment";
// import StarIcon from "@mui/icons-material/Star";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { motion, AnimatePresence } from "framer-motion";

// const BASE = "http://localhost:8080";

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .sidebar-overlay{position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease;}
//   @keyframes overlayIn{from{opacity:0}to{opacity:1}}

//   .portal-sidebar{width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1);}
//   .portal-sidebar.closed{transform:translateX(-100%);}
//   .portal-sidebar.open{transform:translateX(0);}
//   .sidebar-top-row{display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px;}
//   .sidebar-logo{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px;}
//   .logo-icon{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0;}
//   .logo-accent{color:#7c3aed;}
//   .sidebar-close-btn{width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s;}
//   .sidebar-close-btn:hover{background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2);}
//   .nav-section-label{font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px;}
//   .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none;}
//   .nav-item:hover{background:#eef1fe;color:#4f6ef7;}
//   .nav-item.active{background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18);}
//   .nav-item.active .nav-icon-wrap{background:#4f6ef7 !important;color:#fff !important;}
//   .nav-icon-wrap{width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278;}
//   .sidebar-spacer{flex:1;}
//   .user-card{display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px;}
//   .user-mini-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem;}

//   .portal-topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100;}
//   .topbar-left{display:flex;align-items:center;gap:14px;}
//   .hamburger-btn{width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s;}
//   .hamburger-btn:hover{background:#eef1fe;border-color:rgba(79,110,247,.2);}

//   .blob{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;}
//   .blob-1{width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px;}
//   .blob-2{width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px;}

//   .light-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important;}
//   .light-card:hover{box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important;}
//   .hero-card{background:linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;}
//   .hero-card::after{content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none;}
//   .stat-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important;}
//   .stat-card:hover{box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .stat-value{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1;}
//   .stat-label{font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px;}
//   .stat-icon{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07;}
//   .sec-heading{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px;}
//   .sec-heading::after{content:'';flex:1;height:1px;background:#e8ecf5;}

//   .spec-chip-wrap{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0;}
//   .spec-chip{padding:6px 14px !important;border-radius:20px !important;font-size:.78rem !important;font-weight:600 !important;border:1px solid #e8ecf5 !important;cursor:pointer !important;transition:all .18s !important;background:#fff !important;color:#4a5278 !important;user-select:none;}
//   .spec-chip:hover{background:#eef1fe !important;border-color:rgba(79,110,247,.25) !important;color:#4f6ef7 !important;}
//   .spec-chip.active{background:#4f6ef7 !important;border-color:#4f6ef7 !important;color:#fff !important;}

//   .record-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:16px !important;box-shadow:0 1px 6px rgba(79,110,247,.07) !important;transition:box-shadow .22s,transform .22s !important;padding:20px 22px;margin-bottom:12px;}
//   .record-card:hover{box-shadow:0 5px 22px rgba(79,110,247,.13) !important;transform:translateY(-2px);}

//   /* Prescription card */
//   .rx-card{background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s;}
//   .rx-card:hover{box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px);}

//   /* Payment banner */
//   .pay-banner{background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:16px;padding:18px 22px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
//   .pay-banner-paid{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-color:#6ee7b7;}

//   /* Notification dot */
//   .notif-dot{width:8px;height:8px;border-radius:50%;background:#e11d48;position:absolute;top:6px;right:6px;}

//   /* Upload modal */
//   .upload-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:520px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto;}
//   .upload-modal-box .MuiOutlinedInput-root{border-radius:12px !important;background:#f8f9ff !important;}
//   .upload-modal-box .MuiOutlinedInput-notchedOutline{border-color:#e8ecf5 !important;}
//   .upload-modal-box .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{border-color:#4f6ef7 !important;}

//   /* Razorpay modal */
//   .rzp-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:440px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .rzp-modal-box .rzp-logo{font-size:1.5rem;font-weight:800;color:#2563eb;letter-spacing:-1px;}
//   .rzp-modal-box .rzp-logo span{color:#1d4ed8;}

//   /* Feedback modal */
//   .fb-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:460px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}

//   .drop-zone{border:2px dashed #c7cee8;border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:all .2s;background:#f8f9ff;}
//   .drop-zone:hover,.drop-zone.dragover{border-color:#4f6ef7;background:#eef1fe;}
//   .file-preview-wrap{width:100%;border-radius:10px;overflow:hidden;border:1px solid #e8ecf5;margin-top:12px;}
//   .file-preview-wrap iframe{width:100%;height:340px;border:none;display:block;}
//   .file-preview-wrap img{width:100%;display:block;max-height:380px;object-fit:contain;background:#f8f9ff;}

//   .av-blue{background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;}
//   .av-violet{background:linear-gradient(135deg,#7c3aed,#a78bfa) !important;}
//   .av-teal{background:linear-gradient(135deg,#0891b2,#22d3ee) !important;}
//   .av-rose{background:linear-gradient(135deg,#e11d48,#fb7185) !important;}
//   .av-green{background:linear-gradient(135deg,#059669,#34d399) !important;}
//   .av-amber{background:linear-gradient(135deg,#d97706,#fbbf24) !important;}

//   @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
//   .fu{animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;}
// `;

// if (!document.getElementById("portal-styles")) {
//   const s = document.createElement("style");
//   s.id = "portal-styles";
//   s.textContent = globalStyles;
//   document.head.appendChild(s);
// }

// const avatarColors = [
//   "av-blue",
//   "av-violet",
//   "av-teal",
//   "av-rose",
//   "av-green",
//   "av-amber",
// ];
// const getAvatarClass = (i) => avatarColors[i % avatarColors.length];
// const RECORD_TYPES = [
//   "LAB_REPORT",
//   "PRESCRIPTION",
//   "SCAN",
//   "VACCINATION",
//   "SURGERY",
//   "OTHER",
// ];
// const RECORD_COLORS = {
//   LAB_REPORT: {
//     bg: "#eef1fe",
//     color: "#4f6ef7",
//     border: "rgba(79,110,247,.2)",
//   },
//   PRESCRIPTION: {
//     bg: "#ecfdf5",
//     color: "#059669",
//     border: "rgba(5,150,105,.2)",
//   },
//   SCAN: { bg: "#fff1f3", color: "#e11d48", border: "rgba(225,29,72,.2)" },
//   VACCINATION: {
//     bg: "#fffbeb",
//     color: "#d97706",
//     border: "rgba(217,119,6,.2)",
//   },
//   SURGERY: { bg: "#f5f3ff", color: "#7c3aed", border: "rgba(124,58,237,.2)" },
//   OTHER: { bg: "#f5f7ff", color: "#8892b0", border: "#e8ecf5" },
// };
// const getStatusColor = (s) =>
//   s === "APPROVED" ? "success" : s === "REJECTED" ? "error" : "warning";

// // ── NavItem ──────────────────────────────────────────────────────────────────
// function NavItem({ icon, label, active, onClick, badge }) {
//   return (
//     <div
//       className={`nav-item ${active ? "active" : ""}`}
//       onClick={onClick}
//       style={{ position: "relative" }}
//     >
//       <div className="nav-icon-wrap">{icon}</div>
//       {label}
//       {badge > 0 && (
//         <span
//           style={{
//             marginLeft: "auto",
//             background: "#e11d48",
//             color: "#fff",
//             fontSize: ".62rem",
//             fontWeight: 700,
//             borderRadius: "999px",
//             padding: "1px 7px",
//             minWidth: 18,
//             textAlign: "center",
//           }}
//         >
//           {badge}
//         </span>
//       )}
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="stat-card fu">
//       <div className="stat-label">{label}</div>
//       <div className="stat-value" style={{ color }}>
//         {value}
//       </div>
//       <div className="stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── Dummy Razorpay Payment Modal ──────────────────────────────────────────────
// function PaymentModal({ open, onClose, appointment, onPaid }) {
//   const [step, setStep] = useState("summary"); // summary | processing | done
//   const [cardNum, setCardNum] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [name, setName] = useState("");

//   const fieldSx = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "10px !important",
//       background: "#f8f9ff !important",
//     },
//     "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" },
//     "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#2563eb !important",
//     },
//   };

//   const handlePay = async () => {
//     setStep("processing");
//     // Simulate processing delay
//     setTimeout(async () => {
//       try {
//         // 1. Create order
//         const orderRes = await axios.post(
//           `${BASE}/payments/create-order/${appointment.id}`,
//         );
//         // 2. Confirm payment with dummy paymentId
//         const dummyPayId = "pay_dummy_" + Date.now();
//         await axios.post(`${BASE}/payments/confirm/${appointment.id}`, {
//           razorpayPaymentId: dummyPayId,
//         });
//         setStep("done");
//         setTimeout(() => {
//           onPaid(appointment.id);
//           onClose();
//           setStep("summary");
//         }, 1800);
//       } catch (e) {
//         console.error(e);
//         setStep("summary");
//         alert("Payment failed. Try again.");
//       }
//     }, 2000);
//   };

//   if (!appointment) return null;
//   const fee = appointment.doctor?.consultationFee || 0;

//   return (
//     <Modal
//       open={open}
//       onClose={() => {
//         if (step !== "processing") {
//           setStep("summary");
//           onClose();
//         }
//       }}
//     >
//       <Box className="rzp-modal-box">
//         {/* Razorpay-style header */}
//         <Box
//           sx={{
//             background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
//             borderRadius: "14px",
//             p: "18px 22px",
//             mb: 3,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box>
//             <div
//               className="rzp-logo"
//               style={{
//                 color: "#fff",
//                 fontSize: "1.1rem",
//                 fontWeight: 800,
//                 letterSpacing: "-0.5px",
//               }}
//             >
//               razorpay
//             </div>
//             <Typography
//               sx={{
//                 color: "rgba(255,255,255,.7)",
//                 fontSize: ".74rem",
//                 mt: 0.3,
//               }}
//             >
//               Secure Payment Gateway
//             </Typography>
//           </Box>
//           <Box sx={{ textAlign: "right" }}>
//             <Typography
//               sx={{ color: "rgba(255,255,255,.7)", fontSize: ".7rem" }}
//             >
//               Amount to Pay
//             </Typography>
//             <Typography
//               sx={{
//                 color: "#fff",
//                 fontSize: "1.5rem",
//                 fontWeight: 800,
//                 fontFamily: "'Cormorant Garamond',serif",
//               }}
//             >
//               ₹{fee}
//             </Typography>
//           </Box>
//         </Box>

//         {step === "summary" && (
//           <>
//             <Typography
//               sx={{
//                 fontFamily: "'Cormorant Garamond',serif",
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 color: "#1a1f36",
//                 mb: 2,
//               }}
//             >
//               Payment Details
//             </Typography>
//             <Box
//               sx={{
//                 background: "#f8f9ff",
//                 border: "1px solid #e8ecf5",
//                 borderRadius: "12px",
//                 p: 2,
//                 mb: 3,
//               }}
//             >
//               {[
//                 ["Doctor", `Dr. ${appointment.doctor?.name}`],
//                 ["Specialization", appointment.doctor?.specialization],
//                 ["Date", appointment.date],
//                 ["Time", appointment.timeSlot],
//                 ["Consultation Fee", `₹${fee}`],
//               ].map(([l, v]) => (
//                 <Box
//                   key={l}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mb: 0.8,
//                     fontSize: ".85rem",
//                   }}
//                 >
//                   <Typography sx={{ color: "#8892b0", fontSize: ".82rem" }}>
//                     {l}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#1a1f36",
//                       fontWeight: 600,
//                       fontSize: ".82rem",
//                     }}
//                   >
//                     {v}
//                   </Typography>
//                 </Box>
//               ))}
//               <Divider sx={{ my: 1.5, borderColor: "#e8ecf5" }} />
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Typography
//                   sx={{ fontWeight: 700, color: "#1a1f36", fontSize: ".92rem" }}
//                 >
//                   Total
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontWeight: 800,
//                     color: "#2563eb",
//                     fontSize: "1rem",
//                     fontFamily: "'Cormorant Garamond',serif",
//                   }}
//                 >
//                   ₹{fee}
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Card form */}
//             <Typography
//               sx={{
//                 fontSize: ".7rem",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//                 color: "#8892b0",
//                 fontWeight: 600,
//                 mb: 1.5,
//               }}
//             >
//               Card Details
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//               <TextField
//                 size="small"
//                 fullWidth
//                 placeholder="Card Number"
//                 variant="outlined"
//                 sx={fieldSx}
//                 value={cardNum}
//                 onChange={(e) =>
//                   setCardNum(e.target.value.replace(/\D/g, "").slice(0, 16))
//                 }
//                 inputProps={{ maxLength: 16 }}
//               />
//               <TextField
//                 size="small"
//                 fullWidth
//                 placeholder="Cardholder Name"
//                 variant="outlined"
//                 sx={fieldSx}
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <Grid container spacing={1.5}>
//                 <Grid item xs={6}>
//                   <TextField
//                     size="small"
//                     fullWidth
//                     placeholder="MM/YY"
//                     variant="outlined"
//                     sx={fieldSx}
//                     value={expiry}
//                     onChange={(e) => setExpiry(e.target.value.slice(0, 5))}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     size="small"
//                     fullWidth
//                     placeholder="CVV"
//                     type="password"
//                     variant="outlined"
//                     sx={fieldSx}
//                     value={cvv}
//                     onChange={(e) =>
//                       setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
//                     }
//                   />
//                 </Grid>
//               </Grid>
//             </Box>

//             <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
//               <Button
//                 onClick={() => onClose()}
//                 variant="outlined"
//                 fullWidth
//                 sx={{
//                   borderRadius: "10px",
//                   textTransform: "none",
//                   fontWeight: 600,
//                   borderColor: "#e8ecf5",
//                   color: "#8892b0",
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handlePay}
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   borderRadius: "10px",
//                   textTransform: "none",
//                   fontWeight: 700,
//                   fontSize: ".92rem",
//                   background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
//                   boxShadow: "0 4px 14px rgba(37,99,235,.35)",
//                 }}
//               >
//                 Pay ₹{fee}
//               </Button>
//             </Box>
//           </>
//         )}

//         {step === "processing" && (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress sx={{ color: "#2563eb", mb: 2 }} size={48} />
//             <Typography
//               sx={{
//                 fontFamily: "'Cormorant Garamond',serif",
//                 fontSize: "1.3rem",
//                 fontWeight: 700,
//                 color: "#1a1f36",
//                 mb: 0.5,
//               }}
//             >
//               Processing Payment…
//             </Typography>
//             <Typography sx={{ fontSize: ".82rem", color: "#8892b0" }}>
//               Please do not close this window
//             </Typography>
//             <LinearProgress
//               sx={{
//                 mt: 3,
//                 borderRadius: 4,
//                 height: 4,
//                 background: "#e8ecf5",
//                 "& .MuiLinearProgress-bar": { background: "#2563eb" },
//               }}
//             />
//           </Box>
//         )}

//         {step === "done" && (
//           <Box sx={{ textAlign: "center", py: 2 }}>
//             <Box
//               sx={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: "50%",
//                 background: "linear-gradient(135deg,#059669,#34d399)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mx: "auto",
//                 mb: 2,
//                 boxShadow: "0 6px 20px rgba(5,150,105,.3)",
//               }}
//             >
//               <CheckCircleIcon sx={{ color: "#fff", fontSize: 34 }} />
//             </Box>
//             <Typography
//               sx={{
//                 fontFamily: "'Cormorant Garamond',serif",
//                 fontSize: "1.5rem",
//                 fontWeight: 700,
//                 color: "#059669",
//                 mb: 0.5,
//               }}
//             >
//               Payment Successful!
//             </Typography>
//             <Typography sx={{ fontSize: ".85rem", color: "#8892b0" }}>
//               ₹{fee} paid successfully
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ── Feedback Modal ────────────────────────────────────────────────────────────
// function FeedbackModal({ open, onClose, appointment, onSubmitted }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [done, setDone] = useState(false);

//   const handleSubmit = async () => {
//     if (!rating) {
//       alert("Please select a rating");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(`${BASE}/feedback`, {
//         appointmentId: appointment.id,
//         doctorId: appointment.doctor?.id,
//         patientId: appointment.patient?.id,
//         rating,
//         comment,
//       });
//       setDone(true);
//       onSubmitted(appointment.id);
//       setTimeout(() => {
//         setDone(false);
//         setRating(0);
//         setComment("");
//         onClose();
//       }, 1500);
//     } catch (e) {
//       // If endpoint not yet implemented, simulate success
//       setDone(true);
//       onSubmitted(appointment.id);
//       setTimeout(() => {
//         setDone(false);
//         setRating(0);
//         setComment("");
//         onClose();
//       }, 1500);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!appointment) return null;

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="fb-modal-box">
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
//                 background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "0 4px 14px rgba(245,158,11,.3)",
//               }}
//             >
//               <StarIcon sx={{ color: "#fff", fontSize: 22 }} />
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
//                 Rate Your Experience
//               </Typography>
//               <Typography sx={{ fontSize: ".74rem", color: "#8892b0" }}>
//                 Feedback for Dr. {appointment.doctor?.name}
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

//         {!done ? (
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography
//                 sx={{
//                   fontSize: ".75rem",
//                   textTransform: "uppercase",
//                   letterSpacing: "1px",
//                   color: "#8892b0",
//                   fontWeight: 600,
//                   mb: 1.5,
//                 }}
//               >
//                 How was your experience?
//               </Typography>
//               <Rating
//                 value={rating}
//                 onChange={(_, v) => setRating(v)}
//                 size="large"
//                 sx={{
//                   "& .MuiRating-iconFilled": { color: "#f59e0b" },
//                   "& .MuiRating-iconEmpty": { color: "#e8ecf5" },
//                 }}
//               />
//               <Typography
//                 sx={{ fontSize: ".8rem", color: "#8892b0", mt: 0.75 }}
//               >
//                 {rating === 0
//                   ? "Tap to rate"
//                   : [, "Poor", "Fair", "Good", "Very Good", "Excellent"][
//                       rating
//                     ]}
//               </Typography>
//             </Box>

//             <Box>
//               <Typography
//                 sx={{
//                   fontSize: ".7rem",
//                   textTransform: "uppercase",
//                   letterSpacing: "1px",
//                   color: "#8892b0",
//                   fontWeight: 600,
//                   mb: 0.75,
//                 }}
//               >
//                 Your Comments (optional)
//               </Typography>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 size="small"
//                 variant="outlined"
//                 placeholder="Share your experience with this doctor…"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                     background: "#f8f9ff",
//                   },
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#e8ecf5",
//                   },
//                 }}
//               />
//             </Box>

//             <Button
//               onClick={handleSubmit}
//               variant="contained"
//               disabled={loading}
//               sx={{
//                 background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
//                 borderRadius: "12px",
//                 textTransform: "none",
//                 fontWeight: 700,
//                 py: 1.3,
//                 boxShadow: "0 4px 14px rgba(245,158,11,.3)",
//                 "&:hover": { boxShadow: "0 6px 22px rgba(245,158,11,.45)" },
//               }}
//             >
//               {loading ? "Submitting…" : "Submit Feedback ★"}
//             </Button>
//           </Box>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 2 }}>
//             <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>🎉</Typography>
//             <Typography
//               sx={{
//                 fontFamily: "'Cormorant Garamond',serif",
//                 fontSize: "1.4rem",
//                 fontWeight: 700,
//                 color: "#059669",
//               }}
//             >
//               Thank you!
//             </Typography>
//             <Typography sx={{ fontSize: ".85rem", color: "#8892b0", mt: 0.5 }}>
//               Your feedback has been submitted
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ── Upload Medical Record Modal ───────────────────────────────────────────────
// function UploadRecordModal({ open, onClose, patientId, onUploaded }) {
//   const fileRef = useRef();
//   const [form, setForm] = useState({
//     title: "",
//     recordType: "LAB_REPORT",
//     description: "",
//     recordDate: "",
//     issuedBy: "",
//   });
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [dragOver, setDragOver] = useState(false);

//   const reset = () => {
//     setForm({
//       title: "",
//       recordType: "LAB_REPORT",
//       description: "",
//       recordDate: "",
//       issuedBy: "",
//     });
//     setFile(null);
//     setError("");
//     setLoading(false);
//   };
//   const handleClose = () => {
//     reset();
//     onClose();
//   };
//   const handleFile = (f) => {
//     if (f && f.size > 10 * 1024 * 1024) {
//       setError("File must be under 10 MB");
//       return;
//     }
//     setFile(f);
//     setError("");
//   };

//   const handleSubmit = async () => {
//     if (!form.title.trim()) {
//       setError("Title is required");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       const fd = new FormData();
//       fd.append("patientId", patientId);
//       fd.append("title", form.title);
//       fd.append("recordType", form.recordType);
//       fd.append("description", form.description);
//       fd.append("recordDate", form.recordDate);
//       fd.append("issuedBy", form.issuedBy);
//       if (file) fd.append("file", file);
//       const res = await axios.post(`${BASE}/medical-records/upload`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       onUploaded(res.data);
//       handleClose();
//     } catch (err) {
//       console.error(err);
//       setError("Upload failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box className="upload-modal-box">
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
//                 background: "linear-gradient(135deg,#4f6ef7,#818cf8)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "0 4px 14px rgba(79,110,247,.28)",
//               }}
//             >
//               <UploadFileIcon sx={{ color: "#fff", fontSize: 22 }} />
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
//                 Add Medical Record
//               </Typography>
//               <Typography sx={{ fontSize: ".74rem", color: "#8892b0" }}>
//                 Store your health documents securely
//               </Typography>
//             </Box>
//           </Box>
//           <IconButton
//             onClick={handleClose}
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
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: ".7rem",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//                 color: "#8892b0",
//                 fontWeight: 600,
//                 mb: 0.75,
//               }}
//             >
//               Record Title *
//             </Typography>
//             <TextField
//               fullWidth
//               size="small"
//               variant="outlined"
//               placeholder="e.g. Blood Test Report, X-Ray"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />
//           </Box>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Typography
//                 sx={{
//                   fontSize: ".7rem",
//                   textTransform: "uppercase",
//                   letterSpacing: "1px",
//                   color: "#8892b0",
//                   fontWeight: 600,
//                   mb: 0.75,
//                 }}
//               >
//                 Record Type
//               </Typography>
//               <Select
//                 fullWidth
//                 size="small"
//                 value={form.recordType}
//                 onChange={(e) =>
//                   setForm({ ...form, recordType: e.target.value })
//                 }
//                 sx={{
//                   borderRadius: "12px",
//                   background: "#f8f9ff",
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#e8ecf5",
//                   },
//                 }}
//               >
//                 {RECORD_TYPES.map((t) => (
//                   <MenuItem key={t} value={t}>
//                     {t.replace("_", " ")}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography
//                 sx={{
//                   fontSize: ".7rem",
//                   textTransform: "uppercase",
//                   letterSpacing: "1px",
//                   color: "#8892b0",
//                   fontWeight: 600,
//                   mb: 0.75,
//                 }}
//               >
//                 Record Date
//               </Typography>
//               <TextField
//                 fullWidth
//                 size="small"
//                 type="date"
//                 variant="outlined"
//                 value={form.recordDate}
//                 onChange={(e) =>
//                   setForm({ ...form, recordDate: e.target.value })
//                 }
//               />
//             </Grid>
//           </Grid>
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: ".7rem",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//                 color: "#8892b0",
//                 fontWeight: 600,
//                 mb: 0.75,
//               }}
//             >
//               Issued By
//             </Typography>
//             <TextField
//               fullWidth
//               size="small"
//               variant="outlined"
//               placeholder="e.g. Dr. Ramesh Kumar, Apollo Labs"
//               value={form.issuedBy}
//               onChange={(e) => setForm({ ...form, issuedBy: e.target.value })}
//             />
//           </Box>
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: ".7rem",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//                 color: "#8892b0",
//                 fontWeight: 600,
//                 mb: 0.75,
//               }}
//             >
//               Notes
//             </Typography>
//             <TextField
//               fullWidth
//               size="small"
//               multiline
//               rows={2}
//               variant="outlined"
//               placeholder="Optional notes"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             />
//           </Box>
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: ".7rem",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//                 color: "#8892b0",
//                 fontWeight: 600,
//                 mb: 0.75,
//               }}
//             >
//               Attach File (PDF/Image — max 10 MB)
//             </Typography>
//             <div
//               className={`drop-zone ${dragOver ? "dragover" : ""}`}
//               onClick={() => fileRef.current?.click()}
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 setDragOver(true);
//               }}
//               onDragLeave={() => setDragOver(false)}
//               onDrop={(e) => {
//                 e.preventDefault();
//                 setDragOver(false);
//                 handleFile(e.dataTransfer.files[0]);
//               }}
//             >
//               <input
//                 ref={fileRef}
//                 type="file"
//                 hidden
//                 accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
//                 onChange={(e) => handleFile(e.target.files[0])}
//               />
//               <UploadFileIcon sx={{ fontSize: 32, color: "#c0c8e0", mb: 1 }} />
//               {file ? (
//                 <Typography
//                   sx={{ fontSize: ".85rem", fontWeight: 600, color: "#4f6ef7" }}
//                 >
//                   {file.name}
//                 </Typography>
//               ) : (
//                 <Typography sx={{ fontSize: ".82rem", color: "#8892b0" }}>
//                   Click or drag & drop your file here
//                 </Typography>
//               )}
//             </div>
//           </Box>
//           {error && (
//             <Box
//               sx={{
//                 background: "#fff1f3",
//                 border: "1px solid rgba(225,29,72,.2)",
//                 borderRadius: "10px",
//                 padding: "10px 14px",
//                 fontSize: ".83rem",
//                 color: "#e11d48",
//                 fontWeight: 500,
//               }}
//             >
//               ⚠ {error}
//             </Box>
//           )}
//           {loading && <LinearProgress sx={{ borderRadius: 4, height: 4 }} />}
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             disabled={loading}
//             sx={{
//               background: "linear-gradient(135deg,#4f6ef7,#818cf8)",
//               borderRadius: "12px",
//               textTransform: "none",
//               fontWeight: 700,
//               fontSize: ".92rem",
//               py: 1.4,
//               boxShadow: "0 4px 14px rgba(79,110,247,.28)",
//             }}
//           >
//             {loading ? "Uploading…" : "Save Record"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// // ── Medical Record Card ────────────────────────────────────────────────────────
// function RecordCard({ record, onDelete }) {
//   const [showPreview, setShowPreview] = useState(false);
//   const sc = RECORD_COLORS[record.recordType] || RECORD_COLORS.OTHER;
//   const fileUrl = record.fileName
//     ? `${BASE}/medical-records/file/${record.fileName}`
//     : null;
//   const lower = (record.fileName || "").toLowerCase();
//   const isPdf = lower.endsWith(".pdf");
//   const isImage =
//     lower.endsWith(".png") ||
//     lower.endsWith(".jpg") ||
//     lower.endsWith(".jpeg") ||
//     lower.endsWith(".webp");
//   return (
//     <div className="record-card">
//       <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
//         <Box
//           sx={{
//             width: 46,
//             height: 46,
//             borderRadius: "13px",
//             flexShrink: 0,
//             background: sc.bg,
//             border: `1px solid ${sc.border}`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <DescriptionIcon sx={{ color: sc.color, fontSize: 22 }} />
//         </Box>
//         <Box sx={{ flex: 1, minWidth: 0 }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               flexWrap: "wrap",
//               mb: 0.5,
//             }}
//           >
//             <Typography
//               sx={{ fontWeight: 700, fontSize: ".92rem", color: "#1a1f36" }}
//             >
//               {record.title}
//             </Typography>
//             <Chip
//               label={record.recordType?.replace("_", " ")}
//               size="small"
//               sx={{
//                 background: sc.bg,
//                 color: sc.color,
//                 border: `1px solid ${sc.border}`,
//                 fontWeight: 600,
//                 fontSize: ".68rem",
//                 height: 22,
//               }}
//             />
//           </Box>
//           {record.issuedBy && (
//             <Typography sx={{ fontSize: ".78rem", color: "#8892b0", mb: 0.4 }}>
//               👤 {record.issuedBy}
//             </Typography>
//           )}
//           {record.recordDate && (
//             <Typography sx={{ fontSize: ".78rem", color: "#8892b0", mb: 0.4 }}>
//               📅 {record.recordDate}
//             </Typography>
//           )}
//           {record.description && (
//             <Typography sx={{ fontSize: ".8rem", color: "#4a5278", mt: 0.5 }}>
//               {record.description}
//             </Typography>
//           )}
//           {fileUrl && (
//             <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
//               {(isPdf || isImage) && (
//                 <button
//                   onClick={() => setShowPreview((p) => !p)}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: 5,
//                     padding: "5px 12px",
//                     borderRadius: 8,
//                     cursor: "pointer",
//                     fontSize: ".76rem",
//                     fontWeight: 600,
//                     background: "linear-gradient(135deg,#4f6ef7,#818cf8)",
//                     color: "#fff",
//                     border: "none",
//                     fontFamily: "'Outfit',sans-serif",
//                   }}
//                 >
//                   {showPreview ? (
//                     <>
//                       <VisibilityOffIcon sx={{ fontSize: 13 }} /> Hide
//                     </>
//                   ) : (
//                     <>
//                       <VisibilityIcon sx={{ fontSize: 13 }} /> Preview
//                     </>
//                   )}
//                 </button>
//               )}
//               <a
//                 href={fileUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: 5,
//                   padding: "5px 12px",
//                   borderRadius: 8,
//                   fontSize: ".76rem",
//                   fontWeight: 600,
//                   textDecoration: "none",
//                   background: "#eef1fe",
//                   color: "#4f6ef7",
//                   border: "1px solid rgba(79,110,247,.2)",
//                 }}
//               >
//                 <OpenInNewIcon sx={{ fontSize: 13 }} /> Open
//               </a>
//               <a
//                 href={fileUrl}
//                 download={record.fileName}
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: 5,
//                   padding: "5px 12px",
//                   borderRadius: 8,
//                   fontSize: ".76rem",
//                   fontWeight: 600,
//                   textDecoration: "none",
//                   background: "#f5f7ff",
//                   color: "#4a5278",
//                   border: "1px solid #e8ecf5",
//                 }}
//               >
//                 <DownloadIcon sx={{ fontSize: 13 }} /> Download
//               </a>
//             </Box>
//           )}
//           {showPreview && fileUrl && (
//             <div className="file-preview-wrap">
//               {isPdf && <iframe src={fileUrl} title={record.title} />}
//               {isImage && <img src={fileUrl} alt={record.title} />}
//             </div>
//           )}
//         </Box>
//         <IconButton
//           size="small"
//           onClick={() => onDelete(record.id)}
//           sx={{
//             color: "#e11d48",
//             background: "#fff1f3",
//             borderRadius: "9px",
//             flexShrink: 0,
//             "&:hover": { background: "#fce7f3" },
//           }}
//         >
//           <DeleteIcon sx={{ fontSize: 17 }} />
//         </IconButton>
//       </Box>
//     </div>
//   );
// }

// // ── Main Dashboard ─────────────────────────────────────────────────────────────
// export default function PatientDashboard() {
//   const { user } = useContext(AuthContext);
//   const userId = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [patient, setPatient] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [prescriptions, setPrescriptions] = useState([]); // list from backend
//   const [payments, setPayments] = useState({}); // {appointmentId: PaymentRecord}
//   const [feedbackDone, setFeedbackDone] = useState({}); // {appointmentId: true}
//   const [view, setView] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeSpec, setActiveSpec] = useState("All");
//   const [uploadOpen, setUploadOpen] = useState(false);
//   const [recordTypeFilter, setRecordTypeFilter] = useState("ALL");
//   const [payAppt, setPayAppt] = useState(null); // appointment to pay
//   const [fbAppt, setFbAppt] = useState(null); // appointment for feedback
//   const [notifications, setNotifications] = useState([]); // unpaid approved appointments

//   // ── Fetch ──────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const patRes = await axios.get(`${BASE}/patient/user/${userId}`);
//         setPatient(patRes.data);
//       } catch (err) {
//         if (err.response?.status === 404) {
//           setProfileMissing(true);
//           setLoading(false);
//           return;
//         }
//         setError("Failed to load patient.");
//         setLoading(false);
//         return;
//       }
//       try {
//         const dRes = await axios.get(`${BASE}/doctor`);
//         setDoctors(dRes.data);
//       } catch {}
//       setLoading(false);
//     };
//     if (userId) load();
//     else {
//       setError("User ID missing.");
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (!patient) return;
//     // Appointments
//     axios
//       .get(`${BASE}/appointments/patient/${patient.id}`)
//       .then((r) => {
//         setAppointments(r.data);
//         // Compute notifications: approved but not yet paid
//         const unpaid = r.data.filter((a) => a.status === "APPROVED");
//         setNotifications(unpaid);
//       })
//       .catch(() => {});
//     // Medical records
//     axios
//       .get(`${BASE}/medical-records/patient/${patient.id}`)
//       .then((r) => setMedicalRecords(r.data))
//       .catch(() => {});
//     // Prescriptions
//     axios
//       .get(`${BASE}/prescriptions/patient/${patient.id}`)
//       .then((r) => setPrescriptions(r.data))
//       .catch(() => {});
//     // Payments
//     axios
//       .get(`${BASE}/payments/patient/${patient.id}`)
//       .then((r) => {
//         const map = {};
//         r.data.forEach((p) => {
//           map[p.appointment?.id] = p;
//         });
//         setPayments(map);
//       })
//       .catch(() => {});
//   }, [patient]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };
//   const handleNavClick = (k) => {
//     setView(k);
//     setSidebarOpen(false);
//   };
//   const countStatus = (s) => appointments.filter((a) => a.status === s).length;

//   const specializations = [
//     "All",
//     ...Array.from(
//       new Set(doctors.map((d) => d.specialization).filter(Boolean)),
//     ).sort(),
//   ];
//   const filteredDoctors = doctors.filter((doc) => {
//     const bySpec = activeSpec === "All" || doc.specialization === activeSpec;
//     const q = searchQuery.toLowerCase();
//     const bySearch =
//       !q ||
//       doc.name?.toLowerCase().includes(q) ||
//       doc.specialization?.toLowerCase().includes(q) ||
//       doc.hospital?.toLowerCase().includes(q);
//     return bySpec && bySearch;
//   });

//   const handleDeleteRecord = async (id) => {
//     if (!window.confirm("Delete this medical record?")) return;
//     try {
//       await axios.delete(`${BASE}/medical-records/${id}`);
//       setMedicalRecords((prev) => prev.filter((r) => r.id !== id));
//     } catch {
//       alert("Failed to delete record");
//     }
//   };

//   const filteredRecords =
//     recordTypeFilter === "ALL"
//       ? medicalRecords
//       : medicalRecords.filter((r) => r.recordType === recordTypeFilter);

//   // After payment confirmed
//   const handlePaymentDone = (appointmentId) => {
//     setPayments((prev) => ({
//       ...prev,
//       [appointmentId]: { status: "SUCCESS" },
//     }));
//     setNotifications((prev) => prev.filter((a) => a.id !== appointmentId));
//   };

//   // After feedback submitted
//   const handleFeedbackDone = (appointmentId) => {
//     setFeedbackDone((prev) => ({ ...prev, [appointmentId]: true }));
//   };

//   // Unpaid approved count for badge
//   const unpaidCount = appointments.filter(
//     (a) => a.status === "APPROVED" && !payments[a.id],
//   ).length;

//   const menuItems = [
//     {
//       key: "dashboard",
//       label: "Dashboard",
//       icon: <DashboardIcon sx={{ fontSize: 18 }} />,
//     },
//     {
//       key: "appointments",
//       label: "My Appointments",
//       icon: <EventIcon sx={{ fontSize: 18 }} />,
//       badge: unpaidCount,
//     },
//     {
//       key: "book",
//       label: "Book Appointment",
//       icon: <AddIcon sx={{ fontSize: 18 }} />,
//     },
//     {
//       key: "records",
//       label: "Medical Records",
//       icon: <FolderIcon sx={{ fontSize: 18 }} />,
//     },
//     {
//       key: "prescriptions",
//       label: "Prescriptions",
//       icon: <LocalPharmacyIcon sx={{ fontSize: 18 }} />,
//     },
//     {
//       key: "profile",
//       label: "Profile",
//       icon: <PersonIcon sx={{ fontSize: 18 }} />,
//     },
//   ];

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
//   if (error)
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
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   if (profileMissing || !patient)
//     return (
//       <PatientProfileForm
//         userId={userId}
//         onCreated={(created) => {
//           setPatient(created);
//           setProfileMissing(false);
//           axios
//             .get(`${BASE}/doctor`)
//             .then((r) => setDoctors(r.data))
//             .catch(() => {});
//         }}
//       />
//     );

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "#f5f7ff",
//         fontFamily: "'Outfit',sans-serif",
//       }}
//     >
//       <div className="blob blob-1" />
//       <div className="blob blob-2" />

//       {sidebarOpen && (
//         <div
//           className="sidebar-overlay"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* ── Sidebar ── */}
//       <div className={`portal-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-top-row">
//           <div className="sidebar-logo">
//             <div className="logo-icon">✦</div>Med
//             <span className="logo-accent">Vault</span>
//           </div>
//           <div
//             className="sidebar-close-btn"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <CloseIcon sx={{ fontSize: 16 }} />
//           </div>
//         </div>
//         <div className="nav-section-label">Navigation</div>
//         {menuItems.map((item) => (
//           <NavItem
//             key={item.key}
//             icon={item.icon}
//             label={item.label}
//             active={view === item.key}
//             onClick={() => handleNavClick(item.key)}
//             badge={item.badge || 0}
//           />
//         ))}
//         <div className="sidebar-spacer" />
//         <div className="user-card">
//           <div className="user-mini-av">{patient.name?.charAt(0)}</div>
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: ".85rem",
//                 fontWeight: 600,
//                 color: "#1a1f36",
//                 lineHeight: 1.2,
//               }}
//             >
//               {patient.name}
//             </Typography>
//             <Typography sx={{ fontSize: ".72rem", color: "#8892b0" }}>
//               Patient
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
//             className="nav-icon-wrap"
//             style={{ background: "#fff1f3", color: "#e11d48" }}
//           >
//             <LogoutIcon sx={{ fontSize: 16 }} />
//           </div>
//           Sign Out
//         </button>
//       </div>

//       {/* ── Top bar ── */}
//       <div className="portal-topbar">
//         <div className="topbar-left">
//           <div className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
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
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           {unpaidCount > 0 && (
//             <Box
//               onClick={() => handleNavClick("appointments")}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 0.75,
//                 cursor: "pointer",
//                 background: "#fff7ed",
//                 border: "1px solid #fcd34d",
//                 borderRadius: "10px",
//                 px: 1.5,
//                 py: 0.75,
//               }}
//             >
//               <NotificationsIcon sx={{ fontSize: 16, color: "#d97706" }} />
//               <Typography
//                 sx={{ fontSize: ".75rem", fontWeight: 600, color: "#d97706" }}
//               >
//                 {unpaidCount} fee pending
//               </Typography>
//             </Box>
//           )}
//           <Button
//             startIcon={<LogoutIcon />}
//             onClick={handleLogout}
//             size="small"
//             sx={{
//               color: "#e11d48",
//               borderColor: "rgba(225,29,72,.3)",
//               textTransform: "none",
//               borderRadius: 2,
//               border: "1px solid",
//               fontFamily: "'Outfit',sans-serif",
//             }}
//           >
//             Logout
//           </Button>
//         </Box>
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
//             {/* ─── DASHBOARD ─── */}
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
//                     Good morning, {patient.name?.split(" ")[0]} ☀️
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     Here's a summary of your health portal
//                   </Typography>
//                 </Box>

//                 {/* Fee payment notifications */}
//                 {appointments
//                   .filter((a) => a.status === "APPROVED" && !payments[a.id])
//                   .map((appt) => (
//                     <Box key={appt.id} className="pay-banner" sx={{ mb: 2 }}>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
//                       >
//                         <Box
//                           sx={{
//                             width: 38,
//                             height: 38,
//                             borderRadius: "11px",
//                             background:
//                               "linear-gradient(135deg,#f59e0b,#fbbf24)",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                           }}
//                         >
//                           <NotificationsIcon
//                             sx={{ color: "#fff", fontSize: 20 }}
//                           />
//                         </Box>
//                         <Box>
//                           <Typography
//                             sx={{
//                               fontWeight: 600,
//                               fontSize: ".88rem",
//                               color: "#92400e",
//                             }}
//                           >
//                             Appointment Confirmed — Fee Pending
//                           </Typography>
//                           <Typography
//                             sx={{ fontSize: ".78rem", color: "#a16207" }}
//                           >
//                             Dr. {appt.doctor?.name} · {appt.date} · ₹
//                             {appt.doctor?.consultationFee}
//                           </Typography>
//                         </Box>
//                       </Box>
//                       <Button
//                         onClick={() => setPayAppt(appt)}
//                         variant="contained"
//                         size="small"
//                         startIcon={<PaymentIcon sx={{ fontSize: 16 }} />}
//                         sx={{
//                           background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
//                           borderRadius: "10px",
//                           textTransform: "none",
//                           fontWeight: 700,
//                           boxShadow: "0 3px 10px rgba(245,158,11,.35)",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         Pay ₹{appt.doctor?.consultationFee}
//                       </Button>
//                     </Box>
//                   ))}

//                 <Box
//                   className="hero-card"
//                   sx={{ mb: 4, display: "flex", alignItems: "center", gap: 3 }}
//                 >
//                   <Avatar
//                     className="av-blue"
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: "22px",
//                       fontSize: "2rem",
//                       fontFamily: "'Cormorant Garamond',serif",
//                       boxShadow: "0 8px 24px rgba(79,110,247,.3)",
//                     }}
//                   >
//                     {patient.name?.charAt(0)}
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
//                       {patient.name}
//                     </Typography>
//                     <Typography
//                       sx={{ color: "#8892b0", fontSize: ".82rem", mt: 0.5 }}
//                     >
//                       Patient ID · #{patient.id}
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         gap: 1,
//                         mt: 1.5,
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       {[patient.gender, `Age ${patient.age}`, patient.contact]
//                         .filter(Boolean)
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
//                 </Box>

//                 <Grid container spacing={2.5} sx={{ mb: 4 }}>
//                   <Grid item xs={6} sm={3}>
//                     <StatCard
//                       label="Appointments"
//                       value={appointments.length}
//                       icon="📅"
//                       color="#4f6ef7"
//                     />
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <StatCard
//                       label="Approved"
//                       value={countStatus("APPROVED")}
//                       icon="✓"
//                       color="#059669"
//                     />
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <StatCard
//                       label="Prescriptions"
//                       value={prescriptions.length}
//                       icon="💊"
//                       color="#7c3aed"
//                     />
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <StatCard
//                       label="Medical Records"
//                       value={medicalRecords.length}
//                       icon="📋"
//                       color="#0891b2"
//                     />
//                   </Grid>
//                 </Grid>

//                 <div className="sec-heading">Recent Appointments</div>
//                 <Grid container spacing={2.5}>
//                   {appointments.slice(0, 3).map((appt, i) => (
//                     <Grid item xs={12} md={4} key={appt.id}>
//                       <motion.div whileHover={{ scale: 1.03 }}>
//                         <Card className="light-card">
//                           <CardContent sx={{ p: "20px !important" }}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 1.5,
//                                 mb: 1.5,
//                               }}
//                             >
//                               <Avatar
//                                 className={getAvatarClass(i)}
//                                 sx={{
//                                   width: 44,
//                                   height: 44,
//                                   borderRadius: "12px",
//                                   fontSize: "1rem",
//                                   fontWeight: 700,
//                                 }}
//                               >
//                                 {appt.doctor?.name?.charAt(0)}
//                               </Avatar>
//                               <Box>
//                                 <Typography
//                                   sx={{
//                                     fontWeight: 600,
//                                     fontSize: ".92rem",
//                                     color: "#1a1f36",
//                                   }}
//                                 >
//                                   Dr. {appt.doctor?.name}
//                                 </Typography>
//                                 <Typography
//                                   sx={{ fontSize: ".76rem", color: "#8892b0" }}
//                                 >
//                                   {appt.doctor?.specialization}
//                                 </Typography>
//                               </Box>
//                             </Box>
//                             <Typography
//                               sx={{
//                                 fontSize: ".82rem",
//                                 color: "#4a5278",
//                                 mb: 1,
//                               }}
//                             >
//                               📅 {appt.date} · 🕐 {appt.timeSlot}
//                             </Typography>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                                 flexWrap: "wrap",
//                                 gap: 0.75,
//                               }}
//                             >
//                               <Chip
//                                 label={appt.status || "PENDING"}
//                                 color={getStatusColor(appt.status)}
//                                 size="small"
//                                 sx={{ fontWeight: 600, fontSize: ".72rem" }}
//                               />
//                               {appt.status === "APPROVED" &&
//                                 !payments[appt.id] && (
//                                   <Chip
//                                     label={`₹${appt.doctor?.consultationFee} pending`}
//                                     size="small"
//                                     onClick={() => setPayAppt(appt)}
//                                     sx={{
//                                       background: "#fff7ed",
//                                       color: "#d97706",
//                                       border: "1px solid #fcd34d",
//                                       fontWeight: 600,
//                                       fontSize: ".68rem",
//                                       cursor: "pointer",
//                                     }}
//                                   />
//                                 )}
//                               {payments[appt.id]?.status === "SUCCESS" && (
//                                 <Chip
//                                   label="Paid ✓"
//                                   size="small"
//                                   sx={{
//                                     background: "#ecfdf5",
//                                     color: "#059669",
//                                     border: "1px solid rgba(5,150,105,.2)",
//                                     fontWeight: 600,
//                                     fontSize: ".68rem",
//                                   }}
//                                 />
//                               )}
//                             </Box>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     </Grid>
//                   ))}
//                   {appointments.length === 0 && (
//                     <Grid item xs={12}>
//                       <Box
//                         sx={{ textAlign: "center", py: 5, color: "#8892b0" }}
//                       >
//                         <Typography sx={{ fontSize: "2rem", mb: 1 }}>
//                           📅
//                         </Typography>
//                         <Typography sx={{ fontWeight: 500 }}>
//                           No appointments yet.
//                         </Typography>
//                         <Button
//                           onClick={() => setView("book")}
//                           size="small"
//                           variant="contained"
//                           sx={{
//                             mt: 2,
//                             background:
//                               "linear-gradient(135deg,#4f6ef7,#818cf8)",
//                             borderRadius: "10px",
//                             textTransform: "none",
//                             fontWeight: 600,
//                           }}
//                         >
//                           Book your first appointment →
//                         </Button>
//                       </Box>
//                     </Grid>
//                   )}
//                 </Grid>
//               </>
//             )}

//             {/* ─── MY APPOINTMENTS ─── */}
//             {view === "appointments" && (
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
//                     My Appointments
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     {appointments.length} total · {countStatus("APPROVED")}{" "}
//                     approved
//                   </Typography>
//                 </Box>

//                 {/* Fee payment banners */}
//                 {appointments
//                   .filter((a) => a.status === "APPROVED" && !payments[a.id])
//                   .map((appt) => (
//                     <Box key={appt.id} className="pay-banner">
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
//                       >
//                         <CurrencyRupeeIcon
//                           sx={{ color: "#d97706", fontSize: 20, flexShrink: 0 }}
//                         />
//                         <Box>
//                           <Typography
//                             sx={{
//                               fontWeight: 600,
//                               fontSize: ".85rem",
//                               color: "#92400e",
//                             }}
//                           >
//                             Consultation fee pending for Dr. {appt.doctor?.name}
//                           </Typography>
//                           <Typography
//                             sx={{ fontSize: ".76rem", color: "#a16207" }}
//                           >
//                             {appt.date} · {appt.timeSlot} · ₹
//                             {appt.doctor?.consultationFee}
//                           </Typography>
//                         </Box>
//                       </Box>
//                       <Button
//                         onClick={() => setPayAppt(appt)}
//                         variant="contained"
//                         size="small"
//                         startIcon={<PaymentIcon sx={{ fontSize: 16 }} />}
//                         sx={{
//                           background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
//                           borderRadius: "10px",
//                           textTransform: "none",
//                           fontWeight: 700,
//                           boxShadow: "0 3px 10px rgba(245,158,11,.3)",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         Pay Now ₹{appt.doctor?.consultationFee}
//                       </Button>
//                     </Box>
//                   ))}

//                 {appointments.length === 0 ? (
//                   <Alert severity="info" sx={{ borderRadius: "14px" }}>
//                     No appointments booked yet.
//                   </Alert>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {appointments.map((appt, i) => {
//                       const isPaid = payments[appt.id]?.status === "SUCCESS";
//                       const hasFeedback = feedbackDone[appt.id];
//                       return (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{ scale: 1.03 }}>
//                             <Card className="light-card">
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
//                                     className={getAvatarClass(i)}
//                                     sx={{
//                                       width: 46,
//                                       height: 46,
//                                       borderRadius: "14px",
//                                       fontSize: "1.1rem",
//                                       fontWeight: 700,
//                                     }}
//                                   >
//                                     {appt.doctor?.name?.charAt(0)}
//                                   </Avatar>
//                                   <Box sx={{ flex: 1 }}>
//                                     <Typography
//                                       sx={{
//                                         fontWeight: 600,
//                                         fontSize: ".95rem",
//                                         color: "#1a1f36",
//                                       }}
//                                     >
//                                       Dr. {appt.doctor?.name}
//                                     </Typography>
//                                     <Typography
//                                       sx={{
//                                         fontSize: ".76rem",
//                                         color: "#8892b0",
//                                       }}
//                                     >
//                                       {appt.doctor?.specialization}
//                                     </Typography>
//                                   </Box>
//                                   {appt.doctor?.consultationFee > 0 && (
//                                     <Chip
//                                       label={`₹${appt.doctor.consultationFee}`}
//                                       size="small"
//                                       sx={{
//                                         background: "#eef1fe",
//                                         color: "#4f6ef7",
//                                         fontWeight: 700,
//                                         fontSize: ".72rem",
//                                       }}
//                                     />
//                                   )}
//                                 </Box>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".82rem",
//                                     color: "#4a5278",
//                                     mb: 0.6,
//                                   }}
//                                 >
//                                   📅 {appt.date}
//                                 </Typography>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".82rem",
//                                     color: "#4a5278",
//                                     mb: 1.5,
//                                   }}
//                                 >
//                                   🕐 {appt.timeSlot}
//                                 </Typography>

//                                 <Box
//                                   sx={{
//                                     display: "flex",
//                                     gap: 0.75,
//                                     flexWrap: "wrap",
//                                     mb: 1.5,
//                                   }}
//                                 >
//                                   <Chip
//                                     label={appt.status || "PENDING"}
//                                     color={getStatusColor(appt.status)}
//                                     size="small"
//                                     sx={{ fontWeight: 600, fontSize: ".72rem" }}
//                                   />
//                                   {isPaid && (
//                                     <Chip
//                                       label="Paid ✓"
//                                       size="small"
//                                       sx={{
//                                         background: "#ecfdf5",
//                                         color: "#059669",
//                                         border: "1px solid rgba(5,150,105,.2)",
//                                         fontWeight: 600,
//                                         fontSize: ".68rem",
//                                       }}
//                                     />
//                                   )}
//                                 </Box>

//                                 {/* Pay button for approved unpaid */}
//                                 {appt.status === "APPROVED" && !isPaid && (
//                                   <Button
//                                     fullWidth
//                                     onClick={() => setPayAppt(appt)}
//                                     variant="contained"
//                                     size="small"
//                                     startIcon={
//                                       <PaymentIcon sx={{ fontSize: 15 }} />
//                                     }
//                                     sx={{
//                                       background:
//                                         "linear-gradient(135deg,#f59e0b,#fbbf24)",
//                                       borderRadius: "9px",
//                                       textTransform: "none",
//                                       fontWeight: 700,
//                                       fontSize: ".8rem",
//                                       boxShadow:
//                                         "0 3px 10px rgba(245,158,11,.3)",
//                                       mb: 1,
//                                     }}
//                                   >
//                                     Pay Consultation Fee ₹
//                                     {appt.doctor?.consultationFee}
//                                   </Button>
//                                 )}

//                                 {/* Feedback button for approved (paid) appointments */}
//                                 {appt.status === "APPROVED" &&
//                                   isPaid &&
//                                   !hasFeedback && (
//                                     <Button
//                                       fullWidth
//                                       onClick={() => setFbAppt(appt)}
//                                       variant="outlined"
//                                       size="small"
//                                       startIcon={
//                                         <StarIcon sx={{ fontSize: 15 }} />
//                                       }
//                                       sx={{
//                                         borderRadius: "9px",
//                                         textTransform: "none",
//                                         fontWeight: 600,
//                                         fontSize: ".78rem",
//                                         borderColor: "rgba(245,158,11,.4)",
//                                         color: "#d97706",
//                                         "&:hover": { background: "#fffbeb" },
//                                       }}
//                                     >
//                                       Rate Dr.{" "}
//                                       {appt.doctor?.name?.split(" ")[0]}
//                                     </Button>
//                                   )}
//                                 {hasFeedback && (
//                                   <Typography
//                                     sx={{
//                                       fontSize: ".75rem",
//                                       color: "#059669",
//                                       fontWeight: 600,
//                                       textAlign: "center",
//                                     }}
//                                   >
//                                     ⭐ Feedback submitted — Thank you!
//                                   </Typography>
//                                 )}
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

//             {/* ─── BOOK APPOINTMENT ─── */}
//             {view === "book" && (
//               <>
//                 <Box sx={{ mb: 3 }}>
//                   <Typography
//                     sx={{
//                       fontFamily: "'Cormorant Garamond',serif",
//                       fontSize: "2rem",
//                       fontWeight: 700,
//                       color: "#1a1f36",
//                     }}
//                   >
//                     Book Appointment
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     Filter by specialization and find the right doctor
//                   </Typography>
//                 </Box>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   placeholder="Search doctor name, specialization, hospital…"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon sx={{ color: "#b0b8d0", fontSize: 20 }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     mb: 2.5,
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "14px",
//                       background: "#fff",
//                       "& fieldset": { borderColor: "#e8ecf5" },
//                       "&:hover fieldset": { borderColor: "#c7cee8" },
//                       "&.Mui-focused fieldset": { borderColor: "#4f6ef7" },
//                     },
//                   }}
//                 />
//                 <Box sx={{ mb: 3 }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                       mb: 1.5,
//                     }}
//                   >
//                     <FilterListIcon sx={{ fontSize: 16, color: "#8892b0" }} />
//                     <Typography
//                       sx={{
//                         fontSize: ".72rem",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         color: "#8892b0",
//                         fontWeight: 600,
//                       }}
//                     >
//                       Filter by Specialization
//                     </Typography>
//                   </Box>
//                   <div className="spec-chip-wrap">
//                     {specializations.map((spec) => (
//                       <div
//                         key={spec}
//                         className={`spec-chip ${activeSpec === spec ? "active" : ""}`}
//                         onClick={() => setActiveSpec(spec)}
//                       >
//                         {spec}
//                       </div>
//                     ))}
//                   </div>
//                 </Box>
//                 <Box
//                   sx={{
//                     mb: 2.5,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Typography sx={{ fontSize: ".8rem", color: "#8892b0" }}>
//                     {filteredDoctors.length} doctor
//                     {filteredDoctors.length !== 1 ? "s" : ""} found
//                     {activeSpec !== "All" ? ` · ${activeSpec}` : ""}
//                     {searchQuery ? ` · "${searchQuery}"` : ""}
//                   </Typography>
//                   {(searchQuery || activeSpec !== "All") && (
//                     <Typography
//                       sx={{
//                         fontSize: ".78rem",
//                         color: "#4f6ef7",
//                         fontWeight: 600,
//                         cursor: "pointer",
//                       }}
//                       onClick={() => {
//                         setSearchQuery("");
//                         setActiveSpec("All");
//                       }}
//                     >
//                       Clear filters ✕
//                     </Typography>
//                   )}
//                 </Box>
//                 {filteredDoctors.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>
//                       🔍
//                     </Typography>
//                     <Typography sx={{ fontWeight: 500 }}>
//                       No doctors found.
//                     </Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {filteredDoctors.map((doc, i) => (
//                       <Grid item xs={12} sm={6} md={4} key={doc.id}>
//                         <motion.div whileHover={{ scale: 1.03 }}>
//                           <Card className="light-card" sx={{ p: 3 }}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "center",
//                                 textAlign: "center",
//                               }}
//                             >
//                               <Avatar
//                                 className={getAvatarClass(i)}
//                                 sx={{
//                                   width: 68,
//                                   height: 68,
//                                   borderRadius: "20px",
//                                   mb: 1.5,
//                                   fontSize: "1.8rem",
//                                   fontFamily: "'Cormorant Garamond',serif",
//                                   fontWeight: 700,
//                                   boxShadow: "0 6px 20px rgba(79,110,247,.22)",
//                                 }}
//                               >
//                                 {doc.name?.charAt(0)}
//                               </Avatar>
//                               <Typography
//                                 sx={{
//                                   fontWeight: 700,
//                                   fontSize: ".95rem",
//                                   color: "#1a1f36",
//                                 }}
//                               >
//                                 Dr. {doc.name}
//                               </Typography>
//                               <Chip
//                                 label={doc.specialization || "General"}
//                                 size="small"
//                                 sx={{
//                                   mt: 0.75,
//                                   mb: 0.5,
//                                   background: "#eef1fe",
//                                   color: "#4f6ef7",
//                                   border: "1px solid rgba(79,110,247,.18)",
//                                   fontWeight: 600,
//                                   fontSize: ".72rem",
//                                 }}
//                               />
//                               {doc.qualification && (
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".76rem",
//                                     color: "#8892b0",
//                                     mb: 0.3,
//                                   }}
//                                 >
//                                   {doc.qualification}
//                                 </Typography>
//                               )}
//                               {doc.experience > 0 && (
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".76rem",
//                                     color: "#8892b0",
//                                     mb: 0.3,
//                                   }}
//                                 >
//                                   🏅 {doc.experience} yrs experience
//                                 </Typography>
//                               )}
//                               {doc.hospital && (
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".76rem",
//                                     color: "#8892b0",
//                                     mb: 0.5,
//                                   }}
//                                 >
//                                   🏥 {doc.hospital}
//                                 </Typography>
//                               )}

//                               {/* Fee display */}
//                               {doc.consultationFee > 0 && (
//                                 <Box
//                                   sx={{
//                                     background: "#fffbeb",
//                                     border: "1px solid #fcd34d",
//                                     borderRadius: "10px",
//                                     px: 1.5,
//                                     py: 0.75,
//                                     mb: 2,
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 0.75,
//                                   }}
//                                 >
//                                   <CurrencyRupeeIcon
//                                     sx={{ fontSize: 14, color: "#d97706" }}
//                                   />
//                                   <Typography
//                                     sx={{
//                                       fontSize: ".8rem",
//                                       fontWeight: 700,
//                                       color: "#d97706",
//                                     }}
//                                   >
//                                     Consultation Fee: ₹{doc.consultationFee}
//                                   </Typography>
//                                 </Box>
//                               )}

//                               <Button
//                                 variant="contained"
//                                 onClick={() =>
//                                   navigate(
//                                     `/book-appointment/${patient.id}/${doc.id}`,
//                                   )
//                                 }
//                                 sx={{
//                                   background:
//                                     "linear-gradient(135deg,#4f6ef7,#818cf8)",
//                                   borderRadius: "10px",
//                                   textTransform: "none",
//                                   fontWeight: 600,
//                                   fontSize: ".85rem",
//                                   boxShadow: "0 3px 12px rgba(79,110,247,.28)",
//                                   "&:hover": {
//                                     boxShadow:
//                                       "0 6px 20px rgba(79,110,247,.38)",
//                                   },
//                                 }}
//                               >
//                                 Book Now →
//                               </Button>
//                             </Box>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ─── MEDICAL RECORDS ─── */}
//             {view === "records" && (
//               <>
//                 <Box
//                   sx={{
//                     mb: 4,
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "space-between",
//                     flexWrap: "wrap",
//                     gap: 2,
//                   }}
//                 >
//                   <Box>
//                     <Typography
//                       sx={{
//                         fontFamily: "'Cormorant Garamond',serif",
//                         fontSize: "2rem",
//                         fontWeight: 700,
//                         color: "#1a1f36",
//                       }}
//                     >
//                       Medical Records
//                     </Typography>
//                     <Typography
//                       sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                     >
//                       {medicalRecords.length} record
//                       {medicalRecords.length !== 1 ? "s" : ""} stored securely
//                     </Typography>
//                   </Box>
//                   <Button
//                     variant="contained"
//                     startIcon={<UploadFileIcon />}
//                     onClick={() => setUploadOpen(true)}
//                     sx={{
//                       background: "linear-gradient(135deg,#4f6ef7,#818cf8)",
//                       borderRadius: "12px",
//                       textTransform: "none",
//                       fontWeight: 700,
//                       fontSize: ".88rem",
//                       boxShadow: "0 4px 14px rgba(79,110,247,.28)",
//                     }}
//                   >
//                     Add Record
//                   </Button>
//                 </Box>
//                 <Box sx={{ mb: 3 }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                       mb: 1.5,
//                     }}
//                   >
//                     <FilterListIcon sx={{ fontSize: 16, color: "#8892b0" }} />
//                     <Typography
//                       sx={{
//                         fontSize: ".72rem",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         color: "#8892b0",
//                         fontWeight: 600,
//                       }}
//                     >
//                       Filter by Type
//                     </Typography>
//                   </Box>
//                   <div className="spec-chip-wrap">
//                     {["ALL", ...RECORD_TYPES].map((t) => (
//                       <div
//                         key={t}
//                         className={`spec-chip ${recordTypeFilter === t ? "active" : ""}`}
//                         onClick={() => setRecordTypeFilter(t)}
//                       >
//                         {t === "ALL" ? "All" : t.replace("_", " ")}
//                       </div>
//                     ))}
//                   </div>
//                 </Box>
//                 {filteredRecords.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>
//                       📋
//                     </Typography>
//                     <Typography sx={{ fontWeight: 500 }}>
//                       {medicalRecords.length === 0
//                         ? "No medical records yet."
//                         : "No records match this filter."}
//                     </Typography>
//                     {medicalRecords.length === 0 && (
//                       <Button
//                         onClick={() => setUploadOpen(true)}
//                         size="small"
//                         variant="contained"
//                         sx={{
//                           mt: 2,
//                           background: "linear-gradient(135deg,#4f6ef7,#818cf8)",
//                           borderRadius: "10px",
//                           textTransform: "none",
//                           fontWeight: 600,
//                         }}
//                       >
//                         Upload your first record →
//                       </Button>
//                     )}
//                   </Box>
//                 ) : (
//                   filteredRecords.map((record) => (
//                     <RecordCard
//                       key={record.id}
//                       record={record}
//                       onDelete={handleDeleteRecord}
//                     />
//                   ))
//                 )}
//               </>
//             )}

//             {/* ─── PRESCRIPTIONS ─── */}
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
//                     {prescriptions.length} prescription
//                     {prescriptions.length !== 1 ? "s" : ""} from your doctors
//                   </Typography>
//                 </Box>
//                 {prescriptions.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>
//                       💊
//                     </Typography>
//                     <Typography sx={{ fontWeight: 500 }}>
//                       No prescriptions yet.
//                     </Typography>
//                     <Typography sx={{ fontSize: ".83rem", mt: 0.5 }}>
//                       Prescriptions from your doctors will appear here after
//                       approved appointments.
//                     </Typography>
//                   </Box>
//                 ) : (
//                   prescriptions.map((rx) => (
//                     <div key={rx.id} className="rx-card">
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "flex-start",
//                           gap: 1.5,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             width: 46,
//                             height: 46,
//                             borderRadius: "13px",
//                             flexShrink: 0,
//                             background: "#ecfdf5",
//                             border: "1px solid rgba(5,150,105,.2)",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                           }}
//                         >
//                           <LocalPharmacyIcon
//                             sx={{ color: "#059669", fontSize: 22 }}
//                           />
//                         </Box>
//                         <Box sx={{ flex: 1 }}>
//                           <Box
//                             sx={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 1.5,
//                               flexWrap: "wrap",
//                               mb: 0.75,
//                             }}
//                           >
//                             <Typography
//                               sx={{
//                                 fontWeight: 700,
//                                 fontSize: ".95rem",
//                                 color: "#1a1f36",
//                               }}
//                             >
//                               Dr. {rx.appointment?.doctor?.name}
//                             </Typography>
//                             {rx.issuedDate && (
//                               <Chip
//                                 label={rx.issuedDate}
//                                 size="small"
//                                 sx={{
//                                   background: "#f5f7ff",
//                                   color: "#8892b0",
//                                   fontSize: ".68rem",
//                                   height: 20,
//                                 }}
//                               />
//                             )}
//                           </Box>
//                           <Typography
//                             sx={{
//                               fontSize: ".8rem",
//                               color: "#8892b0",
//                               mb: 0.75,
//                             }}
//                           >
//                             {rx.appointment?.doctor?.specialization} ·{" "}
//                             {rx.appointment?.date}
//                           </Typography>

//                           {rx.diagnosis && (
//                             <Box
//                               sx={{
//                                 background: "#f0fdf4",
//                                 border: "1px solid rgba(5,150,105,.15)",
//                                 borderRadius: "10px",
//                                 px: 1.5,
//                                 py: 1,
//                                 mb: 1.5,
//                               }}
//                             >
//                               <Typography
//                                 sx={{
//                                   fontSize: ".68rem",
//                                   textTransform: "uppercase",
//                                   letterSpacing: ".8px",
//                                   color: "#059669",
//                                   fontWeight: 700,
//                                   mb: 0.3,
//                                 }}
//                               >
//                                 Diagnosis
//                               </Typography>
//                               <Typography
//                                 sx={{
//                                   fontSize: ".88rem",
//                                   fontWeight: 600,
//                                   color: "#1a1f36",
//                                 }}
//                               >
//                                 🩺 {rx.diagnosis}
//                               </Typography>
//                             </Box>
//                           )}

//                           {rx.medicines && (
//                             <Box
//                               sx={{
//                                 background: "#f8f9ff",
//                                 border: "1px solid #e8ecf5",
//                                 borderRadius: "10px",
//                                 px: 1.5,
//                                 py: 1,
//                                 mb: 1.5,
//                               }}
//                             >
//                               <Typography
//                                 sx={{
//                                   fontSize: ".68rem",
//                                   textTransform: "uppercase",
//                                   letterSpacing: ".8px",
//                                   color: "#4f6ef7",
//                                   fontWeight: 700,
//                                   mb: 0.5,
//                                 }}
//                               >
//                                 💊 Medicines &amp; Dosage
//                               </Typography>
//                               <Typography
//                                 sx={{
//                                   fontSize: ".83rem",
//                                   color: "#1a1f36",
//                                   whiteSpace: "pre-line",
//                                   lineHeight: 1.7,
//                                 }}
//                               >
//                                 {rx.medicines}
//                               </Typography>
//                             </Box>
//                           )}

//                           <Grid container spacing={1.5}>
//                             {rx.instructions && (
//                               <Grid item xs={12} sm={6}>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".68rem",
//                                     textTransform: "uppercase",
//                                     letterSpacing: ".8px",
//                                     color: "#8892b0",
//                                     fontWeight: 600,
//                                     mb: 0.4,
//                                   }}
//                                 >
//                                   Instructions
//                                 </Typography>
//                                 <Typography
//                                   sx={{ fontSize: ".82rem", color: "#4a5278" }}
//                                 >
//                                   📋 {rx.instructions}
//                                 </Typography>
//                               </Grid>
//                             )}
//                             {rx.tests && (
//                               <Grid item xs={12} sm={6}>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".68rem",
//                                     textTransform: "uppercase",
//                                     letterSpacing: ".8px",
//                                     color: "#8892b0",
//                                     fontWeight: 600,
//                                     mb: 0.4,
//                                   }}
//                                 >
//                                   Lab Tests
//                                 </Typography>
//                                 <Typography
//                                   sx={{ fontSize: ".82rem", color: "#7c3aed" }}
//                                 >
//                                   🔬 {rx.tests}
//                                 </Typography>
//                               </Grid>
//                             )}
//                             {rx.followUpDate && (
//                               <Grid item xs={12}>
//                                 <Typography
//                                   sx={{
//                                     fontSize: ".82rem",
//                                     color: "#d97706",
//                                     fontWeight: 600,
//                                   }}
//                                 >
//                                   📅 Follow-up: {rx.followUpDate}
//                                 </Typography>
//                               </Grid>
//                             )}
//                           </Grid>
//                         </Box>
//                       </Box>
//                     </div>
//                   ))
//                 )}
//               </>
//             )}

//             {/* ─── PROFILE ─── */}
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
//                     Profile
//                   </Typography>
//                   <Typography
//                     sx={{ color: "#8892b0", fontSize: ".875rem", mt: 0.5 }}
//                   >
//                     Your personal health information
//                   </Typography>
//                 </Box>
//                 <Card className="light-card" sx={{ p: 4 }}>
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
//                       {patient.name?.charAt(0)}
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
//                         {patient.name}
//                       </Typography>
//                       <Typography
//                         sx={{ fontSize: ".82rem", color: "#8892b0", mt: 0.5 }}
//                       >
//                         Patient Account · Active
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[
//                       ["Full Name", patient.name],
//                       ["Gender", patient.gender],
//                       ["Date of Birth", patient.dob],
//                       ["Contact", patient.contact],
//                       ["Age", patient.age ? `${patient.age} years` : "—"],
//                       ["Patient ID", `#${patient.id}`],
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
//       <UploadRecordModal
//         open={uploadOpen}
//         onClose={() => setUploadOpen(false)}
//         patientId={patient.id}
//         onUploaded={(newRecord) =>
//           setMedicalRecords((prev) => [newRecord, ...prev])
//         }
//       />

//       <PaymentModal
//         open={Boolean(payAppt)}
//         appointment={payAppt}
//         onClose={() => setPayAppt(null)}
//         onPaid={handlePaymentDone}
//       />

//       <FeedbackModal
//         open={Boolean(fbAppt)}
//         appointment={fbAppt}
//         onClose={() => setFbAppt(null)}
//         onSubmitted={handleFeedbackDone}
//       />
//     </Box>
//   );
// }



// import { useContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import PatientProfileForm from "./PatientProfileForm";
// import {
//   Box, Typography, CircularProgress, Alert, Grid, Card, CardContent,
//   Avatar, Button, Divider, Chip, TextField, InputAdornment,
//   MenuItem, Select, Modal, IconButton, LinearProgress, Rating,
// } from "@mui/material";
// import MenuIcon          from "@mui/icons-material/Menu";
// import CloseIcon         from "@mui/icons-material/Close";
// import LogoutIcon        from "@mui/icons-material/Logout";
// import EventIcon         from "@mui/icons-material/Event";
// import DashboardIcon     from "@mui/icons-material/Dashboard";
// import PersonIcon        from "@mui/icons-material/Person";
// import AddIcon           from "@mui/icons-material/Add";
// import SearchIcon        from "@mui/icons-material/Search";
// import FolderIcon        from "@mui/icons-material/Folder";
// import UploadFileIcon    from "@mui/icons-material/UploadFile";
// import DescriptionIcon   from "@mui/icons-material/Description";
// import DeleteIcon        from "@mui/icons-material/Delete";
// import OpenInNewIcon     from "@mui/icons-material/OpenInNew";
// import DownloadIcon      from "@mui/icons-material/Download";
// import VisibilityIcon    from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import FilterListIcon    from "@mui/icons-material/FilterList";
// import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
// import PaymentIcon       from "@mui/icons-material/Payment";
// import StarIcon          from "@mui/icons-material/Star";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CheckCircleIcon   from "@mui/icons-material/CheckCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import BarChartIcon      from "@mui/icons-material/BarChart";
// import { motion, AnimatePresence } from "framer-motion";

// const BASE = "http://localhost:8080";

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .sidebar-overlay{position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease;}
//   @keyframes overlayIn{from{opacity:0}to{opacity:1}}
//   .portal-sidebar{width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1);}
//   .portal-sidebar.closed{transform:translateX(-100%);}
//   .portal-sidebar.open{transform:translateX(0);}
//   .sidebar-top-row{display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px;}
//   .sidebar-logo{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px;}
//   .logo-icon{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0;}
//   .logo-accent{color:#7c3aed;}
//   .sidebar-close-btn{width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s;}
//   .sidebar-close-btn:hover{background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2);}
//   .nav-section-label{font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px;}
//   .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none;}
//   .nav-item:hover{background:#eef1fe;color:#4f6ef7;}
//   .nav-item.active{background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18);}
//   .nav-item.active .nav-icon-wrap{background:#4f6ef7 !important;color:#fff !important;}
//   .nav-icon-wrap{width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278;}
//   .sidebar-spacer{flex:1;}
//   .user-card{display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px;}
//   .user-mini-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem;}
//   .portal-topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100;}
//   .topbar-left{display:flex;align-items:center;gap:14px;}
//   .hamburger-btn{width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s;}
//   .hamburger-btn:hover{background:#eef1fe;border-color:rgba(79,110,247,.2);}
//   .blob{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;}
//   .blob-1{width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px;}
//   .blob-2{width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px;}
//   .light-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important;}
//   .light-card:hover{box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important;}
//   .hero-card{background:linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;}
//   .hero-card::after{content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none;}
//   .stat-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important;}
//   .stat-card:hover{box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .stat-value{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1;}
//   .stat-label{font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px;}
//   .stat-icon{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07;}
//   .sec-heading{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px;}
//   .sec-heading::after{content:'';flex:1;height:1px;background:#e8ecf5;}
//   .spec-chip-wrap{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0;}
//   .spec-chip{padding:6px 14px !important;border-radius:20px !important;font-size:.78rem !important;font-weight:600 !important;border:1px solid #e8ecf5 !important;cursor:pointer !important;transition:all .18s !important;background:#fff !important;color:#4a5278 !important;user-select:none;}
//   .spec-chip:hover{background:#eef1fe !important;border-color:rgba(79,110,247,.25) !important;color:#4f6ef7 !important;}
//   .spec-chip.active{background:#4f6ef7 !important;border-color:#4f6ef7 !important;color:#fff !important;}
//   .record-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:16px !important;box-shadow:0 1px 6px rgba(79,110,247,.07) !important;transition:box-shadow .22s,transform .22s !important;padding:20px 22px;margin-bottom:12px;}
//   .record-card:hover{box-shadow:0 5px 22px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .rx-card{background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s;}
//   .rx-card:hover{box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px);}
//   .pay-banner{background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:16px;padding:18px 22px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
//   .pay-banner-paid{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-color:#6ee7b7;}
//   .notif-dot{width:8px;height:8px;border-radius:50%;background:#e11d48;position:absolute;top:6px;right:6px;}
//   .upload-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:520px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto;}
//   .upload-modal-box .MuiOutlinedInput-root{border-radius:12px !important;background:#f8f9ff !important;}
//   .rzp-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:440px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .fb-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:460px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .drop-zone{border:2px dashed #c7cee8;border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:all .2s;background:#f8f9ff;}
//   .drop-zone:hover,.drop-zone.dragover{border-color:#4f6ef7;background:#eef1fe;}
//   .file-preview-wrap{width:100%;border-radius:10px;overflow:hidden;border:1px solid #e8ecf5;margin-top:12px;}
//   .file-preview-wrap iframe{width:100%;height:340px;border:none;display:block;}
//   .file-preview-wrap img{width:100%;display:block;max-height:380px;object-fit:contain;background:#f8f9ff;}

//   /* Health chart styles */
//   .health-chart-card{background:#fff;border:1px solid #e8ecf5;border-radius:18px;padding:24px;box-shadow:0 1px 6px rgba(79,110,247,.06);}
//   .hbar-wrap{display:flex;flex-direction:column;gap:10px;}
//   .hbar-row{display:flex;align-items:center;gap:12px;}
//   .hbar-label{font-size:.75rem;font-weight:600;color:#4a5278;width:100px;flex-shrink:0;text-align:right;}
//   .hbar-track{flex:1;height:10px;background:#f0f2f8;border-radius:999px;overflow:hidden;}
//   .hbar-fill{height:100%;border-radius:999px;transition:width .7s cubic-bezier(.22,1,.36,1);}
//   .hbar-val{font-size:.75rem;font-weight:700;color:#1a1f36;width:48px;flex-shrink:0;}
//   .donut-svg{display:block;margin:0 auto;}
//   .mini-legend{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:12px;}
//   .mini-legend-item{display:flex;align-items:center;gap:5px;font-size:.72rem;color:#4a5278;font-weight:500;}
//   .mini-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
//   .timeline-wrap{position:relative;padding-left:22px;}
//   .timeline-wrap::before{content:'';position:absolute;left:7px;top:0;bottom:0;width:2px;background:#e8ecf5;}
//   .tl-item{position:relative;margin-bottom:14px;}
//   .tl-dot{position:absolute;left:-18px;top:4px;width:10px;height:10px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 2px currentColor;}

//   .av-blue{background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;}
//   .av-violet{background:linear-gradient(135deg,#7c3aed,#a78bfa) !important;}
//   .av-teal{background:linear-gradient(135deg,#0891b2,#22d3ee) !important;}
//   .av-rose{background:linear-gradient(135deg,#e11d48,#fb7185) !important;}
//   .av-green{background:linear-gradient(135deg,#059669,#34d399) !important;}
//   .av-amber{background:linear-gradient(135deg,#d97706,#fbbf24) !important;}
//   @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
//   .fu{animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;}
// `;

// if (!document.getElementById("portal-styles")) {
//   const s = document.createElement("style"); s.id="portal-styles"; s.textContent=globalStyles; document.head.appendChild(s);
// }

// const avatarColors   = ["av-blue","av-violet","av-teal","av-rose","av-green","av-amber"];
// const getAvatarClass = (i) => avatarColors[i % avatarColors.length];
// const RECORD_TYPES   = ["LAB_REPORT","PRESCRIPTION","SCAN","VACCINATION","SURGERY","OTHER"];
// const RECORD_COLORS  = {
//   LAB_REPORT:{bg:"#eef1fe",color:"#4f6ef7",border:"rgba(79,110,247,.2)"},
//   PRESCRIPTION:{bg:"#ecfdf5",color:"#059669",border:"rgba(5,150,105,.2)"},
//   SCAN:{bg:"#fff1f3",color:"#e11d48",border:"rgba(225,29,72,.2)"},
//   VACCINATION:{bg:"#fffbeb",color:"#d97706",border:"rgba(217,119,6,.2)"},
//   SURGERY:{bg:"#f5f3ff",color:"#7c3aed",border:"rgba(124,58,237,.2)"},
//   OTHER:{bg:"#f5f7ff",color:"#8892b0",border:"#e8ecf5"},
// };
// const getStatusColor = (s) => s==="APPROVED"?"success":s==="REJECTED"?"error":"warning";

// function NavItem({icon,label,active,onClick,badge}) {
//   return (
//     <div className={`nav-item ${active?"active":""}`} onClick={onClick} style={{position:"relative"}}>
//       <div className="nav-icon-wrap">{icon}</div>
//       {label}
//       {badge>0 && <span style={{marginLeft:"auto",background:"#e11d48",color:"#fff",fontSize:".62rem",fontWeight:700,borderRadius:"999px",padding:"1px 7px",minWidth:18,textAlign:"center"}}>{badge}</span>}
//     </div>
//   );
// }

// function StatCard({label,value,icon,color}) {
//   return (
//     <div className="stat-card fu">
//       <div className="stat-label">{label}</div>
//       <div className="stat-value" style={{color}}>{value}</div>
//       <div className="stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── Health Stats Charts ────────────────────────────────────────────────────────
// function HealthStats({ appointments, prescriptions, medicalRecords, payments }) {
//   // Appointment status breakdown for donut
//   const total   = appointments.length;
//   const approved = appointments.filter(a=>a.status==="APPROVED").length;
//   const pending  = appointments.filter(a=>a.status==="PENDING").length;
//   const rejected = appointments.filter(a=>a.status==="REJECTED").length;

//   // Record types breakdown
//   const typeCounts = RECORD_TYPES.reduce((acc,t) => {
//     acc[t] = medicalRecords.filter(r=>r.recordType===t).length;
//     return acc;
//   }, {});

//   // Monthly appointment activity (last 6 months)
//   const now = new Date();
//   const months = Array.from({length:6}, (_,i) => {
//     const d = new Date(now.getFullYear(), now.getMonth()-5+i, 1);
//     return { label: d.toLocaleString("default",{month:"short"}), year: d.getFullYear(), month: d.getMonth() };
//   });
//   const monthlyData = months.map(m => ({
//     label: m.label,
//     count: appointments.filter(a => {
//       if (!a.date) return false;
//       const d = new Date(a.date);
//       return d.getFullYear()===m.year && d.getMonth()===m.month;
//     }).length
//   }));
//   const maxCount = Math.max(...monthlyData.map(m=>m.count), 1);

//   // Donut segments
//   const donutData = [
//     { label:"Approved", count:approved, color:"#059669" },
//     { label:"Pending",  count:pending,  color:"#f59e0b" },
//     { label:"Rejected", count:rejected, color:"#e11d48" },
//   ].filter(d=>d.count>0);
//   const r=58, cx=70, cy=70, circum = 2*Math.PI*r;
//   let offset=0;
//   const segments = donutData.map(d => {
//     const pct = total>0 ? d.count/total : 0;
//     const dash = pct*circum;
//     const gap  = circum-dash;
//     const seg  = { ...d, dash, gap, offset, pct };
//     offset += dash;
//     return seg;
//   });

//   // Record type bar chart
//   const typeBars = Object.entries(typeCounts)
//     .filter(([,v])=>v>0)
//     .map(([k,v]) => ({ label:k.replace("_"," "), val:v, color: RECORD_COLORS[k]?.color || "#8892b0", bg: RECORD_COLORS[k]?.bg || "#f5f7ff" }));
//   const maxType = Math.max(...typeBars.map(b=>b.val), 1);

//   // Payment stats
//   const paidCount = Object.values(payments).filter(p=>p?.status==="SUCCESS").length;
//   const pendingPayCount = approved - paidCount;

//   return (
//     <Box>
//       <Grid container spacing={2.5}>

//         {/* Appointment donut */}
//         <Grid item xs={12} sm={6} md={4}>
//           <div className="health-chart-card" style={{height:"100%"}}>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Appointment Status</Typography>
//             {total===0 ? (
//               <Box sx={{textAlign:"center",py:4,color:"#c0c8e0"}}>
//                 <Typography sx={{fontSize:"2rem",mb:1}}>📅</Typography>
//                 <Typography sx={{fontSize:".82rem"}}>No appointments yet</Typography>
//               </Box>
//             ) : (
//               <>
//                 <svg className="donut-svg" width={140} height={140} viewBox="0 0 140 140">
//                   <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f2f8" strokeWidth={16}/>
//                   {segments.map((seg,i) => (
//                     <circle key={i} cx={cx} cy={cy} r={r} fill="none"
//                       stroke={seg.color} strokeWidth={16}
//                       strokeDasharray={`${seg.dash} ${seg.gap}`}
//                       strokeDashoffset={-seg.offset}
//                       transform="rotate(-90 70 70)"
//                       style={{transition:"stroke-dasharray .7s ease"}}/>
//                   ))}
//                   <text x={cx} y={cy-4} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1a1f36" fontFamily="'Cormorant Garamond',serif">{total}</text>
//                   <text x={cx} y={cy+14} textAnchor="middle" fontSize={9} fill="#8892b0" fontFamily="Outfit,sans-serif">Total</text>
//                 </svg>
//                 <div className="mini-legend">
//                   {donutData.map(d=>(
//                     <div key={d.label} className="mini-legend-item">
//                       <div className="mini-dot" style={{background:d.color}}/>
//                       {d.label}: {d.count}
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </Grid>

//         {/* Monthly activity bar chart */}
//         <Grid item xs={12} sm={6} md={4}>
//           <div className="health-chart-card" style={{height:"100%"}}>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Monthly Activity</Typography>
//             <Box sx={{display:"flex",alignItems:"flex-end",gap:"6px",height:90,px:.5}}>
//               {monthlyData.map((m,i) => {
//                 const pct = m.count/maxCount;
//                 return (
//                   <Box key={i} sx={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:.5}}>
//                     <Typography sx={{fontSize:".62rem",color:"#8892b0",fontWeight:600}}>{m.count||""}</Typography>
//                     <Box sx={{width:"100%",background:`rgba(79,110,247,${0.15+pct*0.7})`,borderRadius:"5px 5px 0 0",height:`${Math.max(pct*68,4)}px`,transition:"height .6s ease",minHeight:4}}/>
//                     <Typography sx={{fontSize:".62rem",color:"#8892b0",fontWeight:600,textAlign:"center"}}>{m.label}</Typography>
//                   </Box>
//                 );
//               })}
//             </Box>
//             <Box sx={{mt:2,display:"flex",justifyContent:"center"}}>
//               <Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Last 6 months</Typography>
//             </Box>
//           </div>
//         </Grid>

//         {/* Payment health */}
//         <Grid item xs={12} sm={6} md={4}>
//           <div className="health-chart-card" style={{height:"100%"}}>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Payment Health</Typography>
//             <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
//               {[
//                 {label:"Paid",   val:paidCount,      color:"#059669", bg:"#ecfdf5", max:Math.max(approved,1)},
//                 {label:"Pending",val:pendingPayCount, color:"#f59e0b", bg:"#fffbeb", max:Math.max(approved,1)},
//                 {label:"Records",val:medicalRecords.length, color:"#4f6ef7", bg:"#eef1fe", max:Math.max(medicalRecords.length,1)},
//                 {label:"Rx",     val:prescriptions.length,  color:"#7c3aed", bg:"#f5f3ff", max:Math.max(prescriptions.length,1)},
//               ].map(item => (
//                 <Box key={item.label}>
//                   <Box sx={{display:"flex",justifyContent:"space-between",mb:.5}}>
//                     <Typography sx={{fontSize:".75rem",fontWeight:600,color:"#4a5278"}}>{item.label}</Typography>
//                     <Typography sx={{fontSize:".75rem",fontWeight:700,color:item.color}}>{item.val}</Typography>
//                   </Box>
//                   <Box sx={{height:8,background:"#f0f2f8",borderRadius:999,overflow:"hidden"}}>
//                     <Box sx={{height:"100%",width:`${(item.val/item.max)*100}%`,background:item.color,borderRadius:999,transition:"width .7s ease"}}/>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </div>
//         </Grid>

//         {/* Record types */}
//         <Grid item xs={12} sm={6} md={6}>
//           <div className="health-chart-card">
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Medical Record Types</Typography>
//             {typeBars.length===0 ? (
//               <Box sx={{textAlign:"center",py:3,color:"#c0c8e0"}}>
//                 <Typography sx={{fontSize:".82rem"}}>No medical records uploaded yet</Typography>
//               </Box>
//             ) : (
//               <div className="hbar-wrap">
//                 {typeBars.map(b => (
//                   <div key={b.label} className="hbar-row">
//                     <span className="hbar-label">{b.label}</span>
//                     <div className="hbar-track">
//                       <div className="hbar-fill" style={{width:`${(b.val/maxType)*100}%`,background:b.color}}/>
//                     </div>
//                     <span className="hbar-val" style={{color:b.color}}>{b.val}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Grid>

//         {/* Prescription timeline */}
//         <Grid item xs={12} sm={6} md={6}>
//           <div className="health-chart-card">
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Prescription Timeline</Typography>
//             {prescriptions.length===0 ? (
//               <Box sx={{textAlign:"center",py:3,color:"#c0c8e0"}}>
//                 <Typography sx={{fontSize:"2rem",mb:1}}>💊</Typography>
//                 <Typography sx={{fontSize:".82rem"}}>No prescriptions yet</Typography>
//               </Box>
//             ) : (
//               <div className="timeline-wrap">
//                 {[...prescriptions].reverse().slice(0,5).map((rx,i) => (
//                   <div key={rx.id} className="tl-item">
//                     <div className="tl-dot" style={{color:"#059669",background:"#ecfdf5"}}/>
//                     <Box sx={{pl:1}}>
//                       <Typography sx={{fontSize:".82rem",fontWeight:700,color:"#1a1f36"}}>{rx.diagnosis||"Prescription"}</Typography>
//                       <Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Dr. {rx.appointment?.doctor?.name} · {rx.issuedDate||rx.appointment?.date||"—"}</Typography>
//                       {rx.medicines && (
//                         <Typography sx={{fontSize:".72rem",color:"#4f6ef7",mt:.3}} noWrap>💊 {rx.medicines.split("\n")[0]}</Typography>
//                       )}
//                     </Box>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Grid>

//       </Grid>
//     </Box>
//   );
// }

// // ── Payment Modal ─────────────────────────────────────────────────────────────
// function PaymentModal({open,onClose,appointment,onPaid}) {
//   const [step,    setStep]    = useState("summary");
//   const [cardNum, setCardNum] = useState("");
//   const [cvv,     setCvv]     = useState("");
//   const [expiry,  setExpiry]  = useState("");
//   const [name,    setName]    = useState("");

//   const fieldSx = {"& .MuiOutlinedInput-root":{borderRadius:"10px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"},"& .Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:"#2563eb !important"}};

//   const handlePay = async () => {
//     setStep("processing");
//     setTimeout(async () => {
//       try {
//         await axios.post(`${BASE}/payments/create-order/${appointment.id}`);
//         const dummyPayId = "pay_dummy_" + Date.now();
//         await axios.post(`${BASE}/payments/confirm/${appointment.id}`, { razorpayPaymentId: dummyPayId });
//         setStep("done");
//         setTimeout(() => { onPaid(appointment.id); onClose(); setStep("summary"); }, 1800);
//       } catch(e) {
//         console.error(e);
//         setStep("summary");
//         alert("Payment failed. Try again.");
//       }
//     }, 2000);
//   };

//   if (!appointment) return null;
//   const fee = appointment.doctor?.consultationFee || 0;

//   return (
//     <Modal open={open} onClose={() => { if(step!=="processing") { setStep("summary"); onClose(); }}}>
//       <Box className="rzp-modal-box">
//         <Box sx={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:"14px",p:"18px 22px",mb:3,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
//           <Box>
//             <div style={{color:"#fff",fontSize:"1.1rem",fontWeight:800,letterSpacing:"-0.5px"}}>razorpay</div>
//             <Typography sx={{color:"rgba(255,255,255,.7)",fontSize:".74rem",mt:.3}}>Secure Payment Gateway</Typography>
//           </Box>
//           <Box sx={{textAlign:"right"}}>
//             <Typography sx={{color:"rgba(255,255,255,.7)",fontSize:".7rem"}}>Amount to Pay</Typography>
//             <Typography sx={{color:"#fff",fontSize:"1.5rem",fontWeight:800,fontFamily:"'Cormorant Garamond',serif"}}>₹{fee}</Typography>
//           </Box>
//         </Box>

//         {step === "summary" && (
//           <>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:700,color:"#1a1f36",mb:2}}>Payment Details</Typography>
//             <Box sx={{background:"#f8f9ff",border:"1px solid #e8ecf5",borderRadius:"12px",p:2,mb:3}}>
//               {[["Doctor",`Dr. ${appointment.doctor?.name}`],["Specialization",appointment.doctor?.specialization],["Date",appointment.date],["Time",appointment.timeSlot],["Consultation Fee",`₹${fee}`]].map(([l,v]) => (
//                 <Box key={l} sx={{display:"flex",justifyContent:"space-between",mb:.8}}>
//                   <Typography sx={{color:"#8892b0",fontSize:".82rem"}}>{l}</Typography>
//                   <Typography sx={{color:"#1a1f36",fontWeight:600,fontSize:".82rem"}}>{v}</Typography>
//                 </Box>
//               ))}
//               <Divider sx={{my:1.5,borderColor:"#e8ecf5"}}/>
//               <Box sx={{display:"flex",justifyContent:"space-between"}}>
//                 <Typography sx={{fontWeight:700,color:"#1a1f36",fontSize:".92rem"}}>Total</Typography>
//                 <Typography sx={{fontWeight:800,color:"#2563eb",fontSize:"1rem",fontFamily:"'Cormorant Garamond',serif"}}>₹{fee}</Typography>
//               </Box>
//             </Box>
//             <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:1.5}}>Card Details</Typography>
//             <Box sx={{display:"flex",flexDirection:"column",gap:1.5}}>
//               <TextField size="small" fullWidth placeholder="Card Number" variant="outlined" sx={fieldSx}
//                 value={cardNum} onChange={e=>setCardNum(e.target.value.replace(/\D/g,"").slice(0,16))}/>
//               <TextField size="small" fullWidth placeholder="Cardholder Name" variant="outlined" sx={fieldSx}
//                 value={name} onChange={e=>setName(e.target.value)}/>
//               <Grid container spacing={1.5}>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="MM/YY" variant="outlined" sx={fieldSx} value={expiry} onChange={e=>setExpiry(e.target.value.slice(0,5))}/></Grid>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="CVV" type="password" variant="outlined" sx={fieldSx} value={cvv} onChange={e=>setCvv(e.target.value.replace(/\D/g,"").slice(0,3))}/></Grid>
//               </Grid>
//             </Box>
//             <Box sx={{display:"flex",gap:1.5,mt:3}}>
//               <Button onClick={()=>onClose()} variant="outlined" fullWidth sx={{borderRadius:"10px",textTransform:"none",fontWeight:600,borderColor:"#e8ecf5",color:"#8892b0"}}>Cancel</Button>
//               <Button onClick={handlePay} variant="contained" fullWidth sx={{borderRadius:"10px",textTransform:"none",fontWeight:700,fontSize:".92rem",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",boxShadow:"0 4px 14px rgba(37,99,235,.35)"}}>Pay ₹{fee}</Button>
//             </Box>
//           </>
//         )}

//         {step === "processing" && (
//           <Box sx={{textAlign:"center",py:3}}>
//             <CircularProgress sx={{color:"#2563eb",mb:2}} size={48}/>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:.5}}>Processing Payment…</Typography>
//             <Typography sx={{fontSize:".82rem",color:"#8892b0"}}>Please do not close this window</Typography>
//             <LinearProgress sx={{mt:3,borderRadius:4,height:4,background:"#e8ecf5","& .MuiLinearProgress-bar":{background:"#2563eb"}}}/>
//           </Box>
//         )}

//         {step === "done" && (
//           <Box sx={{textAlign:"center",py:2}}>
//             <Box sx={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#059669,#34d399)",display:"flex",alignItems:"center",justifyContent:"center",mx:"auto",mb:2,boxShadow:"0 6px 20px rgba(5,150,105,.3)"}}>
//               <CheckCircleIcon sx={{color:"#fff",fontSize:34}}/>
//             </Box>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#059669",mb:.5}}>Payment Successful!</Typography>
//             <Typography sx={{fontSize:".85rem",color:"#8892b0"}}>₹{fee} paid successfully</Typography>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ── Feedback Modal ─────────────────────────────────────────────────────────────
// function FeedbackModal({open,onClose,appointment,onSubmitted}) {
//   const [rating,  setRating]  = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [done,    setDone]    = useState(false);

//   const handleSubmit = async () => {
//     if (!rating) { alert("Please select a rating"); return; }
//     setLoading(true);
//     try {
//       await axios.post(`${BASE}/feedback`, { appointmentId:appointment.id, doctorId:appointment.doctor?.id, patientId:appointment.patient?.id, rating, comment });
//       setDone(true);
//       onSubmitted(appointment.id);
//       setTimeout(() => { setDone(false); setRating(0); setComment(""); onClose(); }, 1500);
//     } catch(e) {
//       setDone(true);
//       onSubmitted(appointment.id);
//       setTimeout(() => { setDone(false); setRating(0); setComment(""); onClose(); }, 1500);
//     } finally { setLoading(false); }
//   };

//   if (!appointment) return null;
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="fb-modal-box">
//         <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}>
//           <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36"}}>Rate Your Experience</Typography>
//           <IconButton size="small" onClick={onClose} sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}>
//             <CloseIcon sx={{fontSize:16}}/>
//           </IconButton>
//         </Box>
//         {done ? (
//           <Box sx={{textAlign:"center",py:3}}>
//             <Typography sx={{fontSize:"2.5rem",mb:1}}>⭐</Typography>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#059669"}}>Thank you for your feedback!</Typography>
//           </Box>
//         ) : (
//           <>
//             <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:2}}>Dr. {appointment.doctor?.name} · {appointment.date}</Typography>
//             <Box sx={{display:"flex",justifyContent:"center",mb:3}}>
//               <Rating size="large" value={rating} onChange={(_,v)=>setRating(v)} sx={{"& .MuiRating-iconFilled":{color:"#f59e0b"}}}/>
//             </Box>
//             <TextField fullWidth multiline rows={3} placeholder="Share your experience (optional)…" variant="outlined" value={comment} onChange={e=>setComment(e.target.value)}
//               sx={{mb:3,"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"}}}/>
//             <Button onClick={handleSubmit} variant="contained" fullWidth disabled={loading}
//               sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700}}>
//               {loading?"Submitting…":"Submit Feedback"}
//             </Button>
//           </>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ── Upload Modal ───────────────────────────────────────────────────────────────
// function UploadRecordModal({open,onClose,patientId,onUploaded}) {
//   const [form,     setForm]     = useState({title:"",recordType:"LAB_REPORT",recordDate:"",issuedBy:"",description:""});
//   const [file,     setFile]     = useState(null);
//   const [dragOver, setDragOver] = useState(false);
//   const [loading,  setLoading]  = useState(false);
//   const [error,    setError]    = useState("");
//   const fileRef = useRef();

//   const handleFile = f => {
//     if (!f) return;
//     if (f.size > 10*1024*1024) { setError("File too large. Max 10 MB."); return; }
//     setError(""); setFile(f);
//   };

//   const handleSubmit = async () => {
//     if (!form.title) { setError("Title is required."); return; }
//     setLoading(true); setError("");
//     try {
//       const fd = new FormData();
//       fd.append("patientId",   patientId);
//       fd.append("title",       form.title);
//       fd.append("recordType",  form.recordType);
//       fd.append("recordDate",  form.recordDate);
//       fd.append("issuedBy",    form.issuedBy);
//       fd.append("description", form.description);
//       if (file) fd.append("file", file);
//       const res = await axios.post(`${BASE}/medical-records/upload`, fd, {headers:{"Content-Type":"multipart/form-data"}});
//       onUploaded(res.data);
//       setForm({title:"",recordType:"LAB_REPORT",recordDate:"",issuedBy:"",description:""});
//       setFile(null); onClose();
//     } catch(e) { setError(e?.response?.data || "Upload failed. Try again."); }
//     finally { setLoading(false); }
//   };

//   const fieldSx = {"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"},"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:"#4f6ef7 !important"}};

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="upload-modal-box">
//         <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}>
//           <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#1a1f36"}}>Add Medical Record</Typography>
//           <IconButton size="small" onClick={onClose} sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton>
//         </Box>
//         <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
//           <Box>
//             <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Title *</Typography>
//             <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Blood Test Report — Jan 2025" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} sx={fieldSx}/>
//           </Box>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Record Type</Typography>
//               <Select fullWidth size="small" value={form.recordType} onChange={e=>setForm({...form,recordType:e.target.value})} sx={{"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"},"& .MuiSelect-select":{borderRadius:"12px",background:"#f8f9ff"}}}>
//                 {RECORD_TYPES.map(t=><MenuItem key={t} value={t}>{t.replace("_"," ")}</MenuItem>)}
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Date</Typography>
//               <TextField fullWidth size="small" type="date" variant="outlined" value={form.recordDate} onChange={e=>setForm({...form,recordDate:e.target.value})} sx={fieldSx}/>
//             </Grid>
//           </Grid>
//           <Box>
//             <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Issued By</Typography>
//             <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Dr. Ramesh Kumar" value={form.issuedBy} onChange={e=>setForm({...form,issuedBy:e.target.value})} sx={fieldSx}/>
//           </Box>
//           <Box>
//             <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Notes</Typography>
//             <TextField fullWidth size="small" multiline rows={2} variant="outlined" placeholder="Optional notes" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} sx={fieldSx}/>
//           </Box>
//           <Box>
//             <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Attach File (PDF/Image — max 10 MB)</Typography>
//             <div className={`drop-zone ${dragOver?"dragover":""}`}
//               onClick={()=>fileRef.current?.click()}
//               onDragOver={e=>{e.preventDefault();setDragOver(true);}}
//               onDragLeave={()=>setDragOver(false)}
//               onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0]);}}>
//               <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={e=>handleFile(e.target.files[0])}/>
//               <UploadFileIcon sx={{fontSize:32,color:"#c0c8e0",mb:1}}/>
//               {file?<Typography sx={{fontSize:".85rem",fontWeight:600,color:"#4f6ef7"}}>{file.name}</Typography>
//                    :<Typography sx={{fontSize:".82rem",color:"#8892b0"}}>Click or drag & drop your file here</Typography>}
//             </div>
//           </Box>
//           {error&&<Box sx={{background:"#fff1f3",border:"1px solid rgba(225,29,72,.2)",borderRadius:"10px",padding:"10px 14px",fontSize:".83rem",color:"#e11d48",fontWeight:500}}>⚠ {error}</Box>}
//           {loading&&<LinearProgress sx={{borderRadius:4,height:4}}/>}
//           <Button onClick={handleSubmit} variant="contained" disabled={loading}
//             sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".92rem",py:1.4,boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>
//             {loading?"Uploading…":"Save Record"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// // ── Record Card ────────────────────────────────────────────────────────────────
// function RecordCard({record,onDelete}) {
//   const [showPreview,setShowPreview] = useState(false);
//   const sc=RECORD_COLORS[record.recordType]||RECORD_COLORS.OTHER;
//   const fileUrl=record.fileName?`${BASE}/medical-records/file/${record.fileName}`:null;
//   const lower=(record.fileName||"").toLowerCase();
//   const isPdf=lower.endsWith(".pdf");
//   const isImage=lower.endsWith(".png")||lower.endsWith(".jpg")||lower.endsWith(".jpeg")||lower.endsWith(".webp");
//   return (
//     <div className="record-card">
//       <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
//         <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:sc.bg,border:`1px solid ${sc.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
//           <DescriptionIcon sx={{color:sc.color,fontSize:22}}/>
//         </Box>
//         <Box sx={{flex:1,minWidth:0}}>
//           <Box sx={{display:"flex",alignItems:"center",gap:1,flexWrap:"wrap",mb:.5}}>
//             <Typography sx={{fontWeight:700,fontSize:".92rem",color:"#1a1f36"}}>{record.title}</Typography>
//             <Chip label={record.recordType?.replace("_"," ")} size="small" sx={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontWeight:600,fontSize:".68rem",height:22}}/>
//           </Box>
//           {record.issuedBy&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>👤 {record.issuedBy}</Typography>}
//           {record.recordDate&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>📅 {record.recordDate}</Typography>}
//           {record.description&&<Typography sx={{fontSize:".8rem",color:"#4a5278",mt:.5}}>{record.description}</Typography>}
//           {fileUrl&&(
//             <Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>
//               {(isPdf||isImage)&&(
//                 <button onClick={()=>setShowPreview(p=>!p)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,cursor:"pointer",fontSize:".76rem",fontWeight:600,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",color:"#fff",border:"none",fontFamily:"'Outfit',sans-serif"}}>
//                   {showPreview?<><VisibilityOffIcon sx={{fontSize:13}}/> Hide</>:<><VisibilityIcon sx={{fontSize:13}}/> Preview</>}
//                 </button>
//               )}
//               <a href={fileUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.2)"}}>
//                 <OpenInNewIcon sx={{fontSize:13}}/> Open
//               </a>
//               <a href={fileUrl} download={record.fileName} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#f5f7ff",color:"#4a5278",border:"1px solid #e8ecf5"}}>
//                 <DownloadIcon sx={{fontSize:13}}/> Download
//               </a>
//             </Box>
//           )}
//           {showPreview&&fileUrl&&(
//             <div className="file-preview-wrap">
//               {isPdf&&<iframe src={fileUrl} title={record.title}/>}
//               {isImage&&<img src={fileUrl} alt={record.title}/>}
//             </div>
//           )}
//         </Box>
//         <IconButton size="small" onClick={()=>onDelete(record.id)} sx={{color:"#e11d48",background:"#fff1f3",borderRadius:"9px",flexShrink:0,"&:hover":{background:"#fce7f3"}}}>
//           <DeleteIcon sx={{fontSize:17}}/>
//         </IconButton>
//       </Box>
//     </div>
//   );
// }

// // ── Book Appointment inline (no navigation) ────────────────────────────────────
// function BookAppointmentInline({ patient, doctors }) {
//   const [searchQuery,  setSearchQuery]  = useState("");
//   const [activeSpec,   setActiveSpec]   = useState("All");
//   const [bookingDocId, setBookingDocId] = useState(null);
//   const [bookForm,     setBookForm]     = useState({ date:"", timeSlot:"", description:"" });
//   const [bookFile,     setBookFile]     = useState(null);
//   const [bookLoading,  setBookLoading]  = useState(false);
//   const [bookSuccess,  setBookSuccess]  = useState(false);
//   const fileRef = useRef();

//   const specializations = ["All",...Array.from(new Set(doctors.map(d=>d.specialization).filter(Boolean))).sort()];
//   const filteredDoctors = doctors.filter(doc => {
//     const bySpec  = activeSpec==="All"||doc.specialization===activeSpec;
//     const q=searchQuery.toLowerCase();
//     const bySearch=!q||doc.name?.toLowerCase().includes(q)||doc.specialization?.toLowerCase().includes(q)||doc.hospital?.toLowerCase().includes(q);
//     return bySpec&&bySearch;
//   });

//   const selectedDoc = doctors.find(d=>d.id===bookingDocId);

//   const handleBook = async () => {
//     if (!bookForm.date||!bookForm.timeSlot) { alert("Please select date and time slot."); return; }
//     setBookLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("patientId",   patient.id);
//       fd.append("doctorId",    bookingDocId);
//       fd.append("date",        bookForm.date);
//       fd.append("timeSlot",    bookForm.timeSlot);
//       fd.append("description", bookForm.description);
//       if (bookFile) fd.append("report", bookFile);
//       await axios.post(`${BASE}/appointments/book`, fd, { headers:{"Content-Type":"multipart/form-data"} });
//       setBookSuccess(true);
//       setBookForm({ date:"", timeSlot:"", description:"" });
//       setBookFile(null);
//       setBookingDocId(null);
//       setTimeout(() => setBookSuccess(false), 3000);
//     } catch(e) {
//       alert("Booking failed. Please try again.");
//     } finally { setBookLoading(false); }
//   };

//   if (bookingDocId && selectedDoc) {
//     const fieldSx = {"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"}};
//     return (
//       <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.3}}>
//         <Box sx={{mb:3,display:"flex",alignItems:"center",gap:1.5}}>
//           <Button size="small" onClick={()=>setBookingDocId(null)} sx={{color:"#4f6ef7",textTransform:"none",fontWeight:600,fontSize:".82rem",p:0}}>← Back to Doctors</Button>
//         </Box>
//         <Card className="light-card" sx={{p:4,maxWidth:560}}>
//           <Box sx={{display:"flex",alignItems:"center",gap:2,mb:3}}>
//             <Avatar className="av-blue" sx={{width:56,height:56,borderRadius:"16px",fontSize:"1.4rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700}}>
//               {selectedDoc.name?.charAt(0)}
//             </Avatar>
//             <Box>
//               <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36"}}>Dr. {selectedDoc.name}</Typography>
//               <Typography sx={{fontSize:".8rem",color:"#8892b0"}}>{selectedDoc.specialization} · {selectedDoc.hospital}</Typography>
//               {selectedDoc.consultationFee>0&&(
//                 <Chip label={`₹${selectedDoc.consultationFee} consultation fee`} size="small" sx={{mt:.5,background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".72rem"}}/>
//               )}
//             </Box>
//           </Box>
//           <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//           {bookSuccess && (
//             <Box sx={{background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",borderRadius:"12px",p:2,mb:3,display:"flex",alignItems:"center",gap:1.5}}>
//               <CheckCircleIcon sx={{color:"#059669",fontSize:22}}/>
//               <Box>
//                 <Typography sx={{fontWeight:700,color:"#059669",fontSize:".9rem"}}>Appointment Booked!</Typography>
//                 <Typography sx={{fontSize:".78rem",color:"#065f46"}}>Your request has been sent to the doctor.</Typography>
//               </Box>
//             </Box>
//           )}
//           <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
//             <Box>
//               <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Preferred Date *</Typography>
//               <TextField fullWidth size="small" type="date" variant="outlined" value={bookForm.date} onChange={e=>setBookForm({...bookForm,date:e.target.value})} sx={fieldSx}/>
//             </Box>
//             <Box>
//               <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Time Slot *</Typography>
//               <Select fullWidth size="small" value={bookForm.timeSlot} onChange={e=>setBookForm({...bookForm,timeSlot:e.target.value})}
//                 sx={{"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"},"& .MuiSelect-select":{borderRadius:"12px",background:"#f8f9ff"}}}>
//                 <MenuItem value="">Select time</MenuItem>
//                 {["09:00 AM","10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"].map(t=>(
//                   <MenuItem key={t} value={t}>{t}</MenuItem>
//                 ))}
//               </Select>
//             </Box>
//             <Box>
//               <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Symptoms / Description</Typography>
//               <TextField fullWidth size="small" multiline rows={3} variant="outlined"
//                 placeholder="Describe your symptoms or reason for visit…"
//                 value={bookForm.description} onChange={e=>setBookForm({...bookForm,description:e.target.value})} sx={fieldSx}/>
//             </Box>
//             <Box>
//               <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Attach Report (optional)</Typography>
//               <Box sx={{border:"2px dashed #c7cee8",borderRadius:"12px",p:2.5,textAlign:"center",cursor:"pointer",background:"#f8f9ff"}} onClick={()=>fileRef.current?.click()}>
//                 <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={e=>setBookFile(e.target.files[0])}/>
//                 <UploadFileIcon sx={{fontSize:26,color:"#c0c8e0",mb:.5}}/>
//                 {bookFile
//                   ? <Typography sx={{fontSize:".82rem",fontWeight:600,color:"#4f6ef7"}}>{bookFile.name}</Typography>
//                   : <Typography sx={{fontSize:".8rem",color:"#8892b0"}}>Click to attach a report</Typography>
//                 }
//               </Box>
//             </Box>
//             <Button onClick={handleBook} variant="contained" disabled={bookLoading}
//               sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".92rem",py:1.4,boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>
//               {bookLoading?"Booking…":"Confirm Appointment →"}
//             </Button>
//           </Box>
//         </Card>
//       </motion.div>
//     );
//   }

//   return (
//     <>
//       <TextField fullWidth size="small"
//         placeholder="Search doctor name, specialization, hospital…"
//         value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
//         InputProps={{startAdornment:<InputAdornment position="start"><SearchIcon sx={{color:"#b0b8d0",fontSize:20}}/></InputAdornment>}}
//         sx={{mb:2.5,"& .MuiOutlinedInput-root":{borderRadius:"14px",background:"#fff","& fieldset":{borderColor:"#e8ecf5"},"&:hover fieldset":{borderColor:"#c7cee8"},"&.Mui-focused fieldset":{borderColor:"#4f6ef7"}}}}/>
//       <Box sx={{mb:3}}>
//         <Box sx={{display:"flex",alignItems:"center",gap:1,mb:1.5}}>
//           <FilterListIcon sx={{fontSize:16,color:"#8892b0"}}/>
//           <Typography sx={{fontSize:".72rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600}}>Filter by Specialization</Typography>
//         </Box>
//         <div className="spec-chip-wrap">
//           {specializations.map(spec=>(
//             <div key={spec} className={`spec-chip ${activeSpec===spec?"active":""}`} onClick={()=>setActiveSpec(spec)}>{spec}</div>
//           ))}
//         </div>
//       </Box>
//       <Box sx={{mb:2.5,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
//         <Typography sx={{fontSize:".8rem",color:"#8892b0"}}>{filteredDoctors.length} doctor{filteredDoctors.length!==1?"s":""} found</Typography>
//         {(searchQuery||activeSpec!=="All")&&(
//           <Typography sx={{fontSize:".78rem",color:"#4f6ef7",fontWeight:600,cursor:"pointer"}} onClick={()=>{setSearchQuery("");setActiveSpec("All");}}>Clear filters ✕</Typography>
//         )}
//       </Box>
//       {filteredDoctors.length===0 ? (
//         <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
//           <Typography sx={{fontSize:"2.5rem",mb:1}}>🔍</Typography>
//           <Typography sx={{fontWeight:500}}>No doctors found.</Typography>
//         </Box>
//       ) : (
//         <Grid container spacing={2.5}>
//           {filteredDoctors.map((doc,i)=>(
//             <Grid item xs={12} sm={6} md={4} key={doc.id}>
//               <motion.div whileHover={{scale:1.03}}>
//                 <Card className="light-card" sx={{p:3}}>
//                   <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
//                     <Avatar className={getAvatarClass(i)} sx={{width:68,height:68,borderRadius:"20px",mb:1.5,fontSize:"1.8rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.22)"}}>
//                       {doc.name?.charAt(0)}
//                     </Avatar>
//                     <Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {doc.name}</Typography>
//                     <Chip label={doc.specialization||"General"} size="small" sx={{mt:.75,mb:.5,background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:600,fontSize:".72rem"}}/>
//                     {doc.qualification&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>{doc.qualification}</Typography>}
//                     {doc.experience>0&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>🏅 {doc.experience} yrs experience</Typography>}
//                     {doc.hospital&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.5}}>🏥 {doc.hospital}</Typography>}
//                     {doc.consultationFee>0&&(
//                       <Box sx={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75,mb:2,display:"flex",alignItems:"center",gap:.75}}>
//                         <CurrencyRupeeIcon sx={{fontSize:14,color:"#d97706"}}/>
//                         <Typography sx={{fontSize:".8rem",fontWeight:700,color:"#d97706"}}>Consultation Fee: ₹{doc.consultationFee}</Typography>
//                       </Box>
//                     )}
//                     <Button variant="contained" onClick={()=>setBookingDocId(doc.id)}
//                       sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600,fontSize:".85rem",boxShadow:"0 3px 12px rgba(79,110,247,.28)","&:hover":{boxShadow:"0 6px 20px rgba(79,110,247,.38)"}}}>
//                       Book Now →
//                     </Button>
//                   </Box>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </>
//   );
// }

// // ── Main Dashboard ─────────────────────────────────────────────────────────────
// export default function PatientDashboard() {
//   const {user}  = useContext(AuthContext);
//   const userId  = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [patient,        setPatient]        = useState(null);
//   const [appointments,   setAppointments]   = useState([]);
//   const [doctors,        setDoctors]        = useState([]);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [prescriptions,  setPrescriptions]  = useState([]);
//   const [payments,       setPayments]       = useState({});
//   const [feedbackDone,   setFeedbackDone]   = useState({});
//   const [view,           setView]           = useState("dashboard");
//   const [sidebarOpen,    setSidebarOpen]    = useState(false);
//   const [loading,        setLoading]        = useState(true);
//   const [profileMissing, setProfileMissing] = useState(false);
//   const [error,          setError]          = useState("");
//   const [uploadOpen,     setUploadOpen]     = useState(false);
//   const [recordTypeFilter,setRecordTypeFilter] = useState("ALL");
//   const [payAppt,        setPayAppt]        = useState(null);
//   const [fbAppt,         setFbAppt]         = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const patRes = await axios.get(`${BASE}/patient/user/${userId}`);
//         setPatient(patRes.data);
//       } catch(err) {
//         if(err.response?.status===404){setProfileMissing(true);setLoading(false);return;}
//         setError("Failed to load patient.");setLoading(false);return;
//       }
//       try{const dRes=await axios.get(`${BASE}/doctor`);setDoctors(dRes.data);}catch{}
//       setLoading(false);
//     };
//     if(userId) load();
//     else{setError("User ID missing.");setLoading(false);}
//   },[userId]);

//   useEffect(() => {
//     if(!patient) return;
//     axios.get(`${BASE}/appointments/patient/${patient.id}`).then(r=>setAppointments(r.data)).catch(()=>{});
//     axios.get(`${BASE}/medical-records/patient/${patient.id}`).then(r=>setMedicalRecords(r.data)).catch(()=>{});
//     axios.get(`${BASE}/prescriptions/patient/${patient.id}`).then(r=>setPrescriptions(r.data)).catch(()=>{});
//     axios.get(`${BASE}/payments/patient/${patient.id}`).then(r=>{
//       const map={};
//       r.data.forEach(p=>{map[p.appointment?.id]=p;});
//       setPayments(map);
//     }).catch(()=>{});
//   },[patient]);

//   const handleLogout   = () => { localStorage.removeItem("user"); navigate("/"); };
//   const handleNavClick = (k) => { setView(k); setSidebarOpen(false); };
//   const countStatus    = (s) => appointments.filter(a=>a.status===s).length;
//   const filteredRecords = recordTypeFilter==="ALL" ? medicalRecords : medicalRecords.filter(r=>r.recordType===recordTypeFilter);

//   const handleDeleteRecord = async (id) => {
//     if(!window.confirm("Delete this medical record?")) return;
//     try{ await axios.delete(`${BASE}/medical-records/${id}`); setMedicalRecords(prev=>prev.filter(r=>r.id!==id)); }
//     catch{ alert("Failed to delete record"); }
//   };

//   const handlePaymentDone = (appointmentId) => {
//     setPayments(prev=>({...prev,[appointmentId]:{status:"SUCCESS"}}));
//   };

//   const handleFeedbackDone = (appointmentId) => {
//     setFeedbackDone(prev=>({...prev,[appointmentId]:true}));
//   };

//   const unpaidCount = appointments.filter(a=>a.status==="APPROVED"&&payments[a.id]?.status!=="SUCCESS").length;

//   const menuItems = [
//     {key:"dashboard",    label:"Dashboard",       icon:<DashboardIcon  sx={{fontSize:18}}/> },
//     {key:"appointments", label:"My Appointments", icon:<EventIcon      sx={{fontSize:18}}/>, badge: unpaidCount },
//     {key:"book",         label:"Book Appointment",icon:<AddIcon        sx={{fontSize:18}}/> },
//     {key:"records",      label:"Medical Records", icon:<FolderIcon     sx={{fontSize:18}}/> },
//     {key:"prescriptions",label:"Prescriptions",   icon:<LocalPharmacyIcon sx={{fontSize:18}}/> },
//     {key:"health",       label:"Health Stats",    icon:<BarChartIcon   sx={{fontSize:18}}/> },
//     {key:"profile",      label:"Profile",         icon:<PersonIcon     sx={{fontSize:18}}/> },
//   ];

//   if(loading) return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>);
//   if(error)   return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><Alert severity="error">{error}</Alert></Box>);
//   if(profileMissing||!patient) return(
//     <PatientProfileForm userId={userId} onCreated={created=>{setPatient(created);setProfileMissing(false);axios.get(`${BASE}/doctor`).then(r=>setDoctors(r.data)).catch(()=>{});}}/>
//   );

//   return (
//     <Box sx={{minHeight:"100vh",background:"#f5f7ff",fontFamily:"'Outfit',sans-serif"}}>
//       <div className="blob blob-1"/><div className="blob blob-2"/>
//       {sidebarOpen&&<div className="sidebar-overlay" onClick={()=>setSidebarOpen(false)}/>}

//       {/* Sidebar */}
//       <div className={`portal-sidebar ${sidebarOpen?"open":"closed"}`}>
//         <div className="sidebar-top-row">
//           <div className="sidebar-logo"><div className="logo-icon">✦</div>Med<span className="logo-accent">Vault</span></div>
//           <div className="sidebar-close-btn" onClick={()=>setSidebarOpen(false)}><CloseIcon sx={{fontSize:16}}/></div>
//         </div>
//         <div className="nav-section-label">Navigation</div>
//         {menuItems.map(item=>(
//           <NavItem key={item.key} icon={item.icon} label={item.label}
//             active={view===item.key} onClick={()=>handleNavClick(item.key)} badge={item.badge||0}/>
//         ))}
//         <div className="sidebar-spacer"/>
//         <div className="user-card">
//           <div className="user-mini-av">{patient.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{fontSize:".85rem",fontWeight:600,color:"#1a1f36",lineHeight:1.2}}>{patient.name}</Typography>
//             <Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Patient</Typography>
//           </Box>
//         </div>
//         <button onClick={handleLogout}
//           style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:11,cursor:"pointer",fontSize:".875rem",fontWeight:500,color:"#e11d48",border:"1px solid transparent",background:"none",width:"100%",fontFamily:"'Outfit',sans-serif",transition:"all .18s"}}
//           onMouseEnter={e=>{e.currentTarget.style.background="#fff1f3";e.currentTarget.style.borderColor="rgba(225,29,72,.15)";}}
//           onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor="transparent";}}>
//           <div className="nav-icon-wrap" style={{background:"#fff1f3",color:"#e11d48"}}><LogoutIcon sx={{fontSize:16}}/></div>
//           Sign Out
//         </button>
//       </div>

//       {/* Top bar */}
//       <div className="portal-topbar">
//         <div className="topbar-left">
//           <div className="hamburger-btn" onClick={()=>setSidebarOpen(true)}><MenuIcon sx={{fontSize:20}}/></div>
//           <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:"1.3rem",color:"#4f6ef7"}}>
//             Med<span style={{color:"#7c3aed"}}>Vault</span>
//           </Typography>
//         </div>
//         <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
//           {unpaidCount>0&&(
//             <Box onClick={()=>handleNavClick("appointments")}
//               sx={{display:"flex",alignItems:"center",gap:.75,cursor:"pointer",background:"#fff7ed",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75}}>
//               <NotificationsIcon sx={{fontSize:16,color:"#d97706"}}/>
//               <Typography sx={{fontSize:".75rem",fontWeight:600,color:"#d97706"}}>{unpaidCount} fee pending</Typography>
//             </Box>
//           )}
//           <Button startIcon={<LogoutIcon/>} onClick={handleLogout} size="small"
//             sx={{color:"#e11d48",borderColor:"rgba(225,29,72,.3)",textTransform:"none",borderRadius:2,border:"1px solid",fontFamily:"'Outfit',sans-serif"}}>
//             Logout
//           </Button>
//         </Box>
//       </div>

//       {/* Content */}
//       <Box sx={{p:{xs:2,md:"36px 44px"},position:"relative",zIndex:1}}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}}>

//             {/* DASHBOARD */}
//             {view==="dashboard"&&(
//               <>
//                 <Box sx={{mb:4}}>
//                   <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>
//                     Good morning, {patient.name?.split(" ")[0]} ☀️
//                   </Typography>
//                   <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Here's a summary of your health portal</Typography>
//                 </Box>

//                 {appointments.filter(a=>a.status==="APPROVED"&&payments[a.id]?.status!=="SUCCESS").map(appt=>(
//                   <Box key={appt.id} className="pay-banner" sx={{mb:2}}>
//                     <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
//                       <Box sx={{width:38,height:38,borderRadius:"11px",background:"linear-gradient(135deg,#f59e0b,#fbbf24)",display:"flex",alignItems:"center",justifyContent:"center"}}>
//                         <NotificationsIcon sx={{color:"#fff",fontSize:20}}/>
//                       </Box>
//                       <Box>
//                         <Typography sx={{fontWeight:600,fontSize:".88rem",color:"#92400e"}}>Appointment Confirmed — Fee Pending</Typography>
//                         <Typography sx={{fontSize:".78rem",color:"#a16207"}}>Dr. {appt.doctor?.name} · {appt.date} · ₹{appt.doctor?.consultationFee}</Typography>
//                       </Box>
//                     </Box>
//                     <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{fontSize:16}}/>}
//                       sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,boxShadow:"0 3px 10px rgba(245,158,11,.35)",whiteSpace:"nowrap"}}>
//                       Pay ₹{appt.doctor?.consultationFee}
//                     </Button>
//                   </Box>
//                 ))}

//                 <Box className="hero-card" sx={{mb:4,display:"flex",alignItems:"center",gap:3}}>
//                   <Avatar className="av-blue" sx={{width:80,height:80,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",boxShadow:"0 8px 24px rgba(79,110,247,.3)"}}>
//                     {patient.name?.charAt(0)}
//                   </Avatar>
//                   <Box>
//                     <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography>
//                     <Typography sx={{color:"#8892b0",fontSize:".82rem",mt:.5}}>Patient ID · #{patient.id}</Typography>
//                     <Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>
//                       {[patient.gender,`Age ${patient.age}`,patient.contact].filter(Boolean).map((v,i)=>(
//                         <Chip key={i} label={v} size="small" sx={{background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:500,fontSize:".75rem"}}/>
//                       ))}
//                     </Box>
//                   </Box>
//                 </Box>

//                 <Grid container spacing={2.5} sx={{mb:4}}>
//                   <Grid item xs={6} sm={3}><StatCard label="Appointments"    value={appointments.length}       icon="📅" color="#4f6ef7"/></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Approved"        value={countStatus("APPROVED")}   icon="✓"  color="#059669"/></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Prescriptions"   value={prescriptions.length}      icon="💊" color="#7c3aed"/></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Medical Records" value={medicalRecords.length}     icon="📋" color="#0891b2"/></Grid>
//                 </Grid>

//                 <div className="sec-heading">Recent Appointments</div>
//                 <Grid container spacing={2.5}>
//                   {appointments.slice(0,3).map((appt,i)=>(
//                     <Grid item xs={12} md={4} key={appt.id}>
//                       <motion.div whileHover={{scale:1.03}}>
//                         <Card className="light-card">
//                           <CardContent sx={{p:"20px !important"}}>
//                             <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
//                               <Avatar className={getAvatarClass(i)} sx={{width:44,height:44,borderRadius:"12px",fontSize:"1rem",fontWeight:700}}>
//                                 {appt.doctor?.name?.charAt(0)}
//                               </Avatar>
//                               <Box>
//                                 <Typography sx={{fontWeight:600,fontSize:".92rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography>
//                                 <Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography>
//                               </Box>
//                             </Box>
//                             <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:1}}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
//                             <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:.75}}>
//                               <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".72rem"}}/>
//                               {appt.status==="APPROVED"&&payments[appt.id]?.status!=="SUCCESS"&&(
//                                 <Chip label={`₹${appt.doctor?.consultationFee} pending`} size="small" onClick={()=>setPayAppt(appt)}
//                                   sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".68rem",cursor:"pointer"}}/>
//                               )}
//                               {payments[appt.id]?.status==="SUCCESS"&&(
//                                 <Chip label="Paid ✓" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".68rem"}}/>
//                               )}
//                             </Box>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     </Grid>
//                   ))}
//                   {appointments.length===0&&(
//                     <Grid item xs={12}>
//                       <Box sx={{textAlign:"center",py:5,color:"#8892b0"}}>
//                         <Typography sx={{fontSize:"2rem",mb:1}}>📅</Typography>
//                         <Typography sx={{fontWeight:500}}>No appointments yet.</Typography>
//                         <Button onClick={()=>setView("book")} size="small" variant="contained"
//                           sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>
//                           Book your first appointment →
//                         </Button>
//                       </Box>
//                     </Grid>
//                   )}
//                 </Grid>
//               </>
//             )}

//             {/* MY APPOINTMENTS */}
//             {view==="appointments"&&(
//               <>
//                 <Box sx={{mb:4}}>
//                   <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>My Appointments</Typography>
//                   <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{appointments.length} total · {countStatus("APPROVED")} approved</Typography>
//                 </Box>
//                 {appointments.filter(a=>a.status==="APPROVED"&&payments[a.id]?.status!=="SUCCESS").map(appt=>(
//                   <Box key={appt.id} className="pay-banner">
//                     <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
//                       <CurrencyRupeeIcon sx={{color:"#d97706",fontSize:20,flexShrink:0}}/>
//                       <Box>
//                         <Typography sx={{fontWeight:600,fontSize:".85rem",color:"#92400e"}}>Consultation fee pending for Dr. {appt.doctor?.name}</Typography>
//                         <Typography sx={{fontSize:".76rem",color:"#a16207"}}>{appt.date} · {appt.timeSlot} · ₹{appt.doctor?.consultationFee}</Typography>
//                       </Box>
//                     </Box>
//                     <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{fontSize:16}}/>}
//                       sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,boxShadow:"0 3px 10px rgba(245,158,11,.35)",whiteSpace:"nowrap"}}>
//                       Pay ₹{appt.doctor?.consultationFee}
//                     </Button>
//                   </Box>
//                 ))}
//                 {appointments.length===0?(
//                   <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
//                     <Typography sx={{fontSize:"2.5rem",mb:1}}>📅</Typography>
//                     <Typography sx={{fontWeight:500}}>No appointments yet.</Typography>
//                     <Button onClick={()=>setView("book")} size="small" variant="contained" sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Book an appointment →</Button>
//                   </Box>
//                 ):(
//                   <Grid container spacing={2.5}>
//                     {appointments.map((appt,i)=>{
//                       const isPaid = payments[appt.id]?.status==="SUCCESS";
//                       const hasFeedback = feedbackDone[appt.id];
//                       return (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{scale:1.02}}>
//                             <Card className="light-card">
//                               <CardContent sx={{p:"24px !important"}}>
//                                 <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
//                                   <Avatar className={getAvatarClass(i)} sx={{width:48,height:48,borderRadius:"14px",fontSize:"1.1rem",fontWeight:700}}>
//                                     {appt.doctor?.name?.charAt(0)}
//                                   </Avatar>
//                                   <Box sx={{flex:1}}>
//                                     <Typography sx={{fontWeight:600,fontSize:".95rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography>
//                                     <Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography>
//                                   </Box>
//                                   <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".7rem"}}/>
//                                 </Box>
//                                 <Divider sx={{mb:1.5,borderColor:"#f0f2f8"}}/>
//                                 <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:.5}}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
//                                 <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:1.5}} noWrap>📝 {appt.description||"No description"}</Typography>
//                                 <Box sx={{display:"flex",flexDirection:"column",gap:1}}>
//                                   {appt.status==="APPROVED"&&!isPaid&&(
//                                     <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{fontSize:15}}/>}
//                                       sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"9px",textTransform:"none",fontWeight:700,boxShadow:"0 2px 8px rgba(245,158,11,.3)"}}>
//                                       Pay Consultation Fee ₹{appt.doctor?.consultationFee}
//                                     </Button>
//                                   )}
//                                   {isPaid&&(
//                                     <Chip label="✓ Payment Confirmed" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,alignSelf:"flex-start"}}/>
//                                   )}
//                                   {appt.status==="APPROVED"&&isPaid&&!hasFeedback&&(
//                                     <Button onClick={()=>setFbAppt(appt)} size="small" variant="outlined" startIcon={<StarIcon sx={{fontSize:14}}/>}
//                                       sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".78rem",borderColor:"rgba(245,158,11,.4)",color:"#d97706","&:hover":{background:"#fffbeb"}}}>
//                                       Rate this appointment
//                                     </Button>
//                                   )}
//                                   {hasFeedback&&(
//                                     <Typography sx={{fontSize:".75rem",color:"#059669",fontWeight:600,textAlign:"center"}}>⭐ Feedback submitted — Thank you!</Typography>
//                                   )}
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

//             {/* BOOK APPOINTMENT — inline, no navigation */}
//             {view==="book"&&(
//               <>
//                 <Box sx={{mb:3}}>
//                   <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Book Appointment</Typography>
//                   <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Find a doctor and book your appointment directly</Typography>
//                 </Box>
//                 <BookAppointmentInline patient={patient} doctors={doctors} />
//               </>
//             )}

//             {/* MEDICAL RECORDS */}
//             {view==="records"&&(
//               <>
//                 <Box sx={{mb:4,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:2}}>
//                   <Box>
//                     <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Medical Records</Typography>
//                     <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{medicalRecords.length} record{medicalRecords.length!==1?"s":""} stored securely</Typography>
//                   </Box>
//                   <Button variant="contained" startIcon={<UploadFileIcon/>} onClick={()=>setUploadOpen(true)}
//                     sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".88rem",boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>
//                     Add Record
//                   </Button>
//                 </Box>
//                 <Box sx={{mb:3}}>
//                   <div className="spec-chip-wrap">
//                     {["ALL",...RECORD_TYPES].map(t=>(
//                       <div key={t} className={`spec-chip ${recordTypeFilter===t?"active":""}`} onClick={()=>setRecordTypeFilter(t)}>
//                         {t==="ALL"?"All":t.replace("_"," ")}
//                       </div>
//                     ))}
//                   </div>
//                 </Box>
//                 {filteredRecords.length===0?(
//                   <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
//                     <Typography sx={{fontSize:"2.5rem",mb:1}}>📋</Typography>
//                     <Typography sx={{fontWeight:500}}>{medicalRecords.length===0?"No medical records yet.":"No records match this filter."}</Typography>
//                     {medicalRecords.length===0&&<Button onClick={()=>setUploadOpen(true)} size="small" variant="contained" sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Upload your first record →</Button>}
//                   </Box>
//                 ):(filteredRecords.map(record=><RecordCard key={record.id} record={record} onDelete={handleDeleteRecord}/>))}
//               </>
//             )}

//             {/* PRESCRIPTIONS */}
//             {view==="prescriptions"&&(
//               <>
//                 <Box sx={{mb:4}}>
//                   <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Prescriptions</Typography>
//                   <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{prescriptions.length} prescription{prescriptions.length!==1?"s":""} from your doctors</Typography>
//                 </Box>
//                 {prescriptions.length===0?(
//                   <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
//                     <Typography sx={{fontSize:"2.5rem",mb:1}}>💊</Typography>
//                     <Typography sx={{fontWeight:500}}>No prescriptions yet.</Typography>
//                     <Typography sx={{fontSize:".83rem",mt:.5}}>Prescriptions appear after approved appointments and payment confirmation.</Typography>
//                   </Box>
//                 ):(
//                   prescriptions.map(rx=>(
//                     <div key={rx.id} className="rx-card">
//                       <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
//                         <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
//                           <LocalPharmacyIcon sx={{color:"#059669",fontSize:22}}/>
//                         </Box>
//                         <Box sx={{flex:1}}>
//                           <Box sx={{display:"flex",alignItems:"center",gap:1.5,flexWrap:"wrap",mb:.75}}>
//                             <Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {rx.appointment?.doctor?.name}</Typography>
//                             {rx.issuedDate&&<Chip label={rx.issuedDate} size="small" sx={{background:"#f5f7ff",color:"#8892b0",fontSize:".68rem",height:20}}/>}
//                           </Box>
//                           <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:.75}}>{rx.appointment?.doctor?.specialization} · {rx.appointment?.date}</Typography>
//                           {rx.diagnosis&&(
//                             <Box sx={{background:"#f0fdf4",border:"1px solid rgba(5,150,105,.15)",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
//                               <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#059669",fontWeight:700,mb:.3}}>Diagnosis</Typography>
//                               <Typography sx={{fontSize:".88rem",fontWeight:600,color:"#1a1f36"}}>🩺 {rx.diagnosis}</Typography>
//                             </Box>
//                           )}
//                           {rx.medicines&&(
//                             <Box sx={{background:"#f8f9ff",border:"1px solid #e8ecf5",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
//                               <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#4f6ef7",fontWeight:700,mb:.5}}>💊 Medicines &amp; Dosage</Typography>
//                               <Typography sx={{fontSize:".83rem",color:"#1a1f36",whiteSpace:"pre-line",lineHeight:1.7}}>{rx.medicines}</Typography>
//                             </Box>
//                           )}
//                           <Grid container spacing={1.5}>
//                             {rx.instructions&&(<Grid item xs={12} sm={6}><Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Instructions</Typography><Typography sx={{fontSize:".82rem",color:"#4a5278"}}>📋 {rx.instructions}</Typography></Grid>)}
//                             {rx.tests&&(<Grid item xs={12} sm={6}><Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Lab Tests</Typography><Typography sx={{fontSize:".82rem",color:"#7c3aed"}}>🔬 {rx.tests}</Typography></Grid>)}
//                             {rx.followUpDate&&(<Grid item xs={12}><Typography sx={{fontSize:".82rem",color:"#d97706",fontWeight:600}}>📅 Follow-up: {rx.followUpDate}</Typography></Grid>)}
//                           </Grid>
//                         </Box>
//                       </Box>
//                     </div>
//                   ))
//                 )}
//               </>
//             )}

//             {/* HEALTH STATS */}
//             {view==="health"&&(
//               <>
//                 <Box sx={{mb:4}}>
//                   <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Health Stats</Typography>
//                   <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Your health data visualized</Typography>
//                 </Box>
//                 <HealthStats
//                   appointments={appointments}
//                   prescriptions={prescriptions}
//                   medicalRecords={medicalRecords}
//                   payments={payments}
//                 />
//               </>
//             )}

//             {/* PROFILE */}
//             {view==="profile"&&(
//               <>
//                 <Box sx={{mb:4}}>
//                   <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Profile</Typography>
//                   <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Your personal health information</Typography>
//                 </Box>
//                 <Card className="light-card" sx={{p:4}}>
//                   <Box sx={{display:"flex",alignItems:"center",gap:2.5,mb:3}}>
//                     <Avatar className="av-blue" sx={{width:76,height:76,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.25)"}}>
//                       {patient.name?.charAt(0)}
//                     </Avatar>
//                     <Box>
//                       <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography>
//                       <Typography sx={{fontSize:".82rem",color:"#8892b0",mt:.5}}>Patient Account · Active</Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//                   <Grid container spacing={3}>
//                     {[["Full Name",patient.name],["Gender",patient.gender],["Date of Birth",patient.dob],["Contact",patient.contact],["Age",patient.age?`${patient.age} years`:"—"],["Patient ID",`#${patient.id}`]].map(([label,val])=>(
//                       <Grid item xs={12} sm={6} key={label}>
//                         <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1.1px",color:"#8892b0",fontWeight:600,mb:.6}}>{label}</Typography>
//                         <Typography sx={{fontSize:".95rem",fontWeight:500,color:"#1a1f36"}}>{val||"—"}</Typography>
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
//       <UploadRecordModal open={uploadOpen} onClose={()=>setUploadOpen(false)} patientId={patient.id}
//         onUploaded={newRecord=>setMedicalRecords(prev=>[newRecord,...prev])}/>
//       <PaymentModal open={Boolean(payAppt)} appointment={payAppt}
//         onClose={()=>setPayAppt(null)} onPaid={handlePaymentDone}/>
//       <FeedbackModal open={Boolean(fbAppt)} appointment={fbAppt}
//         onClose={()=>setFbAppt(null)} onSubmitted={handleFeedbackDone}/>
//     </Box>
//   );
// }


// import { useContext, useEffect, useState, useRef, useCallback } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import PatientProfileForm from "./PatientProfileForm";
// import {
//   Box, Typography, CircularProgress, Alert, Grid, Card, CardContent,
//   Avatar, Button, Divider, Chip, TextField, InputAdornment,
//   MenuItem, Select, Modal, IconButton, LinearProgress, Rating,
//   Dialog, DialogTitle, DialogContent, DialogActions, Snackbar,
// } from "@mui/material";
// import MenuIcon          from "@mui/icons-material/Menu";
// import CloseIcon         from "@mui/icons-material/Close";
// import LogoutIcon        from "@mui/icons-material/Logout";
// import EventIcon         from "@mui/icons-material/Event";
// import DashboardIcon     from "@mui/icons-material/Dashboard";
// import PersonIcon        from "@mui/icons-material/Person";
// import AddIcon           from "@mui/icons-material/Add";
// import SearchIcon        from "@mui/icons-material/Search";
// import FolderIcon        from "@mui/icons-material/Folder";
// import UploadFileIcon    from "@mui/icons-material/UploadFile";
// import DescriptionIcon   from "@mui/icons-material/Description";
// import DeleteIcon        from "@mui/icons-material/Delete";
// import OpenInNewIcon     from "@mui/icons-material/OpenInNew";
// import DownloadIcon      from "@mui/icons-material/Download";
// import VisibilityIcon    from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import FilterListIcon    from "@mui/icons-material/FilterList";
// import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
// import PaymentIcon       from "@mui/icons-material/Payment";
// import StarIcon          from "@mui/icons-material/Star";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CheckCircleIcon   from "@mui/icons-material/CheckCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import BarChartIcon      from "@mui/icons-material/BarChart";
// import MonitorHeartIcon  from "@mui/icons-material/MonitorHeart";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar,
//   ResponsiveContainer, XAxis, YAxis, CartesianGrid,
//   Tooltip as ReTooltip, Legend, PolarGrid, PolarAngleAxis,
// } from "recharts";
// import { format } from "date-fns";

// const BASE = "http://localhost:8080";

// // ─────────────────────────────────────────────────────────────────────────────
// // Global CSS
// // ─────────────────────────────────────────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .sidebar-overlay{position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease;}
//   @keyframes overlayIn{from{opacity:0}to{opacity:1}}
//   .portal-sidebar{width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1);}
//   .portal-sidebar.closed{transform:translateX(-100%);}
//   .portal-sidebar.open{transform:translateX(0);}
//   .sidebar-top-row{display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px;}
//   .sidebar-logo{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px;}
//   .logo-icon{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0;}
//   .logo-accent{color:#7c3aed;}
//   .sidebar-close-btn{width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s;}
//   .sidebar-close-btn:hover{background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2);}
//   .nav-section-label{font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px;}
//   .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none;}
//   .nav-item:hover{background:#eef1fe;color:#4f6ef7;}
//   .nav-item.active{background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18);}
//   .nav-item.active .nav-icon-wrap{background:#4f6ef7 !important;color:#fff !important;}
//   .nav-icon-wrap{width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278;}
//   .sidebar-spacer{flex:1;}
//   .user-card{display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px;}
//   .user-mini-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem;}
//   .portal-topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100;}
//   .topbar-left{display:flex;align-items:center;gap:14px;}
//   .hamburger-btn{width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s;}
//   .hamburger-btn:hover{background:#eef1fe;border-color:rgba(79,110,247,.2);}
//   .blob{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;}
//   .blob-1{width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px;}
//   .blob-2{width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px;}
//   .light-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important;}
//   .light-card:hover{box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important;}
//   .hero-card{background:linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;}
//   .hero-card::after{content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none;}
//   .stat-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important;}
//   .stat-card:hover{box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .stat-value{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1;}
//   .stat-label{font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px;}
//   .stat-icon{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07;}
//   .sec-heading{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px;}
//   .sec-heading::after{content:'';flex:1;height:1px;background:#e8ecf5;}
//   .spec-chip-wrap{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0;}
//   .spec-chip{padding:6px 14px !important;border-radius:20px !important;font-size:.78rem !important;font-weight:600 !important;border:1px solid #e8ecf5 !important;cursor:pointer !important;transition:all .18s !important;background:#fff !important;color:#4a5278 !important;user-select:none;}
//   .spec-chip:hover{background:#eef1fe !important;border-color:rgba(79,110,247,.25) !important;color:#4f6ef7 !important;}
//   .spec-chip.active{background:#4f6ef7 !important;border-color:#4f6ef7 !important;color:#fff !important;}
//   .record-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:16px !important;box-shadow:0 1px 6px rgba(79,110,247,.07) !important;transition:box-shadow .22s,transform .22s !important;padding:20px 22px;margin-bottom:12px;}
//   .record-card:hover{box-shadow:0 5px 22px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .rx-card{background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s;}
//   .rx-card:hover{box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px);}
//   .pay-banner{background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:16px;padding:18px 22px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
//   .pay-banner-paid{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-color:#6ee7b7;}
//   .notif-dot{width:8px;height:8px;border-radius:50%;background:#e11d48;position:absolute;top:6px;right:6px;}
//   .upload-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:520px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto;}
//   .upload-modal-box .MuiOutlinedInput-root{border-radius:12px !important;background:#f8f9ff !important;}
//   .rzp-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:440px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .fb-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:460px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .drop-zone{border:2px dashed #c7cee8;border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:all .2s;background:#f8f9ff;}
//   .drop-zone:hover,.drop-zone.dragover{border-color:#4f6ef7;background:#eef1fe;}
//   .file-preview-wrap{width:100%;border-radius:10px;overflow:hidden;border:1px solid #e8ecf5;margin-top:12px;}
//   .file-preview-wrap iframe{width:100%;height:340px;border:none;display:block;}
//   .file-preview-wrap img{width:100%;display:block;max-height:380px;object-fit:contain;background:#f8f9ff;}
//   .health-chart-card{background:#fff;border:1px solid #e8ecf5;border-radius:18px;padding:24px;box-shadow:0 1px 6px rgba(79,110,247,.06);}
//   .hbar-wrap{display:flex;flex-direction:column;gap:10px;}
//   .hbar-row{display:flex;align-items:center;gap:12px;}
//   .hbar-label{font-size:.75rem;font-weight:600;color:#4a5278;width:100px;flex-shrink:0;text-align:right;}
//   .hbar-track{flex:1;height:10px;background:#f0f2f8;border-radius:999px;overflow:hidden;}
//   .hbar-fill{height:100%;border-radius:999px;transition:width .7s cubic-bezier(.22,1,.36,1);}
//   .hbar-val{font-size:.75rem;font-weight:700;color:#1a1f36;width:48px;flex-shrink:0;}
//   .donut-svg{display:block;margin:0 auto;}
//   .mini-legend{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:12px;}
//   .mini-legend-item{display:flex;align-items:center;gap:5px;font-size:.72rem;color:#4a5278;font-weight:500;}
//   .mini-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
//   .timeline-wrap{position:relative;padding-left:22px;}
//   .timeline-wrap::before{content:'';position:absolute;left:7px;top:0;bottom:0;width:2px;background:#e8ecf5;}
//   .tl-item{position:relative;margin-bottom:14px;}
//   .tl-dot{position:absolute;left:-18px;top:4px;width:10px;height:10px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 2px currentColor;}
//   .av-blue{background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;}
//   .av-violet{background:linear-gradient(135deg,#7c3aed,#a78bfa) !important;}
//   .av-teal{background:linear-gradient(135deg,#0891b2,#22d3ee) !important;}
//   .av-rose{background:linear-gradient(135deg,#e11d48,#fb7185) !important;}
//   .av-green{background:linear-gradient(135deg,#059669,#34d399) !important;}
//   .av-amber{background:linear-gradient(135deg,#d97706,#fbbf24) !important;}
//   @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
//   .fu{animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;}
// `;

// if (!document.getElementById("portal-styles")) {
//   const s = document.createElement("style"); s.id = "portal-styles"; s.textContent = globalStyles; document.head.appendChild(s);
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Health Status constants & helpers
// // ─────────────────────────────────────────────────────────────────────────────
// const HT = {
//   bg: "#0a0f1e", card: "#141d2e", border: "#1e2d45",
//   a1: "#00d4ff", a2: "#7c3aed", a3: "#10b981",
//   a4: "#f59e0b", a5: "#ef4444",
//   text: "#e2e8f0", muted: "#64748b",
// };

// const HS_METRICS = {
//   bloodSugarLevel:  { label: "Blood Sugar",     unit: "mg/dL", color: HT.a4, safe: [70, 140] },
//   heartRate:        { label: "Heart Rate",       unit: "bpm",   color: HT.a5, safe: [60, 100] },
//   oxygenSaturation: { label: "SpO₂",            unit: "%",     color: HT.a1, safe: [95, 100] },
//   bodyTemperature:  { label: "Temperature",      unit: "°C",    color: "#f97316", safe: [36.1, 37.2] },
//   respiratoryRate:  { label: "Respiratory Rate", unit: "/min",  color: HT.a3, safe: [12, 20] },
//   bmi:              { label: "BMI",              unit: "",      color: HT.a2, safe: [18.5, 24.9] },
//   weight:           { label: "Weight",           unit: "kg",    color: "#a78bfa", safe: null },
// };

// const HS_RADIALS = [
//   { key: "heartRate",        label: "Heart Rate", unit: "bpm",  color: HT.a5, max: 200 },
//   { key: "oxygenSaturation", label: "SpO₂",       unit: "%",    color: HT.a1, max: 100 },
//   { key: "respiratoryRate",  label: "Resp. Rate", unit: "/min", color: HT.a3, max: 40  },
// ];

// const HS_EMPTY = {
//   bloodSugarLevel: "", sugarType: "fasting",
//   bodyTemperature: "", bloodPressure: "",
//   heartRate: "", oxygenSaturation: "",
//   respiratoryRate: "", height: "", weight: "",
// };

// const hsStatus = (key, val) => {
//   const s = HS_METRICS[key]?.safe;
//   if (!s || val == null) return null;
//   if (val < s[0]) return "low";
//   if (val > s[1]) return "high";
//   return "normal";
// };
// const HS_SCOL = { normal: HT.a3, low: HT.a4, high: HT.a5 };
// const hsParseBP = (bp) => { if (!bp) return null; const [s, d] = bp.split("/").map(Number); return isNaN(s) || isNaN(d) ? null : { sys: s, dia: d }; };
// const hsFmtDate = (d) => { try { return format(new Date(d), "MMM d, HH:mm"); } catch { return ""; } };
// const hsFmt = (v, dec = 1) => (v != null ? Number(v).toFixed(dec) : "—");

// const hsBadgeSx = (color) => ({
//   display: "flex", flexDirection: "column", alignItems: "center",
//   justifyContent: "center", p: 2.5, borderRadius: 3,
//   border: `1px solid ${color}33`,
//   background: `linear-gradient(135deg, ${color}0d 0%, transparent 100%)`,
//   position: "relative", overflow: "hidden",
//   "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${color}, transparent)` },
// });

// const hsGlass = {
//   background: `linear-gradient(135deg, ${HT.card} 0%, rgba(20,29,46,0.85) 100%)`,
//   border: `1px solid ${HT.border}`, borderRadius: 3,
//   boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
//   transition: "transform 0.2s, box-shadow 0.2s",
//   "&:hover": { transform: "translateY(-2px)", boxShadow: "0 12px 40px rgba(0,0,0,0.5)" },
// };

// const hsInputSx = {
//   "& .MuiOutlinedInput-root": {
//     background: "rgba(255,255,255,0.03)", borderRadius: 2,
//     "& fieldset": { borderColor: HT.border },
//     "&:hover fieldset": { borderColor: HT.a1 + "88" },
//     "&.Mui-focused fieldset": { borderColor: HT.a1 },
//   },
//   "& .MuiInputLabel-root": { color: HT.muted },
//   "& .MuiInputLabel-root.Mui-focused": { color: HT.a1 },
//   "& .MuiInputBase-input": { color: HT.text },
//   "& .MuiSelect-icon": { color: HT.muted },
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Existing helpers
// // ─────────────────────────────────────────────────────────────────────────────
// const avatarColors   = ["av-blue", "av-violet", "av-teal", "av-rose", "av-green", "av-amber"];
// const getAvatarClass = (i) => avatarColors[i % avatarColors.length];
// const RECORD_TYPES   = ["LAB_REPORT", "PRESCRIPTION", "SCAN", "VACCINATION", "SURGERY", "OTHER"];
// const RECORD_COLORS  = {
//   LAB_REPORT:   { bg: "#eef1fe", color: "#4f6ef7", border: "rgba(79,110,247,.2)" },
//   PRESCRIPTION: { bg: "#ecfdf5", color: "#059669", border: "rgba(5,150,105,.2)" },
//   SCAN:         { bg: "#fff1f3", color: "#e11d48", border: "rgba(225,29,72,.2)" },
//   VACCINATION:  { bg: "#fffbeb", color: "#d97706", border: "rgba(217,119,6,.2)" },
//   SURGERY:      { bg: "#f5f3ff", color: "#7c3aed", border: "rgba(124,58,237,.2)" },
//   OTHER:        { bg: "#f5f7ff", color: "#8892b0", border: "#e8ecf5" },
// };
// const getStatusColor = (s) => s === "APPROVED" ? "success" : s === "REJECTED" ? "error" : "warning";

// // ─────────────────────────────────────────────────────────────────────────────
// // Small reusable components
// // ─────────────────────────────────────────────────────────────────────────────
// function NavItem({ icon, label, active, onClick, badge }) {
//   return (
//     <div className={`nav-item ${active ? "active" : ""}`} onClick={onClick} style={{ position: "relative" }}>
//       <div className="nav-icon-wrap">{icon}</div>
//       {label}
//       {badge > 0 && <span style={{ marginLeft: "auto", background: "#e11d48", color: "#fff", fontSize: ".62rem", fontWeight: 700, borderRadius: "999px", padding: "1px 7px", minWidth: 18, textAlign: "center" }}>{badge}</span>}
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="stat-card fu">
//       <div className="stat-label">{label}</div>
//       <div className="stat-value" style={{ color }}>{value}</div>
//       <div className="stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Health Stats (dashboard tab charts — existing)
// // ─────────────────────────────────────────────────────────────────────────────
// function HealthStats({ appointments, prescriptions, medicalRecords, payments }) {
//   const total    = appointments.length;
//   const approved = appointments.filter(a => a.status === "APPROVED").length;
//   const pending  = appointments.filter(a => a.status === "PENDING").length;
//   const rejected = appointments.filter(a => a.status === "REJECTED").length;
//   const typeCounts = RECORD_TYPES.reduce((acc, t) => { acc[t] = medicalRecords.filter(r => r.recordType === t).length; return acc; }, {});
//   const now = new Date();
//   const months = Array.from({ length: 6 }, (_, i) => {
//     const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
//     return { label: d.toLocaleString("default", { month: "short" }), year: d.getFullYear(), month: d.getMonth() };
//   });
//   const monthlyData = months.map(m => ({
//     label: m.label,
//     count: appointments.filter(a => { if (!a.date) return false; const d = new Date(a.date); return d.getFullYear() === m.year && d.getMonth() === m.month; }).length,
//   }));
//   const maxCount = Math.max(...monthlyData.map(m => m.count), 1);
//   const donutData = [
//     { label: "Approved", count: approved, color: "#059669" },
//     { label: "Pending",  count: pending,  color: "#f59e0b" },
//     { label: "Rejected", count: rejected, color: "#e11d48" },
//   ].filter(d => d.count > 0);
//   const r = 58, cx = 70, cy = 70, circum = 2 * Math.PI * r;
//   let offset = 0;
//   const segments = donutData.map(d => {
//     const pct = total > 0 ? d.count / total : 0;
//     const dash = pct * circum; const gap = circum - dash;
//     const seg = { ...d, dash, gap, offset, pct };
//     offset += dash; return seg;
//   });
//   const typeBars = Object.entries(typeCounts).filter(([, v]) => v > 0).map(([k, v]) => ({ label: k.replace("_", " "), val: v, color: RECORD_COLORS[k]?.color || "#8892b0" }));
//   const maxType = Math.max(...typeBars.map(b => b.val), 1);
//   const paidCount = Object.values(payments).filter(p => p?.status === "SUCCESS").length;
//   const pendingPayCount = approved - paidCount;
//   return (
//     <Box>
//       <Grid container spacing={2.5}>
//         <Grid item xs={12} sm={6} md={4}>
//           <div className="health-chart-card" style={{ height: "100%" }}>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Appointment Status</Typography>
//             {total === 0 ? (
//               <Box sx={{ textAlign: "center", py: 4, color: "#c0c8e0" }}><Typography sx={{ fontSize: "2rem", mb: 1 }}>📅</Typography><Typography sx={{ fontSize: ".82rem" }}>No appointments yet</Typography></Box>
//             ) : (
//               <>
//                 <svg className="donut-svg" width={140} height={140} viewBox="0 0 140 140">
//                   <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f2f8" strokeWidth={16} />
//                   {segments.map((seg, i) => (
//                     <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={16} strokeDasharray={`${seg.dash} ${seg.gap}`} strokeDashoffset={-seg.offset} transform="rotate(-90 70 70)" style={{ transition: "stroke-dasharray .7s ease" }} />
//                   ))}
//                   <text x={cx} y={cy - 4} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1a1f36" fontFamily="'Cormorant Garamond',serif">{total}</text>
//                   <text x={cx} y={cy + 14} textAnchor="middle" fontSize={9} fill="#8892b0" fontFamily="Outfit,sans-serif">Total</text>
//                 </svg>
//                 <div className="mini-legend">{donutData.map(d => (<div key={d.label} className="mini-legend-item"><div className="mini-dot" style={{ background: d.color }} />{d.label}: {d.count}</div>))}</div>
//               </>
//             )}
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <div className="health-chart-card" style={{ height: "100%" }}>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Monthly Activity</Typography>
//             <Box sx={{ display: "flex", alignItems: "flex-end", gap: "6px", height: 90, px: .5 }}>
//               {monthlyData.map((m, i) => {
//                 const pct = m.count / maxCount;
//                 return (
//                   <Box key={i} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: .5 }}>
//                     <Typography sx={{ fontSize: ".62rem", color: "#8892b0", fontWeight: 600 }}>{m.count || ""}</Typography>
//                     <Box sx={{ width: "100%", background: `rgba(79,110,247,${0.15 + pct * 0.7})`, borderRadius: "5px 5px 0 0", height: `${Math.max(pct * 68, 4)}px`, transition: "height .6s ease", minHeight: 4 }} />
//                     <Typography sx={{ fontSize: ".62rem", color: "#8892b0", fontWeight: 600, textAlign: "center" }}>{m.label}</Typography>
//                   </Box>
//                 );
//               })}
//             </Box>
//             <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}><Typography sx={{ fontSize: ".72rem", color: "#8892b0" }}>Last 6 months</Typography></Box>
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <div className="health-chart-card" style={{ height: "100%" }}>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Payment Health</Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               {[
//                 { label: "Paid",    val: paidCount,            color: "#059669", max: Math.max(approved, 1) },
//                 { label: "Pending", val: pendingPayCount,       color: "#f59e0b", max: Math.max(approved, 1) },
//                 { label: "Records", val: medicalRecords.length, color: "#4f6ef7", max: Math.max(medicalRecords.length, 1) },
//                 { label: "Rx",      val: prescriptions.length,  color: "#7c3aed", max: Math.max(prescriptions.length, 1) },
//               ].map(item => (
//                 <Box key={item.label}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", mb: .5 }}>
//                     <Typography sx={{ fontSize: ".75rem", fontWeight: 600, color: "#4a5278" }}>{item.label}</Typography>
//                     <Typography sx={{ fontSize: ".75rem", fontWeight: 700, color: item.color }}>{item.val}</Typography>
//                   </Box>
//                   <Box sx={{ height: 8, background: "#f0f2f8", borderRadius: 999, overflow: "hidden" }}>
//                     <Box sx={{ height: "100%", width: `${(item.val / item.max) * 100}%`, background: item.color, borderRadius: 999, transition: "width .7s ease" }} />
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={6} md={6}>
//           <div className="health-chart-card">
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Medical Record Types</Typography>
//             {typeBars.length === 0 ? <Box sx={{ textAlign: "center", py: 3, color: "#c0c8e0" }}><Typography sx={{ fontSize: ".82rem" }}>No medical records uploaded yet</Typography></Box> : (
//               <div className="hbar-wrap">
//                 {typeBars.map(b => (
//                   <div key={b.label} className="hbar-row">
//                     <span className="hbar-label">{b.label}</span>
//                     <div className="hbar-track"><div className="hbar-fill" style={{ width: `${(b.val / maxType) * 100}%`, background: b.color }} /></div>
//                     <span className="hbar-val" style={{ color: b.color }}>{b.val}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={6} md={6}>
//           <div className="health-chart-card">
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Prescription Timeline</Typography>
//             {prescriptions.length === 0 ? (
//               <Box sx={{ textAlign: "center", py: 3, color: "#c0c8e0" }}><Typography sx={{ fontSize: "2rem", mb: 1 }}>💊</Typography><Typography sx={{ fontSize: ".82rem" }}>No prescriptions yet</Typography></Box>
//             ) : (
//               <div className="timeline-wrap">
//                 {[...prescriptions].reverse().slice(0, 5).map((rx) => (
//                   <div key={rx.id} className="tl-item">
//                     <div className="tl-dot" style={{ color: "#059669", background: "#ecfdf5" }} />
//                     <Box sx={{ pl: 1 }}>
//                       <Typography sx={{ fontSize: ".82rem", fontWeight: 700, color: "#1a1f36" }}>{rx.diagnosis || "Prescription"}</Typography>
//                       <Typography sx={{ fontSize: ".72rem", color: "#8892b0" }}>Dr. {rx.appointment?.doctor?.name} · {rx.issuedDate || rx.appointment?.date || "—"}</Typography>
//                       {rx.medicines && <Typography sx={{ fontSize: ".72rem", color: "#4f6ef7", mt: .3 }} noWrap>💊 {rx.medicines.split("\n")[0]}</Typography>}
//                     </Box>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Health Status View (new tab — dark theme vitals dashboard)
// // ─────────────────────────────────────────────────────────────────────────────
// function HealthStatusView({ patientId }) {
//   const [hsHistory, setHsHistory] = useState([]);
//   const [hsLatest,  setHsLatest]  = useState(null);
//   const [hsLoading, setHsLoading] = useState(true);
//   const [hsDialog,  setHsDialog]  = useState(false);
//   const [hsForm,    setHsForm]    = useState(HS_EMPTY);
//   const [hsEditId,  setHsEditId]  = useState(null);
//   const [hsSaving,  setHsSaving]  = useState(false);
//   const [hsSnack,   setHsSnack]   = useState({ open: false, msg: "", sev: "success" });

//   const loadHS = useCallback(async () => {
//     if (!patientId) return;
//     try {
//       setHsLoading(true);
//       const [hRes, lRes] = await Promise.allSettled([
//         axios.get(`${BASE}/health-status/patient/${patientId}`),
//         axios.get(`${BASE}/health-status/patient/${patientId}/latest`),
//       ]);
//       if (hRes.status === "fulfilled") setHsHistory(hRes.value.data);
//       if (lRes.status === "fulfilled") setHsLatest(lRes.value.data);
//     } catch {
//       setHsSnack({ open: true, msg: "Failed to load health data", sev: "error" });
//     } finally {
//       setHsLoading(false);
//     }
//   }, [patientId]);

//   useEffect(() => { loadHS(); }, [loadHS]);

//   const openHsAdd = () => { setHsForm(HS_EMPTY); setHsEditId(null); setHsDialog(true); };
//   const openHsEdit = (r) => {
//     setHsForm({
//       bloodSugarLevel: r.bloodSugarLevel ?? "", sugarType: r.sugarType ?? "fasting",
//       bodyTemperature: r.bodyTemperature ?? "", bloodPressure: r.bloodPressure ?? "",
//       heartRate: r.heartRate ?? "", oxygenSaturation: r.oxygenSaturation ?? "",
//       respiratoryRate: r.respiratoryRate ?? "", height: r.height ?? "", weight: r.weight ?? "",
//     });
//     setHsEditId(r.id); setHsDialog(true);
//   };

//   const handleHsSave = async () => {
//     setHsSaving(true);
//     try {
//       const payload = {
//         ...hsForm,
//         bloodSugarLevel:  hsForm.bloodSugarLevel  !== "" ? Number(hsForm.bloodSugarLevel)  : null,
//         bodyTemperature:  hsForm.bodyTemperature  !== "" ? Number(hsForm.bodyTemperature)  : null,
//         heartRate:        hsForm.heartRate        !== "" ? Number(hsForm.heartRate)        : null,
//         oxygenSaturation: hsForm.oxygenSaturation !== "" ? Number(hsForm.oxygenSaturation) : null,
//         respiratoryRate:  hsForm.respiratoryRate  !== "" ? Number(hsForm.respiratoryRate)  : null,
//         height:           hsForm.height           !== "" ? Number(hsForm.height)           : null,
//         weight:           hsForm.weight           !== "" ? Number(hsForm.weight)           : null,
//       };
//       if (hsEditId) {
//         await axios.put(`${BASE}/health-status/${hsEditId}`, payload);
//       } else {
//         await axios.post(`${BASE}/health-status/patient/${patientId}`, payload);
//       }
//       setHsDialog(false);
//       setHsSnack({ open: true, msg: hsEditId ? "Record updated!" : "Record saved!", sev: "success" });
//       loadHS();
//     } catch {
//       setHsSnack({ open: true, msg: "Save failed. Check your input.", sev: "error" });
//     } finally { setHsSaving(false); }
//   };

//   // Chart data — last 10 in chronological order
//   const chartData = [...hsHistory].reverse().slice(-10).map(r => ({
//     time: hsFmtDate(r.recordedAt),
//     bloodSugar: r.bloodSugarLevel,
//     heartRate: r.heartRate,
//     spO2: r.oxygenSaturation,
//     temp: r.bodyTemperature,
//     bmi: r.bmi,
//     weight: r.weight,
//     resp: r.respiratoryRate,
//   }));

//   const bpHistory = [...hsHistory].reverse().slice(-10).map(r => {
//     const bp = hsParseBP(r.bloodPressure);
//     return { time: hsFmtDate(r.recordedAt), systolic: bp?.sys, diastolic: bp?.dia };
//   });

//   const radialData = HS_RADIALS.map(({ key, label, unit, color, max }) => {
//     const val = hsLatest?.[key] ?? 0;
//     return { label, unit, color, value: Math.min((val / max) * 100, 100), raw: hsLatest?.[key] };
//   });

//   const estBMI = hsForm.height && hsForm.weight
//     ? (Number(hsForm.weight) / Math.pow(Number(hsForm.height) / 100, 2)).toFixed(1)
//     : null;

//   if (hsLoading) {
//     return (
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300, background: `radial-gradient(ellipse at 20% 20%, #0d1f3c, ${HT.bg})`, borderRadius: 3 }}>
//         <CircularProgress sx={{ color: HT.a1 }} />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ background: `radial-gradient(ellipse at 20% 20%, #0d1f3c 0%, ${HT.bg} 60%)`, borderRadius: 3, p: { xs: 2, md: 4 }, minHeight: 400 }}>
//       {/* Header */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
//         <Box>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: 26, md: 36 }, color: HT.text, lineHeight: 1.1, fontWeight: 700 }}>
//             Health Status
//           </Typography>
//           <Typography sx={{ color: HT.muted, mt: 0.5, fontSize: 13 }}>
//             {hsHistory.length > 0
//               ? `${hsHistory.length} records · Last updated ${hsFmtDate(hsLatest?.recordedAt)}`
//               : "No records yet — log your first reading"}
//           </Typography>
//         </Box>
//         <Button onClick={openHsAdd}
//           sx={{ background: `linear-gradient(135deg, ${HT.a1}, ${HT.a2})`, color: "#fff", fontWeight: 700, px: 3, py: 1.5, borderRadius: 2, textTransform: "none", fontSize: 14, boxShadow: `0 4px 20px ${HT.a1}44`, "&:hover": { boxShadow: `0 6px 28px ${HT.a1}66` } }}>
//           + Log Reading
//         </Button>
//       </Box>

//       {hsHistory.length === 0 ? (
//         <Box sx={{ textAlign: "center", mt: 8 }}>
//           <Typography sx={{ fontSize: 64 }}>🩺</Typography>
//           <Typography sx={{ color: HT.text, fontSize: 20, mt: 2, fontWeight: 600 }}>No health data yet</Typography>
//           <Typography sx={{ color: HT.muted, mt: 1, fontSize: 14 }}>Click "+ Log Reading" to add your first health record</Typography>
//         </Box>
//       ) : (
//         <>
//           {/* Metric Badges */}
//           <Grid container spacing={2} sx={{ mb: 3 }}>
//             {Object.entries(HS_METRICS).map(([key, cfg]) => {
//               const val = hsLatest?.[key];
//               const st = hsStatus(key, val);
//               return (
//                 <Grid item xs={6} sm={4} md={3} key={key}>
//                   <Box sx={hsBadgeSx(cfg.color)}>
//                     <Typography sx={{ color: HT.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, mb: 0.5 }}>{cfg.label}</Typography>
//                     <Typography sx={{ color: cfg.color, fontSize: 24, fontWeight: 800, lineHeight: 1 }}>
//                       {val != null ? hsFmt(val, key === "heartRate" || key === "respiratoryRate" ? 0 : 1) : "—"}
//                     </Typography>
//                     <Typography sx={{ color: HT.muted, fontSize: 10, mt: 0.3 }}>{cfg.unit}</Typography>
//                     {st && (
//                       <Chip label={st} size="small" sx={{ mt: 0.75, height: 18, fontSize: 10, fontWeight: 700, background: HS_SCOL[st] + "22", color: HS_SCOL[st], border: `1px solid ${HS_SCOL[st]}44` }} />
//                     )}
//                   </Box>
//                 </Grid>
//               );
//             })}
//             {/* BP badge */}
//             <Grid item xs={6} sm={4} md={3}>
//               <Box sx={hsBadgeSx(HT.a2)}>
//                 <Typography sx={{ color: HT.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, mb: 0.5 }}>Blood Pressure</Typography>
//                 <Typography sx={{ color: HT.a2, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{hsLatest?.bloodPressure ?? "—"}</Typography>
//                 <Typography sx={{ color: HT.muted, fontSize: 10, mt: 0.3 }}>mmHg</Typography>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Charts */}
//           <Grid container spacing={3} sx={{ mb: 3 }}>
//             {/* Blood Sugar */}
//             <Grid item xs={12} md={6}>
//               <Card sx={hsGlass}>
//                 <CardContent sx={{ p: 3 }}>
//                   <Typography sx={{ color: HT.text, fontWeight: 700, mb: 0.5 }}>Blood Sugar Trend</Typography>
//                   <Typography sx={{ color: HT.muted, fontSize: 12, mb: 2 }}>mg/dL over time</Typography>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <AreaChart data={chartData}>
//                       <defs>
//                         <linearGradient id="hssg" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%"  stopColor={HT.a4} stopOpacity={0.35} />
//                           <stop offset="95%" stopColor={HT.a4} stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke={HT.border} />
//                       <XAxis dataKey="time" tick={{ fill: HT.muted, fontSize: 10 }} />
//                       <YAxis tick={{ fill: HT.muted, fontSize: 10 }} />
//                       <ReTooltip contentStyle={{ background: HT.card, border: `1px solid ${HT.border}`, borderRadius: 8, color: HT.text }} />
//                       <Area type="monotone" dataKey="bloodSugar" stroke={HT.a4} fill="url(#hssg)" strokeWidth={2.5} dot={{ fill: HT.a4, r: 3 }} name="Blood Sugar" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Heart Rate + SpO2 */}
//             <Grid item xs={12} md={6}>
//               <Card sx={hsGlass}>
//                 <CardContent sx={{ p: 3 }}>
//                   <Typography sx={{ color: HT.text, fontWeight: 700, mb: 0.5 }}>Heart Rate & SpO₂</Typography>
//                   <Typography sx={{ color: HT.muted, fontSize: 12, mb: 2 }}>bpm & % over time</Typography>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <LineChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke={HT.border} />
//                       <XAxis dataKey="time" tick={{ fill: HT.muted, fontSize: 10 }} />
//                       <YAxis tick={{ fill: HT.muted, fontSize: 10 }} />
//                       <ReTooltip contentStyle={{ background: HT.card, border: `1px solid ${HT.border}`, borderRadius: 8, color: HT.text }} />
//                       <Legend wrapperStyle={{ color: HT.muted, fontSize: 12 }} />
//                       <Line type="monotone" dataKey="heartRate" stroke={HT.a5} strokeWidth={2.5} dot={{ r: 3 }} name="Heart Rate" />
//                       <Line type="monotone" dataKey="spO2"      stroke={HT.a1} strokeWidth={2.5} dot={{ r: 3 }} name="SpO₂" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Blood Pressure */}
//             <Grid item xs={12} md={6}>
//               <Card sx={hsGlass}>
//                 <CardContent sx={{ p: 3 }}>
//                   <Typography sx={{ color: HT.text, fontWeight: 700, mb: 0.5 }}>Blood Pressure</Typography>
//                   <Typography sx={{ color: HT.muted, fontSize: 12, mb: 2 }}>Systolic / Diastolic mmHg</Typography>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <AreaChart data={bpHistory}>
//                       <defs>
//                         <linearGradient id="hsbp1" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%"  stopColor={HT.a5} stopOpacity={0.3} />
//                           <stop offset="95%" stopColor={HT.a5} stopOpacity={0} />
//                         </linearGradient>
//                         <linearGradient id="hsbp2" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%"  stopColor={HT.a2} stopOpacity={0.3} />
//                           <stop offset="95%" stopColor={HT.a2} stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke={HT.border} />
//                       <XAxis dataKey="time" tick={{ fill: HT.muted, fontSize: 10 }} />
//                       <YAxis tick={{ fill: HT.muted, fontSize: 10 }} />
//                       <ReTooltip contentStyle={{ background: HT.card, border: `1px solid ${HT.border}`, borderRadius: 8, color: HT.text }} />
//                       <Legend wrapperStyle={{ color: HT.muted, fontSize: 12 }} />
//                       <Area type="monotone" dataKey="systolic"  stroke={HT.a5} fill="url(#hsbp1)" strokeWidth={2.5} name="Systolic" />
//                       <Area type="monotone" dataKey="diastolic" stroke={HT.a2} fill="url(#hsbp2)" strokeWidth={2.5} name="Diastolic" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* BMI & Weight */}
//             <Grid item xs={12} md={6}>
//               <Card sx={hsGlass}>
//                 <CardContent sx={{ p: 3 }}>
//                   <Typography sx={{ color: HT.text, fontWeight: 700, mb: 0.5 }}>BMI & Weight</Typography>
//                   <Typography sx={{ color: HT.muted, fontSize: 12, mb: 2 }}>Body metrics over time</Typography>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <LineChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke={HT.border} />
//                       <XAxis dataKey="time" tick={{ fill: HT.muted, fontSize: 10 }} />
//                       <YAxis yAxisId="left"  tick={{ fill: HT.muted, fontSize: 10 }} />
//                       <YAxis yAxisId="right" orientation="right" tick={{ fill: HT.muted, fontSize: 10 }} />
//                       <ReTooltip contentStyle={{ background: HT.card, border: `1px solid ${HT.border}`, borderRadius: 8, color: HT.text }} />
//                       <Legend wrapperStyle={{ color: HT.muted, fontSize: 12 }} />
//                       <Line yAxisId="left"  type="monotone" dataKey="bmi"    stroke={HT.a2}    strokeWidth={2.5} dot={{ r: 3 }} name="BMI" />
//                       <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#a78bfa" strokeWidth={2.5} dot={{ r: 3 }} name="Weight (kg)" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           {/* Radial Gauges */}
//           <Grid container spacing={3} sx={{ mb: 3 }}>
//             {radialData.map(({ label, unit, color, value, raw }) => (
//               <Grid item xs={12} sm={4} key={label}>
//                 <Card sx={hsGlass}>
//                   <CardContent sx={{ p: 3, textAlign: "center" }}>
//                     <Typography sx={{ color: HT.text, fontWeight: 700, mb: 1 }}>{label}</Typography>
//                     <ResponsiveContainer width="100%" height={180}>
//                       <RadialBarChart cx="50%" cy="80%" innerRadius="60%" outerRadius="100%" startAngle={180} endAngle={0} data={[{ value, fill: color }]}>
//                         <PolarGrid radialLines={false} stroke="none" />
//                         <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
//                         <RadialBar background={{ fill: HT.border }} dataKey="value" cornerRadius={8} />
//                       </RadialBarChart>
//                     </ResponsiveContainer>
//                     <Typography sx={{ color, fontSize: 28, fontWeight: 800, mt: -3 }}>{raw != null ? raw : "—"}</Typography>
//                     <Typography sx={{ color: HT.muted, fontSize: 12 }}>{unit}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {/* History Table */}
//           <Card sx={hsGlass}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography sx={{ color: HT.text, fontWeight: 700, mb: 2, fontSize: 18 }}>Reading History</Typography>
//               <Box sx={{ overflowX: "auto" }}>
//                 <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
//                   <Box component="thead">
//                     <Box component="tr">
//                       {["Date", "Sugar", "Temp", "BP", "HR", "SpO₂", "Resp", "BMI", ""].map((h) => (
//                         <Box component="th" key={h} sx={{ p: 1.5, textAlign: "left", color: HT.muted, fontSize: 12, fontWeight: 600, borderBottom: `1px solid ${HT.border}` }}>{h}</Box>
//                       ))}
//                     </Box>
//                   </Box>
//                   <Box component="tbody">
//                     {hsHistory.map((r) => (
//                       <Box component="tr" key={r.id}>
//                         {[
//                           hsFmtDate(r.recordedAt),
//                           r.bloodSugarLevel ? `${r.bloodSugarLevel} mg/dL` : "—",
//                           r.bodyTemperature ? `${r.bodyTemperature}°C` : "—",
//                           r.bloodPressure ?? "—",
//                           r.heartRate ? `${r.heartRate} bpm` : "—",
//                           r.oxygenSaturation ? `${r.oxygenSaturation}%` : "—",
//                           r.respiratoryRate ? `${r.respiratoryRate}/min` : "—",
//                           r.bmi ?? "—",
//                         ].map((cell, i) => (
//                           <Box component="td" key={i} sx={{ p: 1.5, color: HT.text, fontSize: 13, borderBottom: `1px solid ${HT.border}22` }}>{cell}</Box>
//                         ))}
//                         <Box component="td" sx={{ p: 1, borderBottom: `1px solid ${HT.border}22` }}>
//                           <Button size="small" onClick={() => openHsEdit(r)} sx={{ color: HT.a1, textTransform: "none", fontSize: 12, minWidth: 0 }}>Edit</Button>
//                         </Box>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </>
//       )}

//       {/* Log / Edit Dialog */}
//       <Dialog open={hsDialog} onClose={() => setHsDialog(false)} maxWidth="sm" fullWidth
//         PaperProps={{ sx: { background: HT.card, border: `1px solid ${HT.border}`, borderRadius: 3 } }}>
//         <DialogTitle sx={{ color: HT.text, fontWeight: 700, borderBottom: `1px solid ${HT.border}`, pb: 2 }}>
//           {hsEditId ? "Update Health Reading" : "Log New Health Reading"}
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <Grid container spacing={2} sx={{ mt: 0 }}>
//             <Grid item xs={8}>
//               <TextField fullWidth label="Blood Sugar Level (mg/dL)" type="number" sx={hsInputSx}
//                 value={hsForm.bloodSugarLevel} onChange={e => setHsForm({ ...hsForm, bloodSugarLevel: e.target.value })} />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField fullWidth select label="Sugar Type" sx={hsInputSx}
//                 value={hsForm.sugarType} onChange={e => setHsForm({ ...hsForm, sugarType: e.target.value })}>
//                 {["fasting", "post-meal", "random"].map(o => <MenuItem key={o} value={o} sx={{ background: HT.card, color: HT.text }}>{o}</MenuItem>)}
//               </TextField>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Body Temperature (°C)" type="number" sx={hsInputSx}
//                 value={hsForm.bodyTemperature} onChange={e => setHsForm({ ...hsForm, bodyTemperature: e.target.value })} />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Blood Pressure (e.g. 120/80)" placeholder="120/80" sx={hsInputSx}
//                 value={hsForm.bloodPressure} onChange={e => setHsForm({ ...hsForm, bloodPressure: e.target.value })} />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Heart Rate / Pulse (bpm)" type="number" sx={hsInputSx}
//                 value={hsForm.heartRate} onChange={e => setHsForm({ ...hsForm, heartRate: e.target.value })} />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Oxygen Saturation (%)" type="number" sx={hsInputSx}
//                 value={hsForm.oxygenSaturation} onChange={e => setHsForm({ ...hsForm, oxygenSaturation: e.target.value })} />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField fullWidth label="Respiratory Rate (/min)" type="number" sx={hsInputSx}
//                 value={hsForm.respiratoryRate} onChange={e => setHsForm({ ...hsForm, respiratoryRate: e.target.value })} />
//             </Grid>
//             <Grid item xs={12}>
//               <Divider sx={{ borderColor: HT.border, my: 1 }} />
//               <Typography sx={{ color: HT.muted, fontSize: 12, mb: 1.5, textTransform: "uppercase", letterSpacing: 1 }}>Body Metrics</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Height (cm)" type="number" sx={hsInputSx}
//                 value={hsForm.height} onChange={e => setHsForm({ ...hsForm, height: e.target.value })} />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Weight (kg)" type="number" sx={hsInputSx}
//                 value={hsForm.weight} onChange={e => setHsForm({ ...hsForm, weight: e.target.value })} />
//             </Grid>
//             {estBMI && (
//               <Grid item xs={12}>
//                 <Box sx={{ p: 2, borderRadius: 2, background: HT.a2 + "22", border: `1px solid ${HT.a2}44` }}>
//                   <Typography sx={{ color: HT.a2, fontWeight: 700, fontSize: 14 }}>Estimated BMI: {estBMI}</Typography>
//                 </Box>
//               </Grid>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 3, borderTop: `1px solid ${HT.border}` }}>
//           <Button onClick={() => setHsDialog(false)} sx={{ color: HT.muted, textTransform: "none" }}>Cancel</Button>
//           <Button onClick={handleHsSave} disabled={hsSaving}
//             sx={{ background: `linear-gradient(135deg, ${HT.a1}, ${HT.a2})`, color: "#fff", fontWeight: 700, px: 3, borderRadius: 2, textTransform: "none" }}>
//             {hsSaving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : hsEditId ? "Update" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={hsSnack.open} autoHideDuration={3000} onClose={() => setHsSnack({ ...hsSnack, open: false })}>
//         <Alert severity={hsSnack.sev} sx={{ borderRadius: 2 }}>{hsSnack.msg}</Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Payment Modal
// // ─────────────────────────────────────────────────────────────────────────────
// function PaymentModal({ open, onClose, appointment, onPaid }) {
//   const [step,    setStep]    = useState("summary");
//   const [cardNum, setCardNum] = useState("");
//   const [cvv,     setCvv]     = useState("");
//   const [expiry,  setExpiry]  = useState("");
//   const [name,    setName]    = useState("");
//   const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "10px !important", background: "#f8f9ff !important" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" }, "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2563eb !important" } };
//   const handlePay = async () => {
//     setStep("processing");
//     setTimeout(async () => {
//       try {
//         await axios.post(`${BASE}/payments/create-order/${appointment.id}`);
//         const dummyPayId = "pay_dummy_" + Date.now();
//         await axios.post(`${BASE}/payments/confirm/${appointment.id}`, { razorpayPaymentId: dummyPayId });
//         setStep("done");
//         setTimeout(() => { onPaid(appointment.id); onClose(); setStep("summary"); }, 1800);
//       } catch (e) { console.error(e); setStep("summary"); alert("Payment failed. Try again."); }
//     }, 2000);
//   };
//   if (!appointment) return null;
//   const fee = appointment.doctor?.consultationFee || 0;
//   return (
//     <Modal open={open} onClose={() => { if (step !== "processing") { setStep("summary"); onClose(); } }}>
//       <Box className="rzp-modal-box">
//         <Box sx={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)", borderRadius: "14px", p: "18px 22px", mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <Box>
//             <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.5px" }}>razorpay</div>
//             <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: ".74rem", mt: .3 }}>Secure Payment Gateway</Typography>
//           </Box>
//           <Box sx={{ textAlign: "right" }}>
//             <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: ".7rem" }}>Amount to Pay</Typography>
//             <Typography sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, fontFamily: "'Cormorant Garamond',serif" }}>₹{fee}</Typography>
//           </Box>
//         </Box>
//         {step === "summary" && (
//           <>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Payment Details</Typography>
//             <Box sx={{ background: "#f8f9ff", border: "1px solid #e8ecf5", borderRadius: "12px", p: 2, mb: 3 }}>
//               {[["Doctor", `Dr. ${appointment.doctor?.name}`], ["Specialization", appointment.doctor?.specialization], ["Date", appointment.date], ["Time", appointment.timeSlot], ["Consultation Fee", `₹${fee}`]].map(([l, v]) => (
//                 <Box key={l} sx={{ display: "flex", justifyContent: "space-between", mb: .8 }}>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".82rem" }}>{l}</Typography>
//                   <Typography sx={{ color: "#1a1f36", fontWeight: 600, fontSize: ".82rem" }}>{v}</Typography>
//                 </Box>
//               ))}
//               <Divider sx={{ my: 1.5, borderColor: "#e8ecf5" }} />
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Typography sx={{ fontWeight: 700, color: "#1a1f36", fontSize: ".92rem" }}>Total</Typography>
//                 <Typography sx={{ fontWeight: 800, color: "#2563eb", fontSize: "1rem", fontFamily: "'Cormorant Garamond',serif" }}>₹{fee}</Typography>
//               </Box>
//             </Box>
//             <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: 1.5 }}>Card Details</Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//               <TextField size="small" fullWidth placeholder="Card Number" variant="outlined" sx={fieldSx} value={cardNum} onChange={e => setCardNum(e.target.value.replace(/\D/g, "").slice(0, 16))} />
//               <TextField size="small" fullWidth placeholder="Cardholder Name" variant="outlined" sx={fieldSx} value={name} onChange={e => setName(e.target.value)} />
//               <Grid container spacing={1.5}>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="MM/YY" variant="outlined" sx={fieldSx} value={expiry} onChange={e => setExpiry(e.target.value.slice(0, 5))} /></Grid>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="CVV" type="password" variant="outlined" sx={fieldSx} value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} /></Grid>
//               </Grid>
//             </Box>
//             <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
//               <Button onClick={() => onClose()} variant="outlined" fullWidth sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, borderColor: "#e8ecf5", color: "#8892b0" }}>Cancel</Button>
//               <Button onClick={handlePay} variant="contained" fullWidth sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, fontSize: ".92rem", background: "linear-gradient(135deg,#1e3a8a,#2563eb)", boxShadow: "0 4px 14px rgba(37,99,235,.35)" }}>Pay ₹{fee}</Button>
//             </Box>
//           </>
//         )}
//         {step === "processing" && (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress sx={{ color: "#2563eb", mb: 2 }} size={48} />
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, color: "#1a1f36", mb: .5 }}>Processing Payment…</Typography>
//             <Typography sx={{ fontSize: ".82rem", color: "#8892b0" }}>Please do not close this window</Typography>
//             <LinearProgress sx={{ mt: 3, borderRadius: 4, height: 4, background: "#e8ecf5", "& .MuiLinearProgress-bar": { background: "#2563eb" } }} />
//           </Box>
//         )}
//         {step === "done" && (
//           <Box sx={{ textAlign: "center", py: 2 }}>
//             <Box sx={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#34d399)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2, boxShadow: "0 6px 20px rgba(5,150,105,.3)" }}>
//               <CheckCircleIcon sx={{ color: "#fff", fontSize: 34 }} />
//             </Box>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: "#059669", mb: .5 }}>Payment Successful!</Typography>
//             <Typography sx={{ fontSize: ".85rem", color: "#8892b0" }}>₹{fee} paid successfully</Typography>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Feedback Modal
// // ─────────────────────────────────────────────────────────────────────────────
// function FeedbackModal({ open, onClose, appointment, onSubmitted }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [done, setDone] = useState(false);
//   const handleSubmit = async () => {
//     if (!rating) { alert("Please select a rating"); return; }
//     setLoading(true);
//     try {
//       await axios.post(`${BASE}/feedback`, { appointmentId: appointment.id, doctorId: appointment.doctor?.id, patientId: appointment.patient?.id, rating, comment });
//       setDone(true); onSubmitted(appointment.id);
//       setTimeout(() => { setDone(false); setRating(0); setComment(""); onClose(); }, 1500);
//     } catch {
//       setDone(true); onSubmitted(appointment.id);
//       setTimeout(() => { setDone(false); setRating(0); setComment(""); onClose(); }, 1500);
//     } finally { setLoading(false); }
//   };
//   if (!appointment) return null;
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="fb-modal-box">
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1f36" }}>Rate Your Experience</Typography>
//           <IconButton size="small" onClick={onClose} sx={{ background: "#f5f7ff", border: "1px solid #e8ecf5", borderRadius: "9px" }}><CloseIcon sx={{ fontSize: 16 }} /></IconButton>
//         </Box>
//         {done ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>⭐</Typography>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#059669" }}>Thank you for your feedback!</Typography>
//           </Box>
//         ) : (
//           <>
//             <Typography sx={{ fontSize: ".8rem", color: "#8892b0", mb: 2 }}>Dr. {appointment.doctor?.name} · {appointment.date}</Typography>
//             <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//               <Rating size="large" value={rating} onChange={(_, v) => setRating(v)} sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
//             </Box>
//             <TextField fullWidth multiline rows={3} placeholder="Share your experience (optional)…" variant="outlined" value={comment} onChange={e => setComment(e.target.value)}
//               sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "12px !important", background: "#f8f9ff !important" } }} />
//             <Button onClick={handleSubmit} variant="contained" fullWidth disabled={loading}
//               sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700 }}>
//               {loading ? "Submitting…" : "Submit Feedback"}
//             </Button>
//           </>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Upload Record Modal
// // ─────────────────────────────────────────────────────────────────────────────
// function UploadRecordModal({ open, onClose, patientId, onUploaded }) {
//   const [form, setForm] = useState({ title: "", recordType: "LAB_REPORT", recordDate: "", issuedBy: "", description: "" });
//   const [file, setFile] = useState(null);
//   const [dragOver, setDragOver] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const fileRef = useRef();
//   const handleFile = f => { if (!f) return; if (f.size > 10 * 1024 * 1024) { setError("File too large. Max 10 MB."); return; } setError(""); setFile(f); };
//   const handleSubmit = async () => {
//     if (!form.title) { setError("Title is required."); return; }
//     setLoading(true); setError("");
//     try {
//       const fd = new FormData();
//       fd.append("patientId", patientId); fd.append("title", form.title); fd.append("recordType", form.recordType);
//       fd.append("recordDate", form.recordDate); fd.append("issuedBy", form.issuedBy); fd.append("description", form.description);
//       if (file) fd.append("file", file);
//       const res = await axios.post(`${BASE}/medical-records/upload`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       onUploaded(res.data);
//       setForm({ title: "", recordType: "LAB_REPORT", recordDate: "", issuedBy: "", description: "" });
//       setFile(null); onClose();
//     } catch (e) { setError(e?.response?.data || "Upload failed. Try again."); }
//     finally { setLoading(false); }
//   };
//   const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px !important", background: "#f8f9ff !important" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4f6ef7 !important" } };
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="upload-modal-box">
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: "#1a1f36" }}>Add Medical Record</Typography>
//           <IconButton size="small" onClick={onClose} sx={{ background: "#f5f7ff", border: "1px solid #e8ecf5", borderRadius: "9px" }}><CloseIcon sx={{ fontSize: 16 }} /></IconButton>
//         </Box>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Title *</Typography>
//             <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Blood Test Report — Jan 2025" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} sx={fieldSx} /></Box>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Record Type</Typography>
//               <Select fullWidth size="small" value={form.recordType} onChange={e => setForm({ ...form, recordType: e.target.value })} sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" }, "& .MuiSelect-select": { borderRadius: "12px", background: "#f8f9ff" } }}>
//                 {RECORD_TYPES.map(t => <MenuItem key={t} value={t}>{t.replace("_", " ")}</MenuItem>)}
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Date</Typography>
//               <TextField fullWidth size="small" type="date" variant="outlined" value={form.recordDate} onChange={e => setForm({ ...form, recordDate: e.target.value })} sx={fieldSx} />
//             </Grid>
//           </Grid>
//           <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Issued By</Typography>
//             <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Dr. Ramesh Kumar" value={form.issuedBy} onChange={e => setForm({ ...form, issuedBy: e.target.value })} sx={fieldSx} /></Box>
//           <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Notes</Typography>
//             <TextField fullWidth size="small" multiline rows={2} variant="outlined" placeholder="Optional notes" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} sx={fieldSx} /></Box>
//           <Box>
//             <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Attach File (PDF/Image — max 10 MB)</Typography>
//             <div className={`drop-zone ${dragOver ? "dragover" : ""}`} onClick={() => fileRef.current?.click()} onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}>
//               <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={e => handleFile(e.target.files[0])} />
//               <UploadFileIcon sx={{ fontSize: 32, color: "#c0c8e0", mb: 1 }} />
//               {file ? <Typography sx={{ fontSize: ".85rem", fontWeight: 600, color: "#4f6ef7" }}>{file.name}</Typography>
//                     : <Typography sx={{ fontSize: ".82rem", color: "#8892b0" }}>Click or drag & drop your file here</Typography>}
//             </div>
//           </Box>
//           {error && <Box sx={{ background: "#fff1f3", border: "1px solid rgba(225,29,72,.2)", borderRadius: "10px", padding: "10px 14px", fontSize: ".83rem", color: "#e11d48", fontWeight: 500 }}>⚠ {error}</Box>}
//           {loading && <LinearProgress sx={{ borderRadius: 4, height: 4 }} />}
//           <Button onClick={handleSubmit} variant="contained" disabled={loading}
//             sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700, fontSize: ".92rem", py: 1.4, boxShadow: "0 4px 14px rgba(79,110,247,.28)" }}>
//             {loading ? "Uploading…" : "Save Record"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Record Card
// // ─────────────────────────────────────────────────────────────────────────────
// function RecordCard({ record, onDelete }) {
//   const [showPreview, setShowPreview] = useState(false);
//   const sc = RECORD_COLORS[record.recordType] || RECORD_COLORS.OTHER;
//   const fileUrl = record.fileName ? `${BASE}/medical-records/file/${record.fileName}` : null;
//   const lower = (record.fileName || "").toLowerCase();
//   const isPdf = lower.endsWith(".pdf");
//   const isImage = lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp");
//   return (
//     <div className="record-card">
//       <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
//         <Box sx={{ width: 46, height: 46, borderRadius: "13px", flexShrink: 0, background: sc.bg, border: `1px solid ${sc.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <DescriptionIcon sx={{ color: sc.color, fontSize: 22 }} />
//         </Box>
//         <Box sx={{ flex: 1, minWidth: 0 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: .5 }}>
//             <Typography sx={{ fontWeight: 700, fontSize: ".92rem", color: "#1a1f36" }}>{record.title}</Typography>
//             <Chip label={record.recordType?.replace("_", " ")} size="small" sx={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontWeight: 600, fontSize: ".68rem", height: 22 }} />
//           </Box>
//           {record.issuedBy && <Typography sx={{ fontSize: ".78rem", color: "#8892b0", mb: .4 }}>👤 {record.issuedBy}</Typography>}
//           {record.recordDate && <Typography sx={{ fontSize: ".78rem", color: "#8892b0", mb: .4 }}>📅 {record.recordDate}</Typography>}
//           {record.description && <Typography sx={{ fontSize: ".8rem", color: "#4a5278", mt: .5 }}>{record.description}</Typography>}
//           {fileUrl && (
//             <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
//               {(isPdf || isImage) && (
//                 <button onClick={() => setShowPreview(p => !p)} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: ".76rem", fontWeight: 600, background: "linear-gradient(135deg,#4f6ef7,#818cf8)", color: "#fff", border: "none", fontFamily: "'Outfit',sans-serif" }}>
//                   {showPreview ? <><VisibilityOffIcon sx={{ fontSize: 13 }} /> Hide</> : <><VisibilityIcon sx={{ fontSize: 13 }} /> Preview</>}
//                 </button>
//               )}
//               <a href={fileUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, fontSize: ".76rem", fontWeight: 600, textDecoration: "none", background: "#eef1fe", color: "#4f6ef7", border: "1px solid rgba(79,110,247,.2)" }}><OpenInNewIcon sx={{ fontSize: 13 }} /> Open</a>
//               <a href={fileUrl} download={record.fileName} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, fontSize: ".76rem", fontWeight: 600, textDecoration: "none", background: "#f5f7ff", color: "#4a5278", border: "1px solid #e8ecf5" }}><DownloadIcon sx={{ fontSize: 13 }} /> Download</a>
//             </Box>
//           )}
//           {showPreview && fileUrl && (
//             <div className="file-preview-wrap">
//               {isPdf && <iframe src={fileUrl} title={record.title} />}
//               {isImage && <img src={fileUrl} alt={record.title} />}
//             </div>
//           )}
//         </Box>
//         <IconButton size="small" onClick={() => onDelete(record.id)} sx={{ color: "#e11d48", background: "#fff1f3", borderRadius: "9px", flexShrink: 0, "&:hover": { background: "#fce7f3" } }}>
//           <DeleteIcon sx={{ fontSize: 17 }} />
//         </IconButton>
//       </Box>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Book Appointment Inline
// // ─────────────────────────────────────────────────────────────────────────────
// function BookAppointmentInline({ patient, doctors }) {
//   const [searchQuery,  setSearchQuery]  = useState("");
//   const [activeSpec,   setActiveSpec]   = useState("All");
//   const [bookingDocId, setBookingDocId] = useState(null);
//   const [bookForm,     setBookForm]     = useState({ date: "", timeSlot: "", description: "" });
//   const [bookFile,     setBookFile]     = useState(null);
//   const [bookLoading,  setBookLoading]  = useState(false);
//   const [bookSuccess,  setBookSuccess]  = useState(false);
//   const fileRef = useRef();
//   const specializations = ["All", ...Array.from(new Set(doctors.map(d => d.specialization).filter(Boolean))).sort()];
//   const filteredDoctors = doctors.filter(doc => {
//     const bySpec = activeSpec === "All" || doc.specialization === activeSpec;
//     const q = searchQuery.toLowerCase();
//     const bySearch = !q || doc.name?.toLowerCase().includes(q) || doc.specialization?.toLowerCase().includes(q) || doc.hospital?.toLowerCase().includes(q);
//     return bySpec && bySearch;
//   });
//   const selectedDoc = doctors.find(d => d.id === bookingDocId);
//   const handleBook = async () => {
//     if (!bookForm.date || !bookForm.timeSlot) { alert("Please select date and time slot."); return; }
//     setBookLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("patientId", patient.id); fd.append("doctorId", bookingDocId);
//       fd.append("date", bookForm.date); fd.append("timeSlot", bookForm.timeSlot);
//       fd.append("description", bookForm.description);
//       if (bookFile) fd.append("report", bookFile);
//       await axios.post(`${BASE}/appointments/book`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       setBookSuccess(true); setBookForm({ date: "", timeSlot: "", description: "" }); setBookFile(null); setBookingDocId(null);
//       setTimeout(() => setBookSuccess(false), 3000);
//     } catch { alert("Booking failed. Please try again."); }
//     finally { setBookLoading(false); }
//   };
//   if (bookingDocId && selectedDoc) {
//     const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px !important", background: "#f8f9ff !important" } };
//     return (
//       <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}>
//         <Box sx={{ mb: 3 }}><Button size="small" onClick={() => setBookingDocId(null)} sx={{ color: "#4f6ef7", textTransform: "none", fontWeight: 600, fontSize: ".82rem", p: 0 }}>← Back to Doctors</Button></Box>
//         <Card className="light-card" sx={{ p: 4, maxWidth: 560 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
//             <Avatar className="av-blue" sx={{ width: 56, height: 56, borderRadius: "16px", fontSize: "1.4rem", fontFamily: "'Cormorant Garamond',serif", fontWeight: 700 }}>{selectedDoc.name?.charAt(0)}</Avatar>
//             <Box>
//               <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, color: "#1a1f36" }}>Dr. {selectedDoc.name}</Typography>
//               <Typography sx={{ fontSize: ".8rem", color: "#8892b0" }}>{selectedDoc.specialization} · {selectedDoc.hospital}</Typography>
//               {selectedDoc.consultationFee > 0 && <Chip label={`₹${selectedDoc.consultationFee} consultation fee`} size="small" sx={{ mt: .5, background: "#fffbeb", color: "#d97706", border: "1px solid #fcd34d", fontWeight: 600, fontSize: ".72rem" }} />}
//             </Box>
//           </Box>
//           <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />
//           {bookSuccess && (
//             <Box sx={{ background: "#ecfdf5", border: "1px solid rgba(5,150,105,.2)", borderRadius: "12px", p: 2, mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
//               <CheckCircleIcon sx={{ color: "#059669", fontSize: 22 }} />
//               <Box><Typography sx={{ fontWeight: 700, color: "#059669", fontSize: ".9rem" }}>Appointment Booked!</Typography><Typography sx={{ fontSize: ".78rem", color: "#065f46" }}>Your request has been sent to the doctor.</Typography></Box>
//             </Box>
//           )}
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Preferred Date *</Typography>
//               <TextField fullWidth size="small" type="date" variant="outlined" value={bookForm.date} onChange={e => setBookForm({ ...bookForm, date: e.target.value })} sx={fieldSx} /></Box>
//             <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Time Slot *</Typography>
//               <Select fullWidth size="small" value={bookForm.timeSlot} onChange={e => setBookForm({ ...bookForm, timeSlot: e.target.value })} sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" }, "& .MuiSelect-select": { borderRadius: "12px", background: "#f8f9ff" } }}>
//                 <MenuItem value="">Select time</MenuItem>
//                 {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
//               </Select></Box>
//             <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Symptoms / Description</Typography>
//               <TextField fullWidth size="small" multiline rows={3} variant="outlined" placeholder="Describe your symptoms…" value={bookForm.description} onChange={e => setBookForm({ ...bookForm, description: e.target.value })} sx={fieldSx} /></Box>
//             <Box>
//               <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Attach Report (optional)</Typography>
//               <Box sx={{ border: "2px dashed #c7cee8", borderRadius: "12px", p: 2.5, textAlign: "center", cursor: "pointer", background: "#f8f9ff" }} onClick={() => fileRef.current?.click()}>
//                 <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={e => setBookFile(e.target.files[0])} />
//                 <UploadFileIcon sx={{ fontSize: 26, color: "#c0c8e0", mb: .5 }} />
//                 {bookFile ? <Typography sx={{ fontSize: ".82rem", fontWeight: 600, color: "#4f6ef7" }}>{bookFile.name}</Typography>
//                           : <Typography sx={{ fontSize: ".8rem", color: "#8892b0" }}>Click to attach a report</Typography>}
//               </Box>
//             </Box>
//             <Button onClick={handleBook} variant="contained" disabled={bookLoading}
//               sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700, fontSize: ".92rem", py: 1.4, boxShadow: "0 4px 14px rgba(79,110,247,.28)" }}>
//               {bookLoading ? "Booking…" : "Confirm Appointment →"}
//             </Button>
//           </Box>
//         </Card>
//       </motion.div>
//     );
//   }
//   return (
//     <>
//       <TextField fullWidth size="small" placeholder="Search doctor name, specialization, hospital…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
//         InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#b0b8d0", fontSize: 20 }} /></InputAdornment> }}
//         sx={{ mb: 2.5, "& .MuiOutlinedInput-root": { borderRadius: "14px", background: "#fff", "& fieldset": { borderColor: "#e8ecf5" }, "&:hover fieldset": { borderColor: "#c7cee8" }, "&.Mui-focused fieldset": { borderColor: "#4f6ef7" } } }} />
//       <Box sx={{ mb: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}><FilterListIcon sx={{ fontSize: 16, color: "#8892b0" }} /><Typography sx={{ fontSize: ".72rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600 }}>Filter by Specialization</Typography></Box>
//         <div className="spec-chip-wrap">{specializations.map(spec => <div key={spec} className={`spec-chip ${activeSpec === spec ? "active" : ""}`} onClick={() => setActiveSpec(spec)}>{spec}</div>)}</div>
//       </Box>
//       <Box sx={{ mb: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Typography sx={{ fontSize: ".8rem", color: "#8892b0" }}>{filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} found</Typography>
//         {(searchQuery || activeSpec !== "All") && <Typography sx={{ fontSize: ".78rem", color: "#4f6ef7", fontWeight: 600, cursor: "pointer" }} onClick={() => { setSearchQuery(""); setActiveSpec("All"); }}>Clear filters ✕</Typography>}
//       </Box>
//       {filteredDoctors.length === 0 ? (
//         <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}><Typography sx={{ fontSize: "2.5rem", mb: 1 }}>🔍</Typography><Typography sx={{ fontWeight: 500 }}>No doctors found.</Typography></Box>
//       ) : (
//         <Grid container spacing={2.5}>
//           {filteredDoctors.map((doc, i) => (
//             <Grid item xs={12} sm={6} md={4} key={doc.id}>
//               <motion.div whileHover={{ scale: 1.03 }}>
//                 <Card className="light-card" sx={{ p: 3 }}>
//                   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
//                     <Avatar className={getAvatarClass(i)} sx={{ width: 68, height: 68, borderRadius: "20px", mb: 1.5, fontSize: "1.8rem", fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, boxShadow: "0 6px 20px rgba(79,110,247,.22)" }}>{doc.name?.charAt(0)}</Avatar>
//                     <Typography sx={{ fontWeight: 700, fontSize: ".95rem", color: "#1a1f36" }}>Dr. {doc.name}</Typography>
//                     <Chip label={doc.specialization || "General"} size="small" sx={{ mt: .75, mb: .5, background: "#eef1fe", color: "#4f6ef7", border: "1px solid rgba(79,110,247,.18)", fontWeight: 600, fontSize: ".72rem" }} />
//                     {doc.qualification && <Typography sx={{ fontSize: ".76rem", color: "#8892b0", mb: .3 }}>{doc.qualification}</Typography>}
//                     {doc.experience > 0 && <Typography sx={{ fontSize: ".76rem", color: "#8892b0", mb: .3 }}>🏅 {doc.experience} yrs experience</Typography>}
//                     {doc.hospital && <Typography sx={{ fontSize: ".76rem", color: "#8892b0", mb: .5 }}>🏥 {doc.hospital}</Typography>}
//                     {doc.consultationFee > 0 && (
//                       <Box sx={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "10px", px: 1.5, py: .75, mb: 2, display: "flex", alignItems: "center", gap: .75 }}>
//                         <CurrencyRupeeIcon sx={{ fontSize: 14, color: "#d97706" }} />
//                         <Typography sx={{ fontSize: ".8rem", fontWeight: 700, color: "#d97706" }}>₹{doc.consultationFee}</Typography>
//                       </Box>
//                     )}
//                     <Button variant="contained" onClick={() => setBookingDocId(doc.id)}
//                       sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: ".85rem", boxShadow: "0 3px 12px rgba(79,110,247,.28)", "&:hover": { boxShadow: "0 6px 20px rgba(79,110,247,.38)" } }}>
//                       Book Now →
//                     </Button>
//                   </Box>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Main Dashboard
// // ─────────────────────────────────────────────────────────────────────────────
// export default function PatientDashboard() {
//   const { user }  = useContext(AuthContext);
//   const userId    = user?.id || localStorage.getItem("userId");
//   const navigate  = useNavigate();

//   const [patient,          setPatient]          = useState(null);
//   const [appointments,     setAppointments]     = useState([]);
//   const [doctors,          setDoctors]          = useState([]);
//   const [medicalRecords,   setMedicalRecords]   = useState([]);
//   const [prescriptions,    setPrescriptions]    = useState([]);
//   const [payments,         setPayments]         = useState({});
//   const [feedbackDone,     setFeedbackDone]     = useState({});
//   const [view,             setView]             = useState("dashboard");
//   const [sidebarOpen,      setSidebarOpen]      = useState(false);
//   const [loading,          setLoading]          = useState(true);
//   const [profileMissing,   setProfileMissing]   = useState(false);
//   const [error,            setError]            = useState("");
//   const [uploadOpen,       setUploadOpen]       = useState(false);
//   const [recordTypeFilter, setRecordTypeFilter] = useState("ALL");
//   const [payAppt,          setPayAppt]          = useState(null);
//   const [fbAppt,           setFbAppt]           = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const patRes = await axios.get(`${BASE}/patient/user/${userId}`);
//         setPatient(patRes.data);
//       } catch (err) {
//         if (err.response?.status === 404) { setProfileMissing(true); setLoading(false); return; }
//         setError("Failed to load patient."); setLoading(false); return;
//       }
//       try { const dRes = await axios.get(`${BASE}/doctor`); setDoctors(dRes.data); } catch {}
//       setLoading(false);
//     };
//     if (userId) load(); else { setError("User ID missing."); setLoading(false); }
//   }, [userId]);

//   useEffect(() => {
//     if (!patient) return;
//     axios.get(`${BASE}/appointments/patient/${patient.id}`).then(r => setAppointments(r.data)).catch(() => {});
//     axios.get(`${BASE}/medical-records/patient/${patient.id}`).then(r => setMedicalRecords(r.data)).catch(() => {});
//     axios.get(`${BASE}/prescriptions/patient/${patient.id}`).then(r => setPrescriptions(r.data)).catch(() => {});
//     axios.get(`${BASE}/payments/patient/${patient.id}`).then(r => {
//       const map = {}; r.data.forEach(p => { map[p.appointment?.id] = p; }); setPayments(map);
//     }).catch(() => {});
//   }, [patient]);

//   const handleLogout   = () => { localStorage.removeItem("user"); navigate("/"); };
//   const handleNavClick = (k) => { setView(k); setSidebarOpen(false); };
//   const countStatus    = (s) => appointments.filter(a => a.status === s).length;
//   const filteredRecords = recordTypeFilter === "ALL" ? medicalRecords : medicalRecords.filter(r => r.recordType === recordTypeFilter);

//   const handleDeleteRecord = async (id) => {
//     if (!window.confirm("Delete this medical record?")) return;
//     try { await axios.delete(`${BASE}/medical-records/${id}`); setMedicalRecords(prev => prev.filter(r => r.id !== id)); }
//     catch { alert("Failed to delete record"); }
//   };

//   const handlePaymentDone  = (appointmentId) => setPayments(prev => ({ ...prev, [appointmentId]: { status: "SUCCESS" } }));
//   const handleFeedbackDone = (appointmentId) => setFeedbackDone(prev => ({ ...prev, [appointmentId]: true }));
//   const unpaidCount = appointments.filter(a => a.status === "APPROVED" && payments[a.id]?.status !== "SUCCESS").length;

//   const menuItems = [
//     { key: "dashboard",     label: "Dashboard",        icon: <DashboardIcon     sx={{ fontSize: 18 }} /> },
//     { key: "appointments",  label: "My Appointments",  icon: <EventIcon         sx={{ fontSize: 18 }} />, badge: unpaidCount },
//     { key: "book",          label: "Book Appointment", icon: <AddIcon           sx={{ fontSize: 18 }} /> },
//     { key: "records",       label: "Medical Records",  icon: <FolderIcon        sx={{ fontSize: 18 }} /> },
//     { key: "prescriptions", label: "Prescriptions",    icon: <LocalPharmacyIcon sx={{ fontSize: 18 }} /> },
//     { key: "healthstatus",  label: "Health Status",    icon: <MonitorHeartIcon  sx={{ fontSize: 18 }} /> },
//     { key: "health",        label: "Health Stats",     icon: <BarChartIcon      sx={{ fontSize: 18 }} /> },
//     { key: "profile",       label: "Profile",          icon: <PersonIcon        sx={{ fontSize: 18 }} /> },
//   ];

//   if (loading) return (<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f5f7ff" }}><CircularProgress sx={{ color: "#4f6ef7" }} /></Box>);
//   if (error)   return (<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f5f7ff" }}><Alert severity="error">{error}</Alert></Box>);
//   if (profileMissing || !patient) return (
//     <PatientProfileForm userId={userId} onCreated={created => { setPatient(created); setProfileMissing(false); axios.get(`${BASE}/doctor`).then(r => setDoctors(r.data)).catch(() => {}); }} />
//   );

//   return (
//     <Box sx={{ minHeight: "100vh", background: "#f5f7ff", fontFamily: "'Outfit',sans-serif" }}>
//       <div className="blob blob-1" /><div className="blob blob-2" />
//       {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

//       {/* Sidebar */}
//       <div className={`portal-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-top-row">
//           <div className="sidebar-logo"><div className="logo-icon">✦</div>Med<span className="logo-accent">Vault</span></div>
//           <div className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}><CloseIcon sx={{ fontSize: 16 }} /></div>
//         </div>
//         <div className="nav-section-label">Navigation</div>
//         {menuItems.map(item => (
//           <NavItem key={item.key} icon={item.icon} label={item.label} active={view === item.key} onClick={() => handleNavClick(item.key)} badge={item.badge || 0} />
//         ))}
//         <div className="sidebar-spacer" />
//         <div className="user-card">
//           <div className="user-mini-av">{patient.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{ fontSize: ".85rem", fontWeight: 600, color: "#1a1f36", lineHeight: 1.2 }}>{patient.name}</Typography>
//             <Typography sx={{ fontSize: ".72rem", color: "#8892b0" }}>Patient</Typography>
//           </Box>
//         </div>
//         <button onClick={handleLogout}
//           style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 11, cursor: "pointer", fontSize: ".875rem", fontWeight: 500, color: "#e11d48", border: "1px solid transparent", background: "none", width: "100%", fontFamily: "'Outfit',sans-serif", transition: "all .18s" }}
//           onMouseEnter={e => { e.currentTarget.style.background = "#fff1f3"; e.currentTarget.style.borderColor = "rgba(225,29,72,.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}>
//           <div className="nav-icon-wrap" style={{ background: "#fff1f3", color: "#e11d48" }}><LogoutIcon sx={{ fontSize: 16 }} /></div>
//           Sign Out
//         </button>
//       </div>

//       {/* Top bar */}
//       <div className="portal-topbar">
//         <div className="topbar-left">
//           <div className="hamburger-btn" onClick={() => setSidebarOpen(true)}><MenuIcon sx={{ fontSize: 20 }} /></div>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "1.3rem", color: "#4f6ef7" }}>
//             Med<span style={{ color: "#7c3aed" }}>Vault</span>
//           </Typography>
//         </div>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           {unpaidCount > 0 && (
//             <Box onClick={() => handleNavClick("appointments")} sx={{ display: "flex", alignItems: "center", gap: .75, cursor: "pointer", background: "#fff7ed", border: "1px solid #fcd34d", borderRadius: "10px", px: 1.5, py: .75 }}>
//               <NotificationsIcon sx={{ fontSize: 16, color: "#d97706" }} />
//               <Typography sx={{ fontSize: ".75rem", fontWeight: 600, color: "#d97706" }}>{unpaidCount} fee pending</Typography>
//             </Box>
//           )}
//           <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
//             sx={{ color: "#e11d48", borderColor: "rgba(225,29,72,.3)", textTransform: "none", borderRadius: 2, border: "1px solid", fontFamily: "'Outfit',sans-serif" }}>
//             Logout
//           </Button>
//         </Box>
//       </div>

//       {/* Content */}
//       <Box sx={{ p: { xs: 2, md: "36px 44px" }, position: "relative", zIndex: 1 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

//             {/* DASHBOARD */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Good morning, {patient.name?.split(" ")[0]} ☀️</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>Here's a summary of your health portal</Typography>
//                 </Box>
//                 {appointments.filter(a => a.status === "APPROVED" && payments[a.id]?.status !== "SUCCESS").map(appt => (
//                   <Box key={appt.id} className="pay-banner" sx={{ mb: 2 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                       <Box sx={{ width: 38, height: 38, borderRadius: "11px", background: "linear-gradient(135deg,#f59e0b,#fbbf24)", display: "flex", alignItems: "center", justifyContent: "center" }}><NotificationsIcon sx={{ color: "#fff", fontSize: 20 }} /></Box>
//                       <Box>
//                         <Typography sx={{ fontWeight: 600, fontSize: ".88rem", color: "#92400e" }}>Appointment Confirmed — Fee Pending</Typography>
//                         <Typography sx={{ fontSize: ".78rem", color: "#a16207" }}>Dr. {appt.doctor?.name} · {appt.date} · ₹{appt.doctor?.consultationFee}</Typography>
//                       </Box>
//                     </Box>
//                     <Button onClick={() => setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{ fontSize: 16 }} />}
//                       sx={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", borderRadius: "10px", textTransform: "none", fontWeight: 700, boxShadow: "0 3px 10px rgba(245,158,11,.35)", whiteSpace: "nowrap" }}>
//                       Pay ₹{appt.doctor?.consultationFee}
//                     </Button>
//                   </Box>
//                 ))}
//                 <Box className="hero-card" sx={{ mb: 4, display: "flex", alignItems: "center", gap: 3 }}>
//                   <Avatar className="av-blue" sx={{ width: 80, height: 80, borderRadius: "22px", fontSize: "2rem", fontFamily: "'Cormorant Garamond',serif", boxShadow: "0 8px 24px rgba(79,110,247,.3)" }}>{patient.name?.charAt(0)}</Avatar>
//                   <Box>
//                     <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: "#1a1f36" }}>{patient.name}</Typography>
//                     <Typography sx={{ color: "#8892b0", fontSize: ".82rem", mt: .5 }}>Patient ID · #{patient.id}</Typography>
//                     <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
//                       {[patient.gender, `Age ${patient.age}`, patient.contact].filter(Boolean).map((v, i) => (
//                         <Chip key={i} label={v} size="small" sx={{ background: "#eef1fe", color: "#4f6ef7", border: "1px solid rgba(79,110,247,.18)", fontWeight: 500, fontSize: ".75rem" }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </Box>
//                 <Grid container spacing={2.5} sx={{ mb: 4 }}>
//                   <Grid item xs={6} sm={3}><StatCard label="Appointments"    value={appointments.length}     icon="📅" color="#4f6ef7" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Approved"        value={countStatus("APPROVED")} icon="✓"  color="#059669" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Prescriptions"   value={prescriptions.length}    icon="💊" color="#7c3aed" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Medical Records" value={medicalRecords.length}   icon="📋" color="#0891b2" /></Grid>
//                 </Grid>
//                 <div className="sec-heading">Recent Appointments</div>
//                 <Grid container spacing={2.5}>
//                   {appointments.slice(0, 3).map((appt, i) => (
//                     <Grid item xs={12} md={4} key={appt.id}>
//                       <motion.div whileHover={{ scale: 1.03 }}>
//                         <Card className="light-card">
//                           <CardContent sx={{ p: "20px !important" }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//                               <Avatar className={getAvatarClass(i)} sx={{ width: 44, height: 44, borderRadius: "12px", fontSize: "1rem", fontWeight: 700 }}>{appt.doctor?.name?.charAt(0)}</Avatar>
//                               <Box>
//                                 <Typography sx={{ fontWeight: 600, fontSize: ".92rem", color: "#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
//                                 <Typography sx={{ fontSize: ".76rem", color: "#8892b0" }}>{appt.doctor?.specialization}</Typography>
//                               </Box>
//                             </Box>
//                             <Typography sx={{ fontSize: ".82rem", color: "#4a5278", mb: 1 }}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
//                             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: .75 }}>
//                               <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight: 600, fontSize: ".72rem" }} />
//                               {appt.status === "APPROVED" && payments[appt.id]?.status !== "SUCCESS" && (
//                                 <Chip label={`₹${appt.doctor?.consultationFee} pending`} size="small" onClick={() => setPayAppt(appt)}
//                                   sx={{ background: "#fff7ed", color: "#d97706", border: "1px solid #fcd34d", fontWeight: 600, fontSize: ".68rem", cursor: "pointer" }} />
//                               )}
//                               {payments[appt.id]?.status === "SUCCESS" && (
//                                 <Chip label="Paid ✓" size="small" sx={{ background: "#ecfdf5", color: "#059669", border: "1px solid rgba(5,150,105,.2)", fontWeight: 600, fontSize: ".68rem" }} />
//                               )}
//                             </Box>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     </Grid>
//                   ))}
//                   {appointments.length === 0 && (
//                     <Grid item xs={12}>
//                       <Box sx={{ textAlign: "center", py: 5, color: "#8892b0" }}>
//                         <Typography sx={{ fontSize: "2rem", mb: 1 }}>📅</Typography>
//                         <Typography sx={{ fontWeight: 500 }}>No appointments yet.</Typography>
//                         <Button onClick={() => setView("book")} size="small" variant="contained" sx={{ mt: 2, background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "10px", textTransform: "none", fontWeight: 600 }}>Book your first appointment →</Button>
//                       </Box>
//                     </Grid>
//                   )}
//                 </Grid>
//               </>
//             )}

//             {/* MY APPOINTMENTS */}
//             {view === "appointments" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>My Appointments</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>{appointments.length} total · {countStatus("APPROVED")} approved</Typography>
//                 </Box>
//                 {appointments.filter(a => a.status === "APPROVED" && payments[a.id]?.status !== "SUCCESS").map(appt => (
//                   <Box key={appt.id} className="pay-banner">
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                       <CurrencyRupeeIcon sx={{ color: "#d97706", fontSize: 20, flexShrink: 0 }} />
//                       <Box>
//                         <Typography sx={{ fontWeight: 600, fontSize: ".85rem", color: "#92400e" }}>Consultation fee pending for Dr. {appt.doctor?.name}</Typography>
//                         <Typography sx={{ fontSize: ".76rem", color: "#a16207" }}>{appt.date} · {appt.timeSlot} · ₹{appt.doctor?.consultationFee}</Typography>
//                       </Box>
//                     </Box>
//                     <Button onClick={() => setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{ fontSize: 16 }} />}
//                       sx={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", borderRadius: "10px", textTransform: "none", fontWeight: 700, boxShadow: "0 3px 10px rgba(245,158,11,.35)", whiteSpace: "nowrap" }}>
//                       Pay ₹{appt.doctor?.consultationFee}
//                     </Button>
//                   </Box>
//                 ))}
//                 {appointments.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>📅</Typography>
//                     <Typography sx={{ fontWeight: 500 }}>No appointments yet.</Typography>
//                     <Button onClick={() => setView("book")} size="small" variant="contained" sx={{ mt: 2, background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "10px", textTransform: "none", fontWeight: 600 }}>Book an appointment →</Button>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {appointments.map((appt, i) => {
//                       const isPaid = payments[appt.id]?.status === "SUCCESS";
//                       const hasFeedback = feedbackDone[appt.id];
//                       return (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{ scale: 1.02 }}>
//                             <Card className="light-card">
//                               <CardContent sx={{ p: "24px !important" }}>
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//                                   <Avatar className={getAvatarClass(i)} sx={{ width: 48, height: 48, borderRadius: "14px", fontSize: "1.1rem", fontWeight: 700 }}>{appt.doctor?.name?.charAt(0)}</Avatar>
//                                   <Box sx={{ flex: 1 }}>
//                                     <Typography sx={{ fontWeight: 600, fontSize: ".95rem", color: "#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
//                                     <Typography sx={{ fontSize: ".76rem", color: "#8892b0" }}>{appt.doctor?.specialization}</Typography>
//                                   </Box>
//                                   <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight: 600, fontSize: ".7rem" }} />
//                                 </Box>
//                                 <Divider sx={{ mb: 1.5, borderColor: "#f0f2f8" }} />
//                                 <Typography sx={{ fontSize: ".82rem", color: "#4a5278", mb: .5 }}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
//                                 <Typography sx={{ fontSize: ".8rem", color: "#8892b0", mb: 1.5 }} noWrap>📝 {appt.description || "No description"}</Typography>
//                                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                                   {appt.status === "APPROVED" && !isPaid && (
//                                     <Button onClick={() => setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{ fontSize: 15 }} />}
//                                       sx={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", borderRadius: "9px", textTransform: "none", fontWeight: 700, boxShadow: "0 2px 8px rgba(245,158,11,.3)" }}>
//                                       Pay Consultation Fee ₹{appt.doctor?.consultationFee}
//                                     </Button>
//                                   )}
//                                   {isPaid && <Chip label="✓ Payment Confirmed" size="small" sx={{ background: "#ecfdf5", color: "#059669", border: "1px solid rgba(5,150,105,.2)", fontWeight: 600, alignSelf: "flex-start" }} />}
//                                   {appt.status === "APPROVED" && isPaid && !hasFeedback && (
//                                     <Button onClick={() => setFbAppt(appt)} size="small" variant="outlined" startIcon={<StarIcon sx={{ fontSize: 14 }} />}
//                                       sx={{ borderRadius: "9px", textTransform: "none", fontWeight: 600, fontSize: ".78rem", borderColor: "rgba(245,158,11,.4)", color: "#d97706", "&:hover": { background: "#fffbeb" } }}>
//                                       Rate this appointment
//                                     </Button>
//                                   )}
//                                   {hasFeedback && <Typography sx={{ fontSize: ".75rem", color: "#059669", fontWeight: 600, textAlign: "center" }}>⭐ Feedback submitted — Thank you!</Typography>}
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

//             {/* BOOK */}
//             {view === "book" && (
//               <>
//                 <Box sx={{ mb: 3 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Book Appointment</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>Find a doctor and book your appointment directly</Typography>
//                 </Box>
//                 <BookAppointmentInline patient={patient} doctors={doctors} />
//               </>
//             )}

//             {/* MEDICAL RECORDS */}
//             {view === "records" && (
//               <>
//                 <Box sx={{ mb: 4, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
//                   <Box>
//                     <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Medical Records</Typography>
//                     <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>{medicalRecords.length} record{medicalRecords.length !== 1 ? "s" : ""} stored securely</Typography>
//                   </Box>
//                   <Button variant="contained" startIcon={<UploadFileIcon />} onClick={() => setUploadOpen(true)}
//                     sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700, fontSize: ".88rem", boxShadow: "0 4px 14px rgba(79,110,247,.28)" }}>
//                     Add Record
//                   </Button>
//                 </Box>
//                 <Box sx={{ mb: 3 }}>
//                   <div className="spec-chip-wrap">
//                     {["ALL", ...RECORD_TYPES].map(t => (
//                       <div key={t} className={`spec-chip ${recordTypeFilter === t ? "active" : ""}`} onClick={() => setRecordTypeFilter(t)}>{t === "ALL" ? "All" : t.replace("_", " ")}</div>
//                     ))}
//                   </div>
//                 </Box>
//                 {filteredRecords.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>📋</Typography>
//                     <Typography sx={{ fontWeight: 500 }}>{medicalRecords.length === 0 ? "No medical records yet." : "No records match this filter."}</Typography>
//                     {medicalRecords.length === 0 && <Button onClick={() => setUploadOpen(true)} size="small" variant="contained" sx={{ mt: 2, background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "10px", textTransform: "none", fontWeight: 600 }}>Upload your first record →</Button>}
//                   </Box>
//                 ) : filteredRecords.map(record => <RecordCard key={record.id} record={record} onDelete={handleDeleteRecord} />)}
//               </>
//             )}

//             {/* PRESCRIPTIONS */}
//             {view === "prescriptions" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Prescriptions</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>{prescriptions.length} prescription{prescriptions.length !== 1 ? "s" : ""} from your doctors</Typography>
//                 </Box>
//                 {prescriptions.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>💊</Typography>
//                     <Typography sx={{ fontWeight: 500 }}>No prescriptions yet.</Typography>
//                     <Typography sx={{ fontSize: ".83rem", mt: .5 }}>Prescriptions appear after approved appointments and payment confirmation.</Typography>
//                   </Box>
//                 ) : prescriptions.map(rx => (
//                   <div key={rx.id} className="rx-card">
//                     <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
//                       <Box sx={{ width: 46, height: 46, borderRadius: "13px", flexShrink: 0, background: "#ecfdf5", border: "1px solid rgba(5,150,105,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><LocalPharmacyIcon sx={{ color: "#059669", fontSize: 22 }} /></Box>
//                       <Box sx={{ flex: 1 }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", mb: .75 }}>
//                           <Typography sx={{ fontWeight: 700, fontSize: ".95rem", color: "#1a1f36" }}>Dr. {rx.appointment?.doctor?.name}</Typography>
//                           {rx.issuedDate && <Chip label={rx.issuedDate} size="small" sx={{ background: "#f5f7ff", color: "#8892b0", fontSize: ".68rem", height: 20 }} />}
//                         </Box>
//                         <Typography sx={{ fontSize: ".8rem", color: "#8892b0", mb: .75 }}>{rx.appointment?.doctor?.specialization} · {rx.appointment?.date}</Typography>
//                         {rx.diagnosis && (
//                           <Box sx={{ background: "#f0fdf4", border: "1px solid rgba(5,150,105,.15)", borderRadius: "10px", px: 1.5, py: 1, mb: 1.5 }}>
//                             <Typography sx={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".8px", color: "#059669", fontWeight: 700, mb: .3 }}>Diagnosis</Typography>
//                             <Typography sx={{ fontSize: ".88rem", fontWeight: 600, color: "#1a1f36" }}>🩺 {rx.diagnosis}</Typography>
//                           </Box>
//                         )}
//                         {rx.medicines && (
//                           <Box sx={{ background: "#f8f9ff", border: "1px solid #e8ecf5", borderRadius: "10px", px: 1.5, py: 1, mb: 1.5 }}>
//                             <Typography sx={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".8px", color: "#4f6ef7", fontWeight: 700, mb: .5 }}>💊 Medicines &amp; Dosage</Typography>
//                             <Typography sx={{ fontSize: ".83rem", color: "#1a1f36", whiteSpace: "pre-line", lineHeight: 1.7 }}>{rx.medicines}</Typography>
//                           </Box>
//                         )}
//                         <Grid container spacing={1.5}>
//                           {rx.instructions && (<Grid item xs={12} sm={6}><Typography sx={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".8px", color: "#8892b0", fontWeight: 600, mb: .4 }}>Instructions</Typography><Typography sx={{ fontSize: ".82rem", color: "#4a5278" }}>📋 {rx.instructions}</Typography></Grid>)}
//                           {rx.tests && (<Grid item xs={12} sm={6}><Typography sx={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".8px", color: "#8892b0", fontWeight: 600, mb: .4 }}>Lab Tests</Typography><Typography sx={{ fontSize: ".82rem", color: "#7c3aed" }}>🔬 {rx.tests}</Typography></Grid>)}
//                           {rx.followUpDate && (<Grid item xs={12}><Typography sx={{ fontSize: ".82rem", color: "#d97706", fontWeight: 600 }}>📅 Follow-up: {rx.followUpDate}</Typography></Grid>)}
//                         </Grid>
//                       </Box>
//                     </Box>
//                   </div>
//                 ))}
//               </>
//             )}

//             {/* ✅ HEALTH STATUS — new vitals dashboard */}
//             {view === "healthstatus" && (
//               <HealthStatusView patientId={patient.id} />
//             )}

//             {/* HEALTH STATS */}
//             {view === "health" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Health Stats</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>Your health data visualized</Typography>
//                 </Box>
//                 <HealthStats appointments={appointments} prescriptions={prescriptions} medicalRecords={medicalRecords} payments={payments} />
//               </>
//             )}

//             {/* PROFILE */}
//             {view === "profile" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Profile</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>Your personal health information</Typography>
//                 </Box>
//                 <Card className="light-card" sx={{ p: 4 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3 }}>
//                     <Avatar className="av-blue" sx={{ width: 76, height: 76, borderRadius: "22px", fontSize: "2rem", fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, boxShadow: "0 6px 20px rgba(79,110,247,.25)" }}>{patient.name?.charAt(0)}</Avatar>
//                     <Box>
//                       <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 700, color: "#1a1f36" }}>{patient.name}</Typography>
//                       <Typography sx={{ fontSize: ".82rem", color: "#8892b0", mt: .5 }}>Patient Account · Active</Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[["Full Name", patient.name], ["Gender", patient.gender], ["Date of Birth", patient.dob], ["Contact", patient.contact], ["Age", patient.age ? `${patient.age} years` : "—"], ["Patient ID", `#${patient.id}`]].map(([label, val]) => (
//                       <Grid item xs={12} sm={6} key={label}>
//                         <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1.1px", color: "#8892b0", fontWeight: 600, mb: .6 }}>{label}</Typography>
//                         <Typography sx={{ fontSize: ".95rem", fontWeight: 500, color: "#1a1f36" }}>{val || "—"}</Typography>
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
//       <UploadRecordModal open={uploadOpen} onClose={() => setUploadOpen(false)} patientId={patient.id} onUploaded={newRecord => setMedicalRecords(prev => [newRecord, ...prev])} />
//       <PaymentModal open={Boolean(payAppt)} appointment={payAppt} onClose={() => setPayAppt(null)} onPaid={handlePaymentDone} />
//       <FeedbackModal open={Boolean(fbAppt)} appointment={fbAppt} onClose={() => setFbAppt(null)} onSubmitted={handleFeedbackDone} />
//     </Box>
//   );
// }




// import { useContext, useEffect, useState, useRef, useCallback } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import PatientProfileForm from "./PatientProfileForm";
// import {
//   Box, Typography, CircularProgress, Alert, Grid, Card, CardContent,
//   Avatar, Button, Divider, Chip, TextField, InputAdornment,
//   MenuItem, Select, Modal, IconButton, LinearProgress, Rating,
//   Dialog, DialogTitle, DialogContent, DialogActions, Snackbar,
// } from "@mui/material";
// import MenuIcon          from "@mui/icons-material/Menu";
// import CloseIcon         from "@mui/icons-material/Close";
// import LogoutIcon        from "@mui/icons-material/Logout";
// import EventIcon         from "@mui/icons-material/Event";
// import DashboardIcon     from "@mui/icons-material/Dashboard";
// import PersonIcon        from "@mui/icons-material/Person";
// import AddIcon           from "@mui/icons-material/Add";
// import SearchIcon        from "@mui/icons-material/Search";
// import FolderIcon        from "@mui/icons-material/Folder";
// import UploadFileIcon    from "@mui/icons-material/UploadFile";
// import DescriptionIcon   from "@mui/icons-material/Description";
// import DeleteIcon        from "@mui/icons-material/Delete";
// import OpenInNewIcon     from "@mui/icons-material/OpenInNew";
// import DownloadIcon      from "@mui/icons-material/Download";
// import VisibilityIcon    from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import FilterListIcon    from "@mui/icons-material/FilterList";
// import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
// import PaymentIcon       from "@mui/icons-material/Payment";
// import StarIcon          from "@mui/icons-material/Star";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CheckCircleIcon   from "@mui/icons-material/CheckCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import BarChartIcon      from "@mui/icons-material/BarChart";
// import MonitorHeartIcon  from "@mui/icons-material/MonitorHeart";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LineChart, Line, AreaChart, Area,
//   ResponsiveContainer, XAxis, YAxis, CartesianGrid,
//   Tooltip as ReTooltip, Legend,
// } from "recharts";
// import { format } from "date-fns";

// const BASE = "http://localhost:8080";

// // ─────────────────────────────────────────────────────────────────────────────
// // Global CSS
// // ─────────────────────────────────────────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   .sidebar-overlay{position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease;}
//   @keyframes overlayIn{from{opacity:0}to{opacity:1}}
//   .portal-sidebar{width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1);}
//   .portal-sidebar.closed{transform:translateX(-100%);}
//   .portal-sidebar.open{transform:translateX(0);}
//   .sidebar-top-row{display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px;}
//   .sidebar-logo{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px;}
//   .logo-icon{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0;}
//   .logo-accent{color:#7c3aed;}
//   .sidebar-close-btn{width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s;}
//   .sidebar-close-btn:hover{background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2);}
//   .nav-section-label{font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px;}
//   .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none;}
//   .nav-item:hover{background:#eef1fe;color:#4f6ef7;}
//   .nav-item.active{background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18);}
//   .nav-item.active .nav-icon-wrap{background:#4f6ef7 !important;color:#fff !important;}
//   .nav-icon-wrap{width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278;}
//   .sidebar-spacer{flex:1;}
//   .user-card{display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px;}
//   .user-mini-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem;}
//   .portal-topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100;}
//   .topbar-left{display:flex;align-items:center;gap:14px;}
//   .hamburger-btn{width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s;}
//   .hamburger-btn:hover{background:#eef1fe;border-color:rgba(79,110,247,.2);}
//   .blob{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;}
//   .blob-1{width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px;}
//   .blob-2{width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px;}
//   .light-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important;}
//   .light-card:hover{box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important;}
//   .hero-card{background:linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;}
//   .hero-card::after{content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none;}
//   .stat-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important;}
//   .stat-card:hover{box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .stat-value{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1;}
//   .stat-label{font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px;}
//   .stat-icon{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07;}
//   .sec-heading{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px;}
//   .sec-heading::after{content:'';flex:1;height:1px;background:#e8ecf5;}
//   .spec-chip-wrap{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0;}
//   .spec-chip{padding:6px 14px !important;border-radius:20px !important;font-size:.78rem !important;font-weight:600 !important;border:1px solid #e8ecf5 !important;cursor:pointer !important;transition:all .18s !important;background:#fff !important;color:#4a5278 !important;user-select:none;}
//   .spec-chip:hover{background:#eef1fe !important;border-color:rgba(79,110,247,.25) !important;color:#4f6ef7 !important;}
//   .spec-chip.active{background:#4f6ef7 !important;border-color:#4f6ef7 !important;color:#fff !important;}
//   .record-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:16px !important;box-shadow:0 1px 6px rgba(79,110,247,.07) !important;transition:box-shadow .22s,transform .22s !important;padding:20px 22px;margin-bottom:12px;}
//   .record-card:hover{box-shadow:0 5px 22px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .rx-card{background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s;}
//   .rx-card:hover{box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px);}
//   .pay-banner{background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:16px;padding:18px 22px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
//   .pay-banner-paid{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-color:#6ee7b7;}
//   .notif-dot{width:8px;height:8px;border-radius:50%;background:#e11d48;position:absolute;top:6px;right:6px;}
//   .upload-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:520px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto;}
//   .upload-modal-box .MuiOutlinedInput-root{border-radius:12px !important;background:#f8f9ff !important;}
//   .rzp-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:440px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .fb-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:460px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .drop-zone{border:2px dashed #c7cee8;border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:all .2s;background:#f8f9ff;}
//   .drop-zone:hover,.drop-zone.dragover{border-color:#4f6ef7;background:#eef1fe;}
//   .file-preview-wrap{width:100%;border-radius:10px;overflow:hidden;border:1px solid #e8ecf5;margin-top:12px;}
//   .file-preview-wrap iframe{width:100%;height:340px;border:none;display:block;}
//   .file-preview-wrap img{width:100%;display:block;max-height:380px;object-fit:contain;background:#f8f9ff;}
//   .health-chart-card{background:#fff;border:1px solid #e8ecf5;border-radius:18px;padding:24px;box-shadow:0 1px 6px rgba(79,110,247,.06);}
//   .hbar-wrap{display:flex;flex-direction:column;gap:10px;}
//   .hbar-row{display:flex;align-items:center;gap:12px;}
//   .hbar-label{font-size:.75rem;font-weight:600;color:#4a5278;width:100px;flex-shrink:0;text-align:right;}
//   .hbar-track{flex:1;height:10px;background:#f0f2f8;border-radius:999px;overflow:hidden;}
//   .hbar-fill{height:100%;border-radius:999px;transition:width .7s cubic-bezier(.22,1,.36,1);}
//   .hbar-val{font-size:.75rem;font-weight:700;color:#1a1f36;width:48px;flex-shrink:0;}
//   .donut-svg{display:block;margin:0 auto;}
//   .mini-legend{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:12px;}
//   .mini-legend-item{display:flex;align-items:center;gap:5px;font-size:.72rem;color:#4a5278;font-weight:500;}
//   .mini-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
//   .timeline-wrap{position:relative;padding-left:22px;}
//   .timeline-wrap::before{content:'';position:absolute;left:7px;top:0;bottom:0;width:2px;background:#e8ecf5;}
//   .tl-item{position:relative;margin-bottom:14px;}
//   .tl-dot{position:absolute;left:-18px;top:4px;width:10px;height:10px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 2px currentColor;}
//   .av-blue{background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;}
//   .av-violet{background:linear-gradient(135deg,#7c3aed,#a78bfa) !important;}
//   .av-teal{background:linear-gradient(135deg,#0891b2,#22d3ee) !important;}
//   .av-rose{background:linear-gradient(135deg,#e11d48,#fb7185) !important;}
//   .av-green{background:linear-gradient(135deg,#059669,#34d399) !important;}
//   .av-amber{background:linear-gradient(135deg,#d97706,#fbbf24) !important;}
//   @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
//   .fu{animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;}
// `;

// if (!document.getElementById("portal-styles")) {
//   const s = document.createElement("style"); s.id = "portal-styles"; s.textContent = globalStyles; document.head.appendChild(s);
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Health Status constants & helpers
// // ─────────────────────────────────────────────────────────────────────────────
// // ─── Health Status — light theme tokens (matches dashboard) ───────────────────
// const HS_METRICS = {
//   bloodSugarLevel:  { label: "Blood Sugar",     unit: "mg/dL", color: "#f59e0b", bg: "#fffbeb", border: "#fcd34d", safe: [70, 140] },
//   heartRate:        { label: "Heart Rate",       unit: "bpm",   color: "#e11d48", bg: "#fff1f3", border: "#fda4af", safe: [60, 100] },
//   oxygenSaturation: { label: "SpO₂",            unit: "%",     color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", safe: [95, 100] },
//   bodyTemperature:  { label: "Temperature",      unit: "°C",    color: "#f97316", bg: "#fff7ed", border: "#fed7aa", safe: [36.1, 37.2] },
//   respiratoryRate:  { label: "Resp. Rate",       unit: "/min",  color: "#059669", bg: "#ecfdf5", border: "#6ee7b7", safe: [12, 20] },
//   bmi:              { label: "BMI",              unit: "",      color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd", safe: [18.5, 24.9] },
//   weight:           { label: "Weight",           unit: "kg",    color: "#4f6ef7", bg: "#eef1fe", border: "#a5b4fc", safe: null },
// };

// const HS_EMPTY = {
//   bloodSugarLevel: "", sugarType: "fasting",
//   bodyTemperature: "", bloodPressure: "",
//   heartRate: "", oxygenSaturation: "",
//   respiratoryRate: "", height: "", weight: "",
// };

// const hsStatus = (key, val) => {
//   const s = HS_METRICS[key]?.safe;
//   if (!s || val == null) return null;
//   if (val < s[0]) return "low";
//   if (val > s[1]) return "high";
//   return "normal";
// };
// const HS_SCOL  = { normal: "#059669", low: "#f59e0b", high: "#e11d48" };
// const HS_SBGCOL = { normal: "#ecfdf5", low: "#fffbeb", high: "#fff1f3" };
// const hsParseBP = (bp) => { if (!bp) return null; const [s, d] = bp.split("/").map(Number); return isNaN(s) || isNaN(d) ? null : { sys: s, dia: d }; };
// const hsFmtDate = (d) => { try { return format(new Date(d), "MMM d, HH:mm"); } catch { return ""; } };
// const hsFmt = (v, dec = 1) => (v != null ? Number(v).toFixed(dec) : "—");

// const hsCardSx = {
//   background: "#fff", border: "1px solid #e8ecf5", borderRadius: "18px",
//   boxShadow: "0 1px 6px rgba(79,110,247,.06)",
//   transition: "box-shadow .2s, transform .2s",
//   "&:hover": { boxShadow: "0 6px 24px rgba(79,110,247,.12)", transform: "translateY(-2px)" },
// };

// const hsInputSx = {
//   "& .MuiOutlinedInput-root": {
//     background: "#f8f9ff", borderRadius: "12px",
//     "& fieldset": { borderColor: "#e8ecf5" },
//     "&:hover fieldset": { borderColor: "#c7cee8" },
//     "&.Mui-focused fieldset": { borderColor: "#4f6ef7" },
//   },
//   "& .MuiInputLabel-root.Mui-focused": { color: "#4f6ef7" },
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // Existing helpers
// // ─────────────────────────────────────────────────────────────────────────────
// const avatarColors   = ["av-blue", "av-violet", "av-teal", "av-rose", "av-green", "av-amber"];
// const getAvatarClass = (i) => avatarColors[i % avatarColors.length];
// const RECORD_TYPES   = ["LAB_REPORT", "PRESCRIPTION", "SCAN", "VACCINATION", "SURGERY", "OTHER"];
// const RECORD_COLORS  = {
//   LAB_REPORT:   { bg: "#eef1fe", color: "#4f6ef7", border: "rgba(79,110,247,.2)" },
//   PRESCRIPTION: { bg: "#ecfdf5", color: "#059669", border: "rgba(5,150,105,.2)" },
//   SCAN:         { bg: "#fff1f3", color: "#e11d48", border: "rgba(225,29,72,.2)" },
//   VACCINATION:  { bg: "#fffbeb", color: "#d97706", border: "rgba(217,119,6,.2)" },
//   SURGERY:      { bg: "#f5f3ff", color: "#7c3aed", border: "rgba(124,58,237,.2)" },
//   OTHER:        { bg: "#f5f7ff", color: "#8892b0", border: "#e8ecf5" },
// };
// const getStatusColor = (s) => s === "APPROVED" ? "success" : s === "REJECTED" ? "error" : "warning";

// // ─────────────────────────────────────────────────────────────────────────────
// // Small reusable components
// // ─────────────────────────────────────────────────────────────────────────────
// function NavItem({ icon, label, active, onClick, badge }) {
//   return (
//     <div className={`nav-item ${active ? "active" : ""}`} onClick={onClick} style={{ position: "relative" }}>
//       <div className="nav-icon-wrap">{icon}</div>
//       {label}
//       {badge > 0 && <span style={{ marginLeft: "auto", background: "#e11d48", color: "#fff", fontSize: ".62rem", fontWeight: 700, borderRadius: "999px", padding: "1px 7px", minWidth: 18, textAlign: "center" }}>{badge}</span>}
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color }) {
//   return (
//     <div className="stat-card fu">
//       <div className="stat-label">{label}</div>
//       <div className="stat-value" style={{ color }}>{value}</div>
//       <div className="stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Health Stats (dashboard tab charts — existing)
// // ─────────────────────────────────────────────────────────────────────────────
// function HealthStats({ appointments, prescriptions, medicalRecords, payments }) {
//   const total    = appointments.length;
//   const approved = appointments.filter(a => a.status === "APPROVED").length;
//   const pending  = appointments.filter(a => a.status === "PENDING").length;
//   const rejected = appointments.filter(a => a.status === "REJECTED").length;
//   const typeCounts = RECORD_TYPES.reduce((acc, t) => { acc[t] = medicalRecords.filter(r => r.recordType === t).length; return acc; }, {});
//   const now = new Date();
//   const months = Array.from({ length: 6 }, (_, i) => {
//     const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
//     return { label: d.toLocaleString("default", { month: "short" }), year: d.getFullYear(), month: d.getMonth() };
//   });
//   const monthlyData = months.map(m => ({
//     label: m.label,
//     count: appointments.filter(a => { if (!a.date) return false; const d = new Date(a.date); return d.getFullYear() === m.year && d.getMonth() === m.month; }).length,
//   }));
//   const maxCount = Math.max(...monthlyData.map(m => m.count), 1);
//   const donutData = [
//     { label: "Approved", count: approved, color: "#059669" },
//     { label: "Pending",  count: pending,  color: "#f59e0b" },
//     { label: "Rejected", count: rejected, color: "#e11d48" },
//   ].filter(d => d.count > 0);
//   const r = 58, cx = 70, cy = 70, circum = 2 * Math.PI * r;
//   let offset = 0;
//   const segments = donutData.map(d => {
//     const pct = total > 0 ? d.count / total : 0;
//     const dash = pct * circum; const gap = circum - dash;
//     const seg = { ...d, dash, gap, offset, pct };
//     offset += dash; return seg;
//   });
//   const typeBars = Object.entries(typeCounts).filter(([, v]) => v > 0).map(([k, v]) => ({ label: k.replace("_", " "), val: v, color: RECORD_COLORS[k]?.color || "#8892b0" }));
//   const maxType = Math.max(...typeBars.map(b => b.val), 1);
//   const paidCount = Object.values(payments).filter(p => p?.status === "SUCCESS").length;
//   const pendingPayCount = approved - paidCount;
//   return (
//     <Box>
//       <Grid container spacing={2.5}>
//         <Grid item xs={12} sm={6} md={4}>
//           <div className="health-chart-card" style={{ height: "100%" }}>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Appointment Status</Typography>
//             {total === 0 ? (
//               <Box sx={{ textAlign: "center", py: 4, color: "#c0c8e0" }}><Typography sx={{ fontSize: "2rem", mb: 1 }}>📅</Typography><Typography sx={{ fontSize: ".82rem" }}>No appointments yet</Typography></Box>
//             ) : (
//               <>
//                 <svg className="donut-svg" width={140} height={140} viewBox="0 0 140 140">
//                   <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f2f8" strokeWidth={16} />
//                   {segments.map((seg, i) => (
//                     <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={16} strokeDasharray={`${seg.dash} ${seg.gap}`} strokeDashoffset={-seg.offset} transform="rotate(-90 70 70)" style={{ transition: "stroke-dasharray .7s ease" }} />
//                   ))}
//                   <text x={cx} y={cy - 4} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1a1f36" fontFamily="'Cormorant Garamond',serif">{total}</text>
//                   <text x={cx} y={cy + 14} textAnchor="middle" fontSize={9} fill="#8892b0" fontFamily="Outfit,sans-serif">Total</text>
//                 </svg>
//                 <div className="mini-legend">{donutData.map(d => (<div key={d.label} className="mini-legend-item"><div className="mini-dot" style={{ background: d.color }} />{d.label}: {d.count}</div>))}</div>
//               </>
//             )}
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <div className="health-chart-card" style={{ height: "100%" }}>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Monthly Activity</Typography>
//             <Box sx={{ display: "flex", alignItems: "flex-end", gap: "6px", height: 90, px: .5 }}>
//               {monthlyData.map((m, i) => {
//                 const pct = m.count / maxCount;
//                 return (
//                   <Box key={i} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: .5 }}>
//                     <Typography sx={{ fontSize: ".62rem", color: "#8892b0", fontWeight: 600 }}>{m.count || ""}</Typography>
//                     <Box sx={{ width: "100%", background: `rgba(79,110,247,${0.15 + pct * 0.7})`, borderRadius: "5px 5px 0 0", height: `${Math.max(pct * 68, 4)}px`, transition: "height .6s ease", minHeight: 4 }} />
//                     <Typography sx={{ fontSize: ".62rem", color: "#8892b0", fontWeight: 600, textAlign: "center" }}>{m.label}</Typography>
//                   </Box>
//                 );
//               })}
//             </Box>
//             <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}><Typography sx={{ fontSize: ".72rem", color: "#8892b0" }}>Last 6 months</Typography></Box>
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <div className="health-chart-card" style={{ height: "100%" }}>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Payment Health</Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               {[
//                 { label: "Paid",    val: paidCount,            color: "#059669", max: Math.max(approved, 1) },
//                 { label: "Pending", val: pendingPayCount,       color: "#f59e0b", max: Math.max(approved, 1) },
//                 { label: "Records", val: medicalRecords.length, color: "#4f6ef7", max: Math.max(medicalRecords.length, 1) },
//                 { label: "Rx",      val: prescriptions.length,  color: "#7c3aed", max: Math.max(prescriptions.length, 1) },
//               ].map(item => (
//                 <Box key={item.label}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", mb: .5 }}>
//                     <Typography sx={{ fontSize: ".75rem", fontWeight: 600, color: "#4a5278" }}>{item.label}</Typography>
//                     <Typography sx={{ fontSize: ".75rem", fontWeight: 700, color: item.color }}>{item.val}</Typography>
//                   </Box>
//                   <Box sx={{ height: 8, background: "#f0f2f8", borderRadius: 999, overflow: "hidden" }}>
//                     <Box sx={{ height: "100%", width: `${(item.val / item.max) * 100}%`, background: item.color, borderRadius: 999, transition: "width .7s ease" }} />
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={6} md={6}>
//           <div className="health-chart-card">
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Medical Record Types</Typography>
//             {typeBars.length === 0 ? <Box sx={{ textAlign: "center", py: 3, color: "#c0c8e0" }}><Typography sx={{ fontSize: ".82rem" }}>No medical records uploaded yet</Typography></Box> : (
//               <div className="hbar-wrap">
//                 {typeBars.map(b => (
//                   <div key={b.label} className="hbar-row">
//                     <span className="hbar-label">{b.label}</span>
//                     <div className="hbar-track"><div className="hbar-fill" style={{ width: `${(b.val / maxType) * 100}%`, background: b.color }} /></div>
//                     <span className="hbar-val" style={{ color: b.color }}>{b.val}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={6} md={6}>
//           <div className="health-chart-card">
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Prescription Timeline</Typography>
//             {prescriptions.length === 0 ? (
//               <Box sx={{ textAlign: "center", py: 3, color: "#c0c8e0" }}><Typography sx={{ fontSize: "2rem", mb: 1 }}>💊</Typography><Typography sx={{ fontSize: ".82rem" }}>No prescriptions yet</Typography></Box>
//             ) : (
//               <div className="timeline-wrap">
//                 {[...prescriptions].reverse().slice(0, 5).map((rx) => (
//                   <div key={rx.id} className="tl-item">
//                     <div className="tl-dot" style={{ color: "#059669", background: "#ecfdf5" }} />
//                     <Box sx={{ pl: 1 }}>
//                       <Typography sx={{ fontSize: ".82rem", fontWeight: 700, color: "#1a1f36" }}>{rx.diagnosis || "Prescription"}</Typography>
//                       <Typography sx={{ fontSize: ".72rem", color: "#8892b0" }}>Dr. {rx.appointment?.doctor?.name} · {rx.issuedDate || rx.appointment?.date || "—"}</Typography>
//                       {rx.medicines && <Typography sx={{ fontSize: ".72rem", color: "#4f6ef7", mt: .3 }} noWrap>💊 {rx.medicines.split("\n")[0]}</Typography>}
//                     </Box>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Health Status View — light theme, large charts, matches dashboard UI
// // ─────────────────────────────────────────────────────────────────────────────
// const CHART_TOOLTIP = {
//   contentStyle: { background: "#fff", border: "1px solid #e8ecf5", borderRadius: 10, boxShadow: "0 4px 16px rgba(79,110,247,.12)", fontSize: 12 },
//   labelStyle: { color: "#8892b0", fontWeight: 600 },
// };

// function HsMetricCard({ label, value, unit, color, bg, border, status }) {
//   return (
//     <Card sx={{ background: bg, border: `1px solid ${border}`, borderRadius: "16px", boxShadow: "none", height: "100%", transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-3px)", boxShadow: `0 8px 24px ${color}22` } }}>
//       <CardContent sx={{ p: "20px !important" }}>
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
//           <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 700 }}>{label}</Typography>
//           {status && (
//             <Chip label={status} size="small" sx={{ height: 20, fontSize: ".65rem", fontWeight: 700, background: HS_SBGCOL[status], color: HS_SCOL[status], border: `1px solid ${HS_SCOL[status]}33` }} />
//           )}
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "baseline", gap: .75, mt: .5 }}>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 700, color, lineHeight: 1 }}>{value}</Typography>
//           {unit && <Typography sx={{ fontSize: ".78rem", color: "#8892b0", fontWeight: 600 }}>{unit}</Typography>}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// function HsChartCard({ title, subtitle, children }) {
//   return (
//     <Card sx={hsCardSx}>
//       <CardContent sx={{ p: "28px !important" }}>
//         <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", fontWeight: 700, color: "#1a1f36" }}>{title}</Typography>
//         {subtitle && <Typography sx={{ fontSize: ".78rem", color: "#8892b0", mt: .3, mb: 2.5 }}>{subtitle}</Typography>}
//         {children}
//       </CardContent>
//     </Card>
//   );
// }

// function HealthStatusView({ patientId }) {
//   const [hsHistory, setHsHistory] = useState([]);
//   const [hsLatest,  setHsLatest]  = useState(null);
//   const [hsLoading, setHsLoading] = useState(true);
//   const [hsDialog,  setHsDialog]  = useState(false);
//   const [hsForm,    setHsForm]    = useState(HS_EMPTY);
//   const [hsEditId,  setHsEditId]  = useState(null);
//   const [hsSaving,  setHsSaving]  = useState(false);
//   const [hsSnack,   setHsSnack]   = useState({ open: false, msg: "", sev: "success" });

//   const loadHS = useCallback(async () => {
//     if (!patientId) return;
//     try {
//       setHsLoading(true);
//       const [hRes, lRes] = await Promise.allSettled([
//         axios.get(`${BASE}/health-status/patient/${patientId}`),
//         axios.get(`${BASE}/health-status/patient/${patientId}/latest`),
//       ]);
//       if (hRes.status === "fulfilled") setHsHistory(hRes.value.data);
//       if (lRes.status === "fulfilled") setHsLatest(lRes.value.data);
//     } catch {
//       setHsSnack({ open: true, msg: "Failed to load health data", sev: "error" });
//     } finally { setHsLoading(false); }
//   }, [patientId]);

//   useEffect(() => { loadHS(); }, [loadHS]);

//   const openHsAdd  = () => { setHsForm(HS_EMPTY); setHsEditId(null); setHsDialog(true); };
//   const openHsEdit = (r) => {
//     setHsForm({
//       bloodSugarLevel: r.bloodSugarLevel ?? "", sugarType: r.sugarType ?? "fasting",
//       bodyTemperature: r.bodyTemperature ?? "", bloodPressure: r.bloodPressure ?? "",
//       heartRate: r.heartRate ?? "", oxygenSaturation: r.oxygenSaturation ?? "",
//       respiratoryRate: r.respiratoryRate ?? "", height: r.height ?? "", weight: r.weight ?? "",
//     });
//     setHsEditId(r.id); setHsDialog(true);
//   };

//   const handleHsSave = async () => {
//     setHsSaving(true);
//     try {
//       const payload = {
//         ...hsForm,
//         bloodSugarLevel:  hsForm.bloodSugarLevel  !== "" ? Number(hsForm.bloodSugarLevel)  : null,
//         bodyTemperature:  hsForm.bodyTemperature  !== "" ? Number(hsForm.bodyTemperature)  : null,
//         heartRate:        hsForm.heartRate        !== "" ? Number(hsForm.heartRate)        : null,
//         oxygenSaturation: hsForm.oxygenSaturation !== "" ? Number(hsForm.oxygenSaturation) : null,
//         respiratoryRate:  hsForm.respiratoryRate  !== "" ? Number(hsForm.respiratoryRate)  : null,
//         height:           hsForm.height           !== "" ? Number(hsForm.height)           : null,
//         weight:           hsForm.weight           !== "" ? Number(hsForm.weight)           : null,
//       };
//       if (hsEditId) { await axios.put(`${BASE}/health-status/${hsEditId}`, payload); }
//       else          { await axios.post(`${BASE}/health-status/patient/${patientId}`, payload); }
//       setHsDialog(false);
//       setHsSnack({ open: true, msg: hsEditId ? "Record updated!" : "Record saved!", sev: "success" });
//       loadHS();
//     } catch {
//       setHsSnack({ open: true, msg: "Save failed. Check your input.", sev: "error" });
//     } finally { setHsSaving(false); }
//   };

//   // chronological chart data (last 12)
//   const chartData = [...hsHistory].reverse().slice(-12).map(r => ({
//     time: hsFmtDate(r.recordedAt),
//     bloodSugar: r.bloodSugarLevel,
//     heartRate:  r.heartRate,
//     spO2:       r.oxygenSaturation,
//     temp:       r.bodyTemperature,
//     bmi:        r.bmi,
//     weight:     r.weight,
//     resp:       r.respiratoryRate,
//   }));

//   const bpData = [...hsHistory].reverse().slice(-12).map(r => {
//     const bp = hsParseBP(r.bloodPressure);
//     return { time: hsFmtDate(r.recordedAt), systolic: bp?.sys ?? null, diastolic: bp?.dia ?? null };
//   });

//   const estBMI = hsForm.height && hsForm.weight
//     ? (Number(hsForm.weight) / Math.pow(Number(hsForm.height) / 100, 2)).toFixed(1)
//     : null;

//   if (hsLoading) return (
//     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 340 }}>
//       <CircularProgress sx={{ color: "#4f6ef7" }} />
//     </Box>
//   );

//   return (
//     <Box>
//       {/* ── Page Header ─────────────────────────────────────────────────────── */}
//       <Box sx={{ mb: 4, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
//         <Box>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>
//             Health Status
//           </Typography>
//           <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>
//             {hsHistory.length > 0
//               ? `${hsHistory.length} reading${hsHistory.length > 1 ? "s" : ""} · Last updated ${hsFmtDate(hsLatest?.recordedAt)}`
//               : "Track your vitals over time — log your first reading"}
//           </Typography>
//         </Box>
//         <Button onClick={openHsAdd} variant="contained"
//           sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700, fontSize: ".92rem", px: 3, py: 1.4, boxShadow: "0 4px 14px rgba(79,110,247,.28)", "&:hover": { boxShadow: "0 6px 22px rgba(79,110,247,.4)" } }}>
//           + Log Reading
//         </Button>
//       </Box>

//       {hsHistory.length === 0 ? (
//         <Box sx={{ textAlign: "center", py: 10 }}>
//           <Typography sx={{ fontSize: 64, mb: 2 }}>🩺</Typography>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 700, color: "#1a1f36" }}>No health data yet</Typography>
//           <Typography sx={{ color: "#8892b0", mt: 1, fontSize: ".9rem" }}>Click "+ Log Reading" to add your first vitals record</Typography>
//           <Button onClick={openHsAdd} variant="contained" sx={{ mt: 3, background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700, px: 4 }}>
//             Log Your First Reading
//           </Button>
//         </Box>
//       ) : (
//         <>
//           {/* ── Latest Vitals Cards ────────────────────────────────────────── */}
//           <div className="sec-heading" style={{ marginBottom: 16 }}>Latest Vitals</div>
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             {Object.entries(HS_METRICS).map(([key, cfg]) => {
//               const val = hsLatest?.[key];
//               const st  = hsStatus(key, val);
//               return (
//                 <Grid item xs={6} sm={4} md={3} key={key}>
//                   <HsMetricCard
//                     label={cfg.label}
//                     value={val != null ? hsFmt(val, key === "heartRate" || key === "respiratoryRate" ? 0 : 1) : "—"}
//                     unit={cfg.unit} color={cfg.color} bg={cfg.bg} border={cfg.border} status={st}
//                   />
//                 </Grid>
//               );
//             })}
//             {/* Blood Pressure card */}
//             <Grid item xs={6} sm={4} md={3}>
//               <HsMetricCard label="Blood Pressure" value={hsLatest?.bloodPressure ?? "—"} unit="mmHg"
//                 color="#7c3aed" bg="#f5f3ff" border="#c4b5fd" status={null} />
//             </Grid>
//             {/* Blood Sugar Type */}
//             {hsLatest?.sugarType && (
//               <Grid item xs={6} sm={4} md={3}>
//                 <HsMetricCard label="Sugar Reading Type" value={hsLatest.sugarType} unit=""
//                   color="#f59e0b" bg="#fffbeb" border="#fcd34d" status={null} />
//               </Grid>
//             )}
//           </Grid>

//           {/* ── Charts ────────────────────────────────────────────────────── */}
//           <div className="sec-heading" style={{ marginBottom: 16 }}>Trends Over Time</div>

//           {/* Row 1 — Blood Sugar (full width, big) */}
//           <Box sx={{ mb: 3 }}>
//             <HsChartCard title="Blood Sugar Level" subtitle="mg/dL · fasting / post-meal / random readings">
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//                   <defs>
//                     <linearGradient id="gradSugar" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.18} />
//                       <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
//                   <XAxis dataKey="time" tick={{ fill: "#8892b0", fontSize: 11 }} />
//                   <YAxis tick={{ fill: "#8892b0", fontSize: 11 }} domain={["auto", "auto"]} />
//                   <ReTooltip {...CHART_TOOLTIP} />
//                   {/* safe zone reference bands */}
//                   <Area type="monotone" dataKey="bloodSugar" stroke="#f59e0b" fill="url(#gradSugar)"
//                     strokeWidth={3} dot={{ fill: "#f59e0b", r: 5, strokeWidth: 2, stroke: "#fff" }}
//                     activeDot={{ r: 7 }} name="Blood Sugar (mg/dL)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </HsChartCard>
//           </Box>

//           {/* Row 2 — Heart Rate + SpO₂ side by side */}
//           <Grid container spacing={3} sx={{ mb: 3 }}>
//             <Grid item xs={12} md={6}>
//               <HsChartCard title="Heart Rate" subtitle="Beats per minute (bpm) · Normal: 60–100">
//                 <ResponsiveContainer width="100%" height={280}>
//                   <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
//                     <XAxis dataKey="time" tick={{ fill: "#8892b0", fontSize: 11 }} />
//                     <YAxis tick={{ fill: "#8892b0", fontSize: 11 }} domain={[40, 160]} />
//                     <ReTooltip {...CHART_TOOLTIP} />
//                     {/* normal range band */}
//                     <Line type="monotone" dataKey="heartRate" stroke="#e11d48" strokeWidth={3}
//                       dot={{ fill: "#e11d48", r: 5, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 7 }} name="Heart Rate (bpm)" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </HsChartCard>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <HsChartCard title="Oxygen Saturation (SpO₂)" subtitle="Percentage (%) · Normal: 95–100%">
//                 <ResponsiveContainer width="100%" height={280}>
//                   <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//                     <defs>
//                       <linearGradient id="gradSpO2" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%"  stopColor="#0891b2" stopOpacity={0.18} />
//                         <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
//                     <XAxis dataKey="time" tick={{ fill: "#8892b0", fontSize: 11 }} />
//                     <YAxis tick={{ fill: "#8892b0", fontSize: 11 }} domain={[85, 100]} />
//                     <ReTooltip {...CHART_TOOLTIP} />
//                     <Area type="monotone" dataKey="spO2" stroke="#0891b2" fill="url(#gradSpO2)"
//                       strokeWidth={3} dot={{ fill: "#0891b2", r: 5, strokeWidth: 2, stroke: "#fff" }}
//                       activeDot={{ r: 7 }} name="SpO₂ (%)" />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </HsChartCard>
//             </Grid>
//           </Grid>

//           {/* Row 3 — Blood Pressure (full width) */}
//           <Box sx={{ mb: 3 }}>
//             <HsChartCard title="Blood Pressure" subtitle="Systolic / Diastolic (mmHg) · Normal: 120/80">
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={bpData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//                   <defs>
//                     <linearGradient id="gradSys" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#e11d48" stopOpacity={0.15} />
//                       <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
//                     </linearGradient>
//                     <linearGradient id="gradDia" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.15} />
//                       <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
//                   <XAxis dataKey="time" tick={{ fill: "#8892b0", fontSize: 11 }} />
//                   <YAxis tick={{ fill: "#8892b0", fontSize: 11 }} domain={[40, 200]} />
//                   <ReTooltip {...CHART_TOOLTIP} />
//                   <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
//                   <Area type="monotone" dataKey="systolic"  stroke="#e11d48" fill="url(#gradSys)"
//                     strokeWidth={3} dot={{ fill: "#e11d48", r: 4, strokeWidth: 2, stroke: "#fff" }} name="Systolic (mmHg)" />
//                   <Area type="monotone" dataKey="diastolic" stroke="#7c3aed" fill="url(#gradDia)"
//                     strokeWidth={3} dot={{ fill: "#7c3aed", r: 4, strokeWidth: 2, stroke: "#fff" }} name="Diastolic (mmHg)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </HsChartCard>
//           </Box>

//           {/* Row 4 — BMI + Weight | Body Temp + Resp Rate */}
//           <Grid container spacing={3} sx={{ mb: 3 }}>
//             <Grid item xs={12} md={6}>
//               <HsChartCard title="BMI & Weight" subtitle="Body mass index and weight (kg) over time">
//                 <ResponsiveContainer width="100%" height={280}>
//                   <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
//                     <XAxis dataKey="time" tick={{ fill: "#8892b0", fontSize: 11 }} />
//                     <YAxis yAxisId="l" tick={{ fill: "#8892b0", fontSize: 11 }} />
//                     <YAxis yAxisId="r" orientation="right" tick={{ fill: "#8892b0", fontSize: 11 }} />
//                     <ReTooltip {...CHART_TOOLTIP} />
//                     <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
//                     <Line yAxisId="l" type="monotone" dataKey="bmi"    stroke="#7c3aed" strokeWidth={3}
//                       dot={{ fill: "#7c3aed", r: 5, strokeWidth: 2, stroke: "#fff" }} name="BMI" />
//                     <Line yAxisId="r" type="monotone" dataKey="weight" stroke="#4f6ef7" strokeWidth={3}
//                       dot={{ fill: "#4f6ef7", r: 5, strokeWidth: 2, stroke: "#fff" }} name="Weight (kg)" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </HsChartCard>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <HsChartCard title="Body Temperature & Respiratory Rate" subtitle="°C and breaths/min over time">
//                 <ResponsiveContainer width="100%" height={280}>
//                   <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8" />
//                     <XAxis dataKey="time" tick={{ fill: "#8892b0", fontSize: 11 }} />
//                     <YAxis yAxisId="l" tick={{ fill: "#8892b0", fontSize: 11 }} domain={[35, 42]} />
//                     <YAxis yAxisId="r" orientation="right" tick={{ fill: "#8892b0", fontSize: 11 }} domain={[0, 40]} />
//                     <ReTooltip {...CHART_TOOLTIP} />
//                     <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
//                     <Line yAxisId="l" type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={3}
//                       dot={{ fill: "#f97316", r: 5, strokeWidth: 2, stroke: "#fff" }} name="Temp (°C)" />
//                     <Line yAxisId="r" type="monotone" dataKey="resp" stroke="#059669" strokeWidth={3}
//                       dot={{ fill: "#059669", r: 5, strokeWidth: 2, stroke: "#fff" }} name="Resp. Rate (/min)" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </HsChartCard>
//             </Grid>
//           </Grid>

//           {/* ── History Table ────────────────────────────────────────────────── */}
//           <div className="sec-heading" style={{ marginBottom: 16 }}>Reading History</div>
//           <Card sx={{ ...hsCardSx, "&:hover": {} }}>
//             <CardContent sx={{ p: "0 !important" }}>
//               <Box sx={{ overflowX: "auto" }}>
//                 <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
//                   <Box component="thead">
//                     <Box component="tr" sx={{ background: "#f8f9ff" }}>
//                       {["Date & Time", "Blood Sugar", "Temp", "Blood Pressure", "Heart Rate", "SpO₂", "Resp. Rate", "BMI", ""].map(h => (
//                         <Box component="th" key={h} sx={{ p: "14px 18px", textAlign: "left", color: "#8892b0", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".8px", borderBottom: "1px solid #e8ecf5", whiteSpace: "nowrap" }}>{h}</Box>
//                       ))}
//                     </Box>
//                   </Box>
//                   <Box component="tbody">
//                     {hsHistory.map((r, idx) => (
//                       <Box component="tr" key={r.id} sx={{ background: idx % 2 === 0 ? "#fff" : "#fafbff", "&:hover": { background: "#eef1fe" }, transition: "background .15s" }}>
//                         {[
//                           hsFmtDate(r.recordedAt),
//                           r.bloodSugarLevel ? `${r.bloodSugarLevel} mg/dL` : "—",
//                           r.bodyTemperature  ? `${r.bodyTemperature}°C`    : "—",
//                           r.bloodPressure    ?? "—",
//                           r.heartRate        ? `${r.heartRate} bpm`        : "—",
//                           r.oxygenSaturation ? `${r.oxygenSaturation}%`    : "—",
//                           r.respiratoryRate  ? `${r.respiratoryRate}/min`  : "—",
//                           r.bmi              ? Number(r.bmi).toFixed(1)    : "—",
//                         ].map((cell, i) => (
//                           <Box component="td" key={i} sx={{ p: "12px 18px", color: "#1a1f36", fontSize: ".85rem", borderBottom: "1px solid #f0f2f8", whiteSpace: "nowrap" }}>{cell}</Box>
//                         ))}
//                         <Box component="td" sx={{ p: "12px 18px", borderBottom: "1px solid #f0f2f8" }}>
//                           <Button size="small" onClick={() => openHsEdit(r)}
//                             sx={{ background: "#eef1fe", color: "#4f6ef7", textTransform: "none", fontWeight: 700, fontSize: ".78rem", borderRadius: "8px", px: 1.5, py: .5, minWidth: 0, "&:hover": { background: "#4f6ef7", color: "#fff" } }}>
//                             Edit
//                           </Button>
//                         </Box>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </>
//       )}

//       {/* ── Log / Edit Dialog ────────────────────────────────────────────────── */}
//       <Dialog open={hsDialog} onClose={() => setHsDialog(false)} maxWidth="sm" fullWidth
//         PaperProps={{ sx: { borderRadius: "20px", border: "1px solid #e8ecf5", boxShadow: "0 20px 60px rgba(79,110,247,.14)" } }}>
//         <DialogTitle sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1f36", borderBottom: "1px solid #e8ecf5", pb: 2 }}>
//           {hsEditId ? "✏️ Update Health Reading" : "🩺 Log New Health Reading"}
//         </DialogTitle>
//         <DialogContent sx={{ pt: "24px !important" }}>
//           <Grid container spacing={2}>
//             <Grid item xs={8}>
//               <TextField fullWidth label="Blood Sugar Level (mg/dL)" type="number" sx={hsInputSx}
//                 value={hsForm.bloodSugarLevel} onChange={e => setHsForm({ ...hsForm, bloodSugarLevel: e.target.value })} />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField fullWidth select label="Sugar Type" sx={hsInputSx}
//                 value={hsForm.sugarType} onChange={e => setHsForm({ ...hsForm, sugarType: e.target.value })}>
//                 {["fasting", "post-meal", "random"].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
//               </TextField>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Body Temperature (°C)" type="number" sx={hsInputSx}
//                 value={hsForm.bodyTemperature} onChange={e => setHsForm({ ...hsForm, bodyTemperature: e.target.value })} />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Blood Pressure (e.g. 120/80)" placeholder="120/80" sx={hsInputSx}
//                 value={hsForm.bloodPressure} onChange={e => setHsForm({ ...hsForm, bloodPressure: e.target.value })} />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Heart Rate (bpm)" type="number" sx={hsInputSx}
//                 value={hsForm.heartRate} onChange={e => setHsForm({ ...hsForm, heartRate: e.target.value })} />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Oxygen Saturation (%)" type="number" sx={hsInputSx}
//                 value={hsForm.oxygenSaturation} onChange={e => setHsForm({ ...hsForm, oxygenSaturation: e.target.value })} />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField fullWidth label="Respiratory Rate (/min)" type="number" sx={hsInputSx}
//                 value={hsForm.respiratoryRate} onChange={e => setHsForm({ ...hsForm, respiratoryRate: e.target.value })} />
//             </Grid>
//             <Grid item xs={12}><Divider sx={{ borderColor: "#e8ecf5", my: .5 }} />
//               <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 1, color: "#8892b0", fontWeight: 700, mt: 1, mb: 1 }}>Body Metrics</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Height (cm)" type="number" sx={hsInputSx}
//                 value={hsForm.height} onChange={e => setHsForm({ ...hsForm, height: e.target.value })} />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField fullWidth label="Weight (kg)" type="number" sx={hsInputSx}
//                 value={hsForm.weight} onChange={e => setHsForm({ ...hsForm, weight: e.target.value })} />
//             </Grid>
//             {estBMI && (
//               <Grid item xs={12}>
//                 <Box sx={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: "12px", px: 2, py: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
//                   <Typography sx={{ fontSize: "1.4rem" }}>⚖️</Typography>
//                   <Box>
//                     <Typography sx={{ fontSize: ".7rem", color: "#8892b0", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Estimated BMI</Typography>
//                     <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#7c3aed" }}>{estBMI}</Typography>
//                   </Box>
//                 </Box>
//               </Grid>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: "20px 24px", borderTop: "1px solid #e8ecf5", gap: 1 }}>
//           <Button onClick={() => setHsDialog(false)} sx={{ color: "#8892b0", textTransform: "none", fontWeight: 600, borderRadius: "10px" }}>Cancel</Button>
//           <Button onClick={handleHsSave} disabled={hsSaving} variant="contained"
//             sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "10px", textTransform: "none", fontWeight: 700, px: 3, boxShadow: "0 3px 12px rgba(79,110,247,.3)" }}>
//             {hsSaving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : hsEditId ? "Update Record" : "Save Reading"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={hsSnack.open} autoHideDuration={3000} onClose={() => setHsSnack({ ...hsSnack, open: false })}>
//         <Alert severity={hsSnack.sev} sx={{ borderRadius: "12px" }}>{hsSnack.msg}</Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Payment Modal
// // ─────────────────────────────────────────────────────────────────────────────
// function PaymentModal({ open, onClose, appointment, onPaid }) {
//   const [step,    setStep]    = useState("summary");
//   const [cardNum, setCardNum] = useState("");
//   const [cvv,     setCvv]     = useState("");
//   const [expiry,  setExpiry]  = useState("");
//   const [name,    setName]    = useState("");
//   const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "10px !important", background: "#f8f9ff !important" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" }, "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2563eb !important" } };
//   const handlePay = async () => {
//     setStep("processing");
//     setTimeout(async () => {
//       try {
//         await axios.post(`${BASE}/payments/create-order/${appointment.id}`);
//         const dummyPayId = "pay_dummy_" + Date.now();
//         await axios.post(`${BASE}/payments/confirm/${appointment.id}`, { razorpayPaymentId: dummyPayId });
//         setStep("done");
//         setTimeout(() => { onPaid(appointment.id); onClose(); setStep("summary"); }, 1800);
//       } catch (e) { console.error(e); setStep("summary"); alert("Payment failed. Try again."); }
//     }, 2000);
//   };
//   if (!appointment) return null;
//   const fee = appointment.doctor?.consultationFee || 0;
//   return (
//     <Modal open={open} onClose={() => { if (step !== "processing") { setStep("summary"); onClose(); } }}>
//       <Box className="rzp-modal-box">
//         <Box sx={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)", borderRadius: "14px", p: "18px 22px", mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <Box>
//             <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.5px" }}>razorpay</div>
//             <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: ".74rem", mt: .3 }}>Secure Payment Gateway</Typography>
//           </Box>
//           <Box sx={{ textAlign: "right" }}>
//             <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: ".7rem" }}>Amount to Pay</Typography>
//             <Typography sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, fontFamily: "'Cormorant Garamond',serif" }}>₹{fee}</Typography>
//           </Box>
//         </Box>
//         {step === "summary" && (
//           <>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Payment Details</Typography>
//             <Box sx={{ background: "#f8f9ff", border: "1px solid #e8ecf5", borderRadius: "12px", p: 2, mb: 3 }}>
//               {[["Doctor", `Dr. ${appointment.doctor?.name}`], ["Specialization", appointment.doctor?.specialization], ["Date", appointment.date], ["Time", appointment.timeSlot], ["Consultation Fee", `₹${fee}`]].map(([l, v]) => (
//                 <Box key={l} sx={{ display: "flex", justifyContent: "space-between", mb: .8 }}>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".82rem" }}>{l}</Typography>
//                   <Typography sx={{ color: "#1a1f36", fontWeight: 600, fontSize: ".82rem" }}>{v}</Typography>
//                 </Box>
//               ))}
//               <Divider sx={{ my: 1.5, borderColor: "#e8ecf5" }} />
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Typography sx={{ fontWeight: 700, color: "#1a1f36", fontSize: ".92rem" }}>Total</Typography>
//                 <Typography sx={{ fontWeight: 800, color: "#2563eb", fontSize: "1rem", fontFamily: "'Cormorant Garamond',serif" }}>₹{fee}</Typography>
//               </Box>
//             </Box>
//             <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: 1.5 }}>Card Details</Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//               <TextField size="small" fullWidth placeholder="Card Number" variant="outlined" sx={fieldSx} value={cardNum} onChange={e => setCardNum(e.target.value.replace(/\D/g, "").slice(0, 16))} />
//               <TextField size="small" fullWidth placeholder="Cardholder Name" variant="outlined" sx={fieldSx} value={name} onChange={e => setName(e.target.value)} />
//               <Grid container spacing={1.5}>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="MM/YY" variant="outlined" sx={fieldSx} value={expiry} onChange={e => setExpiry(e.target.value.slice(0, 5))} /></Grid>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="CVV" type="password" variant="outlined" sx={fieldSx} value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} /></Grid>
//               </Grid>
//             </Box>
//             <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
//               <Button onClick={() => onClose()} variant="outlined" fullWidth sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, borderColor: "#e8ecf5", color: "#8892b0" }}>Cancel</Button>
//               <Button onClick={handlePay} variant="contained" fullWidth sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, fontSize: ".92rem", background: "linear-gradient(135deg,#1e3a8a,#2563eb)", boxShadow: "0 4px 14px rgba(37,99,235,.35)" }}>Pay ₹{fee}</Button>
//             </Box>
//           </>
//         )}
//         {step === "processing" && (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress sx={{ color: "#2563eb", mb: 2 }} size={48} />
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, color: "#1a1f36", mb: .5 }}>Processing Payment…</Typography>
//             <Typography sx={{ fontSize: ".82rem", color: "#8892b0" }}>Please do not close this window</Typography>
//             <LinearProgress sx={{ mt: 3, borderRadius: 4, height: 4, background: "#e8ecf5", "& .MuiLinearProgress-bar": { background: "#2563eb" } }} />
//           </Box>
//         )}
//         {step === "done" && (
//           <Box sx={{ textAlign: "center", py: 2 }}>
//             <Box sx={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#34d399)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2, boxShadow: "0 6px 20px rgba(5,150,105,.3)" }}>
//               <CheckCircleIcon sx={{ color: "#fff", fontSize: 34 }} />
//             </Box>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: "#059669", mb: .5 }}>Payment Successful!</Typography>
//             <Typography sx={{ fontSize: ".85rem", color: "#8892b0" }}>₹{fee} paid successfully</Typography>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Feedback Modal
// // ─────────────────────────────────────────────────────────────────────────────
// function FeedbackModal({ open, onClose, appointment, onSubmitted }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [done, setDone] = useState(false);
//   const handleSubmit = async () => {
//     if (!rating) { alert("Please select a rating"); return; }
//     setLoading(true);
//     try {
//       await axios.post(`${BASE}/feedback`, { appointmentId: appointment.id, doctorId: appointment.doctor?.id, patientId: appointment.patient?.id, rating, comment });
//       setDone(true); onSubmitted(appointment.id);
//       setTimeout(() => { setDone(false); setRating(0); setComment(""); onClose(); }, 1500);
//     } catch {
//       setDone(true); onSubmitted(appointment.id);
//       setTimeout(() => { setDone(false); setRating(0); setComment(""); onClose(); }, 1500);
//     } finally { setLoading(false); }
//   };
//   if (!appointment) return null;
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="fb-modal-box">
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#1a1f36" }}>Rate Your Experience</Typography>
//           <IconButton size="small" onClick={onClose} sx={{ background: "#f5f7ff", border: "1px solid #e8ecf5", borderRadius: "9px" }}><CloseIcon sx={{ fontSize: 16 }} /></IconButton>
//         </Box>
//         {done ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>⭐</Typography>
//             <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#059669" }}>Thank you for your feedback!</Typography>
//           </Box>
//         ) : (
//           <>
//             <Typography sx={{ fontSize: ".8rem", color: "#8892b0", mb: 2 }}>Dr. {appointment.doctor?.name} · {appointment.date}</Typography>
//             <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//               <Rating size="large" value={rating} onChange={(_, v) => setRating(v)} sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
//             </Box>
//             <TextField fullWidth multiline rows={3} placeholder="Share your experience (optional)…" variant="outlined" value={comment} onChange={e => setComment(e.target.value)}
//               sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "12px !important", background: "#f8f9ff !important" } }} />
//             <Button onClick={handleSubmit} variant="contained" fullWidth disabled={loading}
//               sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700 }}>
//               {loading ? "Submitting…" : "Submit Feedback"}
//             </Button>
//           </>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Upload Record Modal
// // ─────────────────────────────────────────────────────────────────────────────
// function UploadRecordModal({ open, onClose, patientId, onUploaded }) {
//   const [form, setForm] = useState({ title: "", recordType: "LAB_REPORT", recordDate: "", issuedBy: "", description: "" });
//   const [file, setFile] = useState(null);
//   const [dragOver, setDragOver] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const fileRef = useRef();
//   const handleFile = f => { if (!f) return; if (f.size > 10 * 1024 * 1024) { setError("File too large. Max 10 MB."); return; } setError(""); setFile(f); };
//   const handleSubmit = async () => {
//     if (!form.title) { setError("Title is required."); return; }
//     setLoading(true); setError("");
//     try {
//       const fd = new FormData();
//       fd.append("patientId", patientId); fd.append("title", form.title); fd.append("recordType", form.recordType);
//       fd.append("recordDate", form.recordDate); fd.append("issuedBy", form.issuedBy); fd.append("description", form.description);
//       if (file) fd.append("file", file);
//       const res = await axios.post(`${BASE}/medical-records/upload`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       onUploaded(res.data);
//       setForm({ title: "", recordType: "LAB_REPORT", recordDate: "", issuedBy: "", description: "" });
//       setFile(null); onClose();
//     } catch (e) { setError(e?.response?.data || "Upload failed. Try again."); }
//     finally { setLoading(false); }
//   };
//   const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px !important", background: "#f8f9ff !important" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" }, "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4f6ef7 !important" } };
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="upload-modal-box">
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: "#1a1f36" }}>Add Medical Record</Typography>
//           <IconButton size="small" onClick={onClose} sx={{ background: "#f5f7ff", border: "1px solid #e8ecf5", borderRadius: "9px" }}><CloseIcon sx={{ fontSize: 16 }} /></IconButton>
//         </Box>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Title *</Typography>
//             <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Blood Test Report — Jan 2025" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} sx={fieldSx} /></Box>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Record Type</Typography>
//               <Select fullWidth size="small" value={form.recordType} onChange={e => setForm({ ...form, recordType: e.target.value })} sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" }, "& .MuiSelect-select": { borderRadius: "12px", background: "#f8f9ff" } }}>
//                 {RECORD_TYPES.map(t => <MenuItem key={t} value={t}>{t.replace("_", " ")}</MenuItem>)}
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Date</Typography>
//               <TextField fullWidth size="small" type="date" variant="outlined" value={form.recordDate} onChange={e => setForm({ ...form, recordDate: e.target.value })} sx={fieldSx} />
//             </Grid>
//           </Grid>
//           <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Issued By</Typography>
//             <TextField fullWidth size="small" variant="outlined" placeholder="e.g. Dr. Ramesh Kumar" value={form.issuedBy} onChange={e => setForm({ ...form, issuedBy: e.target.value })} sx={fieldSx} /></Box>
//           <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Notes</Typography>
//             <TextField fullWidth size="small" multiline rows={2} variant="outlined" placeholder="Optional notes" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} sx={fieldSx} /></Box>
//           <Box>
//             <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Attach File (PDF/Image — max 10 MB)</Typography>
//             <div className={`drop-zone ${dragOver ? "dragover" : ""}`} onClick={() => fileRef.current?.click()} onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}>
//               <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={e => handleFile(e.target.files[0])} />
//               <UploadFileIcon sx={{ fontSize: 32, color: "#c0c8e0", mb: 1 }} />
//               {file ? <Typography sx={{ fontSize: ".85rem", fontWeight: 600, color: "#4f6ef7" }}>{file.name}</Typography>
//                     : <Typography sx={{ fontSize: ".82rem", color: "#8892b0" }}>Click or drag & drop your file here</Typography>}
//             </div>
//           </Box>
//           {error && <Box sx={{ background: "#fff1f3", border: "1px solid rgba(225,29,72,.2)", borderRadius: "10px", padding: "10px 14px", fontSize: ".83rem", color: "#e11d48", fontWeight: 500 }}>⚠ {error}</Box>}
//           {loading && <LinearProgress sx={{ borderRadius: 4, height: 4 }} />}
//           <Button onClick={handleSubmit} variant="contained" disabled={loading}
//             sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700, fontSize: ".92rem", py: 1.4, boxShadow: "0 4px 14px rgba(79,110,247,.28)" }}>
//             {loading ? "Uploading…" : "Save Record"}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Record Card
// // ─────────────────────────────────────────────────────────────────────────────
// function RecordCard({ record, onDelete }) {
//   const [showPreview, setShowPreview] = useState(false);
//   const sc = RECORD_COLORS[record.recordType] || RECORD_COLORS.OTHER;
//   const fileUrl = record.fileName ? `${BASE}/medical-records/file/${record.fileName}` : null;
//   const lower = (record.fileName || "").toLowerCase();
//   const isPdf = lower.endsWith(".pdf");
//   const isImage = lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".webp");
//   return (
//     <div className="record-card">
//       <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
//         <Box sx={{ width: 46, height: 46, borderRadius: "13px", flexShrink: 0, background: sc.bg, border: `1px solid ${sc.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <DescriptionIcon sx={{ color: sc.color, fontSize: 22 }} />
//         </Box>
//         <Box sx={{ flex: 1, minWidth: 0 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: .5 }}>
//             <Typography sx={{ fontWeight: 700, fontSize: ".92rem", color: "#1a1f36" }}>{record.title}</Typography>
//             <Chip label={record.recordType?.replace("_", " ")} size="small" sx={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontWeight: 600, fontSize: ".68rem", height: 22 }} />
//           </Box>
//           {record.issuedBy && <Typography sx={{ fontSize: ".78rem", color: "#8892b0", mb: .4 }}>👤 {record.issuedBy}</Typography>}
//           {record.recordDate && <Typography sx={{ fontSize: ".78rem", color: "#8892b0", mb: .4 }}>📅 {record.recordDate}</Typography>}
//           {record.description && <Typography sx={{ fontSize: ".8rem", color: "#4a5278", mt: .5 }}>{record.description}</Typography>}
//           {fileUrl && (
//             <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
//               {(isPdf || isImage) && (
//                 <button onClick={() => setShowPreview(p => !p)} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: ".76rem", fontWeight: 600, background: "linear-gradient(135deg,#4f6ef7,#818cf8)", color: "#fff", border: "none", fontFamily: "'Outfit',sans-serif" }}>
//                   {showPreview ? <><VisibilityOffIcon sx={{ fontSize: 13 }} /> Hide</> : <><VisibilityIcon sx={{ fontSize: 13 }} /> Preview</>}
//                 </button>
//               )}
//               <a href={fileUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, fontSize: ".76rem", fontWeight: 600, textDecoration: "none", background: "#eef1fe", color: "#4f6ef7", border: "1px solid rgba(79,110,247,.2)" }}><OpenInNewIcon sx={{ fontSize: 13 }} /> Open</a>
//               <a href={fileUrl} download={record.fileName} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, fontSize: ".76rem", fontWeight: 600, textDecoration: "none", background: "#f5f7ff", color: "#4a5278", border: "1px solid #e8ecf5" }}><DownloadIcon sx={{ fontSize: 13 }} /> Download</a>
//             </Box>
//           )}
//           {showPreview && fileUrl && (
//             <div className="file-preview-wrap">
//               {isPdf && <iframe src={fileUrl} title={record.title} />}
//               {isImage && <img src={fileUrl} alt={record.title} />}
//             </div>
//           )}
//         </Box>
//         <IconButton size="small" onClick={() => onDelete(record.id)} sx={{ color: "#e11d48", background: "#fff1f3", borderRadius: "9px", flexShrink: 0, "&:hover": { background: "#fce7f3" } }}>
//           <DeleteIcon sx={{ fontSize: 17 }} />
//         </IconButton>
//       </Box>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Book Appointment Inline
// // ─────────────────────────────────────────────────────────────────────────────
// function BookAppointmentInline({ patient, doctors }) {
//   const [searchQuery,  setSearchQuery]  = useState("");
//   const [activeSpec,   setActiveSpec]   = useState("All");
//   const [bookingDocId, setBookingDocId] = useState(null);
//   const [bookForm,     setBookForm]     = useState({ date: "", timeSlot: "", description: "" });
//   const [bookFile,     setBookFile]     = useState(null);
//   const [bookLoading,  setBookLoading]  = useState(false);
//   const [bookSuccess,  setBookSuccess]  = useState(false);
//   const fileRef = useRef();
//   const specializations = ["All", ...Array.from(new Set(doctors.map(d => d.specialization).filter(Boolean))).sort()];
//   const filteredDoctors = doctors.filter(doc => {
//     const bySpec = activeSpec === "All" || doc.specialization === activeSpec;
//     const q = searchQuery.toLowerCase();
//     const bySearch = !q || doc.name?.toLowerCase().includes(q) || doc.specialization?.toLowerCase().includes(q) || doc.hospital?.toLowerCase().includes(q);
//     return bySpec && bySearch;
//   });
//   const selectedDoc = doctors.find(d => d.id === bookingDocId);
//   const handleBook = async () => {
//     if (!bookForm.date || !bookForm.timeSlot) { alert("Please select date and time slot."); return; }
//     setBookLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("patientId", patient.id); fd.append("doctorId", bookingDocId);
//       fd.append("date", bookForm.date); fd.append("timeSlot", bookForm.timeSlot);
//       fd.append("description", bookForm.description);
//       if (bookFile) fd.append("report", bookFile);
//       await axios.post(`${BASE}/appointments/book`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       setBookSuccess(true); setBookForm({ date: "", timeSlot: "", description: "" }); setBookFile(null); setBookingDocId(null);
//       setTimeout(() => setBookSuccess(false), 3000);
//     } catch { alert("Booking failed. Please try again."); }
//     finally { setBookLoading(false); }
//   };
//   if (bookingDocId && selectedDoc) {
//     const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px !important", background: "#f8f9ff !important" } };
//     return (
//       <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}>
//         <Box sx={{ mb: 3 }}><Button size="small" onClick={() => setBookingDocId(null)} sx={{ color: "#4f6ef7", textTransform: "none", fontWeight: 600, fontSize: ".82rem", p: 0 }}>← Back to Doctors</Button></Box>
//         <Card className="light-card" sx={{ p: 4, maxWidth: 560 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
//             <Avatar className="av-blue" sx={{ width: 56, height: 56, borderRadius: "16px", fontSize: "1.4rem", fontFamily: "'Cormorant Garamond',serif", fontWeight: 700 }}>{selectedDoc.name?.charAt(0)}</Avatar>
//             <Box>
//               <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, color: "#1a1f36" }}>Dr. {selectedDoc.name}</Typography>
//               <Typography sx={{ fontSize: ".8rem", color: "#8892b0" }}>{selectedDoc.specialization} · {selectedDoc.hospital}</Typography>
//               {selectedDoc.consultationFee > 0 && <Chip label={`₹${selectedDoc.consultationFee} consultation fee`} size="small" sx={{ mt: .5, background: "#fffbeb", color: "#d97706", border: "1px solid #fcd34d", fontWeight: 600, fontSize: ".72rem" }} />}
//             </Box>
//           </Box>
//           <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />
//           {bookSuccess && (
//             <Box sx={{ background: "#ecfdf5", border: "1px solid rgba(5,150,105,.2)", borderRadius: "12px", p: 2, mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
//               <CheckCircleIcon sx={{ color: "#059669", fontSize: 22 }} />
//               <Box><Typography sx={{ fontWeight: 700, color: "#059669", fontSize: ".9rem" }}>Appointment Booked!</Typography><Typography sx={{ fontSize: ".78rem", color: "#065f46" }}>Your request has been sent to the doctor.</Typography></Box>
//             </Box>
//           )}
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Preferred Date *</Typography>
//               <TextField fullWidth size="small" type="date" variant="outlined" value={bookForm.date} onChange={e => setBookForm({ ...bookForm, date: e.target.value })} sx={fieldSx} /></Box>
//             <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Time Slot *</Typography>
//               <Select fullWidth size="small" value={bookForm.timeSlot} onChange={e => setBookForm({ ...bookForm, timeSlot: e.target.value })} sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" }, "& .MuiSelect-select": { borderRadius: "12px", background: "#f8f9ff" } }}>
//                 <MenuItem value="">Select time</MenuItem>
//                 {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
//               </Select></Box>
//             <Box><Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Symptoms / Description</Typography>
//               <TextField fullWidth size="small" multiline rows={3} variant="outlined" placeholder="Describe your symptoms…" value={bookForm.description} onChange={e => setBookForm({ ...bookForm, description: e.target.value })} sx={fieldSx} /></Box>
//             <Box>
//               <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: .75 }}>Attach Report (optional)</Typography>
//               <Box sx={{ border: "2px dashed #c7cee8", borderRadius: "12px", p: 2.5, textAlign: "center", cursor: "pointer", background: "#f8f9ff" }} onClick={() => fileRef.current?.click()}>
//                 <input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={e => setBookFile(e.target.files[0])} />
//                 <UploadFileIcon sx={{ fontSize: 26, color: "#c0c8e0", mb: .5 }} />
//                 {bookFile ? <Typography sx={{ fontSize: ".82rem", fontWeight: 600, color: "#4f6ef7" }}>{bookFile.name}</Typography>
//                           : <Typography sx={{ fontSize: ".8rem", color: "#8892b0" }}>Click to attach a report</Typography>}
//               </Box>
//             </Box>
//             <Button onClick={handleBook} variant="contained" disabled={bookLoading}
//               sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700, fontSize: ".92rem", py: 1.4, boxShadow: "0 4px 14px rgba(79,110,247,.28)" }}>
//               {bookLoading ? "Booking…" : "Confirm Appointment →"}
//             </Button>
//           </Box>
//         </Card>
//       </motion.div>
//     );
//   }
//   return (
//     <>
//       <TextField fullWidth size="small" placeholder="Search doctor name, specialization, hospital…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
//         InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#b0b8d0", fontSize: 20 }} /></InputAdornment> }}
//         sx={{ mb: 2.5, "& .MuiOutlinedInput-root": { borderRadius: "14px", background: "#fff", "& fieldset": { borderColor: "#e8ecf5" }, "&:hover fieldset": { borderColor: "#c7cee8" }, "&.Mui-focused fieldset": { borderColor: "#4f6ef7" } } }} />
//       <Box sx={{ mb: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}><FilterListIcon sx={{ fontSize: 16, color: "#8892b0" }} /><Typography sx={{ fontSize: ".72rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600 }}>Filter by Specialization</Typography></Box>
//         <div className="spec-chip-wrap">{specializations.map(spec => <div key={spec} className={`spec-chip ${activeSpec === spec ? "active" : ""}`} onClick={() => setActiveSpec(spec)}>{spec}</div>)}</div>
//       </Box>
//       <Box sx={{ mb: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Typography sx={{ fontSize: ".8rem", color: "#8892b0" }}>{filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} found</Typography>
//         {(searchQuery || activeSpec !== "All") && <Typography sx={{ fontSize: ".78rem", color: "#4f6ef7", fontWeight: 600, cursor: "pointer" }} onClick={() => { setSearchQuery(""); setActiveSpec("All"); }}>Clear filters ✕</Typography>}
//       </Box>
//       {filteredDoctors.length === 0 ? (
//         <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}><Typography sx={{ fontSize: "2.5rem", mb: 1 }}>🔍</Typography><Typography sx={{ fontWeight: 500 }}>No doctors found.</Typography></Box>
//       ) : (
//         <Grid container spacing={2.5}>
//           {filteredDoctors.map((doc, i) => (
//             <Grid item xs={12} sm={6} md={4} key={doc.id}>
//               <motion.div whileHover={{ scale: 1.03 }}>
//                 <Card className="light-card" sx={{ p: 3 }}>
//                   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
//                     <Avatar className={getAvatarClass(i)} sx={{ width: 68, height: 68, borderRadius: "20px", mb: 1.5, fontSize: "1.8rem", fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, boxShadow: "0 6px 20px rgba(79,110,247,.22)" }}>{doc.name?.charAt(0)}</Avatar>
//                     <Typography sx={{ fontWeight: 700, fontSize: ".95rem", color: "#1a1f36" }}>Dr. {doc.name}</Typography>
//                     <Chip label={doc.specialization || "General"} size="small" sx={{ mt: .75, mb: .5, background: "#eef1fe", color: "#4f6ef7", border: "1px solid rgba(79,110,247,.18)", fontWeight: 600, fontSize: ".72rem" }} />
//                     {doc.qualification && <Typography sx={{ fontSize: ".76rem", color: "#8892b0", mb: .3 }}>{doc.qualification}</Typography>}
//                     {doc.experience > 0 && <Typography sx={{ fontSize: ".76rem", color: "#8892b0", mb: .3 }}>🏅 {doc.experience} yrs experience</Typography>}
//                     {doc.hospital && <Typography sx={{ fontSize: ".76rem", color: "#8892b0", mb: .5 }}>🏥 {doc.hospital}</Typography>}
//                     {doc.consultationFee > 0 && (
//                       <Box sx={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "10px", px: 1.5, py: .75, mb: 2, display: "flex", alignItems: "center", gap: .75 }}>
//                         <CurrencyRupeeIcon sx={{ fontSize: 14, color: "#d97706" }} />
//                         <Typography sx={{ fontSize: ".8rem", fontWeight: 700, color: "#d97706" }}>₹{doc.consultationFee}</Typography>
//                       </Box>
//                     )}
//                     <Button variant="contained" onClick={() => setBookingDocId(doc.id)}
//                       sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: ".85rem", boxShadow: "0 3px 12px rgba(79,110,247,.28)", "&:hover": { boxShadow: "0 6px 20px rgba(79,110,247,.38)" } }}>
//                       Book Now →
//                     </Button>
//                   </Box>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Main Dashboard
// // ─────────────────────────────────────────────────────────────────────────────
// export default function PatientDashboard() {
//   const { user }  = useContext(AuthContext);
//   const userId    = user?.id || localStorage.getItem("userId");
//   const navigate  = useNavigate();

//   const [patient,          setPatient]          = useState(null);
//   const [appointments,     setAppointments]     = useState([]);
//   const [doctors,          setDoctors]          = useState([]);
//   const [medicalRecords,   setMedicalRecords]   = useState([]);
//   const [prescriptions,    setPrescriptions]    = useState([]);
//   const [payments,         setPayments]         = useState({});
//   const [feedbackDone,     setFeedbackDone]     = useState({});
//   const [view,             setView]             = useState("dashboard");
//   const [sidebarOpen,      setSidebarOpen]      = useState(false);
//   const [loading,          setLoading]          = useState(true);
//   const [profileMissing,   setProfileMissing]   = useState(false);
//   const [error,            setError]            = useState("");
//   const [uploadOpen,       setUploadOpen]       = useState(false);
//   const [recordTypeFilter, setRecordTypeFilter] = useState("ALL");
//   const [payAppt,          setPayAppt]          = useState(null);
//   const [fbAppt,           setFbAppt]           = useState(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const patRes = await axios.get(`${BASE}/patient/user/${userId}`);
//         setPatient(patRes.data);
//       } catch (err) {
//         if (err.response?.status === 404) { setProfileMissing(true); setLoading(false); return; }
//         setError("Failed to load patient."); setLoading(false); return;
//       }
//       try { const dRes = await axios.get(`${BASE}/doctor`); setDoctors(dRes.data); } catch {}
//       setLoading(false);
//     };
//     if (userId) load(); else { setError("User ID missing."); setLoading(false); }
//   }, [userId]);

//   useEffect(() => {
//     if (!patient) return;
//     axios.get(`${BASE}/appointments/patient/${patient.id}`).then(r => setAppointments(r.data)).catch(() => {});
//     axios.get(`${BASE}/medical-records/patient/${patient.id}`).then(r => setMedicalRecords(r.data)).catch(() => {});
//     axios.get(`${BASE}/prescriptions/patient/${patient.id}`).then(r => setPrescriptions(r.data)).catch(() => {});
//     axios.get(`${BASE}/payments/patient/${patient.id}`).then(r => {
//       const map = {}; r.data.forEach(p => { map[p.appointment?.id] = p; }); setPayments(map);
//     }).catch(() => {});
//   }, [patient]);

//   const handleLogout   = () => { localStorage.removeItem("user"); navigate("/"); };
//   const handleNavClick = (k) => { setView(k); setSidebarOpen(false); };
//   const countStatus    = (s) => appointments.filter(a => a.status === s).length;
//   const filteredRecords = recordTypeFilter === "ALL" ? medicalRecords : medicalRecords.filter(r => r.recordType === recordTypeFilter);

//   const handleDeleteRecord = async (id) => {
//     if (!window.confirm("Delete this medical record?")) return;
//     try { await axios.delete(`${BASE}/medical-records/${id}`); setMedicalRecords(prev => prev.filter(r => r.id !== id)); }
//     catch { alert("Failed to delete record"); }
//   };

//   const handlePaymentDone  = (appointmentId) => setPayments(prev => ({ ...prev, [appointmentId]: { status: "SUCCESS" } }));
//   const handleFeedbackDone = (appointmentId) => setFeedbackDone(prev => ({ ...prev, [appointmentId]: true }));
//   const unpaidCount = appointments.filter(a => a.status === "APPROVED" && payments[a.id]?.status !== "SUCCESS").length;

//   const menuItems = [
//     { key: "dashboard",     label: "Dashboard",        icon: <DashboardIcon     sx={{ fontSize: 18 }} /> },
//     { key: "appointments",  label: "My Appointments",  icon: <EventIcon         sx={{ fontSize: 18 }} />, badge: unpaidCount },
//     { key: "book",          label: "Book Appointment", icon: <AddIcon           sx={{ fontSize: 18 }} /> },
//     { key: "records",       label: "Medical Records",  icon: <FolderIcon        sx={{ fontSize: 18 }} /> },
//     { key: "prescriptions", label: "Prescriptions",    icon: <LocalPharmacyIcon sx={{ fontSize: 18 }} /> },
//     { key: "healthstatus",  label: "Health Status",    icon: <MonitorHeartIcon  sx={{ fontSize: 18 }} /> },
//     { key: "health",        label: "Health Stats",     icon: <BarChartIcon      sx={{ fontSize: 18 }} /> },
//     { key: "profile",       label: "Profile",          icon: <PersonIcon        sx={{ fontSize: 18 }} /> },
//   ];

//   if (loading) return (<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f5f7ff" }}><CircularProgress sx={{ color: "#4f6ef7" }} /></Box>);
//   if (error)   return (<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f5f7ff" }}><Alert severity="error">{error}</Alert></Box>);
//   if (profileMissing || !patient) return (
//     <PatientProfileForm userId={userId} onCreated={created => { setPatient(created); setProfileMissing(false); axios.get(`${BASE}/doctor`).then(r => setDoctors(r.data)).catch(() => {}); }} />
//   );

//   return (
//     <Box sx={{ minHeight: "100vh", background: "#f5f7ff", fontFamily: "'Outfit',sans-serif" }}>
//       <div className="blob blob-1" /><div className="blob blob-2" />
//       {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

//       {/* Sidebar */}
//       <div className={`portal-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-top-row">
//           <div className="sidebar-logo"><div className="logo-icon">✦</div>Med<span className="logo-accent">Vault</span></div>
//           <div className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}><CloseIcon sx={{ fontSize: 16 }} /></div>
//         </div>
//         <div className="nav-section-label">Navigation</div>
//         {menuItems.map(item => (
//           <NavItem key={item.key} icon={item.icon} label={item.label} active={view === item.key} onClick={() => handleNavClick(item.key)} badge={item.badge || 0} />
//         ))}
//         <div className="sidebar-spacer" />
//         <div className="user-card">
//           <div className="user-mini-av">{patient.name?.charAt(0)}</div>
//           <Box>
//             <Typography sx={{ fontSize: ".85rem", fontWeight: 600, color: "#1a1f36", lineHeight: 1.2 }}>{patient.name}</Typography>
//             <Typography sx={{ fontSize: ".72rem", color: "#8892b0" }}>Patient</Typography>
//           </Box>
//         </div>
//         <button onClick={handleLogout}
//           style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 11, cursor: "pointer", fontSize: ".875rem", fontWeight: 500, color: "#e11d48", border: "1px solid transparent", background: "none", width: "100%", fontFamily: "'Outfit',sans-serif", transition: "all .18s" }}
//           onMouseEnter={e => { e.currentTarget.style.background = "#fff1f3"; e.currentTarget.style.borderColor = "rgba(225,29,72,.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}>
//           <div className="nav-icon-wrap" style={{ background: "#fff1f3", color: "#e11d48" }}><LogoutIcon sx={{ fontSize: 16 }} /></div>
//           Sign Out
//         </button>
//       </div>

//       {/* Top bar */}
//       <div className="portal-topbar">
//         <div className="topbar-left">
//           <div className="hamburger-btn" onClick={() => setSidebarOpen(true)}><MenuIcon sx={{ fontSize: 20 }} /></div>
//           <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "1.3rem", color: "#4f6ef7" }}>
//             Med<span style={{ color: "#7c3aed" }}>Vault</span>
//           </Typography>
//         </div>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           {unpaidCount > 0 && (
//             <Box onClick={() => handleNavClick("appointments")} sx={{ display: "flex", alignItems: "center", gap: .75, cursor: "pointer", background: "#fff7ed", border: "1px solid #fcd34d", borderRadius: "10px", px: 1.5, py: .75 }}>
//               <NotificationsIcon sx={{ fontSize: 16, color: "#d97706" }} />
//               <Typography sx={{ fontSize: ".75rem", fontWeight: 600, color: "#d97706" }}>{unpaidCount} fee pending</Typography>
//             </Box>
//           )}
//           <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
//             sx={{ color: "#e11d48", borderColor: "rgba(225,29,72,.3)", textTransform: "none", borderRadius: 2, border: "1px solid", fontFamily: "'Outfit',sans-serif" }}>
//             Logout
//           </Button>
//         </Box>
//       </div>

//       {/* Content */}
//       <Box sx={{ p: { xs: 2, md: "36px 44px" }, position: "relative", zIndex: 1 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

//             {/* DASHBOARD */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Good morning, {patient.name?.split(" ")[0]} ☀️</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>Here's a summary of your health portal</Typography>
//                 </Box>
//                 {appointments.filter(a => a.status === "APPROVED" && payments[a.id]?.status !== "SUCCESS").map(appt => (
//                   <Box key={appt.id} className="pay-banner" sx={{ mb: 2 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                       <Box sx={{ width: 38, height: 38, borderRadius: "11px", background: "linear-gradient(135deg,#f59e0b,#fbbf24)", display: "flex", alignItems: "center", justifyContent: "center" }}><NotificationsIcon sx={{ color: "#fff", fontSize: 20 }} /></Box>
//                       <Box>
//                         <Typography sx={{ fontWeight: 600, fontSize: ".88rem", color: "#92400e" }}>Appointment Confirmed — Fee Pending</Typography>
//                         <Typography sx={{ fontSize: ".78rem", color: "#a16207" }}>Dr. {appt.doctor?.name} · {appt.date} · ₹{appt.doctor?.consultationFee}</Typography>
//                       </Box>
//                     </Box>
//                     <Button onClick={() => setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{ fontSize: 16 }} />}
//                       sx={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", borderRadius: "10px", textTransform: "none", fontWeight: 700, boxShadow: "0 3px 10px rgba(245,158,11,.35)", whiteSpace: "nowrap" }}>
//                       Pay ₹{appt.doctor?.consultationFee}
//                     </Button>
//                   </Box>
//                 ))}
//                 <Box className="hero-card" sx={{ mb: 4, display: "flex", alignItems: "center", gap: 3 }}>
//                   <Avatar className="av-blue" sx={{ width: 80, height: 80, borderRadius: "22px", fontSize: "2rem", fontFamily: "'Cormorant Garamond',serif", boxShadow: "0 8px 24px rgba(79,110,247,.3)" }}>{patient.name?.charAt(0)}</Avatar>
//                   <Box>
//                     <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: "#1a1f36" }}>{patient.name}</Typography>
//                     <Typography sx={{ color: "#8892b0", fontSize: ".82rem", mt: .5 }}>Patient ID · #{patient.id}</Typography>
//                     <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
//                       {[patient.gender, `Age ${patient.age}`, patient.contact].filter(Boolean).map((v, i) => (
//                         <Chip key={i} label={v} size="small" sx={{ background: "#eef1fe", color: "#4f6ef7", border: "1px solid rgba(79,110,247,.18)", fontWeight: 500, fontSize: ".75rem" }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </Box>
//                 <Grid container spacing={2.5} sx={{ mb: 4 }}>
//                   <Grid item xs={6} sm={3}><StatCard label="Appointments"    value={appointments.length}     icon="📅" color="#4f6ef7" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Approved"        value={countStatus("APPROVED")} icon="✓"  color="#059669" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Prescriptions"   value={prescriptions.length}    icon="💊" color="#7c3aed" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Medical Records" value={medicalRecords.length}   icon="📋" color="#0891b2" /></Grid>
//                 </Grid>
//                 <div className="sec-heading">Recent Appointments</div>
//                 <Grid container spacing={2.5}>
//                   {appointments.slice(0, 3).map((appt, i) => (
//                     <Grid item xs={12} md={4} key={appt.id}>
//                       <motion.div whileHover={{ scale: 1.03 }}>
//                         <Card className="light-card">
//                           <CardContent sx={{ p: "20px !important" }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//                               <Avatar className={getAvatarClass(i)} sx={{ width: 44, height: 44, borderRadius: "12px", fontSize: "1rem", fontWeight: 700 }}>{appt.doctor?.name?.charAt(0)}</Avatar>
//                               <Box>
//                                 <Typography sx={{ fontWeight: 600, fontSize: ".92rem", color: "#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
//                                 <Typography sx={{ fontSize: ".76rem", color: "#8892b0" }}>{appt.doctor?.specialization}</Typography>
//                               </Box>
//                             </Box>
//                             <Typography sx={{ fontSize: ".82rem", color: "#4a5278", mb: 1 }}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
//                             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: .75 }}>
//                               <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight: 600, fontSize: ".72rem" }} />
//                               {appt.status === "APPROVED" && payments[appt.id]?.status !== "SUCCESS" && (
//                                 <Chip label={`₹${appt.doctor?.consultationFee} pending`} size="small" onClick={() => setPayAppt(appt)}
//                                   sx={{ background: "#fff7ed", color: "#d97706", border: "1px solid #fcd34d", fontWeight: 600, fontSize: ".68rem", cursor: "pointer" }} />
//                               )}
//                               {payments[appt.id]?.status === "SUCCESS" && (
//                                 <Chip label="Paid ✓" size="small" sx={{ background: "#ecfdf5", color: "#059669", border: "1px solid rgba(5,150,105,.2)", fontWeight: 600, fontSize: ".68rem" }} />
//                               )}
//                             </Box>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     </Grid>
//                   ))}
//                   {appointments.length === 0 && (
//                     <Grid item xs={12}>
//                       <Box sx={{ textAlign: "center", py: 5, color: "#8892b0" }}>
//                         <Typography sx={{ fontSize: "2rem", mb: 1 }}>📅</Typography>
//                         <Typography sx={{ fontWeight: 500 }}>No appointments yet.</Typography>
//                         <Button onClick={() => setView("book")} size="small" variant="contained" sx={{ mt: 2, background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "10px", textTransform: "none", fontWeight: 600 }}>Book your first appointment →</Button>
//                       </Box>
//                     </Grid>
//                   )}
//                 </Grid>
//               </>
//             )}

//             {/* MY APPOINTMENTS */}
//             {view === "appointments" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>My Appointments</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>{appointments.length} total · {countStatus("APPROVED")} approved</Typography>
//                 </Box>
//                 {appointments.filter(a => a.status === "APPROVED" && payments[a.id]?.status !== "SUCCESS").map(appt => (
//                   <Box key={appt.id} className="pay-banner">
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                       <CurrencyRupeeIcon sx={{ color: "#d97706", fontSize: 20, flexShrink: 0 }} />
//                       <Box>
//                         <Typography sx={{ fontWeight: 600, fontSize: ".85rem", color: "#92400e" }}>Consultation fee pending for Dr. {appt.doctor?.name}</Typography>
//                         <Typography sx={{ fontSize: ".76rem", color: "#a16207" }}>{appt.date} · {appt.timeSlot} · ₹{appt.doctor?.consultationFee}</Typography>
//                       </Box>
//                     </Box>
//                     <Button onClick={() => setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{ fontSize: 16 }} />}
//                       sx={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", borderRadius: "10px", textTransform: "none", fontWeight: 700, boxShadow: "0 3px 10px rgba(245,158,11,.35)", whiteSpace: "nowrap" }}>
//                       Pay ₹{appt.doctor?.consultationFee}
//                     </Button>
//                   </Box>
//                 ))}
//                 {appointments.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>📅</Typography>
//                     <Typography sx={{ fontWeight: 500 }}>No appointments yet.</Typography>
//                     <Button onClick={() => setView("book")} size="small" variant="contained" sx={{ mt: 2, background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "10px", textTransform: "none", fontWeight: 600 }}>Book an appointment →</Button>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {appointments.map((appt, i) => {
//                       const isPaid = payments[appt.id]?.status === "SUCCESS";
//                       const hasFeedback = feedbackDone[appt.id];
//                       return (
//                         <Grid item xs={12} md={4} key={appt.id}>
//                           <motion.div whileHover={{ scale: 1.02 }}>
//                             <Card className="light-card">
//                               <CardContent sx={{ p: "24px !important" }}>
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//                                   <Avatar className={getAvatarClass(i)} sx={{ width: 48, height: 48, borderRadius: "14px", fontSize: "1.1rem", fontWeight: 700 }}>{appt.doctor?.name?.charAt(0)}</Avatar>
//                                   <Box sx={{ flex: 1 }}>
//                                     <Typography sx={{ fontWeight: 600, fontSize: ".95rem", color: "#1a1f36" }}>Dr. {appt.doctor?.name}</Typography>
//                                     <Typography sx={{ fontSize: ".76rem", color: "#8892b0" }}>{appt.doctor?.specialization}</Typography>
//                                   </Box>
//                                   <Chip label={appt.status || "PENDING"} color={getStatusColor(appt.status)} size="small" sx={{ fontWeight: 600, fontSize: ".7rem" }} />
//                                 </Box>
//                                 <Divider sx={{ mb: 1.5, borderColor: "#f0f2f8" }} />
//                                 <Typography sx={{ fontSize: ".82rem", color: "#4a5278", mb: .5 }}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
//                                 <Typography sx={{ fontSize: ".8rem", color: "#8892b0", mb: 1.5 }} noWrap>📝 {appt.description || "No description"}</Typography>
//                                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                                   {appt.status === "APPROVED" && !isPaid && (
//                                     <Button onClick={() => setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{ fontSize: 15 }} />}
//                                       sx={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", borderRadius: "9px", textTransform: "none", fontWeight: 700, boxShadow: "0 2px 8px rgba(245,158,11,.3)" }}>
//                                       Pay Consultation Fee ₹{appt.doctor?.consultationFee}
//                                     </Button>
//                                   )}
//                                   {isPaid && <Chip label="✓ Payment Confirmed" size="small" sx={{ background: "#ecfdf5", color: "#059669", border: "1px solid rgba(5,150,105,.2)", fontWeight: 600, alignSelf: "flex-start" }} />}
//                                   {appt.status === "APPROVED" && isPaid && !hasFeedback && (
//                                     <Button onClick={() => setFbAppt(appt)} size="small" variant="outlined" startIcon={<StarIcon sx={{ fontSize: 14 }} />}
//                                       sx={{ borderRadius: "9px", textTransform: "none", fontWeight: 600, fontSize: ".78rem", borderColor: "rgba(245,158,11,.4)", color: "#d97706", "&:hover": { background: "#fffbeb" } }}>
//                                       Rate this appointment
//                                     </Button>
//                                   )}
//                                   {hasFeedback && <Typography sx={{ fontSize: ".75rem", color: "#059669", fontWeight: 600, textAlign: "center" }}>⭐ Feedback submitted — Thank you!</Typography>}
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

//             {/* BOOK */}
//             {view === "book" && (
//               <>
//                 <Box sx={{ mb: 3 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Book Appointment</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>Find a doctor and book your appointment directly</Typography>
//                 </Box>
//                 <BookAppointmentInline patient={patient} doctors={doctors} />
//               </>
//             )}

//             {/* MEDICAL RECORDS */}
//             {view === "records" && (
//               <>
//                 <Box sx={{ mb: 4, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
//                   <Box>
//                     <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Medical Records</Typography>
//                     <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>{medicalRecords.length} record{medicalRecords.length !== 1 ? "s" : ""} stored securely</Typography>
//                   </Box>
//                   <Button variant="contained" startIcon={<UploadFileIcon />} onClick={() => setUploadOpen(true)}
//                     sx={{ background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700, fontSize: ".88rem", boxShadow: "0 4px 14px rgba(79,110,247,.28)" }}>
//                     Add Record
//                   </Button>
//                 </Box>
//                 <Box sx={{ mb: 3 }}>
//                   <div className="spec-chip-wrap">
//                     {["ALL", ...RECORD_TYPES].map(t => (
//                       <div key={t} className={`spec-chip ${recordTypeFilter === t ? "active" : ""}`} onClick={() => setRecordTypeFilter(t)}>{t === "ALL" ? "All" : t.replace("_", " ")}</div>
//                     ))}
//                   </div>
//                 </Box>
//                 {filteredRecords.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>📋</Typography>
//                     <Typography sx={{ fontWeight: 500 }}>{medicalRecords.length === 0 ? "No medical records yet." : "No records match this filter."}</Typography>
//                     {medicalRecords.length === 0 && <Button onClick={() => setUploadOpen(true)} size="small" variant="contained" sx={{ mt: 2, background: "linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius: "10px", textTransform: "none", fontWeight: 600 }}>Upload your first record →</Button>}
//                   </Box>
//                 ) : filteredRecords.map(record => <RecordCard key={record.id} record={record} onDelete={handleDeleteRecord} />)}
//               </>
//             )}

//             {/* PRESCRIPTIONS */}
//             {view === "prescriptions" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Prescriptions</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>{prescriptions.length} prescription{prescriptions.length !== 1 ? "s" : ""} from your doctors</Typography>
//                 </Box>
//                 {prescriptions.length === 0 ? (
//                   <Box sx={{ textAlign: "center", py: 8, color: "#8892b0" }}>
//                     <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>💊</Typography>
//                     <Typography sx={{ fontWeight: 500 }}>No prescriptions yet.</Typography>
//                     <Typography sx={{ fontSize: ".83rem", mt: .5 }}>Prescriptions appear after approved appointments and payment confirmation.</Typography>
//                   </Box>
//                 ) : prescriptions.map(rx => (
//                   <div key={rx.id} className="rx-card">
//                     <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
//                       <Box sx={{ width: 46, height: 46, borderRadius: "13px", flexShrink: 0, background: "#ecfdf5", border: "1px solid rgba(5,150,105,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><LocalPharmacyIcon sx={{ color: "#059669", fontSize: 22 }} /></Box>
//                       <Box sx={{ flex: 1 }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", mb: .75 }}>
//                           <Typography sx={{ fontWeight: 700, fontSize: ".95rem", color: "#1a1f36" }}>Dr. {rx.appointment?.doctor?.name}</Typography>
//                           {rx.issuedDate && <Chip label={rx.issuedDate} size="small" sx={{ background: "#f5f7ff", color: "#8892b0", fontSize: ".68rem", height: 20 }} />}
//                         </Box>
//                         <Typography sx={{ fontSize: ".8rem", color: "#8892b0", mb: .75 }}>{rx.appointment?.doctor?.specialization} · {rx.appointment?.date}</Typography>
//                         {rx.diagnosis && (
//                           <Box sx={{ background: "#f0fdf4", border: "1px solid rgba(5,150,105,.15)", borderRadius: "10px", px: 1.5, py: 1, mb: 1.5 }}>
//                             <Typography sx={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".8px", color: "#059669", fontWeight: 700, mb: .3 }}>Diagnosis</Typography>
//                             <Typography sx={{ fontSize: ".88rem", fontWeight: 600, color: "#1a1f36" }}>🩺 {rx.diagnosis}</Typography>
//                           </Box>
//                         )}
//                         {rx.medicines && (
//                           <Box sx={{ background: "#f8f9ff", border: "1px solid #e8ecf5", borderRadius: "10px", px: 1.5, py: 1, mb: 1.5 }}>
//                             <Typography sx={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".8px", color: "#4f6ef7", fontWeight: 700, mb: .5 }}>💊 Medicines &amp; Dosage</Typography>
//                             <Typography sx={{ fontSize: ".83rem", color: "#1a1f36", whiteSpace: "pre-line", lineHeight: 1.7 }}>{rx.medicines}</Typography>
//                           </Box>
//                         )}
//                         <Grid container spacing={1.5}>
//                           {rx.instructions && (<Grid item xs={12} sm={6}><Typography sx={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".8px", color: "#8892b0", fontWeight: 600, mb: .4 }}>Instructions</Typography><Typography sx={{ fontSize: ".82rem", color: "#4a5278" }}>📋 {rx.instructions}</Typography></Grid>)}
//                           {rx.tests && (<Grid item xs={12} sm={6}><Typography sx={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".8px", color: "#8892b0", fontWeight: 600, mb: .4 }}>Lab Tests</Typography><Typography sx={{ fontSize: ".82rem", color: "#7c3aed" }}>🔬 {rx.tests}</Typography></Grid>)}
//                           {rx.followUpDate && (<Grid item xs={12}><Typography sx={{ fontSize: ".82rem", color: "#d97706", fontWeight: 600 }}>📅 Follow-up: {rx.followUpDate}</Typography></Grid>)}
//                         </Grid>
//                       </Box>
//                     </Box>
//                   </div>
//                 ))}
//               </>
//             )}

//             {/* ✅ HEALTH STATUS — new vitals dashboard */}
//             {view === "healthstatus" && (
//               <HealthStatusView patientId={patient.id} />
//             )}

//             {/* HEALTH STATS */}
//             {view === "health" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Health Stats</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>Your health data visualized</Typography>
//                 </Box>
//                 <HealthStats appointments={appointments} prescriptions={prescriptions} medicalRecords={medicalRecords} payments={payments} />
//               </>
//             )}

//             {/* PROFILE */}
//             {view === "profile" && (
//               <>
//                 <Box sx={{ mb: 4 }}>
//                   <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#1a1f36" }}>Profile</Typography>
//                   <Typography sx={{ color: "#8892b0", fontSize: ".875rem", mt: .5 }}>Your personal health information</Typography>
//                 </Box>
//                 <Card className="light-card" sx={{ p: 4 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3 }}>
//                     <Avatar className="av-blue" sx={{ width: 76, height: 76, borderRadius: "22px", fontSize: "2rem", fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, boxShadow: "0 6px 20px rgba(79,110,247,.25)" }}>{patient.name?.charAt(0)}</Avatar>
//                     <Box>
//                       <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 700, color: "#1a1f36" }}>{patient.name}</Typography>
//                       <Typography sx={{ fontSize: ".82rem", color: "#8892b0", mt: .5 }}>Patient Account · Active</Typography>
//                     </Box>
//                   </Box>
//                   <Divider sx={{ mb: 3, borderColor: "#e8ecf5" }} />
//                   <Grid container spacing={3}>
//                     {[["Full Name", patient.name], ["Gender", patient.gender], ["Date of Birth", patient.dob], ["Contact", patient.contact], ["Age", patient.age ? `${patient.age} years` : "—"], ["Patient ID", `#${patient.id}`]].map(([label, val]) => (
//                       <Grid item xs={12} sm={6} key={label}>
//                         <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1.1px", color: "#8892b0", fontWeight: 600, mb: .6 }}>{label}</Typography>
//                         <Typography sx={{ fontSize: ".95rem", fontWeight: 500, color: "#1a1f36" }}>{val || "—"}</Typography>
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
//       <UploadRecordModal open={uploadOpen} onClose={() => setUploadOpen(false)} patientId={patient.id} onUploaded={newRecord => setMedicalRecords(prev => [newRecord, ...prev])} />
//       <PaymentModal open={Boolean(payAppt)} appointment={payAppt} onClose={() => setPayAppt(null)} onPaid={handlePaymentDone} />
//       <FeedbackModal open={Boolean(fbAppt)} appointment={fbAppt} onClose={() => setFbAppt(null)} onSubmitted={handleFeedbackDone} />
//     </Box>
//   );
// }



// import { useContext, useEffect, useState, useRef, useCallback } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import PatientProfileForm from "./PatientProfileForm";
// import {
//   Box, Typography, CircularProgress, Alert, Grid, Card, CardContent,
//   Avatar, Button, Divider, Chip, TextField, InputAdornment,
//   MenuItem, Select, Modal, IconButton, LinearProgress, Rating,
//   Dialog, DialogTitle, DialogContent, DialogActions, Snackbar,
// } from "@mui/material";
// import MenuIcon          from "@mui/icons-material/Menu";
// import CloseIcon         from "@mui/icons-material/Close";
// import LogoutIcon        from "@mui/icons-material/Logout";
// import EventIcon         from "@mui/icons-material/Event";
// import DashboardIcon     from "@mui/icons-material/Dashboard";
// import PersonIcon        from "@mui/icons-material/Person";
// import AddIcon           from "@mui/icons-material/Add";
// import SearchIcon        from "@mui/icons-material/Search";
// import FolderIcon        from "@mui/icons-material/Folder";
// import UploadFileIcon    from "@mui/icons-material/UploadFile";
// import DescriptionIcon   from "@mui/icons-material/Description";
// import DeleteIcon        from "@mui/icons-material/Delete";
// import OpenInNewIcon     from "@mui/icons-material/OpenInNew";
// import DownloadIcon      from "@mui/icons-material/Download";
// import VisibilityIcon    from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import FilterListIcon    from "@mui/icons-material/FilterList";
// import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
// import PaymentIcon       from "@mui/icons-material/Payment";
// import StarIcon          from "@mui/icons-material/Star";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CheckCircleIcon   from "@mui/icons-material/CheckCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import BarChartIcon      from "@mui/icons-material/BarChart";
// import MonitorHeartIcon  from "@mui/icons-material/MonitorHeart";
// import LockOpenIcon      from "@mui/icons-material/LockOpen";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LineChart, Line, AreaChart, Area,
//   ResponsiveContainer, XAxis, YAxis, CartesianGrid,
//   Tooltip as ReTooltip, Legend,
// } from "recharts";
// import { format } from "date-fns";

// const BASE = "http://localhost:8080";

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }
//   .sidebar-overlay{position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease;}
//   @keyframes overlayIn{from{opacity:0}to{opacity:1}}
//   .portal-sidebar{width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1);}
//   .portal-sidebar.closed{transform:translateX(-100%);}
//   .portal-sidebar.open{transform:translateX(0);}
//   .sidebar-top-row{display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px;}
//   .sidebar-logo{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px;}
//   .logo-icon{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0;}
//   .logo-accent{color:#7c3aed;}
//   .sidebar-close-btn{width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s;}
//   .sidebar-close-btn:hover{background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2);}
//   .nav-section-label{font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px;}
//   .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none;}
//   .nav-item:hover{background:#eef1fe;color:#4f6ef7;}
//   .nav-item.active{background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18);}
//   .nav-item.active .nav-icon-wrap{background:#4f6ef7 !important;color:#fff !important;}
//   .nav-icon-wrap{width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278;}
//   .sidebar-spacer{flex:1;}
//   .user-card{display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px;}
//   .user-mini-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem;}
//   .portal-topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100;}
//   .topbar-left{display:flex;align-items:center;gap:14px;}
//   .hamburger-btn{width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s;}
//   .hamburger-btn:hover{background:#eef1fe;border-color:rgba(79,110,247,.2);}
//   .blob{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;}
//   .blob-1{width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px;}
//   .blob-2{width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px;}
//   .light-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important;}
//   .light-card:hover{box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important;}
//   .hero-card{background:linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;}
//   .hero-card::after{content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none;}
//   .stat-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important;}
//   .stat-card:hover{box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .stat-value{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1;}
//   .stat-label{font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px;}
//   .stat-icon{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07;}
//   .sec-heading{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px;}
//   .sec-heading::after{content:'';flex:1;height:1px;background:#e8ecf5;}
//   .spec-chip-wrap{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0;}
//   .spec-chip{padding:6px 14px !important;border-radius:20px !important;font-size:.78rem !important;font-weight:600 !important;border:1px solid #e8ecf5 !important;cursor:pointer !important;transition:all .18s !important;background:#fff !important;color:#4a5278 !important;user-select:none;}
//   .spec-chip:hover{background:#eef1fe !important;border-color:rgba(79,110,247,.25) !important;color:#4f6ef7 !important;}
//   .spec-chip.active{background:#4f6ef7 !important;border-color:#4f6ef7 !important;color:#fff !important;}
//   .record-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:16px !important;box-shadow:0 1px 6px rgba(79,110,247,.07) !important;transition:box-shadow .22s,transform .22s !important;padding:20px 22px;margin-bottom:12px;}
//   .record-card:hover{box-shadow:0 5px 22px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .rx-card{background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s;}
//   .rx-card:hover{box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px);}
//   .pay-banner{background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:16px;padding:18px 22px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
//   .upload-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:520px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto;}
//   .rzp-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:440px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .fb-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:460px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .drop-zone{border:2px dashed #c7cee8;border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:all .2s;background:#f8f9ff;}
//   .drop-zone:hover,.drop-zone.dragover{border-color:#4f6ef7;background:#eef1fe;}
//   .file-preview-wrap{width:100%;border-radius:10px;overflow:hidden;border:1px solid #e8ecf5;margin-top:12px;}
//   .file-preview-wrap iframe{width:100%;height:340px;border:none;display:block;}
//   .file-preview-wrap img{width:100%;display:block;max-height:380px;object-fit:contain;background:#f8f9ff;}
//   .health-chart-card{background:#fff;border:1px solid #e8ecf5;border-radius:18px;padding:24px;box-shadow:0 1px 6px rgba(79,110,247,.06);}
//   .hbar-wrap{display:flex;flex-direction:column;gap:10px;}
//   .hbar-row{display:flex;align-items:center;gap:12px;}
//   .hbar-label{font-size:.75rem;font-weight:600;color:#4a5278;width:100px;flex-shrink:0;text-align:right;}
//   .hbar-track{flex:1;height:10px;background:#f0f2f8;border-radius:999px;overflow:hidden;}
//   .hbar-fill{height:100%;border-radius:999px;transition:width .7s cubic-bezier(.22,1,.36,1);}
//   .hbar-val{font-size:.75rem;font-weight:700;color:#1a1f36;width:48px;flex-shrink:0;}
//   .donut-svg{display:block;margin:0 auto;}
//   .mini-legend{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:12px;}
//   .mini-legend-item{display:flex;align-items:center;gap:5px;font-size:.72rem;color:#4a5278;font-weight:500;}
//   .mini-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
//   .timeline-wrap{position:relative;padding-left:22px;}
//   .timeline-wrap::before{content:'';position:absolute;left:7px;top:0;bottom:0;width:2px;background:#e8ecf5;}
//   .tl-item{position:relative;margin-bottom:14px;}
//   .tl-dot{position:absolute;left:-18px;top:4px;width:10px;height:10px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 2px currentColor;}
//   .av-blue{background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;}
//   .av-violet{background:linear-gradient(135deg,#7c3aed,#a78bfa) !important;}
//   .av-teal{background:linear-gradient(135deg,#0891b2,#22d3ee) !important;}
//   .av-rose{background:linear-gradient(135deg,#e11d48,#fb7185) !important;}
//   .av-green{background:linear-gradient(135deg,#059669,#34d399) !important;}
//   .av-amber{background:linear-gradient(135deg,#d97706,#fbbf24) !important;}
//   @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
//   .fu{animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;}
// `;
// if (!document.getElementById("portal-styles")) {
//   const s = document.createElement("style"); s.id = "portal-styles"; s.textContent = globalStyles; document.head.appendChild(s);
// }

// // ── Health Status helpers ─────────────────────────────────────────────────────
// const HS_METRICS = {
//   bloodSugarLevel:  { label:"Blood Sugar",   unit:"mg/dL", color:"#f59e0b", bg:"#fffbeb", border:"#fcd34d", safe:[70,140] },
//   heartRate:        { label:"Heart Rate",     unit:"bpm",   color:"#e11d48", bg:"#fff1f3", border:"#fda4af", safe:[60,100] },
//   oxygenSaturation: { label:"SpO₂",          unit:"%",     color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc", safe:[95,100] },
//   bodyTemperature:  { label:"Temperature",    unit:"°C",    color:"#f97316", bg:"#fff7ed", border:"#fed7aa", safe:[36.1,37.2] },
//   respiratoryRate:  { label:"Resp. Rate",     unit:"/min",  color:"#059669", bg:"#ecfdf5", border:"#6ee7b7", safe:[12,20] },
//   bmi:              { label:"BMI",            unit:"",      color:"#7c3aed", bg:"#f5f3ff", border:"#c4b5fd", safe:[18.5,24.9] },
//   weight:           { label:"Weight",         unit:"kg",    color:"#4f6ef7", bg:"#eef1fe", border:"#a5b4fc", safe:null },
// };
// const HS_EMPTY = { bloodSugarLevel:"",sugarType:"fasting",bodyTemperature:"",bloodPressure:"",heartRate:"",oxygenSaturation:"",respiratoryRate:"",height:"",weight:"" };
// const hsStatus  = (key,val) => { const s=HS_METRICS[key]?.safe; if(!s||val==null)return null; if(val<s[0])return"low"; if(val>s[1])return"high"; return"normal"; };
// const HS_SCOL   = { normal:"#059669", low:"#f59e0b", high:"#e11d48" };
// const HS_SBGCOL = { normal:"#ecfdf5", low:"#fffbeb", high:"#fff1f3" };
// const hsParseBP = (bp) => { if(!bp)return null; const[s,d]=bp.split("/").map(Number); return isNaN(s)||isNaN(d)?null:{sys:s,dia:d}; };
// const hsFmtDate = (d) => { try{return format(new Date(d),"MMM d, HH:mm");}catch{return"";} };
// const hsFmt = (v,dec=1) => (v!=null?Number(v).toFixed(dec):"—");
// const hsInputSx = { "& .MuiOutlinedInput-root":{background:"#f8f9ff",borderRadius:"12px","& fieldset":{borderColor:"#e8ecf5"},"&:hover fieldset":{borderColor:"#c7cee8"},"&.Mui-focused fieldset":{borderColor:"#4f6ef7"}},"& .MuiInputLabel-root.Mui-focused":{color:"#4f6ef7"} };
// const hsCardSx  = { background:"#fff",border:"1px solid #e8ecf5",borderRadius:"18px",boxShadow:"0 1px 6px rgba(79,110,247,.06)",transition:"box-shadow .2s,transform .2s","&:hover":{boxShadow:"0 6px 24px rgba(79,110,247,.12)",transform:"translateY(-2px)"} };
// const CHART_TOOLTIP = { contentStyle:{background:"#fff",border:"1px solid #e8ecf5",borderRadius:10,boxShadow:"0 4px 16px rgba(79,110,247,.12)",fontSize:12},labelStyle:{color:"#8892b0",fontWeight:600} };

// const avatarColors   = ["av-blue","av-violet","av-teal","av-rose","av-green","av-amber"];
// const getAvatarClass = (i) => avatarColors[i%avatarColors.length];
// const RECORD_TYPES   = ["LAB_REPORT","PRESCRIPTION","SCAN","VACCINATION","SURGERY","OTHER"];
// const RECORD_COLORS  = {
//   LAB_REPORT:{bg:"#eef1fe",color:"#4f6ef7",border:"rgba(79,110,247,.2)"},
//   PRESCRIPTION:{bg:"#ecfdf5",color:"#059669",border:"rgba(5,150,105,.2)"},
//   SCAN:{bg:"#fff1f3",color:"#e11d48",border:"rgba(225,29,72,.2)"},
//   VACCINATION:{bg:"#fffbeb",color:"#d97706",border:"rgba(217,119,6,.2)"},
//   SURGERY:{bg:"#f5f3ff",color:"#7c3aed",border:"rgba(124,58,237,.2)"},
//   OTHER:{bg:"#f5f7ff",color:"#8892b0",border:"#e8ecf5"},
// };
// const getStatusColor = (s) => s==="APPROVED"?"success":s==="REJECTED"?"error":"warning";

// function NavItem({icon,label,active,onClick,badge}) {
//   return (
//     <div className={`nav-item ${active?"active":""}`} onClick={onClick} style={{position:"relative"}}>
//       <div className="nav-icon-wrap">{icon}</div>
//       {label}
//       {badge>0&&<span style={{marginLeft:"auto",background:"#e11d48",color:"#fff",fontSize:".62rem",fontWeight:700,borderRadius:"999px",padding:"1px 7px",minWidth:18,textAlign:"center"}}>{badge}</span>}
//     </div>
//   );
// }
// function StatCard({label,value,icon,color}) {
//   return (
//     <div className="stat-card fu">
//       <div className="stat-label">{label}</div>
//       <div className="stat-value" style={{color}}>{value}</div>
//       <div className="stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── HealthStats ───────────────────────────────────────────────────────────────
// function HealthStats({appointments,prescriptions,medicalRecords,payments}) {
//   const total=appointments.length,approved=appointments.filter(a=>a.status==="APPROVED").length,pending=appointments.filter(a=>a.status==="PENDING").length,rejected=appointments.filter(a=>a.status==="REJECTED").length;
//   const typeCounts=RECORD_TYPES.reduce((acc,t)=>{acc[t]=medicalRecords.filter(r=>r.recordType===t).length;return acc;},{});
//   const now=new Date();
//   const months=Array.from({length:6},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-5+i,1);return{label:d.toLocaleString("default",{month:"short"}),year:d.getFullYear(),month:d.getMonth()};});
//   const monthlyData=months.map(m=>({label:m.label,count:appointments.filter(a=>{if(!a.date)return false;const d=new Date(a.date);return d.getFullYear()===m.year&&d.getMonth()===m.month;}).length}));
//   const maxCount=Math.max(...monthlyData.map(m=>m.count),1);
//   const donutData=[{label:"Approved",count:approved,color:"#059669"},{label:"Pending",count:pending,color:"#f59e0b"},{label:"Rejected",count:rejected,color:"#e11d48"}].filter(d=>d.count>0);
//   const r=58,cx=70,cy=70,circum=2*Math.PI*r;let offset=0;
//   const segments=donutData.map(d=>{const pct=total>0?d.count/total:0;const dash=pct*circum;const gap=circum-dash;const seg={...d,dash,gap,offset,pct};offset+=dash;return seg;});
//   const typeBars=Object.entries(typeCounts).filter(([,v])=>v>0).map(([k,v])=>({label:k.replace("_"," "),val:v,color:RECORD_COLORS[k]?.color||"#8892b0"}));
//   const maxType=Math.max(...typeBars.map(b=>b.val),1);
//   // FIX: count paid from payments map properly
//   const paidCount=Object.values(payments).filter(p=>p?.status==="SUCCESS").length;
//   const pendingPayCount=Math.max(approved-paidCount,0);
//   return (
//     <Box><Grid container spacing={2.5}>
//       <Grid item xs={12} sm={6} md={4}><div className="health-chart-card" style={{height:"100%"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Appointment Status</Typography>{total===0?(<Box sx={{textAlign:"center",py:4,color:"#c0c8e0"}}><Typography sx={{fontSize:"2rem",mb:1}}>📅</Typography><Typography sx={{fontSize:".82rem"}}>No appointments yet</Typography></Box>):(<><svg className="donut-svg" width={140} height={140} viewBox="0 0 140 140"><circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f2f8" strokeWidth={16}/>{segments.map((seg,i)=>(<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={16} strokeDasharray={`${seg.dash} ${seg.gap}`} strokeDashoffset={-seg.offset} transform="rotate(-90 70 70)"/>))}<text x={cx} y={cy-4} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1a1f36" fontFamily="'Cormorant Garamond',serif">{total}</text><text x={cx} y={cy+14} textAnchor="middle" fontSize={9} fill="#8892b0" fontFamily="Outfit,sans-serif">Total</text></svg><div className="mini-legend">{donutData.map(d=>(<div key={d.label} className="mini-legend-item"><div className="mini-dot" style={{background:d.color}}/>{d.label}: {d.count}</div>))}</div></>)}</div></Grid>
//       <Grid item xs={12} sm={6} md={4}><div className="health-chart-card" style={{height:"100%"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Monthly Activity</Typography><Box sx={{display:"flex",alignItems:"flex-end",gap:"6px",height:90,px:.5}}>{monthlyData.map((m,i)=>{const pct=m.count/maxCount;return(<Box key={i} sx={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:.5}}><Typography sx={{fontSize:".62rem",color:"#8892b0",fontWeight:600}}>{m.count||""}</Typography><Box sx={{width:"100%",background:`rgba(79,110,247,${0.15+pct*0.7})`,borderRadius:"5px 5px 0 0",height:`${Math.max(pct*68,4)}px`,transition:"height .6s ease",minHeight:4}}/><Typography sx={{fontSize:".62rem",color:"#8892b0",fontWeight:600,textAlign:"center"}}>{m.label}</Typography></Box>);})}</Box></div></Grid>
//       <Grid item xs={12} sm={6} md={4}><div className="health-chart-card" style={{height:"100%"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Payment Health</Typography><Box sx={{display:"flex",flexDirection:"column",gap:2}}>{[{label:"Paid",val:paidCount,color:"#059669",max:Math.max(approved,1)},{label:"Pending",val:pendingPayCount,color:"#f59e0b",max:Math.max(approved,1)},{label:"Records",val:medicalRecords.length,color:"#4f6ef7",max:Math.max(medicalRecords.length,1)},{label:"Rx",val:prescriptions.length,color:"#7c3aed",max:Math.max(prescriptions.length,1)}].map(item=>(<Box key={item.label}><Box sx={{display:"flex",justifyContent:"space-between",mb:.5}}><Typography sx={{fontSize:".75rem",fontWeight:600,color:"#4a5278"}}>{item.label}</Typography><Typography sx={{fontSize:".75rem",fontWeight:700,color:item.color}}>{item.val}</Typography></Box><Box sx={{height:8,background:"#f0f2f8",borderRadius:999,overflow:"hidden"}}><Box sx={{height:"100%",width:`${(item.val/item.max)*100}%`,background:item.color,borderRadius:999,transition:"width .7s ease"}}/></Box></Box>))}</Box></div></Grid>
//       <Grid item xs={12} sm={6} md={6}><div className="health-chart-card"><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Medical Record Types</Typography>{typeBars.length===0?<Box sx={{textAlign:"center",py:3,color:"#c0c8e0"}}><Typography sx={{fontSize:".82rem"}}>No records yet</Typography></Box>:(<div className="hbar-wrap">{typeBars.map(b=>(<div key={b.label} className="hbar-row"><span className="hbar-label">{b.label}</span><div className="hbar-track"><div className="hbar-fill" style={{width:`${(b.val/maxType)*100}%`,background:b.color}}/></div><span className="hbar-val" style={{color:b.color}}>{b.val}</span></div>))}</div>)}</div></Grid>
//       <Grid item xs={12} sm={6} md={6}><div className="health-chart-card"><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Prescription Timeline</Typography>{prescriptions.length===0?(<Box sx={{textAlign:"center",py:3,color:"#c0c8e0"}}><Typography sx={{fontSize:"2rem",mb:1}}>💊</Typography><Typography sx={{fontSize:".82rem"}}>No prescriptions yet</Typography></Box>):(<div className="timeline-wrap">{[...prescriptions].reverse().slice(0,5).map(rx=>(<div key={rx.id} className="tl-item"><div className="tl-dot" style={{color:"#059669",background:"#ecfdf5"}}/><Box sx={{pl:1}}><Typography sx={{fontSize:".82rem",fontWeight:700,color:"#1a1f36"}}>{rx.diagnosis||"Prescription"}</Typography><Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Dr. {rx.appointment?.doctor?.name} · {rx.issuedDate||rx.appointment?.date||"—"}</Typography>{rx.medicines&&<Typography sx={{fontSize:".72rem",color:"#4f6ef7",mt:.3}} noWrap>💊 {rx.medicines.split("\n")[0]}</Typography>}</Box></div>))}</div>)}</div></Grid>
//     </Grid></Box>
//   );
// }

// // ── HsMetricCard & HealthStatusView (unchanged from working version) ───────────
// function HsMetricCard({label,value,unit,color,bg,border,status}) {
//   return (
//     <Card sx={{background:bg,border:`1px solid ${border}`,borderRadius:"16px",boxShadow:"none",height:"100%",transition:"transform .2s,box-shadow .2s","&:hover":{transform:"translateY(-3px)",boxShadow:`0 8px 24px ${color}22`}}}>
//       <CardContent sx={{p:"20px !important"}}>
//         <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:1}}>
//           <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:700}}>{label}</Typography>
//           {status&&<Chip label={status} size="small" sx={{height:20,fontSize:".65rem",fontWeight:700,background:HS_SBGCOL[status],color:HS_SCOL[status],border:`1px solid ${HS_SCOL[status]}33`}}/>}
//         </Box>
//         <Box sx={{display:"flex",alignItems:"baseline",gap:.75,mt:.5}}>
//           <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.2rem",fontWeight:700,color,lineHeight:1}}>{value}</Typography>
//           {unit&&<Typography sx={{fontSize:".78rem",color:"#8892b0",fontWeight:600}}>{unit}</Typography>}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// function HealthStatusView({patientId}) {
//   const [hsHistory,setHsHistory]=useState([]);const [hsLatest,setHsLatest]=useState(null);const [hsLoading,setHsLoading]=useState(true);const [hsDialog,setHsDialog]=useState(false);const [hsForm,setHsForm]=useState(HS_EMPTY);const [hsEditId,setHsEditId]=useState(null);const [hsSaving,setHsSaving]=useState(false);const [hsSnack,setHsSnack]=useState({open:false,msg:"",sev:"success"});
//   const loadHS=useCallback(async()=>{if(!patientId)return;try{setHsLoading(true);const[hRes,lRes]=await Promise.allSettled([axios.get(`${BASE}/health-status/patient/${patientId}`),axios.get(`${BASE}/health-status/patient/${patientId}/latest`)]);if(hRes.status==="fulfilled")setHsHistory(hRes.value.data);if(lRes.status==="fulfilled")setHsLatest(lRes.value.data);}catch{}finally{setHsLoading(false);}},[patientId]);
//   useEffect(()=>{loadHS();},[loadHS]);
//   const openAdd=()=>{setHsForm(HS_EMPTY);setHsEditId(null);setHsDialog(true);};
//   const openEdit=(r)=>{setHsForm({bloodSugarLevel:r.bloodSugarLevel??"",sugarType:r.sugarType??"fasting",bodyTemperature:r.bodyTemperature??"",bloodPressure:r.bloodPressure??"",heartRate:r.heartRate??"",oxygenSaturation:r.oxygenSaturation??"",respiratoryRate:r.respiratoryRate??"",height:r.height??"",weight:r.weight??""});setHsEditId(r.id);setHsDialog(true);};
//   const handleSave=async()=>{setHsSaving(true);try{const payload={...hsForm,bloodSugarLevel:hsForm.bloodSugarLevel!==""?Number(hsForm.bloodSugarLevel):null,bodyTemperature:hsForm.bodyTemperature!==""?Number(hsForm.bodyTemperature):null,heartRate:hsForm.heartRate!==""?Number(hsForm.heartRate):null,oxygenSaturation:hsForm.oxygenSaturation!==""?Number(hsForm.oxygenSaturation):null,respiratoryRate:hsForm.respiratoryRate!==""?Number(hsForm.respiratoryRate):null,height:hsForm.height!==""?Number(hsForm.height):null,weight:hsForm.weight!==""?Number(hsForm.weight):null};if(hsEditId){await axios.put(`${BASE}/health-status/${hsEditId}`,payload);}else{await axios.post(`${BASE}/health-status/patient/${patientId}`,payload);}setHsDialog(false);setHsSnack({open:true,msg:hsEditId?"Updated!":"Saved!",sev:"success"});loadHS();}catch{setHsSnack({open:true,msg:"Save failed.",sev:"error"});}finally{setHsSaving(false);}};
//   const chartData=[...hsHistory].reverse().slice(-12).map(r=>({time:hsFmtDate(r.recordedAt),bloodSugar:r.bloodSugarLevel,heartRate:r.heartRate,spO2:r.oxygenSaturation,temp:r.bodyTemperature,bmi:r.bmi,weight:r.weight,resp:r.respiratoryRate}));
//   const bpData=[...hsHistory].reverse().slice(-12).map(r=>{const bp=hsParseBP(r.bloodPressure);return{time:hsFmtDate(r.recordedAt),systolic:bp?.sys??null,diastolic:bp?.dia??null};});
//   const estBMI=hsForm.height&&hsForm.weight?(Number(hsForm.weight)/Math.pow(Number(hsForm.height)/100,2)).toFixed(1):null;
//   if(hsLoading)return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:340}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>);
//   return (
//     <Box>
//       <Box sx={{mb:4,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:2}}>
//         <Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Health Status</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{hsHistory.length>0?`${hsHistory.length} reading${hsHistory.length>1?"s":""}`:""}</Typography></Box>
//         <Button onClick={openAdd} variant="contained" sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,px:3,py:1.4,boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>+ Log Reading</Button>
//       </Box>
//       {hsHistory.length===0?(<Box sx={{textAlign:"center",py:10}}><Typography sx={{fontSize:64,mb:2}}>🩺</Typography><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>No health data yet</Typography><Button onClick={openAdd} variant="contained" sx={{mt:3,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,px:4}}>Log Your First Reading</Button></Box>):(
//         <>
//           <div className="sec-heading" style={{marginBottom:16}}>Latest Vitals</div>
//           <Grid container spacing={2} sx={{mb:4}}>{Object.entries(HS_METRICS).map(([key,cfg])=>{const val=hsLatest?.[key];const st=hsStatus(key,val);return(<Grid item xs={6} sm={4} md={3} key={key}><HsMetricCard label={cfg.label} value={val!=null?hsFmt(val,key==="heartRate"||key==="respiratoryRate"?0:1):"—"} unit={cfg.unit} color={cfg.color} bg={cfg.bg} border={cfg.border} status={st}/></Grid>);})}
//             <Grid item xs={6} sm={4} md={3}><HsMetricCard label="Blood Pressure" value={hsLatest?.bloodPressure??"—"} unit="mmHg" color="#7c3aed" bg="#f5f3ff" border="#c4b5fd" status={null}/></Grid>
//           </Grid>
//           <div className="sec-heading" style={{marginBottom:16}}>Trends Over Time</div>
//           <Box sx={{mb:3}}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>Blood Sugar Level</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>mg/dL readings over time</Typography><ResponsiveContainer width="100%" height={260}><AreaChart data={chartData} margin={{top:5,right:20,left:0,bottom:5}}><defs><linearGradient id="gradSugar" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.18}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}}/><ReTooltip {...CHART_TOOLTIP}/><Area type="monotone" dataKey="bloodSugar" stroke="#f59e0b" fill="url(#gradSugar)" strokeWidth={3} dot={{fill:"#f59e0b",r:5,strokeWidth:2,stroke:"#fff"}} name="Blood Sugar (mg/dL)"/></AreaChart></ResponsiveContainer></CardContent></Card></Box>
//           <Grid container spacing={3} sx={{mb:3}}>
//             <Grid item xs={12} md={6}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>Heart Rate</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>bpm · Normal: 60–100</Typography><ResponsiveContainer width="100%" height={240}><LineChart data={chartData} margin={{top:5,right:20,left:0,bottom:5}}><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}} domain={[40,160]}/><ReTooltip {...CHART_TOOLTIP}/><Line type="monotone" dataKey="heartRate" stroke="#e11d48" strokeWidth={3} dot={{fill:"#e11d48",r:5,strokeWidth:2,stroke:"#fff"}} name="Heart Rate (bpm)"/></LineChart></ResponsiveContainer></CardContent></Card></Grid>
//             <Grid item xs={12} md={6}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>SpO₂</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>% · Normal: 95–100</Typography><ResponsiveContainer width="100%" height={240}><AreaChart data={chartData} margin={{top:5,right:20,left:0,bottom:5}}><defs><linearGradient id="gradSpO2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0891b2" stopOpacity={0.18}/><stop offset="95%" stopColor="#0891b2" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}} domain={[85,100]}/><ReTooltip {...CHART_TOOLTIP}/><Area type="monotone" dataKey="spO2" stroke="#0891b2" fill="url(#gradSpO2)" strokeWidth={3} dot={{fill:"#0891b2",r:5,strokeWidth:2,stroke:"#fff"}} name="SpO₂ (%)"/></AreaChart></ResponsiveContainer></CardContent></Card></Grid>
//           </Grid>
//           <Box sx={{mb:3}}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>Blood Pressure</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>Systolic / Diastolic mmHg</Typography><ResponsiveContainer width="100%" height={260}><AreaChart data={bpData} margin={{top:5,right:20,left:0,bottom:5}}><defs><linearGradient id="gradSys" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e11d48" stopOpacity={0.15}/><stop offset="95%" stopColor="#e11d48" stopOpacity={0}/></linearGradient><linearGradient id="gradDia" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}} domain={[40,200]}/><ReTooltip {...CHART_TOOLTIP}/><Legend wrapperStyle={{fontSize:13,paddingTop:8}}/><Area type="monotone" dataKey="systolic" stroke="#e11d48" fill="url(#gradSys)" strokeWidth={3} dot={{fill:"#e11d48",r:4,strokeWidth:2,stroke:"#fff"}} name="Systolic (mmHg)"/><Area type="monotone" dataKey="diastolic" stroke="#7c3aed" fill="url(#gradDia)" strokeWidth={3} dot={{fill:"#7c3aed",r:4,strokeWidth:2,stroke:"#fff"}} name="Diastolic (mmHg)"/></AreaChart></ResponsiveContainer></CardContent></Card></Box>
//           <div className="sec-heading" style={{marginBottom:16}}>Reading History</div>
//           <Card sx={{...hsCardSx,"&:hover":{}}}><CardContent sx={{p:"0 !important"}}><Box sx={{overflowX:"auto"}}><Box component="table" sx={{width:"100%",borderCollapse:"collapse"}}><Box component="thead"><Box component="tr" sx={{background:"#f8f9ff"}}>{["Date","Blood Sugar","Temp","B.P.","Heart Rate","SpO₂","Resp.","BMI",""].map(h=>(<Box component="th" key={h} sx={{p:"14px 18px",textAlign:"left",color:"#8892b0",fontSize:".72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",borderBottom:"1px solid #e8ecf5",whiteSpace:"nowrap"}}>{h}</Box>))}</Box></Box><Box component="tbody">{hsHistory.map((r,idx)=>(<Box component="tr" key={r.id} sx={{background:idx%2===0?"#fff":"#fafbff","&:hover":{background:"#eef1fe"}}}>{[hsFmtDate(r.recordedAt),r.bloodSugarLevel?`${r.bloodSugarLevel} mg/dL`:"—",r.bodyTemperature?`${r.bodyTemperature}°C`:"—",r.bloodPressure??"—",r.heartRate?`${r.heartRate} bpm`:"—",r.oxygenSaturation?`${r.oxygenSaturation}%`:"—",r.respiratoryRate?`${r.respiratoryRate}/min`:"—",r.bmi?Number(r.bmi).toFixed(1):"—"].map((cell,i)=>(<Box component="td" key={i} sx={{p:"12px 18px",color:"#1a1f36",fontSize:".85rem",borderBottom:"1px solid #f0f2f8",whiteSpace:"nowrap"}}>{cell}</Box>))}<Box component="td" sx={{p:"12px 18px",borderBottom:"1px solid #f0f2f8"}}><Button size="small" onClick={()=>openEdit(r)} sx={{background:"#eef1fe",color:"#4f6ef7",textTransform:"none",fontWeight:700,fontSize:".78rem",borderRadius:"8px",px:1.5,py:.5,minWidth:0,"&:hover":{background:"#4f6ef7",color:"#fff"}}}>Edit</Button></Box></Box>))}</Box></Box></Box></CardContent></Card>
//         </>
//       )}
//       <Dialog open={hsDialog} onClose={()=>setHsDialog(false)} maxWidth="sm" fullWidth PaperProps={{sx:{borderRadius:"20px",border:"1px solid #e8ecf5"}}}>
//         <DialogTitle sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36",borderBottom:"1px solid #e8ecf5",pb:2}}>{hsEditId?"✏️ Update Reading":"🩺 Log New Reading"}</DialogTitle>
//         <DialogContent sx={{pt:"24px !important"}}><Grid container spacing={2}>
//           <Grid item xs={8}><TextField fullWidth label="Blood Sugar (mg/dL)" type="number" sx={hsInputSx} value={hsForm.bloodSugarLevel} onChange={e=>setHsForm({...hsForm,bloodSugarLevel:e.target.value})}/></Grid>
//           <Grid item xs={4}><TextField fullWidth select label="Type" sx={hsInputSx} value={hsForm.sugarType} onChange={e=>setHsForm({...hsForm,sugarType:e.target.value})}>{["fasting","post-meal","random"].map(o=><MenuItem key={o} value={o}>{o}</MenuItem>)}</TextField></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Temperature (°C)" type="number" sx={hsInputSx} value={hsForm.bodyTemperature} onChange={e=>setHsForm({...hsForm,bodyTemperature:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Blood Pressure (e.g. 120/80)" sx={hsInputSx} value={hsForm.bloodPressure} onChange={e=>setHsForm({...hsForm,bloodPressure:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Heart Rate (bpm)" type="number" sx={hsInputSx} value={hsForm.heartRate} onChange={e=>setHsForm({...hsForm,heartRate:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="SpO₂ (%)" type="number" sx={hsInputSx} value={hsForm.oxygenSaturation} onChange={e=>setHsForm({...hsForm,oxygenSaturation:e.target.value})}/></Grid>
//           <Grid item xs={12}><TextField fullWidth label="Respiratory Rate (/min)" type="number" sx={hsInputSx} value={hsForm.respiratoryRate} onChange={e=>setHsForm({...hsForm,respiratoryRate:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Height (cm)" type="number" sx={hsInputSx} value={hsForm.height} onChange={e=>setHsForm({...hsForm,height:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Weight (kg)" type="number" sx={hsInputSx} value={hsForm.weight} onChange={e=>setHsForm({...hsForm,weight:e.target.value})}/></Grid>
//           {estBMI&&(<Grid item xs={12}><Box sx={{background:"#f5f3ff",border:"1px solid #c4b5fd",borderRadius:"12px",px:2,py:1.5,display:"flex",alignItems:"center",gap:1.5}}><Typography sx={{fontSize:"1.4rem"}}>⚖️</Typography><Box><Typography sx={{fontSize:".7rem",color:"#8892b0",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Estimated BMI</Typography><Typography sx={{fontSize:"1.1rem",fontWeight:700,color:"#7c3aed"}}>{estBMI}</Typography></Box></Box></Grid>)}
//         </Grid></DialogContent>
//         <DialogActions sx={{p:"20px 24px",borderTop:"1px solid #e8ecf5",gap:1}}>
//           <Button onClick={()=>setHsDialog(false)} sx={{color:"#8892b0",textTransform:"none",fontWeight:600,borderRadius:"10px"}}>Cancel</Button>
//           <Button onClick={handleSave} disabled={hsSaving} variant="contained" sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:700,px:3}}>{hsSaving?<CircularProgress size={18} sx={{color:"#fff"}}/>:hsEditId?"Update":"Save"}</Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar open={hsSnack.open} autoHideDuration={3000} onClose={()=>setHsSnack({...hsSnack,open:false})}><Alert severity={hsSnack.sev} sx={{borderRadius:"12px"}}>{hsSnack.msg}</Alert></Snackbar>
//     </Box>
//   );
// }

// // ── DocRequestsView ───────────────────────────────────────────────────────────
// function DocRequestsView({appointments,onUploaded}) {
//   const [uploadingId,setUploadingId]=useState(null);
//   const fileRefs=useRef({});
//   const handleUpload=async(apptId,file)=>{
//     if(!file)return;setUploadingId(apptId);
//     try{const fd=new FormData();fd.append("file",file);const res=await axios.post(`${BASE}/appointments/${apptId}/upload-doc`,fd,{headers:{"Content-Type":"multipart/form-data"}});onUploaded(res.data);}
//     catch{alert("Upload failed.");}finally{setUploadingId(null);}
//   };
//   const docAppts=appointments.filter(a=>a.docRequestStatus==="DOC_REQUEST_PENDING"||a.docRequestStatus==="DOC_REQUEST_DONE");
//   return (
//     <Box>
//       <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Document Requests</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Your doctors have requested health documents for these appointments.</Typography></Box>
//       {docAppts.length===0?(<Box sx={{textAlign:"center",py:10,color:"#8892b0"}}><Typography sx={{fontSize:"3rem",mb:2}}>📋</Typography><Typography sx={{fontWeight:600,fontSize:"1rem",color:"#1a1f36"}}>No document requests</Typography><Typography sx={{fontSize:".85rem",mt:1}}>When a doctor requests health documents, they will appear here.</Typography></Box>):(
//         <Grid container spacing={2.5}>{docAppts.map(appt=>{
//           const isPending=appt.docRequestStatus==="DOC_REQUEST_PENDING";const isDone=appt.docRequestStatus==="DOC_REQUEST_DONE";const docUrl=appt.docFileName?`${BASE}/appointments/doc/${appt.docFileName}`:null;
//           return (<Grid item xs={12} md={6} key={appt.id}><Card sx={{background:isDone?"#ecfdf5":"#fffbeb",border:`1.5px solid ${isDone?"#6ee7b7":"#fcd34d"}`,borderRadius:"18px",boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}><CardContent sx={{p:"24px !important"}}>
//             <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}><Avatar sx={{width:48,height:48,borderRadius:"14px",fontWeight:700,background:"linear-gradient(135deg,#4f6ef7,#818cf8)"}}>{appt.doctor?.name?.charAt(0)}</Avatar><Box sx={{flex:1}}><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization} · {appt.date} · {appt.timeSlot}</Typography></Box><Chip label={isDone?"✓ Uploaded":"⏳ Upload Needed"} size="small" sx={{background:isDone?"#ecfdf5":"#fffbeb",color:isDone?"#059669":"#d97706",border:`1px solid ${isDone?"#6ee7b7":"#fcd34d"}`,fontWeight:700,fontSize:".72rem"}}/></Box>
//             {appt.docRequestMessage&&(<Box sx={{background:"rgba(255,255,255,.8)",borderRadius:"10px",p:"10px 14px",mb:1.5,border:"1px solid rgba(0,0,0,.06)"}}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:700,mb:.4}}>Doctor's Request</Typography><Typography sx={{fontSize:".85rem",color:"#1a1f36"}}>"{appt.docRequestMessage}"</Typography></Box>)}
//             {isDone&&docUrl?(<Box sx={{display:"flex",gap:1,alignItems:"center"}}><a href={docUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:8,fontSize:".78rem",fontWeight:600,textDecoration:"none",background:"linear-gradient(135deg,#059669,#34d399)",color:"#fff"}}>👁 View Document</a><Typography sx={{fontSize:".76rem",color:"#059669",fontWeight:600}}>Shared ✓</Typography></Box>)
//             :isPending?(<Box><input type="file" ref={el=>fileRefs.current[appt.id]=el} style={{display:"none"}} accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={e=>handleUpload(appt.id,e.target.files[0])}/><Button fullWidth variant="contained" disabled={uploadingId===appt.id} onClick={()=>fileRefs.current[appt.id]?.click()} startIcon={<UploadFileIcon sx={{fontSize:16}}/>} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:700}}>{uploadingId===appt.id?"Uploading…":"Upload Health Documents"}</Button><Typography sx={{fontSize:".72rem",color:"#8892b0",textAlign:"center",mt:1}}>PDF, images, Word documents · Max 10 MB</Typography></Box>):null}
//           </CardContent></Card></Grid>);
//         })}</Grid>
//       )}
//     </Box>
//   );
// }

// // ── PaymentModal — FIXED: only triggers on user click, no auto-complete ────────
// function PaymentModal({open,onClose,appointment,onPaid}) {
//   const [step,setStep]=useState("summary");
//   const [cardNum,setCardNum]=useState("");
//   const [cvv,setCvv]=useState("");
//   const [expiry,setExpiry]=useState("");
//   const [name,setName]=useState("");
//   const [payError,setPayError]=useState("");

//   // Reset form when modal opens fresh
//   useEffect(()=>{
//     if(open){setStep("summary");setCardNum("");setCvv("");setExpiry("");setName("");setPayError("");}
//   },[open]);

//   const fieldSx={"& .MuiOutlinedInput-root":{borderRadius:"10px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}};

//   // FIXED: validate card fields before paying, no auto-trigger
//   const handlePay = async () => {
//     if(!cardNum||cardNum.length<16){setPayError("Please enter a valid 16-digit card number.");return;}
//     if(!name.trim()){setPayError("Please enter cardholder name.");return;}
//     if(!expiry||expiry.length<5){setPayError("Please enter valid expiry (MM/YY).");return;}
//     if(!cvv||cvv.length<3){setPayError("Please enter valid CVV.");return;}
//     setPayError("");
//     setStep("processing");
//     try {
//       await axios.post(`${BASE}/payments/create-order/${appointment.id}`);
//       const dummyPayId="pay_dummy_"+Date.now();
//       await axios.post(`${BASE}/payments/confirm/${appointment.id}`,{razorpayPaymentId:dummyPayId});
//       setStep("done");
//       // After success, update parent state and close
//       setTimeout(()=>{
//         onPaid(appointment.id);
//         onClose();
//         setStep("summary");
//       },1800);
//     } catch(e) {
//       setStep("summary");
//       setPayError("Payment failed. Please try again.");
//     }
//   };

//   if(!appointment)return null;
//   const fee=appointment.doctor?.consultationFee||0;

//   const handleClose = () => {
//     if(step==="processing")return; // prevent close during processing
//     setStep("summary");setCardNum("");setCvv("");setExpiry("");setName("");setPayError("");
//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box className="rzp-modal-box">
//         <Box sx={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:"14px",p:"18px 22px",mb:3,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
//           <Box><div style={{color:"#fff",fontSize:"1.1rem",fontWeight:800,letterSpacing:"-0.5px"}}>razorpay</div><Typography sx={{color:"rgba(255,255,255,.7)",fontSize:".74rem",mt:.3}}>Secure Payment Gateway</Typography></Box>
//           <Box sx={{textAlign:"right"}}><Typography sx={{color:"rgba(255,255,255,.7)",fontSize:".7rem"}}>Amount to Pay</Typography><Typography sx={{color:"#fff",fontSize:"1.5rem",fontWeight:800,fontFamily:"'Cormorant Garamond',serif"}}>₹{fee}</Typography></Box>
//         </Box>
//         {step==="summary"&&(
//           <>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:700,color:"#1a1f36",mb:2}}>Payment Details</Typography>
//             <Box sx={{background:"#f8f9ff",border:"1px solid #e8ecf5",borderRadius:"12px",p:2,mb:3}}>
//               {[["Doctor",`Dr. ${appointment.doctor?.name}`],["Specialization",appointment.doctor?.specialization||"—"],["Date",appointment.date],["Time",appointment.timeSlot],["Consultation Fee",`₹${fee}`]].map(([l,v])=>(<Box key={l} sx={{display:"flex",justifyContent:"space-between",mb:.8}}><Typography sx={{color:"#8892b0",fontSize:".82rem"}}>{l}</Typography><Typography sx={{color:"#1a1f36",fontWeight:600,fontSize:".82rem"}}>{v||"—"}</Typography></Box>))}
//               <Divider sx={{my:1.5,borderColor:"#e8ecf5"}}/>
//               <Box sx={{display:"flex",justifyContent:"space-between"}}><Typography sx={{fontWeight:700,color:"#1a1f36",fontSize:".92rem"}}>Total</Typography><Typography sx={{fontWeight:800,color:"#2563eb",fontSize:"1rem",fontFamily:"'Cormorant Garamond',serif"}}>₹{fee}</Typography></Box>
//             </Box>
//             <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:1.5}}>Card Details</Typography>
//             <Box sx={{display:"flex",flexDirection:"column",gap:1.5}}>
//               <TextField size="small" fullWidth placeholder="Card Number (16 digits)" variant="outlined" sx={fieldSx} value={cardNum} onChange={e=>setCardNum(e.target.value.replace(/\D/g,"").slice(0,16))} inputProps={{maxLength:16}}/>
//               <TextField size="small" fullWidth placeholder="Cardholder Name" variant="outlined" sx={fieldSx} value={name} onChange={e=>setName(e.target.value)}/>
//               <Grid container spacing={1.5}>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="MM/YY" variant="outlined" sx={fieldSx} value={expiry} onChange={e=>{let v=e.target.value.replace(/\D/g,"");if(v.length>=2)v=v.slice(0,2)+"/"+v.slice(2);setExpiry(v.slice(0,5));}}/></Grid>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="CVV" type="password" variant="outlined" sx={fieldSx} value={cvv} onChange={e=>setCvv(e.target.value.replace(/\D/g,"").slice(0,3))} inputProps={{maxLength:3}}/></Grid>
//               </Grid>
//             </Box>
//             {payError&&<Box sx={{mt:1.5,p:"10px 14px",borderRadius:"10px",background:"#fff1f3",border:"1px solid rgba(225,29,72,.2)"}}><Typography sx={{fontSize:".8rem",color:"#e11d48",fontWeight:600}}>⚠ {payError}</Typography></Box>}
//             <Box sx={{display:"flex",gap:1.5,mt:3}}>
//               <Button onClick={handleClose} variant="outlined" fullWidth sx={{borderRadius:"10px",textTransform:"none",fontWeight:600,borderColor:"#e8ecf5",color:"#8892b0"}}>Cancel</Button>
//               <Button onClick={handlePay} variant="contained" fullWidth sx={{borderRadius:"10px",textTransform:"none",fontWeight:700,fontSize:".92rem",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",boxShadow:"0 4px 14px rgba(37,99,235,.35)"}}>Pay ₹{fee}</Button>
//             </Box>
//           </>
//         )}
//         {step==="processing"&&(
//           <Box sx={{textAlign:"center",py:3}}>
//             <CircularProgress sx={{color:"#2563eb",mb:2}} size={48}/>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:.5}}>Processing Payment…</Typography>
//             <Typography sx={{fontSize:".82rem",color:"#8892b0"}}>Please do not close this window</Typography>
//             <LinearProgress sx={{mt:3,borderRadius:4,height:4,background:"#e8ecf5","& .MuiLinearProgress-bar":{background:"#2563eb"}}}/>
//           </Box>
//         )}
//         {step==="done"&&(
//           <Box sx={{textAlign:"center",py:2}}>
//             <Box sx={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#059669,#34d399)",display:"flex",alignItems:"center",justifyContent:"center",mx:"auto",mb:2,boxShadow:"0 6px 20px rgba(5,150,105,.3)"}}><CheckCircleIcon sx={{color:"#fff",fontSize:34}}/></Box>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#059669",mb:.5}}>Payment Successful!</Typography>
//             <Typography sx={{fontSize:".85rem",color:"#8892b0"}}>₹{fee} paid successfully</Typography>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ── FeedbackModal ─────────────────────────────────────────────────────────────
// function FeedbackModal({open,onClose,appointment,onSubmitted}) {
//   const[rating,setRating]=useState(0);const[comment,setComment]=useState("");const[loading,setLoading]=useState(false);const[done,setDone]=useState(false);
//   const handleSubmit=async()=>{if(!rating){alert("Please select a rating");return;}setLoading(true);try{await axios.post(`${BASE}/feedback`,{appointmentId:appointment.id,doctorId:appointment.doctor?.id,patientId:appointment.patient?.id,rating,comment});setDone(true);onSubmitted(appointment.id);setTimeout(()=>{setDone(false);setRating(0);setComment("");onClose();},1500);}catch{setDone(true);onSubmitted(appointment.id);setTimeout(()=>{setDone(false);setRating(0);setComment("");onClose();},1500);}finally{setLoading(false);}};
//   if(!appointment)return null;
//   return (
//     <Modal open={open} onClose={onClose}><Box className="fb-modal-box">
//       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36"}}>Rate Your Experience</Typography><IconButton size="small" onClick={onClose} sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton></Box>
//       {done?(<Box sx={{textAlign:"center",py:3}}><Typography sx={{fontSize:"2.5rem",mb:1}}>⭐</Typography><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#059669"}}>Thank you!</Typography></Box>):(<><Typography sx={{fontSize:".8rem",color:"#8892b0",mb:2}}>Dr. {appointment.doctor?.name} · {appointment.date}</Typography><Box sx={{display:"flex",justifyContent:"center",mb:3}}><Rating size="large" value={rating} onChange={(_,v)=>setRating(v)} sx={{"& .MuiRating-iconFilled":{color:"#f59e0b"}}}/></Box><TextField fullWidth multiline rows={3} placeholder="Share your experience…" variant="outlined" value={comment} onChange={e=>setComment(e.target.value)} sx={{mb:3,"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"}}}/><Button onClick={handleSubmit} variant="contained" fullWidth disabled={loading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700}}>{loading?"Submitting…":"Submit Feedback"}</Button></>)}
//     </Box></Modal>
//   );
// }

// // ── UploadRecordModal ─────────────────────────────────────────────────────────
// function UploadRecordModal({open,onClose,patientId,onUploaded}) {
//   const[form,setForm]=useState({title:"",recordType:"LAB_REPORT",recordDate:"",issuedBy:"",description:""});const[file,setFile]=useState(null);const[dragOver,setDragOver]=useState(false);const[loading,setLoading]=useState(false);const[error,setError]=useState("");const fileRef=useRef();
//   const handleFile=f=>{if(!f)return;if(f.size>10*1024*1024){setError("Max 10 MB.");return;}setError("");setFile(f);};
//   const handleSubmit=async()=>{if(!form.title){setError("Title required.");return;}setLoading(true);setError("");try{const fd=new FormData();fd.append("patientId",patientId);fd.append("title",form.title);fd.append("recordType",form.recordType);fd.append("recordDate",form.recordDate);fd.append("issuedBy",form.issuedBy);fd.append("description",form.description);if(file)fd.append("file",file);const res=await axios.post(`${BASE}/medical-records/upload`,fd,{headers:{"Content-Type":"multipart/form-data"}});onUploaded(res.data);setForm({title:"",recordType:"LAB_REPORT",recordDate:"",issuedBy:"",description:""});setFile(null);onClose();}catch(e){setError(e?.response?.data||"Upload failed.");}finally{setLoading(false);}};
//   const fieldSx={"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}};
//   return (
//     <Modal open={open} onClose={onClose}><Box className="upload-modal-box">
//       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#1a1f36"}}>Add Medical Record</Typography><IconButton size="small" onClick={onClose} sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton></Box>
//       <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
//         <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Title *</Typography><TextField fullWidth size="small" variant="outlined" placeholder="e.g. Blood Test Report" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} sx={fieldSx}/></Box>
//         <Grid container spacing={2}><Grid item xs={6}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Record Type</Typography><Select fullWidth size="small" value={form.recordType} onChange={e=>setForm({...form,recordType:e.target.value})} sx={{"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}}}>{RECORD_TYPES.map(t=><MenuItem key={t} value={t}>{t.replace("_"," ")}</MenuItem>)}</Select></Grid><Grid item xs={6}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Date</Typography><TextField fullWidth size="small" type="date" variant="outlined" value={form.recordDate} onChange={e=>setForm({...form,recordDate:e.target.value})} sx={fieldSx}/></Grid></Grid>
//         <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Issued By</Typography><TextField fullWidth size="small" variant="outlined" placeholder="e.g. Dr. Ramesh Kumar" value={form.issuedBy} onChange={e=>setForm({...form,issuedBy:e.target.value})} sx={fieldSx}/></Box>
//         <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Notes</Typography><TextField fullWidth size="small" multiline rows={2} variant="outlined" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} sx={fieldSx}/></Box>
//         <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Attach File (max 10 MB)</Typography><div className={`drop-zone ${dragOver?"dragover":""}`} onClick={()=>fileRef.current?.click()} onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0]);}}><input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={e=>handleFile(e.target.files[0])}/><UploadFileIcon sx={{fontSize:32,color:"#c0c8e0",mb:1}}/>{file?<Typography sx={{fontSize:".85rem",fontWeight:600,color:"#4f6ef7"}}>{file.name}</Typography>:<Typography sx={{fontSize:".82rem",color:"#8892b0"}}>Click or drag & drop</Typography>}</div></Box>
//         {error&&<Box sx={{background:"#fff1f3",border:"1px solid rgba(225,29,72,.2)",borderRadius:"10px",padding:"10px 14px",fontSize:".83rem",color:"#e11d48",fontWeight:500}}>⚠ {error}</Box>}
//         {loading&&<LinearProgress sx={{borderRadius:4,height:4}}/>}
//         <Button onClick={handleSubmit} variant="contained" disabled={loading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".92rem",py:1.4}}>{loading?"Uploading…":"Save Record"}</Button>
//       </Box>
//     </Box></Modal>
//   );
// }

// // ── RecordCard ────────────────────────────────────────────────────────────────
// function RecordCard({record,onDelete}) {
//   const[showPreview,setShowPreview]=useState(false);const sc=RECORD_COLORS[record.recordType]||RECORD_COLORS.OTHER;const fileUrl=record.fileName?`${BASE}/medical-records/file/${record.fileName}`:null;const lower=(record.fileName||"").toLowerCase();const isPdf=lower.endsWith(".pdf");const isImage=lower.endsWith(".png")||lower.endsWith(".jpg")||lower.endsWith(".jpeg")||lower.endsWith(".webp");
//   return (
//     <div className="record-card">
//       <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
//         <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:sc.bg,border:`1px solid ${sc.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}><DescriptionIcon sx={{color:sc.color,fontSize:22}}/></Box>
//         <Box sx={{flex:1,minWidth:0}}>
//           <Box sx={{display:"flex",alignItems:"center",gap:1,flexWrap:"wrap",mb:.5}}><Typography sx={{fontWeight:700,fontSize:".92rem",color:"#1a1f36"}}>{record.title}</Typography><Chip label={record.recordType?.replace("_"," ")} size="small" sx={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontWeight:600,fontSize:".68rem",height:22}}/></Box>
//           {record.issuedBy&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>👤 {record.issuedBy}</Typography>}
//           {record.recordDate&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>📅 {record.recordDate}</Typography>}
//           {record.description&&<Typography sx={{fontSize:".8rem",color:"#4a5278",mt:.5}}>{record.description}</Typography>}
//           {fileUrl&&(<Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>
//             {(isPdf||isImage)&&(<button onClick={()=>setShowPreview(p=>!p)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,cursor:"pointer",fontSize:".76rem",fontWeight:600,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",color:"#fff",border:"none",fontFamily:"'Outfit',sans-serif"}}>{showPreview?<><VisibilityOffIcon sx={{fontSize:13}}/> Hide</>:<><VisibilityIcon sx={{fontSize:13}}/> Preview</>}</button>)}
//             <a href={fileUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.2)"}}><OpenInNewIcon sx={{fontSize:13}}/> Open</a>
//             <a href={fileUrl} download={record.fileName} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#f5f7ff",color:"#4a5278",border:"1px solid #e8ecf5"}}><DownloadIcon sx={{fontSize:13}}/> Download</a>
//           </Box>)}
//           {showPreview&&fileUrl&&(<div className="file-preview-wrap">{isPdf&&<iframe src={fileUrl} title={record.title}/>}{isImage&&<img src={fileUrl} alt={record.title}/>}</div>)}
//         </Box>
//         <IconButton size="small" onClick={()=>onDelete(record.id)} sx={{color:"#e11d48",background:"#fff1f3",borderRadius:"9px",flexShrink:0,"&:hover":{background:"#fce7f3"}}}><DeleteIcon sx={{fontSize:17}}/></IconButton>
//       </Box>
//     </div>
//   );
// }

// // ── BookAppointmentInline ─────────────────────────────────────────────────────
// function BookAppointmentInline({patient,doctors}) {
//   const[searchQuery,setSearchQuery]=useState("");const[activeSpec,setActiveSpec]=useState("All");const[bookingDocId,setBookingDocId]=useState(null);const[bookForm,setBookForm]=useState({date:"",timeSlot:"",description:""});const[bookLoading,setBookLoading]=useState(false);const[bookSuccess,setBookSuccess]=useState(false);
//   const specializations=["All",...Array.from(new Set(doctors.map(d=>d.specialization).filter(Boolean))).sort()];
//   const filteredDoctors=doctors.filter(doc=>{const bySpec=activeSpec==="All"||doc.specialization===activeSpec;const q=searchQuery.toLowerCase();const bySearch=!q||doc.name?.toLowerCase().includes(q)||doc.specialization?.toLowerCase().includes(q)||doc.hospital?.toLowerCase().includes(q);return bySpec&&bySearch;});
//   const selectedDoc=doctors.find(d=>d.id===bookingDocId);
//   const handleBook=async()=>{
//     if(!bookForm.date||!bookForm.timeSlot){alert("Please select date and time slot.");return;}
//     setBookLoading(true);
//     try{
//       const params=new URLSearchParams({patientId:patient.id,doctorId:bookingDocId,date:bookForm.date,timeSlot:bookForm.timeSlot,description:bookForm.description});
//       await axios.post(`${BASE}/appointments/book?${params}`);
//       setBookSuccess(true);setBookForm({date:"",timeSlot:"",description:""});setBookingDocId(null);
//       setTimeout(()=>setBookSuccess(false),4000);
//     }catch(e){alert(e?.response?.data||"Booking failed. Please try again.");}
//     finally{setBookLoading(false);}
//   };
//   if(bookingDocId&&selectedDoc){
//     const fieldSx={"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"}};
//     return (<motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.3}}>
//       <Box sx={{mb:3}}><Button size="small" onClick={()=>setBookingDocId(null)} sx={{color:"#4f6ef7",textTransform:"none",fontWeight:600,fontSize:".82rem",p:0}}>← Back to Doctors</Button></Box>
//       <Card className="light-card" sx={{p:4,maxWidth:560}}>
//         <Box sx={{display:"flex",alignItems:"center",gap:2,mb:3}}><Avatar className="av-blue" sx={{width:56,height:56,borderRadius:"16px",fontSize:"1.4rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700}}>{selectedDoc.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36"}}>Dr. {selectedDoc.name}</Typography><Typography sx={{fontSize:".8rem",color:"#8892b0"}}>{selectedDoc.specialization} · {selectedDoc.hospital}</Typography>{selectedDoc.consultationFee>0&&<Chip label={`₹${selectedDoc.consultationFee} consultation fee`} size="small" sx={{mt:.5,background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".72rem"}}/>}</Box></Box>
//         <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//         {bookSuccess&&<Box sx={{background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",borderRadius:"12px",p:2,mb:3,display:"flex",alignItems:"center",gap:1.5}}><CheckCircleIcon sx={{color:"#059669",fontSize:22}}/><Box><Typography sx={{fontWeight:700,color:"#059669",fontSize:".9rem"}}>Appointment Booked!</Typography><Typography sx={{fontSize:".78rem",color:"#065f46"}}>Your request has been sent to the doctor. Go to "My Appointments" to track status.</Typography></Box></Box>}
//         <Box sx={{background:"#eef1fe",border:"1px solid rgba(79,110,247,.2)",borderRadius:"12px",p:"12px 16px",mb:3,display:"flex",alignItems:"flex-start",gap:1.5}}>
//           <Typography sx={{fontSize:".95rem",mt:.1}}>ℹ️</Typography>
//           <Typography sx={{fontSize:".78rem",color:"#4a5278",lineHeight:1.6}}>No document upload needed at booking. After the doctor approves and you pay the fee, the doctor may request specific documents if needed.</Typography>
//         </Box>
//         <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
//           <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Preferred Date *</Typography><TextField fullWidth size="small" type="date" variant="outlined" value={bookForm.date} onChange={e=>setBookForm({...bookForm,date:e.target.value})} sx={fieldSx} inputProps={{min:new Date().toISOString().split("T")[0]}}/></Box>
//           <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Time Slot *</Typography><Select fullWidth size="small" value={bookForm.timeSlot} onChange={e=>setBookForm({...bookForm,timeSlot:e.target.value})} sx={{"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"},"& .MuiSelect-select":{borderRadius:"12px",background:"#f8f9ff"}}}><MenuItem value="">Select time</MenuItem>{["09:00 AM","10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"].map(t=><MenuItem key={t} value={t}>{t}</MenuItem>)}</Select></Box>
//           <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Symptoms / Description</Typography><TextField fullWidth size="small" multiline rows={3} variant="outlined" placeholder="Describe your symptoms or reason for visit…" value={bookForm.description} onChange={e=>setBookForm({...bookForm,description:e.target.value})} sx={fieldSx}/></Box>
//           <Button onClick={handleBook} variant="contained" disabled={bookLoading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".92rem",py:1.4,boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>{bookLoading?"Booking…":"Confirm Appointment →"}</Button>
//         </Box>
//       </Card>
//     </motion.div>);
//   }
//   return (<>
//     <TextField fullWidth size="small" placeholder="Search doctor, specialization, hospital…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} InputProps={{startAdornment:<InputAdornment position="start"><SearchIcon sx={{color:"#b0b8d0",fontSize:20}}/></InputAdornment>}} sx={{mb:2.5,"& .MuiOutlinedInput-root":{borderRadius:"14px",background:"#fff","& fieldset":{borderColor:"#e8ecf5"},"&:hover fieldset":{borderColor:"#c7cee8"},"&.Mui-focused fieldset":{borderColor:"#4f6ef7"}}}}/>
//     <Box sx={{mb:3}}><Box sx={{display:"flex",alignItems:"center",gap:1,mb:1.5}}><FilterListIcon sx={{fontSize:16,color:"#8892b0"}}/><Typography sx={{fontSize:".72rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600}}>Filter by Specialization</Typography></Box><div className="spec-chip-wrap">{specializations.map(spec=><div key={spec} className={`spec-chip ${activeSpec===spec?"active":""}`} onClick={()=>setActiveSpec(spec)}>{spec}</div>)}</div></Box>
//     <Box sx={{mb:2.5,display:"flex",alignItems:"center",justifyContent:"space-between"}}><Typography sx={{fontSize:".8rem",color:"#8892b0"}}>{filteredDoctors.length} doctor{filteredDoctors.length!==1?"s":""} found</Typography>{(searchQuery||activeSpec!=="All")&&<Typography sx={{fontSize:".78rem",color:"#4f6ef7",fontWeight:600,cursor:"pointer"}} onClick={()=>{setSearchQuery("");setActiveSpec("All");}}>Clear ✕</Typography>}</Box>
//     {filteredDoctors.length===0?(<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>🔍</Typography><Typography sx={{fontWeight:500}}>No doctors found.</Typography></Box>):(
//       <Grid container spacing={2.5}>{filteredDoctors.map((doc,i)=>(<Grid item xs={12} sm={6} md={4} key={doc.id}><motion.div whileHover={{scale:1.03}}><Card className="light-card" sx={{p:3}}><Box sx={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}><Avatar className={getAvatarClass(i)} sx={{width:68,height:68,borderRadius:"20px",mb:1.5,fontSize:"1.8rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.22)"}}>{doc.name?.charAt(0)}</Avatar><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {doc.name}</Typography><Chip label={doc.specialization||"General"} size="small" sx={{mt:.75,mb:.5,background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:600,fontSize:".72rem"}}/>{doc.qualification&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>{doc.qualification}</Typography>}{doc.experience>0&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>🏅 {doc.experience} yrs</Typography>}{doc.hospital&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.5}}>🏥 {doc.hospital}</Typography>}{doc.consultationFee>0&&<Box sx={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75,mb:2,display:"flex",alignItems:"center",gap:.75}}><CurrencyRupeeIcon sx={{fontSize:14,color:"#d97706"}}/><Typography sx={{fontSize:".8rem",fontWeight:700,color:"#d97706"}}>₹{doc.consultationFee}</Typography></Box>}<Button variant="contained" onClick={()=>setBookingDocId(doc.id)} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600,fontSize:".85rem",boxShadow:"0 3px 12px rgba(79,110,247,.28)"}}>Book Now →</Button></Box></Card></motion.div></Grid>))}</Grid>
//     )}
//   </>);
// }

// // ── MAIN PatientDashboard ─────────────────────────────────────────────────────
// export default function PatientDashboard() {
//   const {user}  = useContext(AuthContext);
//   const userId  = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [patient,          setPatient]          = useState(null);
//   const [appointments,     setAppointments]     = useState([]);
//   const [doctors,          setDoctors]          = useState([]);
//   const [medicalRecords,   setMedicalRecords]   = useState([]);
//   const [prescriptions,    setPrescriptions]    = useState([]);
//   const [payments,         setPayments]         = useState({});  // key = appointmentId
//   const [feedbackDone,     setFeedbackDone]     = useState({});
//   const [accessRequests,   setAccessRequests]   = useState([]);
//   const [view,             setView]             = useState("dashboard");
//   const [sidebarOpen,      setSidebarOpen]      = useState(false);
//   const [loading,          setLoading]          = useState(true);
//   const [profileMissing,   setProfileMissing]   = useState(false);
//   const [error,            setError]            = useState("");
//   const [uploadOpen,       setUploadOpen]       = useState(false);
//   const [recordTypeFilter, setRecordTypeFilter] = useState("ALL");
//   const [payAppt,          setPayAppt]          = useState(null);
//   const [fbAppt,           setFbAppt]           = useState(null);

//   useEffect(()=>{
//     const load=async()=>{
//       try{const patRes=await axios.get(`${BASE}/patient/user/${userId}`);setPatient(patRes.data);}
//       catch(err){if(err.response?.status===404){setProfileMissing(true);setLoading(false);return;}setError("Failed to load patient.");setLoading(false);return;}
//       try{const dRes=await axios.get(`${BASE}/doctor`);setDoctors(dRes.data);}catch{}
//       setLoading(false);
//     };
//     if(userId)load();else{setError("User ID missing.");setLoading(false);}
//   },[userId]);

//   useEffect(()=>{
//     if(!patient)return;
//     axios.get(`${BASE}/appointments/patient/${patient.id}`).then(r=>setAppointments(r.data)).catch(()=>{});
//     axios.get(`${BASE}/medical-records/patient/${patient.id}`).then(r=>setMedicalRecords(r.data)).catch(()=>{});

//     // FIX: Only load prescriptions that have actual diagnosis written by doctor
//     axios.get(`${BASE}/prescriptions/patient/${patient.id}`)
//       .then(r=>{
//         // Filter out empty/blank prescriptions - only show ones with actual diagnosis
//         const validRx = r.data.filter(rx => rx.diagnosis && rx.diagnosis.trim() !== "");
//         setPrescriptions(validRx);
//       }).catch(()=>{});

//     // FIX: Build payments map correctly using appointmentId as key
//     axios.get(`${BASE}/payments/patient/${patient.id}`)
//       .then(r=>{
//         const map={};
//         r.data.forEach(p=>{
//           // appointmentId can be nested object or direct id
//           const apptId = p.appointmentId || p.appointment?.id;
//           if(apptId && p.status==="SUCCESS"){
//             map[apptId]={status:"SUCCESS", paymentId: p.id};
//           }
//         });
//         setPayments(map);
//       }).catch(()=>{});

//     axios.get(`${BASE}/access/patient/${patient.id}/requests`).then(r=>setAccessRequests(r.data)).catch(()=>{});
//   },[patient]);

//   const handleLogout   = () => { localStorage.removeItem("user"); navigate("/"); };
//   const handleNavClick = (k) => { setView(k); setSidebarOpen(false); };
//   const filteredRecords = recordTypeFilter==="ALL"?medicalRecords:medicalRecords.filter(r=>r.recordType===recordTypeFilter);

//   const handleDeleteRecord=async(id)=>{
//     if(!window.confirm("Delete this record?"))return;
//     try{await axios.delete(`${BASE}/medical-records/${id}`);setMedicalRecords(prev=>prev.filter(r=>r.id!==id));}
//     catch{alert("Failed to delete record");}
//   };

//   // FIX: onPaid now correctly sets the appointment ID as key
//   const handlePaymentDone = (appointmentId) => {
//     setPayments(prev=>({...prev,[appointmentId]:{status:"SUCCESS"}}));
//     // Also reload appointments to reflect any status changes
//     if(patient){
//       axios.get(`${BASE}/appointments/patient/${patient.id}`).then(r=>setAppointments(r.data)).catch(()=>{});
//     }
//   };

//   const handleFeedbackDone = (id) => setFeedbackDone(prev=>({...prev,[id]:true}));

//   // FIX: isPaid check — check if appointmentId exists as key in payments map with SUCCESS status
//   const isApptPaid = (apptId) => payments[apptId]?.status === "SUCCESS";

//   const unpaidCount    = appointments.filter(a=>a.status==="APPROVED"&&!isApptPaid(a.id)).length;
//   const pendingDocReqs = appointments.filter(a=>a.docRequestStatus==="DOC_REQUEST_PENDING").length;
//   const pendingAccessCount = accessRequests.filter(r=>r.status==="PENDING").length;

//   const today = new Date(); today.setHours(0,0,0,0);
//   const upcomingAppts = appointments.filter(a=>{
//     if(a.status==="REJECTED")return false;
//     if(!a.date)return false;
//     return new Date(a.date)>=today;
//   }).sort((a,b)=>new Date(a.date)-new Date(b.date));

//   const menuItems = [
//     {key:"dashboard",      label:"Dashboard",        icon:<DashboardIcon     sx={{fontSize:18}}/>},
//     {key:"appointments",   label:"My Appointments",  icon:<EventIcon         sx={{fontSize:18}}/>, badge:unpaidCount},
//     {key:"book",           label:"Book Appointment", icon:<AddIcon           sx={{fontSize:18}}/>},
//     {key:"records",        label:"Medical Records",  icon:<FolderIcon        sx={{fontSize:18}}/>},
//     {key:"prescriptions",  label:"Prescriptions",    icon:<LocalPharmacyIcon sx={{fontSize:18}}/>},
//     {key:"docrequests",    label:"Doc Requests",     icon:<UploadFileIcon    sx={{fontSize:18}}/>, badge:pendingDocReqs},
//     {key:"accessrequests", label:"Record Requests",  icon:<LockOpenIcon      sx={{fontSize:18}}/>, badge:pendingAccessCount},
//     {key:"healthstatus",   label:"Health Status",    icon:<MonitorHeartIcon  sx={{fontSize:18}}/>},
//     {key:"health",         label:"Health Stats",     icon:<BarChartIcon      sx={{fontSize:18}}/>},
//     {key:"profile",        label:"Profile",          icon:<PersonIcon        sx={{fontSize:18}}/>},
//   ];

//   if(loading)return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>);
//   if(error)return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><Alert severity="error">{error}</Alert></Box>);
//   if(profileMissing||!patient)return(<PatientProfileForm userId={userId} onCreated={created=>{setPatient(created);setProfileMissing(false);axios.get(`${BASE}/doctor`).then(r=>setDoctors(r.data)).catch(()=>{});}}/>);

//   return (
//     <Box sx={{minHeight:"100vh",background:"#f5f7ff",fontFamily:"'Outfit',sans-serif"}}>
//       <div className="blob blob-1"/><div className="blob blob-2"/>
//       {sidebarOpen&&<div className="sidebar-overlay" onClick={()=>setSidebarOpen(false)}/>}

//       {/* Sidebar */}
//       <div className={`portal-sidebar ${sidebarOpen?"open":"closed"}`}>
//         <div className="sidebar-top-row"><div className="sidebar-logo"><div className="logo-icon">✦</div>Med<span className="logo-accent">Vault</span></div><div className="sidebar-close-btn" onClick={()=>setSidebarOpen(false)}><CloseIcon sx={{fontSize:16}}/></div></div>
//         <div className="nav-section-label">Navigation</div>
//         {menuItems.map(item=>(<NavItem key={item.key} icon={item.icon} label={item.label} active={view===item.key} onClick={()=>handleNavClick(item.key)} badge={item.badge||0}/>))}
//         <div className="sidebar-spacer"/>
//         <div className="user-card"><div className="user-mini-av">{patient.name?.charAt(0)}</div><Box><Typography sx={{fontSize:".85rem",fontWeight:600,color:"#1a1f36",lineHeight:1.2}}>{patient.name}</Typography><Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Patient</Typography></Box></div>
//         <button onClick={handleLogout} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:11,cursor:"pointer",fontSize:".875rem",fontWeight:500,color:"#e11d48",border:"1px solid transparent",background:"none",width:"100%",fontFamily:"'Outfit',sans-serif",transition:"all .18s"}} onMouseEnter={e=>{e.currentTarget.style.background="#fff1f3";e.currentTarget.style.borderColor="rgba(225,29,72,.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor="transparent";}}>
//           <div className="nav-icon-wrap" style={{background:"#fff1f3",color:"#e11d48"}}><LogoutIcon sx={{fontSize:16}}/></div>Sign Out
//         </button>
//       </div>

//       {/* Topbar */}
//       <div className="portal-topbar">
//         <div className="topbar-left"><div className="hamburger-btn" onClick={()=>setSidebarOpen(true)}><MenuIcon sx={{fontSize:20}}/></div><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:"1.3rem",color:"#4f6ef7"}}>Med<span style={{color:"#7c3aed"}}>Vault</span></Typography></div>
//         <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
//           {unpaidCount>0&&<Box onClick={()=>handleNavClick("appointments")} sx={{display:"flex",alignItems:"center",gap:.75,cursor:"pointer",background:"#fff7ed",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75}}><NotificationsIcon sx={{fontSize:16,color:"#d97706"}}/><Typography sx={{fontSize:".75rem",fontWeight:600,color:"#d97706"}}>{unpaidCount} fee pending</Typography></Box>}
//           {pendingDocReqs>0&&<Box onClick={()=>handleNavClick("docrequests")} sx={{display:"flex",alignItems:"center",gap:.75,cursor:"pointer",background:"#eef1fe",border:"1px solid #c7d7f9",borderRadius:"10px",px:1.5,py:.75}}><UploadFileIcon sx={{fontSize:16,color:"#4f6ef7"}}/><Typography sx={{fontSize:".75rem",fontWeight:600,color:"#4f6ef7"}}>{pendingDocReqs} doc request{pendingDocReqs>1?"s":""}</Typography></Box>}
//           <Button startIcon={<LogoutIcon/>} onClick={handleLogout} size="small" sx={{color:"#e11d48",borderColor:"rgba(225,29,72,.3)",textTransform:"none",borderRadius:2,border:"1px solid",fontFamily:"'Outfit',sans-serif"}}>Logout</Button>
//         </Box>
//       </div>

//       {/* Content */}
//       <Box sx={{p:{xs:2,md:"36px 44px"},position:"relative",zIndex:1}}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}}>

//             {/* DASHBOARD */}
//             {view==="dashboard"&&(<>
//               <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Good morning, {patient.name?.split(" ")[0]} ☀️</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Here's your health portal overview</Typography></Box>

//               {/* Payment banners — only show for APPROVED + not paid */}
//               {appointments.filter(a=>a.status==="APPROVED"&&!isApptPaid(a.id)).map(appt=>(<Box key={appt.id} className="pay-banner" sx={{mb:2}}>
//                 <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
//                   <Box sx={{width:38,height:38,borderRadius:"11px",background:"linear-gradient(135deg,#f59e0b,#fbbf24)",display:"flex",alignItems:"center",justifyContent:"center"}}><NotificationsIcon sx={{color:"#fff",fontSize:20}}/></Box>
//                   <Box>
//                     <Typography sx={{fontWeight:600,fontSize:".88rem",color:"#92400e"}}>Appointment Confirmed — Fee Pending</Typography>
//                     <Typography sx={{fontSize:".78rem",color:"#a16207"}}>Dr. {appt.doctor?.name} · {appt.date} · ₹{appt.doctor?.consultationFee}</Typography>
//                   </Box>
//                 </Box>
//                 <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{fontSize:16}}/>} sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,whiteSpace:"nowrap"}}>Pay ₹{appt.doctor?.consultationFee}</Button>
//               </Box>))}

//               {/* Doc request banner */}
//               {pendingDocReqs>0&&(<Box onClick={()=>handleNavClick("docrequests")} sx={{cursor:"pointer",mb:2,p:"16px 20px",borderRadius:"16px",background:"linear-gradient(135deg,#eef1fe,#f0f4ff)",border:"1.5px solid rgba(79,110,247,.25)",display:"flex",alignItems:"center",gap:1.5,"&:hover":{boxShadow:"0 4px 16px rgba(79,110,247,.12)"}}}>
//                 <Box sx={{width:38,height:38,borderRadius:"11px",background:"linear-gradient(135deg,#4f6ef7,#818cf8)",display:"flex",alignItems:"center",justifyContent:"center"}}><UploadFileIcon sx={{color:"#fff",fontSize:20}}/></Box>
//                 <Box sx={{flex:1}}><Typography sx={{fontWeight:600,fontSize:".88rem",color:"#1a1f36"}}>Doctor requesting health documents</Typography><Typography sx={{fontSize:".78rem",color:"#4a5278"}}>You have {pendingDocReqs} pending document request{pendingDocReqs>1?"s":""}. Click to upload.</Typography></Box>
//                 <Typography sx={{fontSize:".78rem",color:"#4f6ef7",fontWeight:700}}>Upload →</Typography>
//               </Box>)}

//               <Box className="hero-card" sx={{mb:4,display:"flex",alignItems:"center",gap:3}}><Avatar className="av-blue" sx={{width:80,height:80,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",boxShadow:"0 8px 24px rgba(79,110,247,.3)"}}>{patient.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography><Typography sx={{color:"#8892b0",fontSize:".82rem",mt:.5}}>Patient ID · #{patient.id}</Typography><Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>{[patient.gender,`Age ${patient.age}`,patient.email,patient.contact].filter(Boolean).map((v,i)=>(<Chip key={i} label={v} size="small" sx={{background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:500,fontSize:".75rem"}}/>))}</Box></Box></Box>

//               <Grid container spacing={2.5} sx={{mb:4}}>
//                 <Grid item xs={6} sm={3}><StatCard label="Appointments" value={appointments.length} icon="📅" color="#4f6ef7"/></Grid>
//                 <Grid item xs={6} sm={3}><StatCard label="Upcoming" value={upcomingAppts.length} icon="📆" color="#059669"/></Grid>
//                 <Grid item xs={6} sm={3}><StatCard label="Prescriptions" value={prescriptions.length} icon="💊" color="#7c3aed"/></Grid>
//                 <Grid item xs={6} sm={3}><StatCard label="Medical Records" value={medicalRecords.length} icon="📋" color="#0891b2"/></Grid>
//               </Grid>

//               <div className="sec-heading">Upcoming Appointments</div>
//               {upcomingAppts.length===0?(
//                 <Box sx={{textAlign:"center",py:5,color:"#8892b0",mb:3}}>
//                   <Typography sx={{fontSize:"2rem",mb:1}}>📅</Typography>
//                   <Typography sx={{fontWeight:500,mb:1.5}}>No upcoming appointments.</Typography>
//                   <Button onClick={()=>setView("book")} size="small" variant="contained" sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Book Now →</Button>
//                 </Box>
//               ):(
//                 <Grid container spacing={2.5} sx={{mb:4}}>
//                   {upcomingAppts.slice(0,3).map((appt,i)=>(
//                     <Grid item xs={12} md={4} key={appt.id}>
//                       <motion.div whileHover={{scale:1.03}}>
//                         <Card className="light-card"><CardContent sx={{p:"20px !important"}}>
//                           <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
//                             <Avatar className={getAvatarClass(i)} sx={{width:44,height:44,borderRadius:"12px",fontSize:"1rem",fontWeight:700}}>{appt.doctor?.name?.charAt(0)}</Avatar>
//                             <Box sx={{flex:1}}><Typography sx={{fontWeight:600,fontSize:".92rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography></Box>
//                           </Box>
//                           <Box sx={{display:"flex",alignItems:"center",gap:1,mb:.75}}><CalendarTodayIcon sx={{fontSize:14,color:"#4f6ef7"}}/><Typography sx={{fontSize:".82rem",color:"#4a5278",fontWeight:600}}>{appt.date}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>· {appt.timeSlot}</Typography></Box>
//                           <Box sx={{display:"flex",alignItems:"center",gap:.75,flexWrap:"wrap"}}>
//                             <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".72rem"}}/>
//                             {appt.status==="APPROVED"&&!isApptPaid(appt.id)&&<Chip label={`₹${appt.doctor?.consultationFee} due`} size="small" onClick={()=>setPayAppt(appt)} sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".68rem",cursor:"pointer"}}/>}
//                             {appt.status==="APPROVED"&&isApptPaid(appt.id)&&<Chip label="✓ Paid" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".68rem"}}/>}
//                             {appt.docRequestStatus==="DOC_REQUEST_PENDING"&&<Chip label="📋 Docs Needed" size="small" onClick={()=>handleNavClick("docrequests")} sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".68rem",cursor:"pointer"}}/>}
//                           </Box>
//                         </CardContent></Card>
//                       </motion.div>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//             </>)}

//             {/* MY APPOINTMENTS */}
//             {view==="appointments"&&(<>
//               <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>My Appointments</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{appointments.length} total · {upcomingAppts.length} upcoming</Typography></Box>

//               {/* Payment banners */}
//               {appointments.filter(a=>a.status==="APPROVED"&&!isApptPaid(a.id)).map(appt=>(<Box key={appt.id} className="pay-banner">
//                 <Box sx={{display:"flex",alignItems:"center",gap:1.5}}><CurrencyRupeeIcon sx={{color:"#d97706",fontSize:20,flexShrink:0}}/><Box><Typography sx={{fontWeight:600,fontSize:".85rem",color:"#92400e"}}>Fee pending for Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#a16207"}}>{appt.date} · ₹{appt.doctor?.consultationFee}</Typography></Box></Box>
//                 <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small" sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,whiteSpace:"nowrap"}}>Pay Now</Button>
//               </Box>))}

//               {appointments.length===0?(<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>📅</Typography><Typography sx={{fontWeight:500}}>No appointments yet.</Typography><Button onClick={()=>setView("book")} size="small" variant="contained" sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Book an appointment →</Button></Box>):(
//                 <Grid container spacing={2.5}>
//                   {appointments.map((appt,i)=>{
//                     const isPaid=isApptPaid(appt.id);
//                     const hasFeedback=feedbackDone[appt.id];
//                     return (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{scale:1.02}}>
//                           <Card className="light-card"><CardContent sx={{p:"24px !important"}}>
//                             <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
//                               <Avatar className={getAvatarClass(i)} sx={{width:48,height:48,borderRadius:"14px",fontSize:"1.1rem",fontWeight:700}}>{appt.doctor?.name?.charAt(0)}</Avatar>
//                               <Box sx={{flex:1}}><Typography sx={{fontWeight:600,fontSize:".95rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography></Box>
//                               <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".7rem"}}/>
//                             </Box>
//                             <Divider sx={{mb:1.5,borderColor:"#f0f2f8"}}/>
//                             <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:.5}}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
//                             <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:1.5}} noWrap>📝 {appt.description||"No description"}</Typography>
//                             <Box sx={{display:"flex",flexDirection:"column",gap:1}}>
//                               {/* Show Pay button ONLY for APPROVED + not paid */}
//                               {appt.status==="APPROVED"&&!isPaid&&(
//                                 <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{fontSize:15}}/>} sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"9px",textTransform:"none",fontWeight:700,boxShadow:"0 2px 8px rgba(245,158,11,.3)"}}>
//                                   Pay Consultation Fee ₹{appt.doctor?.consultationFee}
//                                 </Button>
//                               )}
//                               {/* Show paid chip only after payment */}
//                               {appt.status==="APPROVED"&&isPaid&&(
//                                 <Chip label="✓ Payment Confirmed" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,alignSelf:"flex-start"}}/>
//                               )}
//                               {/* Doc request status */}
//                               {appt.docRequestStatus==="DOC_REQUEST_PENDING"&&(
//                                 <Chip label="📋 Doctor needs documents" size="small" onClick={()=>handleNavClick("docrequests")} sx={{background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".72rem",cursor:"pointer",alignSelf:"flex-start"}}/>
//                               )}
//                               {appt.docRequestStatus==="DOC_REQUEST_DONE"&&(
//                                 <Chip label="✓ Documents Shared" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".72rem",alignSelf:"flex-start"}}/>
//                               )}
//                               {/* Feedback — only after payment confirmed */}
//                               {appt.status==="APPROVED"&&isPaid&&!hasFeedback&&(
//                                 <Button onClick={()=>setFbAppt(appt)} size="small" variant="outlined" startIcon={<StarIcon sx={{fontSize:14}}/>} sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".78rem",borderColor:"rgba(245,158,11,.4)",color:"#d97706","&:hover":{background:"#fffbeb"}}}>
//                                   Rate this appointment
//                                 </Button>
//                               )}
//                               {hasFeedback&&<Typography sx={{fontSize:".75rem",color:"#059669",fontWeight:600,textAlign:"center"}}>⭐ Feedback submitted!</Typography>}
//                             </Box>
//                           </CardContent></Card>
//                         </motion.div>
//                       </Grid>
//                     );
//                   })}
//                 </Grid>
//               )}
//             </>)}

//             {/* BOOK */}
//             {view==="book"&&(<><Box sx={{mb:3}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Book Appointment</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Find a doctor and book directly</Typography></Box><BookAppointmentInline patient={patient} doctors={doctors}/></>)}

//             {/* MEDICAL RECORDS */}
//             {view==="records"&&(<>
//               <Box sx={{mb:4,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:2}}>
//                 <Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Medical Records</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{medicalRecords.length} record{medicalRecords.length!==1?"s":""} stored</Typography></Box>
//                 <Button variant="contained" startIcon={<UploadFileIcon/>} onClick={()=>setUploadOpen(true)} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700}}>Add Record</Button>
//               </Box>
//               <Box sx={{mb:3}}><div className="spec-chip-wrap">{["ALL",...RECORD_TYPES].map(t=>(<div key={t} className={`spec-chip ${recordTypeFilter===t?"active":""}`} onClick={()=>setRecordTypeFilter(t)}>{t==="ALL"?"All":t.replace("_"," ")}</div>))}</div></Box>
//               {filteredRecords.length===0?(<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>📋</Typography><Typography sx={{fontWeight:500}}>{medicalRecords.length===0?"No records yet.":"No records match."}</Typography>{medicalRecords.length===0&&<Button onClick={()=>setUploadOpen(true)} size="small" variant="contained" sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Upload first record →</Button>}</Box>):filteredRecords.map(record=><RecordCard key={record.id} record={record} onDelete={handleDeleteRecord}/>)}
//             </>)}

//             {/* PRESCRIPTIONS — FIX: only show ones with actual diagnosis */}
//             {view==="prescriptions"&&(<>
//               <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Prescriptions</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{prescriptions.length} prescription{prescriptions.length!==1?"s":""} from your doctors</Typography></Box>
//               {prescriptions.length===0?(
//                 <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
//                   <Typography sx={{fontSize:"2.5rem",mb:1}}>💊</Typography>
//                   <Typography sx={{fontWeight:500}}>No prescriptions yet.</Typography>
//                   <Typography sx={{fontSize:".83rem",mt:.5,maxWidth:400,mx:"auto"}}>Prescriptions appear here after your doctor writes them following an approved and paid appointment.</Typography>
//                 </Box>
//               ):prescriptions.map(rx=>(
//                 <div key={rx.id} className="rx-card">
//                   <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
//                     <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><LocalPharmacyIcon sx={{color:"#059669",fontSize:22}}/></Box>
//                     <Box sx={{flex:1}}>
//                       <Box sx={{display:"flex",alignItems:"center",gap:1.5,flexWrap:"wrap",mb:.75}}>
//                         <Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {rx.appointment?.doctor?.name}</Typography>
//                         {rx.issuedDate&&<Chip label={rx.issuedDate} size="small" sx={{background:"#f5f7ff",color:"#8892b0",fontSize:".68rem",height:20}}/>}
//                       </Box>
//                       <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:.75}}>{rx.appointment?.doctor?.specialization} · {rx.appointment?.date}</Typography>
//                       {rx.diagnosis&&(<Box sx={{background:"#f0fdf4",border:"1px solid rgba(5,150,105,.15)",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
//                         <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#059669",fontWeight:700,mb:.3}}>Diagnosis</Typography>
//                         <Typography sx={{fontSize:".88rem",fontWeight:600,color:"#1a1f36"}}>🩺 {rx.diagnosis}</Typography>
//                       </Box>)}
//                       {rx.medicines&&(<Box sx={{background:"#f8f9ff",border:"1px solid #e8ecf5",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
//                         <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#4f6ef7",fontWeight:700,mb:.5}}>💊 Medicines & Dosage</Typography>
//                         <Typography sx={{fontSize:".83rem",color:"#1a1f36",whiteSpace:"pre-line",lineHeight:1.7}}>{rx.medicines}</Typography>
//                       </Box>)}
//                       <Grid container spacing={1.5}>
//                         {rx.instructions&&(<Grid item xs={12} sm={6}><Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Instructions</Typography><Typography sx={{fontSize:".82rem",color:"#4a5278"}}>📋 {rx.instructions}</Typography></Grid>)}
//                         {rx.tests&&(<Grid item xs={12} sm={6}><Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Lab Tests</Typography><Typography sx={{fontSize:".82rem",color:"#7c3aed"}}>🔬 {rx.tests}</Typography></Grid>)}
//                         {rx.followUpDate&&(<Grid item xs={12}><Typography sx={{fontSize:".82rem",color:"#d97706",fontWeight:600}}>📅 Follow-up: {rx.followUpDate}</Typography></Grid>)}
//                       </Grid>
//                     </Box>
//                   </Box>
//                 </div>
//               ))}
//             </>)}

//             {/* DOC REQUESTS */}
//             {view==="docrequests"&&<DocRequestsView appointments={appointments} onUploaded={(updatedAppt)=>setAppointments(prev=>prev.map(a=>a.id===updatedAppt.id?updatedAppt:a))}/>}

//             {/* RECORD ACCESS REQUESTS */}
//             {view==="accessrequests"&&(<>
//               <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Record Access Requests</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Doctors requesting access to your medical records.</Typography></Box>
//               {accessRequests.length===0?(<Box sx={{textAlign:"center",py:10,color:"#8892b0"}}><Typography sx={{fontSize:"3rem",mb:2}}>🔒</Typography><Typography sx={{fontWeight:600,fontSize:"1rem",color:"#1a1f36"}}>No access requests yet</Typography></Box>):(
//                 <Grid container spacing={2.5}>{accessRequests.map(req=>{const isPending=req.status==="PENDING";const isApproved=req.status==="APPROVED";return(
//                   <Grid item xs={12} md={6} key={req.id}>
//                     <Card sx={{background:isPending?"#fffbeb":isApproved?"#ecfdf5":"#fff1f3",border:`1.5px solid ${isPending?"#fcd34d":isApproved?"#6ee7b7":"#fda4af"}`,borderRadius:"18px",boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}>
//                       <CardContent sx={{p:"24px !important"}}>
//                         <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
//                           <Avatar sx={{width:48,height:48,borderRadius:"14px",fontWeight:700,background:"linear-gradient(135deg,#4f6ef7,#818cf8)"}}>{req.doctor?.name?.charAt(0)}</Avatar>
//                           <Box sx={{flex:1}}><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {req.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{req.doctor?.specialization}</Typography></Box>
//                           <Chip label={isPending?"⏳ Pending":isApproved?"✓ Approved":"✕ Rejected"} size="small" sx={{background:isPending?"#fffbeb":isApproved?"#ecfdf5":"#fff1f3",color:isPending?"#d97706":isApproved?"#059669":"#e11d48",border:`1px solid ${isPending?"#fcd34d":isApproved?"#6ee7b7":"#fda4af"}`,fontWeight:700,fontSize:".72rem"}}/>
//                         </Box>
//                         {req.requestMessage&&<Box sx={{background:"rgba(255,255,255,.7)",borderRadius:"10px",p:"10px 14px",mb:1.5,border:"1px solid rgba(0,0,0,.06)"}}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:700,mb:.4}}>Doctor's Message</Typography><Typography sx={{fontSize:".85rem",color:"#1a1f36"}}>"{req.requestMessage}"</Typography></Box>}
//                         {isPending&&<Box sx={{display:"flex",gap:1.5}}>
//                           <Button fullWidth variant="contained" size="small" onClick={async()=>{await axios.put(`${BASE}/access/${req.id}/approve`);setAccessRequests(prev=>prev.map(r=>r.id===req.id?{...r,status:"APPROVED"}:r));}} sx={{background:"linear-gradient(135deg,#059669,#34d399)",borderRadius:"9px",textTransform:"none",fontWeight:700}}>✓ Approve Access</Button>
//                           <Button fullWidth variant="outlined" size="small" onClick={async()=>{await axios.put(`${BASE}/access/${req.id}/reject`);setAccessRequests(prev=>prev.map(r=>r.id===req.id?{...r,status:"REJECTED"}:r));}} sx={{borderRadius:"9px",textTransform:"none",fontWeight:700,borderColor:"#fda4af",color:"#e11d48","&:hover":{background:"#fff1f3"}}}>✕ Reject</Button>
//                         </Box>}
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 );})}
//                 </Grid>
//               )}
//             </>)}

//             {/* HEALTH STATUS */}
//             {view==="healthstatus"&&<HealthStatusView patientId={patient.id}/>}

//             {/* HEALTH STATS */}
//             {view==="health"&&(<><Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Health Stats</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Your health data visualized</Typography></Box><HealthStats appointments={appointments} prescriptions={prescriptions} medicalRecords={medicalRecords} payments={payments}/></>)}

//             {/* PROFILE */}
//             {view==="profile"&&(<><Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Profile</Typography></Box>
//               <Card className="light-card" sx={{p:4}}>
//                 <Box sx={{display:"flex",alignItems:"center",gap:2.5,mb:3}}><Avatar className="av-blue" sx={{width:76,height:76,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.25)"}}>{patient.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography><Typography sx={{fontSize:".82rem",color:"#8892b0",mt:.5}}>Patient Account · Active</Typography></Box></Box>
//                 <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//                 <Grid container spacing={3}>{[["Full Name",patient.name],["Email",patient.email],["Gender",patient.gender],["Date of Birth",patient.dob],["Contact",patient.contact],["Age",patient.age?`${patient.age} years`:"—"],["Patient ID",`#${patient.id}`]].map(([label,val])=>(<Grid item xs={12} sm={6} key={label}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1.1px",color:"#8892b0",fontWeight:600,mb:.6}}>{label}</Typography><Typography sx={{fontSize:".95rem",fontWeight:500,color:"#1a1f36"}}>{val||"—"}</Typography></Grid>))}</Grid>
//               </Card>
//             </>)}

//           </motion.div>
//         </AnimatePresence>
//       </Box>

//       {/* Modals */}
//       <UploadRecordModal open={uploadOpen} onClose={()=>setUploadOpen(false)} patientId={patient.id} onUploaded={newRecord=>setMedicalRecords(prev=>[newRecord,...prev])}/>
//       <PaymentModal open={Boolean(payAppt)} appointment={payAppt} onClose={()=>setPayAppt(null)} onPaid={handlePaymentDone}/>
//       <FeedbackModal open={Boolean(fbAppt)} appointment={fbAppt} onClose={()=>setFbAppt(null)} onSubmitted={handleFeedbackDone}/>
//     </Box>
//   );
// }








// import { useContext, useEffect, useState, useRef, useCallback } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import PatientProfileForm from "./PatientProfileForm";
// import {
//   Box, Typography, CircularProgress, Alert, Grid, Card, CardContent,
//   Avatar, Button, Divider, Chip, TextField, InputAdornment,
//   MenuItem, Select, Modal, IconButton, LinearProgress, Rating,
//   Dialog, DialogTitle, DialogContent, DialogActions, Snackbar,
// } from "@mui/material";
// import MenuIcon          from "@mui/icons-material/Menu";
// import CloseIcon         from "@mui/icons-material/Close";
// import LogoutIcon        from "@mui/icons-material/Logout";
// import EventIcon         from "@mui/icons-material/Event";
// import DashboardIcon     from "@mui/icons-material/Dashboard";
// import PersonIcon        from "@mui/icons-material/Person";
// import AddIcon           from "@mui/icons-material/Add";
// import SearchIcon        from "@mui/icons-material/Search";
// import FolderIcon        from "@mui/icons-material/Folder";
// import UploadFileIcon    from "@mui/icons-material/UploadFile";
// import DescriptionIcon   from "@mui/icons-material/Description";
// import DeleteIcon        from "@mui/icons-material/Delete";
// import OpenInNewIcon     from "@mui/icons-material/OpenInNew";
// import DownloadIcon      from "@mui/icons-material/Download";
// import VisibilityIcon    from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import FilterListIcon    from "@mui/icons-material/FilterList";
// import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
// import PaymentIcon       from "@mui/icons-material/Payment";
// import StarIcon          from "@mui/icons-material/Star";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CheckCircleIcon   from "@mui/icons-material/CheckCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import BarChartIcon      from "@mui/icons-material/BarChart";
// import MonitorHeartIcon  from "@mui/icons-material/MonitorHeart";
// import LockOpenIcon      from "@mui/icons-material/LockOpen";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LineChart, Line, AreaChart, Area,
//   ResponsiveContainer, XAxis, YAxis, CartesianGrid,
//   Tooltip as ReTooltip, Legend,
// } from "recharts";
// import { format } from "date-fns";

// const BASE = "http://localhost:8080";

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }
//   .sidebar-overlay{position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease;}
//   @keyframes overlayIn{from{opacity:0}to{opacity:1}}
//   .portal-sidebar{width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1);}
//   .portal-sidebar.closed{transform:translateX(-100%);}
//   .portal-sidebar.open{transform:translateX(0);}
//   .sidebar-top-row{display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px;}
//   .sidebar-logo{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px;}
//   .logo-icon{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0;}
//   .logo-accent{color:#7c3aed;}
//   .sidebar-close-btn{width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s;}
//   .sidebar-close-btn:hover{background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2);}
//   .nav-section-label{font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px;}
//   .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none;}
//   .nav-item:hover{background:#eef1fe;color:#4f6ef7;}
//   .nav-item.active{background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18);}
//   .nav-item.active .nav-icon-wrap{background:#4f6ef7 !important;color:#fff !important;}
//   .nav-icon-wrap{width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278;}
//   .sidebar-spacer{flex:1;}
//   .user-card{display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px;}
//   .user-mini-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem;}
//   .portal-topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100;}
//   .topbar-left{display:flex;align-items:center;gap:14px;}
//   .hamburger-btn{width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s;}
//   .hamburger-btn:hover{background:#eef1fe;border-color:rgba(79,110,247,.2);}
//   .blob{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;}
//   .blob-1{width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px;}
//   .blob-2{width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px;}
//   .light-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important;}
//   .light-card:hover{box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important;}
//   .hero-card{background:linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;}
//   .hero-card::after{content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none;}
//   .stat-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important;}
//   .stat-card:hover{box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .stat-value{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1;}
//   .stat-label{font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px;}
//   .stat-icon{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07;}
//   .sec-heading{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px;}
//   .sec-heading::after{content:'';flex:1;height:1px;background:#e8ecf5;}
//   .spec-chip-wrap{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0;}
//   .spec-chip{padding:6px 14px !important;border-radius:20px !important;font-size:.78rem !important;font-weight:600 !important;border:1px solid #e8ecf5 !important;cursor:pointer !important;transition:all .18s !important;background:#fff !important;color:#4a5278 !important;user-select:none;}
//   .spec-chip:hover{background:#eef1fe !important;border-color:rgba(79,110,247,.25) !important;color:#4f6ef7 !important;}
//   .spec-chip.active{background:#4f6ef7 !important;border-color:#4f6ef7 !important;color:#fff !important;}
//   .record-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:16px !important;box-shadow:0 1px 6px rgba(79,110,247,.07) !important;transition:box-shadow .22s,transform .22s !important;padding:20px 22px;margin-bottom:12px;}
//   .record-card:hover{box-shadow:0 5px 22px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
//   .rx-card{background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s;}
//   .rx-card:hover{box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px);}
//   .pay-banner{background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:16px;padding:18px 22px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
//   .upload-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:520px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto;}
//   .rzp-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:400px;background:#fff;border-radius:20px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:20px;outline:none;max-height:88vh;overflow-y:auto;}
//   .fb-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:460px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
//   .drop-zone{border:2px dashed #c7cee8;border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:all .2s;background:#f8f9ff;}
//   .drop-zone:hover,.drop-zone.dragover{border-color:#4f6ef7;background:#eef1fe;}
//   .file-preview-wrap{width:100%;border-radius:10px;overflow:hidden;border:1px solid #e8ecf5;margin-top:12px;}
//   .file-preview-wrap iframe{width:100%;height:340px;border:none;display:block;}
//   .file-preview-wrap img{width:100%;display:block;max-height:380px;object-fit:contain;background:#f8f9ff;}
//   .health-chart-card{background:#fff;border:1px solid #e8ecf5;border-radius:18px;padding:24px;box-shadow:0 1px 6px rgba(79,110,247,.06);}
//   .hbar-wrap{display:flex;flex-direction:column;gap:10px;}
//   .hbar-row{display:flex;align-items:center;gap:12px;}
//   .hbar-label{font-size:.75rem;font-weight:600;color:#4a5278;width:100px;flex-shrink:0;text-align:right;}
//   .hbar-track{flex:1;height:10px;background:#f0f2f8;border-radius:999px;overflow:hidden;}
//   .hbar-fill{height:100%;border-radius:999px;transition:width .7s cubic-bezier(.22,1,.36,1);}
//   .hbar-val{font-size:.75rem;font-weight:700;color:#1a1f36;width:48px;flex-shrink:0;}
//   .donut-svg{display:block;margin:0 auto;}
//   .mini-legend{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:12px;}
//   .mini-legend-item{display:flex;align-items:center;gap:5px;font-size:.72rem;color:#4a5278;font-weight:500;}
//   .mini-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
//   .timeline-wrap{position:relative;padding-left:22px;}
//   .timeline-wrap::before{content:'';position:absolute;left:7px;top:0;bottom:0;width:2px;background:#e8ecf5;}
//   .tl-item{position:relative;margin-bottom:14px;}
//   .tl-dot{position:absolute;left:-18px;top:4px;width:10px;height:10px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 2px currentColor;}
//   .av-blue{background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;}
//   .av-violet{background:linear-gradient(135deg,#7c3aed,#a78bfa) !important;}
//   .av-teal{background:linear-gradient(135deg,#0891b2,#22d3ee) !important;}
//   .av-rose{background:linear-gradient(135deg,#e11d48,#fb7185) !important;}
//   .av-green{background:linear-gradient(135deg,#059669,#34d399) !important;}
//   .av-amber{background:linear-gradient(135deg,#d97706,#fbbf24) !important;}
//   @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
//   .fu{animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;}
// `;
// if (!document.getElementById("portal-styles")) {
//   const s = document.createElement("style"); s.id = "portal-styles"; s.textContent = globalStyles; document.head.appendChild(s);
// }

// // ── Health Status helpers ─────────────────────────────────────────────────────
// const HS_METRICS = {
//   bloodSugarLevel:  { label:"Blood Sugar",   unit:"mg/dL", color:"#f59e0b", bg:"#fffbeb", border:"#fcd34d", safe:[70,140] },
//   heartRate:        { label:"Heart Rate",     unit:"bpm",   color:"#e11d48", bg:"#fff1f3", border:"#fda4af", safe:[60,100] },
//   oxygenSaturation: { label:"SpO₂",          unit:"%",     color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc", safe:[95,100] },
//   bodyTemperature:  { label:"Temperature",    unit:"°C",    color:"#f97316", bg:"#fff7ed", border:"#fed7aa", safe:[36.1,37.2] },
//   respiratoryRate:  { label:"Resp. Rate",     unit:"/min",  color:"#059669", bg:"#ecfdf5", border:"#6ee7b7", safe:[12,20] },
//   bmi:              { label:"BMI",            unit:"",      color:"#7c3aed", bg:"#f5f3ff", border:"#c4b5fd", safe:[18.5,24.9] },
//   weight:           { label:"Weight",         unit:"kg",    color:"#4f6ef7", bg:"#eef1fe", border:"#a5b4fc", safe:null },
// };
// const HS_EMPTY = { bloodSugarLevel:"",sugarType:"fasting",bodyTemperature:"",bloodPressure:"",heartRate:"",oxygenSaturation:"",respiratoryRate:"",height:"",weight:"" };
// const hsStatus  = (key,val) => { const s=HS_METRICS[key]?.safe; if(!s||val==null)return null; if(val<s[0])return"low"; if(val>s[1])return"high"; return"normal"; };
// const HS_SCOL   = { normal:"#059669", low:"#f59e0b", high:"#e11d48" };
// const HS_SBGCOL = { normal:"#ecfdf5", low:"#fffbeb", high:"#fff1f3" };
// const hsParseBP = (bp) => { if(!bp)return null; const[s,d]=bp.split("/").map(Number); return isNaN(s)||isNaN(d)?null:{sys:s,dia:d}; };
// const hsFmtDate = (d) => { try{return format(new Date(d),"MMM d, HH:mm");}catch{return"";} };
// const hsFmt = (v,dec=1) => (v!=null?Number(v).toFixed(dec):"—");
// const hsInputSx = { "& .MuiOutlinedInput-root":{background:"#f8f9ff",borderRadius:"12px","& fieldset":{borderColor:"#e8ecf5"},"&:hover fieldset":{borderColor:"#c7cee8"},"&.Mui-focused fieldset":{borderColor:"#4f6ef7"}},"& .MuiInputLabel-root.Mui-focused":{color:"#4f6ef7"} };
// const hsCardSx  = { background:"#fff",border:"1px solid #e8ecf5",borderRadius:"18px",boxShadow:"0 1px 6px rgba(79,110,247,.06)",transition:"box-shadow .2s,transform .2s","&:hover":{boxShadow:"0 6px 24px rgba(79,110,247,.12)",transform:"translateY(-2px)"} };
// const CHART_TOOLTIP = { contentStyle:{background:"#fff",border:"1px solid #e8ecf5",borderRadius:10,boxShadow:"0 4px 16px rgba(79,110,247,.12)",fontSize:12},labelStyle:{color:"#8892b0",fontWeight:600} };

// const avatarColors   = ["av-blue","av-violet","av-teal","av-rose","av-green","av-amber"];
// const getAvatarClass = (i) => avatarColors[i%avatarColors.length];
// const RECORD_TYPES   = ["LAB_REPORT","PRESCRIPTION","SCAN","VACCINATION","SURGERY","OTHER"];
// const RECORD_COLORS  = {
//   LAB_REPORT:{bg:"#eef1fe",color:"#4f6ef7",border:"rgba(79,110,247,.2)"},
//   PRESCRIPTION:{bg:"#ecfdf5",color:"#059669",border:"rgba(5,150,105,.2)"},
//   SCAN:{bg:"#fff1f3",color:"#e11d48",border:"rgba(225,29,72,.2)"},
//   VACCINATION:{bg:"#fffbeb",color:"#d97706",border:"rgba(217,119,6,.2)"},
//   SURGERY:{bg:"#f5f3ff",color:"#7c3aed",border:"rgba(124,58,237,.2)"},
//   OTHER:{bg:"#f5f7ff",color:"#8892b0",border:"#e8ecf5"},
// };
// const getStatusColor = (s) => s==="APPROVED"?"success":s==="REJECTED"?"error":"warning";

// function NavItem({icon,label,active,onClick,badge}) {
//   return (
//     <div className={`nav-item ${active?"active":""}`} onClick={onClick} style={{position:"relative"}}>
//       <div className="nav-icon-wrap">{icon}</div>
//       {label}
//       {badge>0&&<span style={{marginLeft:"auto",background:"#e11d48",color:"#fff",fontSize:".62rem",fontWeight:700,borderRadius:"999px",padding:"1px 7px",minWidth:18,textAlign:"center"}}>{badge}</span>}
//     </div>
//   );
// }
// function StatCard({label,value,icon,color}) {
//   return (
//     <div className="stat-card fu">
//       <div className="stat-label">{label}</div>
//       <div className="stat-value" style={{color}}>{value}</div>
//       <div className="stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── HealthStats ───────────────────────────────────────────────────────────────
// function HealthStats({appointments,prescriptions,medicalRecords,payments}) {
//   const total=appointments.length,approved=appointments.filter(a=>a.status==="APPROVED").length,pending=appointments.filter(a=>a.status==="PENDING").length,rejected=appointments.filter(a=>a.status==="REJECTED").length;
//   const typeCounts=RECORD_TYPES.reduce((acc,t)=>{acc[t]=medicalRecords.filter(r=>r.recordType===t).length;return acc;},{});
//   const now=new Date();
//   const months=Array.from({length:6},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-5+i,1);return{label:d.toLocaleString("default",{month:"short"}),year:d.getFullYear(),month:d.getMonth()};});
//   const monthlyData=months.map(m=>({label:m.label,count:appointments.filter(a=>{if(!a.date)return false;const d=new Date(a.date);return d.getFullYear()===m.year&&d.getMonth()===m.month;}).length}));
//   const maxCount=Math.max(...monthlyData.map(m=>m.count),1);
//   const donutData=[{label:"Approved",count:approved,color:"#059669"},{label:"Pending",count:pending,color:"#f59e0b"},{label:"Rejected",count:rejected,color:"#e11d48"}].filter(d=>d.count>0);
//   const r=58,cx=70,cy=70,circum=2*Math.PI*r;let offset=0;
//   const segments=donutData.map(d=>{const pct=total>0?d.count/total:0;const dash=pct*circum;const gap=circum-dash;const seg={...d,dash,gap,offset,pct};offset+=dash;return seg;});
//   const typeBars=Object.entries(typeCounts).filter(([,v])=>v>0).map(([k,v])=>({label:k.replace("_"," "),val:v,color:RECORD_COLORS[k]?.color||"#8892b0"}));
//   const maxType=Math.max(...typeBars.map(b=>b.val),1);
//   // FIX: count paid from payments map properly
//   const paidCount=Object.values(payments).filter(p=>p?.status==="SUCCESS").length;
//   const pendingPayCount=Math.max(approved-paidCount,0);
//   return (
//     <Box><Grid container spacing={2.5}>
//       <Grid item xs={12} sm={6} md={4}><div className="health-chart-card" style={{height:"100%"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Appointment Status</Typography>{total===0?(<Box sx={{textAlign:"center",py:4,color:"#c0c8e0"}}><Typography sx={{fontSize:"2rem",mb:1}}>📅</Typography><Typography sx={{fontSize:".82rem"}}>No appointments yet</Typography></Box>):(<><svg className="donut-svg" width={140} height={140} viewBox="0 0 140 140"><circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f2f8" strokeWidth={16}/>{segments.map((seg,i)=>(<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={16} strokeDasharray={`${seg.dash} ${seg.gap}`} strokeDashoffset={-seg.offset} transform="rotate(-90 70 70)"/>))}<text x={cx} y={cy-4} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1a1f36" fontFamily="'Cormorant Garamond',serif">{total}</text><text x={cx} y={cy+14} textAnchor="middle" fontSize={9} fill="#8892b0" fontFamily="Outfit,sans-serif">Total</text></svg><div className="mini-legend">{donutData.map(d=>(<div key={d.label} className="mini-legend-item"><div className="mini-dot" style={{background:d.color}}/>{d.label}: {d.count}</div>))}</div></>)}</div></Grid>
//       <Grid item xs={12} sm={6} md={4}><div className="health-chart-card" style={{height:"100%"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Monthly Activity</Typography><Box sx={{display:"flex",alignItems:"flex-end",gap:"6px",height:90,px:.5}}>{monthlyData.map((m,i)=>{const pct=m.count/maxCount;return(<Box key={i} sx={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:.5}}><Typography sx={{fontSize:".62rem",color:"#8892b0",fontWeight:600}}>{m.count||""}</Typography><Box sx={{width:"100%",background:`rgba(79,110,247,${0.15+pct*0.7})`,borderRadius:"5px 5px 0 0",height:`${Math.max(pct*68,4)}px`,transition:"height .6s ease",minHeight:4}}/><Typography sx={{fontSize:".62rem",color:"#8892b0",fontWeight:600,textAlign:"center"}}>{m.label}</Typography></Box>);})}</Box></div></Grid>
//       <Grid item xs={12} sm={6} md={4}><div className="health-chart-card" style={{height:"100%"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Payment Health</Typography><Box sx={{display:"flex",flexDirection:"column",gap:2}}>{[{label:"Paid",val:paidCount,color:"#059669",max:Math.max(approved,1)},{label:"Pending",val:pendingPayCount,color:"#f59e0b",max:Math.max(approved,1)},{label:"Records",val:medicalRecords.length,color:"#4f6ef7",max:Math.max(medicalRecords.length,1)},{label:"Rx",val:prescriptions.length,color:"#7c3aed",max:Math.max(prescriptions.length,1)}].map(item=>(<Box key={item.label}><Box sx={{display:"flex",justifyContent:"space-between",mb:.5}}><Typography sx={{fontSize:".75rem",fontWeight:600,color:"#4a5278"}}>{item.label}</Typography><Typography sx={{fontSize:".75rem",fontWeight:700,color:item.color}}>{item.val}</Typography></Box><Box sx={{height:8,background:"#f0f2f8",borderRadius:999,overflow:"hidden"}}><Box sx={{height:"100%",width:`${(item.val/item.max)*100}%`,background:item.color,borderRadius:999,transition:"width .7s ease"}}/></Box></Box>))}</Box></div></Grid>
//       <Grid item xs={12} sm={6} md={6}><div className="health-chart-card"><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Medical Record Types</Typography>{typeBars.length===0?<Box sx={{textAlign:"center",py:3,color:"#c0c8e0"}}><Typography sx={{fontSize:".82rem"}}>No records yet</Typography></Box>:(<div className="hbar-wrap">{typeBars.map(b=>(<div key={b.label} className="hbar-row"><span className="hbar-label">{b.label}</span><div className="hbar-track"><div className="hbar-fill" style={{width:`${(b.val/maxType)*100}%`,background:b.color}}/></div><span className="hbar-val" style={{color:b.color}}>{b.val}</span></div>))}</div>)}</div></Grid>
//       <Grid item xs={12} sm={6} md={6}><div className="health-chart-card"><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Prescription Timeline</Typography>{prescriptions.length===0?(<Box sx={{textAlign:"center",py:3,color:"#c0c8e0"}}><Typography sx={{fontSize:"2rem",mb:1}}>💊</Typography><Typography sx={{fontSize:".82rem"}}>No prescriptions yet</Typography></Box>):(<div className="timeline-wrap">{[...prescriptions].reverse().slice(0,5).map(rx=>(<div key={rx.id} className="tl-item"><div className="tl-dot" style={{color:"#059669",background:"#ecfdf5"}}/><Box sx={{pl:1}}><Typography sx={{fontSize:".82rem",fontWeight:700,color:"#1a1f36"}}>{rx.diagnosis||"Prescription"}</Typography><Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Dr. {rx.appointment?.doctor?.name} · {rx.issuedDate||rx.appointment?.date||"—"}</Typography>{rx.medicines&&<Typography sx={{fontSize:".72rem",color:"#4f6ef7",mt:.3}} noWrap>💊 {rx.medicines.split("\n")[0]}</Typography>}</Box></div>))}</div>)}</div></Grid>
//     </Grid></Box>
//   );
// }

// // ── HsMetricCard & HealthStatusView (unchanged from working version) ───────────
// function HsMetricCard({label,value,unit,color,bg,border,status}) {
//   return (
//     <Card sx={{background:bg,border:`1px solid ${border}`,borderRadius:"16px",boxShadow:"none",height:"100%",transition:"transform .2s,box-shadow .2s","&:hover":{transform:"translateY(-3px)",boxShadow:`0 8px 24px ${color}22`}}}>
//       <CardContent sx={{p:"20px !important"}}>
//         <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:1}}>
//           <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:700}}>{label}</Typography>
//           {status&&<Chip label={status} size="small" sx={{height:20,fontSize:".65rem",fontWeight:700,background:HS_SBGCOL[status],color:HS_SCOL[status],border:`1px solid ${HS_SCOL[status]}33`}}/>}
//         </Box>
//         <Box sx={{display:"flex",alignItems:"baseline",gap:.75,mt:.5}}>
//           <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.2rem",fontWeight:700,color,lineHeight:1}}>{value}</Typography>
//           {unit&&<Typography sx={{fontSize:".78rem",color:"#8892b0",fontWeight:600}}>{unit}</Typography>}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// function HealthStatusView({patientId}) {
//   const [hsHistory,setHsHistory]=useState([]);const [hsLatest,setHsLatest]=useState(null);const [hsLoading,setHsLoading]=useState(true);const [hsDialog,setHsDialog]=useState(false);const [hsForm,setHsForm]=useState(HS_EMPTY);const [hsEditId,setHsEditId]=useState(null);const [hsSaving,setHsSaving]=useState(false);const [hsSnack,setHsSnack]=useState({open:false,msg:"",sev:"success"});
//   const loadHS=useCallback(async()=>{if(!patientId)return;try{setHsLoading(true);const[hRes,lRes]=await Promise.allSettled([axios.get(`${BASE}/health-status/patient/${patientId}`),axios.get(`${BASE}/health-status/patient/${patientId}/latest`)]);if(hRes.status==="fulfilled")setHsHistory(hRes.value.data);if(lRes.status==="fulfilled")setHsLatest(lRes.value.data);}catch{}finally{setHsLoading(false);}},[patientId]);
//   useEffect(()=>{loadHS();},[loadHS]);
//   const openAdd=()=>{setHsForm(HS_EMPTY);setHsEditId(null);setHsDialog(true);};
//   const openEdit=(r)=>{setHsForm({bloodSugarLevel:r.bloodSugarLevel??"",sugarType:r.sugarType??"fasting",bodyTemperature:r.bodyTemperature??"",bloodPressure:r.bloodPressure??"",heartRate:r.heartRate??"",oxygenSaturation:r.oxygenSaturation??"",respiratoryRate:r.respiratoryRate??"",height:r.height??"",weight:r.weight??""});setHsEditId(r.id);setHsDialog(true);};
//   const handleSave=async()=>{setHsSaving(true);try{const payload={...hsForm,bloodSugarLevel:hsForm.bloodSugarLevel!==""?Number(hsForm.bloodSugarLevel):null,bodyTemperature:hsForm.bodyTemperature!==""?Number(hsForm.bodyTemperature):null,heartRate:hsForm.heartRate!==""?Number(hsForm.heartRate):null,oxygenSaturation:hsForm.oxygenSaturation!==""?Number(hsForm.oxygenSaturation):null,respiratoryRate:hsForm.respiratoryRate!==""?Number(hsForm.respiratoryRate):null,height:hsForm.height!==""?Number(hsForm.height):null,weight:hsForm.weight!==""?Number(hsForm.weight):null};if(hsEditId){await axios.put(`${BASE}/health-status/${hsEditId}`,payload);}else{await axios.post(`${BASE}/health-status/patient/${patientId}`,payload);}setHsDialog(false);setHsSnack({open:true,msg:hsEditId?"Updated!":"Saved!",sev:"success"});loadHS();}catch{setHsSnack({open:true,msg:"Save failed.",sev:"error"});}finally{setHsSaving(false);}};
//   const chartData=[...hsHistory].reverse().slice(-12).map(r=>({time:hsFmtDate(r.recordedAt),bloodSugar:r.bloodSugarLevel,heartRate:r.heartRate,spO2:r.oxygenSaturation,temp:r.bodyTemperature,bmi:r.bmi,weight:r.weight,resp:r.respiratoryRate}));
//   const bpData=[...hsHistory].reverse().slice(-12).map(r=>{const bp=hsParseBP(r.bloodPressure);return{time:hsFmtDate(r.recordedAt),systolic:bp?.sys??null,diastolic:bp?.dia??null};});
//   const estBMI=hsForm.height&&hsForm.weight?(Number(hsForm.weight)/Math.pow(Number(hsForm.height)/100,2)).toFixed(1):null;
//   if(hsLoading)return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:340}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>);
//   return (
//     <Box>
//       <Box sx={{mb:4,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:2}}>
//         <Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Health Status</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{hsHistory.length>0?`${hsHistory.length} reading${hsHistory.length>1?"s":""}`:""}</Typography></Box>
//         <Button onClick={openAdd} variant="contained" sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,px:3,py:1.4,boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>+ Log Reading</Button>
//       </Box>
//       {hsHistory.length===0?(<Box sx={{textAlign:"center",py:10}}><Typography sx={{fontSize:64,mb:2}}>🩺</Typography><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>No health data yet</Typography><Button onClick={openAdd} variant="contained" sx={{mt:3,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,px:4}}>Log Your First Reading</Button></Box>):(
//         <>
//           <div className="sec-heading" style={{marginBottom:16}}>Latest Vitals</div>
//           <Grid container spacing={2} sx={{mb:4}}>{Object.entries(HS_METRICS).map(([key,cfg])=>{const val=hsLatest?.[key];const st=hsStatus(key,val);return(<Grid item xs={6} sm={4} md={3} key={key}><HsMetricCard label={cfg.label} value={val!=null?hsFmt(val,key==="heartRate"||key==="respiratoryRate"?0:1):"—"} unit={cfg.unit} color={cfg.color} bg={cfg.bg} border={cfg.border} status={st}/></Grid>);})}
//             <Grid item xs={6} sm={4} md={3}><HsMetricCard label="Blood Pressure" value={hsLatest?.bloodPressure??"—"} unit="mmHg" color="#7c3aed" bg="#f5f3ff" border="#c4b5fd" status={null}/></Grid>
//           </Grid>
//           <div className="sec-heading" style={{marginBottom:16}}>Trends Over Time</div>
//           <Box sx={{mb:3}}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>Blood Sugar Level</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>mg/dL readings over time</Typography><ResponsiveContainer width="100%" height={260}><AreaChart data={chartData} margin={{top:5,right:20,left:0,bottom:5}}><defs><linearGradient id="gradSugar" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.18}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}}/><ReTooltip {...CHART_TOOLTIP}/><Area type="monotone" dataKey="bloodSugar" stroke="#f59e0b" fill="url(#gradSugar)" strokeWidth={3} dot={{fill:"#f59e0b",r:5,strokeWidth:2,stroke:"#fff"}} name="Blood Sugar (mg/dL)"/></AreaChart></ResponsiveContainer></CardContent></Card></Box>
//           <Grid container spacing={3} sx={{mb:3}}>
//             <Grid item xs={12} md={6}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>Heart Rate</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>bpm · Normal: 60–100</Typography><ResponsiveContainer width="100%" height={240}><LineChart data={chartData} margin={{top:5,right:20,left:0,bottom:5}}><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}} domain={[40,160]}/><ReTooltip {...CHART_TOOLTIP}/><Line type="monotone" dataKey="heartRate" stroke="#e11d48" strokeWidth={3} dot={{fill:"#e11d48",r:5,strokeWidth:2,stroke:"#fff"}} name="Heart Rate (bpm)"/></LineChart></ResponsiveContainer></CardContent></Card></Grid>
//             <Grid item xs={12} md={6}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>SpO₂</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>% · Normal: 95–100</Typography><ResponsiveContainer width="100%" height={240}><AreaChart data={chartData} margin={{top:5,right:20,left:0,bottom:5}}><defs><linearGradient id="gradSpO2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0891b2" stopOpacity={0.18}/><stop offset="95%" stopColor="#0891b2" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}} domain={[85,100]}/><ReTooltip {...CHART_TOOLTIP}/><Area type="monotone" dataKey="spO2" stroke="#0891b2" fill="url(#gradSpO2)" strokeWidth={3} dot={{fill:"#0891b2",r:5,strokeWidth:2,stroke:"#fff"}} name="SpO₂ (%)"/></AreaChart></ResponsiveContainer></CardContent></Card></Grid>
//           </Grid>
//           <Box sx={{mb:3}}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>Blood Pressure</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>Systolic / Diastolic mmHg</Typography><ResponsiveContainer width="100%" height={260}><AreaChart data={bpData} margin={{top:5,right:20,left:0,bottom:5}}><defs><linearGradient id="gradSys" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e11d48" stopOpacity={0.15}/><stop offset="95%" stopColor="#e11d48" stopOpacity={0}/></linearGradient><linearGradient id="gradDia" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}} domain={[40,200]}/><ReTooltip {...CHART_TOOLTIP}/><Legend wrapperStyle={{fontSize:13,paddingTop:8}}/><Area type="monotone" dataKey="systolic" stroke="#e11d48" fill="url(#gradSys)" strokeWidth={3} dot={{fill:"#e11d48",r:4,strokeWidth:2,stroke:"#fff"}} name="Systolic (mmHg)"/><Area type="monotone" dataKey="diastolic" stroke="#7c3aed" fill="url(#gradDia)" strokeWidth={3} dot={{fill:"#7c3aed",r:4,strokeWidth:2,stroke:"#fff"}} name="Diastolic (mmHg)"/></AreaChart></ResponsiveContainer></CardContent></Card></Box>
//           <div className="sec-heading" style={{marginBottom:16}}>Reading History</div>
//           <Card sx={{...hsCardSx,"&:hover":{}}}><CardContent sx={{p:"0 !important"}}><Box sx={{overflowX:"auto"}}><Box component="table" sx={{width:"100%",borderCollapse:"collapse"}}><Box component="thead"><Box component="tr" sx={{background:"#f8f9ff"}}>{["Date","Blood Sugar","Temp","B.P.","Heart Rate","SpO₂","Resp.","BMI",""].map(h=>(<Box component="th" key={h} sx={{p:"14px 18px",textAlign:"left",color:"#8892b0",fontSize:".72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",borderBottom:"1px solid #e8ecf5",whiteSpace:"nowrap"}}>{h}</Box>))}</Box></Box><Box component="tbody">{hsHistory.map((r,idx)=>(<Box component="tr" key={r.id} sx={{background:idx%2===0?"#fff":"#fafbff","&:hover":{background:"#eef1fe"}}}>{[hsFmtDate(r.recordedAt),r.bloodSugarLevel?`${r.bloodSugarLevel} mg/dL`:"—",r.bodyTemperature?`${r.bodyTemperature}°C`:"—",r.bloodPressure??"—",r.heartRate?`${r.heartRate} bpm`:"—",r.oxygenSaturation?`${r.oxygenSaturation}%`:"—",r.respiratoryRate?`${r.respiratoryRate}/min`:"—",r.bmi?Number(r.bmi).toFixed(1):"—"].map((cell,i)=>(<Box component="td" key={i} sx={{p:"12px 18px",color:"#1a1f36",fontSize:".85rem",borderBottom:"1px solid #f0f2f8",whiteSpace:"nowrap"}}>{cell}</Box>))}<Box component="td" sx={{p:"12px 18px",borderBottom:"1px solid #f0f2f8"}}><Button size="small" onClick={()=>openEdit(r)} sx={{background:"#eef1fe",color:"#4f6ef7",textTransform:"none",fontWeight:700,fontSize:".78rem",borderRadius:"8px",px:1.5,py:.5,minWidth:0,"&:hover":{background:"#4f6ef7",color:"#fff"}}}>Edit</Button></Box></Box>))}</Box></Box></Box></CardContent></Card>
//         </>
//       )}
//       <Dialog open={hsDialog} onClose={()=>setHsDialog(false)} maxWidth="sm" fullWidth PaperProps={{sx:{borderRadius:"20px",border:"1px solid #e8ecf5"}}}>
//         <DialogTitle sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36",borderBottom:"1px solid #e8ecf5",pb:2}}>{hsEditId?"✏️ Update Reading":"🩺 Log New Reading"}</DialogTitle>
//         <DialogContent sx={{pt:"24px !important"}}><Grid container spacing={2}>
//           <Grid item xs={8}><TextField fullWidth label="Blood Sugar (mg/dL)" type="number" sx={hsInputSx} value={hsForm.bloodSugarLevel} onChange={e=>setHsForm({...hsForm,bloodSugarLevel:e.target.value})}/></Grid>
//           <Grid item xs={4}><TextField fullWidth select label="Type" sx={hsInputSx} value={hsForm.sugarType} onChange={e=>setHsForm({...hsForm,sugarType:e.target.value})}>{["fasting","post-meal","random"].map(o=><MenuItem key={o} value={o}>{o}</MenuItem>)}</TextField></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Temperature (°C)" type="number" sx={hsInputSx} value={hsForm.bodyTemperature} onChange={e=>setHsForm({...hsForm,bodyTemperature:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Blood Pressure (e.g. 120/80)" sx={hsInputSx} value={hsForm.bloodPressure} onChange={e=>setHsForm({...hsForm,bloodPressure:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Heart Rate (bpm)" type="number" sx={hsInputSx} value={hsForm.heartRate} onChange={e=>setHsForm({...hsForm,heartRate:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="SpO₂ (%)" type="number" sx={hsInputSx} value={hsForm.oxygenSaturation} onChange={e=>setHsForm({...hsForm,oxygenSaturation:e.target.value})}/></Grid>
//           <Grid item xs={12}><TextField fullWidth label="Respiratory Rate (/min)" type="number" sx={hsInputSx} value={hsForm.respiratoryRate} onChange={e=>setHsForm({...hsForm,respiratoryRate:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Height (cm)" type="number" sx={hsInputSx} value={hsForm.height} onChange={e=>setHsForm({...hsForm,height:e.target.value})}/></Grid>
//           <Grid item xs={6}><TextField fullWidth label="Weight (kg)" type="number" sx={hsInputSx} value={hsForm.weight} onChange={e=>setHsForm({...hsForm,weight:e.target.value})}/></Grid>
//           {estBMI&&(<Grid item xs={12}><Box sx={{background:"#f5f3ff",border:"1px solid #c4b5fd",borderRadius:"12px",px:2,py:1.5,display:"flex",alignItems:"center",gap:1.5}}><Typography sx={{fontSize:"1.4rem"}}>⚖️</Typography><Box><Typography sx={{fontSize:".7rem",color:"#8892b0",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Estimated BMI</Typography><Typography sx={{fontSize:"1.1rem",fontWeight:700,color:"#7c3aed"}}>{estBMI}</Typography></Box></Box></Grid>)}
//         </Grid></DialogContent>
//         <DialogActions sx={{p:"20px 24px",borderTop:"1px solid #e8ecf5",gap:1}}>
//           <Button onClick={()=>setHsDialog(false)} sx={{color:"#8892b0",textTransform:"none",fontWeight:600,borderRadius:"10px"}}>Cancel</Button>
//           <Button onClick={handleSave} disabled={hsSaving} variant="contained" sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:700,px:3}}>{hsSaving?<CircularProgress size={18} sx={{color:"#fff"}}/>:hsEditId?"Update":"Save"}</Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar open={hsSnack.open} autoHideDuration={3000} onClose={()=>setHsSnack({...hsSnack,open:false})}><Alert severity={hsSnack.sev} sx={{borderRadius:"12px"}}>{hsSnack.msg}</Alert></Snackbar>
//     </Box>
//   );
// }

// // ── DocRequestsView ───────────────────────────────────────────────────────────
// function DocRequestsView({appointments,onUploaded}) {
//   const [uploadingId,setUploadingId]=useState(null);
//   const fileRefs=useRef({});
//   const handleUpload=async(apptId,file)=>{
//     if(!file)return;setUploadingId(apptId);
//     try{const fd=new FormData();fd.append("file",file);const res=await axios.post(`${BASE}/appointments/${apptId}/upload-doc`,fd,{headers:{"Content-Type":"multipart/form-data"}});onUploaded(res.data);}
//     catch{alert("Upload failed.");}finally{setUploadingId(null);}
//   };
//   const docAppts=appointments.filter(a=>a.docRequestStatus==="DOC_REQUEST_PENDING"||a.docRequestStatus==="DOC_REQUEST_DONE");
//   return (
//     <Box>
//       <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Document Requests</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Your doctors have requested health documents for these appointments.</Typography></Box>
//       {docAppts.length===0?(<Box sx={{textAlign:"center",py:10,color:"#8892b0"}}><Typography sx={{fontSize:"3rem",mb:2}}>📋</Typography><Typography sx={{fontWeight:600,fontSize:"1rem",color:"#1a1f36"}}>No document requests</Typography><Typography sx={{fontSize:".85rem",mt:1}}>When a doctor requests health documents, they will appear here.</Typography></Box>):(
//         <Grid container spacing={2.5}>{docAppts.map(appt=>{
//           const isPending=appt.docRequestStatus==="DOC_REQUEST_PENDING";const isDone=appt.docRequestStatus==="DOC_REQUEST_DONE";const docUrl=appt.docFileName?`${BASE}/appointments/doc/${appt.docFileName}`:null;
//           return (<Grid item xs={12} md={6} key={appt.id}><Card sx={{background:isDone?"#ecfdf5":"#fffbeb",border:`1.5px solid ${isDone?"#6ee7b7":"#fcd34d"}`,borderRadius:"18px",boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}><CardContent sx={{p:"24px !important"}}>
//             <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}><Avatar sx={{width:48,height:48,borderRadius:"14px",fontWeight:700,background:"linear-gradient(135deg,#4f6ef7,#818cf8)"}}>{appt.doctor?.name?.charAt(0)}</Avatar><Box sx={{flex:1}}><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization} · {appt.date} · {appt.timeSlot}</Typography></Box><Chip label={isDone?"✓ Uploaded":"⏳ Upload Needed"} size="small" sx={{background:isDone?"#ecfdf5":"#fffbeb",color:isDone?"#059669":"#d97706",border:`1px solid ${isDone?"#6ee7b7":"#fcd34d"}`,fontWeight:700,fontSize:".72rem"}}/></Box>
//             {appt.docRequestMessage&&(<Box sx={{background:"rgba(255,255,255,.8)",borderRadius:"10px",p:"10px 14px",mb:1.5,border:"1px solid rgba(0,0,0,.06)"}}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:700,mb:.4}}>Doctor's Request</Typography><Typography sx={{fontSize:".85rem",color:"#1a1f36"}}>"{appt.docRequestMessage}"</Typography></Box>)}
//             {isDone&&docUrl?(<Box sx={{display:"flex",gap:1,alignItems:"center"}}><a href={docUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:8,fontSize:".78rem",fontWeight:600,textDecoration:"none",background:"linear-gradient(135deg,#059669,#34d399)",color:"#fff"}}>👁 View Document</a><Typography sx={{fontSize:".76rem",color:"#059669",fontWeight:600}}>Shared ✓</Typography></Box>)
//             :isPending?(<Box><input type="file" ref={el=>fileRefs.current[appt.id]=el} style={{display:"none"}} accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={e=>handleUpload(appt.id,e.target.files[0])}/><Button fullWidth variant="contained" disabled={uploadingId===appt.id} onClick={()=>fileRefs.current[appt.id]?.click()} startIcon={<UploadFileIcon sx={{fontSize:16}}/>} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:700}}>{uploadingId===appt.id?"Uploading…":"Upload Health Documents"}</Button><Typography sx={{fontSize:".72rem",color:"#8892b0",textAlign:"center",mt:1}}>PDF, images, Word documents · Max 10 MB</Typography></Box>):null}
//           </CardContent></Card></Grid>);
//         })}</Grid>
//       )}
//     </Box>
//   );
// }

// // ── PaymentModal — compact, button always visible ──────────────────────────────
// function PaymentModal({open,onClose,appointment,onPaid}) {
//   const [step,setStep]=useState("summary");
//   const [cardNum,setCardNum]=useState("");
//   const [cvv,setCvv]=useState("");
//   const [expiry,setExpiry]=useState("");
//   const [name,setName]=useState("");
//   const [payError,setPayError]=useState("");

//   useEffect(()=>{
//     if(open){setStep("summary");setCardNum("");setCvv("");setExpiry("");setName("");setPayError("");}
//   },[open]);

//   const fieldSx={"& .MuiOutlinedInput-root":{borderRadius:"9px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}};

//   const handlePay = async () => {
//     if(!cardNum||cardNum.length<16){setPayError("Please enter a valid 16-digit card number.");return;}
//     if(!name.trim()){setPayError("Please enter cardholder name.");return;}
//     if(!expiry||expiry.length<5){setPayError("Please enter valid expiry (MM/YY).");return;}
//     if(!cvv||cvv.length<3){setPayError("Please enter valid CVV.");return;}
//     setPayError("");
//     setStep("processing");
//     try {
//       await axios.post(`${BASE}/payments/create-order/${appointment.id}`);
//       const dummyPayId="pay_dummy_"+Date.now();
//       await axios.post(`${BASE}/payments/confirm/${appointment.id}`,{razorpayPaymentId:dummyPayId});
//       setStep("done");
//       setTimeout(()=>{onPaid(appointment.id);onClose();setStep("summary");},1800);
//     } catch(e) {
//       setStep("summary");
//       setPayError("Payment failed. Please try again.");
//     }
//   };

//   if(!appointment)return null;
//   const fee=appointment.doctor?.consultationFee||0;

//   const handleClose = () => {
//     if(step==="processing")return;
//     setStep("summary");setCardNum("");setCvv("");setExpiry("");setName("");setPayError("");
//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box className="rzp-modal-box">
//         {/* Compact header */}
//         <Box sx={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:"11px",p:"11px 16px",mb:2,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
//           <Box><div style={{color:"#fff",fontSize:"1rem",fontWeight:800}}>razorpay</div><Typography sx={{color:"rgba(255,255,255,.65)",fontSize:".68rem"}}>Secure Payment</Typography></Box>
//           <Box sx={{textAlign:"right"}}><Typography sx={{color:"rgba(255,255,255,.65)",fontSize:".68rem"}}>Amount</Typography><Typography sx={{color:"#fff",fontSize:"1.25rem",fontWeight:800,fontFamily:"'Cormorant Garamond',serif"}}>₹{fee}</Typography></Box>
//         </Box>
//         {step==="summary"&&(
//           <>
//             {/* Compact appointment summary */}
//             <Box sx={{background:"#f8f9ff",border:"1px solid #e8ecf5",borderRadius:"10px",p:"10px 14px",mb:1.5}}>
//               {[["Doctor",`Dr. ${appointment.doctor?.name}`],["Date & Time",`${appointment.date} · ${appointment.timeSlot}`],["Fee",`₹${fee}`]].map(([l,v])=>(
//                 <Box key={l} sx={{display:"flex",justifyContent:"space-between",mb:.4}}>
//                   <Typography sx={{color:"#8892b0",fontSize:".76rem"}}>{l}</Typography>
//                   <Typography sx={{color:"#1a1f36",fontWeight:600,fontSize:".76rem"}}>{v||"—"}</Typography>
//                 </Box>
//               ))}
//             </Box>
//             <Typography sx={{fontSize:".65rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.8}}>Card Details</Typography>
//             <Box sx={{display:"flex",flexDirection:"column",gap:.9}}>
//               <TextField size="small" fullWidth placeholder="Card Number (16 digits)" variant="outlined" sx={fieldSx} value={cardNum} onChange={e=>setCardNum(e.target.value.replace(/\D/g,"").slice(0,16))} inputProps={{maxLength:16}}/>
//               <TextField size="small" fullWidth placeholder="Cardholder Name" variant="outlined" sx={fieldSx} value={name} onChange={e=>setName(e.target.value)}/>
//               <Grid container spacing={1}>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="MM/YY" variant="outlined" sx={fieldSx} value={expiry} onChange={e=>{let v=e.target.value.replace(/\D/g,"");if(v.length>=2)v=v.slice(0,2)+"/"+v.slice(2);setExpiry(v.slice(0,5));}}/></Grid>
//                 <Grid item xs={6}><TextField size="small" fullWidth placeholder="CVV" type="password" variant="outlined" sx={fieldSx} value={cvv} onChange={e=>setCvv(e.target.value.replace(/\D/g,"").slice(0,3))} inputProps={{maxLength:3}}/></Grid>
//               </Grid>
//             </Box>
//             {payError&&<Box sx={{mt:1,p:"7px 12px",borderRadius:"8px",background:"#fff1f3",border:"1px solid rgba(225,29,72,.2)"}}><Typography sx={{fontSize:".74rem",color:"#e11d48",fontWeight:600}}>⚠ {payError}</Typography></Box>}
//             <Box sx={{display:"flex",gap:1.5,mt:1.5,flexShrink:0}}>
//               <Button onClick={handleClose} variant="outlined" sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,borderColor:"#e8ecf5",color:"#8892b0",px:2}}>Cancel</Button>
//               <Button onClick={handlePay} variant="contained" fullWidth sx={{borderRadius:"9px",textTransform:"none",fontWeight:700,fontSize:".88rem",background:"linear-gradient(135deg,#1e3a8a,#2563eb)"}}>Pay ₹{fee}</Button>
//             </Box>
//           </>
//         )}
//         {step==="processing"&&(
//           <Box sx={{textAlign:"center",py:3}}>
//             <CircularProgress sx={{color:"#2563eb",mb:2}} size={48}/>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36",mb:.5}}>Processing Payment…</Typography>
//             <Typography sx={{fontSize:".82rem",color:"#8892b0"}}>Please do not close this window</Typography>
//             <LinearProgress sx={{mt:3,borderRadius:4,height:4,background:"#e8ecf5","& .MuiLinearProgress-bar":{background:"#2563eb"}}}/>
//           </Box>
//         )}
//         {step==="done"&&(
//           <Box sx={{textAlign:"center",py:2}}>
//             <Box sx={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#059669,#34d399)",display:"flex",alignItems:"center",justifyContent:"center",mx:"auto",mb:2,boxShadow:"0 6px 20px rgba(5,150,105,.3)"}}><CheckCircleIcon sx={{color:"#fff",fontSize:34}}/></Box>
//             <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#059669",mb:.5}}>Payment Successful!</Typography>
//             <Typography sx={{fontSize:".85rem",color:"#8892b0"}}>₹{fee} paid successfully</Typography>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// // ── FeedbackModal ─────────────────────────────────────────────────────────────
// function FeedbackModal({open,onClose,appointment,onSubmitted}) {
//   const[rating,setRating]=useState(0);const[comment,setComment]=useState("");const[loading,setLoading]=useState(false);const[done,setDone]=useState(false);
//   const handleSubmit=async()=>{if(!rating){alert("Please select a rating");return;}setLoading(true);try{await axios.post(`${BASE}/feedback`,{appointmentId:appointment.id,doctorId:appointment.doctor?.id,patientId:appointment.patient?.id,rating,comment});setDone(true);onSubmitted(appointment.id);setTimeout(()=>{setDone(false);setRating(0);setComment("");onClose();},1500);}catch{setDone(true);onSubmitted(appointment.id);setTimeout(()=>{setDone(false);setRating(0);setComment("");onClose();},1500);}finally{setLoading(false);}};
//   if(!appointment)return null;
//   return (
//     <Modal open={open} onClose={onClose}><Box className="fb-modal-box">
//       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36"}}>Rate Your Experience</Typography><IconButton size="small" onClick={onClose} sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton></Box>
//       {done?(<Box sx={{textAlign:"center",py:3}}><Typography sx={{fontSize:"2.5rem",mb:1}}>⭐</Typography><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#059669"}}>Thank you!</Typography></Box>):(<><Typography sx={{fontSize:".8rem",color:"#8892b0",mb:2}}>Dr. {appointment.doctor?.name} · {appointment.date}</Typography><Box sx={{display:"flex",justifyContent:"center",mb:3}}><Rating size="large" value={rating} onChange={(_,v)=>setRating(v)} sx={{"& .MuiRating-iconFilled":{color:"#f59e0b"}}}/></Box><TextField fullWidth multiline rows={3} placeholder="Share your experience…" variant="outlined" value={comment} onChange={e=>setComment(e.target.value)} sx={{mb:3,"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"}}}/><Button onClick={handleSubmit} variant="contained" fullWidth disabled={loading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700}}>{loading?"Submitting…":"Submit Feedback"}</Button></>)}
//     </Box></Modal>
//   );
// }

// // ── UploadRecordModal ─────────────────────────────────────────────────────────
// function UploadRecordModal({open,onClose,patientId,onUploaded}) {
//   const[form,setForm]=useState({title:"",recordType:"LAB_REPORT",recordDate:"",issuedBy:"",description:""});const[file,setFile]=useState(null);const[dragOver,setDragOver]=useState(false);const[loading,setLoading]=useState(false);const[error,setError]=useState("");const fileRef=useRef();
//   const handleFile=f=>{if(!f)return;if(f.size>10*1024*1024){setError("Max 10 MB.");return;}setError("");setFile(f);};
//   const handleSubmit=async()=>{if(!form.title){setError("Title required.");return;}setLoading(true);setError("");try{const fd=new FormData();fd.append("patientId",patientId);fd.append("title",form.title);fd.append("recordType",form.recordType);fd.append("recordDate",form.recordDate);fd.append("issuedBy",form.issuedBy);fd.append("description",form.description);if(file)fd.append("file",file);const res=await axios.post(`${BASE}/medical-records/upload`,fd,{headers:{"Content-Type":"multipart/form-data"}});onUploaded(res.data);setForm({title:"",recordType:"LAB_REPORT",recordDate:"",issuedBy:"",description:""});setFile(null);onClose();}catch(e){setError(e?.response?.data||"Upload failed.");}finally{setLoading(false);}};
//   const fieldSx={"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}};
//   return (
//     <Modal open={open} onClose={onClose}><Box className="upload-modal-box">
//       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#1a1f36"}}>Add Medical Record</Typography><IconButton size="small" onClick={onClose} sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton></Box>
//       <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
//         <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Title *</Typography><TextField fullWidth size="small" variant="outlined" placeholder="e.g. Blood Test Report" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} sx={fieldSx}/></Box>
//         <Grid container spacing={2}><Grid item xs={6}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Record Type</Typography><Select fullWidth size="small" value={form.recordType} onChange={e=>setForm({...form,recordType:e.target.value})} sx={{"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}}}>{RECORD_TYPES.map(t=><MenuItem key={t} value={t}>{t.replace("_"," ")}</MenuItem>)}</Select></Grid><Grid item xs={6}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Date</Typography><TextField fullWidth size="small" type="date" variant="outlined" value={form.recordDate} onChange={e=>setForm({...form,recordDate:e.target.value})} sx={fieldSx}/></Grid></Grid>
//         <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Issued By</Typography><TextField fullWidth size="small" variant="outlined" placeholder="e.g. Dr. Ramesh Kumar" value={form.issuedBy} onChange={e=>setForm({...form,issuedBy:e.target.value})} sx={fieldSx}/></Box>
//         <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Notes</Typography><TextField fullWidth size="small" multiline rows={2} variant="outlined" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} sx={fieldSx}/></Box>
//         <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Attach File (max 10 MB)</Typography><div className={`drop-zone ${dragOver?"dragover":""}`} onClick={()=>fileRef.current?.click()} onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0]);}}><input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={e=>handleFile(e.target.files[0])}/><UploadFileIcon sx={{fontSize:32,color:"#c0c8e0",mb:1}}/>{file?<Typography sx={{fontSize:".85rem",fontWeight:600,color:"#4f6ef7"}}>{file.name}</Typography>:<Typography sx={{fontSize:".82rem",color:"#8892b0"}}>Click or drag & drop</Typography>}</div></Box>
//         {error&&<Box sx={{background:"#fff1f3",border:"1px solid rgba(225,29,72,.2)",borderRadius:"10px",padding:"10px 14px",fontSize:".83rem",color:"#e11d48",fontWeight:500}}>⚠ {error}</Box>}
//         {loading&&<LinearProgress sx={{borderRadius:4,height:4}}/>}
//         <Button onClick={handleSubmit} variant="contained" disabled={loading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".92rem",py:1.4}}>{loading?"Uploading…":"Save Record"}</Button>
//       </Box>
//     </Box></Modal>
//   );
// }

// // ── RecordCard ────────────────────────────────────────────────────────────────
// function RecordCard({record,onDelete}) {
//   const[showPreview,setShowPreview]=useState(false);const sc=RECORD_COLORS[record.recordType]||RECORD_COLORS.OTHER;const fileUrl=record.fileName?`${BASE}/medical-records/file/${record.fileName}`:null;const lower=(record.fileName||"").toLowerCase();const isPdf=lower.endsWith(".pdf");const isImage=lower.endsWith(".png")||lower.endsWith(".jpg")||lower.endsWith(".jpeg")||lower.endsWith(".webp");
//   return (
//     <div className="record-card">
//       <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
//         <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:sc.bg,border:`1px solid ${sc.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}><DescriptionIcon sx={{color:sc.color,fontSize:22}}/></Box>
//         <Box sx={{flex:1,minWidth:0}}>
//           <Box sx={{display:"flex",alignItems:"center",gap:1,flexWrap:"wrap",mb:.5}}><Typography sx={{fontWeight:700,fontSize:".92rem",color:"#1a1f36"}}>{record.title}</Typography><Chip label={record.recordType?.replace("_"," ")} size="small" sx={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontWeight:600,fontSize:".68rem",height:22}}/></Box>
//           {record.issuedBy&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>👤 {record.issuedBy}</Typography>}
//           {record.recordDate&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>📅 {record.recordDate}</Typography>}
//           {record.description&&<Typography sx={{fontSize:".8rem",color:"#4a5278",mt:.5}}>{record.description}</Typography>}
//           {fileUrl&&(<Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>
//             {(isPdf||isImage)&&(<button onClick={()=>setShowPreview(p=>!p)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,cursor:"pointer",fontSize:".76rem",fontWeight:600,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",color:"#fff",border:"none",fontFamily:"'Outfit',sans-serif"}}>{showPreview?<><VisibilityOffIcon sx={{fontSize:13}}/> Hide</>:<><VisibilityIcon sx={{fontSize:13}}/> Preview</>}</button>)}
//             <a href={fileUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.2)"}}><OpenInNewIcon sx={{fontSize:13}}/> Open</a>
//             <a href={fileUrl} download={record.fileName} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#f5f7ff",color:"#4a5278",border:"1px solid #e8ecf5"}}><DownloadIcon sx={{fontSize:13}}/> Download</a>
//           </Box>)}
//           {showPreview&&fileUrl&&(<div className="file-preview-wrap">{isPdf&&<iframe src={fileUrl} title={record.title}/>}{isImage&&<img src={fileUrl} alt={record.title}/>}</div>)}
//         </Box>
//         <IconButton size="small" onClick={()=>onDelete(record.id)} sx={{color:"#e11d48",background:"#fff1f3",borderRadius:"9px",flexShrink:0,"&:hover":{background:"#fce7f3"}}}><DeleteIcon sx={{fontSize:17}}/></IconButton>
//       </Box>
//     </div>
//   );
// }

// // ── BookAppointmentInline ─────────────────────────────────────────────────────
// function BookAppointmentInline({patient,doctors}) {
//   const[searchQuery,setSearchQuery]=useState("");const[activeSpec,setActiveSpec]=useState("All");const[bookingDocId,setBookingDocId]=useState(null);const[bookForm,setBookForm]=useState({date:"",timeSlot:"",description:""});const[bookLoading,setBookLoading]=useState(false);const[bookSuccess,setBookSuccess]=useState(false);
//   const specializations=["All",...Array.from(new Set(doctors.map(d=>d.specialization).filter(Boolean))).sort()];
//   const filteredDoctors=doctors.filter(doc=>{const bySpec=activeSpec==="All"||doc.specialization===activeSpec;const q=searchQuery.toLowerCase();const bySearch=!q||doc.name?.toLowerCase().includes(q)||doc.specialization?.toLowerCase().includes(q)||doc.hospital?.toLowerCase().includes(q);return bySpec&&bySearch;});
//   const selectedDoc=doctors.find(d=>d.id===bookingDocId);
//   const handleBook=async()=>{
//     if(!bookForm.date||!bookForm.timeSlot){alert("Please select date and time slot.");return;}
//     setBookLoading(true);
//     try{
//       const params=new URLSearchParams({patientId:patient.id,doctorId:bookingDocId,date:bookForm.date,timeSlot:bookForm.timeSlot,description:bookForm.description});
//       await axios.post(`${BASE}/appointments/book?${params}`);
//       setBookSuccess(true);setBookForm({date:"",timeSlot:"",description:""});setBookingDocId(null);
//       setTimeout(()=>setBookSuccess(false),4000);
//     }catch(e){alert(e?.response?.data||"Booking failed. Please try again.");}
//     finally{setBookLoading(false);}
//   };
//   if(bookingDocId&&selectedDoc){
//     const fieldSx={"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"}};
//     return (<motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.3}}>
//       <Box sx={{mb:3}}><Button size="small" onClick={()=>setBookingDocId(null)} sx={{color:"#4f6ef7",textTransform:"none",fontWeight:600,fontSize:".82rem",p:0}}>← Back to Doctors</Button></Box>
//       <Card className="light-card" sx={{p:4,maxWidth:560}}>
//         <Box sx={{display:"flex",alignItems:"center",gap:2,mb:3}}><Avatar className="av-blue" sx={{width:56,height:56,borderRadius:"16px",fontSize:"1.4rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700}}>{selectedDoc.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36"}}>Dr. {selectedDoc.name}</Typography><Typography sx={{fontSize:".8rem",color:"#8892b0"}}>{selectedDoc.specialization} · {selectedDoc.hospital}</Typography>{selectedDoc.consultationFee>0&&<Chip label={`₹${selectedDoc.consultationFee} consultation fee`} size="small" sx={{mt:.5,background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".72rem"}}/>}</Box></Box>
//         <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//         {bookSuccess&&<Box sx={{background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",borderRadius:"12px",p:2,mb:3,display:"flex",alignItems:"center",gap:1.5}}><CheckCircleIcon sx={{color:"#059669",fontSize:22}}/><Box><Typography sx={{fontWeight:700,color:"#059669",fontSize:".9rem"}}>Appointment Booked!</Typography><Typography sx={{fontSize:".78rem",color:"#065f46"}}>Your request has been sent to the doctor. Go to "My Appointments" to track status.</Typography></Box></Box>}
//         <Box sx={{background:"#eef1fe",border:"1px solid rgba(79,110,247,.2)",borderRadius:"12px",p:"12px 16px",mb:3,display:"flex",alignItems:"flex-start",gap:1.5}}>
//           <Typography sx={{fontSize:".95rem",mt:.1}}>ℹ️</Typography>
//           <Typography sx={{fontSize:".78rem",color:"#4a5278",lineHeight:1.6}}>No document upload needed at booking. After the doctor approves and you pay the fee, the doctor may request specific documents if needed.</Typography>
//         </Box>
//         <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
//           <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Preferred Date *</Typography><TextField fullWidth size="small" type="date" variant="outlined" value={bookForm.date} onChange={e=>setBookForm({...bookForm,date:e.target.value})} sx={fieldSx} inputProps={{min:new Date().toISOString().split("T")[0]}}/></Box>
//           <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Time Slot *</Typography><Select fullWidth size="small" value={bookForm.timeSlot} onChange={e=>setBookForm({...bookForm,timeSlot:e.target.value})} sx={{"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"},"& .MuiSelect-select":{borderRadius:"12px",background:"#f8f9ff"}}}><MenuItem value="">Select time</MenuItem>{["09:00 AM","10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"].map(t=><MenuItem key={t} value={t}>{t}</MenuItem>)}</Select></Box>
//           <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Symptoms / Description</Typography><TextField fullWidth size="small" multiline rows={3} variant="outlined" placeholder="Describe your symptoms or reason for visit…" value={bookForm.description} onChange={e=>setBookForm({...bookForm,description:e.target.value})} sx={fieldSx}/></Box>
//           <Button onClick={handleBook} variant="contained" disabled={bookLoading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".92rem",py:1.4,boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>{bookLoading?"Booking…":"Confirm Appointment →"}</Button>
//         </Box>
//       </Card>
//     </motion.div>);
//   }
//   return (<>
//     <TextField fullWidth size="small" placeholder="Search doctor, specialization, hospital…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} InputProps={{startAdornment:<InputAdornment position="start"><SearchIcon sx={{color:"#b0b8d0",fontSize:20}}/></InputAdornment>}} sx={{mb:2.5,"& .MuiOutlinedInput-root":{borderRadius:"14px",background:"#fff","& fieldset":{borderColor:"#e8ecf5"},"&:hover fieldset":{borderColor:"#c7cee8"},"&.Mui-focused fieldset":{borderColor:"#4f6ef7"}}}}/>
//     <Box sx={{mb:3}}><Box sx={{display:"flex",alignItems:"center",gap:1,mb:1.5}}><FilterListIcon sx={{fontSize:16,color:"#8892b0"}}/><Typography sx={{fontSize:".72rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600}}>Filter by Specialization</Typography></Box><div className="spec-chip-wrap">{specializations.map(spec=><div key={spec} className={`spec-chip ${activeSpec===spec?"active":""}`} onClick={()=>setActiveSpec(spec)}>{spec}</div>)}</div></Box>
//     <Box sx={{mb:2.5,display:"flex",alignItems:"center",justifyContent:"space-between"}}><Typography sx={{fontSize:".8rem",color:"#8892b0"}}>{filteredDoctors.length} doctor{filteredDoctors.length!==1?"s":""} found</Typography>{(searchQuery||activeSpec!=="All")&&<Typography sx={{fontSize:".78rem",color:"#4f6ef7",fontWeight:600,cursor:"pointer"}} onClick={()=>{setSearchQuery("");setActiveSpec("All");}}>Clear ✕</Typography>}</Box>
//     {filteredDoctors.length===0?(<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>🔍</Typography><Typography sx={{fontWeight:500}}>No doctors found.</Typography></Box>):(
//       <Grid container spacing={2.5}>{filteredDoctors.map((doc,i)=>(<Grid item xs={12} sm={6} md={4} key={doc.id}><motion.div whileHover={{scale:1.03}}><Card className="light-card" sx={{p:3}}><Box sx={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}><Avatar className={getAvatarClass(i)} sx={{width:68,height:68,borderRadius:"20px",mb:1.5,fontSize:"1.8rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.22)"}}>{doc.name?.charAt(0)}</Avatar><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {doc.name}</Typography><Chip label={doc.specialization||"General"} size="small" sx={{mt:.75,mb:.5,background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:600,fontSize:".72rem"}}/>{doc.qualification&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>{doc.qualification}</Typography>}{doc.experience>0&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>🏅 {doc.experience} yrs</Typography>}{doc.hospital&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.5}}>🏥 {doc.hospital}</Typography>}{doc.consultationFee>0&&<Box sx={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75,mb:2,display:"flex",alignItems:"center",gap:.75}}><CurrencyRupeeIcon sx={{fontSize:14,color:"#d97706"}}/><Typography sx={{fontSize:".8rem",fontWeight:700,color:"#d97706"}}>₹{doc.consultationFee}</Typography></Box>}<Button variant="contained" onClick={()=>setBookingDocId(doc.id)} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600,fontSize:".85rem",boxShadow:"0 3px 12px rgba(79,110,247,.28)"}}>Book Now →</Button></Box></Card></motion.div></Grid>))}</Grid>
//     )}
//   </>);
// }

// // ── MAIN PatientDashboard ─────────────────────────────────────────────────────
// export default function PatientDashboard() {
//   const {user}  = useContext(AuthContext);
//   const userId  = user?.id || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [patient,          setPatient]          = useState(null);
//   const [appointments,     setAppointments]     = useState([]);
//   const [doctors,          setDoctors]          = useState([]);
//   const [medicalRecords,   setMedicalRecords]   = useState([]);
//   const [prescriptions,    setPrescriptions]    = useState([]);
//   const [payments,         setPayments]         = useState({});  // key = appointmentId
//   const [feedbackDone,     setFeedbackDone]     = useState({});
//   const [accessRequests,   setAccessRequests]   = useState([]);
//   const [view,             setView]             = useState("dashboard");
//   const [sidebarOpen,      setSidebarOpen]      = useState(false);
//   const [loading,          setLoading]          = useState(true);
//   const [profileMissing,   setProfileMissing]   = useState(false);
//   const [error,            setError]            = useState("");
//   const [uploadOpen,       setUploadOpen]       = useState(false);
//   const [recordTypeFilter, setRecordTypeFilter] = useState("ALL");
//   const [payAppt,          setPayAppt]          = useState(null);
//   const [fbAppt,           setFbAppt]           = useState(null);

//   useEffect(()=>{
//     const load=async()=>{
//       try{const patRes=await axios.get(`${BASE}/patient/user/${userId}`);setPatient(patRes.data);}
//       catch(err){if(err.response?.status===404){setProfileMissing(true);setLoading(false);return;}setError("Failed to load patient.");setLoading(false);return;}
//       try{const dRes=await axios.get(`${BASE}/doctor`);setDoctors(dRes.data);}catch{}
//       setLoading(false);
//     };
//     if(userId)load();else{setError("User ID missing.");setLoading(false);}
//   },[userId]);

//   useEffect(()=>{
//     if(!patient)return;
//     axios.get(`${BASE}/appointments/patient/${patient.id}`).then(r=>setAppointments(r.data)).catch(()=>{});
//     axios.get(`${BASE}/medical-records/patient/${patient.id}`).then(r=>setMedicalRecords(r.data)).catch(()=>{});

//     // FIX: Only load prescriptions that have actual diagnosis written by doctor
//     axios.get(`${BASE}/prescriptions/patient/${patient.id}`)
//       .then(r=>{
//         // Filter out empty/blank prescriptions - only show ones with actual diagnosis
//         const validRx = r.data.filter(rx => rx.diagnosis && rx.diagnosis.trim() !== "");
//         setPrescriptions(validRx);
//       }).catch(()=>{});

//     // FIX: Build payments map correctly using appointmentId as key
//     axios.get(`${BASE}/payments/patient/${patient.id}`)
//       .then(r=>{
//         const map={};
//         r.data.forEach(p=>{
//           // appointmentId can be nested object or direct id
//           const apptId = p.appointmentId || p.appointment?.id;
//           if(apptId && p.status==="SUCCESS"){
//             map[apptId]={status:"SUCCESS", paymentId: p.id};
//           }
//         });
//         setPayments(map);
//       }).catch(()=>{});

//     axios.get(`${BASE}/access/patient/${patient.id}/requests`).then(r=>setAccessRequests(r.data)).catch(()=>{});
//   },[patient]);

//   const handleLogout   = () => { localStorage.removeItem("user"); navigate("/"); };
//   const handleNavClick = (k) => { setView(k); setSidebarOpen(false); };
//   const filteredRecords = recordTypeFilter==="ALL"?medicalRecords:medicalRecords.filter(r=>r.recordType===recordTypeFilter);

//   const handleDeleteRecord=async(id)=>{
//     if(!window.confirm("Delete this record?"))return;
//     try{await axios.delete(`${BASE}/medical-records/${id}`);setMedicalRecords(prev=>prev.filter(r=>r.id!==id));}
//     catch{alert("Failed to delete record");}
//   };

//   // FIX: onPaid now correctly sets the appointment ID as key
//   const handlePaymentDone = (appointmentId) => {
//     setPayments(prev=>({...prev,[appointmentId]:{status:"SUCCESS"}}));
//     // Also reload appointments to reflect any status changes
//     if(patient){
//       axios.get(`${BASE}/appointments/patient/${patient.id}`).then(r=>setAppointments(r.data)).catch(()=>{});
//     }
//   };

//   const handleFeedbackDone = (id) => setFeedbackDone(prev=>({...prev,[id]:true}));

//   // FIX: isPaid check — check if appointmentId exists as key in payments map with SUCCESS status
//   const isApptPaid = (apptId) => payments[apptId]?.status === "SUCCESS";

//   const unpaidCount    = appointments.filter(a=>a.status==="APPROVED"&&!isApptPaid(a.id)).length;
//   const pendingDocReqs = appointments.filter(a=>a.docRequestStatus==="DOC_REQUEST_PENDING").length;
//   const pendingAccessCount = accessRequests.filter(r=>r.status==="PENDING").length;

//   const today = new Date(); today.setHours(0,0,0,0);
//   const upcomingAppts = appointments.filter(a=>{
//     if(a.status==="REJECTED")return false;
//     if(!a.date)return false;
//     return new Date(a.date)>=today;
//   }).sort((a,b)=>new Date(a.date)-new Date(b.date));

//   const menuItems = [
//     {key:"dashboard",      label:"Dashboard",        icon:<DashboardIcon     sx={{fontSize:18}}/>},
//     {key:"appointments",   label:"My Appointments",  icon:<EventIcon         sx={{fontSize:18}}/>, badge:unpaidCount},
//     {key:"book",           label:"Book Appointment", icon:<AddIcon           sx={{fontSize:18}}/>},
//     {key:"records",        label:"Medical Records",  icon:<FolderIcon        sx={{fontSize:18}}/>},
//     {key:"prescriptions",  label:"Prescriptions",    icon:<LocalPharmacyIcon sx={{fontSize:18}}/>},
//     {key:"docrequests",    label:"Doc Requests",     icon:<UploadFileIcon    sx={{fontSize:18}}/>, badge:pendingDocReqs},
//     {key:"accessrequests", label:"Record Requests",  icon:<LockOpenIcon      sx={{fontSize:18}}/>, badge:pendingAccessCount},
//     {key:"healthstatus",   label:"Health Status",    icon:<MonitorHeartIcon  sx={{fontSize:18}}/>},
//     {key:"health",         label:"Health Stats",     icon:<BarChartIcon      sx={{fontSize:18}}/>},
//     {key:"profile",        label:"Profile",          icon:<PersonIcon        sx={{fontSize:18}}/>},
//   ];

//   if(loading)return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>);
//   if(error)return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><Alert severity="error">{error}</Alert></Box>);
//   if(profileMissing||!patient)return(<PatientProfileForm userId={userId} onCreated={created=>{setPatient(created);setProfileMissing(false);axios.get(`${BASE}/doctor`).then(r=>setDoctors(r.data)).catch(()=>{});}}/>);

//   return (
//     <Box sx={{minHeight:"100vh",background:"#f5f7ff",fontFamily:"'Outfit',sans-serif"}}>
//       <div className="blob blob-1"/><div className="blob blob-2"/>
//       {sidebarOpen&&<div className="sidebar-overlay" onClick={()=>setSidebarOpen(false)}/>}

//       {/* Sidebar */}
//       <div className={`portal-sidebar ${sidebarOpen?"open":"closed"}`}>
//         <div className="sidebar-top-row"><div className="sidebar-logo"><div className="logo-icon">✦</div>Med<span className="logo-accent">Vault</span></div><div className="sidebar-close-btn" onClick={()=>setSidebarOpen(false)}><CloseIcon sx={{fontSize:16}}/></div></div>
//         <div className="nav-section-label">Navigation</div>
//         {menuItems.map(item=>(<NavItem key={item.key} icon={item.icon} label={item.label} active={view===item.key} onClick={()=>handleNavClick(item.key)} badge={item.badge||0}/>))}
//         <div className="sidebar-spacer"/>
//         <div className="user-card"><div className="user-mini-av">{patient.name?.charAt(0)}</div><Box><Typography sx={{fontSize:".85rem",fontWeight:600,color:"#1a1f36",lineHeight:1.2}}>{patient.name}</Typography><Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Patient</Typography></Box></div>
//         <button onClick={handleLogout} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:11,cursor:"pointer",fontSize:".875rem",fontWeight:500,color:"#e11d48",border:"1px solid transparent",background:"none",width:"100%",fontFamily:"'Outfit',sans-serif",transition:"all .18s"}} onMouseEnter={e=>{e.currentTarget.style.background="#fff1f3";e.currentTarget.style.borderColor="rgba(225,29,72,.15)";}} onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor="transparent";}}>
//           <div className="nav-icon-wrap" style={{background:"#fff1f3",color:"#e11d48"}}><LogoutIcon sx={{fontSize:16}}/></div>Sign Out
//         </button>
//       </div>

//       {/* Topbar */}
//       <div className="portal-topbar">
//         <div className="topbar-left"><div className="hamburger-btn" onClick={()=>setSidebarOpen(true)}><MenuIcon sx={{fontSize:20}}/></div><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:"1.3rem",color:"#4f6ef7"}}>Med<span style={{color:"#7c3aed"}}>Vault</span></Typography></div>
//         <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
//           {unpaidCount>0&&<Box onClick={()=>handleNavClick("appointments")} sx={{display:"flex",alignItems:"center",gap:.75,cursor:"pointer",background:"#fff7ed",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75}}><NotificationsIcon sx={{fontSize:16,color:"#d97706"}}/><Typography sx={{fontSize:".75rem",fontWeight:600,color:"#d97706"}}>{unpaidCount} fee pending</Typography></Box>}
//           {pendingDocReqs>0&&<Box onClick={()=>handleNavClick("docrequests")} sx={{display:"flex",alignItems:"center",gap:.75,cursor:"pointer",background:"#eef1fe",border:"1px solid #c7d7f9",borderRadius:"10px",px:1.5,py:.75}}><UploadFileIcon sx={{fontSize:16,color:"#4f6ef7"}}/><Typography sx={{fontSize:".75rem",fontWeight:600,color:"#4f6ef7"}}>{pendingDocReqs} doc request{pendingDocReqs>1?"s":""}</Typography></Box>}
//           <Button startIcon={<LogoutIcon/>} onClick={handleLogout} size="small" sx={{color:"#e11d48",borderColor:"rgba(225,29,72,.3)",textTransform:"none",borderRadius:2,border:"1px solid",fontFamily:"'Outfit',sans-serif"}}>Logout</Button>
//         </Box>
//       </div>

//       {/* Content */}
//       <Box sx={{p:{xs:2,md:"36px 44px"},position:"relative",zIndex:1}}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}}>

//             {/* DASHBOARD */}
//             {view==="dashboard"&&(<>
//               <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Good morning, {patient.name?.split(" ")[0]} ☀️</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Here's your health portal overview</Typography></Box>

//               {/* Payment banners — only show for APPROVED + not paid */}
//               {appointments.filter(a=>a.status==="APPROVED"&&!isApptPaid(a.id)).map(appt=>(<Box key={appt.id} className="pay-banner" sx={{mb:2}}>
//                 <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
//                   <Box sx={{width:38,height:38,borderRadius:"11px",background:"linear-gradient(135deg,#f59e0b,#fbbf24)",display:"flex",alignItems:"center",justifyContent:"center"}}><NotificationsIcon sx={{color:"#fff",fontSize:20}}/></Box>
//                   <Box>
//                     <Typography sx={{fontWeight:600,fontSize:".88rem",color:"#92400e"}}>Appointment Confirmed — Fee Pending</Typography>
//                     <Typography sx={{fontSize:".78rem",color:"#a16207"}}>Dr. {appt.doctor?.name} · {appt.date} · ₹{appt.doctor?.consultationFee}</Typography>
//                   </Box>
//                 </Box>
//                 <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{fontSize:16}}/>} sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,whiteSpace:"nowrap"}}>Pay ₹{appt.doctor?.consultationFee}</Button>
//               </Box>))}

//               {/* Doc request banner */}
//               {pendingDocReqs>0&&(<Box onClick={()=>handleNavClick("docrequests")} sx={{cursor:"pointer",mb:2,p:"16px 20px",borderRadius:"16px",background:"linear-gradient(135deg,#eef1fe,#f0f4ff)",border:"1.5px solid rgba(79,110,247,.25)",display:"flex",alignItems:"center",gap:1.5,"&:hover":{boxShadow:"0 4px 16px rgba(79,110,247,.12)"}}}>
//                 <Box sx={{width:38,height:38,borderRadius:"11px",background:"linear-gradient(135deg,#4f6ef7,#818cf8)",display:"flex",alignItems:"center",justifyContent:"center"}}><UploadFileIcon sx={{color:"#fff",fontSize:20}}/></Box>
//                 <Box sx={{flex:1}}><Typography sx={{fontWeight:600,fontSize:".88rem",color:"#1a1f36"}}>Doctor requesting health documents</Typography><Typography sx={{fontSize:".78rem",color:"#4a5278"}}>You have {pendingDocReqs} pending document request{pendingDocReqs>1?"s":""}. Click to upload.</Typography></Box>
//                 <Typography sx={{fontSize:".78rem",color:"#4f6ef7",fontWeight:700}}>Upload →</Typography>
//               </Box>)}

//               <Box className="hero-card" sx={{mb:4,display:"flex",alignItems:"center",gap:3}}><Avatar className="av-blue" sx={{width:80,height:80,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",boxShadow:"0 8px 24px rgba(79,110,247,.3)"}}>{patient.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography><Typography sx={{color:"#8892b0",fontSize:".82rem",mt:.5}}>Patient ID · #{patient.id}</Typography><Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>{[patient.gender,`Age ${patient.age}`,patient.email,patient.contact].filter(Boolean).map((v,i)=>(<Chip key={i} label={v} size="small" sx={{background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:500,fontSize:".75rem"}}/>))}</Box></Box></Box>

//               <Grid container spacing={2.5} sx={{mb:4}}>
//                 <Grid item xs={6} sm={3}><StatCard label="Appointments" value={appointments.length} icon="📅" color="#4f6ef7"/></Grid>
//                 <Grid item xs={6} sm={3}><StatCard label="Upcoming" value={upcomingAppts.length} icon="📆" color="#059669"/></Grid>
//                 <Grid item xs={6} sm={3}><StatCard label="Prescriptions" value={prescriptions.length} icon="💊" color="#7c3aed"/></Grid>
//                 <Grid item xs={6} sm={3}><StatCard label="Medical Records" value={medicalRecords.length} icon="📋" color="#0891b2"/></Grid>
//               </Grid>

//               <div className="sec-heading">Upcoming Appointments</div>
//               {upcomingAppts.length===0?(
//                 <Box sx={{textAlign:"center",py:5,color:"#8892b0",mb:3}}>
//                   <Typography sx={{fontSize:"2rem",mb:1}}>📅</Typography>
//                   <Typography sx={{fontWeight:500,mb:1.5}}>No upcoming appointments.</Typography>
//                   <Button onClick={()=>setView("book")} size="small" variant="contained" sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Book Now →</Button>
//                 </Box>
//               ):(
//                 <Grid container spacing={2.5} sx={{mb:4}}>
//                   {upcomingAppts.slice(0,6).map((appt,i)=>(
//                     <Grid item xs={12} md={4} key={appt.id}>
//                       <motion.div whileHover={{scale:1.03}}>
//                         <Card className="light-card"><CardContent sx={{p:"20px !important"}}>
//                           <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
//                             <Avatar className={getAvatarClass(i)} sx={{width:44,height:44,borderRadius:"12px",fontSize:"1rem",fontWeight:700}}>{appt.doctor?.name?.charAt(0)}</Avatar>
//                             <Box sx={{flex:1}}><Typography sx={{fontWeight:600,fontSize:".92rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography></Box>
//                           </Box>
//                           <Box sx={{display:"flex",alignItems:"center",gap:1,mb:.75}}><CalendarTodayIcon sx={{fontSize:14,color:"#4f6ef7"}}/><Typography sx={{fontSize:".82rem",color:"#4a5278",fontWeight:600}}>{appt.date}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>· {appt.timeSlot}</Typography></Box>
//                           <Box sx={{display:"flex",alignItems:"center",gap:.75,flexWrap:"wrap"}}>
//                             <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".72rem"}}/>
//                             {appt.status==="APPROVED"&&!isApptPaid(appt.id)&&<Chip label={`₹${appt.doctor?.consultationFee} due`} size="small" onClick={()=>setPayAppt(appt)} sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".68rem",cursor:"pointer"}}/>}
//                             {appt.status==="APPROVED"&&isApptPaid(appt.id)&&<Chip label="✓ Paid" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".68rem"}}/>}
//                             {appt.docRequestStatus==="DOC_REQUEST_PENDING"&&<Chip label="📋 Docs Needed" size="small" onClick={()=>handleNavClick("docrequests")} sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".68rem",cursor:"pointer"}}/>}
//                           </Box>
//                         </CardContent></Card>
//                       </motion.div>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//               {upcomingAppts.length>6&&<Box sx={{textAlign:"center",mt:1,mb:2}}><Button onClick={()=>handleNavClick("appointments")} size="small" sx={{color:"#4f6ef7",textTransform:"none",fontWeight:600,fontSize:".82rem"}}>View all {upcomingAppts.length} upcoming →</Button></Box>}
//             </>)}

//             {/* MY APPOINTMENTS */}
//             {view==="appointments"&&(<>
//               <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>My Appointments</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{appointments.length} total · {upcomingAppts.length} upcoming</Typography></Box>

//               {/* Payment banners */}
//               {appointments.filter(a=>a.status==="APPROVED"&&!isApptPaid(a.id)).map(appt=>(<Box key={appt.id} className="pay-banner">
//                 <Box sx={{display:"flex",alignItems:"center",gap:1.5}}><CurrencyRupeeIcon sx={{color:"#d97706",fontSize:20,flexShrink:0}}/><Box><Typography sx={{fontWeight:600,fontSize:".85rem",color:"#92400e"}}>Fee pending for Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#a16207"}}>{appt.date} · ₹{appt.doctor?.consultationFee}</Typography></Box></Box>
//                 <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small" sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,whiteSpace:"nowrap"}}>Pay Now</Button>
//               </Box>))}

//               {upcomingAppts.length>0&&(<><div className="sec-heading" style={{marginBottom:14}}>Upcoming</div><Grid container spacing={2.5} sx={{mb:3}}>{upcomingAppts.map((appt,i)=>(<Grid item xs={12} md={4} key={`up-${appt.id}`}><Card className="light-card" sx={{borderLeft:"3px solid #4f6ef7"}}><CardContent sx={{p:"16px !important"}}><Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1}}><Avatar className={getAvatarClass(i)} sx={{width:38,height:38,borderRadius:"11px",fontSize:".9rem",fontWeight:700}}>{appt.doctor?.name?.charAt(0)}</Avatar><Box sx={{flex:1}}><Typography sx={{fontWeight:600,fontSize:".88rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".72rem",color:"#8892b0"}}>{appt.date} · {appt.timeSlot}</Typography></Box><Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".65rem"}}/></Box><Box sx={{display:"flex",gap:.75,flexWrap:"wrap"}}>{appt.status==="APPROVED"&&!isApptPaid(appt.id)&&<Chip label={`₹${appt.doctor?.consultationFee} due`} size="small" onClick={()=>setPayAppt(appt)} sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".65rem",cursor:"pointer"}}/>}{appt.status==="APPROVED"&&isApptPaid(appt.id)&&<Chip label="✓ Paid" size="small" sx={{background:"#ecfdf5",color:"#059669",fontWeight:600,fontSize:".65rem"}}/>}{appt.docRequestStatus==="DOC_REQUEST_PENDING"&&<Chip label="📋 Docs" size="small" onClick={()=>handleNavClick("docrequests")} sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".65rem",cursor:"pointer"}}/>}</Box></CardContent></Card></Grid>))}</Grid><div className="sec-heading" style={{marginBottom:14}}>All Appointments</div></>)}
//               {appointments.length===0?(<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>📅</Typography><Typography sx={{fontWeight:500}}>No appointments yet.</Typography><Button onClick={()=>setView("book")} size="small" variant="contained" sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Book an appointment →</Button></Box>):(
//                 <Grid container spacing={2.5}>
//                   {appointments.map((appt,i)=>{
//                     const isPaid=isApptPaid(appt.id);
//                     const hasFeedback=feedbackDone[appt.id];
//                     return (
//                       <Grid item xs={12} md={4} key={appt.id}>
//                         <motion.div whileHover={{scale:1.02}}>
//                           <Card className="light-card"><CardContent sx={{p:"24px !important"}}>
//                             <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
//                               <Avatar className={getAvatarClass(i)} sx={{width:48,height:48,borderRadius:"14px",fontSize:"1.1rem",fontWeight:700}}>{appt.doctor?.name?.charAt(0)}</Avatar>
//                               <Box sx={{flex:1}}><Typography sx={{fontWeight:600,fontSize:".95rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography></Box>
//                               <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".7rem"}}/>
//                             </Box>
//                             <Divider sx={{mb:1.5,borderColor:"#f0f2f8"}}/>
//                             <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:.5}}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
//                             <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:1.5}} noWrap>📝 {appt.description||"No description"}</Typography>
//                             <Box sx={{display:"flex",flexDirection:"column",gap:1}}>
//                               {/* Show Pay button ONLY for APPROVED + not paid */}
//                               {appt.status==="APPROVED"&&!isPaid&&(
//                                 <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small" startIcon={<PaymentIcon sx={{fontSize:15}}/>} sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"9px",textTransform:"none",fontWeight:700,boxShadow:"0 2px 8px rgba(245,158,11,.3)"}}>
//                                   Pay Consultation Fee ₹{appt.doctor?.consultationFee}
//                                 </Button>
//                               )}
//                               {/* Show paid chip only after payment */}
//                               {appt.status==="APPROVED"&&isPaid&&(
//                                 <Chip label="✓ Payment Confirmed" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,alignSelf:"flex-start"}}/>
//                               )}
//                               {/* Doc request status */}
//                               {appt.docRequestStatus==="DOC_REQUEST_PENDING"&&(
//                                 <Chip label="📋 Doctor needs documents" size="small" onClick={()=>handleNavClick("docrequests")} sx={{background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".72rem",cursor:"pointer",alignSelf:"flex-start"}}/>
//                               )}
//                               {appt.docRequestStatus==="DOC_REQUEST_DONE"&&(
//                                 <Chip label="✓ Documents Shared" size="small" sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".72rem",alignSelf:"flex-start"}}/>
//                               )}
//                               {/* Feedback — only after payment confirmed */}
//                               {appt.status==="APPROVED"&&isPaid&&!hasFeedback&&(
//                                 <Button onClick={()=>setFbAppt(appt)} size="small" variant="outlined" startIcon={<StarIcon sx={{fontSize:14}}/>} sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".78rem",borderColor:"rgba(245,158,11,.4)",color:"#d97706","&:hover":{background:"#fffbeb"}}}>
//                                   Rate this appointment
//                                 </Button>
//                               )}
//                               {hasFeedback&&<Typography sx={{fontSize:".75rem",color:"#059669",fontWeight:600,textAlign:"center"}}>⭐ Feedback submitted!</Typography>}
//                             </Box>
//                           </CardContent></Card>
//                         </motion.div>
//                       </Grid>
//                     );
//                   })}
//                 </Grid>
//               )}
//             </>)}

//             {/* BOOK */}
//             {view==="book"&&(<><Box sx={{mb:3}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Book Appointment</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Find a doctor and book directly</Typography></Box><BookAppointmentInline patient={patient} doctors={doctors}/></>)}

//             {/* MEDICAL RECORDS */}
//             {view==="records"&&(<>
//               <Box sx={{mb:4,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:2}}>
//                 <Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Medical Records</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{medicalRecords.length} record{medicalRecords.length!==1?"s":""} stored</Typography></Box>
//                 <Button variant="contained" startIcon={<UploadFileIcon/>} onClick={()=>setUploadOpen(true)} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700}}>Add Record</Button>
//               </Box>
//               <Box sx={{mb:3}}><div className="spec-chip-wrap">{["ALL",...RECORD_TYPES].map(t=>(<div key={t} className={`spec-chip ${recordTypeFilter===t?"active":""}`} onClick={()=>setRecordTypeFilter(t)}>{t==="ALL"?"All":t.replace("_"," ")}</div>))}</div></Box>
//               {filteredRecords.length===0?(<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>📋</Typography><Typography sx={{fontWeight:500}}>{medicalRecords.length===0?"No records yet.":"No records match."}</Typography>{medicalRecords.length===0&&<Button onClick={()=>setUploadOpen(true)} size="small" variant="contained" sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Upload first record →</Button>}</Box>):filteredRecords.map(record=><RecordCard key={record.id} record={record} onDelete={handleDeleteRecord}/>)}
//             </>)}

//             {/* PRESCRIPTIONS — FIX: only show ones with actual diagnosis */}
//             {view==="prescriptions"&&(<>
//               <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Prescriptions</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{prescriptions.length} prescription{prescriptions.length!==1?"s":""} from your doctors</Typography></Box>
//               {prescriptions.length===0?(
//                 <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
//                   <Typography sx={{fontSize:"2.5rem",mb:1}}>💊</Typography>
//                   <Typography sx={{fontWeight:500}}>No prescriptions yet.</Typography>
//                   <Typography sx={{fontSize:".83rem",mt:.5,maxWidth:400,mx:"auto"}}>Prescriptions appear here after your doctor writes them following an approved and paid appointment.</Typography>
//                 </Box>
//               ):prescriptions.map(rx=>(
//                 <div key={rx.id} className="rx-card">
//                   <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
//                     <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><LocalPharmacyIcon sx={{color:"#059669",fontSize:22}}/></Box>
//                     <Box sx={{flex:1}}>
//                       <Box sx={{display:"flex",alignItems:"center",gap:1.5,flexWrap:"wrap",mb:.75}}>
//                         <Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {rx.appointment?.doctor?.name}</Typography>
//                         {rx.issuedDate&&<Chip label={rx.issuedDate} size="small" sx={{background:"#f5f7ff",color:"#8892b0",fontSize:".68rem",height:20}}/>}
//                       </Box>
//                       <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:.75}}>{rx.appointment?.doctor?.specialization} · {rx.appointment?.date}</Typography>
//                       {rx.diagnosis&&(<Box sx={{background:"#f0fdf4",border:"1px solid rgba(5,150,105,.15)",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
//                         <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#059669",fontWeight:700,mb:.3}}>Diagnosis</Typography>
//                         <Typography sx={{fontSize:".88rem",fontWeight:600,color:"#1a1f36"}}>🩺 {rx.diagnosis}</Typography>
//                       </Box>)}
//                       {rx.medicines&&(<Box sx={{background:"#f8f9ff",border:"1px solid #e8ecf5",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
//                         <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#4f6ef7",fontWeight:700,mb:.5}}>💊 Medicines & Dosage</Typography>
//                         <Typography sx={{fontSize:".83rem",color:"#1a1f36",whiteSpace:"pre-line",lineHeight:1.7}}>{rx.medicines}</Typography>
//                       </Box>)}
//                       <Grid container spacing={1.5}>
//                         {rx.instructions&&(<Grid item xs={12} sm={6}><Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Instructions</Typography><Typography sx={{fontSize:".82rem",color:"#4a5278"}}>📋 {rx.instructions}</Typography></Grid>)}
//                         {rx.tests&&(<Grid item xs={12} sm={6}><Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Lab Tests</Typography><Typography sx={{fontSize:".82rem",color:"#7c3aed"}}>🔬 {rx.tests}</Typography></Grid>)}
//                         {rx.followUpDate&&(<Grid item xs={12}><Typography sx={{fontSize:".82rem",color:"#d97706",fontWeight:600}}>📅 Follow-up: {rx.followUpDate}</Typography></Grid>)}
//                       </Grid>
//                     </Box>
//                   </Box>
//                 </div>
//               ))}
//             </>)}

//             {/* DOC REQUESTS */}
//             {view==="docrequests"&&<DocRequestsView appointments={appointments} onUploaded={(updatedAppt)=>setAppointments(prev=>prev.map(a=>a.id===updatedAppt.id?updatedAppt:a))}/>}

//             {/* RECORD ACCESS REQUESTS */}
//             {view==="accessrequests"&&(<>
//               <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Record Access Requests</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Doctors requesting access to your medical records.</Typography></Box>
//               {accessRequests.length===0?(<Box sx={{textAlign:"center",py:10,color:"#8892b0"}}><Typography sx={{fontSize:"3rem",mb:2}}>🔒</Typography><Typography sx={{fontWeight:600,fontSize:"1rem",color:"#1a1f36"}}>No access requests yet</Typography></Box>):(
//                 <Grid container spacing={2.5}>{accessRequests.map(req=>{const isPending=req.status==="PENDING";const isApproved=req.status==="APPROVED";return(
//                   <Grid item xs={12} md={6} key={req.id}>
//                     <Card sx={{background:isPending?"#fffbeb":isApproved?"#ecfdf5":"#fff1f3",border:`1.5px solid ${isPending?"#fcd34d":isApproved?"#6ee7b7":"#fda4af"}`,borderRadius:"18px",boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}>
//                       <CardContent sx={{p:"24px !important"}}>
//                         <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
//                           <Avatar sx={{width:48,height:48,borderRadius:"14px",fontWeight:700,background:"linear-gradient(135deg,#4f6ef7,#818cf8)"}}>{req.doctor?.name?.charAt(0)}</Avatar>
//                           <Box sx={{flex:1}}><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {req.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{req.doctor?.specialization}</Typography></Box>
//                           <Chip label={isPending?"⏳ Pending":isApproved?"✓ Approved":"✕ Rejected"} size="small" sx={{background:isPending?"#fffbeb":isApproved?"#ecfdf5":"#fff1f3",color:isPending?"#d97706":isApproved?"#059669":"#e11d48",border:`1px solid ${isPending?"#fcd34d":isApproved?"#6ee7b7":"#fda4af"}`,fontWeight:700,fontSize:".72rem"}}/>
//                         </Box>
//                         {req.requestMessage&&<Box sx={{background:"rgba(255,255,255,.7)",borderRadius:"10px",p:"10px 14px",mb:1.5,border:"1px solid rgba(0,0,0,.06)"}}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:700,mb:.4}}>Doctor's Message</Typography><Typography sx={{fontSize:".85rem",color:"#1a1f36"}}>"{req.requestMessage}"</Typography></Box>}
//                         {isPending&&<Box sx={{display:"flex",gap:1.5}}>
//                           <Button fullWidth variant="contained" size="small" onClick={async()=>{await axios.put(`${BASE}/access/${req.id}/approve`);setAccessRequests(prev=>prev.map(r=>r.id===req.id?{...r,status:"APPROVED"}:r));}} sx={{background:"linear-gradient(135deg,#059669,#34d399)",borderRadius:"9px",textTransform:"none",fontWeight:700}}>✓ Approve Access</Button>
//                           <Button fullWidth variant="outlined" size="small" onClick={async()=>{await axios.put(`${BASE}/access/${req.id}/reject`);setAccessRequests(prev=>prev.map(r=>r.id===req.id?{...r,status:"REJECTED"}:r));}} sx={{borderRadius:"9px",textTransform:"none",fontWeight:700,borderColor:"#fda4af",color:"#e11d48","&:hover":{background:"#fff1f3"}}}>✕ Reject</Button>
//                         </Box>}
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 );})}
//                 </Grid>
//               )}
//             </>)}

//             {/* HEALTH STATUS */}
//             {view==="healthstatus"&&<HealthStatusView patientId={patient.id}/>}

//             {/* HEALTH STATS */}
//             {view==="health"&&(<><Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Health Stats</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Your health data visualized</Typography></Box><HealthStats appointments={appointments} prescriptions={prescriptions} medicalRecords={medicalRecords} payments={payments}/></>)}

//             {/* PROFILE */}
//             {view==="profile"&&(<><Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Profile</Typography></Box>
//               <Card className="light-card" sx={{p:4}}>
//                 <Box sx={{display:"flex",alignItems:"center",gap:2.5,mb:3}}><Avatar className="av-blue" sx={{width:76,height:76,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.25)"}}>{patient.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography><Typography sx={{fontSize:".82rem",color:"#8892b0",mt:.5}}>Patient Account · Active</Typography></Box></Box>
//                 <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
//                 <Grid container spacing={3}>{[["Full Name",patient.name],["Email",patient.email],["Gender",patient.gender],["Date of Birth",patient.dob],["Contact",patient.contact],["Age",patient.age?`${patient.age} years`:"—"],["Patient ID",`#${patient.id}`]].map(([label,val])=>(<Grid item xs={12} sm={6} key={label}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1.1px",color:"#8892b0",fontWeight:600,mb:.6}}>{label}</Typography><Typography sx={{fontSize:".95rem",fontWeight:500,color:"#1a1f36"}}>{val||"—"}</Typography></Grid>))}</Grid>
//               </Card>
//             </>)}

//           </motion.div>
//         </AnimatePresence>
//       </Box>

//       {/* Modals */}
//       <UploadRecordModal open={uploadOpen} onClose={()=>setUploadOpen(false)} patientId={patient.id} onUploaded={newRecord=>setMedicalRecords(prev=>[newRecord,...prev])}/>
//       <PaymentModal open={Boolean(payAppt)} appointment={payAppt} onClose={()=>setPayAppt(null)} onPaid={handlePaymentDone}/>
//       <FeedbackModal open={Boolean(fbAppt)} appointment={fbAppt} onClose={()=>setFbAppt(null)} onSubmitted={handleFeedbackDone}/>
//     </Box>
//   );
// }




import { useContext, useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PatientProfileForm from "./PatientProfileForm";
import {
  Box, Typography, CircularProgress, Alert, Grid, Card, CardContent,
  Avatar, Button, Divider, Chip, TextField, InputAdornment,
  MenuItem, Select, Modal, IconButton, LinearProgress, Rating,
  Dialog, DialogTitle, DialogContent, DialogActions, Snackbar,
} from "@mui/material";
import MenuIcon          from "@mui/icons-material/Menu";
import CloseIcon         from "@mui/icons-material/Close";
import LogoutIcon        from "@mui/icons-material/Logout";
import EventIcon         from "@mui/icons-material/Event";
import DashboardIcon     from "@mui/icons-material/Dashboard";
import PersonIcon        from "@mui/icons-material/Person";
import AddIcon           from "@mui/icons-material/Add";
import SearchIcon        from "@mui/icons-material/Search";
import FolderIcon        from "@mui/icons-material/Folder";
import UploadFileIcon    from "@mui/icons-material/UploadFile";
import DescriptionIcon   from "@mui/icons-material/Description";
import DeleteIcon        from "@mui/icons-material/Delete";
import OpenInNewIcon     from "@mui/icons-material/OpenInNew";
import DownloadIcon      from "@mui/icons-material/Download";
import VisibilityIcon    from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FilterListIcon    from "@mui/icons-material/FilterList";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import PaymentIcon       from "@mui/icons-material/Payment";
import StarIcon          from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CheckCircleIcon   from "@mui/icons-material/CheckCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BarChartIcon      from "@mui/icons-material/BarChart";
import MonitorHeartIcon  from "@mui/icons-material/MonitorHeart";
import LockOpenIcon      from "@mui/icons-material/LockOpen";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, AreaChart, Area,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid,
  Tooltip as ReTooltip, Legend,
} from "recharts";
import { format } from "date-fns";

const BASE = "http://localhost:8080";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
  body { font-family: 'Outfit', sans-serif !important; }
  .sidebar-overlay{position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199;animation:overlayIn .2s ease;}
  @keyframes overlayIn{from{opacity:0}to{opacity:1}}
  .portal-sidebar{width:260px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.12);transition:transform .28s cubic-bezier(.22,1,.36,1);}
  .portal-sidebar.closed{transform:translateX(-100%);}
  .portal-sidebar.open{transform:translateX(0);}
  .sidebar-top-row{display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px;}
  .sidebar-logo{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px;}
  .logo-icon{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0;}
  .logo-accent{color:#7c3aed;}
  .sidebar-close-btn{width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0;transition:all .15s;}
  .sidebar-close-btn:hover{background:#eef1fe;color:#4f6ef7;border-color:rgba(79,110,247,.2);}
  .nav-section-label{font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px;}
  .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s ease;border:1px solid transparent;margin-bottom:3px;user-select:none;}
  .nav-item:hover{background:#eef1fe;color:#4f6ef7;}
  .nav-item.active{background:#eef1fe;color:#4f6ef7;font-weight:600;border-color:rgba(79,110,247,.18);}
  .nav-item.active .nav-icon-wrap{background:#4f6ef7 !important;color:#fff !important;}
  .nav-icon-wrap{width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278;}
  .sidebar-spacer{flex:1;}
  .user-card{display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#f5f7ff;border:1px solid #e8ecf5;margin-bottom:10px;}
  .user-mini-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#4f6ef7,#7c3aed);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;font-size:1.1rem;}
  .portal-topbar{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100;}
  .topbar-left{display:flex;align-items:center;gap:14px;}
  .hamburger-btn{width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4f6ef7;transition:all .18s;}
  .hamburger-btn:hover{background:#eef1fe;border-color:rgba(79,110,247,.2);}
  .blob{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;}
  .blob-1{width:500px;height:500px;background:rgba(79,110,247,.07);top:-120px;right:-80px;}
  .blob-2{width:400px;height:400px;background:rgba(124,58,237,.05);bottom:-80px;left:100px;}
  .light-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 4px rgba(79,110,247,.06),0 2px 12px rgba(0,0,0,.04) !important;transition:box-shadow .22s,border-color .22s,transform .22s !important;}
  .light-card:hover{box-shadow:0 4px 24px rgba(79,110,247,.12) !important;border-color:#d4daf0 !important;}
  .hero-card{background:linear-gradient(135deg,#fff 60%,#eef1fe 100%) !important;border:1px solid #e8ecf5 !important;border-radius:20px !important;box-shadow:0 2px 16px rgba(79,110,247,.08) !important;padding:36px 40px !important;position:relative;overflow:hidden;}
  .hero-card::after{content:'✦';position:absolute;right:40px;bottom:10px;font-size:5rem;color:rgba(79,110,247,.04);line-height:1;pointer-events:none;}
  .stat-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(79,110,247,.06) !important;padding:24px 28px;position:relative;overflow:hidden;transition:box-shadow .2s,transform .2s !important;}
  .stat-card:hover{box-shadow:0 6px 24px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
  .stat-value{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1;}
  .stat-label{font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px;}
  .stat-icon{position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.4rem;opacity:.07;}
  .sec-heading{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .sec-heading::after{content:'';flex:1;height:1px;background:#e8ecf5;}
  .spec-chip-wrap{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0;}
  .spec-chip{padding:6px 14px !important;border-radius:20px !important;font-size:.78rem !important;font-weight:600 !important;border:1px solid #e8ecf5 !important;cursor:pointer !important;transition:all .18s !important;background:#fff !important;color:#4a5278 !important;user-select:none;}
  .spec-chip:hover{background:#eef1fe !important;border-color:rgba(79,110,247,.25) !important;color:#4f6ef7 !important;}
  .spec-chip.active{background:#4f6ef7 !important;border-color:#4f6ef7 !important;color:#fff !important;}
  .record-card{background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #4f6ef7 !important;border-radius:16px !important;box-shadow:0 1px 6px rgba(79,110,247,.07) !important;transition:box-shadow .22s,transform .22s !important;padding:20px 22px;margin-bottom:12px;}
  .record-card:hover{box-shadow:0 5px 22px rgba(79,110,247,.13) !important;transform:translateY(-2px);}
  .rx-card{background:#fff;border:1px solid #e8ecf5;border-left:4px solid #059669;border-radius:16px;padding:20px 22px;margin-bottom:12px;box-shadow:0 1px 6px rgba(5,150,105,.08);transition:box-shadow .2s,transform .2s;}
  .rx-card:hover{box-shadow:0 5px 22px rgba(5,150,105,.14);transform:translateY(-2px);}
  .pay-banner{background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1.5px solid #fcd34d;border-radius:16px;padding:18px 22px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
  .upload-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:520px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;max-height:90vh;overflow-y:auto;}
  .rzp-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:400px;background:#fff;border-radius:20px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:20px;outline:none;max-height:88vh;overflow-y:auto;}
  .fb-modal-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:92%;max-width:460px;background:#fff;border-radius:22px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(79,110,247,.18);padding:36px;outline:none;}
  .drop-zone{border:2px dashed #c7cee8;border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:all .2s;background:#f8f9ff;}
  .drop-zone:hover,.drop-zone.dragover{border-color:#4f6ef7;background:#eef1fe;}
  .file-preview-wrap{width:100%;border-radius:10px;overflow:hidden;border:1px solid #e8ecf5;margin-top:12px;}
  .file-preview-wrap iframe{width:100%;height:340px;border:none;display:block;}
  .file-preview-wrap img{width:100%;display:block;max-height:380px;object-fit:contain;background:#f8f9ff;}
  .health-chart-card{background:#fff;border:1px solid #e8ecf5;border-radius:18px;padding:24px;box-shadow:0 1px 6px rgba(79,110,247,.06);}
  .hbar-wrap{display:flex;flex-direction:column;gap:10px;}
  .hbar-row{display:flex;align-items:center;gap:12px;}
  .hbar-label{font-size:.75rem;font-weight:600;color:#4a5278;width:100px;flex-shrink:0;text-align:right;}
  .hbar-track{flex:1;height:10px;background:#f0f2f8;border-radius:999px;overflow:hidden;}
  .hbar-fill{height:100%;border-radius:999px;transition:width .7s cubic-bezier(.22,1,.36,1);}
  .hbar-val{font-size:.75rem;font-weight:700;color:#1a1f36;width:48px;flex-shrink:0;}
  .donut-svg{display:block;margin:0 auto;}
  .mini-legend{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:12px;}
  .mini-legend-item{display:flex;align-items:center;gap:5px;font-size:.72rem;color:#4a5278;font-weight:500;}
  .mini-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
  .timeline-wrap{position:relative;padding-left:22px;}
  .timeline-wrap::before{content:'';position:absolute;left:7px;top:0;bottom:0;width:2px;background:#e8ecf5;}
  .tl-item{position:relative;margin-bottom:14px;}
  .tl-dot{position:absolute;left:-18px;top:4px;width:10px;height:10px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 2px currentColor;}
  .av-blue{background:linear-gradient(135deg,#4f6ef7,#818cf8) !important;}
  .av-violet{background:linear-gradient(135deg,#7c3aed,#a78bfa) !important;}
  .av-teal{background:linear-gradient(135deg,#0891b2,#22d3ee) !important;}
  .av-rose{background:linear-gradient(135deg,#e11d48,#fb7185) !important;}
  .av-green{background:linear-gradient(135deg,#059669,#34d399) !important;}
  .av-amber{background:linear-gradient(135deg,#d97706,#fbbf24) !important;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  .fu{animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;}
`;
if (!document.getElementById("portal-styles")) {
  const s = document.createElement("style"); s.id = "portal-styles"; s.textContent = globalStyles; document.head.appendChild(s);
}

// ── Health Status helpers ─────────────────────────────────────────────────────
const HS_METRICS = {
  bloodSugarLevel:  { label:"Blood Sugar",   unit:"mg/dL", color:"#f59e0b", bg:"#fffbeb", border:"#fcd34d", safe:[70,140] },
  heartRate:        { label:"Heart Rate",     unit:"bpm",   color:"#e11d48", bg:"#fff1f3", border:"#fda4af", safe:[60,100] },
  oxygenSaturation: { label:"SpO₂",          unit:"%",     color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc", safe:[95,100] },
  bodyTemperature:  { label:"Temperature",    unit:"°C",    color:"#f97316", bg:"#fff7ed", border:"#fed7aa", safe:[36.1,37.2] },
  respiratoryRate:  { label:"Resp. Rate",     unit:"/min",  color:"#059669", bg:"#ecfdf5", border:"#6ee7b7", safe:[12,20] },
  bmi:              { label:"BMI",            unit:"",      color:"#7c3aed", bg:"#f5f3ff", border:"#c4b5fd", safe:[18.5,24.9] },
  weight:           { label:"Weight",         unit:"kg",    color:"#4f6ef7", bg:"#eef1fe", border:"#a5b4fc", safe:null },
};
const HS_EMPTY = { bloodSugarLevel:"",sugarType:"fasting",bodyTemperature:"",bloodPressure:"",heartRate:"",oxygenSaturation:"",respiratoryRate:"",height:"",weight:"" };
const hsStatus  = (key,val) => { const s=HS_METRICS[key]?.safe; if(!s||val==null)return null; if(val<s[0])return"low"; if(val>s[1])return"high"; return"normal"; };
const HS_SCOL   = { normal:"#059669", low:"#f59e0b", high:"#e11d48" };
const HS_SBGCOL = { normal:"#ecfdf5", low:"#fffbeb", high:"#fff1f3" };
const hsParseBP = (bp) => { if(!bp)return null; const[s,d]=bp.split("/").map(Number); return isNaN(s)||isNaN(d)?null:{sys:s,dia:d}; };
const hsFmtDate = (d) => { try{return format(new Date(d),"MMM d, HH:mm");}catch{return"";} };
const hsFmt = (v,dec=1) => (v!=null?Number(v).toFixed(dec):"—");
const hsInputSx = { "& .MuiOutlinedInput-root":{background:"#f8f9ff",borderRadius:"12px","& fieldset":{borderColor:"#e8ecf5"},"&:hover fieldset":{borderColor:"#c7cee8"},"&.Mui-focused fieldset":{borderColor:"#4f6ef7"}},"& .MuiInputLabel-root.Mui-focused":{color:"#4f6ef7"} };
const hsCardSx  = { background:"#fff",border:"1px solid #e8ecf5",borderRadius:"18px",boxShadow:"0 1px 6px rgba(79,110,247,.06)",transition:"box-shadow .2s,transform .2s","&:hover":{boxShadow:"0 6px 24px rgba(79,110,247,.12)",transform:"translateY(-2px)"} };
const CHART_TOOLTIP = { contentStyle:{background:"#fff",border:"1px solid #e8ecf5",borderRadius:10,boxShadow:"0 4px 16px rgba(79,110,247,.12)",fontSize:12},labelStyle:{color:"#8892b0",fontWeight:600} };

const avatarColors   = ["av-blue","av-violet","av-teal","av-rose","av-green","av-amber"];
const getAvatarClass = (i) => avatarColors[i%avatarColors.length];
const RECORD_TYPES   = ["LAB_REPORT","PRESCRIPTION","SCAN","VACCINATION","SURGERY","OTHER"];
const RECORD_COLORS  = {
  LAB_REPORT:{bg:"#eef1fe",color:"#4f6ef7",border:"rgba(79,110,247,.2)"},
  PRESCRIPTION:{bg:"#ecfdf5",color:"#059669",border:"rgba(5,150,105,.2)"},
  SCAN:{bg:"#fff1f3",color:"#e11d48",border:"rgba(225,29,72,.2)"},
  VACCINATION:{bg:"#fffbeb",color:"#d97706",border:"rgba(217,119,6,.2)"},
  SURGERY:{bg:"#f5f3ff",color:"#7c3aed",border:"rgba(124,58,237,.2)"},
  OTHER:{bg:"#f5f7ff",color:"#8892b0",border:"#e8ecf5"},
};
const getStatusColor = (s) => s==="APPROVED"?"success":s==="REJECTED"?"error":"warning";

// ── Helper: load payments for a patient and build the map ──────────────────────
async function loadPaymentsMap(patientId) {
  try {
    const r = await axios.get(`${BASE}/payments/patient/${patientId}`);
    const map = {};
    (r.data || []).forEach(p => {
      // Support both direct appointmentId field and nested appointment object
      const apptId = p.appointmentId ?? p.appointment?.id;
      if (apptId && p.status === "SUCCESS") {
        map[apptId] = { status: "SUCCESS", paymentId: p.id };
      }
    });
    return map;
  } catch {
    return {};
  }
}

function NavItem({icon,label,active,onClick,badge}) {
  return (
    <div className={`nav-item ${active?"active":""}`} onClick={onClick} style={{position:"relative"}}>
      <div className="nav-icon-wrap">{icon}</div>
      {label}
      {badge>0&&<span style={{marginLeft:"auto",background:"#e11d48",color:"#fff",fontSize:".62rem",fontWeight:700,borderRadius:"999px",padding:"1px 7px",minWidth:18,textAlign:"center"}}>{badge}</span>}
    </div>
  );
}
function StatCard({label,value,icon,color}) {
  return (
    <div className="stat-card fu">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{color}}>{value}</div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
}

// ── HealthStats ───────────────────────────────────────────────────────────────
function HealthStats({appointments,prescriptions,medicalRecords,payments}) {
  const total=appointments.length,approved=appointments.filter(a=>a.status==="APPROVED").length,pending=appointments.filter(a=>a.status==="PENDING").length,rejected=appointments.filter(a=>a.status==="REJECTED").length;
  const typeCounts=RECORD_TYPES.reduce((acc,t)=>{acc[t]=medicalRecords.filter(r=>r.recordType===t).length;return acc;},{});
  const now=new Date();
  const months=Array.from({length:6},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-5+i,1);return{label:d.toLocaleString("default",{month:"short"}),year:d.getFullYear(),month:d.getMonth()};});
  const monthlyData=months.map(m=>({label:m.label,count:appointments.filter(a=>{if(!a.date)return false;const d=new Date(a.date);return d.getFullYear()===m.year&&d.getMonth()===m.month;}).length}));
  const maxCount=Math.max(...monthlyData.map(m=>m.count),1);
  const donutData=[{label:"Approved",count:approved,color:"#059669"},{label:"Pending",count:pending,color:"#f59e0b"},{label:"Rejected",count:rejected,color:"#e11d48"}].filter(d=>d.count>0);
  const r=58,cx=70,cy=70,circum=2*Math.PI*r;let offset=0;
  const segments=donutData.map(d=>{const pct=total>0?d.count/total:0;const dash=pct*circum;const gap=circum-dash;const seg={...d,dash,gap,offset,pct};offset+=dash;return seg;});
  const typeBars=Object.entries(typeCounts).filter(([,v])=>v>0).map(([k,v])=>({label:k.replace("_"," "),val:v,color:RECORD_COLORS[k]?.color||"#8892b0"}));
  const maxType=Math.max(...typeBars.map(b=>b.val),1);
  const paidCount=Object.values(payments).filter(p=>p?.status==="SUCCESS").length;
  const pendingPayCount=Math.max(approved-paidCount,0);
  return (
    <Box><Grid container spacing={2.5}>
      <Grid item xs={12} sm={6} md={4}><div className="health-chart-card" style={{height:"100%"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Appointment Status</Typography>{total===0?(<Box sx={{textAlign:"center",py:4,color:"#c0c8e0"}}><Typography sx={{fontSize:"2rem",mb:1}}>📅</Typography><Typography sx={{fontSize:".82rem"}}>No appointments yet</Typography></Box>):(<><svg className="donut-svg" width={140} height={140} viewBox="0 0 140 140"><circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f2f8" strokeWidth={16}/>{segments.map((seg,i)=>(<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={16} strokeDasharray={`${seg.dash} ${seg.gap}`} strokeDashoffset={-seg.offset} transform="rotate(-90 70 70)"/>))}<text x={cx} y={cy-4} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1a1f36" fontFamily="'Cormorant Garamond',serif">{total}</text><text x={cx} y={cy+14} textAnchor="middle" fontSize={9} fill="#8892b0" fontFamily="Outfit,sans-serif">Total</text></svg><div className="mini-legend">{donutData.map(d=>(<div key={d.label} className="mini-legend-item"><div className="mini-dot" style={{background:d.color}}/>{d.label}: {d.count}</div>))}</div></>)}</div></Grid>
      <Grid item xs={12} sm={6} md={4}><div className="health-chart-card" style={{height:"100%"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Monthly Activity</Typography><Box sx={{display:"flex",alignItems:"flex-end",gap:"6px",height:90,px:.5}}>{monthlyData.map((m,i)=>{const pct=m.count/maxCount;return(<Box key={i} sx={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:.5}}><Typography sx={{fontSize:".62rem",color:"#8892b0",fontWeight:600}}>{m.count||""}</Typography><Box sx={{width:"100%",background:`rgba(79,110,247,${0.15+pct*0.7})`,borderRadius:"5px 5px 0 0",height:`${Math.max(pct*68,4)}px`,transition:"height .6s ease",minHeight:4}}/><Typography sx={{fontSize:".62rem",color:"#8892b0",fontWeight:600,textAlign:"center"}}>{m.label}</Typography></Box>);})}</Box></div></Grid>
      <Grid item xs={12} sm={6} md={4}><div className="health-chart-card" style={{height:"100%"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Payment Health</Typography><Box sx={{display:"flex",flexDirection:"column",gap:2}}>{[{label:"Paid",val:paidCount,color:"#059669",max:Math.max(approved,1)},{label:"Pending",val:pendingPayCount,color:"#f59e0b",max:Math.max(approved,1)},{label:"Records",val:medicalRecords.length,color:"#4f6ef7",max:Math.max(medicalRecords.length,1)},{label:"Rx",val:prescriptions.length,color:"#7c3aed",max:Math.max(prescriptions.length,1)}].map(item=>(<Box key={item.label}><Box sx={{display:"flex",justifyContent:"space-between",mb:.5}}><Typography sx={{fontSize:".75rem",fontWeight:600,color:"#4a5278"}}>{item.label}</Typography><Typography sx={{fontSize:".75rem",fontWeight:700,color:item.color}}>{item.val}</Typography></Box><Box sx={{height:8,background:"#f0f2f8",borderRadius:999,overflow:"hidden"}}><Box sx={{height:"100%",width:`${(item.val/item.max)*100}%`,background:item.color,borderRadius:999,transition:"width .7s ease"}}/></Box></Box>))}</Box></div></Grid>
      <Grid item xs={12} sm={6} md={6}><div className="health-chart-card"><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Medical Record Types</Typography>{typeBars.length===0?<Box sx={{textAlign:"center",py:3,color:"#c0c8e0"}}><Typography sx={{fontSize:".82rem"}}>No records yet</Typography></Box>:(<div className="hbar-wrap">{typeBars.map(b=>(<div key={b.label} className="hbar-row"><span className="hbar-label">{b.label}</span><div className="hbar-track"><div className="hbar-fill" style={{width:`${(b.val/maxType)*100}%`,background:b.color}}/></div><span className="hbar-val" style={{color:b.color}}>{b.val}</span></div>))}</div>)}</div></Grid>
      <Grid item xs={12} sm={6} md={6}><div className="health-chart-card"><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:"#1a1f36",mb:2}}>Prescription Timeline</Typography>{prescriptions.length===0?(<Box sx={{textAlign:"center",py:3,color:"#c0c8e0"}}><Typography sx={{fontSize:"2rem",mb:1}}>💊</Typography><Typography sx={{fontSize:".82rem"}}>No prescriptions yet</Typography></Box>):(<div className="timeline-wrap">{[...prescriptions].reverse().slice(0,5).map(rx=>(<div key={rx.id} className="tl-item"><div className="tl-dot" style={{color:"#059669",background:"#ecfdf5"}}/><Box sx={{pl:1}}><Typography sx={{fontSize:".82rem",fontWeight:700,color:"#1a1f36"}}>{rx.diagnosis||"Prescription"}</Typography><Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Dr. {rx.appointment?.doctor?.name} · {rx.issuedDate||rx.appointment?.date||"—"}</Typography>{rx.medicines&&<Typography sx={{fontSize:".72rem",color:"#4f6ef7",mt:.3}} noWrap>💊 {rx.medicines.split("\n")[0]}</Typography>}</Box></div>))}</div>)}</div></Grid>
    </Grid></Box>
  );
}

// ── HsMetricCard ──────────────────────────────────────────────────────────────
function HsMetricCard({label,value,unit,color,bg,border,status}) {
  return (
    <Card sx={{background:bg,border:`1px solid ${border}`,borderRadius:"16px",boxShadow:"none",height:"100%",transition:"transform .2s,box-shadow .2s","&:hover":{transform:"translateY(-3px)",boxShadow:`0 8px 24px ${color}22`}}}>
      <CardContent sx={{p:"20px !important"}}>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:1}}>
          <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:700}}>{label}</Typography>
          {status&&<Chip label={status} size="small" sx={{height:20,fontSize:".65rem",fontWeight:700,background:HS_SBGCOL[status],color:HS_SCOL[status],border:`1px solid ${HS_SCOL[status]}33`}}/>}
        </Box>
        <Box sx={{display:"flex",alignItems:"baseline",gap:.75,mt:.5}}>
          <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.2rem",fontWeight:700,color,lineHeight:1}}>{value}</Typography>
          {unit&&<Typography sx={{fontSize:".78rem",color:"#8892b0",fontWeight:600}}>{unit}</Typography>}
        </Box>
      </CardContent>
    </Card>
  );
}

function HealthStatusView({patientId}) {
  const [hsHistory,setHsHistory]=useState([]);const [hsLatest,setHsLatest]=useState(null);const [hsLoading,setHsLoading]=useState(true);const [hsDialog,setHsDialog]=useState(false);const [hsForm,setHsForm]=useState(HS_EMPTY);const [hsEditId,setHsEditId]=useState(null);const [hsSaving,setHsSaving]=useState(false);const [hsSnack,setHsSnack]=useState({open:false,msg:"",sev:"success"});
  const loadHS=useCallback(async()=>{if(!patientId)return;try{setHsLoading(true);const[hRes,lRes]=await Promise.allSettled([axios.get(`${BASE}/health-status/patient/${patientId}`),axios.get(`${BASE}/health-status/patient/${patientId}/latest`)]);if(hRes.status==="fulfilled")setHsHistory(hRes.value.data);if(lRes.status==="fulfilled")setHsLatest(lRes.value.data);}catch{}finally{setHsLoading(false);}},[patientId]);
  useEffect(()=>{loadHS();},[loadHS]);
  const openAdd=()=>{setHsForm(HS_EMPTY);setHsEditId(null);setHsDialog(true);};
  const openEdit=(r)=>{setHsForm({bloodSugarLevel:r.bloodSugarLevel??"",sugarType:r.sugarType??"fasting",bodyTemperature:r.bodyTemperature??"",bloodPressure:r.bloodPressure??"",heartRate:r.heartRate??"",oxygenSaturation:r.oxygenSaturation??"",respiratoryRate:r.respiratoryRate??"",height:r.height??"",weight:r.weight??""});setHsEditId(r.id);setHsDialog(true);};
  const handleSave=async()=>{setHsSaving(true);try{const payload={...hsForm,bloodSugarLevel:hsForm.bloodSugarLevel!==""?Number(hsForm.bloodSugarLevel):null,bodyTemperature:hsForm.bodyTemperature!==""?Number(hsForm.bodyTemperature):null,heartRate:hsForm.heartRate!==""?Number(hsForm.heartRate):null,oxygenSaturation:hsForm.oxygenSaturation!==""?Number(hsForm.oxygenSaturation):null,respiratoryRate:hsForm.respiratoryRate!==""?Number(hsForm.respiratoryRate):null,height:hsForm.height!==""?Number(hsForm.height):null,weight:hsForm.weight!==""?Number(hsForm.weight):null};if(hsEditId){await axios.put(`${BASE}/health-status/${hsEditId}`,payload);}else{await axios.post(`${BASE}/health-status/patient/${patientId}`,payload);}setHsDialog(false);setHsSnack({open:true,msg:hsEditId?"Updated!":"Saved!",sev:"success"});loadHS();}catch{setHsSnack({open:true,msg:"Save failed.",sev:"error"});}finally{setHsSaving(false);}};
  const chartData=[...hsHistory].reverse().slice(-12).map(r=>({time:hsFmtDate(r.recordedAt),bloodSugar:r.bloodSugarLevel,heartRate:r.heartRate,spO2:r.oxygenSaturation,temp:r.bodyTemperature,bmi:r.bmi,weight:r.weight,resp:r.respiratoryRate}));
  const bpData=[...hsHistory].reverse().slice(-12).map(r=>{const bp=hsParseBP(r.bloodPressure);return{time:hsFmtDate(r.recordedAt),systolic:bp?.sys??null,diastolic:bp?.dia??null};});
  const estBMI=hsForm.height&&hsForm.weight?(Number(hsForm.weight)/Math.pow(Number(hsForm.height)/100,2)).toFixed(1):null;
  if(hsLoading)return(<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:340}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>);
  return (
    <Box>
      <Box sx={{mb:4,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:2}}>
        <Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Health Status</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{hsHistory.length>0?`${hsHistory.length} reading${hsHistory.length>1?"s":""}`:""}</Typography></Box>
        <Button onClick={openAdd} variant="contained" sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,px:3,py:1.4,boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>+ Log Reading</Button>
      </Box>
      {hsHistory.length===0?(<Box sx={{textAlign:"center",py:10}}><Typography sx={{fontSize:64,mb:2}}>🩺</Typography><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>No health data yet</Typography><Button onClick={openAdd} variant="contained" sx={{mt:3,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,px:4}}>Log Your First Reading</Button></Box>):(
        <>
          <div className="sec-heading" style={{marginBottom:16}}>Latest Vitals</div>
          <Grid container spacing={2} sx={{mb:4}}>{Object.entries(HS_METRICS).map(([key,cfg])=>{const val=hsLatest?.[key];const st=hsStatus(key,val);return(<Grid item xs={6} sm={4} md={3} key={key}><HsMetricCard label={cfg.label} value={val!=null?hsFmt(val,key==="heartRate"||key==="respiratoryRate"?0:1):"—"} unit={cfg.unit} color={cfg.color} bg={cfg.bg} border={cfg.border} status={st}/></Grid>);})}
            <Grid item xs={6} sm={4} md={3}><HsMetricCard label="Blood Pressure" value={hsLatest?.bloodPressure??"—"} unit="mmHg" color="#7c3aed" bg="#f5f3ff" border="#c4b5fd" status={null}/></Grid>
          </Grid>
          <div className="sec-heading" style={{marginBottom:16}}>Trends Over Time</div>
          <Box sx={{mb:3}}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>Blood Sugar Level</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>mg/dL readings over time</Typography><ResponsiveContainer width="100%" height={260}><AreaChart data={chartData} margin={{top:5,right:20,left:0,bottom:5}}><defs><linearGradient id="gradSugar" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.18}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}}/><ReTooltip {...CHART_TOOLTIP}/><Area type="monotone" dataKey="bloodSugar" stroke="#f59e0b" fill="url(#gradSugar)" strokeWidth={3} dot={{fill:"#f59e0b",r:5,strokeWidth:2,stroke:"#fff"}} name="Blood Sugar (mg/dL)"/></AreaChart></ResponsiveContainer></CardContent></Card></Box>
          <Grid container spacing={3} sx={{mb:3}}>
            <Grid item xs={12} md={6}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>Heart Rate</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>bpm · Normal: 60–100</Typography><ResponsiveContainer width="100%" height={240}><LineChart data={chartData} margin={{top:5,right:20,left:0,bottom:5}}><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}} domain={[40,160]}/><ReTooltip {...CHART_TOOLTIP}/><Line type="monotone" dataKey="heartRate" stroke="#e11d48" strokeWidth={3} dot={{fill:"#e11d48",r:5,strokeWidth:2,stroke:"#fff"}} name="Heart Rate (bpm)"/></LineChart></ResponsiveContainer></CardContent></Card></Grid>
            <Grid item xs={12} md={6}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>SpO₂</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>% · Normal: 95–100</Typography><ResponsiveContainer width="100%" height={240}><AreaChart data={chartData} margin={{top:5,right:20,left:0,bottom:5}}><defs><linearGradient id="gradSpO2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0891b2" stopOpacity={0.18}/><stop offset="95%" stopColor="#0891b2" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}} domain={[85,100]}/><ReTooltip {...CHART_TOOLTIP}/><Area type="monotone" dataKey="spO2" stroke="#0891b2" fill="url(#gradSpO2)" strokeWidth={3} dot={{fill:"#0891b2",r:5,strokeWidth:2,stroke:"#fff"}} name="SpO₂ (%)"/></AreaChart></ResponsiveContainer></CardContent></Card></Grid>
          </Grid>
          <Box sx={{mb:3}}><Card sx={hsCardSx}><CardContent sx={{p:"28px !important"}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:"#1a1f36"}}>Blood Pressure</Typography><Typography sx={{fontSize:".78rem",color:"#8892b0",mt:.3,mb:2.5}}>Systolic / Diastolic mmHg</Typography><ResponsiveContainer width="100%" height={260}><AreaChart data={bpData} margin={{top:5,right:20,left:0,bottom:5}}><defs><linearGradient id="gradSys" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e11d48" stopOpacity={0.15}/><stop offset="95%" stopColor="#e11d48" stopOpacity={0}/></linearGradient><linearGradient id="gradDia" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#f0f2f8"/><XAxis dataKey="time" tick={{fill:"#8892b0",fontSize:11}}/><YAxis tick={{fill:"#8892b0",fontSize:11}} domain={[40,200]}/><ReTooltip {...CHART_TOOLTIP}/><Legend wrapperStyle={{fontSize:13,paddingTop:8}}/><Area type="monotone" dataKey="systolic" stroke="#e11d48" fill="url(#gradSys)" strokeWidth={3} dot={{fill:"#e11d48",r:4,strokeWidth:2,stroke:"#fff"}} name="Systolic (mmHg)"/><Area type="monotone" dataKey="diastolic" stroke="#7c3aed" fill="url(#gradDia)" strokeWidth={3} dot={{fill:"#7c3aed",r:4,strokeWidth:2,stroke:"#fff"}} name="Diastolic (mmHg)"/></AreaChart></ResponsiveContainer></CardContent></Card></Box>
          <div className="sec-heading" style={{marginBottom:16}}>Reading History</div>
          <Card sx={{...hsCardSx,"&:hover":{}}}><CardContent sx={{p:"0 !important"}}><Box sx={{overflowX:"auto"}}><Box component="table" sx={{width:"100%",borderCollapse:"collapse"}}><Box component="thead"><Box component="tr" sx={{background:"#f8f9ff"}}>{["Date","Blood Sugar","Temp","B.P.","Heart Rate","SpO₂","Resp.","BMI",""].map(h=>(<Box component="th" key={h} sx={{p:"14px 18px",textAlign:"left",color:"#8892b0",fontSize:".72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",borderBottom:"1px solid #e8ecf5",whiteSpace:"nowrap"}}>{h}</Box>))}</Box></Box><Box component="tbody">{hsHistory.map((r,idx)=>(<Box component="tr" key={r.id} sx={{background:idx%2===0?"#fff":"#fafbff","&:hover":{background:"#eef1fe"}}}>{[hsFmtDate(r.recordedAt),r.bloodSugarLevel?`${r.bloodSugarLevel} mg/dL`:"—",r.bodyTemperature?`${r.bodyTemperature}°C`:"—",r.bloodPressure??"—",r.heartRate?`${r.heartRate} bpm`:"—",r.oxygenSaturation?`${r.oxygenSaturation}%`:"—",r.respiratoryRate?`${r.respiratoryRate}/min`:"—",r.bmi?Number(r.bmi).toFixed(1):"—"].map((cell,i)=>(<Box component="td" key={i} sx={{p:"12px 18px",color:"#1a1f36",fontSize:".85rem",borderBottom:"1px solid #f0f2f8",whiteSpace:"nowrap"}}>{cell}</Box>))}<Box component="td" sx={{p:"12px 18px",borderBottom:"1px solid #f0f2f8"}}><Button size="small" onClick={()=>openEdit(r)} sx={{background:"#eef1fe",color:"#4f6ef7",textTransform:"none",fontWeight:700,fontSize:".78rem",borderRadius:"8px",px:1.5,py:.5,minWidth:0,"&:hover":{background:"#4f6ef7",color:"#fff"}}}>Edit</Button></Box></Box>))}</Box></Box></Box></CardContent></Card>
        </>
      )}
      <Dialog open={hsDialog} onClose={()=>setHsDialog(false)} maxWidth="sm" fullWidth PaperProps={{sx:{borderRadius:"20px",border:"1px solid #e8ecf5"}}}>
        <DialogTitle sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36",borderBottom:"1px solid #e8ecf5",pb:2}}>{hsEditId?"✏️ Update Reading":"🩺 Log New Reading"}</DialogTitle>
        <DialogContent sx={{pt:"24px !important"}}><Grid container spacing={2}>
          <Grid item xs={8}><TextField fullWidth label="Blood Sugar (mg/dL)" type="number" sx={hsInputSx} value={hsForm.bloodSugarLevel} onChange={e=>setHsForm({...hsForm,bloodSugarLevel:e.target.value})}/></Grid>
          <Grid item xs={4}><TextField fullWidth select label="Type" sx={hsInputSx} value={hsForm.sugarType} onChange={e=>setHsForm({...hsForm,sugarType:e.target.value})}>{["fasting","post-meal","random"].map(o=><MenuItem key={o} value={o}>{o}</MenuItem>)}</TextField></Grid>
          <Grid item xs={6}><TextField fullWidth label="Temperature (°C)" type="number" sx={hsInputSx} value={hsForm.bodyTemperature} onChange={e=>setHsForm({...hsForm,bodyTemperature:e.target.value})}/></Grid>
          <Grid item xs={6}><TextField fullWidth label="Blood Pressure (e.g. 120/80)" sx={hsInputSx} value={hsForm.bloodPressure} onChange={e=>setHsForm({...hsForm,bloodPressure:e.target.value})}/></Grid>
          <Grid item xs={6}><TextField fullWidth label="Heart Rate (bpm)" type="number" sx={hsInputSx} value={hsForm.heartRate} onChange={e=>setHsForm({...hsForm,heartRate:e.target.value})}/></Grid>
          <Grid item xs={6}><TextField fullWidth label="SpO₂ (%)" type="number" sx={hsInputSx} value={hsForm.oxygenSaturation} onChange={e=>setHsForm({...hsForm,oxygenSaturation:e.target.value})}/></Grid>
          <Grid item xs={12}><TextField fullWidth label="Respiratory Rate (/min)" type="number" sx={hsInputSx} value={hsForm.respiratoryRate} onChange={e=>setHsForm({...hsForm,respiratoryRate:e.target.value})}/></Grid>
          <Grid item xs={6}><TextField fullWidth label="Height (cm)" type="number" sx={hsInputSx} value={hsForm.height} onChange={e=>setHsForm({...hsForm,height:e.target.value})}/></Grid>
          <Grid item xs={6}><TextField fullWidth label="Weight (kg)" type="number" sx={hsInputSx} value={hsForm.weight} onChange={e=>setHsForm({...hsForm,weight:e.target.value})}/></Grid>
          {estBMI&&(<Grid item xs={12}><Box sx={{background:"#f5f3ff",border:"1px solid #c4b5fd",borderRadius:"12px",px:2,py:1.5,display:"flex",alignItems:"center",gap:1.5}}><Typography sx={{fontSize:"1.4rem"}}>⚖️</Typography><Box><Typography sx={{fontSize:".7rem",color:"#8892b0",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Estimated BMI</Typography><Typography sx={{fontSize:"1.1rem",fontWeight:700,color:"#7c3aed"}}>{estBMI}</Typography></Box></Box></Grid>)}
        </Grid></DialogContent>
        <DialogActions sx={{p:"20px 24px",borderTop:"1px solid #e8ecf5",gap:1}}>
          <Button onClick={()=>setHsDialog(false)} sx={{color:"#8892b0",textTransform:"none",fontWeight:600,borderRadius:"10px"}}>Cancel</Button>
          <Button onClick={handleSave} disabled={hsSaving} variant="contained" sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:700,px:3}}>{hsSaving?<CircularProgress size={18} sx={{color:"#fff"}}/>:hsEditId?"Update":"Save"}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={hsSnack.open} autoHideDuration={3000} onClose={()=>setHsSnack({...hsSnack,open:false})}><Alert severity={hsSnack.sev} sx={{borderRadius:"12px"}}>{hsSnack.msg}</Alert></Snackbar>
    </Box>
  );
}

// ── DocRequestsView ───────────────────────────────────────────────────────────
function DocRequestsView({appointments,onUploaded}) {
  const [uploadingId,setUploadingId]=useState(null);
  const fileRefs=useRef({});
  const handleUpload=async(apptId,file)=>{
    if(!file)return;setUploadingId(apptId);
    try{const fd=new FormData();fd.append("file",file);const res=await axios.post(`${BASE}/appointments/${apptId}/upload-doc`,fd,{headers:{"Content-Type":"multipart/form-data"}});onUploaded(res.data);}
    catch{alert("Upload failed.");}finally{setUploadingId(null);}
  };
  const docAppts=appointments.filter(a=>a.docRequestStatus==="DOC_REQUEST_PENDING"||a.docRequestStatus==="DOC_REQUEST_DONE");
  return (
    <Box>
      <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Document Requests</Typography><Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Your doctors have requested health documents for these appointments.</Typography></Box>
      {docAppts.length===0?(<Box sx={{textAlign:"center",py:10,color:"#8892b0"}}><Typography sx={{fontSize:"3rem",mb:2}}>📋</Typography><Typography sx={{fontWeight:600,fontSize:"1rem",color:"#1a1f36"}}>No document requests</Typography><Typography sx={{fontSize:".85rem",mt:1}}>When a doctor requests health documents, they will appear here.</Typography></Box>):(
        <Grid container spacing={2.5}>{docAppts.map(appt=>{
          const isPending=appt.docRequestStatus==="DOC_REQUEST_PENDING";const isDone=appt.docRequestStatus==="DOC_REQUEST_DONE";const docUrl=appt.docFileName?`${BASE}/appointments/doc/${appt.docFileName}`:null;
          return (<Grid item xs={12} md={6} key={appt.id}><Card sx={{background:isDone?"#ecfdf5":"#fffbeb",border:`1.5px solid ${isDone?"#6ee7b7":"#fcd34d"}`,borderRadius:"18px",boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}><CardContent sx={{p:"24px !important"}}>
            <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}><Avatar sx={{width:48,height:48,borderRadius:"14px",fontWeight:700,background:"linear-gradient(135deg,#4f6ef7,#818cf8)"}}>{appt.doctor?.name?.charAt(0)}</Avatar><Box sx={{flex:1}}><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography><Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization} · {appt.date} · {appt.timeSlot}</Typography></Box><Chip label={isDone?"✓ Uploaded":"⏳ Upload Needed"} size="small" sx={{background:isDone?"#ecfdf5":"#fffbeb",color:isDone?"#059669":"#d97706",border:`1px solid ${isDone?"#6ee7b7":"#fcd34d"}`,fontWeight:700,fontSize:".72rem"}}/></Box>
            {appt.docRequestMessage&&(<Box sx={{background:"rgba(255,255,255,.8)",borderRadius:"10px",p:"10px 14px",mb:1.5,border:"1px solid rgba(0,0,0,.06)"}}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:700,mb:.4}}>Doctor's Request</Typography><Typography sx={{fontSize:".85rem",color:"#1a1f36"}}>"{appt.docRequestMessage}"</Typography></Box>)}
            {isDone&&docUrl?(<Box sx={{display:"flex",gap:1,alignItems:"center"}}><a href={docUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:8,fontSize:".78rem",fontWeight:600,textDecoration:"none",background:"linear-gradient(135deg,#059669,#34d399)",color:"#fff"}}>👁 View Document</a><Typography sx={{fontSize:".76rem",color:"#059669",fontWeight:600}}>Shared ✓</Typography></Box>)
            :isPending?(<Box><input type="file" ref={el=>fileRefs.current[appt.id]=el} style={{display:"none"}} accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={e=>handleUpload(appt.id,e.target.files[0])}/><Button fullWidth variant="contained" disabled={uploadingId===appt.id} onClick={()=>fileRefs.current[appt.id]?.click()} startIcon={<UploadFileIcon sx={{fontSize:16}}/>} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:700}}>{uploadingId===appt.id?"Uploading…":"Upload Health Documents"}</Button><Typography sx={{fontSize:".72rem",color:"#8892b0",textAlign:"center",mt:1}}>PDF, images, Word documents · Max 10 MB</Typography></Box>):null}
          </CardContent></Card></Grid>);
        })}</Grid>
      )}
    </Box>
  );
}

// ── PaymentModal ──────────────────────────────────────────────────────────────
// FIX: The modal now requires the user to fill card details and click "Pay".
// Only AFTER the backend confirms payment does onPaid() get called.
// ── PaymentModal — FIXED: compact size, requires user to fill & click Pay ─────
// ── PaymentModal — compact, uses exact same logic as working old version ──────
function PaymentModal({ open, onClose, appointment, onPaid }) {
  const [step,    setStep]    = useState("summary");
  const [cardNum, setCardNum] = useState("");
  const [cvv,     setCvv]     = useState("");
  const [expiry,  setExpiry]  = useState("");
  const [name,    setName]    = useState("");
  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "10px !important", background: "#f8f9ff !important" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e8ecf5 !important" }, "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2563eb !important" } };
  const handlePay = async () => {
    setStep("processing");
    setTimeout(async () => {
      try {
        await axios.post(`${BASE}/payments/create-order/${appointment.id}`);
        const dummyPayId = "pay_dummy_" + Date.now();
        await axios.post(`${BASE}/payments/confirm/${appointment.id}`, { razorpayPaymentId: dummyPayId });
        setStep("done");
        setTimeout(() => { onPaid(appointment.id); onClose(); setStep("summary"); }, 1800);
      } catch (e) { console.error(e); setStep("summary"); alert("Payment failed. Try again."); }
    }, 2000);
  };
  if (!appointment) return null;
  const fee = appointment.doctor?.consultationFee || 0;
  return (
    <Modal open={open} onClose={() => { if (step !== "processing") { setStep("summary"); onClose(); } }}>
      <Box className="rzp-modal-box">
        <Box sx={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)", borderRadius: "14px", p: "18px 22px", mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.5px" }}>razorpay</div>
            <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: ".74rem", mt: .3 }}>Secure Payment Gateway</Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: ".7rem" }}>Amount to Pay</Typography>
            <Typography sx={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, fontFamily: "'Cormorant Garamond',serif" }}>₹{fee}</Typography>
          </Box>
        </Box>
        {step === "summary" && (
          <>
            <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a1f36", mb: 2 }}>Payment Details</Typography>
            <Box sx={{ background: "#f8f9ff", border: "1px solid #e8ecf5", borderRadius: "12px", p: 2, mb: 3 }}>
              {[["Doctor", `Dr. ${appointment.doctor?.name}`], ["Specialization", appointment.doctor?.specialization], ["Date", appointment.date], ["Time", appointment.timeSlot], ["Consultation Fee", `₹${fee}`]].map(([l, v]) => (
                <Box key={l} sx={{ display: "flex", justifyContent: "space-between", mb: .8 }}>
                  <Typography sx={{ color: "#8892b0", fontSize: ".82rem" }}>{l}</Typography>
                  <Typography sx={{ color: "#1a1f36", fontWeight: 600, fontSize: ".82rem" }}>{v}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1.5, borderColor: "#e8ecf5" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 700, color: "#1a1f36", fontSize: ".92rem" }}>Total</Typography>
                <Typography sx={{ fontWeight: 800, color: "#2563eb", fontSize: "1rem", fontFamily: "'Cormorant Garamond',serif" }}>₹{fee}</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#8892b0", fontWeight: 600, mb: 1.5 }}>Card Details</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <TextField size="small" fullWidth placeholder="Card Number" variant="outlined" sx={fieldSx} value={cardNum} onChange={e => setCardNum(e.target.value.replace(/\D/g, "").slice(0, 16))} />
              <TextField size="small" fullWidth placeholder="Cardholder Name" variant="outlined" sx={fieldSx} value={name} onChange={e => setName(e.target.value)} />
              <Grid container spacing={1.5}>
                <Grid item xs={6}><TextField size="small" fullWidth placeholder="MM/YY" variant="outlined" sx={fieldSx} value={expiry} onChange={e => setExpiry(e.target.value.slice(0, 5))} /></Grid>
                <Grid item xs={6}><TextField size="small" fullWidth placeholder="CVV" type="password" variant="outlined" sx={fieldSx} value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} /></Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
              <Button onClick={() => onClose()} variant="outlined" fullWidth sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, borderColor: "#e8ecf5", color: "#8892b0" }}>Cancel</Button>
              <Button onClick={handlePay} variant="contained" fullWidth sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, fontSize: ".92rem", background: "linear-gradient(135deg,#1e3a8a,#2563eb)", boxShadow: "0 4px 14px rgba(37,99,235,.35)" }}>Pay ₹{fee}</Button>
            </Box>
          </>
        )}
        {step === "processing" && (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress sx={{ color: "#2563eb", mb: 2 }} size={48} />
            <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, color: "#1a1f36", mb: .5 }}>Processing Payment…</Typography>
            <Typography sx={{ fontSize: ".82rem", color: "#8892b0" }}>Please do not close this window</Typography>
            <LinearProgress sx={{ mt: 3, borderRadius: 4, height: 4, background: "#e8ecf5", "& .MuiLinearProgress-bar": { background: "#2563eb" } }} />
          </Box>
        )}
        {step === "done" && (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#34d399)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2, boxShadow: "0 6px 20px rgba(5,150,105,.3)" }}>
              <CheckCircleIcon sx={{ color: "#fff", fontSize: 34 }} />
            </Box>
            <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: "#059669", mb: .5 }}>Payment Successful!</Typography>
            <Typography sx={{ fontSize: ".85rem", color: "#8892b0" }}>₹{fee} paid successfully</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

// ── FeedbackModal ─────────────────────────────────────────────────────────────
function FeedbackModal({open,onClose,appointment,onSubmitted}) {
  const[rating,setRating]=useState(0);const[comment,setComment]=useState("");const[loading,setLoading]=useState(false);const[done,setDone]=useState(false);
  const handleSubmit=async()=>{if(!rating){alert("Please select a rating");return;}setLoading(true);try{await axios.post(`${BASE}/feedback`,{appointmentId:appointment.id,doctorId:appointment.doctor?.id,patientId:appointment.patient?.id,rating,comment});setDone(true);onSubmitted(appointment.id);setTimeout(()=>{setDone(false);setRating(0);setComment("");onClose();},1500);}catch{setDone(true);onSubmitted(appointment.id);setTimeout(()=>{setDone(false);setRating(0);setComment("");onClose();},1500);}finally{setLoading(false);}};
  if(!appointment)return null;
  return (
    <Modal open={open} onClose={onClose}><Box className="fb-modal-box">
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#1a1f36"}}>Rate Your Experience</Typography><IconButton size="small" onClick={onClose} sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton></Box>
      {done?(<Box sx={{textAlign:"center",py:3}}><Typography sx={{fontSize:"2.5rem",mb:1}}>⭐</Typography><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#059669"}}>Thank you!</Typography></Box>):(<><Typography sx={{fontSize:".8rem",color:"#8892b0",mb:2}}>Dr. {appointment.doctor?.name} · {appointment.date}</Typography><Box sx={{display:"flex",justifyContent:"center",mb:3}}><Rating size="large" value={rating} onChange={(_,v)=>setRating(v)} sx={{"& .MuiRating-iconFilled":{color:"#f59e0b"}}}/></Box><TextField fullWidth multiline rows={3} placeholder="Share your experience…" variant="outlined" value={comment} onChange={e=>setComment(e.target.value)} sx={{mb:3,"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"}}}/><Button onClick={handleSubmit} variant="contained" fullWidth disabled={loading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700}}>{loading?"Submitting…":"Submit Feedback"}</Button></>)}
    </Box></Modal>
  );
}

// ── UploadRecordModal ─────────────────────────────────────────────────────────
function UploadRecordModal({open,onClose,patientId,onUploaded}) {
  const[form,setForm]=useState({title:"",recordType:"LAB_REPORT",recordDate:"",issuedBy:"",description:""});const[file,setFile]=useState(null);const[dragOver,setDragOver]=useState(false);const[loading,setLoading]=useState(false);const[error,setError]=useState("");const fileRef=useRef();
  const handleFile=f=>{if(!f)return;if(f.size>10*1024*1024){setError("Max 10 MB.");return;}setError("");setFile(f);};
  const handleSubmit=async()=>{if(!form.title){setError("Title required.");return;}setLoading(true);setError("");try{const fd=new FormData();fd.append("patientId",patientId);fd.append("title",form.title);fd.append("recordType",form.recordType);fd.append("recordDate",form.recordDate);fd.append("issuedBy",form.issuedBy);fd.append("description",form.description);if(file)fd.append("file",file);const res=await axios.post(`${BASE}/medical-records/upload`,fd,{headers:{"Content-Type":"multipart/form-data"}});onUploaded(res.data);setForm({title:"",recordType:"LAB_REPORT",recordDate:"",issuedBy:"",description:""});setFile(null);onClose();}catch(e){setError(e?.response?.data||"Upload failed.");}finally{setLoading(false);}};
  const fieldSx={"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}};
  return (
    <Modal open={open} onClose={onClose}><Box className="upload-modal-box">
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mb:3}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#1a1f36"}}>Add Medical Record</Typography><IconButton size="small" onClick={onClose} sx={{background:"#f5f7ff",border:"1px solid #e8ecf5",borderRadius:"9px"}}><CloseIcon sx={{fontSize:16}}/></IconButton></Box>
      <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
        <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Title *</Typography><TextField fullWidth size="small" variant="outlined" placeholder="e.g. Blood Test Report" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} sx={fieldSx}/></Box>
        <Grid container spacing={2}><Grid item xs={6}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Record Type</Typography><Select fullWidth size="small" value={form.recordType} onChange={e=>setForm({...form,recordType:e.target.value})} sx={{"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"}}}>{RECORD_TYPES.map(t=><MenuItem key={t} value={t}>{t.replace("_"," ")}</MenuItem>)}</Select></Grid><Grid item xs={6}><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Date</Typography><TextField fullWidth size="small" type="date" variant="outlined" value={form.recordDate} onChange={e=>setForm({...form,recordDate:e.target.value})} sx={fieldSx}/></Grid></Grid>
        <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Issued By</Typography><TextField fullWidth size="small" variant="outlined" placeholder="e.g. Dr. Ramesh Kumar" value={form.issuedBy} onChange={e=>setForm({...form,issuedBy:e.target.value})} sx={fieldSx}/></Box>
        <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Notes</Typography><TextField fullWidth size="small" multiline rows={2} variant="outlined" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} sx={fieldSx}/></Box>
        <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Attach File (max 10 MB)</Typography><div className={`drop-zone ${dragOver?"dragover":""}`} onClick={()=>fileRef.current?.click()} onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0]);}}><input ref={fileRef} type="file" hidden accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" onChange={e=>handleFile(e.target.files[0])}/><UploadFileIcon sx={{fontSize:32,color:"#c0c8e0",mb:1}}/>{file?<Typography sx={{fontSize:".85rem",fontWeight:600,color:"#4f6ef7"}}>{file.name}</Typography>:<Typography sx={{fontSize:".82rem",color:"#8892b0"}}>Click or drag & drop</Typography>}</div></Box>
        {error&&<Box sx={{background:"#fff1f3",border:"1px solid rgba(225,29,72,.2)",borderRadius:"10px",padding:"10px 14px",fontSize:".83rem",color:"#e11d48",fontWeight:500}}>⚠ {error}</Box>}
        {loading&&<LinearProgress sx={{borderRadius:4,height:4}}/>}
        <Button onClick={handleSubmit} variant="contained" disabled={loading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".92rem",py:1.4}}>{loading?"Uploading…":"Save Record"}</Button>
      </Box>
    </Box></Modal>
  );
}

// ── RecordCard ────────────────────────────────────────────────────────────────
function RecordCard({record,onDelete}) {
  const[showPreview,setShowPreview]=useState(false);const sc=RECORD_COLORS[record.recordType]||RECORD_COLORS.OTHER;const fileUrl=record.fileName?`${BASE}/medical-records/file/${record.fileName}`:null;const lower=(record.fileName||"").toLowerCase();const isPdf=lower.endsWith(".pdf");const isImage=lower.endsWith(".png")||lower.endsWith(".jpg")||lower.endsWith(".jpeg")||lower.endsWith(".webp");
  return (
    <div className="record-card">
      <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
        <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:sc.bg,border:`1px solid ${sc.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}><DescriptionIcon sx={{color:sc.color,fontSize:22}}/></Box>
        <Box sx={{flex:1,minWidth:0}}>
          <Box sx={{display:"flex",alignItems:"center",gap:1,flexWrap:"wrap",mb:.5}}><Typography sx={{fontWeight:700,fontSize:".92rem",color:"#1a1f36"}}>{record.title}</Typography><Chip label={record.recordType?.replace("_"," ")} size="small" sx={{background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontWeight:600,fontSize:".68rem",height:22}}/></Box>
          {record.issuedBy&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>👤 {record.issuedBy}</Typography>}
          {record.recordDate&&<Typography sx={{fontSize:".78rem",color:"#8892b0",mb:.4}}>📅 {record.recordDate}</Typography>}
          {record.description&&<Typography sx={{fontSize:".8rem",color:"#4a5278",mt:.5}}>{record.description}</Typography>}
          {fileUrl&&(<Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>
            {(isPdf||isImage)&&(<button onClick={()=>setShowPreview(p=>!p)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,cursor:"pointer",fontSize:".76rem",fontWeight:600,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",color:"#fff",border:"none",fontFamily:"'Outfit',sans-serif"}}>{showPreview?<><VisibilityOffIcon sx={{fontSize:13}}/> Hide</>:<><VisibilityIcon sx={{fontSize:13}}/> Preview</>}</button>)}
            <a href={fileUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.2)"}}><OpenInNewIcon sx={{fontSize:13}}/> Open</a>
            <a href={fileUrl} download={record.fileName} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,fontSize:".76rem",fontWeight:600,textDecoration:"none",background:"#f5f7ff",color:"#4a5278",border:"1px solid #e8ecf5"}}><DownloadIcon sx={{fontSize:13}}/> Download</a>
          </Box>)}
          {showPreview&&fileUrl&&(<div className="file-preview-wrap">{isPdf&&<iframe src={fileUrl} title={record.title}/>}{isImage&&<img src={fileUrl} alt={record.title}/>}</div>)}
        </Box>
        <IconButton size="small" onClick={()=>onDelete(record.id)} sx={{color:"#e11d48",background:"#fff1f3",borderRadius:"9px",flexShrink:0,"&:hover":{background:"#fce7f3"}}}><DeleteIcon sx={{fontSize:17}}/></IconButton>
      </Box>
    </div>
  );
}

// ── BookAppointmentInline ─────────────────────────────────────────────────────
function BookAppointmentInline({patient,doctors}) {
  const[searchQuery,setSearchQuery]=useState("");const[activeSpec,setActiveSpec]=useState("All");const[bookingDocId,setBookingDocId]=useState(null);const[bookForm,setBookForm]=useState({date:"",timeSlot:"",description:""});const[bookLoading,setBookLoading]=useState(false);const[bookSuccess,setBookSuccess]=useState(false);
  const specializations=["All",...Array.from(new Set(doctors.map(d=>d.specialization).filter(Boolean))).sort()];
  const filteredDoctors=doctors.filter(doc=>{const bySpec=activeSpec==="All"||doc.specialization===activeSpec;const q=searchQuery.toLowerCase();const bySearch=!q||doc.name?.toLowerCase().includes(q)||doc.specialization?.toLowerCase().includes(q)||doc.hospital?.toLowerCase().includes(q);return bySpec&&bySearch;});
  const selectedDoc=doctors.find(d=>d.id===bookingDocId);
  const handleBook=async()=>{
    if(!bookForm.date||!bookForm.timeSlot){alert("Please select date and time slot.");return;}
    setBookLoading(true);
    try{
      const params=new URLSearchParams({patientId:patient.id,doctorId:bookingDocId,date:bookForm.date,timeSlot:bookForm.timeSlot,description:bookForm.description});
      await axios.post(`${BASE}/appointments/book?${params}`);
      setBookSuccess(true);setBookForm({date:"",timeSlot:"",description:""});setBookingDocId(null);
      setTimeout(()=>setBookSuccess(false),4000);
    }catch(e){alert(e?.response?.data||"Booking failed. Please try again.");}
    finally{setBookLoading(false);}
  };
  if(bookingDocId&&selectedDoc){
    const fieldSx={"& .MuiOutlinedInput-root":{borderRadius:"12px !important",background:"#f8f9ff !important"}};
    return (<motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.3}}>
      <Box sx={{mb:3}}><Button size="small" onClick={()=>setBookingDocId(null)} sx={{color:"#4f6ef7",textTransform:"none",fontWeight:600,fontSize:".82rem",p:0}}>← Back to Doctors</Button></Box>
      <Card className="light-card" sx={{p:4,maxWidth:560}}>
        <Box sx={{display:"flex",alignItems:"center",gap:2,mb:3}}><Avatar className="av-blue" sx={{width:56,height:56,borderRadius:"16px",fontSize:"1.4rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700}}>{selectedDoc.name?.charAt(0)}</Avatar><Box><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"#1a1f36"}}>Dr. {selectedDoc.name}</Typography><Typography sx={{fontSize:".8rem",color:"#8892b0"}}>{selectedDoc.specialization} · {selectedDoc.hospital}</Typography>{selectedDoc.consultationFee>0&&<Chip label={`₹${selectedDoc.consultationFee} consultation fee`} size="small" sx={{mt:.5,background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".72rem"}}/>}</Box></Box>
        <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
        {bookSuccess&&<Box sx={{background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",borderRadius:"12px",p:2,mb:3,display:"flex",alignItems:"center",gap:1.5}}><CheckCircleIcon sx={{color:"#059669",fontSize:22}}/><Box><Typography sx={{fontWeight:700,color:"#059669",fontSize:".9rem"}}>Appointment Booked!</Typography><Typography sx={{fontSize:".78rem",color:"#065f46"}}>Your request has been sent to the doctor. Once approved, a Pay button will appear under "My Appointments".</Typography></Box></Box>}
        <Box sx={{background:"#eef1fe",border:"1px solid rgba(79,110,247,.2)",borderRadius:"12px",p:"12px 16px",mb:3,display:"flex",alignItems:"flex-start",gap:1.5}}>
          <Typography sx={{fontSize:".95rem",mt:.1}}>ℹ️</Typography>
          <Typography sx={{fontSize:".78rem",color:"#4a5278",lineHeight:1.6}}>After the doctor approves your appointment, you will need to pay the consultation fee before the doctor can write your prescription.</Typography>
        </Box>
        <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
          <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Preferred Date *</Typography><TextField fullWidth size="small" type="date" variant="outlined" value={bookForm.date} onChange={e=>setBookForm({...bookForm,date:e.target.value})} sx={fieldSx} inputProps={{min:new Date().toISOString().split("T")[0]}}/></Box>
          <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Time Slot *</Typography><Select fullWidth size="small" value={bookForm.timeSlot} onChange={e=>setBookForm({...bookForm,timeSlot:e.target.value})} sx={{"& .MuiOutlinedInput-notchedOutline":{borderColor:"#e8ecf5 !important"},"& .MuiSelect-select":{borderRadius:"12px",background:"#f8f9ff"}}}><MenuItem value="">Select time</MenuItem>{["09:00 AM","10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"].map(t=><MenuItem key={t} value={t}>{t}</MenuItem>)}</Select></Box>
          <Box><Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600,mb:.75}}>Symptoms / Description</Typography><TextField fullWidth size="small" multiline rows={3} variant="outlined" placeholder="Describe your symptoms or reason for visit…" value={bookForm.description} onChange={e=>setBookForm({...bookForm,description:e.target.value})} sx={fieldSx}/></Box>
          <Button onClick={handleBook} variant="contained" disabled={bookLoading} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700,fontSize:".92rem",py:1.4,boxShadow:"0 4px 14px rgba(79,110,247,.28)"}}>{bookLoading?"Booking…":"Confirm Appointment →"}</Button>
        </Box>
      </Card>
    </motion.div>);
  }
  return (<>
    <TextField fullWidth size="small" placeholder="Search doctor, specialization, hospital…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} InputProps={{startAdornment:<InputAdornment position="start"><SearchIcon sx={{color:"#b0b8d0",fontSize:20}}/></InputAdornment>}} sx={{mb:2.5,"& .MuiOutlinedInput-root":{borderRadius:"14px",background:"#fff","& fieldset":{borderColor:"#e8ecf5"},"&:hover fieldset":{borderColor:"#c7cee8"},"&.Mui-focused fieldset":{borderColor:"#4f6ef7"}}}}/>
    <Box sx={{mb:3}}><Box sx={{display:"flex",alignItems:"center",gap:1,mb:1.5}}><FilterListIcon sx={{fontSize:16,color:"#8892b0"}}/><Typography sx={{fontSize:".72rem",textTransform:"uppercase",letterSpacing:"1px",color:"#8892b0",fontWeight:600}}>Filter by Specialization</Typography></Box><div className="spec-chip-wrap">{specializations.map(spec=><div key={spec} className={`spec-chip ${activeSpec===spec?"active":""}`} onClick={()=>setActiveSpec(spec)}>{spec}</div>)}</div></Box>
    <Box sx={{mb:2.5,display:"flex",alignItems:"center",justifyContent:"space-between"}}><Typography sx={{fontSize:".8rem",color:"#8892b0"}}>{filteredDoctors.length} doctor{filteredDoctors.length!==1?"s":""} found</Typography>{(searchQuery||activeSpec!=="All")&&<Typography sx={{fontSize:".78rem",color:"#4f6ef7",fontWeight:600,cursor:"pointer"}} onClick={()=>{setSearchQuery("");setActiveSpec("All");}}>Clear ✕</Typography>}</Box>
    {filteredDoctors.length===0?(<Box sx={{textAlign:"center",py:8,color:"#8892b0"}}><Typography sx={{fontSize:"2.5rem",mb:1}}>🔍</Typography><Typography sx={{fontWeight:500}}>No doctors found.</Typography></Box>):(
      <Grid container spacing={2.5}>{filteredDoctors.map((doc,i)=>(<Grid item xs={12} sm={6} md={4} key={doc.id}><motion.div whileHover={{scale:1.03}}><Card className="light-card" sx={{p:3}}><Box sx={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}><Avatar className={getAvatarClass(i)} sx={{width:68,height:68,borderRadius:"20px",mb:1.5,fontSize:"1.8rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.22)"}}>{doc.name?.charAt(0)}</Avatar><Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {doc.name}</Typography><Chip label={doc.specialization||"General"} size="small" sx={{mt:.75,mb:.5,background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:600,fontSize:".72rem"}}/>{doc.qualification&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>{doc.qualification}</Typography>}{doc.experience>0&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.3}}>🏅 {doc.experience} yrs</Typography>}{doc.hospital&&<Typography sx={{fontSize:".76rem",color:"#8892b0",mb:.5}}>🏥 {doc.hospital}</Typography>}{doc.consultationFee>0&&<Box sx={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75,mb:2,display:"flex",alignItems:"center",gap:.75}}><CurrencyRupeeIcon sx={{fontSize:14,color:"#d97706"}}/><Typography sx={{fontSize:".8rem",fontWeight:700,color:"#d97706"}}>₹{doc.consultationFee}</Typography></Box>}<Button variant="contained" onClick={()=>setBookingDocId(doc.id)} sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600,fontSize:".85rem",boxShadow:"0 3px 12px rgba(79,110,247,.28)"}}>Book Now →</Button></Box></Card></motion.div></Grid>))}</Grid>
    )}
  </>);
}

// ── MAIN PatientDashboard ─────────────────────────────────────────────────────
export default function PatientDashboard() {
  const {user}  = useContext(AuthContext);
  const userId  = user?.id || localStorage.getItem("userId");
  const navigate = useNavigate();

  const [patient,          setPatient]          = useState(null);
  const [appointments,     setAppointments]     = useState([]);
  const [doctors,          setDoctors]          = useState([]);
  const [medicalRecords,   setMedicalRecords]   = useState([]);
  const [prescriptions,    setPrescriptions]    = useState([]);
  const [payments,         setPayments]         = useState({});   // appointmentId → {status,paymentId}
  const [feedbackDone,     setFeedbackDone]     = useState({});
  const [accessRequests,   setAccessRequests]   = useState([]);
  const [view,             setView]             = useState("dashboard");
  const [sidebarOpen,      setSidebarOpen]      = useState(false);
  const [loading,          setLoading]          = useState(true);
  const [profileMissing,   setProfileMissing]   = useState(false);
  const [error,            setError]            = useState("");
  const [uploadOpen,       setUploadOpen]       = useState(false);
  const [recordTypeFilter, setRecordTypeFilter] = useState("ALL");
  const [payAppt,          setPayAppt]          = useState(null);
  const [fbAppt,           setFbAppt]           = useState(null);

  // ── Initial load ────────────────────────────────────────────────────────────
  useEffect(()=>{
    const load = async () => {
      try {
        const patRes = await axios.get(`${BASE}/patient/user/${userId}`);
        setPatient(patRes.data);
      } catch(err) {
        if (err.response?.status === 404) { setProfileMissing(true); setLoading(false); return; }
        setError("Failed to load patient."); setLoading(false); return;
      }
      try { const dRes = await axios.get(`${BASE}/doctor`); setDoctors(dRes.data); } catch {}
      setLoading(false);
    };
    if (userId) load(); else { setError("User ID missing."); setLoading(false); }
  }, [userId]);

  // ── Load patient data when patient is available ─────────────────────────────
  useEffect(() => {
    if (!patient) return;

    // Appointments
    axios.get(`${BASE}/appointments/patient/${patient.id}`)
      .then(r => setAppointments(r.data)).catch(() => {});

    // Medical records
    axios.get(`${BASE}/medical-records/patient/${patient.id}`)
      .then(r => setMedicalRecords(r.data)).catch(() => {});

    // Prescriptions — only ones with an actual diagnosis
    axios.get(`${BASE}/prescriptions/patient/${patient.id}`)
      .then(r => {
        const valid = (r.data || []).filter(rx => rx.diagnosis && rx.diagnosis.trim() !== "");
        setPrescriptions(valid);
      }).catch(() => {});

    // Payments — build the map
    loadPaymentsMap(patient.id).then(map => setPayments(map));

    // Access requests
    axios.get(`${BASE}/patient/${patient.id}/accessList`)
      .then(r => setAccessRequests(r.data)).catch(() => {});
  }, [patient]);

  const handleLogout   = () => { localStorage.removeItem("user"); navigate("/"); };
  const handleNavClick = (k) => { setView(k); setSidebarOpen(false); };

  const filteredRecords = recordTypeFilter === "ALL"
    ? medicalRecords
    : medicalRecords.filter(r => r.recordType === recordTypeFilter);

  const handleDeleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await axios.delete(`${BASE}/medical-records/${id}`);
      setMedicalRecords(prev => prev.filter(r => r.id !== id));
    } catch { alert("Failed to delete record"); }
  };

  // ── Payment done: update local state + re-fetch from server to be sure ──────
  const handlePaymentDone = useCallback(async (appointmentId) => {
    // Optimistic update immediately so UI reflects paid status
    setPayments(prev => ({ ...prev, [appointmentId]: { status: "SUCCESS" } }));
    // Re-fetch to get the server-confirmed state
    if (patient) {
      const freshMap = await loadPaymentsMap(patient.id);
      setPayments(freshMap);
      // Also re-fetch appointments so any status changes are reflected
      axios.get(`${BASE}/appointments/patient/${patient.id}`)
        .then(r => setAppointments(r.data)).catch(() => {});
    }
  }, [patient]);

  const handleFeedbackDone = (id) => setFeedbackDone(prev => ({ ...prev, [id]: true }));

  // ── isPaid: check the payments map ─────────────────────────────────────────
  const isApptPaid = (apptId) => payments[apptId]?.status === "SUCCESS";

  const unpaidCount        = appointments.filter(a => a.status === "APPROVED" && !isApptPaid(a.id)).length;
  const pendingDocReqs     = appointments.filter(a => a.docRequestStatus === "DOC_REQUEST_PENDING").length;
  const pendingAccessCount = accessRequests.filter(r => r.status === "PENDING").length;

  const today = new Date(); today.setHours(0,0,0,0);
  const upcomingAppts = appointments
    .filter(a => {
      if (a.status === "REJECTED") return false;
      if (!a.date) return false;
      return new Date(a.date) >= today;
    })
    .sort((a,b) => new Date(a.date) - new Date(b.date));

  const menuItems = [
    {key:"dashboard",      label:"Dashboard",        icon:<DashboardIcon     sx={{fontSize:18}}/>},
    {key:"appointments",   label:"My Appointments",  icon:<EventIcon         sx={{fontSize:18}}/>, badge:unpaidCount},
    {key:"book",           label:"Book Appointment", icon:<AddIcon           sx={{fontSize:18}}/>},
    {key:"records",        label:"Medical Records",  icon:<FolderIcon        sx={{fontSize:18}}/>},
    {key:"prescriptions",  label:"Prescriptions",    icon:<LocalPharmacyIcon sx={{fontSize:18}}/>},
    {key:"docrequests",    label:"Doc Requests",     icon:<UploadFileIcon    sx={{fontSize:18}}/>, badge:pendingDocReqs},
    {key:"accessrequests", label:"Record Requests",  icon:<LockOpenIcon      sx={{fontSize:18}}/>, badge:pendingAccessCount},
    {key:"healthstatus",   label:"Health Status",    icon:<MonitorHeartIcon  sx={{fontSize:18}}/>},
    {key:"health",         label:"Health Stats",     icon:<BarChartIcon      sx={{fontSize:18}}/>},
    {key:"profile",        label:"Profile",          icon:<PersonIcon        sx={{fontSize:18}}/>},
  ];

  if (loading) return (<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><CircularProgress sx={{color:"#4f6ef7"}}/></Box>);
  if (error)   return (<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#f5f7ff"}}><Alert severity="error">{error}</Alert></Box>);
  if (profileMissing || !patient) return (
    <PatientProfileForm userId={userId} onCreated={created => {
      setPatient(created);
      setProfileMissing(false);
      axios.get(`${BASE}/doctor`).then(r => setDoctors(r.data)).catch(() => {});
    }}/>
  );

  return (
    <Box sx={{minHeight:"100vh",background:"#f5f7ff",fontFamily:"'Outfit',sans-serif"}}>
      <div className="blob blob-1"/><div className="blob blob-2"/>
      {sidebarOpen && <div className="sidebar-overlay" onClick={()=>setSidebarOpen(false)}/>}

      {/* Sidebar */}
      <div className={`portal-sidebar ${sidebarOpen?"open":"closed"}`}>
        <div className="sidebar-top-row">
          <div className="sidebar-logo"><div className="logo-icon">✦</div>Med<span className="logo-accent">Vault</span></div>
          <div className="sidebar-close-btn" onClick={()=>setSidebarOpen(false)}><CloseIcon sx={{fontSize:16}}/></div>
        </div>
        <div className="nav-section-label">Navigation</div>
        {menuItems.map(item=>(
          <NavItem key={item.key} icon={item.icon} label={item.label} active={view===item.key}
            onClick={()=>handleNavClick(item.key)} badge={item.badge||0}/>
        ))}
        <div className="sidebar-spacer"/>
        <div className="user-card">
          <div className="user-mini-av">{patient.name?.charAt(0)}</div>
          <Box><Typography sx={{fontSize:".85rem",fontWeight:600,color:"#1a1f36",lineHeight:1.2}}>{patient.name}</Typography><Typography sx={{fontSize:".72rem",color:"#8892b0"}}>Patient</Typography></Box>
        </div>
        <button onClick={handleLogout}
          style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:11,cursor:"pointer",fontSize:".875rem",fontWeight:500,color:"#e11d48",border:"1px solid transparent",background:"none",width:"100%",fontFamily:"'Outfit',sans-serif",transition:"all .18s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="#fff1f3";e.currentTarget.style.borderColor="rgba(225,29,72,.15)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor="transparent";}}>
          <div className="nav-icon-wrap" style={{background:"#fff1f3",color:"#e11d48"}}><LogoutIcon sx={{fontSize:16}}/></div>Sign Out
        </button>
      </div>

      {/* Topbar */}
      <div className="portal-topbar">
        <div className="topbar-left">
          <div className="hamburger-btn" onClick={()=>setSidebarOpen(true)}><MenuIcon sx={{fontSize:20}}/></div>
          <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:"1.3rem",color:"#4f6ef7"}}>Med<span style={{color:"#7c3aed"}}>Vault</span></Typography>
        </div>
        <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
          {unpaidCount > 0 && (
            <Box onClick={()=>handleNavClick("appointments")}
              sx={{display:"flex",alignItems:"center",gap:.75,cursor:"pointer",background:"#fff7ed",border:"1px solid #fcd34d",borderRadius:"10px",px:1.5,py:.75}}>
              <NotificationsIcon sx={{fontSize:16,color:"#d97706"}}/>
              <Typography sx={{fontSize:".75rem",fontWeight:600,color:"#d97706"}}>{unpaidCount} fee pending</Typography>
            </Box>
          )}
          {pendingDocReqs > 0 && (
            <Box onClick={()=>handleNavClick("docrequests")}
              sx={{display:"flex",alignItems:"center",gap:.75,cursor:"pointer",background:"#eef1fe",border:"1px solid #c7d7f9",borderRadius:"10px",px:1.5,py:.75}}>
              <UploadFileIcon sx={{fontSize:16,color:"#4f6ef7"}}/>
              <Typography sx={{fontSize:".75rem",fontWeight:600,color:"#4f6ef7"}}>{pendingDocReqs} doc request{pendingDocReqs>1?"s":""}</Typography>
            </Box>
          )}
          <Button startIcon={<LogoutIcon/>} onClick={handleLogout} size="small"
            sx={{color:"#e11d48",borderColor:"rgba(225,29,72,.3)",textTransform:"none",borderRadius:2,border:"1px solid",fontFamily:"'Outfit',sans-serif"}}>
            Logout
          </Button>
        </Box>
      </div>

      {/* Content */}
      <Box sx={{p:{xs:2,md:"36px 44px"},position:"relative",zIndex:1}}>
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.3}}>

            {/* ── DASHBOARD ─────────────────────────────────────────────── */}
            {view==="dashboard"&&(<>
              <Box sx={{mb:4}}>
                <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Good morning, {patient.name?.split(" ")[0]} ☀️</Typography>
                <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Here's your health portal overview</Typography>
              </Box>

              {/* Payment banners — approved + not paid */}
              {appointments.filter(a=>a.status==="APPROVED"&&!isApptPaid(a.id)).map(appt=>(
                <Box key={appt.id} className="pay-banner" sx={{mb:2}}>
                  <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
                    <Box sx={{width:38,height:38,borderRadius:"11px",background:"linear-gradient(135deg,#f59e0b,#fbbf24)",display:"flex",alignItems:"center",justifyContent:"center"}}><NotificationsIcon sx={{color:"#fff",fontSize:20}}/></Box>
                    <Box>
                      <Typography sx={{fontWeight:600,fontSize:".88rem",color:"#92400e"}}>Appointment Confirmed — Consultation Fee Pending</Typography>
                      <Typography sx={{fontSize:".78rem",color:"#a16207"}}>Dr. {appt.doctor?.name} · {appt.date} · ₹{appt.doctor?.consultationFee}</Typography>
                    </Box>
                  </Box>
                  <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small"
                    startIcon={<PaymentIcon sx={{fontSize:16}}/>}
                    sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,whiteSpace:"nowrap"}}>
                    Pay ₹{appt.doctor?.consultationFee}
                  </Button>
                </Box>
              ))}

              {/* Doc request banner */}
              {pendingDocReqs>0&&(
                <Box onClick={()=>handleNavClick("docrequests")}
                  sx={{cursor:"pointer",mb:2,p:"16px 20px",borderRadius:"16px",background:"linear-gradient(135deg,#eef1fe,#f0f4ff)",border:"1.5px solid rgba(79,110,247,.25)",display:"flex",alignItems:"center",gap:1.5,"&:hover":{boxShadow:"0 4px 16px rgba(79,110,247,.12)"}}}>
                  <Box sx={{width:38,height:38,borderRadius:"11px",background:"linear-gradient(135deg,#4f6ef7,#818cf8)",display:"flex",alignItems:"center",justifyContent:"center"}}><UploadFileIcon sx={{color:"#fff",fontSize:20}}/></Box>
                  <Box sx={{flex:1}}>
                    <Typography sx={{fontWeight:600,fontSize:".88rem",color:"#1a1f36"}}>Doctor requesting health documents</Typography>
                    <Typography sx={{fontSize:".78rem",color:"#4a5278"}}>You have {pendingDocReqs} pending document request{pendingDocReqs>1?"s":""}. Click to upload.</Typography>
                  </Box>
                  <Typography sx={{fontSize:".78rem",color:"#4f6ef7",fontWeight:700}}>Upload →</Typography>
                </Box>
              )}

              <Box className="hero-card" sx={{mb:4,display:"flex",alignItems:"center",gap:3}}>
                <Avatar className="av-blue" sx={{width:80,height:80,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",boxShadow:"0 8px 24px rgba(79,110,247,.3)"}}>{patient.name?.charAt(0)}</Avatar>
                <Box>
                  <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography>
                  <Typography sx={{color:"#8892b0",fontSize:".82rem",mt:.5}}>Patient ID · #{patient.id}</Typography>
                  <Box sx={{display:"flex",gap:1,mt:1.5,flexWrap:"wrap"}}>
                    {[patient.gender,`Age ${patient.age}`,patient.email,patient.contact].filter(Boolean).map((v,i)=>(
                      <Chip key={i} label={v} size="small" sx={{background:"#eef1fe",color:"#4f6ef7",border:"1px solid rgba(79,110,247,.18)",fontWeight:500,fontSize:".75rem"}}/>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={2.5} sx={{mb:4}}>
                <Grid item xs={6} sm={3}><StatCard label="Appointments" value={appointments.length} icon="📅" color="#4f6ef7"/></Grid>
                <Grid item xs={6} sm={3}><StatCard label="Upcoming"     value={upcomingAppts.length} icon="📆" color="#059669"/></Grid>
                <Grid item xs={6} sm={3}><StatCard label="Prescriptions" value={prescriptions.length} icon="💊" color="#7c3aed"/></Grid>
                <Grid item xs={6} sm={3}><StatCard label="Medical Records" value={medicalRecords.length} icon="📋" color="#0891b2"/></Grid>
              </Grid>

              <div className="sec-heading">Upcoming Appointments</div>
              {upcomingAppts.length===0?(
                <Box sx={{textAlign:"center",py:5,color:"#8892b0",mb:3}}>
                  <Typography sx={{fontSize:"2rem",mb:1}}>📅</Typography>
                  <Typography sx={{fontWeight:500,mb:1.5}}>No upcoming appointments.</Typography>
                  <Button onClick={()=>setView("book")} size="small" variant="contained"
                    sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>Book Now →</Button>
                </Box>
              ):(
                <Grid container spacing={2.5} sx={{mb:4}}>
                  {upcomingAppts.slice(0,6).map((appt,i)=>(
                    <Grid item xs={12} md={4} key={appt.id}>
                      <motion.div whileHover={{scale:1.03}}>
                        <Card className="light-card"><CardContent sx={{p:"20px !important"}}>
                          <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
                            <Avatar className={getAvatarClass(i)} sx={{width:44,height:44,borderRadius:"12px",fontSize:"1rem",fontWeight:700}}>{appt.doctor?.name?.charAt(0)}</Avatar>
                            <Box sx={{flex:1}}>
                              <Typography sx={{fontWeight:600,fontSize:".92rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography>
                              <Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography>
                            </Box>
                          </Box>
                          <Box sx={{display:"flex",alignItems:"center",gap:1,mb:.75}}>
                            <CalendarTodayIcon sx={{fontSize:14,color:"#4f6ef7"}}/>
                            <Typography sx={{fontSize:".82rem",color:"#4a5278",fontWeight:600}}>{appt.date}</Typography>
                            <Typography sx={{fontSize:".76rem",color:"#8892b0"}}>· {appt.timeSlot}</Typography>
                          </Box>
                          <Box sx={{display:"flex",alignItems:"center",gap:.75,flexWrap:"wrap"}}>
                            <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".72rem"}}/>
                            {appt.status==="APPROVED"&&!isApptPaid(appt.id)&&(
                              <Chip label={`₹${appt.doctor?.consultationFee} due`} size="small"
                                onClick={()=>setPayAppt(appt)}
                                sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".68rem",cursor:"pointer"}}/>
                            )}
                            {appt.status==="APPROVED"&&isApptPaid(appt.id)&&(
                              <Chip label="✓ Paid" size="small"
                                sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".68rem"}}/>
                            )}
                            {appt.docRequestStatus==="DOC_REQUEST_PENDING"&&(
                              <Chip label="📋 Docs Needed" size="small"
                                onClick={()=>handleNavClick("docrequests")}
                                sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".68rem",cursor:"pointer"}}/>
                            )}
                          </Box>
                        </CardContent></Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              )}
              {upcomingAppts.length>6&&(
                <Box sx={{textAlign:"center",mt:1,mb:2}}>
                  <Button onClick={()=>handleNavClick("appointments")} size="small"
                    sx={{color:"#4f6ef7",textTransform:"none",fontWeight:600,fontSize:".82rem"}}>
                    View all {upcomingAppts.length} upcoming →
                  </Button>
                </Box>
              )}
            </>)}

            {/* ── MY APPOINTMENTS ───────────────────────────────────────── */}
            {view==="appointments"&&(<>
              <Box sx={{mb:4}}>
                <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>My Appointments</Typography>
                <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{appointments.length} total · {upcomingAppts.length} upcoming</Typography>
              </Box>

              {appointments.filter(a=>a.status==="APPROVED"&&!isApptPaid(a.id)).map(appt=>(
                <Box key={appt.id} className="pay-banner">
                  <Box sx={{display:"flex",alignItems:"center",gap:1.5}}>
                    <CurrencyRupeeIcon sx={{color:"#d97706",fontSize:20,flexShrink:0}}/>
                    <Box>
                      <Typography sx={{fontWeight:600,fontSize:".85rem",color:"#92400e"}}>Fee pending for Dr. {appt.doctor?.name}</Typography>
                      <Typography sx={{fontSize:".76rem",color:"#a16207"}}>{appt.date} · ₹{appt.doctor?.consultationFee}</Typography>
                    </Box>
                  </Box>
                  <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small"
                    sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"10px",textTransform:"none",fontWeight:700,whiteSpace:"nowrap"}}>
                    Pay Now
                  </Button>
                </Box>
              ))}

              {upcomingAppts.length>0&&(
                <>
                  <div className="sec-heading" style={{marginBottom:14}}>Upcoming</div>
                  <Grid container spacing={2.5} sx={{mb:3}}>
                    {upcomingAppts.map((appt,i)=>(
                      <Grid item xs={12} md={4} key={`up-${appt.id}`}>
                        <Card className="light-card" sx={{borderLeft:"3px solid #4f6ef7"}}>
                          <CardContent sx={{p:"16px !important"}}>
                            <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1}}>
                              <Avatar className={getAvatarClass(i)} sx={{width:38,height:38,borderRadius:"11px",fontSize:".9rem",fontWeight:700}}>{appt.doctor?.name?.charAt(0)}</Avatar>
                              <Box sx={{flex:1}}>
                                <Typography sx={{fontWeight:600,fontSize:".88rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography>
                                <Typography sx={{fontSize:".72rem",color:"#8892b0"}}>{appt.date} · {appt.timeSlot}</Typography>
                              </Box>
                              <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".65rem"}}/>
                            </Box>
                            <Box sx={{display:"flex",gap:.75,flexWrap:"wrap"}}>
                              {appt.status==="APPROVED"&&!isApptPaid(appt.id)&&(
                                <Chip label={`₹${appt.doctor?.consultationFee} due`} size="small"
                                  onClick={()=>setPayAppt(appt)}
                                  sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".65rem",cursor:"pointer"}}/>
                              )}
                              {appt.status==="APPROVED"&&isApptPaid(appt.id)&&(
                                <Chip label="✓ Paid" size="small"
                                  sx={{background:"#ecfdf5",color:"#059669",fontWeight:600,fontSize:".65rem"}}/>
                              )}
                              {appt.docRequestStatus==="DOC_REQUEST_PENDING"&&(
                                <Chip label="📋 Docs" size="small"
                                  onClick={()=>handleNavClick("docrequests")}
                                  sx={{background:"#fff7ed",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".65rem",cursor:"pointer"}}/>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <div className="sec-heading" style={{marginBottom:14}}>All Appointments</div>
                </>
              )}

              {appointments.length===0?(
                <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
                  <Typography sx={{fontSize:"2.5rem",mb:1}}>📅</Typography>
                  <Typography sx={{fontWeight:500}}>No appointments yet.</Typography>
                  <Button onClick={()=>setView("book")} size="small" variant="contained"
                    sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>
                    Book an appointment →
                  </Button>
                </Box>
              ):(
                <Grid container spacing={2.5}>
                  {appointments.map((appt,i)=>{
                    const isPaid = isApptPaid(appt.id);
                    const hasFeedback = feedbackDone[appt.id];
                    return (
                      <Grid item xs={12} md={4} key={appt.id}>
                        <motion.div whileHover={{scale:1.02}}>
                          <Card className="light-card"><CardContent sx={{p:"24px !important"}}>
                            <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
                              <Avatar className={getAvatarClass(i)} sx={{width:48,height:48,borderRadius:"14px",fontSize:"1.1rem",fontWeight:700}}>{appt.doctor?.name?.charAt(0)}</Avatar>
                              <Box sx={{flex:1}}>
                                <Typography sx={{fontWeight:600,fontSize:".95rem",color:"#1a1f36"}}>Dr. {appt.doctor?.name}</Typography>
                                <Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{appt.doctor?.specialization}</Typography>
                              </Box>
                              <Chip label={appt.status||"PENDING"} color={getStatusColor(appt.status)} size="small" sx={{fontWeight:600,fontSize:".7rem"}}/>
                            </Box>
                            <Divider sx={{mb:1.5,borderColor:"#f0f2f8"}}/>
                            <Typography sx={{fontSize:".82rem",color:"#4a5278",mb:.5}}>📅 {appt.date} · 🕐 {appt.timeSlot}</Typography>
                            <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:1.5}} noWrap>📝 {appt.description||"No description"}</Typography>
                            <Box sx={{display:"flex",flexDirection:"column",gap:1}}>
                              {/* Pay button — only for APPROVED + not paid */}
                              {appt.status==="APPROVED"&&!isPaid&&(
                                <Button onClick={()=>setPayAppt(appt)} variant="contained" size="small"
                                  startIcon={<PaymentIcon sx={{fontSize:15}}/>}
                                  sx={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:"9px",textTransform:"none",fontWeight:700,boxShadow:"0 2px 8px rgba(245,158,11,.3)"}}>
                                  Pay Consultation Fee ₹{appt.doctor?.consultationFee}
                                </Button>
                              )}
                              {/* Paid chip */}
                              {appt.status==="APPROVED"&&isPaid&&(
                                <Chip label="✓ Payment Confirmed" size="small"
                                  sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,alignSelf:"flex-start"}}/>
                              )}
                              {/* Doc request status */}
                              {appt.docRequestStatus==="DOC_REQUEST_PENDING"&&(
                                <Chip label="📋 Doctor needs documents" size="small"
                                  onClick={()=>handleNavClick("docrequests")}
                                  sx={{background:"#fffbeb",color:"#d97706",border:"1px solid #fcd34d",fontWeight:600,fontSize:".72rem",cursor:"pointer",alignSelf:"flex-start"}}/>
                              )}
                              {appt.docRequestStatus==="DOC_REQUEST_DONE"&&(
                                <Chip label="✓ Documents Shared" size="small"
                                  sx={{background:"#ecfdf5",color:"#059669",border:"1px solid rgba(5,150,105,.2)",fontWeight:600,fontSize:".72rem",alignSelf:"flex-start"}}/>
                              )}
                              {/* Feedback — only after payment */}
                              {appt.status==="APPROVED"&&isPaid&&!hasFeedback&&(
                                <Button onClick={()=>setFbAppt(appt)} size="small" variant="outlined"
                                  startIcon={<StarIcon sx={{fontSize:14}}/>}
                                  sx={{borderRadius:"9px",textTransform:"none",fontWeight:600,fontSize:".78rem",borderColor:"rgba(245,158,11,.4)",color:"#d97706","&:hover":{background:"#fffbeb"}}}>
                                  Rate this appointment
                                </Button>
                              )}
                              {hasFeedback&&(
                                <Typography sx={{fontSize:".75rem",color:"#059669",fontWeight:600,textAlign:"center"}}>⭐ Feedback submitted!</Typography>
                              )}
                            </Box>
                          </CardContent></Card>
                        </motion.div>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </>)}

            {/* ── BOOK ─────────────────────────────────────────────────── */}
            {view==="book"&&(
              <>
                <Box sx={{mb:3}}>
                  <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Book Appointment</Typography>
                  <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Find a doctor and book directly</Typography>
                </Box>
                <BookAppointmentInline patient={patient} doctors={doctors}/>
              </>
            )}

            {/* ── MEDICAL RECORDS ───────────────────────────────────────── */}
            {view==="records"&&(<>
              <Box sx={{mb:4,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:2}}>
                <Box>
                  <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Medical Records</Typography>
                  <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{medicalRecords.length} record{medicalRecords.length!==1?"s":""} stored</Typography>
                </Box>
                <Button variant="contained" startIcon={<UploadFileIcon/>} onClick={()=>setUploadOpen(true)}
                  sx={{background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"12px",textTransform:"none",fontWeight:700}}>
                  Add Record
                </Button>
              </Box>
              <Box sx={{mb:3}}>
                <div className="spec-chip-wrap">
                  {["ALL",...RECORD_TYPES].map(t=>(
                    <div key={t} className={`spec-chip ${recordTypeFilter===t?"active":""}`} onClick={()=>setRecordTypeFilter(t)}>
                      {t==="ALL"?"All":t.replace("_"," ")}
                    </div>
                  ))}
                </div>
              </Box>
              {filteredRecords.length===0?(
                <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
                  <Typography sx={{fontSize:"2.5rem",mb:1}}>📋</Typography>
                  <Typography sx={{fontWeight:500}}>{medicalRecords.length===0?"No records yet.":"No records match."}</Typography>
                  {medicalRecords.length===0&&(
                    <Button onClick={()=>setUploadOpen(true)} size="small" variant="contained"
                      sx={{mt:2,background:"linear-gradient(135deg,#4f6ef7,#818cf8)",borderRadius:"10px",textTransform:"none",fontWeight:600}}>
                      Upload first record →
                    </Button>
                  )}
                </Box>
              ):filteredRecords.map(record=>(
                <RecordCard key={record.id} record={record} onDelete={handleDeleteRecord}/>
              ))}
            </>)}

            {/* ── PRESCRIPTIONS ─────────────────────────────────────────── */}
            {view==="prescriptions"&&(<>
              <Box sx={{mb:4}}>
                <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Prescriptions</Typography>
                <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>{prescriptions.length} prescription{prescriptions.length!==1?"s":""} from your doctors</Typography>
              </Box>
              {prescriptions.length===0?(
                <Box sx={{textAlign:"center",py:8,color:"#8892b0"}}>
                  <Typography sx={{fontSize:"2.5rem",mb:1}}>💊</Typography>
                  <Typography sx={{fontWeight:500}}>No prescriptions yet.</Typography>
                  <Typography sx={{fontSize:".83rem",mt:.5,maxWidth:400,mx:"auto"}}>Prescriptions appear here after your doctor writes them following an approved and paid appointment.</Typography>
                </Box>
              ):prescriptions.map(rx=>(
                <div key={rx.id} className="rx-card">
                  <Box sx={{display:"flex",alignItems:"flex-start",gap:1.5}}>
                    <Box sx={{width:46,height:46,borderRadius:"13px",flexShrink:0,background:"#ecfdf5",border:"1px solid rgba(5,150,105,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><LocalPharmacyIcon sx={{color:"#059669",fontSize:22}}/></Box>
                    <Box sx={{flex:1}}>
                      <Box sx={{display:"flex",alignItems:"center",gap:1.5,flexWrap:"wrap",mb:.75}}>
                        <Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {rx.appointment?.doctor?.name}</Typography>
                        {rx.issuedDate&&<Chip label={rx.issuedDate} size="small" sx={{background:"#f5f7ff",color:"#8892b0",fontSize:".68rem",height:20}}/>}
                      </Box>
                      <Typography sx={{fontSize:".8rem",color:"#8892b0",mb:.75}}>{rx.appointment?.doctor?.specialization} · {rx.appointment?.date}</Typography>
                      {rx.diagnosis&&(
                        <Box sx={{background:"#f0fdf4",border:"1px solid rgba(5,150,105,.15)",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
                          <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#059669",fontWeight:700,mb:.3}}>Diagnosis</Typography>
                          <Typography sx={{fontSize:".88rem",fontWeight:600,color:"#1a1f36"}}>🩺 {rx.diagnosis}</Typography>
                        </Box>
                      )}
                      {rx.medicines&&(
                        <Box sx={{background:"#f8f9ff",border:"1px solid #e8ecf5",borderRadius:"10px",px:1.5,py:1,mb:1.5}}>
                          <Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#4f6ef7",fontWeight:700,mb:.5}}>💊 Medicines & Dosage</Typography>
                          <Typography sx={{fontSize:".83rem",color:"#1a1f36",whiteSpace:"pre-line",lineHeight:1.7}}>{rx.medicines}</Typography>
                        </Box>
                      )}
                      <Grid container spacing={1.5}>
                        {rx.instructions&&(<Grid item xs={12} sm={6}><Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Instructions</Typography><Typography sx={{fontSize:".82rem",color:"#4a5278"}}>📋 {rx.instructions}</Typography></Grid>)}
                        {rx.tests&&(<Grid item xs={12} sm={6}><Typography sx={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:600,mb:.4}}>Lab Tests</Typography><Typography sx={{fontSize:".82rem",color:"#7c3aed"}}>🔬 {rx.tests}</Typography></Grid>)}
                        {rx.followUpDate&&(<Grid item xs={12}><Typography sx={{fontSize:".82rem",color:"#d97706",fontWeight:600}}>📅 Follow-up: {rx.followUpDate}</Typography></Grid>)}
                      </Grid>
                    </Box>
                  </Box>
                </div>
              ))}
            </>)}

            {/* ── DOC REQUESTS ──────────────────────────────────────────── */}
            {view==="docrequests"&&(
              <DocRequestsView
                appointments={appointments}
                onUploaded={updatedAppt => setAppointments(prev => prev.map(a => a.id===updatedAppt.id ? updatedAppt : a))}
              />
            )}

            {/* ── RECORD ACCESS REQUESTS ────────────────────────────────── */}
            {view==="accessrequests"&&(<>
              <Box sx={{mb:4}}>
                <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Record Access Requests</Typography>
                <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Doctors requesting access to your medical records.</Typography>
              </Box>
              {accessRequests.length===0?(
                <Box sx={{textAlign:"center",py:10,color:"#8892b0"}}>
                  <Typography sx={{fontSize:"3rem",mb:2}}>🔒</Typography>
                  <Typography sx={{fontWeight:600,fontSize:"1rem",color:"#1a1f36"}}>No access requests yet</Typography>
                </Box>
              ):(
                <Grid container spacing={2.5}>
                  {accessRequests.map(req=>{
                    const isPending  = req.status==="PENDING";
                    const isApproved = req.status==="APPROVED";
                    return (
                      <Grid item xs={12} md={6} key={req.id}>
                        <Card sx={{background:isPending?"#fffbeb":isApproved?"#ecfdf5":"#fff1f3",border:`1.5px solid ${isPending?"#fcd34d":isApproved?"#6ee7b7":"#fda4af"}`,borderRadius:"18px",boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}>
                          <CardContent sx={{p:"24px !important"}}>
                            <Box sx={{display:"flex",alignItems:"center",gap:1.5,mb:1.5}}>
                              <Avatar sx={{width:48,height:48,borderRadius:"14px",fontWeight:700,background:"linear-gradient(135deg,#4f6ef7,#818cf8)"}}>{req.doctor?.name?.charAt(0)}</Avatar>
                              <Box sx={{flex:1}}>
                                <Typography sx={{fontWeight:700,fontSize:".95rem",color:"#1a1f36"}}>Dr. {req.doctor?.name}</Typography>
                                <Typography sx={{fontSize:".76rem",color:"#8892b0"}}>{req.doctor?.specialization}</Typography>
                              </Box>
                              <Chip
                                label={isPending?"⏳ Pending":isApproved?"✓ Approved":"✕ Rejected"}
                                size="small"
                                sx={{background:isPending?"#fffbeb":isApproved?"#ecfdf5":"#fff1f3",color:isPending?"#d97706":isApproved?"#059669":"#e11d48",border:`1px solid ${isPending?"#fcd34d":isApproved?"#6ee7b7":"#fda4af"}`,fontWeight:700,fontSize:".72rem"}}
                              />
                            </Box>
                            {req.requestMessage&&(
                              <Box sx={{background:"rgba(255,255,255,.7)",borderRadius:"10px",p:"10px 14px",mb:1.5,border:"1px solid rgba(0,0,0,.06)"}}>
                                <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:".8px",color:"#8892b0",fontWeight:700,mb:.4}}>Doctor's Message</Typography>
                                <Typography sx={{fontSize:".85rem",color:"#1a1f36"}}>"{req.requestMessage}"</Typography>
                              </Box>
                            )}
                            {isPending&&(
                              <Box sx={{display:"flex",gap:1.5}}>
                                <Button fullWidth variant="contained" size="small"
                                  onClick={async()=>{await axios.put(`${BASE}/patient/access/${req.id}/approve`);setAccessRequests(prev=>prev.map(r=>r.id===req.id?{...r,status:"APPROVED"}:r));}}
                                  sx={{background:"linear-gradient(135deg,#059669,#34d399)",borderRadius:"9px",textTransform:"none",fontWeight:700}}>
                                  ✓ Approve Access
                                </Button>
                                <Button fullWidth variant="outlined" size="small"
                                  onClick={async()=>{await axios.put(`${BASE}/patient/access/${req.id}/reject`);setAccessRequests(prev=>prev.map(r=>r.id===req.id?{...r,status:"REJECTED"}:r));}}
                                  sx={{borderRadius:"9px",textTransform:"none",fontWeight:700,borderColor:"#fda4af",color:"#e11d48","&:hover":{background:"#fff1f3"}}}>
                                  ✕ Reject
                                </Button>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </>)}

            {/* ── HEALTH STATUS ─────────────────────────────────────────── */}
            {view==="healthstatus"&&<HealthStatusView patientId={patient.id}/>}

            {/* ── HEALTH STATS ──────────────────────────────────────────── */}
            {view==="health"&&(
              <>
                <Box sx={{mb:4}}>
                  <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Health Stats</Typography>
                  <Typography sx={{color:"#8892b0",fontSize:".875rem",mt:.5}}>Your health data visualized</Typography>
                </Box>
                <HealthStats appointments={appointments} prescriptions={prescriptions} medicalRecords={medicalRecords} payments={payments}/>
              </>
            )}

            {/* ── PROFILE ───────────────────────────────────────────────── */}
            {view==="profile"&&(
              <>
                <Box sx={{mb:4}}><Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#1a1f36"}}>Profile</Typography></Box>
                <Card className="light-card" sx={{p:4}}>
                  <Box sx={{display:"flex",alignItems:"center",gap:2.5,mb:3}}>
                    <Avatar className="av-blue" sx={{width:76,height:76,borderRadius:"22px",fontSize:"2rem",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,boxShadow:"0 6px 20px rgba(79,110,247,.25)"}}>{patient.name?.charAt(0)}</Avatar>
                    <Box>
                      <Typography sx={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"#1a1f36"}}>{patient.name}</Typography>
                      <Typography sx={{fontSize:".82rem",color:"#8892b0",mt:.5}}>Patient Account · Active</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{mb:3,borderColor:"#e8ecf5"}}/>
                  <Grid container spacing={3}>
                    {[["Full Name",patient.name],["Email",patient.email],["Gender",patient.gender],["Date of Birth",patient.dob],["Contact",patient.contact],["Age",patient.age?`${patient.age} years`:"—"],["Patient ID",`#${patient.id}`]].map(([label,val])=>(
                      <Grid item xs={12} sm={6} key={label}>
                        <Typography sx={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:"1.1px",color:"#8892b0",fontWeight:600,mb:.6}}>{label}</Typography>
                        <Typography sx={{fontSize:".95rem",fontWeight:500,color:"#1a1f36"}}>{val||"—"}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </Box>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      <UploadRecordModal
        open={uploadOpen} onClose={()=>setUploadOpen(false)}
        patientId={patient.id}
        onUploaded={newRecord=>setMedicalRecords(prev=>[newRecord,...prev])}
      />
      <PaymentModal
        open={Boolean(payAppt)}
        appointment={payAppt}
        onClose={()=>setPayAppt(null)}
        onPaid={handlePaymentDone}
      />
      <FeedbackModal
        open={Boolean(fbAppt)}
        appointment={fbAppt}
        onClose={()=>setFbAppt(null)}
        onSubmitted={handleFeedbackDone}
      />
    </Box>
  );
}
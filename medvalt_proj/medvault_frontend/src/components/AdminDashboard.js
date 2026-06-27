// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 🔹 Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersRes = await axios.get("http://localhost:8080/admin/users");
//         const appointmentsRes = await axios.get(
//           "http://localhost:8080/admin/appointments"
//         );

//         setUsers(usersRes.data);
//         setAppointments(appointmentsRes.data);
//       } catch (err) {
//         setError("Failed to load admin data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔹 Delete user
//   const deleteUser = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/admin/users/${id}`);
//       setUsers(users.filter((u) => u.id !== id));
//     } catch {
//       alert("Failed to delete user");
//     }
//   };

//   if (loading)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );

//   if (error)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top, #021024, #020617 60%)",
//         color: "white",
//         p: 4,
//       }}
//     >
//       {/* 🔹 Title */}
//       <Typography variant="h3" align="center" sx={{ mb: 5 }}>
//         Admin Dashboard
//       </Typography>

//       {/* 🔹 Users Section */}
//       <Typography variant="h5" sx={{ mb: 2, color: "#00e5ff" }}>
//         Users
//       </Typography>

//       <Paper sx={{ mb: 5, background: "rgba(255,255,255,0.05)" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#00e5ff" }}>ID</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Username</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Role</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell sx={{ color: "white" }}>{user.id}</TableCell>
//                 <TableCell sx={{ color: "white" }}>{user.username}</TableCell>
//                 <TableCell sx={{ color: "white" }}>{user.role}</TableCell>
//                 <TableCell>
//                   {user.role !== "ADMIN" && (
//                     <Button
//                       color="error"
//                       variant="contained"
//                       onClick={() => deleteUser(user.id)}
//                     >
//                       Delete
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* 🔹 Appointments Section */}
//       <Typography variant="h5" sx={{ mb: 2, color: "#00e5ff" }}>
//         Appointments
//       </Typography>

//       <Paper sx={{ background: "rgba(255,255,255,0.05)" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#00e5ff" }}>ID</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Patient</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Doctor</TableCell>
//               <TableCell sx={{ color: "#00e5ff" }}>Date</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {appointments.map((appt) => (
//               <TableRow key={appt.id}>
//                 <TableCell sx={{ color: "white" }}>{appt.id}</TableCell>
//                 <TableCell sx={{ color: "white" }}>
//                   {appt.patientName}
//                 </TableCell>
//                 <TableCell sx={{ color: "white" }}>
//                   {appt.doctorName}
//                 </TableCell>
//                 <TableCell sx={{ color: "white" }}>{appt.date}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }




// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
// } from "@mui/material";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 🔹 Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersRes = await axios.get("http://localhost:8080/admin/users");
//         const appointmentsRes = await axios.get(
//           "http://localhost:8080/admin/appointments"
//         );

//         setUsers(usersRes.data);
//         setAppointments(appointmentsRes.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load admin data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔹 Delete user
//   const deleteUser = async (id) => {
//     if (!window.confirm("Delete this user?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/admin/users/${id}`);
//       setUsers((prev) => prev.filter((u) => u.id !== id));
//     } catch (err) {
//       alert("Failed to delete user");
//     }
//   };

//   if (loading)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//       </Box>
//     );

//   if (error)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#0f172a,#020617)",
//         color: "white",
//         p: 4,
//       }}
//     >
//       {/* 🔹 Title */}
//       <Typography variant="h3" align="center" sx={{ mb: 5 }}>
//         Admin Dashboard
//       </Typography>

//       {/* 🔹 USERS TABLE */}
//       <Typography variant="h5" sx={{ mb: 2, color: "#38bdf8" }}>
//         Users
//       </Typography>

//       <Paper sx={{ mb: 5, background: "#020617" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#38bdf8" }}>ID</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Username</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Role</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell sx={{ color: "white" }}>{user.id}</TableCell>
//                 <TableCell sx={{ color: "white" }}>{user.username}</TableCell>
//                 <TableCell sx={{ color: "white" }}>{user.role}</TableCell>
//                 <TableCell>
//                   {user.role !== "ADMIN" && (
//                     <Button
//                       variant="contained"
//                       color="error"
//                       size="small"
//                       onClick={() => deleteUser(user.id)}
//                     >
//                       Delete
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* 🔹 APPOINTMENTS TABLE */}
//       <Typography variant="h5" sx={{ mb: 2, color: "#38bdf8" }}>
//         Appointments
//       </Typography>

//       <Paper sx={{ background: "#020617" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#38bdf8" }}>ID</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Patient</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Doctor</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Date</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Time</TableCell>
//               <TableCell sx={{ color: "#38bdf8" }}>Status</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {appointments.map((appt) => (
//               <TableRow key={appt.id}>
//                 <TableCell sx={{ color: "white" }}>{appt.id}</TableCell>

//                 {/* ✅ FIXED: patient name */}
//                 <TableCell sx={{ color: "white" }}>
//                   {appt.patient?.name || "N/A"}
//                 </TableCell>

//                 {/* ✅ FIXED: doctor name */}
//                 <TableCell sx={{ color: "white" }}>
//                   {appt.doctor?.name || "N/A"}
//                 </TableCell>

//                 <TableCell sx={{ color: "white" }}>
//                   {appt.date || "N/A"}
//                 </TableCell>

//                 <TableCell sx={{ color: "white" }}>
//                   {appt.timeSlot || "N/A"}
//                 </TableCell>

//                 <TableCell sx={{ color: "white" }}>
//                   {appt.status || "N/A"}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Divider,
//   Modal,
//   IconButton,
// } from "@mui/material";
// import MenuIcon         from "@mui/icons-material/Menu";
// import CloseIcon        from "@mui/icons-material/Close";
// import LogoutIcon       from "@mui/icons-material/Logout";
// import DashboardIcon    from "@mui/icons-material/Dashboard";
// import PeopleIcon       from "@mui/icons-material/People";
// import EventIcon        from "@mui/icons-material/Event";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import PersonIcon       from "@mui/icons-material/Person";
// import DeleteIcon       from "@mui/icons-material/Delete";
// import ShieldIcon       from "@mui/icons-material/Shield";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const BASE = "http://localhost:8080";

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
//   body { font-family: 'Outfit', sans-serif !important; }

//   /* overlay */
//   .adm-overlay {
//     position: fixed; inset: 0;
//     background: rgba(26,31,54,.18); backdrop-filter: blur(3px);
//     z-index: 199; animation: admIn .2s ease;
//   }
//   @keyframes admIn { from{opacity:0}to{opacity:1} }

//   /* sidebar */
//   .adm-sidebar {
//     width: 264px; background: #fff;
//     border-right: 1px solid #e8ecf5;
//     display: flex; flex-direction: column;
//     padding: 20px 14px 24px;
//     position: fixed; top: 0; left: 0;
//     height: 100vh; z-index: 200;
//     box-shadow: 4px 0 28px rgba(79,110,247,.10);
//     transition: transform .28s cubic-bezier(.22,1,.36,1);
//   }
//   .adm-sidebar.closed { transform: translateX(-100%); }
//   .adm-sidebar.open   { transform: translateX(0); }

//   .adm-sidebar-top {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 0 6px 20px;
//   }
//   .adm-logo {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.4rem; font-weight: 700; color: #4f6ef7;
//     display: flex; align-items: center; gap: 9px;
//   }
//   .adm-logo-icon {
//     width: 32px; height: 32px; border-radius: 9px;
//     background: linear-gradient(135deg, #e11d48, #f43f5e);
//     display: flex; align-items: center; justify-content: center;
//     color: #fff; font-size: .85rem; flex-shrink: 0;
//   }
//   .adm-logo-accent { color: #e11d48; }

//   .adm-close-btn {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #8892b0; transition: all .15s;
//   }
//   .adm-close-btn:hover { background: #fff1f3; color: #e11d48; border-color: rgba(225,29,72,.2); }

//   .adm-nav-label {
//     font-size: .67rem; text-transform: uppercase; letter-spacing: 1.2px;
//     color: #b0b8d0; font-weight: 600; padding: 0 10px; margin: 4px 0 6px;
//   }
//   .adm-nav-item {
//     display: flex; align-items: center; gap: 11px;
//     padding: 10px 12px; border-radius: 11px; cursor: pointer;
//     font-size: .875rem; font-weight: 500; color: #4a5278;
//     transition: all .18s ease; border: 1px solid transparent;
//     margin-bottom: 3px; user-select: none;
//   }
//   .adm-nav-item:hover { background: #fff1f3; color: #e11d48; }
//   .adm-nav-item.active {
//     background: #fff1f3; color: #e11d48; font-weight: 600;
//     border-color: rgba(225,29,72,.18);
//   }
//   .adm-nav-item.active .adm-nav-icon { background: #e11d48 !important; color: #fff !important; }
//   .adm-nav-icon {
//     width: 30px; height: 30px; border-radius: 8px;
//     background: #f0f2f8; display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0; transition: all .18s; color: #4a5278;
//   }
//   .adm-sidebar-spacer { flex: 1; }

//   .adm-user-card {
//     display: flex; align-items: center; gap: 11px;
//     padding: 12px; border-radius: 14px;
//     background: #fff1f3; border: 1px solid rgba(225,29,72,.12); margin-bottom: 10px;
//   }
//   .adm-user-av {
//     width: 36px; height: 36px; border-radius: 10px;
//     background: linear-gradient(135deg, #e11d48, #f43f5e);
//     display: flex; align-items: center; justify-content: center;
//     color: #fff; font-size: 1rem; flex-shrink: 0;
//   }

//   /* topbar */
//   .adm-topbar {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 13px 24px; background: #fff;
//     border-bottom: 1px solid #e8ecf5;
//     box-shadow: 0 1px 8px rgba(79,110,247,.07);
//     position: sticky; top: 0; z-index: 100;
//   }
//   .adm-topbar-left { display: flex; align-items: center; gap: 14px; }
//   .adm-hamburger {
//     width: 38px; height: 38px; border-radius: 10px;
//     background: #f5f7ff; border: 1px solid #e8ecf5;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; color: #e11d48; transition: all .18s;
//   }
//   .adm-hamburger:hover { background: #fff1f3; border-color: rgba(225,29,72,.2); }

//   /* blobs */
//   .adm-blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
//   .adm-blob-1 { width:500px;height:500px;background:rgba(225,29,72,.05);top:-150px;right:-80px; }
//   .adm-blob-2 { width:380px;height:380px;background:rgba(79,110,247,.05);bottom:-80px;left:60px; }
//   .adm-blob-3 { width:300px;height:300px;background:rgba(217,119,6,.04);top:40%;left:50%;transform:translateX(-50%); }

//   /* hero */
//   .adm-hero {
//     background: linear-gradient(135deg,#fff 55%,#fff1f3 100%) !important;
//     border: 1px solid #fce7f3 !important; border-radius: 20px !important;
//     box-shadow: 0 2px 16px rgba(225,29,72,.08) !important;
//     padding: 36px 40px !important; position: relative; overflow: hidden;
//     display: flex; align-items: center; gap: 28px; margin-bottom: 28px;
//   }
//   .adm-hero::after { content:'⬡'; position:absolute; right:40px; bottom:0; font-size:6rem; color:rgba(225,29,72,.04); line-height:1; pointer-events:none; }

//   /* stat cards */
//   .adm-stat {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-radius: 18px !important; box-shadow: 0 1px 6px rgba(0,0,0,.05) !important;
//     padding: 24px 28px; position: relative; overflow: hidden;
//     transition: box-shadow .2s, transform .2s !important;
//   }
//   .adm-stat:hover { box-shadow: 0 6px 24px rgba(0,0,0,.10) !important; transform: translateY(-2px); }
//   .adm-stat-value { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; line-height:1; }
//   .adm-stat-label { font-size:.72rem; color:#8892b0; text-transform:uppercase; letter-spacing:1px; font-weight:600; margin-bottom:8px; }
//   .adm-stat-icon  { position:absolute; right:20px; top:50%; transform:translateY(-50%); font-size:2.6rem; opacity:.06; }

//   /* section heading */
//   .adm-sec-heading {
//     font-family:'Cormorant Garamond',serif; font-size:1.25rem; font-weight:700; color:#1a1f36;
//     display:flex; align-items:center; gap:12px; margin-bottom:16px;
//   }
//   .adm-sec-heading::after { content:''; flex:1; height:1px; background:#e8ecf5; }

//   /* cards */
//   .adm-card {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-radius: 16px !important;
//     box-shadow: 0 1px 4px rgba(0,0,0,.05) !important;
//     transition: box-shadow .22s, transform .22s !important;
//   }
//   .adm-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.09) !important; transform:translateY(-2px); }

//   /* user row card */
//   .adm-user-row {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-radius: 14px !important;
//     box-shadow: 0 1px 4px rgba(0,0,0,.04) !important;
//     transition: box-shadow .2s, transform .2s, border-color .2s !important;
//     display: flex; align-items: center; gap: 14px;
//     padding: 14px 18px; margin-bottom: 10px;
//   }
//   .adm-user-row:hover { box-shadow: 0 4px 18px rgba(225,29,72,.10) !important; border-color: #fce7f3 !important; transform:translateY(-1px); }

//   /* appointment row */
//   .adm-appt-row {
//     background: #fff !important; border: 1px solid #e8ecf5 !important;
//     border-left: 4px solid #e8ecf5 !important; border-radius: 14px !important;
//     box-shadow: 0 1px 4px rgba(0,0,0,.04) !important;
//     transition: box-shadow .2s, transform .2s !important;
//     padding: 16px 20px; margin-bottom: 10px;
//     display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
//   }
//   .adm-appt-row.approved { border-left-color: #059669 !important; }
//   .adm-appt-row.pending  { border-left-color: #d97706 !important; }
//   .adm-appt-row.rejected { border-left-color: #e11d48 !important; }
//   .adm-appt-row:hover { box-shadow: 0 4px 18px rgba(0,0,0,.08) !important; transform:translateY(-1px); }

//   /* danger zone */
//   .adm-danger-box {
//     background: #fff1f3; border: 1.5px solid rgba(225,29,72,.2);
//     border-radius: 18px; padding: 28px 32px;
//   }

//   /* confirm modal */
//   .adm-modal-box {
//     position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
//     width: 90%; max-width: 420px;
//     background: #fff; border-radius: 20px;
//     border: 1px solid #e8ecf5;
//     box-shadow: 0 20px 60px rgba(225,29,72,.16);
//     padding: 36px; outline: none;
//   }

//   /* role badge */
//   .role-admin   { background:#fff1f3!important; color:#e11d48!important; border-color:rgba(225,29,72,.2)!important; }
//   .role-doctor  { background:#eef1fe!important; color:#4f6ef7!important; border-color:rgba(79,110,247,.2)!important; }
//   .role-patient { background:#ecfdf5!important; color:#059669!important; border-color:rgba(5,150,105,.2)!important; }

//   .av-red    { background: linear-gradient(135deg,#e11d48,#f43f5e) !important; }
//   .av-blue   { background: linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
//   .av-green  { background: linear-gradient(135deg,#059669,#34d399) !important; }
//   .av-amber  { background: linear-gradient(135deg,#d97706,#fbbf24) !important; }
//   .av-violet { background: linear-gradient(135deg,#7c3aed,#a78bfa) !important; }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
//   .fu { animation: fadeUp .38s cubic-bezier(.22,1,.36,1) both; }
// `;

// if (!document.getElementById("adm-styles")) {
//   const s = document.createElement("style");
//   s.id = "adm-styles";
//   s.textContent = css;
//   document.head.appendChild(s);
// }

// // ── Helpers ────────────────────────────────────────────────────────────────────
// const avColors = ["av-blue","av-violet","av-green","av-amber","av-red"];
// const getAv    = (i) => avColors[i % avColors.length];

// const roleClass = (role) => {
//   if (!role) return "";
//   const r = role.toUpperCase();
//   if (r.includes("ADMIN"))   return "role-admin";
//   if (r.includes("DOCTOR"))  return "role-doctor";
//   return "role-patient";
// };

// const statusColor = (s) => {
//   switch ((s || "").toUpperCase()) {
//     case "APPROVED": return { bg:"#ecfdf5", color:"#059669", border:"rgba(5,150,105,.2)" };
//     case "REJECTED": return { bg:"#fff1f3", color:"#e11d48", border:"rgba(225,29,72,.2)" };
//     default:         return { bg:"#fffbeb", color:"#d97706", border:"rgba(217,119,6,.2)" };
//   }
// };

// // ── Sub-components ─────────────────────────────────────────────────────────────
// function NavItem({ icon, label, active, onClick, badge }) {
//   return (
//     <div className={`adm-nav-item ${active ? "active" : ""}`} onClick={onClick}>
//       <div className="adm-nav-icon">{icon}</div>
//       <span style={{ flex:1 }}>{label}</span>
//       {badge > 0 && (
//         <span style={{ background:"#e11d48", color:"#fff", fontSize:".65rem", fontWeight:700,
//                        padding:"1px 6px", borderRadius:"20px", minWidth:18, textAlign:"center" }}>
//           {badge}
//         </span>
//       )}
//     </div>
//   );
// }

// function StatCard({ label, value, icon, color, delay = 0 }) {
//   return (
//     <div className="adm-stat fu" style={{ animationDelay:`${delay}ms` }}>
//       <div className="adm-stat-label">{label}</div>
//       <div className="adm-stat-value" style={{ color }}>{value}</div>
//       <div className="adm-stat-icon">{icon}</div>
//     </div>
//   );
// }

// // ── Confirm Modal ──────────────────────────────────────────────────────────────
// function ConfirmModal({ open, title, message, onConfirm, onCancel, danger = true }) {
//   return (
//     <Modal open={open} onClose={onCancel}>
//       <Box className="adm-modal-box">
//         <Box sx={{ display:"flex", alignItems:"center", gap:2, mb:2 }}>
//           <Box sx={{ width:44, height:44, borderRadius:"12px",
//                      background: danger ? "#fff1f3" : "#eef1fe",
//                      display:"flex", alignItems:"center", justifyContent:"center" }}>
//             {danger
//               ? <WarningAmberIcon sx={{ color:"#e11d48", fontSize:24 }} />
//               : <ShieldIcon       sx={{ color:"#4f6ef7", fontSize:24 }} />
//             }
//           </Box>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#1a1f36" }}>
//             {title}
//           </Typography>
//         </Box>
//         <Typography sx={{ fontSize:".9rem", color:"#4a5278", mb:3, lineHeight:1.6 }}>{message}</Typography>
//         <Box sx={{ display:"flex", gap:1.5 }}>
//           <Button onClick={onCancel} variant="outlined" fullWidth
//             sx={{ borderColor:"#e8ecf5", color:"#4a5278", borderRadius:"10px",
//                   textTransform:"none", fontWeight:600, "&:hover":{ background:"#f5f7ff" } }}>
//             Cancel
//           </Button>
//           <Button onClick={onConfirm} variant="contained" fullWidth
//             sx={{ background: danger ? "linear-gradient(135deg,#e11d48,#f43f5e)" : "linear-gradient(135deg,#4f6ef7,#818cf8)",
//                   borderRadius:"10px", textTransform:"none", fontWeight:600,
//                   boxShadow: danger ? "0 3px 12px rgba(225,29,72,.28)" : "0 3px 12px rgba(79,110,247,.28)" }}>
//             Confirm
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }

// // ── Main Dashboard ─────────────────────────────────────────────────────────────
// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   // ── State ──
//   const [users,        setUsers]        = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [doctors,      setDoctors]      = useState([]);
//   const [patients,     setPatients]     = useState([]);
//   const [loading,      setLoading]      = useState(true);
//   const [error,        setError]        = useState("");
//   const [view,         setView]         = useState("dashboard");
//   const [sidebarOpen,  setSidebarOpen]  = useState(false);

//   // Confirm modal state
//   const [confirm, setConfirm] = useState({ open:false, title:"", message:"", onConfirm:null, danger:true });

//   // ── UNCHANGED fetch (same endpoints as your controller) ──
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [uRes, aRes, dRes, pRes] = await Promise.all([
//           axios.get(`${BASE}/admin/users`),
//           axios.get(`${BASE}/admin/appointments`),
//           axios.get(`${BASE}/admin/doctors`),
//           axios.get(`${BASE}/admin/patients`),
//         ]);
//         setUsers(uRes.data);
//         setAppointments(aRes.data);
//         setDoctors(dRes.data);
//         setPatients(pRes.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load admin data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // ── UNCHANGED: delete user ──
//   const deleteUser = (id) => {
//     setConfirm({
//       open: true,
//       title: "Delete User",
//       message: "This will permanently delete the user and all associated data. This cannot be undone.",
//       danger: true,
//       onConfirm: async () => {
//         try {
//           await axios.delete(`${BASE}/admin/users/${id}`);
//           setUsers((prev) => prev.filter((u) => u.id !== id));
//         } catch { alert("Failed to delete user"); }
//         closeConfirm();
//       },
//     });
//   };

//   // ── UNCHANGED: delete appointment ──
//   const deleteAppointment = (id) => {
//     setConfirm({
//       open: true,
//       title: "Delete Appointment",
//       message: "Are you sure you want to delete this appointment?",
//       danger: true,
//       onConfirm: async () => {
//         try {
//           await axios.delete(`${BASE}/admin/appointments/${id}`);
//           setAppointments((prev) => prev.filter((a) => a.id !== id));
//         } catch { alert("Failed to delete appointment"); }
//         closeConfirm();
//       },
//     });
//   };

//   // ── UNCHANGED: update user role ──
//   const updateRole = async (id, role) => {
//     try {
//       const res = await axios.put(`${BASE}/admin/users/${id}/role`, null, { params: { role } });
//       setUsers((prev) => prev.map((u) => (u.id === id ? res.data : u)));
//     } catch { alert("Failed to update role"); }
//   };

//   // ── UNCHANGED: clearAll ──
//   const clearAll = () => {
//     setConfirm({
//       open: true,
//       title: "Clear All Data",
//       message: "⚠️ This will permanently delete ALL users, doctors, patients, and appointments from the database. This action CANNOT be undone.",
//       danger: true,
//       onConfirm: async () => {
//         try {
//           await axios.delete(`${BASE}/admin/clearAll`);
//           setUsers([]); setAppointments([]); setDoctors([]); setPatients([]);
//         } catch { alert("Failed to clear data"); }
//         closeConfirm();
//       },
//     });
//   };

//   const closeConfirm = () => setConfirm((c) => ({ ...c, open:false }));

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };
//   const handleNavClick = (key) => { setView(key); setSidebarOpen(false); };

//   // ── Derived stats ──
//   const pendingCount  = appointments.filter((a) => a.status === "PENDING").length;
//   const approvedCount = appointments.filter((a) => a.status === "APPROVED").length;
//   const doctorCount   = users.filter((u) => u.role?.toUpperCase().includes("DOCTOR")).length;
//   const patientCount  = users.filter((u) => u.role?.toUpperCase().includes("PATIENT")).length;

//   const menuItems = [
//     { key:"dashboard",    label:"Dashboard",    icon:<DashboardIcon     sx={{ fontSize:18 }} /> },
//     { key:"users",        label:"Users",        icon:<PeopleIcon        sx={{ fontSize:18 }} />, badge: users.length },
//     { key:"appointments", label:"Appointments", icon:<EventIcon         sx={{ fontSize:18 }} />, badge: pendingCount },
//     { key:"doctors",      label:"Doctors",      icon:<LocalHospitalIcon sx={{ fontSize:18 }} /> },
//     { key:"patients",     label:"Patients",     icon:<PersonIcon        sx={{ fontSize:18 }} /> },
//     { key:"danger",       label:"System",       icon:<ShieldIcon        sx={{ fontSize:18 }} /> },
//   ];

//   // ── Loading / Error ────────────────────────────────────────────────────────
//   if (loading) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <CircularProgress sx={{ color:"#e11d48" }} />
//     </Box>
//   );
//   if (error) return (
//     <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}>
//       <Alert severity="error">{error}</Alert>
//     </Box>
//   );

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
//       <div className="adm-blob adm-blob-1" />
//       <div className="adm-blob adm-blob-2" />
//       <div className="adm-blob adm-blob-3" />

//       {sidebarOpen && <div className="adm-overlay" onClick={() => setSidebarOpen(false)} />}

//       {/* ── Sidebar ── */}
//       <div className={`adm-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="adm-sidebar-top">
//           <div className="adm-logo">
//             <div className="adm-logo-icon">⬡</div>
//             Med<span className="adm-logo-accent">Vault</span>
//           </div>
//           <div className="adm-close-btn" onClick={() => setSidebarOpen(false)}>
//             <CloseIcon sx={{ fontSize:16 }} />
//           </div>
//         </div>

//         <div className="adm-nav-label">Admin Panel</div>
//         {menuItems.map((item) => (
//           <NavItem key={item.key} icon={item.icon} label={item.label}
//             active={view === item.key} badge={item.badge}
//             onClick={() => handleNavClick(item.key)} />
//         ))}

//         <div className="adm-sidebar-spacer" />

//         <div className="adm-user-card">
//           <div className="adm-user-av">⬡</div>
//           <Box>
//             <Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>Administrator</Typography>
//             <Typography sx={{ fontSize:".72rem", color:"#e11d48", fontWeight:500 }}>Full Access</Typography>
//           </Box>
//         </div>

//         <button onClick={handleLogout}
//           style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11,
//                    cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48",
//                    border:"1px solid transparent", background:"none", width:"100%",
//                    fontFamily:"'Outfit',sans-serif", transition:"all .18s" }}
//           onMouseEnter={e => { e.currentTarget.style.background="#fff1f3"; e.currentTarget.style.borderColor="rgba(225,29,72,.15)"; }}
//           onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.borderColor="transparent"; }}>
//           <div className="adm-nav-icon" style={{ background:"#fff1f3", color:"#e11d48" }}>
//             <LogoutIcon sx={{ fontSize:16 }} />
//           </div>
//           Sign Out
//         </button>
//       </div>

//       {/* ── Top bar ── */}
//       <div className="adm-topbar">
//         <div className="adm-topbar-left">
//           <div className="adm-hamburger" onClick={() => setSidebarOpen(true)}>
//             <MenuIcon sx={{ fontSize:20 }} />
//           </div>
//           <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#1a1f36" }}>
//             Med<span style={{ color:"#e11d48" }}>Vault</span>{" "}
//             <span style={{ fontSize:".85rem", color:"#8892b0", fontFamily:"'Outfit',sans-serif", fontWeight:400 }}>Admin</span>
//           </Typography>
//         </div>
//         <Button startIcon={<LogoutIcon />} onClick={handleLogout} size="small"
//           sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none",
//                 borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>
//           Logout
//         </Button>
//       </div>

//       {/* ── Page content ── */}
//       <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
//         <AnimatePresence mode="wait">
//           <motion.div key={view}
//             initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
//             exit={{ opacity:0, y:-20 }} transition={{ duration:0.28 }}>

//             {/* ────────── DASHBOARD ────────── */}
//             {view === "dashboard" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     Admin Dashboard 🛡️
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     Full system overview — manage users, appointments & data
//                   </Typography>
//                 </Box>

//                 {/* Hero */}
//                 <div className="adm-hero">
//                   <Avatar className="av-red"
//                     sx={{ width:80, height:80, borderRadius:"22px", fontSize:"2rem",
//                           boxShadow:"0 8px 24px rgba(225,29,72,.3)", flexShrink:0 }}>
//                     ⬡
//                   </Avatar>
//                   <Box>
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:700, color:"#1a1f36" }}>
//                       MedVault Control Center
//                     </Typography>
//                     <Typography sx={{ color:"#8892b0", fontSize:".82rem", mt:.5 }}>
//                       You have full administrative access to all system resources
//                     </Typography>
//                     <Box sx={{ display:"flex", gap:1, mt:1.5, flexWrap:"wrap" }}>
//                       {[`👥 ${users.length} Users`, `📅 ${appointments.length} Appointments`, `🏥 ${doctors.length} Doctors`].map((v, i) => (
//                         <Chip key={i} label={v} size="small"
//                           sx={{ background:"#fff1f3", color:"#e11d48", border:"1px solid rgba(225,29,72,.15)", fontWeight:500, fontSize:".75rem" }} />
//                       ))}
//                     </Box>
//                   </Box>
//                 </div>

//                 {/* Stat grid */}
//                 <Grid container spacing={2.5} sx={{ mb:4 }}>
//                   <Grid item xs={6} sm={3}><StatCard label="Total Users"    value={users.length}        icon="👥" color="#e11d48" delay={0}   /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Doctors"        value={doctorCount}         icon="🏥" color="#4f6ef7" delay={60}  /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Patients"       value={patientCount}        icon="🧑" color="#059669" delay={120} /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Appointments"   value={appointments.length} icon="📅" color="#d97706" delay={180} /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Pending"        value={pendingCount}        icon="⏳" color="#d97706" delay={240} /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Approved"       value={approvedCount}       icon="✓"  color="#059669" delay={300} /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Rejected"       value={appointments.length - pendingCount - approvedCount} icon="✕" color="#e11d48" delay={360} /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Admin Users"    value={users.filter((u) => u.role?.toUpperCase().includes("ADMIN")).length} icon="🛡️" color="#7c3aed" delay={420} /></Grid>
//                 </Grid>

//                 {/* Recent users */}
//                 <div className="adm-sec-heading">Recent Users</div>
//                 {users.slice(0, 5).map((u, i) => (
//                   <motion.div key={u.id} whileHover={{ scale:1.01 }}>
//                     <div className="adm-user-row">
//                       <Avatar className={getAv(i)} sx={{ width:38, height:38, borderRadius:"10px", fontSize:".95rem", fontWeight:700, flexShrink:0 }}>
//                         {u.username?.charAt(0).toUpperCase()}
//                       </Avatar>
//                       <Box sx={{ flex:1 }}>
//                         <Typography sx={{ fontWeight:600, fontSize:".9rem", color:"#1a1f36" }}>{u.username}</Typography>
//                         <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>ID #{u.id}</Typography>
//                       </Box>
//                       <Chip label={u.role} size="small" className={roleClass(u.role)}
//                         sx={{ border:"1px solid", fontWeight:600, fontSize:".72rem" }} />
//                     </div>
//                   </motion.div>
//                 ))}
//                 {users.length > 5 && (
//                   <Typography sx={{ fontSize:".8rem", color:"#4f6ef7", cursor:"pointer", mt:1, fontWeight:500 }}
//                     onClick={() => handleNavClick("users")}>
//                     View all {users.length} users →
//                   </Typography>
//                 )}
//               </>
//             )}

//             {/* ────────── USERS ────────── */}
//             {view === "users" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Users</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{users.length} registered accounts</Typography>
//                 </Box>

//                 {users.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>👥</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No users found</Typography>
//                   </Box>
//                 ) : (
//                   users.map((u, i) => (
//                     <motion.div key={u.id} whileHover={{ scale:1.005 }}>
//                       <div className="adm-user-row">
//                         <Avatar className={getAv(i)} sx={{ width:44, height:44, borderRadius:"13px", fontSize:"1.1rem", fontWeight:700, flexShrink:0 }}>
//                           {u.username?.charAt(0).toUpperCase()}
//                         </Avatar>
//                         <Box sx={{ flex:1, minWidth:0 }}>
//                           <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>{u.username}</Typography>
//                           <Typography sx={{ fontSize:".75rem", color:"#8892b0" }}>ID #{u.id}</Typography>
//                         </Box>
//                         <Chip label={u.role} size="small" className={roleClass(u.role)}
//                           sx={{ border:"1px solid", fontWeight:600, fontSize:".72rem", flexShrink:0 }} />

//                         {/* Role change buttons */}
//                         {u.role?.toUpperCase() !== "ROLE_ADMIN" && (
//                           <Box sx={{ display:"flex", gap:.75, flexShrink:0 }}>
//                             {["ROLE_PATIENT","ROLE_DOCTOR"].map((r) => (
//                               <Button key={r} size="small" onClick={() => updateRole(u.id, r)}
//                                 disabled={u.role === r}
//                                 sx={{ borderRadius:"8px", textTransform:"none", fontSize:".72rem", fontWeight:600,
//                                       minWidth:0, px:1.2, py:.5,
//                                       background: u.role === r ? "#f0f2f8" : "#f5f7ff",
//                                       color: u.role === r ? "#8892b0" : "#4a5278",
//                                       border:"1px solid #e8ecf5",
//                                       "&:hover":{ background:"#eef1fe", color:"#4f6ef7" } }}>
//                                 {r === "ROLE_PATIENT" ? "Patient" : "Doctor"}
//                               </Button>
//                             ))}
//                           </Box>
//                         )}

//                         {/* Delete */}
//                         {!u.role?.toUpperCase().includes("ADMIN") && (
//                           <IconButton size="small" onClick={() => deleteUser(u.id)}
//                             sx={{ color:"#e11d48", background:"#fff1f3", borderRadius:"9px",
//                                   "&:hover":{ background:"#fce7f3" }, flexShrink:0 }}>
//                             <DeleteIcon sx={{ fontSize:17 }} />
//                           </IconButton>
//                         )}
//                       </div>
//                     </motion.div>
//                   ))
//                 )}
//               </>
//             )}

//             {/* ────────── APPOINTMENTS ────────── */}
//             {view === "appointments" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Appointments</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     {appointments.length} total · {pendingCount} pending · {approvedCount} approved
//                   </Typography>
//                 </Box>

//                 {appointments.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>📅</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No appointments found</Typography>
//                   </Box>
//                 ) : (
//                   appointments.map((appt) => {
//                     const st = (appt.status || "pending").toLowerCase();
//                     const sc = statusColor(appt.status);
//                     return (
//                       <motion.div key={appt.id} whileHover={{ scale:1.005 }}>
//                         <div className={`adm-appt-row ${st}`}>
//                           {/* ID */}
//                           <Typography sx={{ fontSize:".75rem", color:"#8892b0", fontWeight:600, minWidth:36 }}>
//                             #{appt.id}
//                           </Typography>

//                           {/* Patient */}
//                           <Box sx={{ flex:1, minWidth:0 }}>
//                             <Typography sx={{ fontWeight:600, fontSize:".88rem", color:"#1a1f36", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
//                               {appt.patient?.name || "N/A"}
//                             </Typography>
//                             <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>Patient</Typography>
//                           </Box>

//                           {/* Doctor */}
//                           <Box sx={{ flex:1, minWidth:0 }}>
//                             <Typography sx={{ fontWeight:600, fontSize:".88rem", color:"#1a1f36", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
//                               Dr. {appt.doctor?.name || "N/A"}
//                             </Typography>
//                             <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>Doctor</Typography>
//                           </Box>

//                           {/* Date & time */}
//                           <Box sx={{ textAlign:"center", flexShrink:0 }}>
//                             <Typography sx={{ fontSize:".82rem", fontWeight:500, color:"#1a1f36" }}>{appt.date || "—"}</Typography>
//                             <Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>{appt.timeSlot || "—"}</Typography>
//                           </Box>

//                           {/* Status */}
//                           <Chip label={appt.status || "PENDING"} size="small"
//                             sx={{ background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`, fontWeight:600, fontSize:".72rem", flexShrink:0 }} />

//                           {/* Delete */}
//                           <IconButton size="small" onClick={() => deleteAppointment(appt.id)}
//                             sx={{ color:"#e11d48", background:"#fff1f3", borderRadius:"9px",
//                                   "&:hover":{ background:"#fce7f3" }, flexShrink:0 }}>
//                             <DeleteIcon sx={{ fontSize:17 }} />
//                           </IconButton>
//                         </div>
//                       </motion.div>
//                     );
//                   })
//                 )}
//               </>
//             )}

//             {/* ────────── DOCTORS ────────── */}
//             {view === "doctors" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Doctors</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{doctors.length} registered doctors</Typography>
//                 </Box>
//                 {doctors.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🏥</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No doctors found</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {doctors.map((doc, i) => (
//                       <Grid item xs={12} sm={6} md={4} key={doc.id}>
//                         <motion.div whileHover={{ scale:1.03 }}>
//                           <Card className="adm-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className="av-blue" sx={{ width:50, height:50, borderRadius:"14px", fontSize:"1.2rem", fontWeight:700 }}>
//                                   {doc.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>Dr. {doc.name}</Typography>
//                                   <Typography sx={{ fontSize:".75rem", color:"#4f6ef7", fontWeight:500 }}>{doc.specialization}</Typography>
//                                 </Box>
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".8rem", color:"#4a5278", mb:.5 }}>📞 {doc.contact || "—"}</Typography>
//                               <Typography sx={{ fontSize:".8rem", color:"#4a5278" }}>🏥 {doc.hospital || "—"}</Typography>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ────────── PATIENTS ────────── */}
//             {view === "patients" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Patients</Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{patients.length} registered patients</Typography>
//                 </Box>
//                 {patients.length === 0 ? (
//                   <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}>
//                     <Typography sx={{ fontSize:"2.5rem", mb:1 }}>🧑</Typography>
//                     <Typography sx={{ fontWeight:500 }}>No patients found</Typography>
//                   </Box>
//                 ) : (
//                   <Grid container spacing={2.5}>
//                     {patients.map((pt, i) => (
//                       <Grid item xs={12} sm={6} md={4} key={pt.id}>
//                         <motion.div whileHover={{ scale:1.03 }}>
//                           <Card className="adm-card">
//                             <CardContent sx={{ p:"24px !important" }}>
//                               <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                                 <Avatar className={getAv(i)} sx={{ width:50, height:50, borderRadius:"14px", fontSize:"1.2rem", fontWeight:700 }}>
//                                   {pt.name?.charAt(0)}
//                                 </Avatar>
//                                 <Box>
//                                   <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{pt.name}</Typography>
//                                   <Typography sx={{ fontSize:".75rem", color:"#059669", fontWeight:500 }}>{pt.gender} · Age {pt.age}</Typography>
//                                 </Box>
//                               </Box>
//                               <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }} />
//                               <Typography sx={{ fontSize:".8rem", color:"#4a5278", mb:.5 }}>📞 {pt.contact || "—"}</Typography>
//                               <Typography sx={{ fontSize:".8rem", color:"#4a5278" }}>🎂 {pt.dob || "—"}</Typography>
//                             </CardContent>
//                           </Card>
//                         </motion.div>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </>
//             )}

//             {/* ────────── SYSTEM / DANGER ZONE ────────── */}
//             {view === "danger" && (
//               <>
//                 <Box sx={{ mb:4 }}>
//                   <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>
//                     System Settings
//                   </Typography>
//                   <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
//                     Administrative controls — proceed with caution
//                   </Typography>
//                 </Box>

//                 {/* Stats summary */}
//                 <Grid container spacing={2.5} sx={{ mb:4 }}>
//                   <Grid item xs={6} sm={3}><StatCard label="Users"        value={users.length}        icon="👥" color="#4f6ef7" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Doctors"      value={doctors.length}      icon="🏥" color="#4f6ef7" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Patients"     value={patients.length}     icon="🧑" color="#059669" /></Grid>
//                   <Grid item xs={6} sm={3}><StatCard label="Appointments" value={appointments.length} icon="📅" color="#d97706" /></Grid>
//                 </Grid>

//                 {/* Danger zone */}
//                 <div className="adm-danger-box">
//                   <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
//                     <WarningAmberIcon sx={{ color:"#e11d48", fontSize:26 }} />
//                     <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#e11d48" }}>
//                       Danger Zone
//                     </Typography>
//                   </Box>
//                   <Typography sx={{ fontSize:".875rem", color:"#4a5278", mb:3, lineHeight:1.7 }}>
//                     The actions below are <strong>irreversible</strong>. Clearing all data will remove every user, doctor, patient, and appointment from the database permanently.
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     startIcon={<DeleteIcon />}
//                     onClick={clearAll}
//                     sx={{ background:"linear-gradient(135deg,#e11d48,#f43f5e)", borderRadius:"12px",
//                           textTransform:"none", fontWeight:700, fontSize:".9rem",
//                           boxShadow:"0 4px 16px rgba(225,29,72,.35)", px:3, py:1.2,
//                           "&:hover":{ boxShadow:"0 6px 24px rgba(225,29,72,.45)" } }}>
//                     Clear All Data
//                   </Button>
//                 </div>
//               </>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </Box>

//       {/* ── Confirm Modal ── */}
//       <ConfirmModal
//         open={confirm.open}
//         title={confirm.title}
//         message={confirm.message}
//         danger={confirm.danger}
//         onConfirm={confirm.onConfirm}
//         onCancel={closeConfirm}
//       />
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Typography, CircularProgress, Alert, Grid, Avatar, Card, CardContent,
  Button, Chip, Divider, Modal, IconButton, TextField,
} from "@mui/material";
import MenuIcon          from "@mui/icons-material/Menu";
import CloseIcon         from "@mui/icons-material/Close";
import LogoutIcon        from "@mui/icons-material/Logout";
import DashboardIcon     from "@mui/icons-material/Dashboard";
import PeopleIcon        from "@mui/icons-material/People";
import EventIcon         from "@mui/icons-material/Event";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon        from "@mui/icons-material/Person";
import DeleteIcon        from "@mui/icons-material/Delete";
import ShieldIcon        from "@mui/icons-material/Shield";
import WarningAmberIcon  from "@mui/icons-material/WarningAmber";
import VerifiedIcon      from "@mui/icons-material/Verified";
import HourglassTopIcon  from "@mui/icons-material/HourglassTop";
import ErrorOutlineIcon  from "@mui/icons-material/ErrorOutline";
import BadgeIcon         from "@mui/icons-material/Badge";
import OpenInNewIcon     from "@mui/icons-material/OpenInNew";
import DownloadIcon      from "@mui/icons-material/Download";
import CheckIcon         from "@mui/icons-material/Check";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BASE = "http://localhost:8080";

// ── Styles ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
  body { font-family:'Outfit',sans-serif !important; }
  .adm-overlay { position:fixed;inset:0;background:rgba(26,31,54,.18);backdrop-filter:blur(3px);z-index:199; }
  .adm-sidebar { width:264px;background:#fff;border-right:1px solid #e8ecf5;display:flex;flex-direction:column;padding:20px 14px 24px;position:fixed;top:0;left:0;height:100vh;z-index:200;box-shadow:4px 0 28px rgba(79,110,247,.10);transition:transform .28s cubic-bezier(.22,1,.36,1); }
  .adm-sidebar.closed { transform:translateX(-100%); }
  .adm-sidebar.open   { transform:translateX(0); }
  .adm-sidebar-top { display:flex;align-items:center;justify-content:space-between;padding:0 6px 20px; }
  .adm-logo { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:#4f6ef7;display:flex;align-items:center;gap:9px; }
  .adm-logo-icon { width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#e11d48,#f43f5e);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;flex-shrink:0; }
  .adm-logo-accent { color:#e11d48; }
  .adm-close-btn { width:30px;height:30px;border-radius:8px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#8892b0; }
  .adm-close-btn:hover { background:#fff1f3;color:#e11d48; }
  .adm-nav-label { font-size:.67rem;text-transform:uppercase;letter-spacing:1.2px;color:#b0b8d0;font-weight:600;padding:0 10px;margin:4px 0 6px; }
  .adm-nav-item { display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;cursor:pointer;font-size:.875rem;font-weight:500;color:#4a5278;transition:all .18s;border:1px solid transparent;margin-bottom:3px;user-select:none; }
  .adm-nav-item:hover { background:#fff1f3;color:#e11d48; }
  .adm-nav-item.active { background:#fff1f3;color:#e11d48;font-weight:600;border-color:rgba(225,29,72,.18); }
  .adm-nav-item.active .adm-nav-icon { background:#e11d48 !important;color:#fff !important; }
  .adm-nav-icon { width:30px;height:30px;border-radius:8px;background:#f0f2f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;color:#4a5278; }
  .adm-sidebar-spacer { flex:1; }
  .adm-user-card { display:flex;align-items:center;gap:11px;padding:12px;border-radius:14px;background:#fff1f3;border:1px solid rgba(225,29,72,.12);margin-bottom:10px; }
  .adm-user-av { width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#e11d48,#f43f5e);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;flex-shrink:0; }
  .adm-topbar { display:flex;align-items:center;justify-content:space-between;padding:13px 24px;background:#fff;border-bottom:1px solid #e8ecf5;box-shadow:0 1px 8px rgba(79,110,247,.07);position:sticky;top:0;z-index:100; }
  .adm-topbar-left { display:flex;align-items:center;gap:14px; }
  .adm-hamburger { width:38px;height:38px;border-radius:10px;background:#f5f7ff;border:1px solid #e8ecf5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#e11d48; }
  .adm-hamburger:hover { background:#fff1f3; }
  .adm-blob { position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0; }
  .adm-blob-1 { width:500px;height:500px;background:rgba(225,29,72,.05);top:-150px;right:-80px; }
  .adm-blob-2 { width:380px;height:380px;background:rgba(79,110,247,.05);bottom:-80px;left:60px; }
  .adm-stat { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:18px !important;box-shadow:0 1px 6px rgba(0,0,0,.05) !important;padding:24px 28px;position:relative;overflow:hidden; }
  .adm-stat-value { font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;line-height:1; }
  .adm-stat-label { font-size:.72rem;color:#8892b0;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px; }
  .adm-stat-icon  { position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:2.6rem;opacity:.06; }
  .adm-sec-heading { font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:#1a1f36;display:flex;align-items:center;gap:12px;margin-bottom:16px; }
  .adm-sec-heading::after { content:'';flex:1;height:1px;background:#e8ecf5; }
  .adm-card { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:16px !important;box-shadow:0 1px 4px rgba(0,0,0,.05) !important; }
  .adm-user-row { background:#fff !important;border:1px solid #e8ecf5 !important;border-radius:14px !important;box-shadow:0 1px 4px rgba(0,0,0,.04) !important;display:flex;align-items:center;gap:14px;padding:14px 18px;margin-bottom:10px; }
  .adm-user-row:hover { box-shadow:0 4px 18px rgba(225,29,72,.10) !important;border-color:#fce7f3 !important; }
  .adm-appt-row { background:#fff !important;border:1px solid #e8ecf5 !important;border-left:4px solid #e8ecf5 !important;border-radius:14px !important;padding:16px 20px;margin-bottom:10px;display:flex;align-items:center;gap:14px;flex-wrap:wrap; }
  .adm-appt-row.approved { border-left-color:#059669 !important; }
  .adm-appt-row.pending  { border-left-color:#d97706 !important; }
  .adm-appt-row.rejected { border-left-color:#e11d48 !important; }
  /* Verification rows */
  .verif-row { background:#fff;border:1px solid #e8ecf5;border-left:5px solid #e8ecf5;border-radius:16px;padding:18px 22px;margin-bottom:12px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;transition:box-shadow .2s; }
  .verif-row:hover { box-shadow:0 4px 20px rgba(0,0,0,.08); }
  .verif-row.pending  { border-left-color:#d97706; }
  .verif-row.approved { border-left-color:#059669; }
  .verif-row.rejected { border-left-color:#e11d48; }
  .verif-row.incomplete { border-left-color:#8892b0; }
  /* Verif detail modal */
  .verif-modal { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:95%;max-width:860px;background:#fff;border-radius:24px;border:1px solid #e8ecf5;box-shadow:0 24px 80px rgba(0,0,0,.16);padding:0;outline:none;max-height:92vh;overflow-y:auto; }
  .verif-doc-thumb { border:1.5px solid #e8ecf5;border-radius:12px;overflow:hidden;background:#f8f9ff;display:flex;flex-direction:column;align-items:center; }
  .verif-doc-thumb img { width:100%;max-height:180px;object-fit:cover;display:block;background:#f0f2f8; }
  .verif-doc-thumb-label { font-size:.7rem;font-weight:600;color:#8892b0;text-transform:uppercase;letter-spacing:.8px;padding:8px 12px;border-top:1px solid #e8ecf5;width:100%;text-align:center; }
  .adm-modal-box { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:420px;background:#fff;border-radius:20px;border:1px solid #e8ecf5;box-shadow:0 20px 60px rgba(225,29,72,.16);padding:36px;outline:none; }
  .adm-danger-box { background:#fff1f3;border:1.5px solid rgba(225,29,72,.2);border-radius:18px;padding:28px 32px; }
  .role-admin   { background:#fff1f3!important;color:#e11d48!important;border-color:rgba(225,29,72,.2)!important; }
  .role-doctor  { background:#eef1fe!important;color:#4f6ef7!important;border-color:rgba(79,110,247,.2)!important; }
  .role-patient { background:#ecfdf5!important;color:#059669!important;border-color:rgba(5,150,105,.2)!important; }
  .av-red    { background:linear-gradient(135deg,#e11d48,#f43f5e) !important; }
  .av-blue   { background:linear-gradient(135deg,#4f6ef7,#818cf8) !important; }
  .av-green  { background:linear-gradient(135deg,#059669,#34d399) !important; }
  .av-amber  { background:linear-gradient(135deg,#d97706,#fbbf24) !important; }
  .av-violet { background:linear-gradient(135deg,#7c3aed,#a78bfa) !important; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
  .fu { animation:fadeUp .38s cubic-bezier(.22,1,.36,1) both; }
`;
if (!document.getElementById("adm-css")) {
  const st = document.createElement("style"); st.id="adm-css";
  st.textContent = CSS; document.head.appendChild(st);
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const avColors = ["av-blue","av-violet","av-green","av-amber","av-red"];
const getAv = i => avColors[i%avColors.length];
const roleClass = r => { if (!r) return ""; const u=r.toUpperCase(); if(u.includes("ADMIN")) return "role-admin"; if(u.includes("DOCTOR")) return "role-doctor"; return "role-patient"; };
const statusColor = s => {
  switch((s||"").toUpperCase()) {
    case "APPROVED": return { bg:"#ecfdf5", color:"#059669", border:"rgba(5,150,105,.2)" };
    case "REJECTED": return { bg:"#fff1f3", color:"#e11d48", border:"rgba(225,29,72,.2)" };
    case "PENDING":  return { bg:"#fffbeb", color:"#d97706", border:"rgba(217,119,6,.2)" };
    default:         return { bg:"#f1f5f9", color:"#64748b", border:"#e2e8f0" };
  }
};

function StatCard({ label, value, icon, color, delay=0 }) {
  return (
    <div className="adm-stat fu" style={{ animationDelay:`${delay}ms` }}>
      <div className="adm-stat-label">{label}</div>
      <div className="adm-stat-value" style={{ color }}>{value}</div>
      <div className="adm-stat-icon">{icon}</div>
    </div>
  );
}
function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <div className={`adm-nav-item ${active?"active":""}`} onClick={onClick}>
      <div className="adm-nav-icon">{icon}</div>
      <span style={{ flex:1 }}>{label}</span>
      {badge > 0 && <span style={{ background:"#e11d48", color:"#fff", fontSize:".65rem", fontWeight:700, padding:"1px 6px", borderRadius:"20px", minWidth:18, textAlign:"center" }}>{badge}</span>}
    </div>
  );
}

// ── Confirm Modal ──────────────────────────────────────────────────────────────
function ConfirmModal({ open, title, message, onConfirm, onCancel, danger=true }) {
  return (
    <Modal open={open} onClose={onCancel}>
      <Box className="adm-modal-box">
        <Box sx={{ display:"flex", alignItems:"center", gap:2, mb:2 }}>
          <Box sx={{ width:44, height:44, borderRadius:"12px", background:danger?"#fff1f3":"#eef1fe", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {danger ? <WarningAmberIcon sx={{ color:"#e11d48", fontSize:24 }}/> : <ShieldIcon sx={{ color:"#4f6ef7", fontSize:24 }}/>}
          </Box>
          <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#1a1f36" }}>{title}</Typography>
        </Box>
        <Typography sx={{ fontSize:".9rem", color:"#4a5278", mb:3, lineHeight:1.6 }}>{message}</Typography>
        <Box sx={{ display:"flex", gap:1.5 }}>
          <Button onClick={onCancel} variant="outlined" fullWidth sx={{ borderColor:"#e8ecf5", color:"#4a5278", borderRadius:"10px", textTransform:"none", fontWeight:600 }}>Cancel</Button>
          <Button onClick={onConfirm} variant="contained" fullWidth sx={{ background:danger?"linear-gradient(135deg,#e11d48,#f43f5e)":"linear-gradient(135deg,#4f6ef7,#818cf8)", borderRadius:"10px", textTransform:"none", fontWeight:600, boxShadow:danger?"0 3px 12px rgba(225,29,72,.28)":"0 3px 12px rgba(79,110,247,.28)" }}>Confirm</Button>
        </Box>
      </Box>
    </Modal>
  );
}

// ── Document Viewer Helper ─────────────────────────────────────────────────────
function DocFile({ label, filename }) {
  if (!filename) return (
    <Box sx={{ border:"1.5px dashed #e8ecf5", borderRadius:"12px", p:2, background:"#f8f9ff", textAlign:"center" }}>
      <Typography sx={{ fontSize:".72rem", color:"#b0b8d0", fontWeight:600 }}>NOT UPLOADED</Typography>
      <Typography sx={{ fontSize:".72rem", color:"#b0b8d0" }}>{label}</Typography>
    </Box>
  );
  const url = `${BASE}/doctor-verification/file/${filename}`;
  const isPdf = filename.toLowerCase().endsWith(".pdf");
  const isImg = /\.(jpg|jpeg|png)$/i.test(filename);
  return (
    <Box sx={{ border:"1.5px solid #e8ecf5", borderRadius:"12px", overflow:"hidden", background:"#f8f9ff" }}>
      {isImg && <img src={url} alt={label} style={{ width:"100%", maxHeight:160, objectFit:"cover", display:"block", background:"#f0f2f8" }}/>}
      {isPdf && <Box sx={{ height:160, display:"flex", alignItems:"center", justifyContent:"center", background:"#f0f4ff" }}><Typography sx={{ fontSize:"2.5rem" }}>📄</Typography></Box>}
      <Box sx={{ px:1.5, py:1, borderTop:"1px solid #e8ecf5", display:"flex", alignItems:"center", justifyContent:"space-between", gap:1 }}>
        <Box>
          <Typography sx={{ fontSize:".68rem", fontWeight:700, color:"#8892b0", textTransform:"uppercase", letterSpacing:".8px" }}>{label}</Typography>
          <Typography sx={{ fontSize:".68rem", color:"#b0b8d0", wordBreak:"break-all" }}>{filename.slice(0,24)}…</Typography>
        </Box>
        <Box sx={{ display:"flex", gap:.5 }}>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", padding:"4px 8px", borderRadius:7, background:"#4f6ef7", color:"#fff", fontSize:".7rem", fontWeight:600, textDecoration:"none", fontFamily:"'Outfit',sans-serif", gap:3 }}>
            <OpenInNewIcon sx={{ fontSize:12 }}/> View
          </a>
          <a href={url} download style={{ display:"inline-flex", alignItems:"center", padding:"4px 8px", borderRadius:7, background:"#f5f7ff", color:"#4f6ef7", fontSize:".7rem", fontWeight:600, textDecoration:"none", border:"1px solid rgba(79,110,247,.25)", fontFamily:"'Outfit',sans-serif", gap:3 }}>
            <DownloadIcon sx={{ fontSize:12 }}/> DL
          </a>
        </Box>
      </Box>
    </Box>
  );
}

// ── Verification Detail Modal ──────────────────────────────────────────────────
function VerifDetailModal({ open, record, doctor, onClose, onApprove, onReject }) {
  const [remarks, setRemarks] = useState("");
  const [acting, setActing] = useState(false);

  if (!record || !doctor) return null;
  const v = record;
  const sc = statusColor(v.status);

  const InfoRow = ({ label, value }) => (
    <Box>
      <Typography sx={{ fontSize:".65rem", fontWeight:700, color:"#8892b0", textTransform:"uppercase", letterSpacing:"1px", mb:.3 }}>{label}</Typography>
      <Typography sx={{ fontSize:".88rem", color: value?"#1a1f36":"#b0b8d0", fontWeight: value?500:400 }}>{value||"—"}</Typography>
    </Box>
  );

  const SectionTitle = ({ color="#4f6ef7", children }) => (
    <Box sx={{ display:"flex", alignItems:"center", gap:1, mb:2, mt:1 }}>
      <Box sx={{ width:4, height:16, borderRadius:2, background:color }}/>
      <Typography sx={{ fontSize:".72rem", fontWeight:700, color, textTransform:"uppercase", letterSpacing:"1px" }}>{children}</Typography>
      <Box sx={{ flex:1, height:1, background:"#e8ecf5" }}/>
    </Box>
  );

  const handleApprove = async () => {
    setActing(true);
    await onApprove(doctor.id, remarks);
    setActing(false); onClose();
  };
  const handleReject = async () => {
    if (!remarks.trim()) { alert("Please enter rejection reason in the remarks field."); return; }
    setActing(true);
    await onReject(doctor.id, remarks);
    setActing(false); onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="verif-modal">
        {/* Header */}
        <Box sx={{ p:"28px 32px 20px", borderBottom:"1px solid #e8ecf5", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, background:"#fff", zIndex:10, borderRadius:"24px 24px 0 0" }}>
          <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
            <Avatar className="av-blue" sx={{ width:52, height:52, borderRadius:"14px", fontSize:"1.3rem", fontWeight:700 }}>{doctor.name?.charAt(0)}</Avatar>
            <Box>
              <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontWeight:700, color:"#1a1f36" }}>Dr. {doctor.name}</Typography>
              <Typography sx={{ fontSize:".78rem", color:"#8892b0" }}>{doctor.specialization} · ID #{doctor.id}</Typography>
            </Box>
            <Chip label={v.status||"INCOMPLETE"} size="small"
              sx={{ background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`, fontWeight:700, fontSize:".72rem", ml:1 }}/>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ background:"#f5f7ff", border:"1px solid #e8ecf5", borderRadius:"9px" }}><CloseIcon sx={{ fontSize:16 }}/></IconButton>
        </Box>

        <Box sx={{ p:"28px 32px" }}>

          {/* ── IDENTITY ── */}
          <SectionTitle color="#4f6ef7">Identity & NMC Registration</SectionTitle>
          <Grid container spacing={2.5} sx={{ mb:3 }}>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Full Legal Name" value={v.fullLegalName}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Date of Birth"   value={v.dateOfBirth}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Gender"          value={v.gender}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Nationality"     value={v.nationality}/></Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography sx={{ fontSize:".65rem", fontWeight:700, color:"#8892b0", textTransform:"uppercase", letterSpacing:"1px", mb:.3 }}>Aadhaar Number</Typography>
              <Typography sx={{ fontSize:".88rem", color:"#1a1f36", fontWeight:600, fontFamily:"monospace" }}>{v.aadhaarNumber||"—"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Aadhaar Mobile (last 4)" value={v.aadhaarMobile}/></Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography sx={{ fontSize:".65rem", fontWeight:700, color:"#7c3aed", textTransform:"uppercase", letterSpacing:"1px", mb:.3 }}>NMC/MCI Reg Number</Typography>
              <Typography sx={{ fontSize:".88rem", color:"#7c3aed", fontWeight:700, fontFamily:"monospace" }}>{v.medicalRegistrationNumber||"—"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Issuing Medical Council" value={v.medicalCouncil}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Registration Type"      value={v.registrationType}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Registration Date"      value={v.registrationDate}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Valid Until"            value={v.registrationExpiry}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Secondary ID Type"      value={v.idProofType}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Secondary ID Number"    value={v.idProofNumber}/></Grid>
          </Grid>

          <Box sx={{ p:2, borderRadius:"12px", background:"#f0f4ff", border:"1px solid rgba(79,110,247,.15)", mb:3 }}>
            <Typography sx={{ fontSize:".78rem", color:"#4a5278", lineHeight:1.6 }}>
              🔍 <strong>Admin Action Required:</strong> Verify the NMC registration number at{" "}
              <a href="https://www.nmc.org.in" target="_blank" rel="noopener noreferrer" style={{ color:"#4f6ef7", fontWeight:600 }}>nmc.org.in</a>{" "}
              and confirm Aadhaar details match UIDAI records before approving.
            </Typography>
          </Box>

          <Divider sx={{ mb:3, borderColor:"#e8ecf5" }}/>

          {/* ── EDUCATION ── */}
          <SectionTitle color="#7c3aed">Education & Qualifications</SectionTitle>
          <Grid container spacing={2.5} sx={{ mb:3 }}>
            <Grid item xs={12} sm={6} md={3}><InfoRow label="Primary Degree"    value={v.degreeName}/></Grid>
            <Grid item xs={12} sm={6} md={5}><InfoRow label="Medical College"   value={v.degreeInstitution}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Affiliated University" value={v.degreeUniversity}/></Grid>
            <Grid item xs={12} sm={6} md={3}><InfoRow label="Passing Year"      value={v.degreePassingYear}/></Grid>
            <Grid item xs={12} sm={6} md={3}><InfoRow label="Internship Year"   value={v.internshipYear}/></Grid>
            <Grid item xs={12} sm={6} md={3}><InfoRow label="PG Degree"         value={v.pgDegree}/></Grid>
            <Grid item xs={12} sm={6} md={3}><InfoRow label="PG Institution"    value={v.pgInstitution}/></Grid>
            <Grid item xs={12} sm={6} md={3}><InfoRow label="PG Passing Year"   value={v.pgPassingYear}/></Grid>
            <Grid item xs={12} sm={6} md={3}><InfoRow label="Super Specialization" value={v.superSpecialization}/></Grid>
            <Grid item xs={12} sm={6} md={6}><InfoRow label="Areas of Expertise"   value={v.areasOfExpertise}/></Grid>
            <Grid item xs={12} sm={6} md={3}><InfoRow label="Total Experience (yrs)" value={v.totalExperienceYears}/></Grid>
          </Grid>

          <Divider sx={{ mb:3, borderColor:"#e8ecf5" }}/>

          {/* ── PRACTICE ── */}
          <SectionTitle color="#059669">Current Practice</SectionTitle>
          <Grid container spacing={2.5} sx={{ mb:3 }}>
            <Grid item xs={12} sm={6} md={5}><InfoRow label="Current Hospital"       value={v.currentHospitalName}/></Grid>
            <Grid item xs={12} sm={6} md={7}><InfoRow label="Hospital Address"       value={v.currentHospitalAddress}/></Grid>
            <Grid item xs={12} sm={6} md={5}><InfoRow label="Clinic Name"            value={v.clinicName}/></Grid>
            <Grid item xs={12} sm={6} md={7}><InfoRow label="Clinic Address"         value={v.clinicAddress}/></Grid>
            <Grid item xs={12} sm={4} md={3}><InfoRow label="City"                   value={v.clinicCity}/></Grid>
            <Grid item xs={12} sm={4} md={3}><InfoRow label="State"                  value={v.clinicState}/></Grid>
            <Grid item xs={12} sm={4} md={2}><InfoRow label="Pincode"                value={v.clinicPincode}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Languages"              value={v.languagesSpoken}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Consultation Days"      value={v.consultationDays}/></Grid>
            <Grid item xs={12} sm={6} md={4}><InfoRow label="Timings"                value={v.consultationTimings}/></Grid>
          </Grid>

          <Divider sx={{ mb:3, borderColor:"#e8ecf5" }}/>

          {/* ── ABOUT ── */}
          {v.aboutMe && (
            <>
              <SectionTitle color="#d97706">Professional Bio</SectionTitle>
              <Box sx={{ background:"#f8f9ff", borderRadius:"12px", p:2.5, border:"1px solid #e8ecf5", mb:3 }}>
                <Typography sx={{ fontSize:".88rem", color:"#1a1f36", lineHeight:1.7 }}>{v.aboutMe}</Typography>
              </Box>
              <Divider sx={{ mb:3, borderColor:"#e8ecf5" }}/>
            </>
          )}

          {/* ── DOCUMENTS ── */}
          <SectionTitle color="#e11d48">Uploaded Documents</SectionTitle>
          <Grid container spacing={2} sx={{ mb:3 }}>
            <Grid item xs={12} sm={6} md={4}><DocFile label="Aadhaar Card"          filename={v.aadhaarFile}/></Grid>
            <Grid item xs={12} sm={6} md={4}><DocFile label="Registration Cert."    filename={v.medicalCertificateFile}/></Grid>
            <Grid item xs={12} sm={6} md={4}><DocFile label="Degree Certificate"    filename={v.degreeFile}/></Grid>
            <Grid item xs={12} sm={6} md={4}><DocFile label="PG Degree Cert."       filename={v.pgDegreeFile}/></Grid>
            <Grid item xs={12} sm={6} md={4}><DocFile label="Secondary ID Proof"    filename={v.idProofFile}/></Grid>
            <Grid item xs={12} sm={6} md={4}><DocFile label="Professional Photo"    filename={v.photoFile}/></Grid>
          </Grid>

          {/* ── Submission info ── */}
          {(v.submittedAt || v.reviewedAt) && (
            <Box sx={{ display:"flex", gap:3, mb:3 }}>
              {v.submittedAt && <Box><Typography sx={{ fontSize:".65rem", color:"#8892b0", fontWeight:600, textTransform:"uppercase", letterSpacing:"1px" }}>Submitted</Typography><Typography sx={{ fontSize:".82rem", color:"#1a1f36" }}>{v.submittedAt}</Typography></Box>}
              {v.reviewedAt  && <Box><Typography sx={{ fontSize:".65rem", color:"#8892b0", fontWeight:600, textTransform:"uppercase", letterSpacing:"1px" }}>Reviewed</Typography><Typography sx={{ fontSize:".82rem", color:"#1a1f36" }}>{v.reviewedAt}</Typography></Box>}
              {v.adminRemarks && <Box><Typography sx={{ fontSize:".65rem", color:"#8892b0", fontWeight:600, textTransform:"uppercase", letterSpacing:"1px" }}>Previous Remarks</Typography><Typography sx={{ fontSize:".82rem", color:"#e11d48" }}>{v.adminRemarks}</Typography></Box>}
            </Box>
          )}

          {/* ── ACTION ZONE (only for PENDING or REJECTED) ── */}
          {(v.status === "PENDING" || v.status === "REJECTED" || v.status === "INCOMPLETE") && (
            <Box sx={{ background:"#f5f7ff", borderRadius:"16px", p:3, border:"1px solid #e8ecf5" }}>
              <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontWeight:700, color:"#1a1f36", mb:2 }}>Admin Decision</Typography>
              <Box sx={{ mb:2 }}>
                <Typography sx={{ fontSize:".7rem", fontWeight:700, color:"#8892b0", textTransform:"uppercase", letterSpacing:"1px", mb:.6 }}>
                  {v.status==="PENDING" ? "Approval / Rejection Remarks" : "Update Remarks"}
                </Typography>
                <TextField fullWidth multiline rows={3} size="small" variant="outlined"
                  placeholder={v.status==="PENDING"
                    ? "Optional: add notes for approval, or required reason for rejection…"
                    : "Enter reason for rejection (required)…"}
                  value={remarks} onChange={e=>setRemarks(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root":{ borderRadius:"12px", background:"#fff" }, "& .MuiOutlinedInput-notchedOutline":{ borderColor:"#e8ecf5" } }}/>
              </Box>
              <Box sx={{ display:"flex", gap:1.5 }}>
                {v.status !== "APPROVED" && (
                  <Button variant="contained" onClick={handleApprove} disabled={acting} fullWidth
                    sx={{ background:"linear-gradient(135deg,#059669,#34d399)", borderRadius:"12px", textTransform:"none", fontWeight:700, boxShadow:"0 4px 14px rgba(5,150,105,.3)" }}>
                    {acting?"Processing…":"✓ Approve Doctor"}
                  </Button>
                )}
                <Button variant="outlined" onClick={handleReject} disabled={acting} fullWidth
                  sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"12px", textTransform:"none", fontWeight:700, "&:hover":{ background:"#fff1f3" } }}>
                  {v.status==="APPROVED" ? "Revoke Approval" : "✕ Reject"}
                </Button>
              </Box>
            </Box>
          )}

          {v.status === "APPROVED" && (
            <Box sx={{ background:"#ecfdf5", borderRadius:"16px", p:2.5, border:"1px solid rgba(5,150,105,.2)", display:"flex", alignItems:"center", gap:2 }}>
              <VerifiedIcon sx={{ color:"#059669", fontSize:28 }}/>
              <Box sx={{ flex:1 }}>
                <Typography sx={{ fontWeight:700, color:"#059669" }}>This doctor is verified and active on MedVault</Typography>
                <Typography sx={{ fontSize:".78rem", color:"#4a5278", mt:.3 }}>Patients can book appointments with this doctor.</Typography>
              </Box>
              <Button variant="outlined" onClick={handleReject} disabled={acting} size="small"
                sx={{ borderColor:"rgba(225,29,72,.3)", color:"#e11d48", borderRadius:"10px", textTransform:"none", fontWeight:600, flexShrink:0, "&:hover":{ background:"#fff1f3" } }}>
                Revoke
              </Button>
            </Box>
          )}

        </Box>
      </Box>
    </Modal>
  );
}

// ── Main AdminDashboard ────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();

  const [users,        setUsers]        = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors,      setDoctors]      = useState([]);
  const [patients,     setPatients]     = useState([]);
  const [verifications,setVerifications]= useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [view,         setView]         = useState("dashboard");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [verifModal,   setVerifModal]   = useState({ open:false, record:null, doctor:null });
  const [confirm,      setConfirm]      = useState({ open:false, title:"", message:"", onConfirm:null, danger:true });

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const [uRes,aRes,dRes,pRes] = await Promise.all([
          axios.get(`${BASE}/admin/users`),
          axios.get(`${BASE}/admin/appointments`),
          axios.get(`${BASE}/admin/doctors`),
          axios.get(`${BASE}/admin/patients`),
        ]);
        setUsers(uRes.data); setAppointments(aRes.data); setDoctors(dRes.data); setPatients(pRes.data);

        // Fetch verification records for all doctors
        const verifResults = await Promise.allSettled(
          dRes.data.map(d => axios.get(`${BASE}/doctor-verification/doctor/${d.id}`))
        );
        const verifData = verifResults
          .map((r,i) => r.status==="fulfilled" ? { ...r.value.data, _doctorId: dRes.data[i].id } : null)
          .filter(Boolean);
        setVerifications(verifData);
      } catch(err) {
        console.error(err); setError("Failed to load admin data");
      } finally { setLoading(false); }
    };
    fetchData();
  },[]);

  const deleteUser = id => {
    setConfirm({ open:true, title:"Delete User", message:"This permanently deletes the user and all associated data.", danger:true,
      onConfirm: async () => { try { await axios.delete(`${BASE}/admin/users/${id}`); setUsers(p=>p.filter(u=>u.id!==id)); } catch { alert("Failed to delete"); } closeConfirm(); }
    });
  };
  const deleteAppointment = id => {
    setConfirm({ open:true, title:"Delete Appointment", message:"Are you sure?", danger:true,
      onConfirm: async () => { try { await axios.delete(`${BASE}/admin/appointments/${id}`); setAppointments(p=>p.filter(a=>a.id!==id)); } catch { alert("Failed to delete"); } closeConfirm(); }
    });
  };
  const updateRole = async (id, role) => {
    try { const res = await axios.put(`${BASE}/admin/users/${id}/role`, null, { params:{ role } }); setUsers(p=>p.map(u=>u.id===id?res.data:u)); } catch { alert("Failed to update role"); }
  };
  const clearAll = () => {
    setConfirm({ open:true, title:"Clear All Data", message:"⚠️ This permanently deletes ALL users, doctors, patients, and appointments. This CANNOT be undone.", danger:true,
      onConfirm: async () => { try { await axios.delete(`${BASE}/admin/clearAll`); setUsers([]); setAppointments([]); setDoctors([]); setPatients([]); } catch { alert("Failed to clear"); } closeConfirm(); }
    });
  };
  const closeConfirm = () => setConfirm(c=>({...c,open:false}));

  const approveDoctor = async (doctorId, remarks) => {
    try {
      const res = await axios.put(`${BASE}/doctor-verification/doctor/${doctorId}/approve`, { remarks });
      setVerifications(p=>p.map(v=>v._doctorId===doctorId?{...res.data,_doctorId:doctorId}:v));
    } catch { alert("Failed to approve doctor."); }
  };
  const rejectDoctor = async (doctorId, remarks) => {
    try {
      const res = await axios.put(`${BASE}/doctor-verification/doctor/${doctorId}/reject`, { remarks });
      setVerifications(p=>p.map(v=>v._doctorId===doctorId?{...res.data,_doctorId:doctorId}:v));
    } catch { alert("Failed to reject doctor."); }
  };

  const openVerifDetail = (doctor) => {
    const record = verifications.find(v=>v._doctorId===doctor.id);
    setVerifModal({ open:true, record: record||{ status:"INCOMPLETE", _doctorId:doctor.id }, doctor });
  };

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };
  const handleNavClick = key => { setView(key); setSidebarOpen(false); };

  const pendingCount   = appointments.filter(a=>a.status==="PENDING").length;
  const approvedCount  = appointments.filter(a=>a.status==="APPROVED").length;
  const pendingVerif   = verifications.filter(v=>v.status==="PENDING").length;
  const approvedVerif  = verifications.filter(v=>v.status==="APPROVED").length;

  const menuItems = [
    { key:"dashboard",     label:"Dashboard",          icon:<DashboardIcon     sx={{ fontSize:18 }}/> },
    { key:"verifications", label:"Doctor Verifications",icon:<BadgeIcon        sx={{ fontSize:18 }}/>, badge:pendingVerif },
    { key:"users",         label:"Users",              icon:<PeopleIcon        sx={{ fontSize:18 }}/>, badge:0 },
    { key:"appointments",  label:"Appointments",       icon:<EventIcon         sx={{ fontSize:18 }}/>, badge:pendingCount },
    { key:"doctors",       label:"Doctors",            icon:<LocalHospitalIcon sx={{ fontSize:18 }}/> },
    { key:"patients",      label:"Patients",           icon:<PersonIcon        sx={{ fontSize:18 }}/> },
    { key:"danger",        label:"System",             icon:<ShieldIcon        sx={{ fontSize:18 }}/> },
  ];

  if (loading) return <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}><CircularProgress sx={{ color:"#e11d48" }}/></Box>;
  if (error)   return <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#f5f7ff" }}><Alert severity="error">{error}</Alert></Box>;

  return (
    <Box sx={{ minHeight:"100vh", background:"#f5f7ff", fontFamily:"'Outfit',sans-serif" }}>
      <div className="adm-blob adm-blob-1"/>
      <div className="adm-blob adm-blob-2"/>
      {sidebarOpen && <div className="adm-overlay" onClick={()=>setSidebarOpen(false)}/>}

      {/* Sidebar */}
      <div className={`adm-sidebar ${sidebarOpen?"open":"closed"}`}>
        <div className="adm-sidebar-top">
          <div className="adm-logo"><div className="adm-logo-icon">⬡</div>Med<span className="adm-logo-accent">Vault</span></div>
          <div className="adm-close-btn" onClick={()=>setSidebarOpen(false)}><CloseIcon sx={{ fontSize:16 }}/></div>
        </div>
        <div className="adm-nav-label">Admin Panel</div>
        {menuItems.map(item=>(
          <NavItem key={item.key} icon={item.icon} label={item.label} active={view===item.key} badge={item.badge} onClick={()=>handleNavClick(item.key)}/>
        ))}
        <div className="adm-sidebar-spacer"/>
        <div className="adm-user-card">
          <div className="adm-user-av">⬡</div>
          <Box><Typography sx={{ fontSize:".85rem", fontWeight:600, color:"#1a1f36", lineHeight:1.2 }}>Administrator</Typography><Typography sx={{ fontSize:".72rem", color:"#e11d48", fontWeight:500 }}>Full Access</Typography></Box>
        </div>
        <button onClick={handleLogout}
          style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:11, cursor:"pointer", fontSize:".875rem", fontWeight:500, color:"#e11d48", border:"1px solid transparent", background:"none", width:"100%", fontFamily:"'Outfit',sans-serif" }}
          onMouseEnter={e=>{e.currentTarget.style.background="#fff1f3";}} onMouseLeave={e=>{e.currentTarget.style.background="none";}}>
          <div className="adm-nav-icon" style={{ background:"#fff1f3", color:"#e11d48" }}><LogoutIcon sx={{ fontSize:16 }}/></div>Sign Out
        </button>
      </div>

      {/* Topbar */}
      <div className="adm-topbar">
        <div className="adm-topbar-left">
          <div className="adm-hamburger" onClick={()=>setSidebarOpen(true)}><MenuIcon sx={{ fontSize:20 }}/></div>
          <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"1.3rem", color:"#1a1f36" }}>
            Med<span style={{ color:"#e11d48" }}>Vault</span>{" "}<span style={{ fontSize:".85rem", color:"#8892b0", fontFamily:"'Outfit',sans-serif", fontWeight:400 }}>Admin</span>
          </Typography>
        </div>
        <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
          {pendingVerif > 0 && <Chip icon={<HourglassTopIcon sx={{ fontSize:14 }}/>} label={`${pendingVerif} pending review`} size="small" onClick={()=>handleNavClick("verifications")} sx={{ cursor:"pointer", background:"#fffbeb", color:"#d97706", border:"1px solid #fcd34d", fontWeight:600, fontSize:".72rem" }}/>}
          <Button startIcon={<LogoutIcon/>} onClick={handleLogout} size="small" sx={{ color:"#e11d48", borderColor:"rgba(225,29,72,.3)", textTransform:"none", borderRadius:2, border:"1px solid", fontFamily:"'Outfit',sans-serif" }}>Logout</Button>
        </Box>
      </div>

      {/* Content */}
      <Box sx={{ p:{ xs:2, md:"36px 44px" }, position:"relative", zIndex:1 }}>
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.28 }}>

            {/* ── DASHBOARD ── */}
            {view==="dashboard" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Admin Dashboard 🛡️</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Full system overview — manage users, appointments & doctor verifications</Typography>
                </Box>
                {pendingVerif > 0 && (
                  <Box onClick={()=>handleNavClick("verifications")} sx={{ cursor:"pointer", mb:3, p:2.5, borderRadius:"16px", background:"linear-gradient(135deg,#fffbeb,#fef3c7)", border:"1.5px solid #fcd34d", display:"flex", alignItems:"center", gap:2, "&:hover":{ transform:"translateY(-2px)", boxShadow:"0 6px 24px rgba(0,0,0,.08)" }, transition:"all .2s" }}>
                    <HourglassTopIcon sx={{ color:"#d97706", fontSize:28, flexShrink:0 }}/>
                    <Box sx={{ flex:1 }}>
                      <Typography sx={{ fontWeight:700, fontSize:".92rem", color:"#1a1f36" }}>{pendingVerif} doctor verification{pendingVerif>1?"s":""} awaiting your review</Typography>
                      <Typography sx={{ fontSize:".78rem", color:"#4a5278", mt:.3 }}>Review NMC registration, Aadhaar, certificates and approve or reject →</Typography>
                    </Box>
                  </Box>
                )}
                <Grid container spacing={2.5} sx={{ mb:4 }}>
                  <Grid item xs={6} sm={3}><StatCard label="Total Users"      value={users.length}        icon="👥" color="#e11d48" delay={0}/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Doctors"          value={doctors.length}      icon="🏥" color="#4f6ef7" delay={60}/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Verified Doctors" value={approvedVerif}       icon="✓"  color="#059669" delay={120}/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Pending Review"   value={pendingVerif}        icon="⏳" color="#d97706" delay={180}/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Patients"         value={patients.length}     icon="🧑" color="#059669" delay={240}/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Appointments"     value={appointments.length} icon="📅" color="#d97706" delay={300}/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Appt Pending"     value={pendingCount}        icon="⏳" color="#d97706" delay={360}/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Appt Approved"    value={approvedCount}       icon="✓"  color="#059669" delay={420}/></Grid>
                </Grid>
                <div className="adm-sec-heading">Recent Users</div>
                {users.slice(0,5).map((u,i)=>(
                  <div key={u.id} className="adm-user-row">
                    <Avatar className={getAv(i)} sx={{ width:38, height:38, borderRadius:"10px", fontSize:".95rem", fontWeight:700, flexShrink:0 }}>{u.username?.charAt(0).toUpperCase()}</Avatar>
                    <Box sx={{ flex:1 }}><Typography sx={{ fontWeight:600, fontSize:".9rem", color:"#1a1f36" }}>{u.username}</Typography><Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>ID #{u.id}</Typography></Box>
                    <Chip label={u.role} size="small" className={roleClass(u.role)} sx={{ border:"1px solid", fontWeight:600, fontSize:".72rem" }}/>
                  </div>
                ))}
              </>
            )}

            {/* ── DOCTOR VERIFICATIONS ── */}
            {view==="verifications" && (
              <>
                <Box sx={{ mb:4 }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Doctor Verifications</Typography>
                  <Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>
                    {pendingVerif} pending · {approvedVerif} approved · {verifications.filter(v=>v.status==="REJECTED").length} rejected
                  </Typography>
                </Box>

                {/* Filter chips */}
                <Box sx={{ display:"flex", gap:1, mb:3, flexWrap:"wrap" }}>
                  {[["ALL","all","#4f6ef7"],["PENDING","pending","#d97706"],["APPROVED","approved","#059669"],["REJECTED","rejected","#e11d48"],["INCOMPLETE","incomplete","#8892b0"]].map(([lbl,val,col])=>(
                    <Chip key={val} label={lbl} size="small" onClick={()=>{}}
                      sx={{ background:"#fff", border:`1px solid ${col}30`, color:col, fontWeight:600, fontSize:".72rem", cursor:"pointer", "&:hover":{ background:`${col}10` } }}/>
                  ))}
                </Box>

                {doctors.length===0 ? (
                  <Box sx={{ textAlign:"center", py:8, color:"#8892b0" }}><Typography sx={{ fontSize:"2.5rem", mb:1 }}>🏥</Typography><Typography sx={{ fontWeight:500 }}>No doctors registered yet.</Typography></Box>
                ) : (
                  doctors.map((doc,i)=>{
                    const verif = verifications.find(v=>v._doctorId===doc.id);
                    const vstatus = verif?.status || "INCOMPLETE";
                    const sc = statusColor(vstatus);
                    const StatusIcon = vstatus==="APPROVED"?VerifiedIcon:vstatus==="PENDING"?HourglassTopIcon:vstatus==="REJECTED"?ErrorOutlineIcon:BadgeIcon;
                    return (
                      <motion.div key={doc.id} whileHover={{ scale:1.005 }}>
                        <div className={`verif-row ${vstatus.toLowerCase()}`}>
                          {/* Avatar */}
                          <Avatar className={getAv(i)} sx={{ width:48, height:48, borderRadius:"14px", fontSize:"1.1rem", fontWeight:700, flexShrink:0 }}>{doc.name?.charAt(0)}</Avatar>

                          {/* Doctor info */}
                          <Box sx={{ flex:1, minWidth:0 }}>
                            <Box sx={{ display:"flex", alignItems:"center", gap:1.5, flexWrap:"wrap" }}>
                              <Typography sx={{ fontWeight:700, fontSize:".95rem", color:"#1a1f36" }}>Dr. {doc.name}</Typography>
                              <Chip label={vstatus} size="small"
                                sx={{ background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`, fontWeight:700, fontSize:".68rem", height:20 }}/>
                            </Box>
                            <Typography sx={{ fontSize:".78rem", color:"#8892b0", mt:.3 }}>{doc.specialization} · {doc.hospital||"No hospital set"}</Typography>
                            {verif?.medicalRegistrationNumber && (
                              <Typography sx={{ fontSize:".75rem", color:"#7c3aed", fontWeight:600, mt:.3, fontFamily:"monospace" }}>
                                Reg: {verif.medicalRegistrationNumber} · {verif.medicalCouncil}
                              </Typography>
                            )}
                            {verif?.submittedAt && <Typography sx={{ fontSize:".72rem", color:"#8892b0", mt:.2 }}>Submitted: {verif.submittedAt}</Typography>}
                            {verif?.adminRemarks && vstatus==="REJECTED" && <Typography sx={{ fontSize:".72rem", color:"#e11d48", mt:.2 }}>Reason: {verif.adminRemarks}</Typography>}
                          </Box>

                          {/* Document count */}
                          <Box sx={{ textAlign:"center", flexShrink:0 }}>
                            {verif && (
                              <>
                                <Typography sx={{ fontSize:"1.2rem", fontWeight:700, color:"#1a1f36", lineHeight:1 }}>
                                  {[verif.aadhaarFile, verif.medicalCertificateFile, verif.degreeFile, verif.idProofFile, verif.photoFile].filter(Boolean).length}/5
                                </Typography>
                                <Typography sx={{ fontSize:".65rem", color:"#8892b0", fontWeight:600, textTransform:"uppercase" }}>Docs</Typography>
                              </>
                            )}
                          </Box>

                          {/* Actions */}
                          <Box sx={{ display:"flex", gap:1, flexShrink:0 }}>
                            <Button variant="outlined" size="small" onClick={()=>openVerifDetail(doc)}
                              sx={{ borderRadius:"10px", textTransform:"none", fontWeight:600, fontSize:".78rem", borderColor:"rgba(79,110,247,.3)", color:"#4f6ef7", "&:hover":{ background:"#eef1fe" } }}>
                              Review Profile
                            </Button>
                            {vstatus==="PENDING" && (
                              <>
                                <Button variant="contained" size="small" onClick={async()=>{ await approveDoctor(doc.id,"Credentials verified"); }}
                                  sx={{ borderRadius:"10px", textTransform:"none", fontWeight:600, fontSize:".78rem", background:"linear-gradient(135deg,#059669,#34d399)", boxShadow:"0 2px 8px rgba(5,150,105,.3)" }}>
                                  ✓ Approve
                                </Button>
                                <Button variant="outlined" size="small" onClick={()=>openVerifDetail(doc)}
                                  sx={{ borderRadius:"10px", textTransform:"none", fontWeight:600, fontSize:".78rem", borderColor:"rgba(225,29,72,.3)", color:"#e11d48", "&:hover":{ background:"#fff1f3" } }}>
                                  ✕ Reject
                                </Button>
                              </>
                            )}
                          </Box>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </>
            )}

            {/* ── USERS ── */}
            {view==="users" && (
              <>
                <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Users</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{users.length} registered accounts</Typography></Box>
                {users.map((u,i)=>(
                  <motion.div key={u.id} whileHover={{ scale:1.005 }}>
                    <div className="adm-user-row">
                      <Avatar className={getAv(i)} sx={{ width:44, height:44, borderRadius:"13px", fontSize:"1.1rem", fontWeight:700, flexShrink:0 }}>{u.username?.charAt(0).toUpperCase()}</Avatar>
                      <Box sx={{ flex:1, minWidth:0 }}>
                        <Typography sx={{ fontWeight:600, fontSize:".92rem", color:"#1a1f36" }}>{u.username}</Typography>
                        <Typography sx={{ fontSize:".75rem", color:"#8892b0" }}>ID #{u.id}</Typography>
                      </Box>
                      <Chip label={u.role} size="small" className={roleClass(u.role)} sx={{ border:"1px solid", fontWeight:600, fontSize:".72rem", flexShrink:0 }}/>
                      {u.role?.toUpperCase()!=="ROLE_ADMIN" && (
                        <Box sx={{ display:"flex", gap:.75, flexShrink:0 }}>
                          {["ROLE_PATIENT","ROLE_DOCTOR"].map(r=>(
                            <Button key={r} size="small" onClick={()=>updateRole(u.id,r)} disabled={u.role===r}
                              sx={{ borderRadius:"8px", textTransform:"none", fontSize:".72rem", fontWeight:600, minWidth:0, px:1.2, py:.5, background:u.role===r?"#f0f2f8":"#f5f7ff", color:u.role===r?"#8892b0":"#4a5278", border:"1px solid #e8ecf5", "&:hover":{ background:"#eef1fe", color:"#4f6ef7" } }}>
                              {r==="ROLE_PATIENT"?"Patient":"Doctor"}
                            </Button>
                          ))}
                        </Box>
                      )}
                      {!u.role?.toUpperCase().includes("ADMIN") && (
                        <IconButton size="small" onClick={()=>deleteUser(u.id)} sx={{ color:"#e11d48", background:"#fff1f3", borderRadius:"9px", "&:hover":{ background:"#fce7f3" }, flexShrink:0 }}>
                          <DeleteIcon sx={{ fontSize:17 }}/>
                        </IconButton>
                      )}
                    </div>
                  </motion.div>
                ))}
              </>
            )}

            {/* ── APPOINTMENTS ── */}
            {view==="appointments" && (
              <>
                <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Appointments</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{appointments.length} total · {pendingCount} pending</Typography></Box>
                {appointments.map(appt=>{
                  const st=(appt.status||"pending").toLowerCase(); const sc=statusColor(appt.status);
                  return (
                    <motion.div key={appt.id} whileHover={{ scale:1.005 }}>
                      <div className={`adm-appt-row ${st}`}>
                        <Typography sx={{ fontSize:".75rem", color:"#8892b0", fontWeight:600, minWidth:36 }}>#{appt.id}</Typography>
                        <Box sx={{ flex:1, minWidth:0 }}><Typography sx={{ fontWeight:600, fontSize:".88rem", color:"#1a1f36" }}>{appt.patient?.name||"N/A"}</Typography><Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>Patient</Typography></Box>
                        <Box sx={{ flex:1, minWidth:0 }}><Typography sx={{ fontWeight:600, fontSize:".88rem", color:"#1a1f36" }}>Dr. {appt.doctor?.name||"N/A"}</Typography><Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>Doctor</Typography></Box>
                        <Box sx={{ textAlign:"center", flexShrink:0 }}><Typography sx={{ fontSize:".82rem", fontWeight:500, color:"#1a1f36" }}>{appt.date||"—"}</Typography><Typography sx={{ fontSize:".74rem", color:"#8892b0" }}>{appt.timeSlot||"—"}</Typography></Box>
                        <Chip label={appt.status||"PENDING"} size="small" sx={{ background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`, fontWeight:600, fontSize:".72rem", flexShrink:0 }}/>
                        <IconButton size="small" onClick={()=>deleteAppointment(appt.id)} sx={{ color:"#e11d48", background:"#fff1f3", borderRadius:"9px", "&:hover":{ background:"#fce7f3" }, flexShrink:0 }}><DeleteIcon sx={{ fontSize:17 }}/></IconButton>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            )}

            {/* ── DOCTORS ── */}
            {view==="doctors" && (
              <>
                <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Doctors</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{doctors.length} registered · {approvedVerif} verified</Typography></Box>
                <Grid container spacing={2.5}>
                  {doctors.map((doc,i)=>{
                    const verif = verifications.find(v=>v._doctorId===doc.id);
                    const vstatus = verif?.status||"INCOMPLETE";
                    const sc = statusColor(vstatus);
                    return (
                      <Grid item xs={12} sm={6} md={4} key={doc.id}>
                        <motion.div whileHover={{ scale:1.02 }}>
                          <Card className="adm-card" sx={{ cursor:"pointer" }} onClick={()=>openVerifDetail(doc)}>
                            <CardContent sx={{ p:"24px !important" }}>
                              <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
                                <Avatar className="av-blue" sx={{ width:50, height:50, borderRadius:"14px", fontSize:"1.2rem", fontWeight:700 }}>{doc.name?.charAt(0)}</Avatar>
                                <Box sx={{ flex:1 }}>
                                  <Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>Dr. {doc.name}</Typography>
                                  <Typography sx={{ fontSize:".75rem", color:"#4f6ef7", fontWeight:500 }}>{doc.specialization}</Typography>
                                </Box>
                                <Chip label={vstatus} size="small" sx={{ background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`, fontWeight:700, fontSize:".68rem" }}/>
                              </Box>
                              <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }}/>
                              <Typography sx={{ fontSize:".8rem", color:"#4a5278", mb:.5 }}>📞 {doc.contact||"—"}</Typography>
                              <Typography sx={{ fontSize:".8rem", color:"#4a5278", mb:1 }}>🏥 {doc.hospital||"—"}</Typography>
                              {verif?.medicalRegistrationNumber && <Typography sx={{ fontSize:".75rem", color:"#7c3aed", fontWeight:600, fontFamily:"monospace" }}>Reg: {verif.medicalRegistrationNumber}</Typography>}
                              <Button fullWidth size="small" variant="outlined" sx={{ mt:1.5, borderRadius:"9px", textTransform:"none", fontWeight:600, fontSize:".78rem", borderColor:"rgba(79,110,247,.25)", color:"#4f6ef7" }}>
                                Review Credentials
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}

            {/* ── PATIENTS ── */}
            {view==="patients" && (
              <>
                <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>Patients</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>{patients.length} registered</Typography></Box>
                <Grid container spacing={2.5}>
                  {patients.map((pt,i)=>(
                    <Grid item xs={12} sm={6} md={4} key={pt.id}>
                      <motion.div whileHover={{ scale:1.02 }}>
                        <Card className="adm-card"><CardContent sx={{ p:"24px !important" }}>
                          <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
                            <Avatar className={getAv(i)} sx={{ width:50, height:50, borderRadius:"14px", fontSize:"1.2rem", fontWeight:700 }}>{pt.name?.charAt(0)}</Avatar>
                            <Box><Typography sx={{ fontWeight:600, fontSize:".95rem", color:"#1a1f36" }}>{pt.name}</Typography><Typography sx={{ fontSize:".75rem", color:"#059669", fontWeight:500 }}>{pt.gender} · Age {pt.age}</Typography></Box>
                          </Box>
                          <Divider sx={{ mb:1.5, borderColor:"#f0f2f8" }}/>
                          <Typography sx={{ fontSize:".8rem", color:"#4a5278", mb:.5 }}>📞 {pt.contact||"—"}</Typography>
                          <Typography sx={{ fontSize:".8rem", color:"#4a5278" }}>🎂 {pt.dob||"—"}</Typography>
                        </CardContent></Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {/* ── SYSTEM / DANGER ZONE ── */}
            {view==="danger" && (
              <>
                <Box sx={{ mb:4 }}><Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:700, color:"#1a1f36" }}>System Settings</Typography><Typography sx={{ color:"#8892b0", fontSize:".875rem", mt:.5 }}>Administrative controls — proceed with caution</Typography></Box>
                <Grid container spacing={2.5} sx={{ mb:4 }}>
                  <Grid item xs={6} sm={3}><StatCard label="Users"        value={users.length}        icon="👥" color="#4f6ef7"/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Doctors"      value={doctors.length}      icon="🏥" color="#4f6ef7"/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Patients"     value={patients.length}     icon="🧑" color="#059669"/></Grid>
                  <Grid item xs={6} sm={3}><StatCard label="Appointments" value={appointments.length} icon="📅" color="#d97706"/></Grid>
                </Grid>
                <div className="adm-danger-box">
                  <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:2 }}>
                    <WarningAmberIcon sx={{ color:"#e11d48", fontSize:26 }}/>
                    <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#e11d48" }}>Danger Zone</Typography>
                  </Box>
                  <Typography sx={{ fontSize:".875rem", color:"#4a5278", mb:3, lineHeight:1.7 }}>The actions below are <strong>irreversible</strong>. Clearing all data will remove every user, doctor, patient, and appointment permanently.</Typography>
                  <Button variant="contained" startIcon={<DeleteIcon/>} onClick={clearAll}
                    sx={{ background:"linear-gradient(135deg,#e11d48,#f43f5e)", borderRadius:"12px", textTransform:"none", fontWeight:700, fontSize:".9rem", boxShadow:"0 4px 16px rgba(225,29,72,.35)", px:3, py:1.2 }}>
                    Clear All Data
                  </Button>
                </div>
              </>
            )}

          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Verify Detail Modal */}
      <VerifDetailModal
        open={verifModal.open}
        record={verifModal.record}
        doctor={verifModal.doctor}
        onClose={()=>setVerifModal({ open:false, record:null, doctor:null })}
        onApprove={approveDoctor}
        onReject={rejectDoctor}
      />

      {/* Confirm Modal */}
      <ConfirmModal open={confirm.open} title={confirm.title} message={confirm.message} danger={confirm.danger} onConfirm={confirm.onConfirm} onCancel={closeConfirm}/>
    </Box>
  );
}
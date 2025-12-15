// import { useEffect, useState } from "react";
// import axios from "axios";
// import socket from "../../Api/Socket";

// const LatestUpdates = () => {
//   const [updates, setUpdates] = useState([]);

//   // Initial load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("/api/latest-updates", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setUpdates(res.data.updates.slice(0, 4)));
//   }, []);

//   // 🔥 REAL-TIME LISTENER
//   useEffect(() => {
//     socket.on("latest-update", (data) => {
//       setUpdates((prev) => [data, ...prev].slice(0, 4));
//     });

//     return () => socket.off("latest-update");
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {updates.map((u, i) => (
//         <div key={i} className="bg-white p-4 rounded shadow">
//           <h3 className="font-semibold">{u.issueTitle}</h3>
//           <p className="text-sm">{u.message}</p>
//           <span className="text-xs text-gray-500">
//             {u.updatedBy} • {new Date(u.date).toLocaleString("bn-BD")}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LatestUpdates;

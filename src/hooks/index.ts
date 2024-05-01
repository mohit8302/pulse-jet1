// import { useEffect, useState } from "react"
// import axios from "axios";
// import { BACKEND_URL } from "../config";




// export const useDashboard = (id) => {
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios.get(`${BACKEND_URL}/api/v1/dash/dashboard`, {
//             headers: {
//                 Authorization: localStorage.getItem("token")
//             }
//         }).then(response => {
//             setLoading(false);
//         })
//     }, [id]);

//     return {
//         loading,
//     };
// };

// export const useModel = () => {
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios.get(`${BACKEND_URL}/api/v1/dash/`, {
//             headers: {
//                 Authorization: localStorage.getItem("token")
//             }
//         }).then(response => {
//             setLoading(false);
//         })
            
//     }, [])
//     return {
//         loading,
//     }

// }
// export const useDashboard2 = () => {
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {
//         axios.get(`${BACKEND_URL}/api/v1/dash/dashboard2`, {
//             headers: {
//                 Authorization: localStorage.getItem("token")
//             }
//         }).then(response => {
//             setLoading(false);
//         })
//     }, [])

//     return {
//         loading
//     }
// }
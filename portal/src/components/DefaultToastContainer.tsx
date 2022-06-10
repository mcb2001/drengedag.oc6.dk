import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DefaultToastContainer = () =>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false} />;
import {Route,Routes, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/Login";
import Teacher from "../pages/Teacher";
import Student from "../pages/Student";

function AppRoutes() {
    const location = useLocation();
  return (
    <>
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Login></Login>}></Route>
                <Route exact path="/Teacher" element={<Teacher></Teacher>}></Route>
                <Route exact path="/Student" element={<Student></Student>}></Route>
            </Routes>
        </AnimatePresence>
    </>
    
  )
}

export default AppRoutes
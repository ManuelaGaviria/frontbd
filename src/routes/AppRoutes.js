import {Route,Routes, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/Login";
import Teacher from "../pages/Teacher";
import Student from "../pages/Student";
import Calificar from "../pages/Calificar";
import Programar from "../pages/Programar";
import Notas from "../pages/Notas";

function AppRoutes() {
    const location = useLocation();
  return (
    <>
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Login></Login>}></Route>
                <Route exact path="/Teacher" element={<Teacher></Teacher>}></Route>
                <Route exact path="/Student" element={<Student></Student>}></Route>
                <Route exact path="/CalificarExamen" element={<Calificar></Calificar>}></Route>
                <Route exact path="/ProgramarClase" element={<Programar></Programar>}></Route>
                <Route exact path="/VerNotas" element={<Notas></Notas>}></Route>
            </Routes>
        </AnimatePresence>
    </>
    
  )
}

export default AppRoutes
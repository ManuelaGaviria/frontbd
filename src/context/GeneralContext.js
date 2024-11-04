import { createContext, useState } from "react";

const GeneralContext = createContext()

export const GeneralProvider = ({children}) => {

    const [password, setPassword] = useState("")
    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const [correo, setCorreo] = useState("")
    const changeCorreo = (e) => {
        setCorreo(e.target.value)
    }

    const [examenOral, setExamenOral] = useState("")
    const changeExamenOral = (e) => {
        setExamenOral(e.target.value)
    }

    const [examenEscrito, setExamenEscrito] = useState("")
    const changeExamenEscrito = (e) => {
        setExamenEscrito(e.target.value)
    }

    const [dniEstudiante, setDniEstudiante] = useState("")
    const changeDniEstudiante = (e) => {
        setDniEstudiante(e.target.value)
    }

    const [fecha, setFecha] = useState("")
    const changeFecha = (e) => {
        setFecha(e.target.value)
    }

    return <GeneralContext.Provider value={{ 
        correo, changeCorreo, 
        password, changePassword,
        examenOral, changeExamenOral,
        examenEscrito, changeExamenEscrito,
        dniEstudiante, changeDniEstudiante,
        fecha, changeFecha
    }}>
        {children}
    </GeneralContext.Provider>
}

export default GeneralContext
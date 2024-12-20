import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import ContenedorForms from '../components/ContenedorForms';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';
import { fetchBody, fetchGet } from '../utils/fetch';
import GeneralContext from '../context/GeneralContext';
import Select from "../components/Select";
import LabelInput from "../components/LabelInput";

function Calificar() {
    const navigate = useNavigate();
    const {examenOral, changeExamenOral, examenEscrito, changeExamenEscrito} = useContext (GeneralContext)

    const [estuSelect, setEstuSelect] = useState([]);
    const [estuSeleccionado, setEstuSeleccionado] = useState("");

    const [examSelect, setExamSelect] = useState([]);
    const [examSeleccionado, setExamSeleccionado] = useState("");

    useEffect(() => {
        const obtenerEstudiantes = async () => {
            try {
                const respuesta = await fetchGet('/usuarios/obtenerEstudiantes');
                if (respuesta.exito) {
                    const estudiantesFormateados = respuesta.listaEst.map(dni => ({
                        nombre: dni,
                        id: dni
                    }));
                    console.log(estudiantesFormateados);
                    setEstuSelect(estudiantesFormateados);

                    const examenesFormateados = respuesta.listaExam.map(numero => ({
                        nombre: numero,
                        id: numero
                    }));
                    setExamSelect(examenesFormateados);

                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: respuesta.error,
                        customClass: {
                            confirmButton: 'btn-color'
                        },
                        buttonsStyling: false
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'Error al procesar la solicitud para listar los estudiantes',
                    customClass: {
                        confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                });
            }
        }
        obtenerEstudiantes();
    }, []);

    const handleChange = (e) => {
        setEstuSeleccionado(e.target.value); // Actualizar el estado con la clase seleccionada
        console.log('Estudiante seleccionado:', e.target.value);
    };

    const handleChangeExam = (e) => {
        setExamSeleccionado(e.target.value); // Actualizar el estado con la clase seleccionada
        console.log('Examen seleccionado:', e.target.value);
    };

    async function validate () {
        if (estuSeleccionado === "" || examSeleccionado === "") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Por favor llena todos los campos",
              customClass: {
                confirmButton: 'btn-color'
              },
              buttonsStyling: false
            });
          } else { 
            const token = localStorage.getItem("token");
    
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const idProf = payload.id;

                const data = {
                  dniEstudiante: estuSeleccionado,
                  numeroExamen: examSeleccionado,
                  notaExamOral: examenOral,
                  cantidadAciertos: examenEscrito,
                  dniProfesor: idProf
                };

                try {
                  const respuesta = await fetchBody('/usuarios/calificar', 'POST', data);
                  if (respuesta.exito) {
                    Swal.fire({
                        icon: "success",
                        title: "Examen calificado con éxito!",
                        customClass: {
                          confirmButton: 'btn-color'
                        },
                        buttonsStyling: false
                      });
                      navigate("/Teacher");
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: 'No se pudo calificar el examen',
                      customClass: {
                        confirmButton: 'btn-color'
                      },
                      buttonsStyling: false
                    });
                  }
                } catch (error) {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'Error al procesar la solicitud para calificar',
                    customClass: {
                      confirmButton: 'btn-color'
                    },
                    buttonsStyling: false
                  });
                }
            } 
          }
    }

  return (
    <motion.div className="login-container"
      initial={{ opacity: 0, x: -1000 }} // Inicia desde la izquierda
      animate={{ opacity: 1, x: 0 }} // Animación hacia la derecha
      exit={{ opacity: 0, x: 1000 }} // Sale hacia la derecha
      transition={{ duration: 1 }}>
      <ContenedorForms>
        <h1>Calificar</h1>
        <div className="InputContainer">
            <Select titulo="Estudiante *" opciones={estuSelect}eventoCambio={handleChange}></Select>
            <Select titulo="Examen *" opciones={examSelect}eventoCambio={handleChangeExam}></Select>
            <LabelInput texto="Nota Examen Oral *" tipo="number" eventoCambio={changeExamenOral}></LabelInput>
            <LabelInput texto="Cantidad Aciertos Examen Escrito (0-10) *" tipo="number" eventoCambio={changeExamenEscrito}></LabelInput>
        </div>
        <br />
        <Button eventoClick={validate} clase="Button">Calificar</Button>

        <ButtonLink destino="/Teacher" clase="Button">Regresar</ButtonLink>
      </ContenedorForms>
    </motion.div>
  );
}

export default Calificar;

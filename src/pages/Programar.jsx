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

function Programar() {
  const navigate = useNavigate();
  const { fecha, changeFecha } = useContext(GeneralContext);

  const [claseSelect, setClaseSelect] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState("");

  const [horaSelect, setHoraSelect] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  useEffect(() => {
    const obtenerEstudiantes = async () => {
      try {
        const respuesta = await fetchGet('/usuarios/obtenerDatosProgramar');
        if (respuesta.exito) {
          const clasesFormateadas = respuesta.listaClases.map(clase => ({
            nombre: clase,
            id: clase
          }));
          setClaseSelect(clasesFormateadas);

          const horasFormateadas = respuesta.listaHoras.map(hora => ({
            nombre: hora,
            id: hora
          }));
          setHoraSelect(horasFormateadas);

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
    setClaseSeleccionada(e.target.value); // Actualizar el estado con la clase seleccionada
    console.log('Clase seleccionada:', e.target.value);
  };

  const handleChangeHora = (e) => {
    setHoraSeleccionada(e.target.value); // Actualizar el estado con la clase seleccionada
    console.log('Hora seleccionada:', e.target.value);
  };

  async function validate() {
    if (claseSeleccionada === "" || horaSeleccionada === "") {
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
        const idUsuario = payload.id;
  
        console.log(`ID del usuario: ${idUsuario}`);
  
        const data = {
          dniEstudiante: idUsuario,
          fechaPrograma: fecha,
          clase: claseSeleccionada,
          hora: horaSeleccionada
        };
        console.log(data);
        try {
          const respuesta = await fetchBody('/usuarios/programar', 'POST', data);
          if (respuesta.exito) {
            Swal.fire({
              icon: "success",
              title: "Clase programada con éxito!",
              customClass: {
                confirmButton: 'btn-color'
              },
              buttonsStyling: false
            });
            navigate("/Student");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: 'No se pudo programar la clase',
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
        <h1>Programar</h1>
        <div className="InputContainer">
          <LabelInput texto="Fecha" tipo="date" eventoCambio={changeFecha}></LabelInput>
          <Select titulo="Clase *" opciones={claseSelect} eventoCambio={handleChange}></Select>
          <Select titulo="Hora *" opciones={horaSelect} eventoCambio={handleChangeHora}></Select>
        </div>
        <br />
        <Button eventoClick={validate} clase="Button">Programar</Button>

        <ButtonLink destino="/Student" clase="Button">Regresar</ButtonLink>
      </ContenedorForms>
    </motion.div>
  );
}

export default Programar;

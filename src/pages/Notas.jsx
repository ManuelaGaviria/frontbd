import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Logo3 from '../components/Logo3';
import { motion } from 'framer-motion';
import FullScreenCard from '../components/FullScreenCard';
import { fetchBody } from '../utils/fetch';
import GeneralContext from '../context/GeneralContext';
import { useContext } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from '../components/Button';
import ContenedorForms from '../components/ContenedorForms';
import ButtonLink from '../components/ButtonLink';
import LabelInputEdit from '../components/LabelInputEdit';
import { useNavigate } from 'react-router-dom';
import SelectEdit from '../components/SelectEdit';

function Notas() {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    listNotas();
  }, []);

  async function listNotas() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const idUsuario = payload.id;
        const respuesta = await fetchBody('/usuarios/listarNotas', 'POST', { dniEstudiante: idUsuario })
        if (respuesta.exito) {
          console.log(respuesta.lista);
          setNotas(respuesta.lista)
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

      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: 'Error al procesar la solicitud para listar las notas',
        customClass: {
          confirmButton: 'btn-color'
        },
        buttonsStyling: false
      });
    }
  }

  return (
    <motion.div
      className='ContainerFull'
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -1000 }}
      transition={{ duration: 1 }}
    >
      <Logo3 />
      <FullScreenCard>
        <div className='CenterTable'>
          <table className='Table'>
            <thead>
              <tr>
                <th style={{ width: '250px' }}>Examen</th>
                <th style={{ width: '250px' }}>Nota Examen Oral</th>
                <th style={{ width: '250px' }}>Nota Examen Escrito</th>
                <th style={{ width: '250px' }}>Promedio</th>
                <th style={{ width: '250px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota) => (
                <tr key={nota.codigo_nota}>
                  <td>{nota.examen}</td>
                  <td>{nota.nota_examen_oral}</td>
                  <td>{nota.nota_examen_escrito}</td>
                  <td>{nota.promedio}</td>
                  <td>{nota.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ButtonLink destino="/Student" clase="ButtonRegresar">Regresar</ButtonLink>
      </FullScreenCard>
    </motion.div>
  );
}

export default Notas;



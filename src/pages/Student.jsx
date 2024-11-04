import Logo2 from '../components/Logo2';
import { motion } from 'framer-motion';
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink';

function Student() {
  return (
    <motion.div
      className='AdminContainer'
      initial={{ opacity: 0, x: 1000 }} // Inicia desde la derecha
      animate={{ opacity: 1, x: 0 }} // Animación hacia la izquierda
      exit={{ opacity: 0, x: -1000 }} // Sale hacia la izquierda
      transition={{ duration: 1 }}>
      <LogoutButton></LogoutButton>
      <div className='logoAdminContainer'>
        <Logo2></Logo2>
      </div>
      <motion.div
        className='contentAdminContainer'
        initial={{ opacity: 0, y: -500 }} // Inicia desde abajo (puedes ajustar la distancia según tus necesidades)
        animate={{ opacity: 1, y: -50 }} // Animación de arriba hacia abajo
        exit={{ opacity: 0, y: 500 }} // Sale hacia abajo
        transition={{ duration: 1 }}
      >
        <div className='ButtonsAdminContainer'>
          <h1>Bienvenido Estudiante</h1>
          <div className=''>
            <ButtonLink destino="/ProgramarClase" clase="Button2">Programar clase</ButtonLink>
            <ButtonLink destino="/VerNotas" clase="Button2">Ver notas</ButtonLink>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Student
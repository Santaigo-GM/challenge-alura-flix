import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";


function RegistrarModal() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    titulo: "",
    categoria: "",
    imagen: "",
    video: "",
    descripcion: ""
  });

  const limpiarForm = () => {
    setValues({
      titulo: "",
      categoria: "",
      imagen: "",
      video: "",
      descripcion: ""
    });
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/videos', values);
      if (res.status === 201) {
        navigate('/home')
      } else {
        alert('Error al registrar el video');
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar el video');
    }
  };

  return (
    <>
      <Header>
        <h1>ShantiFlix</h1>
        <div className="cont-butt">
          <Link className="boton" to="/home">HOME</Link>
          <Link className="boton" to="/registrar">NUEVO VIDEO</Link>
        </div>
      </Header>
      <Component>
        <div className="cont-modal">
          <div className="cont-title">
            <h1>NUEVO VIDEO</h1>
            <p>COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO</p>
          </div>
          <form onSubmit={handleSubmit} className="form-style">
            <h2 className="title-tar">Crear Tarjeta</h2>
            <div className="cont-inputs-uno">
              <div className="cont-texto">
                <label>Título</label>
                <input type="text" placeholder="Ingrese el título" name="titulo" value={values.titulo} onChange={handleChange} />
              </div>
              <div className="cont-texto">
                <label>Categoria</label>
                <select className="select-style" name="categoria" value={values.categoria} onChange={handleChange}>
                  <option value="" disabled>Seleccionar</option>
                  <option value="rock">Rock</option>
                  <option value="metal">Metal</option>
                  <option value="techno">Techno</option>
                </select>
              </div>
            </div>
            <div className="cont-inputs-uno">
              <div className="cont-texto">
                <label>Imagen</label>
                <input type="text" placeholder="Ingrese el título" name="imagen" value={values.imagen} onChange={handleChange} />
              </div>
              <div className="cont-texto">
                <label>Video</label>
                <input type="text" placeholder="Seleccione un Enlace" name="video" value={values.video} onChange={handleChange} />
              </div>
            </div>
            <textarea name="descripcion" placeholder="Descripción" value={values.descripcion} onChange={handleChange}></textarea>
            <div>
              <button className="button-save" type="submit">Guardar</button>
              <button className="button-limp" type="button" onClick={limpiarForm}>Limpiar</button>
            </div>
        </form>
      </div>
    </Component >
    </>
  )
}

const Header = styled.header`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 70px;
  box-shadow: red 0px 3px 5px;
  .cont-butt{
    display: flex;
    gap: 15px;
  }
    .boton{
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 140px;
        height: 32px;
        font-weight: 800;
        background-color: #4e4ef7;
        color: white;
        border-radius: 6px;
        cursor: pointer;
        border: 1px solid white;
        &:hover{
            background-color: #3939fa;
        }
    }
`

const Component = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
    .cont-modal{
      background-color: #000000;
      height: 100%;
      width: 100vw;
    }
    .cont-title{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      h1{
        font-size: 2.5em;
      }
      p{
        margin: 20px 0;
      }
    }
    .form-style{
      padding: 0 100px;
    }
    .title-tar{
      display: flex;
      justify-content: start;
      padding: 15px 0;
      margin: 10px 0;
      border-top: 1px solid white;
      border-bottom: 1px solid white;
    }
    .cont-inputs-uno{
      display: flex;
      gap: 15px;
      margin: 30px 0;
      justify-content: space-between;
    }
    .cont-texto{
      display: flex;
      flex-direction: column;
      flex: 1;
      input{
        height: 40px;
        border-radius: 8px;
        outline-color: orange;
        padding-left: 10px;
      }
    }
    textarea{
      width: 550px;
      height: 200px;
      padding: 20px;
      margin-bottom: 10px;
    }
    .select-style{
      height: 42px;
      border-radius: 5px;
    }
    .button-save{
      padding: 10px 25px;
      margin-right: 10px;
      font-size: 1.05em;
      cursor: pointer;
    }
    .button-limp{
      padding: 10px 25px;
      font-size: 1.05em;
      cursor: pointer;
    }
`

export default RegistrarModal
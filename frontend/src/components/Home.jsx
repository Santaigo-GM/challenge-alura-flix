import styled from "styled-components"
import imagenBat from "../assets/riddler-bw-minimal-art.jpg"
import imagenBack from "../assets/halo_odst_microsoft_image.jpeg"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { GoTrash } from "react-icons/go";
import { AiOutlineEdit } from "react-icons/ai";

function Home() {

    const [videos, setVideos] = useState([])

    const rockVideos = videos.filter(video => video.categoria === 'rock');
    const metalVideos = videos.filter(video => video.categoria === 'metal');
    const technoVideos = videos.filter(video => video.categoria === 'techno');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [idVideo, setIdVideo] = useState(null)
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

    const listarVideos = async () => {
        try {
            const res = await axios.get('http://localhost:3000/videos')
            if (res.data.length > 0) {
                setVideos(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarVideo = async (event, id) => {
        event.preventDefault();
        try {
            const res = await axios.delete(`http://localhost:3000/videos/${id}`)
            if (res.status === 200) {
                alert('video eliminado', id)
                listarVideos();
            } else {
                alert('no se eliminó')
            }
        } catch (error) {
            console.looog(error)
        }
    }

    const getData = (video) => {
        setIdVideo(video.id)
        setValues({
            titulo: video.titulo,
            categoria: video.categoria,
            imagen: video.imagen,
            video: video.video,
            descripcion: video.descripcion
          });
    }

    const actualizarVideo = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3000/videos/${idVideo}`, values)
            if(res.status === 200){
                alert('Video actualiado')
                limpiarForm();
                setIsModalOpen(false);
                listarVideos();
            }else{
                alert('No se actualizó')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarVideos();
    }, [])

    return (
        <>
            <Header>
                <h1>ShantiFlix</h1>
                <div className="cont-butt">
                    <Link className="boton" to="/home">HOME</Link>
                    <Link className="boton" to="/registrar">NUEVO VIDEO</Link>
                </div>
            </Header>
            <Contentprin>
                <div className="cont-principal">
                    <h1 className="title-prin">FRONT END</h1>
                    <div className="cont-text">
                        <h2 className="title-react">Challenge React</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ad, hic enim sed nemo repellendus voluptatum odit ullam obcaecati fugit accusantium rerum, fugiat debitis, vero architecto laborum aliquam quo ut ipsam provident tempore! Minima, iusto iure assumenda a aliquid fugiat quas quis beatae rem amet possimus nisi vero saepe accusantium.</p>
                    </div>
                </div>
                <img src={imagenBat} alt="imagen" />
            </Contentprin>
            <ContentList>
                <div className="cont-list">
                    <h1 className="title-rock">Rock</h1>
                    <div className="cont-videos">
                        {rockVideos.map(video => (
                            <div key={video.id} className="video-style">
                                <a href={video.video} target="_blank" rel="noopener noreferrer">
                                    <img src={video.imagen} alt="imagen" />
                                </a>
                                <div className="cont-buttons">
                                    <button onClick={(event) => { eliminarVideo(event, video.id) }} className="butt-bor" ><GoTrash /> Borrar</button>
                                    <button onClick={()=>{getData(video); setIsModalOpen(true); }} className="butt-edi" ><AiOutlineEdit /> Editar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cont-list">
                    <h1 className="title-metal">Metal</h1>
                    <div className="cont-videos">
                        {metalVideos.map(video => (
                            <div key={video.id} className="video-style">
                                <a href={video.video} target="_blank" rel="noopener noreferrer">
                                    <img src={video.imagen} alt="imagen" />
                                </a>
                                <div className="cont-buttons">
                                    <button onClick={(event) => { eliminarVideo(event, video.id) }} className="butt-bor" ><GoTrash /> Borrar</button>
                                    <button onClick={()=>{getData(video); setIsModalOpen(true); }} className="butt-edi" ><AiOutlineEdit /> Editar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cont-list">
                    <h1 className="title-techno">Techno</h1>
                    <div className="cont-videos">
                        {technoVideos.map(video => (
                            <div key={video.id} className="video-style">
                                <a href={video.video} target="_blank" rel="noopener noreferrer">
                                    <img src={video.imagen} alt="imagen" />
                                </a>
                                <div className="cont-buttons">
                                    <button onClick={(event) => { eliminarVideo(event, video.id) }} className="butt-bor" ><GoTrash /> Borrar</button>
                                    <button onClick={()=>{getData(video); setIsModalOpen(true); }} className="butt-edi" ><AiOutlineEdit /> Editar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ContentList>
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>Formulario en Modal</h2>
                        <form onSubmit={actualizarVideo} >
                            <div className="form-group">
                                <label >Titulo</label>
                                <input type="text" name="titulo" value={values.titulo} required onChange={handleChange} />
                            </div>
                            <select name="categoria" value={values.categoria} onChange={handleChange}>
                                <option value="" disabled selected>Seleccionar</option>
                                <option value="rock">Rock</option>
                                <option value="metal">Metal</option>
                                <option value="techno">Techno</option>
                            </select>
                            <div className="form-group">
                                <label>Imagen</label>
                                <input type="text" name="imagen" required value={values.imagen} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Video</label>
                                <input type="text" name="video" required value={values.video} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <input type="text" name="descripcion" required value={values.descripcion} onChange={handleChange} />
                            </div>
                            <button type="submit">Enviar</button>
                            <button onClick={()=>{setIsModalOpen(false); limpiarForm(); setIdVideo(null); }} type="button">Cerrar</button>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}

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

const Contentprin = styled.div`
    background-image: url(${imagenBack});
    background-size: cover;
    background-position: center;
    height: 700px;
    background-color: blue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cont-principal{
        width: 45vw;
        color: white;
        margin-left: 20px;
    }
    .title-prin{
        display: inline-block;
        padding: 15px;
        background-color: #69c0fa;
        margin-bottom: 20px;
        border-radius: 15px;
        font-size: 2.3em;
    }
    .cont-text{
        h2{
            font-size: 1.8em;
        }
        p{
            font-size: .9em;
        }
    }
    img{
        width: 600px;
        border-radius: 25px;
        margin-right: 20px;
    }
`

const ContentList = styled.div`
    background-color: #3b3b3b;
    padding: 0 20px;
    .cont-list{
        margin-bottom: 30px;
    }
    .title-rock, .title-metal, .title-techno{
        background-color: #b1b1b1;
        display: inline-block;
        width: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        margin-bottom: 10px;
    }
    .title-metal{
        background-color: black;
        color: white;
    }
    .title-techno{
        background-color: #5783fc;
        color: white;
    }
    .cont-videos{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        position: relative;
        gap: 30px;
        height: auto;
        padding: 20px;
    }
    .video-style{
        width: 350px;
        height: 250px;
        display: flex;
        flex-direction: column;
        a{
            height: 195px;
        }
        img{
            background-color: green;
            height: auto;
            width: 350px;
            border-radius: 15px 15px 0 0;
        }
    }
    .cont-buttons{
        display: flex;
        justify-content: center;
        button{
            background-color: black;
            color: white;
            flex: 1;
            padding: 8px 0;
            border: none;
            font-size: 1em;
            cursor: pointer;
            &:hover{
                background-color: #1d1d1d;
            }
        }
        .butt-bor{
            border-radius: 0 0 0 15px;
        }
        .butt-edi{
            border-radius: 0 0 15px 0;
        }
    }
`

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 2em;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 80%;
    .form-group {
        margin-bottom: 1em;
        label {
            display: block;
            margin-bottom: 0.5em;
        }
        input {
            width: 100%;
            padding: 0.5em;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    }
    button {
        padding: 0.5em 1em;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 0.5em;
        &:hover {
            background-color: #0056b3;
        }
        &:last-child {
            background-color: #6c757d;
            &:hover {
                background-color: #5a6268;
            }
        }
    }
`;

export default Home
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapSearchMyLocation from "./MapSearchMyLocation";

export default () => {
  const { id } = useParams();
  const API_URL = "http://localhost:3000/api";
  const redirect = useNavigate();
  const updatePosition = (lat, lon) => {
    setCurrentPosition({ lat, lon });
  };
  const [currentPosition, setCurrentPosition] = useState({
    lat: "",
    lon: "",
  });
  useEffect(() => {
    function obtenerUbicacion() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position);
            },
            (error) => {
              reject(error);
            }
          );
        }
      });
    }

    obtenerUbicacion()
      .then((position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        setCurrentPosition({ lat: latitude, lon: longitude });
        setFormulario({
          ...formulario,
          latitud: latitude,
          longitud: longitude,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const [puntosInteres, setPuntosInteres] = useState({});
  const [actividades, setActividades] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    latitud: "",
    longitud: "",
    ubicacion: "",
    poblacion: "",
    comarca: "",
    temporada_id: "",

  })

  useEffect(() => {
    fetch(`${API_URL}/puntos_interes/${id}`)
      .then((resp) => resp.json())
      .then((data) => setPuntosInteres(data))
      .catch((err) => console.log(err));

    fetch(`${API_URL}/actividades_punto_interes/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setActividades(data.temporadas[0].actividades);
        setTemporadas(data.temporadas);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const credenciales = {
      ...formulario,
      
      latitud: currentPosition.lat,
      longitud: currentPosition.lon,
    };
    const opciones = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
    };
    fetch(`${API_URL}/actividades`, opciones)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          redirect("/PuntInteres/"+id);
        }
      }) 
  }

  return (
    <div className="text-center p-4">
      <h1>Afegir activitat al punto interes {puntosInteres.nombre} </h1>
      <hr className="my-4" />
      <div className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md">
        <form className="flex flex-col space-y-4" onSubmit={(e) => e.onSubmitForm()}>
          <label htmlFor="temporada">Temporada</label>
          <hr className="my-4" />

          <select name="temporada" id="temporada" onInput={(e) => setFormulario({ ...formulario, temporada_id: e.target.value })}>
            <option value="null">Selecciona una temporada</option>
            {temporadas.map((temporada) => (
              <option key={temporada.id} value={temporada.id}>
                {temporada.nombre}
              </option>
            ))}
          </select>
          <br/>
          <label htmlFor="actividad">Actividad</label>
          <hr className="my-4" />
          <label htmlFor="nombre" className="text-left">
            Nombre
          </label>
          <input type="text" name="nombre" id="nombre" onInput={(e) => setFormulario({ ...formulario, nombre: e.target.value })} />
          <label htmlFor="categoria" className="text-left">
            Categoria
          </label>
          <select name="categoria" id="categoria" onInput={(e) => setFormulario({ ...formulario, categoria: e.target.value })}>
            <option value="null">Selecciona una categoria</option>
            <option value="Bici">Bici</option>
            <option value="Senderismo">Senderismo</option>
            <option value="A pie">A pie</option>
            <option value="Paseo en carro">Paseo en carro</option>
          </select>
          <label htmlFor="descripcion" className="text-left">
            Descripción
          </label>
          <input type="text" name="descripcion" id="descripcion" onInput={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}/>
          <div className="">
              {currentPosition.lat && currentPosition.lon ? (
                <MapSearchMyLocation
                  currentPosition={currentPosition}
                  updatePosition={updatePosition}
                />
              ) : null}
            </div>
          <label htmlFor="ubicacion" className="text-left">
            Calle
          </label>
          <input type="text" name="ubicacion" id="ubicacion" onInput={(e) => setFormulario({ ...formulario, ubicacion: e.target.value })}/>
          <label htmlFor="poblacion" className="text-left">
            Población
          </label>
          <input type="text" name="poblacion" id="poblacion" onInput={(e) => setFormulario({ ...formulario, poblacion: e.target.value })} />
          <label htmlFor="comarca" className="text-left">
            Comarca
          </label>
          <input type="text" name="comarca" id="comarca" onInput={(e) => setFormulario({ ...formulario, comarca: e.target.value })} />
          <p onClick={onSubmitForm}>Enviar</p>

          <button onClick={() => redirect(`/PuntInteres/${id}`)}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

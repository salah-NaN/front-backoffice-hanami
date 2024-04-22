import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default () => {
  const { id } = useParams();
  const API_URL = "http://localhost:3000/api";

  const [puntosInteres, setPuntosInteres] = useState({});
  const [actividades, setActividades] = useState([]);
  const [temporadas, setTemporadas] = useState([]);

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

  console.log(temporadas);
  /*

      campos:
        · nombre
        · categoria
        · descripcion

        · ubicacion
        · poblacion
        · comarca


      
    */
  return (
    <div className="text-center p-4">
      <h1>Afegir activitat al punto interes {puntosInteres.nombre} </h1>
      <hr className="my-4" />
      <div className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md">
        <form className="flex flex-col space-y-4">
          <label htmlFor="temporada">Temporada</label>

          <select name="temporada" id="temporada">
            {temporadas.map((temporada) => (
              <option key={temporada.id} value={temporada.id}>
                {temporada.nombre}
              </option>
            ))}
          </select>
          <label htmlFor="nombre" className="text-left">
            Nombre
          </label>
          <input type="text" name="nombre" id="nombre" />
          <label htmlFor="categoria" className="text-left">
            Categoria
          </label>
          <input type="text" name="categoria" id="categoria" />
          <label htmlFor="descripcion" className="text-left">
            Descripción
          </label>
          <input type="text" name="descripcion" id="descripcion" />
          <label htmlFor="ubicacion" className="text-left">
            Calle
          </label>
          <input type="text" name="ubicacion" id="ubicacion" />
          <label htmlFor="poblacion" className="text-left">
            Población
          </label>
          <input type="text" name="poblacion" id="poblacion" />
          <label htmlFor="comarca" className="text-left">
            Comarca
          </label>
          <input type="text" name="comarca" id="comarca" />
        </form>
      </div>
    </div>
  );
};

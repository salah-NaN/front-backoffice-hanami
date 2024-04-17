import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import Contexto from "../Contexto";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export default () => {
  const API_URL = "http://localhost:3000/api";
  const redirect = useNavigate();
  const { loguejat } = useContext(Contexto);
  const [propietario, setPropietario] = useState({});
  const [editableField, setEditableField] = useState(null);

  useEffect(() => {
    if (loguejat && loguejat.propietario_id) {
      fetch(`${API_URL}/propietarios/${loguejat.propietario_id}`)
        .then((resp) => resp.json())
        .then((data) => setPropietario(data))
        .catch((err) => console.log(err));
    }
  }, [loguejat]);

  const handleFieldEdit = (fieldName) => {
    setEditableField(fieldName);
  };

  const handleFieldChange = (e, fieldName) => {
    setPropietario({ ...propietario, [fieldName]: e.target.value });
  };

  const handleFieldSave = async (fieldName) => {
    try {
      const response = await fetch(
        `${API_URL}/propietarios/${loguejat.propietario_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [fieldName]: propietario[fieldName] }),
        }
      );
      if (response.ok) {
        setEditableField(null);
      } else {
        console.error("Error al guardar los cambios");
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-row grid-2 items-center w-full h-16 justify-between p-4 bg-cream-header border-b border-header-border">
        <h1>Mi perfil</h1>
        <button onClick={() => redirect("/Home")}>Volver</button>
      </div>
      <div className="flex flex-col justify-between w-full h-full p-4 bg-cream-header border-b border-header-border">
        <p>
          Nombre:{" "}
          {editableField === "nombre" ? (
            <>
              <input
                type="text"
                value={propietario.nombre}
                onChange={(e) => handleFieldChange(e, "nombre")}
              />
              <SaveIcon onClick={() => handleFieldSave("nombre")} />
            </>
          ) : (
            <>
              {propietario.nombre}
              <EditIcon onClick={() => handleFieldEdit("nombre")} />
            </>
          )}
        </p>
        <p>
          Apellido:{" "}
          {editableField === "apellidos" ? (
            <>
              <input
                type="text"
                value={propietario.apellidos}
                onChange={(e) => handleFieldChange(e, "apellidos")}
              />
              <SaveIcon onClick={() => handleFieldSave("apellidos")} />
            </>
          ) : (
            <>
              {propietario.apellidos}
              <EditIcon onClick={() => handleFieldEdit("apellidos")} />
            </>
          )}
        </p>
        <p>
          Email:{" "}
          {editableField === "email" ? (
            <>
              <input
                type="text"
                value={propietario.email}
                onChange={(e) => handleFieldChange(e, "email")}
              />
              <SaveIcon onClick={() => handleFieldSave("email")} />
            </>
          ) : (
            <>
              {propietario.email}
              <EditIcon onClick={() => handleFieldEdit("email")} />
            </>
          )}
        </p>
        <p>
          Password:{" "}
          {editableField === "password" ? (
            <>
              <input
                type="text"
                value={propietario.password}
                onChange={(e) => handleFieldChange(e, "password")}
              />
              <SaveIcon onClick={() => handleFieldSave("password")} />
            </>
          ) : (
            <>
              {'*****'}
              <EditIcon onClick={() => handleFieldEdit("password")} />
            </>
          )}
        </p>

        {/* Seccion documentacion*/}
      </div>
      <div className="flex flex-col p-4 bg-cream-header border-b border-header-border">
        <p>
          tipo documento:{" "}
          {editableField === "tipo_documento" ? (
            <>
              <select
                value={propietario.tipo_documento}
                onChange={(e) => handleFieldChange(e, "tipo_documento")}
              >
                <option value="DNI">DNI</option>
                <option value="CIF">CIF</option>
                <option value="NIE">NIE</option>
              </select>
              <SaveIcon onClick={() => handleFieldSave("tipo_documento")} />
            </>
          ) : (
            <>
              {propietario.tipo_documento}
              <EditIcon onClick={() => handleFieldEdit("tipo_standard")} />
            </>
          )}
        </p>
        <p>
          numero documento:{" "}
          {editableField === "num_doc" ? (
            <>
              <input
                type="text"
                value={propietario.num_doc}
                onChange={(e) => handleFieldChange(e, "num_doc")}
              />
              <SaveIcon onClick={() => handleFieldSave("num_doc")} />
            </>
          ) : (
            <>
              {propietario.num_doc}
              <EditIcon onClick={() => handleFieldEdit("num_doc")} />
            </>
          )}
        </p>
        <p>
          telefono:{" "}
          {editableField === "telefono" ? (
            <>
              <input
                type="text"
                value={propietario.telefono}
                onChange={(e) => handleFieldChange(e, "telefono")}
              />
              <SaveIcon onClick={() => handleFieldSave("telefono")} />
            </>
          ) : (
            <>
              {propietario.telefono}

              <EditIcon onClick={() => handleFieldEdit("telefono")} />
            </>
          )}
        </p>
        <p>
          entidad:{" "}
          {editableField === "entidad" ? (
            <>
              <input
                type="text"
                value={propietario.entidad}
                onChange={(e) => handleFieldChange(e, "entidad")}
              />
              <SaveIcon onClick={() => handleFieldSave("entidad")} />
            </>
          ) : (
            <>
              {propietario.entidad}
              <EditIcon onClick={() => handleFieldEdit("entidad")} />
            </>
          )}
        </p>

        {/* Seccion ubicacion*/}
      </div>
      <div className="flex flex-col p-4 bg-cream-header border-b border-header-border">
        <p>
          latitud:{" "}
          {editableField === "latitud" ? (
            <>
              <input
                type="text"
                value={propietario.latitud}
                onChange={(e) => handleFieldChange(e, "latitud")}
              />
              <SaveIcon onClick={() => handleFieldSave("latitud")} />
            </>
          ) : (
            <>
              {propietario.latitud}
              <EditIcon onClick={() => handleFieldEdit("latitud")} />  
            </>
          )}
        </p>
        <p>
          longitud:{" "}
          {editableField === "longitud" ? (
            <>
              <input
                type="text"
                value={propietario.longitud}
                onChange={(e) => handleFieldChange(e, "longitud")}
              />
              <SaveIcon onClick={() => handleFieldSave("longitud")} />
            </>
          ) : (
            <>
              {propietario.longitud}
              
              <EditIcon onClick={() => handleFieldEdit("longitud")} />
            </>
          )}
        </p>
        <p>
          ubicacion:{" "}
          {editableField === "ubicacion" ? (
            <>
              <input
                type="text"
                value={propietario.ubicacion}
                onChange={(e) => handleFieldChange(e, "ubicacion")}
              />
              <SaveIcon onClick={() => handleFieldSave("ubicacion")} />
            </>
          ) : (
            <>
              {propietario.ubicacion}
              <EditIcon onClick={() => handleFieldEdit("ubicacion")} />
            </>
          )}
        </p>
        <p>
          poblacion:{" "}
          {editableField === "poblacion" ? (
            <>
              <input
                type="text"
                value={propietario.poblacion}
                onChange={(e) => handleFieldChange(e, "poblacion")}
              />
              <SaveIcon onClick={() => handleFieldSave("poblacion")} />
            </>
          ) : (
            <>
              {propietario.poblacion}
              <EditIcon onClick={() => handleFieldEdit("poblacion")} />
            </>
          )}
        </p>
        <p>
          comarca:{" "}
          {editableField === "comarca" ? (
            <>
              <input
                type="text"
                value={propietario.comarca}
                onChange={(e) => handleFieldChange(e, "comarca")}
              />
              <SaveIcon onClick={() => handleFieldSave("comarca")} />
            </>
          ) : (
            <>
              {propietario.comarca}
              <EditIcon onClick={() => handleFieldEdit("comarca")} />
            </>
          )}
        </p>
      </div>
    </div>
  );
};

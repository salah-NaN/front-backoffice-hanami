import React, { useState, useEffect, useContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Contexto from "../Contexto";
import Cookie from "js-cookie";
import ConfirmationDialog from "./ConfirmationDialog";
import "../App.css";

const API_URL = "http://localhost:3000/api/";

export default function PointsOfInterest() {
  const redirect = useNavigate();
  const { loguejat } = useContext(Contexto);
  const [points, setPoints] = useState([]);
  const [images, setImages] = useState([]);
  const clientId = loguejat?.propietario_id;

  let idActividades = [];

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationStates, setConfirmationStates] = useState({});

  const handleDelete = async () => {
    // logica para eliminar el punto de interés
    try {
      await fetch(`${API_URL}puntos_interes/${pointId}`, {
        method: "DELETE",
      });
      setPoints(points.filter((point) => point.id !== pointId));
    } catch (error) {
      console.error(error);
    }
    // Después de eliminar, cierra la ventana de confirmación
    setShowConfirmation(false);
  };
  const handleDeleteClick = (pointId) => {
    setConfirmationStates((prevState) => ({
      ...prevState,
      [pointId]: true, // Abre el diálogo de confirmación para el punto con el ID pointId
    }));
  };

  const handleCloseConfirmation = (pointId) => {
    setConfirmationStates((prevState) => ({
      ...prevState,
      [pointId]: false, // Cierra el diálogo de confirmación para el punto con el ID pointId
    }));
  };

  useEffect(() => {
    const fetchPoints = async () => {
      if (!clientId) return;

      try {
        fetch(`${API_URL}puntos_interes_propietarios/${clientId}`)
          .then((response) => response.json())
          .then((data) => {
            setPoints(data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoints();
  }, [clientId]);

  const checkTrue = (point) => {};

  useEffect(() => {
    const fetchImagePoints = async () => {
      if (!clientId) return;

      try {
        const imagesData = [];
        for (let i = 0; i < points.length; i++) {
          const response = await fetch(
            `${API_URL}get_images_puntos_interes/${points[i].id}`
          );

          const data = await response.json();
          imagesData.push(data);
        }
        setImages(imagesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImagePoints();
  }, [points]);

  return (
    <div className=" px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 h-full flex w-full justify-center items-center dark:bg-gray-800 p-2">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
        {points.length > 0 ? (
          points.map((point, i) => (
            <div
              key={point.id}
              className="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105"
            >
              <div className="absolute top-4 right-4 rounded-full bg-green-600 text-gray-200  w-7 h-7 text-center">
                <DeleteIcon onClick={() => handleDeleteClick(point.id)} />
                <ConfirmationDialog
                  isOpen={confirmationStates[point.id] || false}
                  onCancel={() => handleCloseConfirmation(point.id)}
                  onConfirm={() => handleDelete(point.id)}
                />
              </div>
              <div
                className="p-2 flex justify-center"
                onClick={() => redirect(`/PuntInteres/${point.id}`)}
              >
                <a>
                  {images[i] ? (
                    <img
                      src={
                        "http://localhost:3000/img/" +
                        images[i].nombre +
                        images[i].tipo
                      }
                      alt={point.titulo}
                      width="200"
                      height="200"
                      className="rounded-lg shadow-md dark:bg-gray-800 w-42 h-40 object-cover object-center"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/200x200"
                      alt={point.titulo}
                      width="200"
                      height="200"
                    />
                  )}
                </a>
              </div>
              <div className="px-4 pb-3">
                <div>
                  <a>
                    <h5 className="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white ">
                      {point.titulo}
                    </h5>
                  </a>

                  <p className="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
                    {point.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading points of interest...</p>
        )}

        <div
          onClick={() => redirect(`/afegirPuntInteres`)}
          className="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105"
        >
          <div className="Add">
            <a>
              <AddIcon
                fontSize="large"
                className=" top-12 right-50 rounded-full bg-green-600 text-gray-200  w-7 h-7 text-center"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

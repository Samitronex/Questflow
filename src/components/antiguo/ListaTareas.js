import React, { useState } from "react";

const ListaTareas = ({ username, role }) => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "") {
      setTareas([...tareas, { id: Date.now(), texto: nuevaTarea, completada: false }]);
      setNuevaTarea("");
    }
  };

  const completarTarea = (id) => {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, completada: true } : t)));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-600 to-pink-500 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">
        ¡Hola, {username}! ({role.name})
      </h1>
      <div className="bg-white text-gray-800 shadow-md rounded p-4">
        <h2 className="text-xl font-bold mb-4">Tus Tareas</h2>
        <ul className="mb-4">
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="flex justify-between items-center mb-2 bg-gray-100 p-2 rounded"
            >
              <span
                className={`mr-4 ${
                  tarea.completada ? "line-through text-gray-500" : ""
                }`}
              >
                {tarea.texto}
              </span>
              {!tarea.completada && (
                <button
                  onClick={() => completarTarea(tarea.id)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Completar
                </button>
              )}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={agregarTarea}
          className="w-full p-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-all"
        >
          Agregar Tarea
        </button>
      </div>
    </div>
  );
};

export default ListaTareas;

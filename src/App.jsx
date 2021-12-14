import React from "react";
import { nanoid } from "nanoid";
import "./App.css";
import logo from "./img.png";

function App() {
  const [tarea, settarea] = React.useState("");
  const [tareas, settareas] = React.useState([]);
  const [tmeditar, Setmeditar] = React.useState(false);
  const [elid, Setelid] = React.useState("");
  const [errorcito, Seterror] = React.useState(null);

  const addtarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      Seterror("Escriba algo por favor");
      console.log("vacio");
      return;
    }
    console.log(tarea);
    settarea("");
    settareas([...tareas, { id: nanoid(5), NombreTarea: tarea }]);
  };

  const eliminar = (id) => {
    const filtro = tareas.filter((item) => item.id !== id);
    settareas(filtro);
  };

  const editar = (item) => {
    settarea(item.NombreTarea);
    Setmeditar(true);
    Setelid(item.id);
  };

  const formeditar = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      Seterror("Escriba algo por favor");
      console.log("vacio");
      return;
    }
    const arrayeditado = tareas.map((item) =>
      item.id === elid ? { id: elid, NombreTarea: tarea } : item
    );
    settareas(arrayeditado);
    Setmeditar(false);
    settarea("");
    Setelid("");

    Seterror(null);
  };

  return (
    <div className="container mt-3 pt-5  text-white rounded  ">
      <h2 className="text-center">
        <img src={logo} height="20%" alt="..." />
        Mis tareas
      </h2>
      <br />
      <div className="row mt-4">
        <div className="col-8">
          <h4 className="tex-center">Lista de Tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">Sin Tareas</li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead"> &nbsp;&nbsp; {item.NombreTarea}</span>
                  <br />

                  <button
                    className="btn btn-danger float-left mx-2 "
                    onClick={(e) => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn  btn-success float-left"
                    onClick={(e) => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="col-4 ">
          <h4 className="text-center">
            {tmeditar ? "Editar tarea" : "Agregar tarea"}
          </h4>
          {errorcito ? <span className="text-danger">{errorcito} </span> : null}
          <form onSubmit={tmeditar ? formeditar : addtarea}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={(e) => settarea(e.target.value)}
              value={tarea}
            />
            {tmeditar ? (
              <button className="btn btn-success btn-block" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-danger btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;

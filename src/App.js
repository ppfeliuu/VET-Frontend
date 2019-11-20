import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import clienteAxios from "./config/axios";

import Pacientes from "./components/Pacientes";
import NuevaCita from "./components/NuevaCita";
import Cita from "./components/Cita";

function App() {
  const [citas, setCitas] = useState([]);
  const [consultar, setConsultar] = useState(true);

  useEffect(() => {
    if (consultar) {
      const consultarAPI = () => {
        clienteAxios
          .get("/pacientes")
          .then(respuesta => {
            // console.log(respuesta.data);
            setCitas(respuesta.data);

            setConsultar(false);
          })
          .catch(error => {
            console.log(error);
          });
      };

      consultarAPI();
    }
  }, [consultar]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Pacientes citas={citas} />} />
        <Route exact path="/nueva" component={() => <NuevaCita setConsultar={setConsultar} />} />
        <Route exact path="/cita/:id" render={(props) => {
            const cita = citas.filter(cita => cita._id === props.match.params.id)
          return  (<Cita cita={cita[0]} setConsultar={setConsultar}/>) }}/>
      </Switch>
    </Router>
  );
}

export default App;

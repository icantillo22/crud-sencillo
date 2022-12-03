import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateEditTask from "./components/create-edit-task";
import TaskList from "./components/task-list";
import config from './config';

export default function HomePage() {

  const [isLoading, setIsLoading] = useState(false);  
  const [listTareasPorHacer, setListTareasPorHacer] = useState([])
  const [listTareasEnProceso, setListTareasEnProceso] = useState([])
  const [listTareasRealizadas, setListTareasRealizadas] = useState([])

  const getTareasPorHacer = async () => {
    setIsLoading(true)

    const req = await fetch(`${config.URL}/tareas/tareas-por-hacer`)
    const res = await req.json()

    const listData = res.data.map(data => ({
      id: data.id,
      title: data.titulo,
      description: data.descripcion
    }));

    
    setListTareasPorHacer(listData)

    setIsLoading(false)
  }

  const getTareasEnProceso = async () => {
    setIsLoading(true)

    const req = await fetch(`${config.URL}/tareas/tareas-en-proceso`)
    const res = await req.json()

    const listData = res.data.map(data => ({
      id: data.id,
      title: data.titulo,
      description: data.descripcion
    }));

    
    setListTareasEnProceso(listData)

    setIsLoading(false)
  }

  const getTareasRealizadas = async () => {
    setIsLoading(true)

    const req = await fetch(`${config.URL}/tareas/tareas-realizadas`)
    const res = await req.json()

    const listData = res.data.map(data => ({
      id: data.id,
      title: data.titulo,
      description: data.descripcion
    }));

    
    setListTareasRealizadas(listData)

    setIsLoading(false)
  }

  useEffect(() => {
    ( async () => {
      await getTareasPorHacer()
      await getTareasEnProceso()
      await getTareasRealizadas()
    })()
  }, [])

  return (
    <div>
      <div className="container-fuild mt-5 px-4" id="error-page">
        <div className="row">
          <div className="col text-center">
            <h1>Gestiona tus tareas</h1>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-between">
            <div>
              ¿Eres fanatico de rick and morty?
              <Link className="btn btn-primary ml-2" to="/rick-and-morty">
                click aquí
              </Link>
            </div>
            <button className="btn btn-primary" data-toggle="modal" data-target="#createTask">
              Nueva tarea
            </button>
          </div>
        </div>

        <div className="row mt-4">

          <div className="col-12 col-md-8 col-lg-4 mt-3">

            <h3>Tareas por hacer</h3>

            <div className="row" style={{ maxHeight: '40rem', overflowY: 'auto' }}>
              {
                isLoading ? 
                ( <span> Cargando... </span> ) :
                <TaskList taskList={listTareasPorHacer} text="Sin tareas por hacer..." type="por-hacer" methods={{getTareasPorHacer, getTareasEnProceso, getTareasRealizadas}} />
              }
            </div>
          </div>

          <div className="col-12 col-md-8 col-lg-4 mt-3">

            <h3>En proceso</h3>

            <div className="row" style={{ maxHeight: '40rem', overflowY: 'auto' }}>
              {
                isLoading ? 
                ( <span> Cargando... </span> ) :
                <TaskList taskList={listTareasEnProceso} text="Sin tareas en proceso..." type="en-proceso" methods={{getTareasPorHacer, getTareasEnProceso, getTareasRealizadas}} />
              }
            </div>
          </div>

          <div className="col-12 col-md-8 col-lg-4 mt-3">

            <h3>Realizadas</h3>

            <div className="row" style={{ maxHeight: '40rem', overflowY: 'auto' }}>
              {
                isLoading ? 
                ( <span> Cargando... </span> ) :
                <TaskList taskList={listTareasRealizadas} text="Sin tareas en realizadas..." type="realizada" methods={{getTareasPorHacer, getTareasEnProceso, getTareasRealizadas}} />
              }
            </div>
          </div>
        </div>
      </div>
      <CreateEditTask id_modal="createTask" methods={ { getTareasPorHacer } } />
    </div>
  );
}
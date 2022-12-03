import React, { useState } from 'react';
import config from '../config';
import CreateEditTask from './create-edit-task';


export default function TaskItem({ task, type, methods }) {

  const [showHistory, setShowHistory] = useState(false);

  const typeCard = () => {
    switch (type) {
      case 'por-hacer':
        return 'border-secondary'

      case 'en-proceso':
        return 'border-warning'
    
      case 'realizada':
        return 'border-success'

      default:
        return 'border-secondary'
    }
  }

  const moveToTareasPorHacer = async () => {
    const req = await fetch(`${config.URL}/tareas/cambiar-estado`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: {id_estado: 1, before: task.id_estado, id_tarea: task.id } }),
      redirect: 'follow'
    })

    await req.json();

    await methods.getTareasPorHacer()
    await methods.getTareasEnProceso()
    await methods.getTareasRealizadas()

  }
  
  const moveToEnProceso = async () => {
    const req = await fetch(`${config.URL}/tareas/cambiar-estado`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: {id_estado: 2, before: task.id_estado, id_tarea: task.id } }),
      redirect: 'follow'
    })

    await req.json();

    await methods.getTareasPorHacer()
    await methods.getTareasEnProceso()
    await methods.getTareasRealizadas()
  }

  const moveToRealizadas = async () => {
    const req = await fetch(`${config.URL}/tareas/cambiar-estado`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: {id_estado: 3, before: task.id_estado, id_tarea: task.id } }),
      redirect: 'follow'
    })

    await req.json();

    await methods.getTareasPorHacer()
    await methods.getTareasEnProceso()
    await methods.getTareasRealizadas()
  }

  const deleteTask = async (id) => {
    const req = await fetch(`${config.URL}/tareas/eliminar`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: {id_tarea: id}}),
      redirect: 'follow'
    })

    await req.json();

    methods.removeTaskOfList()
  }

  // const history = task.history.map( data =>  
  //   <li key={data.date}>
  //     De <strong>{data.before}</strong> pasó a <strong>{data.current}</strong> el <strong>{data.date}</strong>
  //   </li>
  // );

  return (
    <div>
      <div className={`card ${typeCard()} my-3`}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{ task.title }</h5>
            <div className="dropdown mr-1">
              <button type="button" className="btn btn-primary btn-sm dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                Mover a
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                {
                  type === 'por-hacer' && (
                    <div>
                      <span className='dropdown-item' onClick={() => moveToEnProceso()} style={{ cursor: 'pointer' }}>En proceso</span>
                      <span className='dropdown-item' onClick={() => moveToRealizadas()} style={{ cursor: 'pointer' }}>Realizada</span>
                    </div>
                  )
                }
                {
                  type === 'en-proceso' && (
                    <div>
                      <span className='dropdown-item' onClick={() => moveToTareasPorHacer()} style={{ cursor: 'pointer' }}>Tareas por hacer</span>
                      <span className='dropdown-item' onClick={() => moveToRealizadas()} style={{ cursor: 'pointer' }}>Realizada</span>
                    </div>
                  )
                }
                {
                  type === 'realizada' && (
                    <div>
                      <span className='dropdown-item' onClick={() => moveToTareasPorHacer()} style={{ cursor: 'pointer' }}>Tareas por hacer</span>
                      <span className='dropdown-item' onClick={() => moveToEnProceso()} style={{ cursor: 'pointer' }}>En proceso</span>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <p className="card-text">
            { task.description }
          </p>           
          <p>
            <button type="button" className="btn btn-primary btn-sm mr-1" data-toggle="modal" data-target="#editTask">
              Editar
            </button>
            <button onClick={ () => deleteTask(task.id) } type="button" className="btn btn-outline-danger btn-sm ml-1">
              Eliminar
            </button>
          </p>             
          <p className="collapse" id={"collapseHistorial" + task.id.toString()}>
            {/* <ul>{history}</ul>                                       */}
          </p>

          {/* <a data-toggle="collapse" href={"#collapseHistorial" + task.id.toString()} role="button" aria-expanded="false" aria-controls="collapseExample"
            onClick={() => setShowHistory( !showHistory )}
          >
            { showHistory ? '🙈 Ocultar' : '🙊 Mostrar' } historial
          </a> */}
        </div>
      </div>

      <CreateEditTask id={ task.id } id_modal="editTask" methods={methods} />
    </div>
  )
}
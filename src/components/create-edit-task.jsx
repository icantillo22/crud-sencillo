import React, { useEffect, useState } from 'react';
import config from '../config';

export default function CreateEditTask({id, id_modal, methods}) {

  const [dataNewTask, setDataNewTask] = useState({
    title: '',
    description: ''
  })

  const clearData = () => {
    setDataNewTask({title: '', description: ''})
  }

  const createTask = async () => {

    const req = await fetch(`${config.URL}/tareas/crear`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: {...dataNewTask, id_estado: 1}}),
      redirect: 'follow'
    })

    await req.json();
    
    clearData()
    await methods.getTareasPorHacer()

    const btn = document.querySelector('#close-modal')

    btn.click()
  }

  const editTask = async () => {
    const req = await fetch(`${config.URL}/tareas/actualizar`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: { ...dataNewTask, id_tarea: id }}),
      redirect: 'follow'
    })

    await req.json();
    
    clearData()
    const btn = document.querySelector('#close-modal')
    console.log(btn)
    btn.click()
    
    await methods.getTareasPorHacer()
    await methods.getTareasEnProceso()
    await methods.getTareasRealizadas()
  }
  

  return (
    <div className="modal fade" id={id_modal.toString()} tabIndex="-1" aria-labelledby="createEditTask" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              
              {
                !id ? 
                "Creación de tareas" :
                "Editando tarea"
              }
            </h5>
            <button onClick={clearData} type="button" id='close-modal' className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label for="title">Titulo de la tarea</label>
                    <input type="text" className="form-control" id="title" placeholder="Escribe el titulo..." value={dataNewTask.title} onInput={ (e) => setDataNewTask({ ...dataNewTask, title: e.target.value }) } />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label for="title">Descripción de la tarea</label>
                    <textarea className="form-control" id="title" placeholder="Describe que vas a realizar" value={ dataNewTask.description } onInput={ (e) => setDataNewTask({ ...dataNewTask, description: e.target.value }) }></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={clearData} className="btn btn-outline-danger" data-dismiss="modal">Cerrar</button>
            {
              !id ? 
              (<button type="button" onClick={createTask} className="btn btn-primary">Crear tarea</button>):
              (<button type="button" onClick={editTask} className="btn btn-primary">Guardar</button>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
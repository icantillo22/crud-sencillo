import TaskItem from "./task-item";

export default function TaskList({ taskList, text, type, methods }) {

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

  const removeTaskOfList = async () => {
    switch (type) {
      case 'por-hacer':
        await methods.getTareasPorHacer()
        return true

      case 'en-proceso':
        await methods.getTareasEnProceso()
        return true
    
      case 'realizada':
        await methods.getTareasRealizadas()
        return true

      default:
        await methods.getTareasPorHacer()
        return true
    }
  }

  const list = taskList?.map( task => 
    <TaskItem key={task.id} task={task} type={type} methods={ {...methods, removeTaskOfList} } />
  )


  if ( taskList.length <= 0 ) {
    return (
      <div className="col text-center">
        <div className={`card ${typeCard()} my-3`}>
          <div className="card-body">
            <span>{text}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="col">
      {list}
    </div>
  )
}
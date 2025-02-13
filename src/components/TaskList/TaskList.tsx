import TaskItem from '../TaskItem/TaskItem.js'
import { changeDataTask, deleteTask } from '../../http.js'

export default function TaskList({ setIsFetching, setError, fetchTasksByCategories, filter, isFetching, tasks }) {
    async function handleDeleteTask(id) {
        try {
            setIsFetching(true)
            await deleteTask(id)
        } catch (error) {
            setError(error)
        } finally {
            setIsFetching(false)
            await fetchTasksByCategories(filter)
        }
    }

    async function handleChangeDataTask(id, titleTask, isDone) {
        try {
            setIsFetching(true)
            await changeDataTask(id, titleTask, isDone)
        } catch (error) {
            setError(error)
        } finally {
            setIsFetching(false)
            await fetchTasksByCategories(filter)
        }
    }

    console.log(tasks)
    return (
        !isFetching &&
        tasks.map(task => (
            <TaskItem
                key={task.id}
                id={task.id}
                titleTask={task.title}
                isDone={task.isDone}
                onChangeData={handleChangeDataTask}
                onDelete={handleDeleteTask}
            />
        ))
    )
}

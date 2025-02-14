import TaskItem from '../TaskItem/TaskItem.js'
import { changeDataTask, deleteTask } from '../../http.js'
import { FC } from 'react'
import { TasksType } from '../../types/Tasks.js'

type TaskListProps = {
    setIsFetching: (value: boolean) => void
    tasks: TasksType[]
    setError: (value: string) => void
    fetchTasksByCategories: (filter: string) => void
    filter: string
    isFetching: boolean
}

const TaskList: FC<TaskListProps> = ({
    setIsFetching,
    setError,
    fetchTasksByCategories,
    filter,
    isFetching,
    tasks,
}) => {
    const handleDeleteTask = async id => {
        try {
            setIsFetching(true)
            await deleteTask(id)
        } catch (error) {
            setError(error as string)
        } finally {
            setIsFetching(false)
            fetchTasksByCategories(filter)
        }
    }

    const handleChangeDataTask = async (id, titleTask, isDone) => {
        try {
            setIsFetching(true)
            await changeDataTask(id, titleTask, isDone)
        } catch (error) {
            setError(error as string)
        } finally {
            setIsFetching(false)
            fetchTasksByCategories(filter)
        }
    }

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

export default TaskList

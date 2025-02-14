import { ChangeEvent, FC, FormEvent, useState } from 'react'
import classes from './AddTask.module.css'
import { addTask } from '../../http.js'

type AddTaskProps = {
    isFetching: boolean
    setIsFetching: (value: boolean) => void
    setValueInput: (value: string) => void
    fetchTasksByCategories: () => void
    // filter: string
    valueInputTask: string
}

const AddTask: FC<AddTaskProps> = ({
    isFetching,
    setIsFetching,
    setValueInput,
    fetchTasksByCategories,
    // filter,
    valueInputTask,
}) => {
    const [error, setError] = useState('')

    const handleAddTask = async () => {
        try {
            setIsFetching(true)
            await addTask(valueInputTask)
        } catch {
            setError('Ошибка создания задачи!')
        } finally {
            setIsFetching(false)
            setValueInput('')
            fetchTasksByCategories()
        }
    }

    const validation = (): boolean => {
        if (valueInputTask.length < 2) {
            setError('Ошибка валидации! Нельзя создать задачу с количеством символов меньше 2-х.')
            return true
        } else {
            return false
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validation()) {
            handleAddTask()
        }
    }

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.target.value)
    }

    if (error) {
        alert(error)
        setError('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.container}>
                <label htmlFor="input-task"></label>
                <input
                    type="text"
                    id="input-task"
                    placeholder="Task To Be Done..."
                    value={valueInputTask}
                    onChange={e => {
                        handleChangeInput(e)
                    }}
                    maxLength={64}
                    required
                    className={`${classes.input} ${error && classes.error}`}
                />
                <button className={classes.button} disabled={isFetching}>
                    Add
                </button>
            </div>
        </form>
    )
}

export default AddTask

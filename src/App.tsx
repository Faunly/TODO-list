import { useEffect, useState } from 'react'
import { fetchTasksByCategory } from './http.js'

import classes from './App.module.css'
import AddTask from './components/AddTask/AddTask.js'
import CategoriesList from './components/CategoriesList/CategoriesList.js'
import TaskList from './components/TaskList/TaskList.tsx'

const App = () => {
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([''])
    const [error, setError] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [valueInput, setValueInput] = useState('')
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchTasksByCategories('all')
    }, [])

    async function fetchTasksByCategories(filter: string) {
        setIsFetching(true)
        try {
            const todos = await fetchTasksByCategory(filter)
            setTasks(todos.data)
            setCategories(todos.info)
            setFilter(filter)
        } catch (error) {
            setError(error as string)
        } finally {
            setIsFetching(false)
        }
    }

    if (error) {
        console.log('Error fetch!!!')
    }

    return (
        <div className={classes.container}>
            <AddTask
                valueInputTask={valueInput}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
                setValueInput={setValueInput}
                filter={filter}
                fetchTasksByCategories={fetchTasksByCategories}
            />
            <CategoriesList
                isFetching={isFetching}
                categories={categories}
                filter={filter}
                fetchTasksByCategories={fetchTasksByCategories}
            />
            <TaskList
                isFetching={isFetching}
                tasks={tasks}
                fetchTasksByCategories={fetchTasksByCategories}
                setIsFetching={setIsFetching}
                setError={setError}
                filter={filter}
            />
            {isFetching && <h3>Fetching tasks...</h3>}
        </div>
    )
}

export default App

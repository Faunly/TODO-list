import {useEffect, useState} from "react";

import {addTask, changeDataTask, deleteTask, fetchTasksByCategory} from "./http.js";

import classes from "./App.module.css"
import AddTask from "./components/AddTask/AddTask.jsx";
import CategoriesList from "./components/CategoriesList/CategoriesList.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [valueInput, setValueInput] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchTasksByCategories("all");
    }, []);

    async function fetchTasksByCategories(filter) {
        setIsFetching(true);
        try {
            const todos = await fetchTasksByCategory(filter);
            setTasks(todos.data);
            setCategories(todos.info);
            setFilter(filter);
        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }

    if (error) {
        console.log("Error fetch!!!")
    }


    async function handleChangeDataTask(id, titleTask, isDone) {
        setIsFetching(true);
        try {
            await changeDataTask(id, titleTask, isDone);
        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false);
        }
        await fetchTasksByCategories(filter);
    }

    async function handleDeleteTask(id) {
        setIsFetching(true);
        try {
            await deleteTask(id);
        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false);
        }
        await fetchTasksByCategories(filter);
    }

    function handleChangeInput(newValue) {
        setValueInput(newValue);
    }

    return (
        <div className={classes.container}>
            <AddTask
                valueInputTask={valueInput}
                onChangeInput={handleChangeInput}
                setIsFetching={setIsFetching}
                setValueInput={setValueInput}
                filter={filter}
                fetchTasksByCategories={fetchTasksByCategories}
            />
            <CategoriesList
                categories={categories}
                filter={filter}
                fetchTasksByCategories={fetchTasksByCategories}
            />
            <TaskList isFetching={isFetching}
                      tasks={tasks}
                      handleChangeDataTask={handleChangeDataTask}
                      handleDeleteTask={handleDeleteTask}
            />
            {isFetching && <h3>Fetching tasks...</h3>}
        </div>
    );
}

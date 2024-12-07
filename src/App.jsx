import {useState, useEffect} from "react";

import {fetchTodos, fetchTodosByCategory} from "./http.js";
import TasksList from "./components/TasksList/TasksList.jsx";
import CategoriesList from "./components/CategoriesList/CategoriesList.jsx";

import classes from "./App.module.css"
// import InputTask from "./components/InputTask/InputTask.jsx";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState();
    const [isFetching, setIsFetching] = useState(false);
    // const [filter, setFilter] = useState("all");


    useEffect(() => {
        async function fetchTasks() {
            setIsFetching(true);
            try {
                const todos = await fetchTodos()

                setTasks(todos.data);
                setCategories(todos.info);
                setIsFetching(false);
            } catch (error) {
                setError(error);
                setIsFetching(false);
            }
        }

        fetchTasks()
    }, []);

    async function fetchTasksToCategories(title) {
        setIsFetching(true);

        try {
            const resData = await fetchTodosByCategory(title);
            setTasks(resData.data);
            setCategories(resData.info);
            setIsFetching(false);
        } catch (error) {
            setError(error);
            setIsFetching(false);
        }
    }

    if (error) {
        console.log("Error fetch!!!")
    }

    return (
        <>
            <h2>Todolist</h2>
            {isFetching && <h3>Fetching tasks...</h3>}
            <ul className={classes.categoriesList}>
                {Object.entries(categories).map(
                    (info, id) => <CategoriesList
                        key={id}
                        title={info[0]}
                        amount={info[1]}
                        onChangeFilter={fetchTasksToCategories}

                    />
                )}
            </ul>
            {tasks.map(task => <TasksList
                key={task.id}
                titleTask={task.title}
                isDone={task.isDone}/>
            )}
        </>
    );
}
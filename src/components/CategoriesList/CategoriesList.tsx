import classes from './CategoriesList.module.css'
import CategoriesItem from '../CategoriesItem/CategoriesItem.js'
import { FC } from 'react'

type CategoriesListProps = {
    isFetching: boolean
    categories: string[]
    filter: string
    fetchTasksByCategories: (filter: string) => void
}

const CategoriesList: FC<CategoriesListProps> = ({ isFetching, categories, filter, fetchTasksByCategories }) => {
    return (
        !isFetching && (
            <ul className={classes.categoriesList}>
                <CategoriesItem
                    curFilter={filter}
                    meta={{ title: 'Все', filterTitle: 'all' }}
                    amount={Object.values(categories)[0]}
                    onChangeFilter={fetchTasksByCategories}
                />
                <CategoriesItem
                    curFilter={filter}
                    meta={{ title: 'В работе', filterTitle: 'inWork' }}
                    amount={Object.values(categories)[2]}
                    onChangeFilter={fetchTasksByCategories}
                />
                <CategoriesItem
                    curFilter={filter}
                    meta={{ title: 'Сделано', filterTitle: 'completed' }}
                    amount={Object.values(categories)[1]}
                    onChangeFilter={fetchTasksByCategories}
                />
            </ul>
        )
    )
}

export default CategoriesList

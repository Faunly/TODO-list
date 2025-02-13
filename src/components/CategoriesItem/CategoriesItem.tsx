import classes from "./CategoriesItem.module.css"

// eslint-disable-next-line react/prop-types
export default function CategoriesItem({curFilter, meta, amount, onChangeFilter}) {

    return (
        // eslint-disable-next-line react/prop-types
        <li className={`${classes.categoriesItem} ${curFilter === meta.filterTitle && classes.selected}`}
            onClick={() => {
                // eslint-disable-next-line react/prop-types
                onChangeFilter(meta.filterTitle)
            }}>
            {/* eslint-disable-next-line react/prop-types */}
            {`${meta.title} (${amount})`}
        </li>
    );
}
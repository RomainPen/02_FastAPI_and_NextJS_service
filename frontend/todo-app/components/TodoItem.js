import styles from '../styles/Home.module.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={styles.todoItem}>
      <span
        className={`${styles.todoText} ${
          todo.completed ? styles.completed : ''
        }`}
        onClick={() => onToggle(todo.id, todo.completed)}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className={styles.deleteButton}
      >
        Supprimer
      </button>
    </li>
  );
};

export default TodoItem;

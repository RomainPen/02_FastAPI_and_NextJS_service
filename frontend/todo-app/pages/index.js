import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import TodoItem from '../components/TodoItem';
import useTodos from '../hooks/useTodos';

export default function Home() {
  const [newTodo, setNewTodo] = useState('');
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  // Gestion de l'ajout d'un todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const success = await addTodo(newTodo);
    if (success) {
      setNewTodo('');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App Next.js + FastAPI</title>
        <meta name="description" content="Application Todo avec Next.js et FastAPI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Todo List</h1>
        
        <form onSubmit={handleAddTodo} className={styles.form}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Ajouter une nouvelle tâche..."
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Ajouter
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <ul className={styles.todoList}>
            {todos.length === 0 ? (
              <p>Aucune tâche pour le moment</p>
            ) : (
              todos.map((todo) => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onToggle={toggleTodo} 
                  onDelete={deleteTodo} 
                />
              ))
            )}
          </ul>
        )}
      </main>
    </div>
  );
}
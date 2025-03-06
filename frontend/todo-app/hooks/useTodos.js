import { useState, useEffect } from 'react';
import todoService from '../services/api';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les todos au montage du composant
  useEffect(() => {
    fetchTodos();
  }, []);

  // Récupérer tous les todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un nouveau todo
  const addTodo = async (title) => {
    try {
      const newTodo = await todoService.addTodo(title);
      setTodos([...todos, newTodo]);
      return true;
    } catch (err) {
      setError("Erreur lors de l'ajout du todo");
      return false;
    }
  };

  // Changer le statut d'un todo
  const toggleTodo = async (id, completed) => {
    try {
      await todoService.toggleTodo(id, completed);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
      return true;
    } catch (err) {
      setError('Erreur lors de la mise à jour du todo');
      return false;
    }
  };

  // Supprimer un todo
  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      return true;
    } catch (err) {
      setError('Erreur lors de la suppression du todo');
      return false;
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos: fetchTodos
  };
}

export default useTodos;
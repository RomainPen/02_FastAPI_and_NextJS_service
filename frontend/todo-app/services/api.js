// Utiliser la variable d'environnement pour l'URL de l'API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8500/api';

export const todoService = {
  // Récupérer toutes les tâches
  async fetchTodos() {
    try {
      const response = await fetch(`${API_URL}/todos`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error);
      throw error;
    }
  },

  // Ajouter une nouvelle tâche
  async addTodo(title) {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de l'ajout du todo:", error);
      throw error;
    }
  },

  // Mettre à jour le statut d'une tâche
  async toggleTodo(id, completed) {
    try {
      const response = await fetch(`${API_URL}/todos/${id}?completed=${!completed}`, {
        method: 'PUT',
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du todo:', error);
      throw error;
    }
  },

  // Supprimer une tâche
  async deleteTodo(id) {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression du todo:', error);
      throw error;
    }
  }
};

export default todoService;
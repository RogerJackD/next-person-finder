import { usersData } from "../data/user";
import { User } from "../types/user";

export const userService = {
  
  searchUsers: async (searchQuery: string): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!searchQuery.trim()) {
      return [];
    }

    const normalizedQuery = searchQuery.toLowerCase().trim();
    
    // Dividir por espacios para obtener múltiples términos de búsqueda
    const searchTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);

    // Si no hay términos válidos, retornar vacío
    if (searchTerms.length === 0) {
      return [];
    }

    const filteredUsers = usersData.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const reverseName = `${user.lastName} ${user.firstName}`.toLowerCase();

      // Todos los términos deben coincidir en alguna parte del nombre
      return searchTerms.every(term => {
        // Buscar el término en el nombre completo o en orden inverso
        return fullName.includes(term) || reverseName.includes(term);
      });
    });

    return filteredUsers;
  }
};
// import { usersData } from "../data/user";
import { User, UserDetail } from "../types/user";

export const userService = {
  
  // searchUsers: async (searchQuery: string): Promise<User[]> => {
  //   await new Promise(resolve => setTimeout(resolve, 300));

  //   if (!searchQuery.trim()) {
  //     return [];
  //   }

  //   const normalizedQuery = searchQuery.toLowerCase().trim();
    
  //   // Dividir por espacios para obtener múltiples términos de búsqueda
  //   const searchTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);

  //   // Si no hay términos válidos, retornar vacío
  //   if (searchTerms.length === 0) {
  //     return [];
  //   }

  //   const filteredUsers = usersData.filter(user => {
  //     const fullName = `${user.apellidoCompleto} ${user.razonSocial}`.toLowerCase();
  //     const reverseName = `${user.razonSocial} ${user.apellidoCompleto}`.toLowerCase();

  //     // Todos los términos deben coincidir en alguna parte del nombre
  //     return searchTerms.every(term => {
  //       // Buscar el término en el nombre completo o en orden inverso
  //       return fullName.includes(term) || reverseName.includes(term);
  //     });
  //   });

  //   return filteredUsers;
  // },
  
  findUserById: async (id: string): Promise<UserDetail> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if( !response.ok){
          let errorMessage = `Error ${response.status}: ${response.statusText}`
          try {
                const errorData = await response.json();
                //usando mensaje especifico de mi servidor
                errorMessage = errorData.message || errorData;
              } catch {
                console.log("error unexpected, check servers logs");
              }

                throw new Error(errorMessage)
            }
    return response.json()
  },

  async getUsersByTerm(term: string): Promise<User[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/search/${term}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if( !response.ok){
          let errorMessage = `Error ${response.status}: ${response.statusText}`
          try {
                const errorData = await response.json();
                //usando mensaje especifico de mi servidor
                errorMessage = errorData.message || errorData;
              } catch {
                console.log("error unexpected, check servers logs");
              }

                throw new Error(errorMessage)
            }
    return response.json()
  }
};
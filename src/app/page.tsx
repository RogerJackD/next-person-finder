'use client'

import { useCallback, useEffect, useState } from "react";
import { User } from "../types/user";
import { Search, UserCircle } from "lucide-react";
import { userService } from "../services/user-service";

export default function UserSearchDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await userService.searchUsers(query);
      setUsers(results);
    } catch (error) {
      console.error('Error searching users:', error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, handleSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Buscador de Usuarios</h1>
          <p className="text-slate-600">Busca por nombre, apellido o combinaciones</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej: perez, perez tor, juan torres..."
              className="w-full pl-12 pr-4 py-4 text-lg border-b border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                Buscando...
              </div>
            ) : searchQuery && users.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                No se encontraron usuarios
              </div>
            ) : users.length > 0 ? (
              <div>
                <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
                  <p className="text-sm text-slate-600 font-medium">
                    {users.length} {users.length === 1 ? 'resultado' : 'resultados'}
                  </p>
                </div>
                <div className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className="w-full px-4 py-3 hover:bg-blue-50 transition-colors text-left flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <UserCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                Escribe para buscar usuarios
              </div>
            )}
          </div>
        </div>

        {selectedUser && (
          <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 mb-1">Usuario seleccionado:</p>
            <p className="text-lg font-bold text-blue-700">
              {selectedUser.firstName} {selectedUser.lastName} (ID: {selectedUser.id})
            </p>
          </div>
        )} 
      </div>
    </div>
  );
}
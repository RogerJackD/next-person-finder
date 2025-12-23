'use client'

import { useCallback, useEffect, useState } from "react";
import { User, UserDetail } from '../types/user';
import { FileText, Mail, Phone, Search, Tag, UserCircle, X } from "lucide-react";
import { userService } from "../services/user-service";

export default function UserSearchDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailUser, setDetailUser] = useState<UserDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

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

  useEffect(() => {
    if (selectedUser) {
      const fetchUserDetail = async () => {
        setIsLoadingDetail(true);
        const userFound = await userService.findUserById(selectedUser.id);
        setDetailUser(userFound);
        setIsLoadingDetail(false);
      };
      fetchUserDetail();
    }
  }, [selectedUser]);

  const handleClearSelection = () => {
    setSelectedUser(null);
    setDetailUser(null);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar usuario..."
            className="w-full pl-12 pr-4 py-4 text-base bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
        </div>

        {/* Results List */}
        {searchQuery && (
          <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
            {isLoading ? (
              <div className="p-12 flex flex-col items-center justify-center">
                <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm text-neutral-500">Buscando...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center">
                <Search className="w-10 h-10 text-neutral-300 mb-3" />
                <p className="text-sm text-neutral-500">Sin resultados</p>
              </div>
            ) : (
              <div>
                <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100">
                  <p className="text-xs text-neutral-500 font-medium">
                    {users.length} {users.length === 1 ? 'resultado' : 'resultados'}
                  </p>
                </div>
                <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className="w-full px-4 py-3 hover:bg-neutral-50 transition-colors text-left flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-colors">
                        <UserCircle className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-sm font-medium text-neutral-900">
                        {user.firstName} {user.lastName}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* User Detail Card */}
        {detailUser && (
          <div className="border border-neutral-200 rounded-lg p-6 bg-white relative">
            <button
              onClick={handleClearSelection}
              className="absolute top-4 right-4 p-1 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-neutral-500" />
            </button>

            {isLoadingDetail ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{detailUser.nombre}</h3>
                    <p className="text-xs text-neutral-500">ID: {detailUser.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 mb-0.5">Email</p>
                      <p className="text-sm text-neutral-900">{detailUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 mb-0.5">Celular</p>
                      <p className="text-sm text-neutral-900">{detailUser.celular}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 mb-0.5">Documento</p>
                      <p className="text-sm text-neutral-900">{detailUser.documento}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Tag className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 mb-0.5">Tipo</p>
                      <p className="text-sm text-neutral-900">{detailUser.tipo}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
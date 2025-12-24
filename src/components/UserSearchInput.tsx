import { Search, UserCircle } from 'lucide-react';
import { User } from '../types/user';

interface UserSearchInputProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  users: User[];
  isLoading: boolean;
  onUserSelect: (user: User) => void;
  placeholder?: string;
  showResultsCount?: boolean;
}

export function UserSearchInput({
  searchQuery,
  onSearchChange,
  users,
  isLoading,
  onUserSelect,
  placeholder = "Buscar usuario...",
  showResultsCount = true
}: UserSearchInputProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 text-base bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
        />
      </div>

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
              {showResultsCount && (
                <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100">
                  <p className="text-xs text-neutral-500 font-medium">
                    {users.length} {users.length === 1 ? 'resultado' : 'resultados'}
                  </p>
                </div>
              )}
              <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
                {users.map((user) => (
                  <button
                    key={user.idPersona}
                    onClick={() => onUserSelect(user)}
                    className="w-full px-4 py-3 hover:bg-neutral-50 transition-colors text-left flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-colors">
                      <UserCircle className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-neutral-900">
                      {user.apellidoCompleto} {user.razonSocial} -  doc nro: {user.numeroDocumentoIdentidad}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { User, UserDetail } from '../types/user';
import { userService } from '../services/user-service';
import { UserSearchInput } from './UserSearchInput';
import { UserDetailCard } from './UserDetailCard';

interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserSelect?: (user: User, detail: UserDetail | null) => void;
}

export function UserSearchModal({ isOpen, onClose, onUserSelect }: UserSearchModalProps) {
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
      const results = await userService.getUsersByTerm(query);
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
        const userFound = await userService.findUserById(selectedUser.idPersona);
        setDetailUser(userFound);
        setIsLoadingDetail(false);
      };
      fetchUserDetail();
    }
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleConfirm = () => {
    if (selectedUser && detailUser && onUserSelect) {
      onUserSelect(selectedUser, detailUser);
    }
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    setUsers([]);
    setSelectedUser(null);
    setDetailUser(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 shrink-0">
            <h2 className="text-lg font-semibold text-neutral-900">Seleccionar Usuario</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Content - Sin overflow para permitir dropdown absoluto */}
          <div className="flex-1 px-6 pt-6 pb-4 overflow-visible">
            <div className="mb-6">
              <UserSearchInput
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                users={users}
                isLoading={isLoading}
                onUserSelect={handleUserSelect}
                placeholder="Buscar usuario en modal..."
              />
            </div>

            {/* Área de detalles con scroll propio si es necesario */}
            <div className="max-h-[calc(85vh-280px)] overflow-y-auto">
              {detailUser && (
                <UserDetailCard
                  detailUser={detailUser}
                  isLoading={isLoadingDetail}
                  onClose={() => {
                    setSelectedUser(null);
                    setDetailUser(null);
                  }}
                />
              )}
            </div>
          </div>

          {selectedUser && detailUser && (
            <div className="px-6 py-4 border-t border-neutral-200 flex justify-end gap-3 shrink-0">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                Seleccionar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
'use client'

import { useState } from "react";
import { Plus } from "lucide-react";
import { User, UserDetail } from '../types/user';
import { UserSearchInput } from "../components/UserSearchInput";
import { UserDetailCard } from "../components/UserDetailCard";
import { UserSearchModal } from "../components/UserSearchModal";
import { useUserSearch } from "../hook/userUserSearch";

export default function UserSearchDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectedUser, setModalSelectedUser] = useState<{user: User, detail: UserDetail | null} | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    users,
    isLoading,
    setSelectedUser,
    detailUser,
    isLoadingDetail,
    clearSelection
  } = useUserSearch();

  const handleModalUserSelect = (user: User, detail: UserDetail | null) => {
    setModalSelectedUser({ user, detail });
    console.log('Usuario seleccionado desde modal:', user, detail);
  };

  const handleOpenModal = () => {
    // Limpiar búsqueda del primer buscador antes de abrir modal
    setSearchQuery('');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <UserSearchInput
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              users={users}
              isLoading={isLoading}
              onUserSelect={setSelectedUser}
            />
          </div>
          
          <button
            onClick={handleOpenModal}
            className="h-14 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Abrir Modal</span>
          </button>
        </div>

        <div className="space-y-6">
          {detailUser && (
            <UserDetailCard
              detailUser={detailUser}
              isLoading={isLoadingDetail}
              onClose={clearSelection}
            />
          )}

          {modalSelectedUser && (
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-900 mb-2">
                Usuario seleccionado desde modal:
              </p>
              <p className="text-sm text-blue-700">
                {modalSelectedUser.user.razonSocial} {modalSelectedUser.user.apellidoCompleto}, Documento Nro: {modalSelectedUser.user.numeroDocumentoIdentidad}
                {modalSelectedUser.detail && ` ${modalSelectedUser.detail.email}`} 
              </p>
            </div>
          )}
        </div>
      </div>

      <UserSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserSelect={handleModalUserSelect}
      />
    </div>
  );
}
import { UserCircle, Mail, Phone, FileText, Tag, X, LucidePersonStanding } from 'lucide-react';
import { UserDetail } from '../types/user';

interface UserDetailCardProps {
  detailUser: UserDetail | null;
  isLoading: boolean;
  onClose: () => void;
}

export function UserDetailCard({ detailUser, isLoading, onClose }: UserDetailCardProps) {
  if (!detailUser) return null;

  return (
    <div className="border border-neutral-200 rounded-lg p-6 bg-white relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 hover:bg-neutral-100 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-neutral-500" />
      </button>

      {isLoading ? (
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
              <h3 className="font-semibold text-neutral-900">{detailUser.nombre} {detailUser.apellidos}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-xs text-neutral-500 mb-0.5">Email</p>
                <p className="text-sm text-neutral-900">{detailUser.email || 'sin email'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-xs text-neutral-500 mb-0.5">Celular</p>
                <p className="text-sm text-neutral-900">{detailUser.celular || 'sin celular'}</p>
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
                <p className="text-xs text-neutral-500 mb-0.5">Tipo Doc.</p>
                <p className="text-sm text-neutral-900">{detailUser.tipoDocumento}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <LucidePersonStanding className="w-4 h-4 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-xs text-neutral-500 mb-0.5">Tipo Persona</p>
                <p className="text-sm text-neutral-900">{detailUser.tipoPersona}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
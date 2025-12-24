import { useState, useCallback, useEffect } from 'react';
import { User, UserDetail } from '../types/user';
import { userService } from '../services/user-service';

export function useUserSearch() {
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

  const clearSelection = () => {
    setSelectedUser(null);
    setDetailUser(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    users,
    isLoading,
    selectedUser,
    setSelectedUser,
    detailUser,
    isLoadingDetail,
    clearSelection
  };
}
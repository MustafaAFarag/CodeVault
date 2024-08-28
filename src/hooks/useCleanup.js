import { useEffect } from 'react';
import supabase from '../services/supabase';

export const useCleanUp = () => {
  useEffect(() => {
    async function cleanUpOverdueTodos() {
      try {
        await supabase.rpc('delete_overdue_todos');
      } catch (error) {
        console.error('Failed to delete overdue todos:', error.message);
      }
    }

    cleanUpOverdueTodos();
  }, []);
};

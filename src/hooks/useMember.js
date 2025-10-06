import { useContext } from 'react';
import { MemberContext } from '../contexts/FirebaseContext';

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
};

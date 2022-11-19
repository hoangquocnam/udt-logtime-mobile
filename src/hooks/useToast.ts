import { ToastContext } from '../context/toast.context';

import { useContext } from 'react';

export default function useToast() {
  return useContext(ToastContext);
}

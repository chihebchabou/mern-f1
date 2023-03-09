import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import contactReducer from '../features/contacts/contactSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactReducer,
  },
});

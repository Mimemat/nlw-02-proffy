import React from 'react';

import { FavoritesProvider } from './favorites';

export const AppProvider: React.FC = ({ children }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface FavoritesContextData {
  favorites: number[];
  changeFavorites(newFavorites: number[]): void;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const getFavorites = useCallback(async () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        setFavorites(JSON.parse(response));
      }
    });
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);
  const changeFavorites = (newFavorites: number[]) => {
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, changeFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextData =>
  useContext(FavoritesContext);

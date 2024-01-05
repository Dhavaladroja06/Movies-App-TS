import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LikeContextProps {
  likedMovies: string[];
  addLikedMovie: (title: string) => void;
  removeLikedMovie: (title: string) => void;
  isMovieLiked: (title: string) => boolean;
}

const LikeContext = createContext<LikeContextProps | undefined>(undefined);

export const useLikeContext = (): LikeContextProps => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLikeContext must be used within a LikeProvider');
  }
  return context;
};

interface LikeProviderProps {
  children: ReactNode;
}

export const LikeProvider: React.FC<LikeProviderProps> = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState<string[]>([]);

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const storedLikedMovies = await AsyncStorage.getItem('likedMovies');
        if (storedLikedMovies !== null) {
          setLikedMovies(JSON.parse(storedLikedMovies));
        }
      } catch (error) {
        console.error('Error retrieving liked movies:', error);
      }
    };

    fetchLikedMovies();
  }, []);

  const saveLikedMovies = async (movies: string[]) => {
    try {
      await AsyncStorage.setItem('likedMovies', JSON.stringify(movies));
    } catch (error) {
      console.error('Error saving liked movies:', error);
    }
  };

  const addLikedMovie = (title: string) => {
    const updatedLikedMovies = [...likedMovies, title];
    setLikedMovies(updatedLikedMovies);
    saveLikedMovies(updatedLikedMovies);
  };

  const removeLikedMovie = (title: string) => {
    const updatedLikedMovies = likedMovies.filter((movie) => movie !== title);
    setLikedMovies(updatedLikedMovies);
    saveLikedMovies(updatedLikedMovies);
  };

  const isMovieLiked = (title: string) => {
    return likedMovies.includes(title);
  };

  const value: LikeContextProps = {
    likedMovies,
    addLikedMovie,
    removeLikedMovie,
    isMovieLiked,
  };

  return (
    <LikeContext.Provider value={value}>
      {children}
    </LikeContext.Provider>
  );
};

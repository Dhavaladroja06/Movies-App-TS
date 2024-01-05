import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useLikeContext } from "../Context/LikeContext";
import { useTheme } from "../Context/ThemeContext";

interface Movie {
  Title: string;
  Poster: string;
  Year: string;
  Runtime: string;
}

const MoviesScreen: React.FC = () => {
  const { addLikedMovie, isMovieLiked } = useLikeContext();
  const { Theme, toggleTheme } = useTheme();

  const [moviesData, setMoviesData] = useState<Movie[]>([]);

  const Api_URL =
    "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies";

  useEffect(() => {
    fetch(Api_URL)
      .then((response) => response.json())
      .then((data: Movie[]) => setMoviesData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const unlikedMovies = moviesData.filter(
    (movie) => !isMovieLiked(movie.Title)
  );

  const renderMovie = ({ item }: { item: Movie }) => {
    const handleLikePress = () => {
      addLikedMovie(item.Title);
    };

    return (
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.Poster }} style={styles.posterImage} />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{item.Title}</Text>
          <View style={styles.movieInfoinrow}>
            <Text style={styles.movieInfo}>{`Year: ${item.Year}`}</Text>
            <Text style={styles.movieInfo}>{`Runtime: ${item.Runtime}`}</Text>
          </View>
        </View>
        {!isMovieLiked(item.Title) && (
          <TouchableOpacity onPress={handleLikePress} style={styles.likeIcon}>
            <AntDesign name="hearto" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, Theme ? styles.darkMode : null]}>
      <FlatList
        data={unlikedMovies}
        renderItem={renderMovie}
        contentContainerStyle={styles.moviesList}
      />
      <TouchableOpacity onPress={toggleTheme} style={styles.darkModeButton}>
        <Ionicons
          name={Theme ? "sunny-outline" : "moon-outline"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff",
  },
  darkMode: {
    backgroundColor: "#333",
  },
  moviesList: {
    flexGrow: 1,
  },
  movieContainer: {
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  posterImage: {
    marginTop: 5,
    width: 200,
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
  },
  movieDetails: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  movieInfo: {
    fontSize: 14,
    marginBottom: 3,
    padding: 5,
  },
  movieInfoinrow: {
    flexDirection: "row",
  },
  likeIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  darkModeButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#80a0c5",
    borderRadius: 30,
    padding: 10,
  },
});

export default MoviesScreen;

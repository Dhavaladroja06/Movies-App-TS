import React, { useState, useEffect } from "react";
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

const LikeScreen: React.FC = () => {
  const { likedMovies, removeLikedMovie } = useLikeContext();
  const { Theme, toggleTheme } = useTheme();

  const [likedMoviesData, setLikedMoviesData] = useState<Movie[]>([]);

  const Api_URL =
    "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies";

  useEffect(() => {
    fetch(Api_URL)
      .then((response) => response.json())
      .then((data: Movie[]) => {
        const likedMoviesDetails = data.filter((movie) =>
          likedMovies.includes(movie.Title)
        );
        setLikedMoviesData(likedMoviesDetails);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [likedMovies]);

  const handleUnlike = (title: string) => {
    removeLikedMovie(title);
    setLikedMoviesData(
      likedMoviesData.filter((movie) => movie.Title !== title)
    );
  };

  const renderLikedMovie = ({ item }: { item: Movie }) => {
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
        <TouchableOpacity
          onPress={() => handleUnlike(item.Title)}
          style={styles.unlikeIcon}
        >
          <AntDesign name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, Theme ? styles.darkMode : null]}>
      {likedMoviesData.length === 0 ? (
        <Text style={styles.noLikedMoviesText}>No liked movies yet.</Text>
      ) : (
        <FlatList
          data={likedMoviesData}
          renderItem={renderLikedMovie}
          contentContainerStyle={styles.moviesList}
        />
      )}
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
  noLikedMoviesText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  unlikeIcon: {
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
  darkMode: {
    backgroundColor: "#333",
  },
});

export default LikeScreen;

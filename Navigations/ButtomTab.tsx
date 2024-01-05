import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import MoviesScreen from "../Screen/MovieScreen";
import LikeScreen from "../Screen/LikeScreen";

const Tab = createBottomTabNavigator();

const ButtomTabNavigations: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="movie" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={LikeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ButtomTabNavigations;

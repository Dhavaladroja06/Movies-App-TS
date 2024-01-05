import React from "react";
import ButtomTabNavigations from "./Navigations/ButtomTab";
import { LikeProvider } from "./Context/LikeContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <LikeProvider>
          <ButtomTabNavigations />
        </LikeProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;

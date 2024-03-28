import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import VehicleScreen from "./src/screens/VehicleScreen";

import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import useAuthStore from "./src/hooks/useAuth,";
import AddVehicle from "./src/screens/AddVehicle";
import DetailVehicleList from "./src/screens/DetailVehicleList";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { id } = useAuthStore();
  console.log(id);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {id ? (
          <Stack.Group>
            <Stack.Screen name="Home" component={TabNav} />
            <Stack.Screen name="AddVehicle" component={AddVehicle} />
            <Stack.Screen name="VehicleDetail" component={DetailVehicleList} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Vehicle") {
            iconName = focused ? "car" : "car-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Vehicle" component={VehicleScreen} />
    </Tab.Navigator>
  );
};

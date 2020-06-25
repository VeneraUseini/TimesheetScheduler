import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Main from "./auth/Main";
import AddSchedule from "./screens/AddSchedule";
import Schedule from "./screens/Schedule";
import ScheduleDetail from "./screens/ScheduleDetail";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#3740FE",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ title: "Login" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={({ title: "Main" }, { headerLeft: null })}
      />
      <Stack.Screen
        name="AddSchedule"
        component={AddSchedule}
        options={{ title: "Add Schedule" }}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{ title: "Schedule" }}
      />
      <Stack.Screen
        name="ScheduleDetail"
        component={ScheduleDetail}
        options={{ title: "Schedule Details" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

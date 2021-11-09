import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Inicial from "../pages/Inicial";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthStack = createStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Inicial"
        component={Inicial}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;

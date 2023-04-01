import React, { useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animation from "./animation";
import { Image } from "react-native";

export default function Splash() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Animation
        source={require("../../assets/Animation/FHLOGO.json")}
      />
    </SafeAreaView>
  );
}

import { Kanit_700Bold,Kanit_400Regular } from "@expo-google-fonts/kanit";
import { useFonts } from "expo-font";

const loadFonts = async () => {
  await useFonts({
    Kanit_700Bold,
    Kanit_400Regular,
  });
};

export const Fonts = {
  Kanit700: "Kanit_700Bold", // Chỉ truyền tên font, không phải object
  Kanit400: "Kanit_400Regular", // Chỉ truyền tên font, không phải object
};

export default loadFonts;

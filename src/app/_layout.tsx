import { Stack } from "expo-router";

/* No Drawer here any more: AppShell draws its own sidebar and header on every page,
   so this layout only needs to be a plain Stack with its default header switched off. */
export default function PagesLayout() {
  return <Stack screenOptions={{ headerShown: false, animation: "none" }} />;
}
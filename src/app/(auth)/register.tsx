import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";


function Field({ label, ...props }: { label: string } & TextInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.field}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        {...props}
        style={[styles.input, props.multiline && styles.textarea, focused && styles.inputFocused]}
        placeholderTextColor="#98a2b3"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

export default function Register() {
  const [profile, setProfile] = useState<any>(null);
  const [resume, setResume] = useState<any>(null);

  const pickProfile = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!r.canceled) setProfile(r.assets[0]);
  };

  const pickResume = async () => {
    const r = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });
    if (!r.canceled) setResume(r.assets[0]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.header}>
            <ThemedText style={styles.title}>Welcome to IdeaHub</ThemedText>
            <ThemedText style={styles.subtitle}>Create your IdeaHub account</ThemedText>
          </View>

         
          <View style={styles.card}>
            <ThemedText style={styles.section}>Personal Details</ThemedText>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Field label="First Name" placeholder="eg. Kelvin" />
              </View>
              <View style={{ flex: 1 }}>
                <Field label="Last Name" placeholder="eg. Mutinda" />
              </View>
            </View>

            <Field
              label="Email"
              placeholder="eg. kelvin@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Field label="Phone Number" placeholder="+254711188888" keyboardType="phone-pad" />
            <Field label="Occupation" placeholder="eg. Software engineer" />
            <Field
              label="Password"
              placeholder="At least 8 characters"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

         
          <View style={styles.card}>
            <ThemedText style={styles.section}>Your Profile</ThemedText>

            <Field label="Skills" placeholder="eg. React, Node.js, Figma" />
            <Field
              label="Bio"
              placeholder="Describe what you do..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <ThemedText style={styles.label}>Profile Picture</ThemedText>
            <Pressable style={styles.fileBox} onPress={pickProfile}>
              {profile ? (
                <Image source={{ uri: profile.uri }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarEmpty]}>
                  <ThemedText style={styles.plus}>+</ThemedText>
                </View>
              )}
              <ThemedText style={styles.fileText}>
                {profile ? "Change photo" : "Choose a photo"}
              </ThemedText>
            </Pressable>

            <ThemedText style={[styles.label, { marginTop: 14 }]}>Resume</ThemedText>
            <Pressable style={styles.fileBox} onPress={pickResume}>
              <View style={[styles.avatar, styles.avatarEmpty, { borderRadius: 10 }]}>
                <ThemedText style={styles.plus}>{resume ? "✓" : "+"}</ThemedText>
              </View>
              <ThemedText style={styles.fileText} numberOfLines={1}>
                {resume ? resume.name : "Choose a PDF or Word file"}
              </ThemedText>
              {resume && (
                <Pressable onPress={() => setResume(null)} hitSlop={8}>
                  <ThemedText style={styles.remove}>Remove</ThemedText>
                </Pressable>
              )}
            </Pressable>
          </View>

        
          <Pressable
            style={({ pressed }) => [styles.signup, pressed && { opacity: 0.85 }]}
            onPress={() => {}}
          >
            <ThemedText style={styles.signupText}>Sign up</ThemedText>
          </Pressable>

          <ThemedText style={styles.footer}>
            Already have an account? <ThemedText style={styles.link}><Link href="/login" >Log in</Link></ThemedText>
          </ThemedText>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f8" },
  scroll: { padding: 20, paddingBottom: 40, gap: 16, maxWidth: 560, width: "100%", alignSelf: "center" },

  header: { gap: 4, marginTop: 4, backgroundColor: "transparent" },
  title: { fontSize: 26, fontWeight: "800", color: "#101828" },
  subtitle: { fontSize: 15, color: "#667085" },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 4,
    borderWidth: 1,
    borderColor: "#eaecf0",
  },
  section: { color: "#2563eb", fontWeight: "700", fontSize: 16, marginBottom: 8 },

  row: { flexDirection: "row", gap: 12 },
  field: { marginBottom: 10 },
  label: { color: "#344054", fontWeight: "600", fontSize: 14 },

  input: {
    width: "100%",
    height: 46,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderRadius: 10,
    backgroundColor: "#f9fafb",
    color: "black",
    fontSize: 15,
    marginTop: 6,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null),
  },
  inputFocused: { borderColor: "#2563eb", backgroundColor: "white" },
  textarea: { height: 100, paddingTop: 12 },

  fileBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 6,
    padding: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#98a2b3",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
  },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  avatarEmpty: { backgroundColor: "#e0e7ff", alignItems: "center", justifyContent: "center" },
  plus: { fontSize: 22, color: "#2563eb", fontWeight: "700" },
  fileText: { flex: 1, color: "#344054" },
  remove: { color: "#dc2626", fontWeight: "600" },

  signup: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: { color: "white", fontWeight: "700", fontSize: 16 },

  footer: { textAlign: "center", color: "#667085" },
  link: { color: "#2563eb", fontWeight: "700" },
});
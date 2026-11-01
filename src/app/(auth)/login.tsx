import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";
import { StyleSheet, View ,TextInput, Pressable} from "react-native";


export default function Login(){
    return(
       <View style={styles.loginPage}>
        
            <ThemedText style={styles.header}>
                Welcome Back 
            </ThemedText>
             <ThemedText style={styles.header1}>
                Login in to your IdeaHub Account
            </ThemedText>
            <View >
                <ThemedText style={styles.email}>Email</ThemedText>
                <TextInput style={styles.textInput}
                placeholder="eg kelvin@gmail.com"/>
                <ThemedText style={styles.email}>Password</ThemedText>
                <TextInput style={styles.textInput}
                placeholder="Enter your password"/>
            </View>
            <Pressable style={styles.signin}>
                <ThemedText style={styles.signin1}>Sign In </ThemedText>
            </Pressable>
            <View>
                <ThemedText style={styles.reg}>Don't Have an Account <ThemedText><Link href="/register" style={styles.a}>Register</Link></ThemedText></ThemedText>
            </View>

       </View>
        
    )
}
const styles=StyleSheet.create({
    reg:{
        margin:20,
        fontWeight:300,

    },
    a:{
        textDecorationColor:"none",
    },
    loginPage:{
        flex:1,
        margin:20,
        marginTop:100,
        backgroundColor:"white",
        borderRadius:10,
        padding:6,
        textAlign:"center",
        height:350,
    },
    header:{
        fontSize:30,
        fontWeight:"bold",
        fontFamily:"inherit",
        padding:15,
    },
    header1:{
        marginLeft:20,
        fontWeight:400,
    },
    textInput:{
        borderWidth:1,
         borderColor: "#d0d5dd",
        width:"95%",
        height:40,
        margin:10,
        borderRadius:8,
        backgroundColor: "#f9fafb",
        padding:10,
        fontWeight:400,
    },
    email:{
        margin:10,
    },
    signin:{
        backgroundColor:"blue",
        width:"95%",
        borderRadius:10,
        textAlign:"center",
        height:40,
        margin:10,
        
        
    },
    signin1:{
        color:"white",
        textAlign:"center",
        padding:5,
    }

 })
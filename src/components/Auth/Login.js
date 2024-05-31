import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [confirm, setConfirm] = useState(null);
    const navigation = useNavigation();

    const signInWithPhoneNumber = async () => {
        try {
            const phoneRegex = /$/;
            if (!phoneRegex.test(phoneNumber)) {
                alert("Invalid phone Number ");
                return;
            }
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            alert("Error sending code");
            console.log("error", error);
        }
    };

    const confirmCode = async () => {
        try {
            if (!code || code.length != 6) {
                alert("Invalid code");
                return;
            }
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;

            const userDocument = await firestore()
                .collection("users")
                .doc(user.uid)
                .get();

            if (userDocument.exists) {
                navigation.navigate("Dashboard");
            } else {
                navigation.navigate("Detail", { uid: user.uid });
            }
        } catch (error) {
            alert("invalid code");
            console.log("invalid", error);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#000",
                position: 'relative'
            }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#000",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "25%",

                }}
            />
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#ADD8E6",
                    borderTopLeftRadius: 100,
                    position: "absolute",
                    top: "25%",
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Text
                    style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        marginBottom: 40,
                        marginTop: 20,
                        textAlign: 'center',
                    }}
                >
                    Puru Chat App
                </Text>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 30
                    }}>
                    <Image
                        source={require("../../../assets/dp.jpg")}
                        style={{
                            width: 150, height: 150, borderRadius: 50
                        }} />
                </View>
                {!confirm ? (
                    <>
                        <Text
                            style={{
                                marginBottom: 20,
                                fontSize: 18,
                                color: "#808080",
                            }}>
                            Enter phone nummber
                        </Text>
                        <TextInput
                            style={{
                                height: 50,
                                width: "100%",
                                borderColor: "black",
                                borderWidth: 1,
                                marginBottom: 30,
                                paddingHorizontal: 16,
                                borderRadius: 10,
                            }}
                            placeholder='eg. +03 3636363636'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType='phone-pad'
                        />
                        <TouchableOpacity

                            onPress={signInWithPhoneNumber}

                            style={{

                                backgroundColor: "#007BFF",

                                padding: 10,

                                borderRadius: 5,

                                marginBottom: 20,

                                alignItems: "center",

                            }}
                        >
                            <Text
                                style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
                                Verify Phone Number
                            </Text>
                        </TouchableOpacity>
                    </>

                ) : (
                    <>
                        <Text
                            style={{

                                marginBottom: 20,

                                fontSize: 18,

                                color: "#808080",

                            }}>

                            Enter the code sent to your phone:

                        </Text>

                        <TextInput

                            style={{
                                height: 50,
                                width: "100%",
                                borderColor: "black",
                                borderWidth: 1,
                                marginBottom: 30,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                            }}
                            placeholder="Enter code"
                            value={code}
                            onChangeText={setCode}
                            keyboardType="phone-pad"
                        />
                        <TouchableOpacity
                            onPress={confirmCode}
                            style={{
                                backgroundColor: "#007BFF",
                                padding: 10,
                                borderRadius: 5,
                                marginBottom: 20,
                                alignItems: "center",
                            }}
                          >
                                <Text
                                    style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
                                >Confirm Code </Text>
                            </TouchableOpacity>
            </>)}
            </View>
            </View>
    );

}
 
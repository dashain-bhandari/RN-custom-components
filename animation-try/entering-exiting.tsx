
import { StyleSheet, Text, View, Image, Easing, Dimensions, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import StyledButton from '@/styled/StyledButton'
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Keyframe } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { colors } from '@/utils/data/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { height } = Dimensions.get("screen")

const RiderRequestItem = ({ item, }: any) => {

    const enteringAnimation = new Keyframe({
        0: {
            transform: [{ translateY: height }],
        },

        100: {
            transform: [{ translateY: 0 }],
        },
    }).duration(400);

    const translateY = useSharedValue(height)



    // call the exiting animation after certain duration

     const viewTranslateX = useSharedValue(0);
    const viewHeight=useSharedValue(0)

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 500 });
        setTimeout(() => {
            viewTranslateX.value = withTiming(-400, { duration: 600 })
        }, 60000);
    }, [])

    const exitingAnimation = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: viewTranslateX.value
            }],
            height:viewTranslateX?.value==(-400) ?0:"auto",
            opacity:viewTranslateX?.value==(-400)?0:1,
            marginBottom:viewTranslateX?.value==(-400)?0:10,
        }
    })
    const translateX = useSharedValue(0);
    const animatedButtonColor = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value
            }]
        }
    })

    useEffect(() => {
        translateX.value = withTiming(-174, { duration: 60000 })
    }, [])

    const onDecline = () => {
        viewTranslateX.value = withTiming(-400, { duration: 600 })
    }
    const onAccept = () => {
        viewTranslateX.value = withTiming(-400, { duration: 600 })
    }

    return (
        <Animated.View style={[exitingAnimation,{marginBottom:10}]}>
            <Animated.View
                entering={enteringAnimation}

                style={[styles.container,]}>

                {/* name,time,profile */}
                <View style={styles.infoContainer}>
                    {/* name,profile */}
                    <View style={styles.infoflexContainer}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden", marginRight: 10, backgroundColor: colors.primary[200] }}>
                            <Image source={item.avatar} style={{ width: 40, height: 40 }} resizeMode='contain'></Image>
                        </View>
                        <View>
                            {/* name and no of rides */}
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ marginRight: 5 }} >{item?.name}</Text>
                                <View style={{ marginRight: 5 }}>
                                    <FontAwesome name="star" size={20} color={colors.secondary[400]} />
                                </View>
                                <Text style={{ marginRight: 5 }}>4.78</Text>
                                <Text style={{ color: "#555" }}>(432 rides)</Text>
                            </View>
                            {/* bike name */}
                            <Text>Motor bike bajaj</Text>
                        </View>
                    </View>
                    {/* time */}
                    <View>
                        <Text style={{ fontWeight: 600 }}>4 min.</Text>
                        <Text style={{ fontWeight: 600 }}>1 km</Text>
                    </View>

                </View>
                {/* price */}
                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: 600, fontSize: 26, color: "#444" }}>रु </Text>
                    <Text style={{ fontWeight: 700, fontSize: 30 }}>92</Text>
                </View>
                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <View style={{ width: "48%", marginRight: "4%", height: "100%" }}>
                        <TouchableOpacity style={{ padding: 10, backgroundColor: "#eee", borderRadius: 10 }} onPress={onDecline}>
                            <Text style={{ textAlign: "center" }}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                    {/* accept container */}

                    <View style={styles.acceptContainer}>

                        <Animated.View pointerEvents='none' style={[styles.absoluteOverlayOnAcceptButton, animatedButtonColor]}></Animated.View>
                        <TouchableOpacity
                            onPress={onAccept}
                            style={styles.acceptTouchable}>
                            <Text style={{ textAlign: "center", color: "#fff" }}>Accept</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    )
}

export default RiderRequestItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 16
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    infoflexContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        flex: 1,
        // backgroundColor:"red",


    },

    acceptContainer: { backgroundColor: colors.primary[800], width: "48%", borderRadius: 10, position: "relative", height: "100%", overflow: "hidden" },
    absoluteOverlayOnAcceptButton: { width: "100%", height: "100%", backgroundColor: colors.primary[500], position: "absolute", },
    acceptTouchable: {
        position: "absolute", zIndex: 1, padding: 10, width: "100%", borderRadius: 10, justifyContent: "center",
    }
})
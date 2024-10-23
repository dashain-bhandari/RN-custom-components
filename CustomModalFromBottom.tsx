import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

interface BottomModalProps {
    modalVisible: boolean
    children: React.ReactNode
}
const { height, width } = Dimensions.get("screen");

const BottomModal = ({ modalVisible, children }: BottomModalProps) => {

    const translateY = useSharedValue(0);

    const animatedModalStyles = useAnimatedStyle(() => {

        return {
            transform: [{
                translateY: translateY.value
            }]
        }
    })

    useEffect(() => {
        if (modalVisible) {
            translateY.value = withTiming(-height / 2.5, { duration: 500 })
        }
        else {
            translateY.value = withTiming(0, { duration: 500 })
        }
    }, [modalVisible])


    const opacity = useSharedValue(0);

    const animatedOverlayStyles = useAnimatedStyle(() => {

        return {
            opacity: opacity.value
        }
    })

    useEffect(() => {
        if (modalVisible) {
            
            opacity.value = withTiming(0.5, { duration: 500 })
        }
        else {
            opacity.value = withTiming(0, { duration: 500 })
        }
    }, [modalVisible])
    return (
        <>
            <Animated.View style={[animatedModalStyles, styles.modal,]}>
                {children}
            </Animated.View>
            <Animated.View
                pointerEvents={modalVisible ? "auto" : "none"}
                style={[{ flex: 1, position: "absolute", top: 0, width, height, zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', }, animatedOverlayStyles]}>
            </Animated.View>
        </>

    )
}

export default BottomModal

const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        flex: 1,
        top: height,
        backgroundColor: "#fff",
        height: height,
        width: width,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 2

    }
})
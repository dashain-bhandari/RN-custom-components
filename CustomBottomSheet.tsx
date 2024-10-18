import { Dimensions, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { FlatList, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get("screen");

const CustomBottomSheet = forwardRef((props: { children: React.ReactNode }, ref) => {

    const translateY = useSharedValue(0);

    const context = useSharedValue({ y: 0 });

    const gesture = Gesture.Pan().onStart(() => {
        context.value = {
            y: translateY.value
        }
    }).onUpdate((event) => {
        console.log(event.translationY)//event chai starting position bata suru hucnha so 1.5 ma yo 0 huncha, but context le grda bottom ma 0 banaucha translateY ko value
        translateY.value = event.translationY + context.value.y


        if (event.translationY < 0) {
            translateY.value = withTiming(-0.8 * height)
        }
        if (event.translationY > 0) {
            translateY.value = withTiming(-height / 3)
        }
    });

    useEffect(() => {
        translateY.value = withTiming(-height /3, { duration: 500 })
    }, []);

    const animatedSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value
                }
            ]
        }
    });

    useImperativeHandle(ref, () => ({
        setTranslateY: () => {
            translateY.value = withTiming(-0.8 * height, { duration: 500 })
        }
    }))

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.container, animatedSheetStyle]}>
                <View style={styles.line}>
                </View>
                {
                    props.children
                }

            </Animated.View>
        </GestureDetector>

    )
})

export default CustomBottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        backgroundColor: "#fff",
        height: height,
        top: height,//so that bottom 0 ma suru huncha top pugda translatey ko value -height huncha thyakka
        width: width,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: "#bbb",
        marginVertical: 15,
        borderRadius: 2,
        alignSelf: "center"
    }

})
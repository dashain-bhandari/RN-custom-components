import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface ButtonProps{
    title:string
    buttonStyles?:StyleProp<ViewStyle>
    textStyles?:StyleProp<TextStyle>
}

const StyledButton = ({title,buttonStyles,textStyles}:ButtonProps) => {
    return (
        <TouchableOpacity style={[styles.defaultButtonStyle,buttonStyles]}>
            <Text style={[styles.defaultTextStyle,textStyles]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default StyledButton

const styles = StyleSheet.create({
    defaultButtonStyle:{
        padding:10,
        backgroundColor:"#ccc",
        borderRadius:10
    },
    defaultTextStyle:{
        textAlign:"center"
    }
})
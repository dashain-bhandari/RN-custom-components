import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { TouchableOpacity } from 'react-native';

interface SelectDropDownProps {
    listOptions: string[] | number[],
    display: "flex" | "none",
    dropdownContainerStyle?: StyleProp<ViewStyle>,
    dropdownItemStyle?: StyleProp<ViewStyle>,
    selectedItem: string | number,
    onSelect: Dispatch<SetStateAction<string | number>>,
    selectedItemColor?: string
}

const SelectDropdown = ({ listOptions, display, dropdownContainerStyle, dropdownItemStyle, onSelect, selectedItem, selectedItemColor }: SelectDropDownProps) => {

    return (
        <View style={[styles.dropdownContainer, { display: display }, dropdownContainerStyle]}>
            {listOptions.map((item: string | number, index: number) => {
                return (<TouchableOpacity key={index}
                    style={[styles.dropdownItem, dropdownItemStyle, { backgroundColor: item == selectedItem ? selectedItemColor ?? "#eee" : "#fff" }]}
                    onPress={() => onSelect(item)}
                ><Text>{item}</Text></TouchableOpacity>)
            })}
        </View>
    )
}

export default SelectDropdown

const styles = StyleSheet.create({
    dropdownContainer: {

        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 2,
        shadowOpacity: 0.3,
        backgroundColor: "#fff",
        paddingBottom: 15,

    },
    dropdownItem: {
        paddingVertical: 10,
        paddingLeft: 10,
        width: "100%",


    }
})
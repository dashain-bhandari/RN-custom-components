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
    setDisplay: Dispatch<SetStateAction<"flex" | "none">>,
}

const SelectDropdown = ({ listOptions, display, dropdownContainerStyle, dropdownItemStyle, onSelect, selectedItem, selectedItemColor, setDisplay }: SelectDropDownProps) => {

    return (
        <View style={[styles.dropdownContainer, { display: display }, dropdownContainerStyle]}>
            {listOptions.map((item: string | number, index: number) => {
                return (<TouchableOpacity key={index}
                    style={[styles.dropdownItem, dropdownItemStyle, { backgroundColor: item == selectedItem ? selectedItemColor ?? "#eee" : "#fff" }]}
                    onPress={() => {
                        onSelect(item);
                        setDisplay("none")
                    }}
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
            height: 7,
        },
        shadowRadius: 2,
        shadowOpacity: 0.3,
        backgroundColor: "#fff",


    },
    dropdownItem: {
        paddingVertical: 10,
        paddingLeft: 10,
        width: "100%",


    }
})
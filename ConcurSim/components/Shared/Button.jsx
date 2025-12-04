import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

export default function Button({ text, type = "fill", onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{
            padding: 15,
            width: '100%',
            borderRadius: 10,
            marginTop: 10,
            borderWidth: 1,
            borderColor: Colors.Blue,
            backgroundColor: type == 'fill' ? Colors.Blue : Colors.White

        }}>
            <Text style={{
                textAlign: 'center',
                fontSize: 15,
                borderRadius: 10,
                color: type == 'fill' ? Colors.White : Colors.Blue
            }}>{text}</Text>
        </TouchableOpacity>
    )
}
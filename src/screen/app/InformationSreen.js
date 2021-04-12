import React from 'react';
import {View, Text} from 'react-native';

export default function InformationScreen({navigation}){
    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>App info</Text>
            </View>
        </>
    );
}
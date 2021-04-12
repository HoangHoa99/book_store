import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

export default function BookDetailScreen({route, navigation}){

    const [bookItem, setBook] = useState([]);

    useEffect(() => {
        let { book } = route.params;
        setBook(book);
    }, [bookItem]);

    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{bookItem.id}</Text>
                <Text>{bookItem.name}</Text>
                <Text>{bookItem.image}</Text>
                <Text>{bookItem.rating}</Text>
            </View>
        </>
    );
}
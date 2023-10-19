import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNaviagation } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { storeItem } from '../Redux/actions'
import { useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native"
import {deleteItem} from '../Redux/actions'

function Home({ navigation }) {
    const [forceUpdate, setForceUpdate] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.addItemsReducer.allNotes)
    console.log("showing data from note home page", data)

    useFocusEffect(
        React.useCallback(() => {
            storageData()
        }, [])
    );



    const storageData = async () => {
        try {
            const response = await AsyncStorage.getItem("notesData")
            let newData = JSON.parse(response);
            if (newData !== null) {
                dispatch(storeItem(newData))
            }
        } catch (error) {
            console.log("show error from async storage", error)
        }
    }


    const handleOnpress = () => {
        navigation.navigate('Create')
    }


    const handleDelete = (itemId) => {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        // Dispatch the action to delete the item
                        dispatch(deleteItem(itemId));
                        console.log("item id for delete in home screen :", itemId)
                    },
                },
            ],
            { cancelable: true }
            );
            // setForceUpdate(prevState => !prevState);    
    }



    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Budget entry listing</Text> */}
            <View style={{ marginBottom: 20 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(({ item }) => {
                        return (
                            <TouchableOpacity>
                                <View style={styles.item_container}>
                                    <Text style={{ fontSize: 20, fontWeight: 900 }}>{item.title}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: 100 }}>Planned amount  : {item.discription}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: 100 }}>actual amount     : {item.actualAmount}</Text>
                                    {/* <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDelete(item.id)}
                                    >
                                        <Text style={{ color: 'black' }}>Delete</Text>
                                    </TouchableOpacity> */}
                                </View>

                            </TouchableOpacity>
                        )
                    })}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleOnpress()}>
                <Icon name='plus' size={40} color={'black'} />
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 2,
        // marginBottom:80
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: 'center',
        marginBottom: 20
    },
    button: {
        position: 'absolute',
        top: "85%",
        left: "75%",
        backgroundColor: 'skyblue',
        borderRadius: 20,
        padding: 10
    },
    item_container: {
        borderColor: 'lightgray',
        borderWidth: 1,
        backgroundColor: "lightgray",
        marginHorizontal: 20,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
    }
})
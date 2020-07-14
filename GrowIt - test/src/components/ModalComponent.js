import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";

import { Colors } from 'react-native-paper';
const ModalComponent = ({ modalVisible, setModalVisible, removeButtonEvent }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible.flag}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to remove {modalVisible.obj.name} from your garden?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableHighlight
                                onPress={() => {
                                    setModalVisible({ ...modalVisible, flag: false });
                                    removeButtonEvent(modalVisible.obj);
                                }}
                            >
                                <Text style={{ ...styles.modalText, color: Colors.green800 }}>Yes</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {
                                    setModalVisible({ ...modalVisible, flag: false });

                                }} >
                                <Text style={{ ...styles.modalText, marginLeft: 100,color: Colors.red800 }}>No</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalButtons:{
        marginTop: 5,
        flexDirection: 'row'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'Comfortaa_600SemiBold'
    }
});

export default ModalComponent;

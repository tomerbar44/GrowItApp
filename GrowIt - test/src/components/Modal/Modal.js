import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, TouchableHighlight, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeFromDevice } from '../../redux/actions/plantActions';
import styles from './style';

const ModalComponent = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent visible={modalVisible.flag}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to remove {modalVisible.obj.name} from your garden?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible({ ...modalVisible, flag: false });
                  dispatch(removeFromDevice(modalVisible.obj));
                }}
              >
                <Text style={[styles.modalText, styles.greenColor]}>Yes</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible({ ...modalVisible, flag: false });
                }}
              >
                <Text style={[styles.modalText, styles.marginRedColor]}>No</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

ModalComponent.propTypes = {
  plantObj: PropTypes.object,
  navigation: PropTypes.object
};

export default ModalComponent;

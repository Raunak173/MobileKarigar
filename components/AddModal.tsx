import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';

const AddCardModal = ({
  modalVisible,
  setModalVisible,
  newCardData,
  setNewCardData,
  handleAddCard,
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newCardData.name}
            onChangeText={text => setNewCardData({...newCardData, name: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={newCardData.phone}
            onChangeText={text => setNewCardData({...newCardData, phone: text})}
          />
          <TextInput
            style={styles.rateInput}
            placeholder="Silver Amount"
            keyboardType="numeric"
            value={newCardData.silver}
            onChangeText={text =>
              setNewCardData({...newCardData, silver: text})
            }
          />
          <TextInput
            style={styles.rateInput}
            placeholder="Gold Amount"
            keyboardType="numeric"
            value={newCardData.gold}
            onChangeText={text => setNewCardData({...newCardData, gold: text})}
          />
          <TextInput
            style={styles.amountInput}
            placeholder="Amount"
            keyboardType="numeric"
            value={newCardData.amt}
            onChangeText={text => setNewCardData({...newCardData, amt: text})}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  rateInput: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  amountInput: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddCardModal;

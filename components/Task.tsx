import React, {useState} from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Task as TaskType} from '../@type/task.type';
function Task({
  task,
  id,
  done,
  modalVisible,
  setModalVisible,
  handleEditTask,
  handleDeleteModal,
  handleDeleteTask,
}: {
  task: string;
  id: string;
  done: boolean;
  modalVisible: boolean;
  handleDeleteModal: () => void;
  handleEditTask: (name: string, id: string, done: boolean) => void;
  setModalVisible: (value: React.SetStateAction<boolean>) => void;
  handleDeleteTask: (id: string) => void;
}) {
  const [taskEdit, setTaskEdit] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}>{done && <Text>v</Text>}</View>
        <Text style={styles.itemText}>{task}</Text>
      </View>
      <TouchableOpacity onPress={() => setIsEdit(true)}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isEdit}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit this task</Text>
            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeTaskWrapper}></KeyboardAvoidingView>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Task: </Text>
                <TextInput
                  onChangeText={task => setTaskEdit(task)}
                  placeholder={'Edit your task'}
                  defaultValue={task}></TextInput>
                <TouchableOpacity
                  onPress={() => {
                    handleEditTask(taskEdit, id, done);
                    setIsEdit(false);
                  }}>
                  <View style={styles.editTask}>
                    <Text style={{fontSize: 24}}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => handleDeleteModal()}>
        <Text>Delete</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you delete this task</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>NO</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleDeleteTask(id);
                }}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  editTask: {
    // marginLeft: 40,
  },
  writeTaskWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {flexDirection: 'row'},
  square: {
    backgroundColor: '#55bcf6',
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
    opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {},
  circle: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: '#55bcf6',
    borderRadius: 100,
  },
  edit: {color: '#000'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Task;

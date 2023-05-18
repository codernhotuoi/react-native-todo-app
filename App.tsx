import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {Task as TaskType} from './@type/task.type';
import FlatListComponent from './components/FlatList';
import Task from './components/Task';

function App(): JSX.Element {
  const [task, setTask] = useState<string>('');
  const [taskItem, setTaskItem] = useState<TaskType[]>([]);
  const [startEdit, setStartEdit] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddTask = (name: string) => {
    Keyboard.dismiss();
    const task: TaskType = {
      name,
      done: false,
      id: new Date().toISOString(),
    };
    setTaskItem(prev => [...prev, task]);
    setTask('');
  };
  const handleDoneTask = (id: string, done: boolean) => {
    setTaskItem(prev => {
      return prev.map(todo => {
        if (todo.id === id) {
          return {...todo, done};
        }
        return todo;
      });
    });
  };
  const handleEditTask = (name: string, id: string, done: boolean) => {
    Keyboard.dismiss();
    setTaskItem(prev => {
      return prev.map(todo => {
        if (todo.id === id) {
          return {...todo, name};
        }
        return todo;
      });
    });
  };
  const handleDeleteModal = () => {
    setModalVisible(true);
  };
  const handleDeleteTask = (id: string) => {
    let taskItemClone = [...taskItem];
    taskItemClone = taskItemClone.filter(item => item.id !== id);
    setTaskItem(taskItemClone);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.title}>Todo App</Text>
          <View>
            {taskItem.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDoneTask(item.id, !item.done)}>
                  <Task
                    task={item.name}
                    id={item.id}
                    done={item.done}
                    modalVisible={modalVisible}
                    handleDeleteModal={handleDeleteModal}
                    setModalVisible={setModalVisible}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}></Task>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setTask(text)}
          placeholder={'Write a task'}
          value={task}></TextInput>
        <TouchableOpacity
          style={{marginRight: 80}}
          onPress={() => handleAddTask(task)}>
          <View style={styles.addTask}>
            <Text style={{fontSize: 24}}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
  // return (
  //   <View>
  //     <FlatListComponent></FlatListComponent>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 20,
    backgroundColor: '#E8EAED',
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  writeTaskWrapper: {
    flexDirection: 'row',
    // position: 'absolute',
    marginBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginLeft: 40,
    marginTop: 20,
  },
  textInput: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 60,
    width: 200,
  },
  addTask: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

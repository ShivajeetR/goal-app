import React from 'react';
import {
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Button,
  FlatList,
} from 'react-native';
import GoalItem from './components/GoalItem.js';
import GoalInput from './components/GoalInput.js';
export default function App() {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [courseGoals, setCourseGoals] = React.useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter(goal => goal.id !== id);
    });
  }
  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
    endAddGoalHandler();
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add new goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />
      <GoalInput
        onAddGoal={addGoalHandler}
        visible={modalIsVisible}
        onCancel={endAddGoalHandler}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={dataItem => {
            return (
              <GoalItem
                onDeleteItem={deleteGoalHandler}
                text={dataItem.item.text}
                id={dataItem.item.id}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    borderTopWidth: 2,
    borderColor: '#cccccc',
  },
});

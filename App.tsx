import React from 'react';
import {StyleSheet, View, Button, FlatList} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
export default function App() {
  const [modalIsVisible, setModalIsVisible] = React.useState<boolean>(false);
  const [courseGoals, setCourseGoals] = React.useState<
    {text: string; id: string}[]
  >([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function deleteGoalHandler(id: string) {
    setCourseGoals((currentCourseGoals: {text: string; id: string}[]) => {
      return currentCourseGoals.filter(goal => goal.id !== id);
    });
  }
  function addGoalHandler(enteredGoalText: {text: string; id: string}): any {
    setCourseGoals((currentCourseGoals: any) => [
      ...currentCourseGoals,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
    endAddGoalHandler();
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add new goal"
        color="purple"
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
          keyExtractor={item => {
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

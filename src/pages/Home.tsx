import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Header} from '../components/Header';
import {Task, TasksList} from '../components/TasksList';
import {TodoInput} from '../components/TodoInput';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {
        let task: Task = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false
        }
        if (newTaskTitle.length)
            setTasks(oldStade => [...oldStade, task])
    }

    function handleToggleTaskDone(id: number) {
        const updateTaks = tasks.map(task => ({...task}))
        const foundItem = updateTaks.find(item => item.id === id)

        if (!foundItem)
            return;
        foundItem.done = !foundItem.done;
        setTasks(updateTaks);
    }

    function handleRemoveTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length}/>

            <TodoInput addTask={handleAddTask}/>

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB'
    }
})

import React, { Component } from 'react';
import update from 'immutability-helper';

import GroupList from './components/grouplist';
import TaskList from './components/tasklist';
import tasksData from './db/tasks-data';
import './App.css';

class App extends Component {
  state = {
    groups: [],
    tasks: [],
    currentGroup: null,
    showGroupList: true
  }

  componentWillMount() {
    this.setState(this.loadGroupsTasksData());
  }

  loadGroupsTasksData() {
    return tasksData.reduce((accumData, task) => {
      if (accumData.groups.hasOwnProperty(task.group)) {
        accumData.groups[task.group].taskIds.push(task.id);
      } else {
        accumData.groups[task.group] = { name: task.group, taskIds: [task.id] };
      }
      accumData.tasks[task.id] = { ...task, name: task.task };

      return accumData;
    }, { groups: {}, tasks: {}});
  }

  showGroupList = () => {
    this.setState({ showGroupList: true });
  }

  handleClickGroup = group => {
    this.setState({ currentGroup: group, showGroupList: false });
  }

  handleClickTask = currTask => {
    const completedAt = !currTask.completedAt ? new Date().toLocaleString() : null;

    // if we don't require that a task just set to incomplete should have the tasks that depend on it also 
    // set to incomplete, then just do `let updatedTasks = this.state.tasks;`
    let updatedTasks = completedAt ? this.state.tasks : this.setDependentTasksToNotCompleted(currTask, this.state.tasks);

    updatedTasks = update(updatedTasks, {
      [currTask.id]: { completedAt: {$set: completedAt} }
    });

    this.setState({ tasks: {...updatedTasks } });

  }

  // this gets called when we click a task to set it to incomplete
  // it recursively searches for the tasks' that depend on it and
  // also sets those tasks to incomplete status
  //
  // this is pretty inefficient as it requires checking every tasks' dependencies
  // would be more efficient if we expressed dependencies as a seperate array on State
  // but wanted to keep things simple as per requirements
  setDependentTasksToNotCompleted = (currTask, updatedTasks) => {
    return Object.values(updatedTasks).reduce((accumTasks, task) => {
      // if a task is in completed state and one of its dependencies was just set to incomplete (currTask)
      // then set it to incomplete also
      if (task.completedAt && task.dependencyIds.includes(currTask.id)) {
        accumTasks = update(accumTasks, {
          [task.id]: {completedAt: {$set: null}}
        });

        return this.setDependentTasksToNotCompleted(task, accumTasks);
      } 
        return accumTasks;
    }, updatedTasks);
  }

  render() {
    return (
      <div className="App">
        { this.state.showGroupList ?
          <GroupList groups={this.state.groups} tasks={this.state.tasks} handleClickGroup={this.handleClickGroup} /> :
          <TaskList group={this.state.currentGroup} tasks={this.state.tasks} showGroupList={this.showGroupList} handleClickTask={this.handleClickTask} /> }
      </div>
    );
  }
}

export default App;

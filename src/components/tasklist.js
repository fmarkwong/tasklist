import React, { Fragment } from 'react';

import Task from './task';

const TaskList = props => {
  const { group, tasks, handleClickTask, showGroupList } = props;

  return (
    <Fragment>
      <div className="task-list-heading">
        <h2>{ group.name }</h2>
        <div onClick={showGroupList} >ALL GROUPS</div>
      </div>
      <hr />
      <div className="items-container">
        { group.taskIds.map(id => <Task key={id} handleClickTask={handleClickTask} tasks={tasks} task={tasks[id]}/>)}
      </div>
    </Fragment>
  );
}

export default TaskList;

import React, { Fragment } from 'react';

import groupArrow from '../images/Group.svg'; 

const Group = props => {
  const { group, tasks, handleClickGroup } = props;
  const totalTasksCompleted = group.taskIds.reduce((total, taskId) => total + Boolean(tasks[taskId].completedAt), 0) 

  return (
    <Fragment>
      <div onClick={handleClickGroup.bind(this, group)} className="item">
        <div className="img-container"><img src={groupArrow} alt=""/></div>
        <div className="item-content">
          <div>{ group.name }</div>
          <div className="group-task-count">{totalTasksCompleted} OF {group.taskIds.length} TASKS COMPLETE</div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
}

export default Group;

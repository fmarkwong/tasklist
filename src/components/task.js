import React, { Fragment } from 'react';

import locked from '../images/Locked.svg'; 
import incomplete from '../images/Incomplete.svg'; 
import completed from '../images/Completed.svg'; 

const statusToImage = { locked, incomplete, completed };

function getStatus(props) {
  if (props.task.dependencyIds.find(id => !props.tasks[id].completedAt)) {
    return 'locked';
  } 
  return props.task.completedAt ? 'completed' : 'incomplete';
}

function handleClick(status, props) {
  if (status === 'locked') return;

  props.handleClickTask(props.task);
}

const Task = props => {
  const { task } = props;
  const status = getStatus(props); 

  return (
    <Fragment>
      <div onClick={handleClick.bind(this, status, props)} className="item">
        <div className="img-container"><img src={statusToImage[status]} alt=""/></div>
        <div className={`item-content ${status}`}>{ task.name }</div>
      </div>
      <hr />
    </Fragment>
  );
}

export default Task;

import React, { Fragment } from 'react';

import Group from './group';

const GroupList = props => {
  const { groups, tasks, handleClickGroup } = props;

  return (
    <Fragment>
      <h2>Things To Do</h2>
      <hr />
      <div className="items-container">
        { Object.values(groups).map(group => <Group key={group.name} group={group} tasks={tasks} handleClickGroup={handleClickGroup} />) }
      </div>
    </Fragment>
  );
}

export default GroupList;

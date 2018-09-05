WonderSchool TaskList Interview Project
=======================================

Author: Mark Wong

## TaskList React App


## To Run
In root project directory run:
```
yarn && yarn start
```


### State Tree Structure

For the two main entities, groups and tasks, I modeled as two seperate arrays of indexed objects in state.  For groups, the objects are indexed by group name because that's how they are referenced in the original data file.  Tasks are indexed by id.  This is the structure:

state = {
  groups: {
    Purchases: {
      name: "Purchases",
      taskIds: [3, 4, 5]
    }
  },
  tasks: {
    1: {
      name: 'task1',
      completedAt: null,
      group: 'Purchases',
      dependencyIds: [1,2,3,4]
    }
  }
}

## when you set a task to incomplete and that causes the tasks that depend on it to be locked, once you complete that task and the dependencies are unlocked,  if those those dependent tasks were completed, should they go back to completed state when unlocked or should they be incomplete?

e.g.

- Click Go to Bank and that unlocks buy hammer
- Click Buy Hammer to set to completed
- Go back and click Go to Bank to set to incomplete.
  - This locks Buy Hammer
- Click Go to Bank again to set to completed
  - This unlocks Buy Hammer

So the question is when Buy Hammer is unlocked, should it retain it's orginal competed state or should it be reet to incomplete?  In other words, when a task is locked, should be reset to incomplete as well?

Nornally, I would ask the stakeholders about this before proceding, but because this is just an exercise, I just decided to assume locked tasks should be set to incomplete as well.  This makes sense to me because if you set Go to Bank to incomplete, this nullifies Buy Hammer.  Without money, you can't buy the hammer.

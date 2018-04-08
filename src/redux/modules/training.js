const initialState = {
  trainingLv: 1,
  progress: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PROGRESS_NEXT_ENEMY':
      return { ...state, progress: state.progress + 1 };
    case 'ADD_TRAINING_LEVEL':
      return { ...state, trainingLv: state.trainingLv + 1 };

    default:
      return state;
  }
};

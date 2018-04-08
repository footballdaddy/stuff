const initialState = {
  hoveredItem: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_DESCRIPTION':
      return {
        ...state,
        hoveredItem: action.item,
      };

    default:
      return state;
  }
};

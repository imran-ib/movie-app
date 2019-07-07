let endoint = "";

const Reducer = (state = endoint, { type, value }) => {
  switch (type) {
    case "ALL_MOVIES":
      return (endoint = value);

    default:
      return state;
  }
};

export default Reducer;

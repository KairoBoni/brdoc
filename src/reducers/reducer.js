initialState = {
    doc: null,
    index: null,
    comentario: "",
    nota: 0,
  }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INSERT":
           console.log(state);
        break;
    }
    return state;
}

export default reducer;
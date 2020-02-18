const INITIAL_STATE = {};

function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'HELLO_WORLD':
      return { hello: 'world' };
    default:
      return state;
  }
}

export default auth;

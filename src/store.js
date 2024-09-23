import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Import thunk as a named export
import rootReducer from './reducers/index';

const initialState = {
    auth: {
      isAuthenticated: !!localStorage.getItem('token'),
      user: localStorage.getItem('token') || null,
      error: '',
      loading: false
    }
  };
  
const middleware = [thunk];


const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // Add support for Redux DevTools extension if installed
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;

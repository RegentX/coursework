import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Define actions
const ADD_ARTICLE = 'ADD_ARTICLE';
const ADD_ARCHIVE = 'ADD_ARCHIVE';
const DELETE_ARTICLE = 'DELETE_ARTICLE';

const deleteArticle = index => ({ type: DELETE_ARTICLE, payload: index });

// Define reducers
const articlesReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return [...state, action.payload];
        case DELETE_ARTICLE:
            return state.filter((_, index) => index !== action.payload);
        default:
            return state;
    }
};

const archivesReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ARCHIVE:
            return [...state, action.payload];
        default:
            return state;
    }
};

// Combine reducers and create store
const rootReducer = combineReducers({
    articles: articlesReducer,
    archives: archivesReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;
export { ADD_ARTICLE, ADD_ARCHIVE, DELETE_ARTICLE, deleteArticle };
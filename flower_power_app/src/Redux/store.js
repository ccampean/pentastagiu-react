import { createStore, compose } from "redux";
import { applyMiddleware } from "redux";
import { combineReducers } from "redux";



export const store = createStore(
    combineReducers({}),
    compose(applyMiddleware())
);
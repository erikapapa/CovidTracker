import { createStore } from "redux";
import trackerReducer from "../reducers/trackerReducer";

export const store = createStore(trackerReducer);
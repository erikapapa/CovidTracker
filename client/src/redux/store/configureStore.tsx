import { createStore } from "redux";
import trackerReducer from "../reducers/trackerReducer";

// export default function configureState() {
//   return createStore(productReducer);
// }

export const store = createStore(trackerReducer);
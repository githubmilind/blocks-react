import { createStore } from "redux";
import rootReducer from "../reducres/index"

const store = createStore(rootReducer);

export default store;
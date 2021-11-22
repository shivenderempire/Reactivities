import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import ActivityStore1 from "./activityStore1";

interface Store {
  activityStore: ActivityStore;
  activityStore1: ActivityStore1;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  activityStore1: new ActivityStore1(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

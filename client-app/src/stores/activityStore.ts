import {
  // action,
  makeAutoObservable,
  // makeObservable,
  // observable,
  // runInAction,
} from "mobx";
import agent from "../app/api/agent";
import { Activity } from "../app/models/activity";

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | null = null;
  loadingInitial = false;
  loading = false;
  constructor() {
    // makeObservable(this, {
    //   title: observable,
    //   setTitle: action,
    // });
    makeAutoObservable(this);
  }

  loadingActivities = async () => {
    //this.loadingInitial = true;
    this.setLoadinginittial(true);
    try {
      const activities = await agent.Activities.list();
      //   runInAction(() => {
      //     activities.forEach((activity) => {
      //       activity.date = activity.date.split("T")[0];
      //       this.activities.push(activity);
      //     });

      //     this.loadingInitial = false;
      //   });

      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activities.push(activity);
      });
      this.setLoadinginittial(false);
    } catch (error) {
      console.log(error);
      this.setLoadinginittial(false);
      //   runInAction(() => {
      //     this.loadingInitial = false;
      //   });
    }
  };

  setLoadinginittial = (state: boolean) => {
    this.loadingInitial = state;
  };
}

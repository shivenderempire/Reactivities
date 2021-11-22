import React, { Fragment, useEffect, useState } from "react";
//import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore, activityStore1 } = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadingActivities();
    //old
    // agent.Activities.list().then((response) => {

    //   const activities: Activity[] = [];

    //   response.forEach((activity) => {
    //     activity.date = activity.date.split("T")[0];
    //     activities.push(activity);
    //   });
    //   setActivities(activities);
    //   setLoading(false);
    // });

    //older
    // axios
    //   .get<Activity[]>("http://localhost:5000/api/Activities")
    //   .then((response: any) => {
    //     setActivities(response.data);
    //   });
  }, [activityStore]);

  const handleSelectedActivity = (id: string) => {
    const activity = [...activities];

    setSelectedActivity(activity.find((x) => x.id === id));
  };
  const handleCancelActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormForOpen = (id?: string) => {
    id ? handleSelectedActivity(id) : handleCancelActivity();
    setEditMode(true);
  };
  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleEditAndCreateActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {});
      const activitiesData = [...activities];
      const index: number = activitiesData.findIndex(
        (x) => x.id === activity.id,
      );
      activitiesData[index] = activity;
      setActivities(activitiesData);

      // setActivities([
      //   ...activities.filter((x) => x.id !== activity.id),
      //   activity,
      // ]);
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
    // activity.id
    //   ? setActivities([
    //       ...activities.filter((x) => x.id !== activity.id),
    //       activity,
    //     ])
    //   : setActivities([...activities, { ...activity, id: uuid() }]);
    // setEditMode(false);
    // setSelectedActivity(activity);
  };
  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  };

  if (activityStore.loadingInitial)
    return <LoadingComponent inverted={loading} content="Loading........" />;
  return (
    <Fragment>
      {/* <Header as="h2" icon="users" content="Reactivities" /> */}
      <NavBar openForm={handleFormForOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          SelectedActivity={selectedActivity}
          OnSelectedActivity={handleSelectedActivity}
          OnCancelActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleFormForOpen}
          closeForm={handleFormClose}
          EditAndCreateActivity={handleEditAndCreateActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
      {/* <ul>
          {activities.map((activity: any) => (
            <li key={activity.id}>{activity.title}</li>
          ))}
        </ul> */}
    </Fragment>
  );
}

export default observer(App);

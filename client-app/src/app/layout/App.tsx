import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/Activities")
      .then((response: any) => {
        setActivities(response.data);
      });
  }, []);

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
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };
  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((x) => x.id !== id)]);
  };

  return (
    <Fragment>
      {/* <Header as="h2" icon="users" content="Reactivities" /> */}
      <NavBar openForm={handleFormForOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          SelectedActivity={selectedActivity}
          OnSelectedActivity={handleSelectedActivity}
          OnCancelActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleFormForOpen}
          closeForm={handleFormClose}
          EditAndCreateActivity={handleEditAndCreateActivity}
          deleteActivity={handleDeleteActivity}
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

export default App;

import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivtyDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  SelectedActivity: Activity | undefined;
  OnSelectedActivity: (id: string) => void;
  OnCancelActivity: () => void;
  editMode: boolean;
  openForm: (id?: string) => void;
  closeForm: () => void;
  EditAndCreateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}
const ActivityDashboard = ({
  activities,
  SelectedActivity,
  OnSelectedActivity,
  OnCancelActivity,
  editMode,
  openForm,
  closeForm,
  EditAndCreateActivity,
  deleteActivity,
  submitting,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          OnSelectedActivity={OnSelectedActivity}
                  deleteActivity={deleteActivity}
                  submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {SelectedActivity && (
          <ActivtyDetails
            activity={SelectedActivity}
            OnCancelActivity={OnCancelActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={SelectedActivity}
            EditAndCreateActivity={EditAndCreateActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;

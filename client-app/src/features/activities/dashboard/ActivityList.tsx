import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
//import { useStore } from "../../../stores/store";

interface Props {
  activities: Activity[];
  OnSelectedActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}
const ActivityList = ({
  activities,
  OnSelectedActivity,
  deleteActivity,
  submitting,
}: Props) => {
  const [target, setTargetr] = useState("");
  const handleDeleteActivity = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string,
  ) => {
    setTargetr(e.currentTarget.name);
    deleteActivity(id);
  };
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => {
          return (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div> {activity.description}</div>
                  <div>
                    {activity.city},{activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated="right"
                    color="blue"
                    content="View"
                    onClick={() => OnSelectedActivity(activity.id)}
                  />
                  <Button
                    loading={submitting && activity.id === target}
                    name={activity.id}
                    floated="right"
                    color="red"
                    content="Delete"
                    onClick={(e) => handleDeleteActivity(e, activity.id)}
                  />
                  <Label basic content={activity.category}></Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
};
export default ActivityList;

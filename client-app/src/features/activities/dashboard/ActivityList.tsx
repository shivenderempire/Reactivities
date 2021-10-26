import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  OnSelectedActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}
const ActivityList = ({
  activities,
  OnSelectedActivity,
  deleteActivity,
}: Props) => {
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
                    floated="right"
                    color="red"
                    content="Delete"
                    onClick={() => deleteActivity(activity.id)}
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

import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  EditAndCreateActivity: (activity: Activity) => void;
}
const ActivityForm = ({
  activity: selectedActivity,
  closeForm,
  EditAndCreateActivity,
}: Props) => {
  //selectedActivity is alias name of activity

  const initialState: Activity = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    city: "",
    date: "",
    description: "",
    venue: "",
  };
  const [activity, setActivity] = useState(initialState);

  const handleSibmit = () => {
    // console.log(activity);
    EditAndCreateActivity(activity);
  };
  const handleChangeEvent = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setActivity((prevstate) => ({ ...prevstate, [name]: value }));
  };
  return (
    ///clearing means  to use clear all floats
    <Segment clearing>
      <Form onSubmit={handleSibmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleChangeEvent}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleChangeEvent}
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleChangeEvent}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleChangeEvent}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleChangeEvent}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleChangeEvent}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
};
export default ActivityForm;

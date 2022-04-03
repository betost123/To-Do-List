import React from "react";
import "./App.css";
import { Button, Input, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TableRow } from "./TableRow";
import { v4 as uuidv4 } from "uuid";

const initialData = [
  { id: "1", title: "Buy wheat", done: false },
  { id: "2", title: "Make bread", done: false },
];

function App() {
  const [showDone, setShowDone] = React.useState(false);
  const [showUndone, setShowUndone] = React.useState(false);
  const [data, setData] = React.useState(initialData);
  const [searchFilter, setSearchFilter] = React.useState("");

  const onClickDone = () => {
    setShowDone(!showDone);
    setShowUndone(false);
  };
  const onClickUndone = () => {
    setShowDone(false);
    setShowUndone(!showUndone);
  };

  const onClickUpdateCompleteTask = (id: string) => {
    const newArr = data.map((obj) => {
      if (obj.id === id) {
        return { ...obj, done: !obj.done };
      }
      return obj;
    });
    setData(newArr);
    console.log(data);
  };

  const onClickDeleteTask = (id: string) => {
    setData(data.filter((x) => x.id !== id));
  };

  const dataToShow = showDone
    ? data.filter((x) => x.done === true)
    : showUndone
    ? data.filter((x) => x.done === false)
    : data;

  const filteredData =
    searchFilter.length > 0
      ? dataToShow.filter((x) =>
          x.title.toLowerCase().includes(searchFilter.toLowerCase())
        )
      : dataToShow;

  const [newTask, setNewTask] = React.useState("");
  const onAddNewTask = () => {
    if (newTask.length > 0) {
      const id = uuidv4();
      const newObject = { title: newTask, id: id, done: false };
      setData([...data, newObject]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 22,
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <Button
          style={{
            backgroundColor: showDone ? "#B4D1FF" : "#ECB9ED",
            color: "#fff",
            width: 120,
            margin: 8,
          }}
          onClick={onClickDone}
        >
          Done
        </Button>
        <Button
          style={{
            backgroundColor: showUndone ? "#B4D1FF" : "#ECB9ED",
            color: "#fff",
            width: 120,
            margin: 8,
          }}
          onClick={onClickUndone}
        >
          Not done
        </Button>
        <Input
          style={{ margin: 8 }}
          onChange={(event) => setSearchFilter(event.target.value)}
          id='input-with-icon-adornment'
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>
      <div>
        {filteredData.map((task) => (
          <div>
            <TableRow
              key={task.id}
              title={task.title}
              selected={task.done}
              onClickUpdateStatus={() => onClickUpdateCompleteTask(task.id)}
              onClickDeleteTask={() => onClickDeleteTask(task.id)}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          marginTop: 16,
        }}
      >
        <TextField
          id='addTask'
          label='Add task'
          variant='standard'
          style={{ margin: 8, width: 300 }}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <Button
          style={{ backgroundColor: "#ECB9ED", color: "#fff" }}
          onClick={onAddNewTask}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default App;

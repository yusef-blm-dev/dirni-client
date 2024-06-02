import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/NavBar/NavBar";
import CreateTask from "./pages/CreateTask/CreateTask";
import UpdateTask from "./pages/UpdateTask/UpdateTask";
import Tasks from "./pages/Tasks/Tasks";
import SingleTask from "./pages/SingleTask/SingleTask";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/update-task/:taskId" element={<UpdateTask />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:taskId" element={<SingleTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

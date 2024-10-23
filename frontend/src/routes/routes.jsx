import StudentList from "../pages/StudentList";
import AddStudent from "../pages/AddStudent";
import EditStudent from "../pages/EditStudent";

const routes = [
  {
    path: "/",
    element: <StudentList />,
  },
  {
    path: "/add",
    element: <AddStudent />,
  },
  {
    path: "/edit/:id",
    element: <EditStudent />,
  },
];

export default routes;

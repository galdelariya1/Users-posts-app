import Frame from "../Frame";
import UserPosts from "../UserPosts";
import UsersTable from "../UsersTable";

const RouterSetup = {
  path: "/",
  children: [
    {
      path: "/",
      element: <Frame />,
      children: [
        {
          path: "/",
          element: <UsersTable />,
        },
        {
          path: "/posts/:id",
          element: <UserPosts />,
        },
      ],
    },
  ],
};

export default RouterSetup;

app.factory("UserUpdate", function ($resource) {
  return $resource(
    userAPI + "/:id",
    { id: "@_id" },
    {
      update: {
        method: "PUT",
      },
    }
  );
});

app.factory("UserAdd", function ($resource) {
  return $resource(
    userAPI + "/:id",
    { id: "@_id" },
    {
      update: {
        method: "POST",
      },
    }
  );
});


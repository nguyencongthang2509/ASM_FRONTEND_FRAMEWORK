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


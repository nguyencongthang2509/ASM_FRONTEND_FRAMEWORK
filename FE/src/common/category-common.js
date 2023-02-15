app.factory("CategoryUpdate", function ($resource) {
  return $resource(
    categoryAPI + "/:id",
    { id: "@_id" },
    {
      update: {
        method: "PUT",
      },
    }
  );
});

app.factory("CategoryAdd", function ($resource) {
  return $resource(
    categoryAPI + "/:id",
    { id: "@_id" },
    {
      create: {
        method: "POST",
      },
    }
  );
});

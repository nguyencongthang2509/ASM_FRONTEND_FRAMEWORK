app.factory("OrderAdd", function ($resource) {
  return $resource(
    orderAPI + "/:id",
    { id: "@_id" },
    {
      create: {
        method: "POST",
      },
    }
  );
});

app.factory("OrderUpdate", function ($resource) {
  return $resource(
    orderAPI + "/:id",
    { id: "@_id" },
    {
      update: {
        method: "PUT",
      },
    }
  );
});

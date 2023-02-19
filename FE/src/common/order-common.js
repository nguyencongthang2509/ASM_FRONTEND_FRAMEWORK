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

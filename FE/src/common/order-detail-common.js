app.factory("OrderDetailAdd", function ($resource) {
  return $resource(
    orderDetailAPI + "/:id",
    { id: "@_id" },
    {
      create: {
        method: "POST",
      },
    }
  );
});

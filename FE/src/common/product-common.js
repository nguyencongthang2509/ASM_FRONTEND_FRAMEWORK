app.factory("ProductUpdate", function ($resource) {
  return $resource(
    productsAPI + "/:id",
    { id: "@_id" },
    {
      update: {
        method: "PUT",
      },
    }
  );
});

app.factory("ProductAdd", function ($resource) {
  return $resource(
    productsAPI + "/:id",
    { id: "@_id" },
    {
      create: {
        method: "POST",
      },
    }
  );
});

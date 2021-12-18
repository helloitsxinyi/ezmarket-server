import { EzBackend, EzModel, Type } from "@ezbackend/common";
import { EzOpenAPI } from "@ezbackend/openapi";
import { EzDbUI } from "@ezbackend/db-ui";
import { EzCors } from "@ezbackend/cors";

const app = new EzBackend();

//---Plugins---
//Everything is an ezapp in ezbackend
app.addApp(new EzOpenAPI());
app.addApp(new EzDbUI());
app.addApp(new EzCors());
//---Plugins---

//Models are also ezapps in ezbackend
const model = new EzModel("Items", {
  shopName: Type.VARCHAR,
  itemName: Type.VARCHAR,
  price: Type.DOUBLE,
  available: Type.BOOL,
});

app.addApp(model, { prefix: "/items" });

app.start();

import { EzBackend, EzModel, Type } from "@ezbackend/common";
import { EzOpenAPI } from "@ezbackend/openapi";
import { EzDbUI } from "@ezbackend/db-ui";
import { EzCors } from "@ezbackend/cors";
import type { createConnection } from "typeorm";
// import { EzUser } from "@ezbackend/auth";

const app = new EzBackend();

//---Plugins---
//Everything is an ezapp in ezbackend
app.addApp(new EzOpenAPI());
app.addApp(new EzDbUI());
app.addApp(new EzCors());
//---Plugins---

//Models are also ezapps in ezbackend
const Items = new EzModel("items", {
  shopName: Type.VARCHAR,
  itemName: Type.VARCHAR,
  price: Type.FLOAT,
  available: Type.BOOL,
});

const ormConfig: Parameters<typeof createConnection>[0] = {
  type: "postgres",
  url:
    process.env.DATABASE_URL || "postgres://user:pw@localhost:5432/ezmarketdb",
  synchronize: true,
  ssl: process.env.NODE_ENV === "production",
};

app.addApp(Items, { prefix: "/items" });

app.start({
  backend: { typeorm: ormConfig, listen: { address: "0.0.0.0" } },
  server: { trustProxy: true },
});

import { EzBackend, EzModel, Type } from "@ezbackend/common";
import { EzOpenAPI } from "@ezbackend/openapi";
import { EzDbUI } from "@ezbackend/db-ui";
import { EzCors } from "@ezbackend/cors";
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
  price: Type.DOUBLE,
  available: Type.BOOL,
  // user: {
  //   type: Type.MANY_TO_ONE,
  //   target: "user",
  //   inverseSide: "item",
  //   joinColumn: true,
  //   onDelete: "SET NULL",
  //   nullable: true,
  // },
  // userId: {
  //   type: Type.INT,
  //   nullable: true,
  // },
});

// export const User = new EzUser("user", ["google"], {
//   item: {
//     type: Type.ONE_TO_MANY,
//     target: "items",
//     inverseSide: "user",
//     nullable: true,
//   },
// });

app.addApp(Items, { prefix: "/items" });
// app.addApp(User, { prefix: "/users" });

app.start({ address: "0.0.0.0", server: { trustProxy: true } });

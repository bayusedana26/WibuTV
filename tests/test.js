const request = require("supertest");
const app = require("../index");
const { user, cast, category } = require("../models");
let authenticationToken;

// Delete All Data in Category and Cast
beforeAll(async () => {
  await Promise.all([
    user.deleteMany(),
    cast.deleteMany(),
    category.deleteMany(),
  ]);
});

//////////////////////////////////////////////////////////////// Test the auth //////////////////////////////////////////////////////////////////

describe("Register User", () => {
  it("It should create a user and return the token", async () => {
    const res = await request(app).post("/signup").send({
      email: "bayusedana@live.com",
      password: "Bayusedana26!!",
      confirmpassword: "Bayusedana26!!",
      fullname: "Bayu Sedana",
      username: "Bayused",
      role: "admin",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success");
    expect(res.body).toHaveProperty("token");
    authenticationToken = res.body.token;
  });
});

describe("login", () => {
  it("User login, get JWT KEY and authorized as an admin", async () => {
    const res = await request(app).post("/login").send({
      email: "bayusedana@live.com",
      password: "Bayusedana26!!",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success");
    expect(res.body).toHaveProperty("token");
    authenticationToken = res.body.token;
  });
});

// //////////////////////////////////////////////////////////////// Get Cast Data //////////////////////////////////////////////////////////////////////////

describe("Get Cast Data", () => {
  it("This is for read Cast data all but not found", async () => {
    const res = await request(app).get(`/cast/`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("No Cast Data");
  });
});

// it("This is for read Cast data by Id but not found", async () => {
//   let findData = await cast.findOne({ _id: "6084ddf05d8b8b059b45ad74" });
//   const res = await request(app).get(`/cast/${findData}`);
//   expect(res.statusCode).toEqual(400);
//   expect(res.body).toBeInstanceOf(Object);
//   expect(res.body.message).toEqual("No Cast Data");
// });

it("This is for Data Not Found", async () => {
  const res = await request(app).get(`/cast/6084ddf05d8b8b059b45ad74`);
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Data Not Found");
});

it("This is for Data Id errors", async () => {
  const res = await request(app).get(`/cast/"6084ddf05d8b8b059b45ad7";`);
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual(
    "Cast ID is not valid and must be 24 character & hexadecimal"
  );
});
// //////////////////////////////////////////////////////////////// Create Cast Data //////////////////////////////////////////////////////////////////

describe("Create Cast Data", () => {
  it("Admin login, get JWT KEY and authorized to create cast data", async () => {
    const res = await request(app)
      .post("/cast")
      .set({ Authorization: `Bearer ${authenticationToken}` })
      .send({
        name: "naruto hokage",
        image: "null",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success Created Cast Data");
    expect(res.body).toHaveProperty("data");
  });
});

it("This is for read Cast data all after created", async () => {
  const res = await request(app).get(`/cast/`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("All Cast Data Found");
  expect(res.body).toHaveProperty("data");
});

it("This is for read Cast data all after created by id", async () => {
  let findData = await cast.findOne({ name: "naruto hokage" });
  const res = await request(app).get(`/cast/${findData._id}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Cast Data Found");
  expect(res.body).toHaveProperty("data");
});

it("Admin login, get JWT KEY and authorized to create cast data but error in cast name", async () => {
  const res = await request(app)
    .post("/cast")
    .set({ Authorization: `Bearer ${authenticationToken}` })
    .send({
      name: "12335",
      image: "null",
    });
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Cast name must be alphabet");
});

it("Admin login, get JWT KEY and authorized to create cast data but already created cast data", async () => {
  const res = await request(app)
    .post("/cast")
    .set({ Authorization: `Bearer ${authenticationToken}` })
    .send({
      name: "naruto hokageee",
      image: "null",
    });
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual(
    "Cast name already exist, Cast name already exist"
  );
});

// //////////////////////////////////////////////////////////////// Update Cast Data //////////////////////////////////////////////////////////////////////////

describe("Update Cast Data", () => {
  it("This is for update by Cast data Id", async () => {
    const updateCast = await cast.findOne({ name: "naruto hokage" });
    const res = await request(app)
      .put(`/cast/${updateCast._id}`)
      .set({ Authorization: `Bearer ${authenticationToken}` })
      .send({
        name: "Akatsuki Sasuke",
        image: "null",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success Updated Cast Data");
    expect(res.body).toHaveProperty("data");
  });
});

it("This is for update error in cast data name", async () => {
  const res = await request(app)
    .put(`/cast/6084ddf05d8b8b059b45ad74`)
    .set({ Authorization: `Bearer ${authenticationToken}` })
    .send({
      name: "12345",
      image: "null",
    });
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Cast name must be alphabet");
});

it("This is for update error in cast data name because same name", async () => {
  const res = await request(app)
    .put(`/cast/6084ddf05d8b8b059b45ad74`)
    .set({ Authorization: `Bearer ${authenticationToken}` })
    .send({
      name: "ahshdhh",
      image: "null",
    });
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Cast name already exist");
});

it("This is for update error in cast data Id", async () => {
  const res = await request(app)
    .put(`/cast/721767huhdjhqwhd`)
    .set({ Authorization: `Bearer ${authenticationToken}` })
    .send({
      name: "12345",
      image: "null",
    });
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual(
    "Cast ID is not valid and must be 24 character & hexadecimal"
  );
});

// //////////////////////////////////////////////////////////////// Delete Cast Data //////////////////////////////////////////////////////////////////////////

describe("Delete Cast Data", () => {
  it("This is for delete by Cast data Id", async () => {
    let deleteCast = await cast.findOne({ name: "Akatsuki Sasuke" });
    const res = await request(app)
      .delete(`/cast/${deleteCast._id}`)
      .set({
        Authorization: `Bearer ${authenticationToken}`,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Cast Data Has Been Deleted");
  });
});

it("This is for data not found", async () => {
  const res = await request(app)
    .delete(`/cast/6084ddf05d8b8b059b45ad73`)
    .set({
      Authorization: `Bearer ${authenticationToken}`,
    });
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Data Not Found");
});

it("This is for delete by Cast data Id errros", async () => {
  const res = await request(app)
    .delete(`/cast/jhasjdhjsad`)
    .set({
      Authorization: `Bearer ${authenticationToken}`,
    });
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual(
    "Cast ID is not valid and must be 24 character & hexadecimal"
  );
});

// //////////////////////////////////////////////////////////////// CATEGORY //////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////// Get Category Data //////////////////////////////////////////////////////////////////////////

describe("Get Category Data", () => {
  it("This is for read Category data but data not found", async () => {
    const res = await request(app).get(`/category/`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("No Category Data");
  });
});

it("This is for read Category data but data not found", async () => {
  const res = await request(app).get(`/category/6084ddf05d8b8b059b45ad74`);

  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Data Not Found");
});

it("This is for read Category data by Id but error", async () => {
  const res = await request(app).get(`/category/6084ddf05d8b8b059b45ad7`);

  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual(
    "Category ID is not valid and must be 24 character & hexadecimal"
  );
});
// //////////////////////////////////////////////////////////////// Create Category Data //////////////////////////////////////////////////////////////////

describe("Create Category Data", () => {
  it("Admin login, get JWT KEY and authorized to create category data", async () => {
    const res = await request(app)
      .post("/category")
      .set({ Authorization: `Bearer ${authenticationToken}` })
      .send({
        category: "Action",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success Created Category Data");
    expect(res.body).toHaveProperty("data");
  });
});

it("This is for read all Category data", async () => {
  const res = await request(app).get("/category");

  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("All Category Data Found");
  expect(res.body).toHaveProperty("data");
});

it("This is for read Category data by Id", async () => {
  let findData = await category.findOne({ category: "Action" });
  const res = await request(app).get(`/category/${findData._id}`);

  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Category Data Found");
  expect(res.body).toHaveProperty("data");
});

it("Admin login, get JWT KEY and authorized to create category data", async () => {
  const res = await request(app)
    .post("/category")
    .set({ Authorization: `Bearer ${authenticationToken}` })
    .send({
      category: "12345",
    });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Category name must be alphabet");
});

// //////////////////////////////////////////////////////////////// Update Category Data //////////////////////////////////////////////////////////////////////////

describe("Update Category Data", () => {
  it("This is for update by Category data Id", async () => {
    let updateData = await category.findOne({ category: "Action" });
    const res = await request(app)
      .put(`/category/${updateData._id}`)
      .set({ Authorization: `Bearer ${authenticationToken}` })
      .send({
        category: "Pertarungan",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Success Updated Category Data");
    expect(res.body).toHaveProperty("data");
  });
});

it("This is for update by Category data but error in name", async () => {
  const res = await request(app)
    .put(`/category/6084ddf05d8b8b059b45ad73`)
    .set({ Authorization: `Bearer ${authenticationToken}` })
    .send({
      category: "12345",
    });
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Category name must be alphabet");
});

it("This is for update by Category data but error in the Id", async () => {
  const res = await request(app)
    .put(`/category/6084ddf05d8b8b059b45ad7`)
    .set({ Authorization: `Bearer ${authenticationToken}` })
    .send({
      category: "12345",
    });
  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual(
    "Category ID is not valid and must be 24 character & hexadecimal"
  );
});

// //////////////////////////////////////////////////////////////// Delete Category Data //////////////////////////////////////////////////////////////////////////

describe("Delete Category Data", () => {
  it("This is for delete by Category data Id", async () => {
    let deleteData = await category.findOne({ category: "Pertarungan" });
    const res = await request(app)
      .delete(`/category/${deleteData._id}`)
      .set({ Authorization: `Bearer ${authenticationToken}` });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toEqual("Category Data Has Been Deleted");
  });
});

it("This is for delete by Category data but error in Id", async () => {
  const res = await request(app)
    .delete(`/category/6084ddf05d8b8b059b45ad7`)
    .set({ Authorization: `Bearer ${authenticationToken}` });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual(
    "Category ID is not valid and must be 24 character & hexadecimal"
  );
});

it("This is for delete by Category data but error not found", async () => {
  const res = await request(app)
    .delete(`/category/6084ddf05d8b8b059b45ad73`)
    .set({ Authorization: `Bearer ${authenticationToken}` });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.message).toEqual("Data Not Found");
});

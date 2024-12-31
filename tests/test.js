const request = require("supertest");
const app = require("../index");
const { user, cast, category } = require("../models");

describe('Authentication', () => {
  let authToken;
  
  beforeAll(async () => {
    await Promise.all([
      user.deleteMany(),
      cast.deleteMany(),
      category.deleteMany(),
    ]);
  });

  const testUser = {
    email: "test@example.com",
    password: "Test123!!",
    confirmpassword: "Test123!!",
    fullname: "Test User",
    username: "testuser",
    role: "admin",
  };

  describe('User Registration', () => {
    it('should successfully register a new user', async () => {
      const res = await request(app)
        .post("/signup")
        .send(testUser);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        success: true,
        message: "Success",
        token: expect.any(String)
      });
      
      authToken = res.body.token;
    });

    it('should not allow duplicate email registration', async () => {
      const res = await request(app)
        .post("/signup")
        .send(testUser);

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/email.*exists/i);
    });
  });

  describe('User Login', () => {
    it('should successfully login with valid credentials', async () => {
      const res = await request(app)
        .post("/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        success: true,
        message: "Success",
        token: expect.any(String)
      });
      
      authToken = res.body.token;
    });
  });
});

describe('Cast Management', () => {
  describe('GET /cast', () => {
    it('should return 404 when no casts exist', async () => {
      const res = await request(app).get('/cast');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No Cast Data");
    });

    it('should return 400 for invalid cast ID', async () => {
      const res = await request(app).get('/cast/invalid-id');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Cast ID is not valid and must be 24 character & hexadecimal"
      );
    });
  });

  describe('POST /cast', () => {
    it('should create new cast when authenticated', async () => {
      const res = await request(app)
        .post("/cast")
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: "Test Actor",
          image: "null"
        });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        success: true,
        message: "Success Created Cast Data",
        data: expect.any(Object)
      });
    });
  });
});

describe('Category Management', () => {
  describe('GET /category', () => {
    it('should return 404 when no categories exist', async () => {
      const res = await request(app).get('/category');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No Category Data");
    });
  });

  describe('POST /category', () => {
    it('should create new category when authenticated', async () => {
      const res = await request(app)
        .post("/category")
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          category: "Action"
        });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        success: true,
        message: "Success Created Category Data",
        data: expect.any(Object)
      });
    });
  });
});

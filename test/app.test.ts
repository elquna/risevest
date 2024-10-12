// tests/app.test.ts
import * as request from 'supertest';
import app from '../src/index';
import { users } from "./userModel";




describe("User API", () => {
    beforeEach(() => {
      users.length = 0; // Reset the user list before each test
    });
  
    it("should create a new user", async () => {
      const res = await request(app).post("/users").send({
        name: "nsima",
        email: Date.now + ".com",
        password:"122pas",
        phone:"07039201828",
        id:Math.floor(Math.random() * 11)
      });
  
      expect(res.status).toBe(201);
    });

  
    it("should retrieve all users", async () => {
      await request(app).post("/users").send({
      });
  
      const res = await request(app).get("/users");
  
      expect(res.status).toBe(200);
    });


    it("should retrieve post from user", async () => {
        await request(app).post("/users/1/posts").send({
        });
    
        const res = await request(app).get("/users/1/posts");
    
        expect(res.status).toBe(200);
      });


      it("should fetch data for optimized quey", async () => {
        await request(app).post("/posts/top-three").send({
        });
    
        const res = await request(app).get("/posts/top-three");
    
        expect(res.status).toBe(200);
      });
  
  
  
  
  
  });

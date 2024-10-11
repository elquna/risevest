
import express, { Router } from 'express';
import { save, getUsers} from "../controller/UserController"
import {  savePost, getUserPosts } from "../controller/PostController"



const router = require("express").Router();

router.post('/', save);

router.get('/', getUsers);

router.post('/:id/posts', savePost);

router.get('/:id/posts', getUserPosts);



export default router;
import express, { Router } from 'express';
import { saveComment, getTopUserswithPost} from "../controller/PostController"



const router = require("express").Router();

router.post('/:postId/comments', saveComment);
router.get('/top-three', getTopUserswithPost);


export default router;
import * as functions from 'firebase-functions';

import * as express from 'express';
import { db } from './init';
import * as cors from 'cors';

const app = express();

app.use(cors({origin: true}));

app.get('/courses', async (request, response) => {

    const snaps = await db.collection('courses').get();

    const courses: any[] = [];
    snaps.forEach(snap => courses.push(snap.data()));

    response.status(200).json({ courses });
});

export const getCourses = functions.https.onRequest(app);

export { onAddLesson, onDeleteLesson } from './lessons-counter';

export { resizeThumbnail } from './image-upload';

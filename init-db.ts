
import {COURSES, findLessonsForCourse} from './db-data';

import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDNt1lnj7JVGkCgg0t-B9a5_2mDssM8Jpw',
  authDomain: 'fir-course-1084b.firebaseapp.com',
  databaseURL: 'https://fir-course-1084b.firebaseio.com',
  projectId: 'fir-course-1084b',
  storageBucket: 'fir-course-1084b.appspot.com',
  messagingSenderId: '334827749419',
  appId: '1:334827749419:web:9889c2750fab90dc016a6e',
  measurementId: 'G-MP713P3N44'
};

console.log('Uploading data to the database with the following config:\n');

console.log(JSON.stringify(config));

console.log('\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n');

const app = firebase.initializeApp(config);
const db = firebase.firestore();

main().then(r => console.log('Done.'));

async function uploadData() {
  const courses = await db.collection('courses');
  for (const course of Object.values(COURSES)) {
    const newCourse = removeId(course);
    const courseRef = await courses.add(newCourse);
    const lessons = await courseRef.collection('lessons');
    const courseLessons = findLessonsForCourse(course['id']);
    console.log(`Uploading course ${course['titles']['description']}`);
    for (const lesson of courseLessons) {
      const newLesson = removeId(lesson);
      await lessons.add(newLesson);
    }
  }
}

function removeId(data: any) {
  const newData: any = {...data};
  delete newData.id;
  return newData;
}

async function main() {
  try {
    console.log('Start main...\n\n');
    await uploadData();
    console.log('\n\nClosing Application...');
    await app.delete();
  } catch (e) {
    console.log('Data upload failed, reason:', e, '\n\n');
  }
}


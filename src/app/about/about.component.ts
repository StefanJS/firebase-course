import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Course } from 'app/model/course';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

    // const courseRef = this.db.doc(``)
    //   .snapshotChanges()
    //   .subscribe(snap => {
    //     const course: any = snap.payload.data();

    //     console.log(`course.relatedCourseRef`, course.relatedCourseRef);

    //   });

    // const ref = this.db.doc(``)
    //   .snapshotChanges()
    //   .subscribe(
    //     doc => console.log('ref', doc.payload.ref)
    //   );

  }

  save() {
    const firebaseCourseRef = this.db.doc(`courses/CsTbjoiGVgfksdLocCvW`).ref;

    const rxjsCourseRef = this.db.doc(`courses/CdMCfMsRWoqI8lmwHdeP`).ref;

    const batch = this.db.firestore.batch();

    batch.update(firebaseCourseRef, {titles: {description: 'Firebase Course'}});

    batch.update(rxjsCourseRef, {titles: {description: 'Kekw Course Uwu'}});

    const batch$ = of(batch.commit());

    batch$.subscribe();
  }

  async runTransaction() {

    const newCounter = await this.db.firestore.runTransaction(async transaction => {
      console.log('Running transaction...', transaction);

      const courseRef = this.db.doc(`courses/88epLYhzjzz8lSZ1xS8e`).ref;

      const snap = await transaction.get(courseRef);

      const course = <Course> snap.data();

      const lessonsCount = course.lessonsCount + 1;

      transaction.update(courseRef, { lessonsCount });

      return lessonsCount;

    });

    console.log(`newCounter: `, newCounter);
  }


}

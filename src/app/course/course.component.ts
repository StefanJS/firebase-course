import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {tap, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from 'app/services/courses.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;

  lessons: Lesson[];

  displayedColumns = ['seqNo', 'description', 'duration'];

  lastPageLoaded = 0;

  loading = false;


  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) {


  }

  ngOnInit() {

    this.course = this.route.snapshot.data['course'];

    this.loading = true;

    this.coursesService.findLessons(this.course.uid)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        lessons => this.lessons = lessons
      );

  }

  loadMore() {
    this.lastPageLoaded++;

    this.loading = true;

    this.coursesService.findLessons(this.course.uid, 'asc', this.lastPageLoaded)
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe(lessons => this.lessons = this.lessons.concat(lessons));
  }


}

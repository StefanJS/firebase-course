import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  pictureUrl$: Observable<string>;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => console.log(user));

    // if user is null then emits false, else if user is logged in it emits true
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user ? user.photoURL : null));

    this.pictureUrl$.subscribe(val => console.log(val));

  }

  logout() {

    this.afAuth.auth.signOut();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGreeting } from '../greeting.model';

@Component({
  selector: 'jhi-greeting-detail',
  templateUrl: './greeting-detail.component.html',
})
export class GreetingDetailComponent implements OnInit {
  greeting: IGreeting | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ greeting }) => {
      this.greeting = greeting;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

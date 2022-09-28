import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaterialTopicLevel } from '../material-topic-level.model';

@Component({
  selector: 'jhi-material-topic-level-detail',
  templateUrl: './material-topic-level-detail.component.html',
})
export class MaterialTopicLevelDetailComponent implements OnInit {
  materialTopicLevel: IMaterialTopicLevel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materialTopicLevel }) => {
      this.materialTopicLevel = materialTopicLevel;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

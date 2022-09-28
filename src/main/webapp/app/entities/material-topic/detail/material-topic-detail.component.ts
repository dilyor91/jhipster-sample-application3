import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaterialTopic } from '../material-topic.model';

@Component({
  selector: 'jhi-material-topic-detail',
  templateUrl: './material-topic-detail.component.html',
})
export class MaterialTopicDetailComponent implements OnInit {
  materialTopic: IMaterialTopic | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materialTopic }) => {
      this.materialTopic = materialTopic;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

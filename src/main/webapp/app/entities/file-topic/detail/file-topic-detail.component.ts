import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFileTopic } from '../file-topic.model';

@Component({
  selector: 'jhi-file-topic-detail',
  templateUrl: './file-topic-detail.component.html',
})
export class FileTopicDetailComponent implements OnInit {
  fileTopic: IFileTopic | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fileTopic }) => {
      this.fileTopic = fileTopic;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPopup } from '../popup.model';

@Component({
  selector: 'jhi-popup-detail',
  templateUrl: './popup-detail.component.html',
})
export class PopupDetailComponent implements OnInit {
  popup: IPopup | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ popup }) => {
      this.popup = popup;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

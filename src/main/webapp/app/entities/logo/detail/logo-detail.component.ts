import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILogo } from '../logo.model';

@Component({
  selector: 'jhi-logo-detail',
  templateUrl: './logo-detail.component.html',
})
export class LogoDetailComponent implements OnInit {
  logo: ILogo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logo }) => {
      this.logo = logo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

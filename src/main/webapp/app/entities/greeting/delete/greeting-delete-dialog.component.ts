import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGreeting } from '../greeting.model';
import { GreetingService } from '../service/greeting.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './greeting-delete-dialog.component.html',
})
export class GreetingDeleteDialogComponent {
  greeting?: IGreeting;

  constructor(protected greetingService: GreetingService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.greetingService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

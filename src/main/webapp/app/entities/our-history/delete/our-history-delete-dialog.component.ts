import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOurHistory } from '../our-history.model';
import { OurHistoryService } from '../service/our-history.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './our-history-delete-dialog.component.html',
})
export class OurHistoryDeleteDialogComponent {
  ourHistory?: IOurHistory;

  constructor(protected ourHistoryService: OurHistoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ourHistoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

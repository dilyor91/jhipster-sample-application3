import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICenterStructure } from '../center-structure.model';
import { CenterStructureService } from '../service/center-structure.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './center-structure-delete-dialog.component.html',
})
export class CenterStructureDeleteDialogComponent {
  centerStructure?: ICenterStructure;

  constructor(protected centerStructureService: CenterStructureService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.centerStructureService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

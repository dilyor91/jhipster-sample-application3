import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMaterialTopicLevel } from '../material-topic-level.model';
import { MaterialTopicLevelService } from '../service/material-topic-level.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './material-topic-level-delete-dialog.component.html',
})
export class MaterialTopicLevelDeleteDialogComponent {
  materialTopicLevel?: IMaterialTopicLevel;

  constructor(protected materialTopicLevelService: MaterialTopicLevelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.materialTopicLevelService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMaterialTopic } from '../material-topic.model';
import { MaterialTopicService } from '../service/material-topic.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './material-topic-delete-dialog.component.html',
})
export class MaterialTopicDeleteDialogComponent {
  materialTopic?: IMaterialTopic;

  constructor(protected materialTopicService: MaterialTopicService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.materialTopicService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

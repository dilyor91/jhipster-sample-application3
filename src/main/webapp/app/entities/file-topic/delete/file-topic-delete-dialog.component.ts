import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFileTopic } from '../file-topic.model';
import { FileTopicService } from '../service/file-topic.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './file-topic-delete-dialog.component.html',
})
export class FileTopicDeleteDialogComponent {
  fileTopic?: IFileTopic;

  constructor(protected fileTopicService: FileTopicService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fileTopicService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

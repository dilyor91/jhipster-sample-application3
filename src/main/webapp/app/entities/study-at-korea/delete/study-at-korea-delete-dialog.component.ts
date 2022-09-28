import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStudyAtKorea } from '../study-at-korea.model';
import { StudyAtKoreaService } from '../service/study-at-korea.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './study-at-korea-delete-dialog.component.html',
})
export class StudyAtKoreaDeleteDialogComponent {
  studyAtKorea?: IStudyAtKorea;

  constructor(protected studyAtKoreaService: StudyAtKoreaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studyAtKoreaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

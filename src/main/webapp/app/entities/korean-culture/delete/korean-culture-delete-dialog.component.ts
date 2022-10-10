import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IKoreanCulture } from '../korean-culture.model';
import { KoreanCultureService } from '../service/korean-culture.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './korean-culture-delete-dialog.component.html',
})
export class KoreanCultureDeleteDialogComponent {
  koreanCulture?: IKoreanCulture;

  constructor(protected koreanCultureService: KoreanCultureService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.koreanCultureService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AnswerAndQuestionComponent } from '../list/answer-and-question.component';
import { AnswerAndQuestionDetailComponent } from '../detail/answer-and-question-detail.component';
import { AnswerAndQuestionUpdateComponent } from '../update/answer-and-question-update.component';
import { AnswerAndQuestionRoutingResolveService } from './answer-and-question-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const answerAndQuestionRoute: Routes = [
  {
    path: '',
    component: AnswerAndQuestionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AnswerAndQuestionDetailComponent,
    resolve: {
      answerAndQuestion: AnswerAndQuestionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AnswerAndQuestionUpdateComponent,
    resolve: {
      answerAndQuestion: AnswerAndQuestionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AnswerAndQuestionUpdateComponent,
    resolve: {
      answerAndQuestion: AnswerAndQuestionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(answerAndQuestionRoute)],
  exports: [RouterModule],
})
export class AnswerAndQuestionRoutingModule {}

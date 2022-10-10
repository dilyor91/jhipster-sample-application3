import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'popup',
        data: { pageTitle: 'jhipsterSampleApplication3App.popup.home.title' },
        loadChildren: () => import('./popup/popup.module').then(m => m.PopupModule),
      },
      {
        path: 'attachment',
        data: { pageTitle: 'jhipsterSampleApplication3App.attachment.home.title' },
        loadChildren: () => import('./attachment/attachment.module').then(m => m.AttachmentModule),
      },
      {
        path: 'banner',
        data: { pageTitle: 'jhipsterSampleApplication3App.banner.home.title' },
        loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule),
      },
      {
        path: 'logo',
        data: { pageTitle: 'jhipsterSampleApplication3App.logo.home.title' },
        loadChildren: () => import('./logo/logo.module').then(m => m.LogoModule),
      },
      {
        path: 'greeting',
        data: { pageTitle: 'jhipsterSampleApplication3App.greeting.home.title' },
        loadChildren: () => import('./greeting/greeting.module').then(m => m.GreetingModule),
      },
      {
        path: 'center-structure',
        data: { pageTitle: 'jhipsterSampleApplication3App.centerStructure.home.title' },
        loadChildren: () => import('./center-structure/center-structure.module').then(m => m.CenterStructureModule),
      },
      {
        path: 'our-history',
        data: { pageTitle: 'jhipsterSampleApplication3App.ourHistory.home.title' },
        loadChildren: () => import('./our-history/our-history.module').then(m => m.OurHistoryModule),
      },
      {
        path: 'file',
        data: { pageTitle: 'jhipsterSampleApplication3App.file.home.title' },
        loadChildren: () => import('./file/file.module').then(m => m.FileModule),
      },
      {
        path: 'work-plan',
        data: { pageTitle: 'jhipsterSampleApplication3App.workPlan.home.title' },
        loadChildren: () => import('./work-plan/work-plan.module').then(m => m.WorkPlanModule),
      },
      {
        path: 'address',
        data: { pageTitle: 'jhipsterSampleApplication3App.address.home.title' },
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
      {
        path: 'news',
        data: { pageTitle: 'jhipsterSampleApplication3App.news.home.title' },
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
      },
      {
        path: 'events',
        data: { pageTitle: 'jhipsterSampleApplication3App.events.home.title' },
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
      },
      {
        path: 'study-at-korea',
        data: { pageTitle: 'jhipsterSampleApplication3App.studyAtKorea.home.title' },
        loadChildren: () => import('./study-at-korea/study-at-korea.module').then(m => m.StudyAtKoreaModule),
      },
      {
        path: 'time-table',
        data: { pageTitle: 'jhipsterSampleApplication3App.timeTable.home.title' },
        loadChildren: () => import('./time-table/time-table.module').then(m => m.TimeTableModule),
      },
      {
        path: 'institution',
        data: { pageTitle: 'jhipsterSampleApplication3App.institution.home.title' },
        loadChildren: () => import('./institution/institution.module').then(m => m.InstitutionModule),
      },
      {
        path: 'answer-and-question',
        data: { pageTitle: 'jhipsterSampleApplication3App.answerAndQuestion.home.title' },
        loadChildren: () => import('./answer-and-question/answer-and-question.module').then(m => m.AnswerAndQuestionModule),
      },
      {
        path: 'image',
        data: { pageTitle: 'jhipsterSampleApplication3App.image.home.title' },
        loadChildren: () => import('./image/image.module').then(m => m.ImageModule),
      },
      {
        path: 'album',
        data: { pageTitle: 'jhipsterSampleApplication3App.album.home.title' },
        loadChildren: () => import('./album/album.module').then(m => m.AlbumModule),
      },
      {
        path: 'material-topic',
        data: { pageTitle: 'jhipsterSampleApplication3App.materialTopic.home.title' },
        loadChildren: () => import('./material-topic/material-topic.module').then(m => m.MaterialTopicModule),
      },
      {
        path: 'file-topic',
        data: { pageTitle: 'jhipsterSampleApplication3App.fileTopic.home.title' },
        loadChildren: () => import('./file-topic/file-topic.module').then(m => m.FileTopicModule),
      },
      {
        path: 'material-topic-level',
        data: { pageTitle: 'jhipsterSampleApplication3App.materialTopicLevel.home.title' },
        loadChildren: () => import('./material-topic-level/material-topic-level.module').then(m => m.MaterialTopicLevelModule),
      },
      {
        path: 'region',
        data: { pageTitle: 'jhipsterSampleApplication3App.region.home.title' },
        loadChildren: () => import('./region/region.module').then(m => m.RegionModule),
      },
      {
        path: 'country',
        data: { pageTitle: 'jhipsterSampleApplication3App.country.home.title' },
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
      },
      {
        path: 'location',
        data: { pageTitle: 'jhipsterSampleApplication3App.location.home.title' },
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
      },
      {
        path: 'department',
        data: { pageTitle: 'jhipsterSampleApplication3App.department.home.title' },
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
      },
      {
        path: 'task',
        data: { pageTitle: 'jhipsterSampleApplication3App.task.home.title' },
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'employee',
        data: { pageTitle: 'jhipsterSampleApplication3App.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'job',
        data: { pageTitle: 'jhipsterSampleApplication3App.job.home.title' },
        loadChildren: () => import('./job/job.module').then(m => m.JobModule),
      },
      {
        path: 'job-history',
        data: { pageTitle: 'jhipsterSampleApplication3App.jobHistory.home.title' },
        loadChildren: () => import('./job-history/job-history.module').then(m => m.JobHistoryModule),
      },
      {
        path: 'owner',
        data: { pageTitle: 'jhipsterSampleApplication3App.owner.home.title' },
        loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule),
      },
      {
        path: 'car',
        data: { pageTitle: 'jhipsterSampleApplication3App.car.home.title' },
        loadChildren: () => import('./car/car.module').then(m => m.CarModule),
      },
      {
        path: 'korean-culture',
        data: { pageTitle: 'jhipsterSampleApplication3App.koreanCulture.home.title' },
        loadChildren: () => import('./korean-culture/korean-culture.module').then(m => m.KoreanCultureModule),
      },
      {
        path: 'partner',
        data: { pageTitle: 'jhipsterSampleApplication3App.partner.home.title' },
        loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

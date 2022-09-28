import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INews, NewNews } from '../news.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INews for edit and NewNewsFormGroupInput for create.
 */
type NewsFormGroupInput = INews | PartialWithRequiredKeyOf<NewNews>;

type NewsFormDefaults = Pick<NewNews, 'id' | 'status'>;

type NewsFormGroupContent = {
  id: FormControl<INews['id'] | NewNews['id']>;
  titleUz: FormControl<INews['titleUz']>;
  titleRu: FormControl<INews['titleRu']>;
  titleKr: FormControl<INews['titleKr']>;
  contentUz: FormControl<INews['contentUz']>;
  contentRu: FormControl<INews['contentRu']>;
  contentKr: FormControl<INews['contentKr']>;
  postedDate: FormControl<INews['postedDate']>;
  status: FormControl<INews['status']>;
};

export type NewsFormGroup = FormGroup<NewsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NewsFormService {
  createNewsFormGroup(news: NewsFormGroupInput = { id: null }): NewsFormGroup {
    const newsRawValue = {
      ...this.getFormDefaults(),
      ...news,
    };
    return new FormGroup<NewsFormGroupContent>({
      id: new FormControl(
        { value: newsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      titleUz: new FormControl(newsRawValue.titleUz),
      titleRu: new FormControl(newsRawValue.titleRu),
      titleKr: new FormControl(newsRawValue.titleKr),
      contentUz: new FormControl(newsRawValue.contentUz),
      contentRu: new FormControl(newsRawValue.contentRu),
      contentKr: new FormControl(newsRawValue.contentKr),
      postedDate: new FormControl(newsRawValue.postedDate),
      status: new FormControl(newsRawValue.status),
    });
  }

  getNews(form: NewsFormGroup): INews | NewNews {
    return form.getRawValue() as INews | NewNews;
  }

  resetForm(form: NewsFormGroup, news: NewsFormGroupInput): void {
    const newsRawValue = { ...this.getFormDefaults(), ...news };
    form.reset(
      {
        ...newsRawValue,
        id: { value: newsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NewsFormDefaults {
    return {
      id: null,
      status: false,
    };
  }
}

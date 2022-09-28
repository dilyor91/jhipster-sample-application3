import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAnswerAndQuestion, NewAnswerAndQuestion } from '../answer-and-question.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAnswerAndQuestion for edit and NewAnswerAndQuestionFormGroupInput for create.
 */
type AnswerAndQuestionFormGroupInput = IAnswerAndQuestion | PartialWithRequiredKeyOf<NewAnswerAndQuestion>;

type AnswerAndQuestionFormDefaults = Pick<NewAnswerAndQuestion, 'id'>;

type AnswerAndQuestionFormGroupContent = {
  id: FormControl<IAnswerAndQuestion['id'] | NewAnswerAndQuestion['id']>;
  questionUz: FormControl<IAnswerAndQuestion['questionUz']>;
  questionRu: FormControl<IAnswerAndQuestion['questionRu']>;
  questionKr: FormControl<IAnswerAndQuestion['questionKr']>;
  answerUz: FormControl<IAnswerAndQuestion['answerUz']>;
  answerRu: FormControl<IAnswerAndQuestion['answerRu']>;
  answerKr: FormControl<IAnswerAndQuestion['answerKr']>;
};

export type AnswerAndQuestionFormGroup = FormGroup<AnswerAndQuestionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AnswerAndQuestionFormService {
  createAnswerAndQuestionFormGroup(answerAndQuestion: AnswerAndQuestionFormGroupInput = { id: null }): AnswerAndQuestionFormGroup {
    const answerAndQuestionRawValue = {
      ...this.getFormDefaults(),
      ...answerAndQuestion,
    };
    return new FormGroup<AnswerAndQuestionFormGroupContent>({
      id: new FormControl(
        { value: answerAndQuestionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      questionUz: new FormControl(answerAndQuestionRawValue.questionUz),
      questionRu: new FormControl(answerAndQuestionRawValue.questionRu),
      questionKr: new FormControl(answerAndQuestionRawValue.questionKr),
      answerUz: new FormControl(answerAndQuestionRawValue.answerUz),
      answerRu: new FormControl(answerAndQuestionRawValue.answerRu),
      answerKr: new FormControl(answerAndQuestionRawValue.answerKr),
    });
  }

  getAnswerAndQuestion(form: AnswerAndQuestionFormGroup): IAnswerAndQuestion | NewAnswerAndQuestion {
    return form.getRawValue() as IAnswerAndQuestion | NewAnswerAndQuestion;
  }

  resetForm(form: AnswerAndQuestionFormGroup, answerAndQuestion: AnswerAndQuestionFormGroupInput): void {
    const answerAndQuestionRawValue = { ...this.getFormDefaults(), ...answerAndQuestion };
    form.reset(
      {
        ...answerAndQuestionRawValue,
        id: { value: answerAndQuestionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AnswerAndQuestionFormDefaults {
    return {
      id: null,
    };
  }
}

import { InstitutType } from 'app/entities/enumerations/institut-type.model';

import { IInstitution, NewInstitution } from './institution.model';

export const sampleWithRequiredData: IInstitution = {
  id: 45351,
};

export const sampleWithPartialData: IInstitution = {
  id: 95227,
  institutionType: InstitutType['UZBEKISTANUNIVERSITY'],
  titleRu: 'Soft',
  titleKr: 'bypass up hack',
  contentUz: 'PNG deposit',
  contentKr: 'Automotive',
  logoData: 'fresh-thinking Kids monitoring',
};

export const sampleWithFullData: IInstitution = {
  id: 74922,
  institutionType: InstitutType['UZBEKISTANUNIVERSITY'],
  titleUz: 'Surinam Planner payment',
  titleRu: 'Netherlands CFP panel',
  titleKr: 'Principal',
  contentUz: 'infrastructure Architect Towels',
  contentRu: 'Wooden',
  contentKr: 'world-class HDD Colombia',
  logoName: 'Danish',
  logoData: 'Loan',
};

export const sampleWithNewData: NewInstitution = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

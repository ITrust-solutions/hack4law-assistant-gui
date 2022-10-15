import { CaseTypeStep } from './case-type-step';

export interface CaseType {
    id: string;
    name: string;
    steps: CaseTypeStep[];
}

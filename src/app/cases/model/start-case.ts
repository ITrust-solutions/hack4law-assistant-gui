import { CaseType } from './case-type';

export interface StartCase {
    no: string;
    deadline: Date;
    receiptDate: Date;
    type: CaseType;
    description: string;
}

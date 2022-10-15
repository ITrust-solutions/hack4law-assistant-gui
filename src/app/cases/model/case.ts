import { CaseStatus } from './case-status';
import { CaseType } from './case-type';

export interface Case {
    id: string;
    name: string;
    no: string;
    status: CaseStatus;
    deadline: Date;
    createDate: Date;
    type: CaseType;
    description: string;
}


import { CaseStatus } from './case-status';

export interface Case {
    id: string;
    no: string;
    status: CaseStatus;
    deadline?: Date;
    createDate?: Date;
    finishDate?: Date;
    type: string;
    description: string;
}


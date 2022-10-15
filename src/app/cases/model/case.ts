import { CaseStatus } from './case-status';
import { CaseTask } from './case-task';

export interface Case {
    id: string;
    no: string;
    status: CaseStatus;
    deadline?: Date;
    createDate?: Date;
    finishDate?: Date;
    type: string;
    description: string;
    tasks: CaseTask[];
}


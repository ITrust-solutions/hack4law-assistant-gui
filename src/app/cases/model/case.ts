import { CaseStatus } from './case-status';
import { CaseTask } from './case-task';

export interface Case {
    id: string;
    no: string;
    assignedUser: string;
    status: CaseStatus;
    deadline?: Date;
    receiptDate?: Date;
    finishDate?: Date;
    type: string;
    description: string;
    tasks: CaseTask[];
}


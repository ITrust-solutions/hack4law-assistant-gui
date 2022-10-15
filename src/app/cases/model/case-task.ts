import { CaseTaskStatus } from './case-task-status';

export interface CaseTask {
    id: string;
    status: CaseTaskStatus;
    description: string;
}
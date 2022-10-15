import { CaseTaskStatus } from './case-task-status';

export interface CaseTask {
    status: CaseTaskStatus;
    description: string;
}
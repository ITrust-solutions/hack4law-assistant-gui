import { CaseTaskStatus } from '../../../model/case-task-status';

export interface CaseTaskDTO {
    id: string;
    name: string;
    taskStatus: CaseTaskStatus;
}

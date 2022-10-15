import { CaseTaskStatus } from '../../../model/case-task-status';

export interface CaseTaskDTO {
    caseDefinitionId: string;
    caseStepDefinitionId: string;
    taskStatus: CaseTaskStatus;
}

import { CaseStatus } from '../../../model/case-status';
import { CaseTaskStatus } from '../../../model/case-task-status';

export interface CaseTaskStartDto {
    caseDefinitionId: number;
    caseStepDefinitionId: number;
    taskStatus: CaseTaskStatus;
}

export interface StartCaseDto {
    caseDefinitionId: number;
    key: string;
    caseNumber: string;
    description: string;
    receiptDate: string;
    deadlineDate: string;
    caseStatus: CaseStatus;
    assignedUser: string;
    helpingUser: string;
    notesList: unknown[];
    filesList: unknown[];
    caseTaskDtoList: CaseTaskStartDto[];
}
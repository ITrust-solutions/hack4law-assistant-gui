import { CaseStatus } from '../../../model/case-status';
import { CaseFileDTO } from './case-file.dto';
import { CaseTaskDTO } from './case-task.dto';
import { CaseNoteDTO } from './case-note.dto';

export interface CaseDTO {
    id: number;
    caseType: number;
    finishDate: string;
    caseNumber: string;
    description: string;
    receiptDate: string;
    deadlineDate: string;
    caseStatus: CaseStatus;
    assignedUser: string;
    helpingUser: string;
    caseTaskDtoList: CaseTaskDTO[];
    filesList: CaseFileDTO[];
    notesList: CaseNoteDTO[];
}
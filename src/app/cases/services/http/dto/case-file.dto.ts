import { CaseFileType } from '../../../model/case-file-type';

export interface CaseFileDTO {
    fileLink: string;
    fileDescription: string;
    fileData: string;
    fileType: CaseFileType;
}

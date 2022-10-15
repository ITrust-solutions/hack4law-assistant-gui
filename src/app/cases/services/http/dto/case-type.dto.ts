export interface CaseTypeDTO {
    id: number;
    key: string;
    caseType: string;
    name: string;
    caseStepDefinitionDtoList: { key: string; id: number; name: string }[];
}


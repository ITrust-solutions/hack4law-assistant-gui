import { Pipe, PipeTransform } from '@angular/core';
import { CaseTaskStatus } from '../model/case-task-status';

@Pipe({
    standalone: true,
    name: 'loaTaskStatus',
})
export class CaseTaskStatusPipe implements PipeTransform {

    caseTypeLabels: { [key in CaseTaskStatus]: string } = {
        [CaseTaskStatus.DONE]: 'Zakończone',
        [CaseTaskStatus.IN_PROGRESS]: 'W trakcie',
        [CaseTaskStatus.NEW]: 'Nowy',
        [CaseTaskStatus.REJECTED]: 'Odrzucone',
    }

    transform(value?: CaseTaskStatus): string {
        return value ? this.caseTypeLabels[value] : '';
    }

}

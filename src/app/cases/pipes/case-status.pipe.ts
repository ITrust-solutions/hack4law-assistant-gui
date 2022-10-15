import { Pipe, PipeTransform } from '@angular/core';
import { CaseStatus } from '../model/case-status';

@Pipe({
    standalone: true,
    name: 'loaCaseStatus',
})
export class CaseStatusPipe implements PipeTransform {

    caseTypeLabels: { [key in CaseStatus]: string } = {
        [CaseStatus.ACCEPTED]: 'Zaakceptowana',
        [CaseStatus.FINISHED]: 'Zakończona',
        [CaseStatus.IN_PROGRESS]: 'W toku',
        [CaseStatus.PENDING_ACCEPTANCE]: 'Do akceptacji',
        [CaseStatus.REJECTED]: 'Odrzucona',
        [CaseStatus.WAITING_FOR_AUTHORITY]: 'Oczekuje na organ',
        [CaseStatus.NEW]: 'Nowa',
        [CaseStatus.FINISHED]: 'Zakończona',
    }

    transform(value?: CaseStatus): string {
        return value ? this.caseTypeLabels[value] : '';
    }

}

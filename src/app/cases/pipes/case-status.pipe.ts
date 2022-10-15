import { Pipe, PipeTransform } from '@angular/core';
import { CaseStatus } from '../model/case-status';

@Pipe({
    standalone: true,
    name: 'loaCaseStatus',
})
export class CaseStatusPipe implements PipeTransform {

    caseTypeLabels: { [key in CaseStatus]: string } = {
        [CaseStatus.NEW]: 'Nowa',
        [CaseStatus.FINISHED]: 'Zakończona',
    }

    transform(value?: CaseStatus): string {
        return value ? this.caseTypeLabels[value] : '';
    }

}

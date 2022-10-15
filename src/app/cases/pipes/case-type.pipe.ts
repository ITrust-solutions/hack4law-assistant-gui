import { Pipe, PipeTransform } from '@angular/core';
import { CaseType } from '../model/case-type';

@Pipe({
    standalone: true,
    name: 'loaCaseType',
})
export class CaseTypePipe implements PipeTransform {

    caseTypeLabels: { [key in CaseType]: string } = {
        [CaseType.PRZEKSZTALCENIE_PRAWA_WIECZYSTEGO_UZYTKOWANIA_WE_WLASNOSC]: 'Przeksztacenie prawa wieczystego użytkowania we własność',
        [CaseType.WNIOSEK_O_STWIERDZENIE_NADPLATY]: 'Wniosek o stwierdzenie nadpłaty',
    }

    transform(value?: CaseType): string {
        return value ? this.caseTypeLabels[value] : '';
    }

}

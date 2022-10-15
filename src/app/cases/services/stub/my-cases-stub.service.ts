import { MyCasesProvider } from '../my-cases.provider';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Case } from '../../model/case';
import { CaseStatus } from '../../model/case-status';
import { SingleCaseProvider } from '../single-case.provider';
import { CaseTypesProvider } from '../case-types.provider';
import { CaseType } from '../../model/case-type';
import { CaseTaskStatus } from '../../model/case-task-status';


const prefixes: string[] = [
    'Najnowsza', 'Najstarsza', 'Prywatna', 'Śmieszna', 'Tajemnicza', 'Oburzająca', 'Prosta', 'Szybka'
];

const suffixes: string [] = [
    'Wojewody', 'Rozwodowa', 'Pana Tadeusza', 'Karna', 'Podatkowa', 'Gospodarcza'
]

const pickRandom = <T>(array: T[]): T => array[Math.floor(Math.random()*array.length)];

const randomDays = (range: number) => {
    const result = new Date();
    const randomDaysNumber = Math.floor(Math.random() * range);
    const addOrSubstract = Math.random() < 0.5 ? -1 : 1;
    result.setDate(result.getDate() + addOrSubstract * randomDaysNumber);
    return result;
}

const caseTypes: CaseType[] = [
    {
        name: 'Przeksztacenie prawa wieczystego użytkowania we własność',
        id: crypto.randomUUID(),
        steps: [
            {
                name: 'Zweryfikować adres z decyzją',
                key: '0',
                id: '0'
            },
            {
                name: 'Potwierdzić podpisy na wniosku z księgą wieczystą',
                key: '1',
                id: '1',
            },
            {
                name: 'Weryfikacja pełnomocnictwa',
                key: '2',
                id: '2'
            },
            {
                name: 'Obliczenie kwoty do wpłaty',
                key: '3',
                id: '3'
            },
            {
                name: 'Zweryfikowanie prowadzenia działalności gospodarczej',
                key: '4',
                id: '4'
            },
            {
                name: 'Zweryfikowanie wniosku o pomoc publiczną',
                key: '5',
                id: '5',
            },
            {
                name: 'Przygotowanie decyzji',
                key: '6',
                id: '6',
            },
            {
                name: 'Weryfikacja wpłaty',
                key: '7',
                id: '7',
            },
            {
                name: 'Zakończenie procedury',
                key: '8',
                id: '8',
            },
        ]
    },

    {
        name: 'Wniosek o stwierdzenie nadpaty',
        id: crypto.randomUUID(),
        steps: [
            {
                name: 'Zweryfikować prawidłowość podpisów',
                key: '0',
                id: '0'
            },
            {
                name: 'Weryfikacja pełnomocnictwa',
                key: '1',
                id: '1'
            },
            {
                name: 'Weryfikacja terminu przedawnienia',
                key: '2',
                id: '2'
            },
            {
                name: 'Weryfikacja załaczników do wniosku',
                key: '3',
                id: '3'
            },
            {
                name: 'Rekonstrukcja stanu faktycznego',
                key: '4',
                id: '4'
            },
            {
                name: 'Wniosek o uzupełnienie',
                key: '5',
                id: '5'
            },
            {
                name: 'Ocena prawna',
                key: '6',
                id: '6'
            },
            {
                name: 'Przygotowanie decyzji',
                key: '7',
                id: '7'
            },
            {
                name: 'Zlecenie zwrotu',
                key: '8',
                id: '8'
            },
        ]
    },
]

const caseGenerator = (index: number): Case => ({
    id: crypto.randomUUID(),
    deadline: randomDays(7),
    status: pickRandom(Object.values(CaseStatus)),
    no: `Syg. /SP/KB/${index}/`,
    type: pickRandom(caseTypes).name,
    receiptDate: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu bibendum diam. Aenean non cursus ipsum. Quisque molestie, tellus sed tempus varius, odio mauris ornare felis, non ullamcorper dolor nibh sit amet enim. Donec varius id nibh ut luctus. Morbi id mi odio. Aenean in sapien lobortis, aliquet ante eget, tincidunt lacus. Nulla eget feugiat nunc. Nullam non sollicitudin ex. Curabitur est ligula, sagittis hendrerit leo sit amet, tincidunt dapibus justo. Curabitur vulputate nulla vel augue vestibulum interdum vel et libero.',
    tasks: pickRandom(caseTypes).steps.map(step => ({id: step.id, status: pickRandom(Object.values(CaseTaskStatus)), description: step.name })),
})

const cases: Case[] = [];

for(let i = 0; i < 30; i++) {
    cases.push(caseGenerator(i));
}

@Injectable()
export class MyCasesStubService implements MyCasesProvider, SingleCaseProvider, CaseTypesProvider {
    getMyCases(): Observable<Case[]> {
        return of(cases);
    }

    getSingleCase(searchedId: string): Observable<Case> {
        const foundCase = cases.find(({ id }) => id === searchedId) || cases[0];
        return foundCase ? of(foundCase) : throwError(() => SingleCaseProvider.CASE_NOT_FOUND);
    }

    getCaseTypes(): Observable<CaseType[]> {
        return of(caseTypes);
    }
}

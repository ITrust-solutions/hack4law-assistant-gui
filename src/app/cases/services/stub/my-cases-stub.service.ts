import { MyCasesProvider } from '../my-cases.provider';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Case } from '../../model/case';
import { CaseStatus } from '../../model/case-status';
import { CasePriority } from '../../model/case-priority';
import { CaseType } from '../../model/case-type';
import { SingleCaseProvider } from '../single-case.provider';


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

const caseGenerator = (index: number): Case => ({
    id: crypto.randomUUID(),
    name: `${pickRandom(prefixes)} Sprawa ${pickRandom(suffixes)}`,
    deadline: randomDays(7),
    status: pickRandom(Object.values(CaseStatus)),
    no: `No. ${index}`,
    type: pickRandom(Object.values(CaseType)),
})

const cases: Case[] = [];

for(let i = 0; i < 30; i++) {
    cases.push(caseGenerator(i));
}

@Injectable()
export class MyCasesStubService implements MyCasesProvider, SingleCaseProvider {
    getMyCases(): Observable<Case[]> {
        return of(cases);
    }

    getSingleCase(searchedId: string): Observable<Case> {
        const foundCase = cases.find(({ id }) => id === searchedId);
        return foundCase ? of(foundCase) : throwError(() => SingleCaseProvider.CASE_NOT_FOUND);
    }
}
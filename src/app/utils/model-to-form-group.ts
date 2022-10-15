import { FormControl, FormGroup } from '@angular/forms';

export type ModelToForm<T> = FormGroup<{
    [K in keyof T]: FormControl<T[K]>
}>
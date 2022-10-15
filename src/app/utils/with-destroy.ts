import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export function WithDestroy(Base = (class {} as any)) {
    return class extends Base implements OnDestroy {
        protected readonly componentDestroyed  = new Subject<void>()

        ngOnDestroy() {
            this.componentDestroyed.next();
            this.componentDestroyed.complete();
        }
    }
}

import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';
import { inject } from '@angular/core';
import { errorContext } from 'rxjs/internal/util/errorContext';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const busyService = inject(BusyService);

  
 busyService.busy();

return next(req).pipe(
  delay(500),
  finalize(() => {
    console.log('Finalize triggered');
    busyService.idle();
  })
);
};

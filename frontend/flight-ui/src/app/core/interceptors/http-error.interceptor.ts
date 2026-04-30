import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const snack = inject(MatSnackBar);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            let message = 'An unexpected error occurred.';

            if (err.status === 0) {
                message = 'Cannot reach server. Check your connection.';
            } else if (err.error?.message) {
                message = err.error.message;   // e.g. "BaggageExceeded"
            } else if (err.status === 404) {
                message = 'Resource not found.';
            } else if (err.status === 400) {
                message = err.error?.title ?? 'Invalid request.';
            } else if (err.status === 409) {
                message = 'Conflict: record already exists.';
            }

            snack.open(`⚠ ${message}`, 'Dismiss', {
                duration: 5000,
                panelClass: 'snack-error',
                horizontalPosition: 'right',
                verticalPosition: 'top',
            });

            return throwError(() => err);
        })
    );
};
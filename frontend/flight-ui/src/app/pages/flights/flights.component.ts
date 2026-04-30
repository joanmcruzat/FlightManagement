import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FlightService, Flight } from '../../core/services/flight.service';

@Component({
    selector: 'app-flights',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatProgressBarModule,
    ],
    templateUrl: './flights.component.html',
    styleUrl: './flights.component.css',
})
export class FlightsComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns = ['flightNumber', 'destination', 'actions'];
    dataSource = new MatTableDataSource<Flight>();
    loading = false;
    form!: FormGroup;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private service: FlightService,
        private snack: MatSnackBar,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {
        this.form = this.fb.group({
            flightNumber: this.fb.control<number | null>(null, [
                Validators.required,
                Validators.pattern(/^.{1,10}$/)
            ]),
            destination: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    ngOnInit() { this.load(); }
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    load() {
        this.loading = true;
        this.service.getAll().subscribe({
            next: data => {
                this.dataSource.data = data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.cdr.detectChanges();
            },
        });
    }

    applyFilter(e: Event) {
        this.dataSource.filter = (e.target as HTMLInputElement).value.trim().toLowerCase();
    }

    submit() {
        this.submitted = true;

        if (this.form.invalid) { this.form.markAllAsTouched(); return; }
        this.service.add(this.form.value as Partial<Flight>).subscribe(() => {
            this.snack.open('Flight added successfully', '', {
                duration: 3000,
                panelClass: 'snack-success',
                horizontalPosition: 'right',
                verticalPosition: 'top',
            });
            // this.form.reset();
            this.form.markAsUntouched();
            this.form.markAsPristine();
            this.form.patchValue({ flightNumber: null, destination: '' });
            this.submitted = false; 
            this.load();
        });
    }

    viewPassengers(flightNumber: number) {
        this.router.navigate(['/passengers'], { queryParams: { flightNumber } });
    }
}

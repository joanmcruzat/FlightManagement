import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PassengersService, Passenger } from '../../core/services/passengers.service';
import { FlightService, Flight } from '../../core/services/flight.service';

@Component({
    selector: 'app-passengers',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatProgressBarModule,
    ],
    templateUrl: './passengers.component.html',
    styleUrl: './passengers.component.css',
})
export class PassengersComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns = ['passengerId', 'firstName','lastName', 'class', 'flightNumber', 'ticketPrice', 'numberOfBags', 'totalBaggageWeight'];
    dataSource = new MatTableDataSource<Passenger>();

    flights: Flight[] = [];
    selectedFlight: number | null = null;
    loading = false;
    form!: FormGroup;
    submitted = false;
    constructor(
        private fb: FormBuilder,
        private passengerSvc: PassengersService,
        private flightSvc: FlightService,
        private snack: MatSnackBar,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
    ) {
        this.form = this.fb.group({
            flightNumber: [null as number | null, Validators.required],
            passengerId: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            class: ['Economy', Validators.required],
            ticketPrice: ['', Validators.required],
            numberOfBags: ['', Validators.required],
            totalBaggageWeight: ['', Validators.required],
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.flightSvc.getAll().subscribe((flights: Flight[]) => {
                this.flights = flights;
                this.cdr.markForCheck();
                const qp = this.route.snapshot.queryParamMap.get('flightNumber');
                if (qp) {
                    const fn = +qp;
                    this.selectedFlight = fn;
                    this.form.patchValue({ flightNumber: fn });
                    this.loadPassengers(fn);
                }
            });
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    onFlightChange(fn: number) {
        this.selectedFlight = fn;
        this.loadPassengers(fn);
    }

    loadPassengers(fn: number) {
        this.loading = true;
        this.cdr.markForCheck();
        this.passengerSvc.getByFlight(fn).subscribe({
            next: data => {
                setTimeout(() => {
                    this.dataSource.data = data;
                    this.loading = false;
                    this.cdr.markForCheck();
                });
            },
            error: () => {
                setTimeout(() => {
                    this.loading = false;
                    this.cdr.markForCheck();
                });
            },
        });
    }

    applyFilter(e: Event) {
        this.dataSource.filter = (e.target as HTMLInputElement).value.trim().toLowerCase();
    }

    submit() {
        this.submitted = true;
        if (this.form.invalid) { this.form.markAllAsTouched(); return; }
        const { flightNumber, ...passengerData } = this.form.value;
        this.passengerSvc.add(flightNumber!, passengerData as Partial<Passenger>).subscribe((res: any) => {
            this.snack.open(res.message, '', {
                duration: 3000,
                panelClass: 'snack-success',
                horizontalPosition: 'right',
                verticalPosition: 'top',
            });
            this.form.markAsUntouched();
            this.form.markAsPristine();
            this.form.patchValue({ passengerId: '', firstName: '', lastName: '', class: 'Economy', ticketPrice: '', numberOfBags: '', totalBaggageWeight: '' });
            this.submitted = false;

            this.loadPassengers(flightNumber!);
        });
    }

}
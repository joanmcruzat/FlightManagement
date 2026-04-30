import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-shell',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, HeaderComponent],
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.css'],
})
export class ShellComponent { }
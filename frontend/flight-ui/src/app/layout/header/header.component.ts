import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../core/services/theme.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [DatePipe, MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    today = new Date();

    constructor(public themeService: ThemeService) { }

    toggleTheme(): void {
        this.themeService.toggle();
    }
}

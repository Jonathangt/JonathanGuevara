import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/components/header/header.component';
import { BaseButtonComponent } from './components/base-button/base-button.component';
import { InputSearchComponent } from './product/components/input-search/input-search.component';
import { ListComponent } from './product/components/list/list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    BaseButtonComponent,
    InputSearchComponent,
    ListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'financial-products';
}

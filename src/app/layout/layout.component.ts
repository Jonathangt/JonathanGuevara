import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { BaseButtonComponent } from '../components/base-button/base-button.component';
import { FormsModule } from '@angular/forms';
import { InputSearchComponent } from '../product/components/input-search/input-search.component';
import { Router, RouterOutlet } from '@angular/router';
import { RouteNames } from '../route-names';
import { ListComponent } from '../product/components/list/list.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, BaseButtonComponent, FormsModule, InputSearchComponent, RouterOutlet, ListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})


export class LayoutComponent {

  constructor(private readonly router: Router) {
  }

  async addProductRedirect() {
    await this.router.navigate([RouteNames.addProduct]);
  }
}

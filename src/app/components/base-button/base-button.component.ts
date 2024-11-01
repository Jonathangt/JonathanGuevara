import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-base-button',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './base-button.component.html',
  styleUrl: './base-button.component.scss'
})

export class BaseButtonComponent {
  @Input() public text: string | undefined = '';
  @Input() public backgroundColor: string = '#f8e04b';
  @Input() public padding: string = '1rem';
  @Input() public disabled: boolean = false;
  @Output() public action = new EventEmitter<void>();

  onAction(): void {
    this.action.emit();
  }
}

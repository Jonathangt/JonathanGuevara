import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseButtonComponent } from '../../../components/base-button/base-button.component';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [
    BaseButtonComponent
  ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})


export class DeleteModalComponent {
  @Input() productTitle: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}

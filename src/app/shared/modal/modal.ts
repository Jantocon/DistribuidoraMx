import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class ModalComponent {
  @Input() visible = false;
  @Input() title = 'Modal';

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirmAction = new EventEmitter<void>();

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  confirm() {
    this.confirmAction.emit();
  }
}

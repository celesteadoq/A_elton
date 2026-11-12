import { Component, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';

export interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  template: `
    <div class="dropdown">
      <button class="btn" (click)="open.set(!open())" aria-haspopup="true" [attr.aria-expanded]="open()">
        {{ label() }} ▾
      </button>
      @if (open()) {
        <ul class="dropdown-menu">
          @for (opt of options(); track opt.value) {
            <li><button (click)="select(opt)">{{ opt.label }}</button></li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    .dropdown { position:relative; }
    .dropdown-menu { position:absolute; right:0; top:calc(100% + 6px); z-index:10; min-width:100%; margin:0; padding:4px; list-style:none; background:var(--card); border:1px solid var(--line); border-radius:8px; }
    .dropdown-menu button { width:100%; background:none; border:0; padding:8px 12px; text-align:left; white-space:nowrap; border-radius:4px; color:var(--ink); }
    .dropdown-menu button:hover { background:var(--paper); }
  `
})
export class Dropdown {
  label = input('Selecionar');
  options = input.required<DropdownOption[]>();
  selected = output<DropdownOption>();     
  open = signal(false);

  private host = inject(ElementRef);

  select(option: DropdownOption) {
    this.open.set(false);                       
    this.selected.emit(option);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.host.nativeElement.contains(event.target)) {
      this.open.set(false);
    }
  }
}
import { Component, input, signal } from '@angular/core';

export interface AccordionItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-accordion',
  template: `
    @for (item of items(); track $index) {
      <div class="acc-item">
        <button class="acc-title" [class.open]="openIndex() === $index" (click)="toggle($index)">
          {{ item.title }}<span>{{ openIndex() === $index ? '−' : '+' }}</span>
        </button>
        <div class="acc-body" [class.open]="openIndex() === $index">
          <p>{{ item.content }}</p>
        </div>
      </div>
    }
  `,
  styles: `
    .acc-item { border-bottom:1px solid var(--line); }
    .acc-title { display:flex; justify-content:space-between; width:100%; background:none; border:0; padding:12px 0; text-align:left; font-weight:600; color:var(--ink); }
    .acc-title.open { color:var(--accent); }
    .acc-body { max-height:0; overflow:hidden; transition:max-height .3s ease; }
    .acc-body.open { max-height:160px; }
    .acc-body p { margin:0 0 12px; color:var(--muted); }
  `
})
export class Accordion {
  items = input.required<AccordionItem[]>();   // dados que chegam do pai
  openIndex = signal(0);                       // índice aberto (-1 = nenhum)

  toggle(index: number) {
    // clicou no aberto: fecha. Clicou em outro: ele vira o único aberto.
    this.openIndex.set(this.openIndex() === index ? -1 : index);
  }
}

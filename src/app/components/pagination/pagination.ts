import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <nav class="pagination">
      <button [disabled]="current() <= 1" (click)="go(current() - 1)">Anterior</button>
      @for (n of pages(); track n) {
        <button [class.active]="n === current()" (click)="go(n)">{{ n }}</button>
      }
      <button [disabled]="current() >= total()" (click)="go(current() + 1)">Próxima</button>
    </nav>
  `,
  styles: `
    .pagination { display:flex; flex-wrap:wrap; gap:6px; }
    button { min-width:38px; padding:6px 10px; background:var(--card); border:1px solid var(--line); border-radius:6px; }
    button.active { background:var(--accent); border-color:var(--accent); color:#fff; }
    button:disabled { opacity:.4; cursor:not-allowed; }
  `
})
export class Pagination {
  total = input.required<number>();       // total de páginas
  current = input.required<number>();     // página atual
  pageChange = output<number>();          // evento que sobe para o pai

  pages = computed(() => Array.from({ length: this.total() }, (_, i) => i + 1));

  go(page: number) {
    if (page >= 1 && page <= this.total() && page !== this.current()) {
      this.pageChange.emit(page);
    }
  }
}
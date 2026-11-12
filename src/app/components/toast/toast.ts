import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="stack" aria-live="polite">
      @for (t of toasts(); track t.id) {
        <div [class]="'toast ' + t.type">
          <span>{{ t.text }}</span>
          <button (click)="close(t.id)" aria-label="Fechar">×</button>
        </div>
      }
    </div>
  `,
  styles: `
    .stack { position:fixed; right:16px; bottom:16px; left:16px; display:flex; flex-direction:column; align-items:flex-end; gap:8px; pointer-events:none; }
    .toast { display:flex; gap:12px; align-items:center; max-width:380px; padding:12px 14px; color:#fff; border-radius:8px; pointer-events:auto; animation:slide .25s ease; }
    .success { background:var(--ok); }
    .error { background:var(--err); }
    .info { background:var(--info); }
    .toast button { background:none; border:0; color:inherit; font-size:1.2rem; }
    @keyframes slide { from { transform:translateY(12px); opacity:0; } }
    @media (prefers-reduced-motion: reduce) { .toast { animation:none; } }
  `
})
export class Toast {
  private service = inject(ToastService);
  toasts = this.service.toasts;

  close(id: number) {
    this.service.remove(id);
  }
}
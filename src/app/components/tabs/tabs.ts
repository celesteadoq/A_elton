import { Component, input, signal } from '@angular/core';

export interface TabItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-tabs',
  template: `
    <div class="tab-list" role="tablist">
      @for (tab of tabs(); track $index) {
        <button role="tab" [class.active]="active() === $index" (click)="active.set($index)">
          {{ tab.title }}
        </button>
      }
    </div>
    <p class="tab-panel" role="tabpanel">{{ tabs()[active()].content }}</p>
  `,
  styles: `
    .tab-list { display:flex; flex-wrap:wrap; border-bottom:2px solid var(--line); }
    .tab-list button { background:none; border:0; padding:8px 14px; color:var(--muted); border-bottom:3px solid transparent; margin-bottom:-2px; }
    .tab-list button.active { color:var(--accent); border-bottom-color:var(--accent); font-weight:600; }
    .tab-panel { padding-top:12px; margin:0; color:var(--muted); }
  `
})
export class Tabs {
  tabs = input.required<TabItem[]>();
  active = signal(0);          // aba ativa
}
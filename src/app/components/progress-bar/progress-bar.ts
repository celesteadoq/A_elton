import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" [attr.aria-valuenow]="percent()">
      <div class="fill" [style.width.%]="percent()"></div>
      <span class="label">{{ percent() }}%</span>
    </div>
  `,
  styles: `
    .progress { position:relative; height:24px; background:var(--paper); border-radius:12px; overflow:hidden; }
    .fill { height:100%; background:var(--accent); transition:width .3s ease; }
    .label { position:absolute; inset:0; display:grid; place-items:center; font-size:.8rem; font-weight:600; mix-blend-mode:difference; color:#fff; }
  `
})
export class ProgressBar {
  value = input(0);                                                          // 0 a 100, vindo do pai
  percent = computed(() => Math.min(100, Math.max(0, this.value())));        // sempre entre 0 e 100
}
import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  readonly toasts = signal<ToastMessage[]>([]);

  success(text: string) { this.show('success', text); }
  error(text: string)   { this.show('error', text); }
  info(text: string)    { this.show('info', text); }

  remove(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  private show(type: ToastType, text: string, duration = 3500) {
    const id = ++this.nextId;
    this.toasts.update(list => [...list, { id, type, text }]);
    setTimeout(() => this.remove(id), duration);        // some sozinho
  }
}
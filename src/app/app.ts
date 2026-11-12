import { Component, signal, computed, inject } from '@angular/core';
import { Accordion, AccordionItem } from './components/accordion/accordion';
import { Tabs, TabItem } from './components/tabs/tabs';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pagination } from './components/pagination/pagination';
import { ProductService } from './services/product.service';
import { Dropdown, DropdownOption } from './components/dropdown/dropdown';
import { Toast } from './components/toast/toast';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [Accordion, Tabs, ProgressBar, Pagination, Dropdown, Toast],         // aqui entram os componentes que o template usa
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
faq: AccordionItem[] = [
  { title: 'Como faço para criar uma conta?', content: 'Clique em "Cadastrar", preencha seus dados e confirme o e-mail.' },
  { title: 'Quais formas de pagamento são aceitas?', content: 'Cartão de crédito, boleto bancário e Pix.' },
  { title: 'Como acompanho meu pedido?', content: 'Acesse "Meus pedidos" e veja o status em tempo real.' }
];
tabs: TabItem[] = [
  { title: 'Perfil',    content: 'Nome: Maria Silva. Membro desde 2024.' },
  { title: 'Pedidos',   content: 'Você tem 3 pedidos em andamento.' },
  { title: 'Segurança', content: 'Autenticação em duas etapas desativada.' }
];

progress = signal(0);
uploading = signal(false);
private timer?: ReturnType<typeof setInterval>;

startUpload() {
  this.progress.set(0);
  this.uploading.set(true);
  this.timer = setInterval(() => {
    this.progress.update(v => v + 10);
    if (this.progress() >= 100) {
      clearInterval(this.timer);
      this.uploading.set(false);
      this.toast.success('Arquivo enviado com sucesso!');           // NOVO
    }
  }, 300);
}

failUpload() {                                                       // NOVO
  clearInterval(this.timer);
  this.uploading.set(false);
  this.progress.set(0);
  this.toast.error('Não foi possível enviar o arquivo. Tente novamente.');
}

private productService = inject(ProductService);    // injeção do serviço

search = signal('');
sortKey = signal('name');
page = signal(1);
readonly perPage = 5;

// lista filtrada e ordenada: se search ou sortKey mudarem, recalcula sozinha
filtered = computed(() => {
  const term = this.search().trim().toLowerCase();
  const key = this.sortKey();
  return this.productService.getAll()
    .filter(p => p.name.toLowerCase().includes(term))
    .sort((a, b) =>
      key === 'price' ? a.price - b.price :
      key === 'recent' ? b.createdAt.getTime() - a.createdAt.getTime() :
      a.name.localeCompare(b.name));
});

totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.perPage)));

pageItems = computed(() => {
  const start = (this.page() - 1) * this.perPage;
  return this.filtered().slice(start, start + this.perPage);
});

setPage(page: number) {
  this.page.set(page);
}

sortOptions: DropdownOption[] = [
  { label: 'Nome (A-Z)',    value: 'name' },
  { label: 'Menor preço',   value: 'price' },
  { label: 'Mais recentes', value: 'recent' }
];

onSort(option: DropdownOption) {
  this.sortKey.set(option.value);
  this.page.set(1);
  this.toast.info('Ordenado por: ' + option.label);                
}

private toast = inject(ToastService);
}
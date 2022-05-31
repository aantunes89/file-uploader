import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss'],
})
export class FileItemComponent {
  @Input() title: string;
  @Input() size: number;

  constructor() {}
}

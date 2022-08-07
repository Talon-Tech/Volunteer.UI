import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  isShowingAddItem: boolean = false;
  addedItem: any;
  @Input() items?: Array<any>;

  ngOnInit(): void {
  }

  setIsShowingAddItems(flag: boolean) {
    this.isShowingAddItem = flag;
  }

  CreateItem() {
    if (this.addedItem && this.addedItem.length > 0) {
      if(!this.items) {
        this.items = [];
      }
      this.items.push(this.addedItem);
      this.addedItem = null;
      this.setIsShowingAddItems(false);
    }
  }

  DeleteItem(itemToDelete: string) {
    if(this.items) {
      this.items = this.items.filter(item => item !== itemToDelete);
    }
  }

}

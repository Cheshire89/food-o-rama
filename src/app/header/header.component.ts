import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ngOnInit() {
    this.onGetRecipes();
  }
  constructor(private dataStorage: DataStorageService) { }

  onSaveRecipes(){
    this.dataStorage.storeRecipes()
      .subscribe(
        (response: Response) => console.log(response)
      );
  }
  onGetRecipes(){
    this.dataStorage.getRecipes();
  }
}

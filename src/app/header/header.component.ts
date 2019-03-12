import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  authSubscription: Subscription;
  userSignedIn: boolean;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {
    this.userSignedIn = false;
  }

  ngOnInit() {
    this.onGetRecipes();
    this.authSubscription = this.authService.authChanged
      .subscribe(
        (userSignedIn: boolean) => {
          this.userSignedIn = userSignedIn
        }
      );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

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

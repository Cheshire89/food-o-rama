import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth';
import { DataStorageService } from 'src/app/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isAuthenticated: boolean;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService,
    private dropdownConfig: NgbDropdownConfig
  ) {
    this.dropdownConfig.placement = 'bottom-right';
  }

  ngOnInit() {
    this.onGetRecipes();

    this.authService.authChanged
    .subscribe((userSignedIn: boolean) => {
      this.isAuthenticated = userSignedIn;
    });
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

  onLogout(){
    this.authService.logout();
  }
}

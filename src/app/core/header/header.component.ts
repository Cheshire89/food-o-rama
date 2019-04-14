import { Component, OnInit } from '@angular/core';
// import { HttpEvent } from '@angular/common/http';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth';
import { DataStorageService } from 'src/app/shared';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../ngrx/app.reducers';
import * as fromAuth from '../../auth/ngrx/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService,
    private dropdownConfig: NgbDropdownConfig,
    private store: Store<fromApp.AppState>
  ) {
    this.dropdownConfig.placement = 'bottom-right';
  }

  ngOnInit() {
    this.onGetRecipes();
    this.authState = this.store.select('auth');
  }

  onSaveRecipes(){
    this.dataStorage.storeRecipes()
      .subscribe(
        (response) => console.log(response)
      );
  }

  onGetRecipes(){
    this.dataStorage.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }
}

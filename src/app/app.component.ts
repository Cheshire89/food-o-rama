import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activatedTab: string = 'recipe';
  
  onNavigate(activeTab: string) {
    this.activatedTab = activeTab
  }
}

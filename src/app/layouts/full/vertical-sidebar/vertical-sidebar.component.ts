import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItemsService } from '../../../shared/menu-items/menu-items.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { Menu } from '../../../shared/menu-items/menu-items';


@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: [],
  providers: [MenuItemsService]
})

export class VerticalAppSidebarComponent implements OnDestroy, OnInit {
  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  parentMenu: Array<any>;

  private _mobileQueryListener: () => void;
  status = true;

  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

  setClickedRow(i: number, j: number) {
    this.parentIndex = i;
    this.childIndex = j;
  }
  subclickEvent() {
    this.status = true;
  }
  scrollToTop() {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    //public menuItems: Menu[],
    public menuItemsService: MenuItemsService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(){
    if(!MenuItemsService.menuItems){
      this.menuItemsService.getMenu().subscribe(items => {
        MenuItemsService.menuItems = items;
        if(MenuItemsService.menuItems) {
          this.menuItems = MenuItemsService.menuItems;
          this.parentMenu = this.menuItems.filter(this.checkMenuPermission).map(child => {
            if(child.children != undefined){
              child.children = child.children.filter(this.checkMenuPermission).map(subchild => {
                if(subchild.subchildren != undefined){
                  subchild.subchildren = subchild.subchildren.filter(this.checkMenuPermission);
                }
    
                return subchild;
              });  
            }
            
            return child;
          });

          console.log(this.parentMenu);
        }
      });
    }
    if(MenuItemsService.menuItems) {
      this.menuItems = MenuItemsService.menuItems;
      this.parentMenu = this.menuItems.filter(this.checkMenuPermission).map(child => {
        if(child.children != undefined){
          child.children = child.children.filter(this.checkMenuPermission).map(subchild => {
            if(subchild.subchildren != undefined){
              subchild.subchildren = subchild.subchildren.filter(this.checkMenuPermission);
            }

            return subchild;
          });  
        }
        
        return child;
      });

      console.log(this.parentMenu);
    }
  }

  checkMenuPermission = (item: any) => {
    return (AuthService.checkPermissions(item.id));
  }
}

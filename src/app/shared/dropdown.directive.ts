import {
    Directive,
    HostListener,
    ElementRef,
    Renderer2
} from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    toggler: Boolean = false;
    dropdownMenu: any;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2){

    }

    @HostListener('click') toggleOpen() {
        this.dropdownMenu = this.element.nativeElement.nextSibling;
        if(!this.toggler && this.dropdownMenu.classList.contains('dropdown-menu')){
            this.renderer.addClass(this.dropdownMenu, 'show');
            this.toggler = !this.toggler;
        } else {
            this.renderer.removeClass(this.dropdownMenu, 'show');
            this.toggler = !this.toggler;
        }
    }


}
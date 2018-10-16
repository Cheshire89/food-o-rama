import { 
    Directive, 
    HostListener, 
    ElementRef, 
    Renderer2 
} from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    toggler: Boolean = false;
    @HostListener('click') toggleOpen() {
        const dropdownMenu = this.element.nativeElement.nextSibling;
        if(!this.toggler && dropdownMenu.classList.contains('dropdown-menu')){
            this.renderer.addClass(dropdownMenu, 'show');
            this.toggler = !this.toggler;
        } else { 
            this.renderer.removeClass(dropdownMenu, 'show');
            this.toggler = !this.toggler;
        }
    }

    constructor(
        private element: ElementRef, 
        private renderer: Renderer2){
    }
}
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["sidebar", "overlay", "toggleIcon", "menuItem"]

    connect() {
        // set up menu items listener if needed
        this.menuItems = document.querySelectorAll('.menu-item')

        if (this.menuItems.length > 0) {
            // this.boundHandleMenuItemClick = this.boundHandleMenuItemClick.bind(this)
            this.menuItems.forEach(item => {
                item.addEventListener('click', this.boundHandleMenuItemClick)
            })
        }

        // Active menu
        // Restore active state after Turbo navigation
        const menuId = sessionStorage.getItem('menuId')
        if (menuId) {
            this.menuItemTargets.forEach(item => {
                if (item.getAttribute('id') === menuId) {
                    item.classList.add('active')
                }
            })
        }
    }

    disconnect() {
        // Clean up event listener
        this.menuItems.forEach(item => {
            item.removeEventListener('click', this.boundHandleMenuItemClick)
        })

    }

    toggle() {
        this.sidebarTarget.classList.toggle('show')
        this.overlayTarget.classList.toggle('show')

        //change icon
        const icon = this.toggleIconTarget
        if (this.sidebarTarget.classList.contains('show')) {
            icon.classList.remove('bi-list')
            icon.classList.add('bi-x')
        } else {
            icon.classList.remove('bi-x')
            icon.classList.add('bi-list')
        }
    }

    handleMenuItemClick() {
        if (window.innerWidth <= 768) {
            this.toggle()
        }
    }

    closeOnOverlay() {
        this.toggle()
    }

    setActive(e) {
        // Don't prevent default - let Turbo handle navigation
    
        // Remove active class from all menu items
        this.menuItemTargets.forEach(item => {
            item.classList.remove('active')
        })
        
        // Add active class to clicked menu item
        e.currentTarget.classList.add('active')
        
        // Store active state in sessionStorage for Turbo
        const menuId = e.currentTarget.getAttribute('id')
        sessionStorage.setItem('menuId', menuId)
    }
}
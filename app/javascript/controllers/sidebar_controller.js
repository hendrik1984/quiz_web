import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["sidebar", "overlay", "toggleIcon"]

    connect() {
        // set up menu items listener if needed
        this.menuItems = document.querySelectorAll('.menu-item')

        if (this.menuItems.length > 0) {
            // this.boundHandleMenuItemClick = this.boundHandleMenuItemClick.bind(this)
            this.menuItems.forEach(item => {
                item.addEventListener('click', this.boundHandleMenuItemClick)
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
}
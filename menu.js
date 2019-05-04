function switchMenu() {
    switchMenu.enabled = !switchMenu.enabled
    const sidemenu = document.querySelector('.sidemenu')

    const sidemenuSwitch = document.querySelector('.sidemenu__switch')
    
    if(switchMenu.enabled) {
        sidemenu.style.display = 'block'
        sidemenuSwitch.classList.add('sidemenu__switch--active')
    } else {
        sidemenu.style.display = 'none'
        sidemenuSwitch.classList.remove('sidemenu__switch--active')
    }
    
}

switchMenu.enabled = false
function highlight_current_page(page_name) {
    remove_highlight()
    document.querySelectorAll(`.${page_name}`).forEach(el => el.classList.add("highlight"));

}
function remove_highlight() {
    document.querySelectorAll(`.highlight`).forEach(el => el.classList.remove("highlight"));

}
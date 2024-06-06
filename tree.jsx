
function Display_page_for_tree({ page_name }) {
    if (!(page_name in pages)) {
        pages[page_name] = ""
        ReactDOM.render(<Tree page_on={page_name} />, document.getElementById('tree'));

    }
    const page_content = pages[page_name]
    const words = page_content.split(" ");
    const links_to = []

    words.forEach(word => {
        if (word[0] === "[" && word[word.length - 1] === "]") {
            const trimmed_word = word.slice(1, -1)
            links_to.push(trimmed_word)
            const page_name = trimmed_word
            if (!(page_name in pages)) {
                pages[page_name] = ""
                ReactDOM.render(<Tree page_on={page_name} />, document.getElementById('tree'));

            }
        }
    })

    return (
        <div class="outer" className={page_name} >
            <div className="display-page" onClick={() => main_goto(page_name)}>
                <h1 className={`title ${page_name === showing_page ? "exact-highlight" : ""}`}>{page_name}</h1>
                <button className="x" onClick={() => Delete(page_name)}>X</button>
            </div >


            <div class="children-files">
                {!pages_looked_at.includes(page_name) ?
                    pages_looked_at.push(page_name) && links_to.map(name => <Display_page_for_tree page_name={name} />)
                    : <div>
                        this page has already been looked at
                    </div>}


            </div>
        </div>
    )
}


function Tree({ page_on }) {
    console.log({ page_on })

    React.useEffect(() => {
        highlight_current_page(page_on)
    })
    pages_looked_at.length = 0;
    return (
        <div >
            <Display_page_for_tree page_name={'start'} />
        </div>
    )
}
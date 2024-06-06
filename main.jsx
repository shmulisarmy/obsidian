function Link({ page_name, go_to }) {
    return (
        <span>
            <span onClick={(() => go_to(page_name))} className="link">
                {`[${page_name}]`}
            </span>
            {" "}
        </span>
    )
}


function App({ passed_in_page }) {
    const [page, setpage] = React.useState(pages[passed_in_page]);
    const [pageName, setPageName] = React.useState(passed_in_page);
    const [placeHolder, rerender] = React.useState(true)


    const words = page.split(" ");
    const ref = React.useRef(null)

    function go_to(page_name) {
        if (!(page_name in pages)) {
            pages[page_name] = ""

        }
        showing_page = page_name
        setpage(pages[page_name])
        setPageName(page_name)
        ReactDOM.render(<Tree page_on={page_name} />, document.getElementById('tree'));
    }

    main_goto = go_to


    function update_text() {
        
        const val = document.getElementById('content').textContent
        console.log({val})
        setpage(val)
        ReactDOM.render(<Tree page_on={pageName} />, document.getElementById('tree'));

    }

    React.useEffect(() => {
        if (Interval)  {
            clearInterval(Interval)
        }
        
        Interval = setInterval(() => {
            update_text()
        }, 1500)
    }, [page])


    const ready_page = words.map(word => word[0] === "[" && word[word.length - 1] === "]" ? <Link page_name={word.slice(1, -1)} go_to={go_to} key={word.slice(1, -1)} /> : `${word} `)

    return (
        <main>
            <h1>{pageName}</h1>

            <h2 id='content'
                contentEditable="true"
                ref={ref} >
                {ready_page}
            </h2>

        </main>


    )
}


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


const pages = {
    start: "this links [down]",
    down: "this linksto [second] [baby] [second] ",

    // right: "this linksto [down]",
    // left: "this linksto [down]",
    // down: "this links [baby] [second] ",
    // second: "this is a new page",
    // baby: "this is a new page"
}

var main_goto;
const pages_looked_at = []

function Delete(page_name) {
    delete pages[page_name]
    ReactDOM.render(<Tree />, document.getElementById('tree'));

}

function highlight_current_page(page_name) {
    remove_highlight()
    document.querySelectorAll(`.${page_name}`).forEach(el => el.classList.add("highlight"));

}
function remove_highlight() {
    document.querySelectorAll(`.highlight`).forEach(el => el.classList.remove("highlight"));

}

let Interval
var showing_page = "start"





ReactDOM.render(<App passed_in_page={'start'} />, document.getElementById('root'));
ReactDOM.render(<Tree />, document.getElementById('tree'));
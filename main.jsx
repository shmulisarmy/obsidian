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


    const words = page.split(" ");

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
                >
                {ready_page}
            </h2>

        </main>


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



let Interval
var showing_page = "start"





ReactDOM.render(<App passed_in_page={'start'} />, document.getElementById('root'));
ReactDOM.render(<Tree />, document.getElementById('tree'));
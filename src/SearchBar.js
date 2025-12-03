export default function SearchBar({onLocationSelected}) {
    return <div className="search">

        <form onSubmit={(event) => {
            event.preventDefault()
            onLocationSelected(52.5244, 13.4105, "Berlin, Germany")
        }} className="search-bar">
            <input type="text" placeholder="Search for a place..." className="search-input" />
            <button type="submit" className="search-button">Search</button>
        </form>
    </div>
}
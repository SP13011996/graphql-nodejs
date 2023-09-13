import TodaysDate from "./TodaysDate";

function TopAppBar() {
    const appBarStyle = {
        color: '#5B5EE4',
        top: '0', // Place the app bar at the top of the screen
        width: '100%', // Set the width to 100% to span the screen
    };

    return (
        <>
            <div style={appBarStyle}>
                <div className="app-bar-title">
                    <TodaysDate />
                </div>
            </div>
            <hr />
        </>

    );
}

export default TopAppBar;

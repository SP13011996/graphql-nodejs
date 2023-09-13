export default function TodaysDate() {

    const currentDay = new Date();


    const boldArialStyle = {
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
    };

    const italicTimesNewRomanStyle = {
        fontFamily: 'Times New Roman, serif',
        fontStyle: 'italic',
    };

    const monthStyle = {

        fontFamily: 'Roboto, bold',
    };

    return (
        <>
            <span style={boldArialStyle}>{`${currentDay.toLocaleString('default', { weekday: "long" })} ,`}</span>
            <span style={italicTimesNewRomanStyle}>{` ${currentDay.getDate()}th`}</span>
            <div style={{ textAlign: 'start', color: 'grey', fontSize: 14 }}><span style={monthStyle}>{`${currentDay.toLocaleString('default', { month: 'long' })}`}</span></div >
        </>
    );
}
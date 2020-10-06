export default (res = []) => {

    const data = [];
    for (let i = 0; i < res.length; i++) {
        let row = {
            id: (res[i].id === null) ? '' : res[i].id,
            name: (res[i].name === null) ? '' : res[i].name,
            createdDate: (res[i].createdDate === null) ? '' : res[i].createdDate,
            number: (res[i].number === null) ? '' : res[i].number,
            incomingCallCount: (res[i].incomingCallCount === null) ? '' : res[i].incomingCallCount,
            outGoingCallCount: (res[i].outGoingCallCount === null) ? '' : res[i].outGoingCallCount,
            location: (res[i].location === null) ? '' : res[i].location,
        };
        data.push(row);
    }
    return data;

}

import { API_BASE, getHeaders } from '../constants/setting';

const fetchListSubject = async (payload) => {
    const { token, GradeId } = payload;
    let response = await fetch(`${API_BASE}subject/${GradeId}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const fetchListGrades = async ({ token }) => {
    const response = await fetch(`${API_BASE}grades`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    const responseJson = await response.json();
    return responseJson;
};


const fetchListProblemHierachy = async (payload) => {
    const { token, subjectId, GradeId } = payload;
    let response = await fetch(`${API_BASE}problemHierachy/${GradeId}/${subjectId}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const fetchListProblemHierachyById = async (payload) => {
    const { token, problemHiearchyId } = payload;
    let respone = await fetch(`${API_BASE}problemHierachy/listProblem/${problemHiearchyId}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await respone.json();
    return responseJson;
}

const fetchListExerciseAssigned = async (payload) => {
    const {token, packageCode} = payload;
    console.log('token: ', token);
    console.log('link.......: ', `${API_BASE}hochay/learning/task/${packageCode}`);
    let respone = await fetch(`${API_BASE}hochay/learning/task/${packageCode}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    let responseJson = await respone.json();
    return responseJson;
}

// const fetchUpdateAvatar = async (payload) => {
//     const {token,}
// }

module.exports = {
    fetchListSubject,
    fetchListGrades,
    fetchListProblemHierachy,
    fetchListProblemHierachyById,
    fetchListExerciseAssigned
}
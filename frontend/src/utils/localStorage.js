export const save = (token)=>{
    localStorage.setItem('token', token);
}

export const load = ()=>{
    const token =localStorage.getItem('token');
return token;
}

export const remove = ()=>{
    localStorage.removeItem('token')
}
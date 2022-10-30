
export function handleUnauthenticatedUserVisit(userState){
    if ( !userState.isLoggedIn){
        alert("Please login to acces this page")
        window.location.replace("/login")
    }
}



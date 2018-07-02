export const getLocation = ()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
        		return position;
        });
    } else {
        console.log("Geolocation is not supported by this browser")
    }
}

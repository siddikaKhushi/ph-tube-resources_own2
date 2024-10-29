function gettimestring(time){
    const hour = parseInt(time/3600);
    let remainingsecond =time%3600;
    const minute = parseInt(remainingsecond / 60);
    remainingsecond = remainingsecond%60;
    return `${hour}h ${minute}m ${remainingsecond}s ago`;

}
//  const removeactiveid=()=>{
//  const removeid = document.getElementsByTagName('category-btn');
//    for(let btn of removeid){
//     btn.classList.remove("active");
//   }

// }
const removeactiveid = () => {
    // Use the correct method to select buttons by class name
    const removeid = document.getElementsByClassName('category-btn'); // Use class name instead of tag name
    for (let btn of removeid) {
        btn.classList.remove("active"); // Remove the "active" class from each button
    }
};

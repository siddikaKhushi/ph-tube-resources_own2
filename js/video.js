
const loadCategoriesvideo= (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        removeactiveid();
       const activebtn= document.getElementById(`btn-${id}`);
        activebtn.classList.add("active");
        displayvideos(data.category);

    })
    .catch((error) => console.error('Error fetching data:', error)); 
}

// for categories button
const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res)=>res.json())
    .then((data)=>displayCategories(data.categories))
    .catch((error) => console.error('Error fetching data:', error)); 
}
const displayCategories =(categories)=>{
   const categorycontainer = document.getElementById('categories')
   categories.forEach((item) => {
    console.log(item);
    const categoriesButtton = document.createElement('div');
    // categoriesButtton.classList.add('btn')
    categoriesButtton.innerHTML =`
    <button id="btn-${item.category_id}" class="btn category-btn" onclick="loadCategoriesvideo(${item.category_id})">
          ${item.category}
    </button>
    `
    categorycontainer.appendChild(categoriesButtton);
});
};
loadCategories();


// for videos
//          const videoDetails = (video)=>{
//              console.log(video);
//              const detailcontainer = document.getElementById('modal-content')
//              detailcontainer.innerHTML=`
//             <img src="${video.thumbnail}" alt="${video.title}" />
//         <p>${video.description}</p>
//     `;
//             //  way-1
//             // document.getElementById('showModaldata').click();
//             // way 2
//             document.getElementById("customModal").showModal();
// }
const videodetails = (videoid) => {
    console.log(videoid);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoid}`)
        .then((res) => res.json())
        .then((data) => videoDetails(data.video)) // Access the video object inside `data`
        .catch((error) => console.error('Error fetching video details:', error));
}

const videoDetails = (video) => {
    console.log(video);
    const detailcontainer = document.getElementById('modal-content');
    detailcontainer.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}" />
        <p>${video.description}</p>
    `;

    // Way 1: Programmatically trigger modal if you have a hidden button
    // document.getElementById('showModaldata').click();

    // Way 2: Show modal directly if using a custom dialog element
    document.getElementById("customModal").showModal();
}

const loadvideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => {
            console.log(data); // Check the structure of data
            displayvideos(data.videos); // Ensure `data.videos` exists
        })
        .catch((error) => console.error('Error fetching data:', error)); // Error handling
};

const displayvideos = (videos) => {
    const videocontainer = document.getElementById('video'); // Ensure this ID exists in HTML
    if (!videocontainer) {
        console.error("No element found with ID 'video'");
        return;
    }

    videocontainer.innerHTML = ''; // Clear previous content
 if(videos.length==0){
    videocontainer.classList.remove("grid");
    videocontainer.innerHTML=`
    <div class="flex flex-col justify-center items-center w-full">
    <img src="assets/Icon.png"/>
    <h3 class="font-bold text-center">Opps, sorry!! there is no video caontent here. </h3>
    </div>  `
    return;
 } else{
    videocontainer.classList.add("grid");
 }

    videos.forEach((video) => {
        console.log(video); // Log each video object
        const videodiv = document.createElement('div');
        videodiv.classList.add('card', 'card-compact', 'm-2');

        // Ensure properties like authors[0] and others are defined to prevent errors
        const profilePicture = video.authors && video.authors[0] && video.authors[0].profile_picture ? video.authors[0].profile_picture : '';
        const profileName = video.authors && video.authors[0] && video.authors[0].profile_name ? video.authors[0].profile_name : 'Unknown Author';
        const views = video.others && video.others.views ? video.others.views : 'No views available';

        videodiv.innerHTML = `
            <figure class="h-[200px] relative">
                <img src="${video.thumbnail}" class="h-full w-full object-cover " alt="${video.title}" />
                ${
                    video.others.posted_date.length==0? "" : `<span class="absolute bg-black text-white right-2 bottom-2">${gettimestring(video.others.posted_date)}</span>`
                }
            </figure>
            <div class="flex gap-2">
                <div>
                    <img class="rounded-full h-8 w-8 m-2" src="${profilePicture}" alt="${profileName}" />
                </div>
                <div>
                    <h2 class="font-bold m-2">${video.title}</h2>
                    <div class="flex gap-2 items-center">
                        <p class="text-gray-700">${profileName}</p>
                        ${
                            video.authors[0].verified== true? `<img class="h-5 w-5 " src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" alt="Icon" `:""
                        }
                    </div>
                    
                       <button class="btn btn-error" onclick="videodetails('${video.video_id}')">Details</button>

                </div>
            </div>
        `;
        
        videocontainer.appendChild(videodiv);
    });
};

loadvideos();


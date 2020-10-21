


function addToWishlist(){

    console.log("Adding the item to the wishlist");

}

function removeFromWishlist(){

    console.log("Removing the item from wishlist")
}


var wishlistButton = document.querySelector ('.anukriti-wishlist-btn')

wishlistButton.addEventListener('click', function() {

    if (this.classlist.includes('active')) {
        removeFromWishlist();
        this.classlist.remove('active');
    }
    else {
    this.classlist.add('active');
    addToWishlist();
    }

})
function getImageURL(name = ""){
    return new URL("./media/" + name, import.meta.url).href;
}
export {getImageURL};
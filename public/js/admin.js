function deleteFile(btn){
    const productId = document.querySelector('[name=productId]').value;
    const csrfToken = document.querySelector('[name=_csrf]').value;
    console.log(productId, csrfToken);
}
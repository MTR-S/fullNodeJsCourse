exports.get404 = (req, resp, next) => {
    resp.status(404).render('pageNotFound', { pageTitle: "Page not Found", path:""});

    /*
        The 404 http status code means that the server cannot
        find the requested resource. In the browser that means that
        the requested URL wasn't found! In an API, this can also mean 
        that the endpoint is valid but the resource itself does not exist.
    */
};
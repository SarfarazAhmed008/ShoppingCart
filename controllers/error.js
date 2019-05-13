exports.get404Page = (req, res, next) => {
    res.render('404', {pageTitle : 'Page Not Found', path : '/abc'});
    //before adding controller codes (below)...
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    // res.status(404).send('<h2>Page not found</h2>');
};
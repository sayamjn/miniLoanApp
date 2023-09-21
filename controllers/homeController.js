export function home(req, res)
{
    return res.render('index', {title: "Home"});
}
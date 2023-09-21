export function setFlash(req, res, next) 
{
    // console.log('setflash');
    res.locals.flash = {
      'success': req.flash('success'),
      'error': req.flash('error')
    };
  
    next();
}
// Add Color with ANSI in JavaScript
const RED_COLOR = "\u001b[31m";
const GREEN_COLOR = "\u001b[32m";
const WHITE_COLOR = "\u001b[37m";
const BLUE_COLOR = "\u001b[34m";


module.exports.LOG_Request = (req,res,next) => {
    if(req.url.startsWith('/admin'))
    {
        console.log(GREEN_COLOR + `${req.method.toUpperCase()} request to ${req.url}`);
    }
    else
    {
        console.log(WHITE_COLOR + `${req.method.toUpperCase()} request to ${req.url}`);
    }
    next();
};

module.exports.LOG_Error = (req,res,next) => {
    console.log(RED_COLOR + `NOT FOUND ${req.url}`);
    next();
};
module.exports.LOG_Added_Model = (model_name, model) => {
    console.log(WHITE_COLOR + `New ${model_name} added : `, model);
};
module.exports.LOG_Edited_Model = (model_name, model) => {
    console.log(WHITE_COLOR + `The Updated ${model_name} : `, model);
};
module.exports.LOG_Deleted_Model = (model_name, model) => {
    console.log(WHITE_COLOR + `The Deleted ${model_name} : `, model);
};
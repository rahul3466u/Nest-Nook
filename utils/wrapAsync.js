module.exports = (fn) => {
    return (req, res, next) => {
       fn(req, res, next).catch(next);
    };
};

//very short way to defin asyncWrap

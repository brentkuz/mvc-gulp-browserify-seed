function Common() {
    this.hello = function (caller) { console.log("Common says hello from " + caller + "!"); };
}

module.exports = new Common();
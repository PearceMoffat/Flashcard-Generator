ClozeCard = function(text, cloze, difficulty) {
    if (this instanceof ClozeCard) {
        this.cloze = cloze;
        this.fullText = text;
        
        if (text.indexOf(cloze) < 0) {
            console.log("Error, cloze not present in text");
            this.partial = "Error occurred";
        }
        else {
            switch (difficulty) {
                case "easy":
                    var names = cloze.split(" ");
                    this.partial = text.replace(cloze, names[0] + " ....");
                    this.cloze = names[1];
                    if (names[2]) { this.cloze = names[1] + names[2]} //Just for Martin Van Buren
                    break;
                case "medium":
                    var names = cloze.split(" ");
                    var firstOnly = names[0].charAt(0) + "....";
                    var secondOnly = names[1].charAt(0) + "....";
                    this.partial = text.replace(cloze, firstOnly +" "+ secondOnly);
                    if (names[2]) {
                        var thirdOnly = names[2].charAt(0) + "....";
                        this.partial = text.replace(cloze, firstOnly +" "+ secondOnly+" "+thirdOnly);
                    }
                    break;
                case "hard":
                    this.partial = text.replace(cloze, "....");
                    break;
            }
        }
    }
    else {
        return new ClozeCard(text, cloze);
    }
}

module.exports = ClozeCard;
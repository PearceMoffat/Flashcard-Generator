ClozeCard = function(text, cloze, difficulty) {
    if (this instanceof ClozeCard) {
        this.cloze = cloze;
        this.fullText = text;
        
        // Check the text for the cloze
        if (text.indexOf(cloze) < 0) {
            console.log("Error, cloze not present in text");
            this.partial = "Error occurred";
        }
        else { // The cloze was found in the text
            switch (difficulty) { // Check the difficulty
                case "easy":
                    // Split the first and last names
                    var names = cloze.split(" "); 

                    // Create the partial text with the last name removed
                    this.partial = text.replace(cloze, names[0] + " ...."); 

                    // Set the answer to be the last name
                    this.cloze = names[1];
                    if (names[2]) { this.cloze = names[1] + names[2]} // Just for Martin Van Buren
                    break;
                case "medium":
                    // Split the first and last names
                    var names = cloze.split(" ");

                    // Create strings containing the first letter of the names followed by "...."
                    var firstOnly = names[0].charAt(0) + "....";
                    var secondOnly = names[1].charAt(0) + "....";

                    // Create the partial text with the names replaced by initials and "...."
                    this.partial = text.replace(cloze, firstOnly +" "+ secondOnly);

                    if (names[2]) { // Just for Martin Van Buren
                        var thirdOnly = names[2].charAt(0) + "....";
                        this.partial = text.replace(cloze, firstOnly +" "+ secondOnly+" "+thirdOnly);
                    }
                    break;
                case "hard":
                    // Create the partial text with the full name replaced by ".... ...."
                    this.partial = text.replace(cloze, ".... ....");
                    break;
            }
        }
    }
    else {
        return new ClozeCard(text, cloze);
    }
}

module.exports = ClozeCard;
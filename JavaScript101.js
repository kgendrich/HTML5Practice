
			var lyrics = "Hello World !! <p><table border="+"0>";
			// <!-- Note that the border=0 command will override the css file -->
			var drink = "Wisconsin Beer";
			var container = " Bottles of "
			var cans = 99;
			while (cans > 0) {
				lyrics = lyrics + "<tr><td>" + cans + container + drink + " on the wall, </td>";
				// <!-- Note how cans and cans.toString() work exactly the same -->
				lyrics = lyrics + "<td>" + cans.toString() + container + drink + "</td>";
				lyrics = lyrics + "<td> Take one down, pass it around, </td>";
				if (cans > 1) {
					lyrics = lyrics + "<td>" + (cans-1).toString() + container + drink + " on the wall </td></tr>";
				}
				else {
					lyrics = lyrics + "<td> Wait for it... </td></tr>"
				}
				cans = cans - 1;
			}
			lyrics = lyrics + "</table><br>"
			lyrics = lyrics + "<strong> No more" + container + drink + " on the wall </strong><br>";
			document.write(lyrics);
			alert("There are no more " + container + drink + " !!")
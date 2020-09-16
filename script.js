// model
let numbers = [7, 3, 1, 5, 8];
let chosenBar = -1; // Variabel for hvilken stolpe som er valgt
let inputValue = 0; // Variabel for hva som er skrevet i input-feltet
const feilMelding = 'Feilmelding: Bare tall fra 1 til 10 er gyldig.';

// view
function drawView() {
    let svgInnerHtml = '';
    for (let i = 0; i < numbers.length; i++) {
        svgInnerHtml += createBar(numbers[i], i + 1);
    }
    document.getElementById('content').innerHTML = `

            <div class="diagramPanel">
                <hr>
                <svg id="chart" width="500" preserveAspectRatio="none" viewBox="0 0 80 60">
                    ${svgInnerHtml}
                </svg>
                <hr>
                Valgt stolpe: ${(chosenBar != -1) ? chosenBar : '<i>ingen</i>'}
                Verdi:
                <input type="number" min="1" max="10" value="${numbers[chosenBar - 1]}" onInput="inputValue = this.value;" />
                <button onClick="(modifyElement(inputValue)) ? addElement(numbers, parseInt(inputValue)) : alert(feilMelding); drawView();">Legg til stolpe</button>
                <button ${(chosenBar == -1) ? 'disabled' : ''}  onClick="(modifyElement(inputValue)) ? numbers[chosenBar -1] = inputValue : alert(feilMelding); drawView();"> Endre valgt stolpe</button>
                <button ${(chosenBar == -1) ? 'disabled' : ''}  onClick="removeElement(chosenBar-1, numbers); drawView();"> Fjerne valgt stolpe</button>
            </div>
        `;
}

// Create Bar
function createBar(number, barNo) {
    const width = 8;
    const spacing = 2;
    let x = (barNo - 1) * (width + spacing);
    let height = number * 10;
    let y = 60 - height;
    let color = calcColor(1, 10, barNo);
    return `<rect onclick="chosenBar = setElementSelection(${barNo}, chosenBar); inputValue = numbers[chosenBar - 1]; drawView();"
                width="${width}" height="${height}"
                x="${x}" y="${y}" fill="${color}" ${(chosenBar == barNo) ? 'stroke="black"' : ''}></rect>`;
}

// Calculate Color
function calcColor(min, max, val) {
    var minHue = 240, maxHue = 0;
    var curPercent = (val - min) / (max - min);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}

// Controller

// Setter valgt stolpe, når ingenting er valgt returer den -1.
function setElementSelection(index, previousSelection)
{
    return (previousSelection == index) ? -1 : index;
}

// Legger til et element til en array.
function addElement(array, item)
{
    // Returner den nye lengden av arrayen. Ikke arrayen i seg selv.
    return array.push(item);
}

// Tar imot en array, fjerner ett element og returnerer den.
function removeElement(index, array)
{
    if (array != null && index >= 0)
    {
        // Set valgt element til ingen.
        chosenBar = -1;

        // Returner den tingen som ble slettet arrayen.
        return array.splice(index, 1);
    }
    else
    {
        return null;
    }
}

// Checks if element height is within boundary.
// Kunne ha brukt checkRange() funksjonen som jeg lagde i oblig 1 
// Det optimale hadde vært å ha ett eget matte library med den i, hosta på en server.
function modifyElement(newHeight)
{
    return (newHeight > 0 && newHeight <= 10) ? true : false;
}


    

